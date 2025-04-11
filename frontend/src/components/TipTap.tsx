import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
//import "../styles/Editor.css"; // Add basic styles

const TextEditor: React.FC = () => {
  
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
      socket.close();
    }

  },[]);

  useEffect(()=>{
    if(!socket || socket.readyState !== WebSocket.OPEN){
      console.log("Sockets are Not Connected!");
      return;
    }
    console.log(text);
    socket?.send(JSON.stringify({type:"sender-edit",data:text}))


  },[text])

  if(socket){
    socket.onmessage = async (event:any) =>{
      const {msg,data}:{msg:string,data:string} = JSON.parse(event.data);
      console.log(event.data);
      console.log(msg)
      console.log(data)
      console.log("data set")
      setText(data);

      editor?.commands.setContent(`<p>${data}</p>`);
      
    
    }
  }
  

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
      <button onClick={()=>{
        socket?.send(JSON.stringify({type:"sender",roomId:"4322"}))
      }}>Connect</button>
    </div>
  );
};

export default TextEditor;
