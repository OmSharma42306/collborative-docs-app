import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import "../styles/Editor.css"; // Add basic styles
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";

// Socket Messages and Data types

interface SocketData{
  msg:string;
  data:CursorData;
  type:string;
}

// interface for Position of Cursors

interface CursorPostions{
  from:number;
  to:number
}

// websocket incomming data types
interface CursorData{
  userId:string;
  name:string;
  from:number;
  to:number;
  color:string;
}

const host = import.meta.env.VITE_HOST

// todo declaring just for test , later getting dynamically the name.
const myUserId:string = "sagya";

const TextEditor2: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");
  const [roomId,setRoomId] = useState<string>("");
  const [roomCreated,setRoomCreated] = useState<Boolean>(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});

  // useeffect for socket initialization.
  
  useEffect(()=>{
    const socket = new WebSocket(`ws://${host}:8080/${roomId}`);
    
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

  // Sending Edits event to WebSocket Server through Sockets.
  useEffect(()=>{
    
    socket?.send(JSON.stringify({type:"receiver-edit",data:text}))
  },[text])


 useEffect(()=>{
  if(!socket) return;
  socket.onmessage = (event:any) =>{
    console.log(event.data);
    const {msg,data,type}:SocketData = JSON.parse(event.data);
    console.log(msg);
    setRoomCreated(true);

    if(type === "senderData"){
      editor?.commands.setContent(`<p>${data}</p>`)
    }else if(type === "senderCursor" || type === "receiverCursor"){
      const {userId,name,from,to,color}:CursorData = data;
      
      if(userId !== myUserId){
        setRemoteCursors(prev=>({
          ...prev,
          [userId]:{from,to,name,color}
        }))
      }
    }
  }
 })

 // Editor Stuff.
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
      
      const {from,to}:CursorPostions = editor.state.selection;
      socket?.send(JSON.stringify({
        type:"cursor-update-receiver",
        userId:"sagya",
        name:"Sagar",
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
