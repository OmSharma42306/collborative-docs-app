import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import "../styles/Editor.css"; // Add basic styles
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";
//import {RemoteCursorPlugin} from "./utils/remote-cursor-plugin"

// todo declaring just for test , later getting dynamically the name.
const myUserId = "sagya";

const TextEditor2: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");
  const [roomId,setRoomId] = useState<string>("");
  const [roomCreated,setRoomCreated] = useState<Boolean>(false);
  //const [remoteCursors,setRemoteCursors]  = useState<any>([]);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});

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
    const {msg,data,type}:{msg:string,data:string,type:string} = JSON.parse(event.data);
    
    setRoomCreated(true);

    if(type === "senderData"){
      editor?.commands.setContent(`<p>${data}</p>`)
    }else if(type === "senderCursor" || type === "receiverCursor"){
      const {userId,name,from,to,color}:any = data;
      if(userId !== myUserId){
        setRemoteCursors(prev=>({
          ...prev,
          [userId]:{from,to,name,color}
        }))
      }
    }
    
    // else if(type === "senderCursor"){
    //   console.log("i am inside the cursor")
    //   console.log(data);
    //   const {userId,name,from,to,color}:any = data;
    //     console.log("KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    //     console.log(userId,name,from,to)
    //     setRemoteCursors(prev =>({
    //       ...prev,
    //       [userId]:{from,to,name,color}
    //     }))
    // }

  
  }
 })

  const editor = useEditor({
    extensions: [StarterKit,RemoteCursorExtension.configure({
      cursors:remoteCursors
    })], // Basic formatting (bold, italic, lists, etc.)
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
    },
    onSelectionUpdate:({editor})=>{
      const {from,to}:any = editor.state.selection;
      console.log("Receiver Side From : ",from)
      console.log("Receiver Side to : ",to)
      socket?.send(JSON.stringify({
        type:"cursor-update-receiver",
        userId:"sagya",
        name:"Sagar Sharma",
        color:"Blue",
        from,
        to,
      }))
    }
  }
);
useEffect(() => {
  if (!editor) return

  editor.view.dispatch(
    editor.view.state.tr.setMeta('remoteCursorPlugin', {
      cursors: remoteCursors,
    })
  )
}, [remoteCursors])

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
