import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import "../styles/Editor.css"; // Add basic styles

const TextEditor2: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");

  // useeffect for socket initialization.
  
  useEffect(()=>{
    const socket = new WebSocket("ws://localhost:8080/4322");
    
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
  socket.onmessage = (data:any) =>{
    console.log("Websocket data",data);
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
    <div className="editor-container">
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor2;
