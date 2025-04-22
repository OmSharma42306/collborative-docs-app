import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import "../styles/Editor.css"; // Add basic styles

const TextEditor2: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");
  const [roomId,setRoomId] = useState<string>("");
  const [roomCreated,setRoomCreated] = useState<Boolean>(false);
  // useeffect for socket initialization.
  
  useEffect(()=>{
    const socket = new WebSocket(`ws://localhost:8080/${roomId}`);
    
    if(!socket || socket.readyState !== WebSocket.OPEN){
      console.log("Sockets are Not Connected!");
    }

    socket.onopen = () =>{
      console.log("Sockets are Connected!");
      setSocket(socket);
    }

    return ()=>{
      socket.close(); // cleanup when component unmounts.// doubt.
    }

    // for when the text state changes the socket will send an data to ws server.
  },[]);

  useEffect(()=>{
    console.log(text);
    socket?.send(JSON.stringify({type:"receiver-edit",data:text}))
  },[text])

 useEffect(()=>{
  if(!socket) return;
  socket.onmessage = (event:any) =>{
    console.log(event.data);
    const {msg,data}:{msg:string,data:string} = JSON.parse(event.data);
    console.log(msg)
    console.log(data);
    setRoomCreated(true);

    editor?.commands.setContent(`<p>${data}</p>`)

  }
 })

  const editor = useEditor({
    extensions: [StarterKit], // Basic formatting (bold, italic, lists, etc.)
    content: "<p>Start writing...</p>", // Initial content
    onUpdate: ({editor}) => {
        // get content in JSON format.
        const content = editor.getJSON();
        let extractedContent:string|any = "";
        content.content?.map(co=>{
            co.content?.map(c=>{
                 extractedContent+=c.text;
            })
            
        })
        setText(extractedContent);
    }
  }
);


  return (
    <div>
      <h1>Enter RoomId given by Sender!</h1>
      <input type="text" placeholder="Enter RoomId" onChange={(e)=>{
        setRoomId(e.target.value);
      }} />
      {roomId?<button onClick={()=>{
        socket?.send(JSON.stringify({type:"receiver",roomId:roomId}))
      }}>Connect</button>:""}
{roomCreated?<div className="editor-container">
      <EditorContent editor={editor} />
    </div>:""}

    
    </div>
  );
};

export default TextEditor2;
