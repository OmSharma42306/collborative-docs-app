import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
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
const myUserId:string = "omya";

const TextEditor: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");
  const [roomId,setRoomId] = useState<string>("");
  const [roomCreated,setRoomCreated] = useState<Boolean>(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});


  // useeffect for socket initialization.
  
  function generateRoomId(){
    const randomNumber:string = Math.floor(1000000+ Math.random() * 9000000).toString();
    setRoomId(randomNumber);
  }
  
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
      socket.close();
    }

  },[]);

  // Sending Edits event to WebSocket Server through Sockets.
  useEffect(()=>{
    if(!socket || socket.readyState !== WebSocket.OPEN){
      console.log("Sockets are Not Connected!");
      return;
    }
    socket?.send(JSON.stringify({type:"sender-edit",data:text}))
  },[text])

  if(socket){
    socket.onmessage = async (event:any) =>{
      const {msg,data,type}:SocketData= JSON.parse(event.data);
      
      setRoomCreated(true);

      if(type === "receiverData"){
        editor?.commands.setContent(`<p>${data}</p>`);
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
  }
  
  // Editor Area Stuff.
  const editor = useEditor({
    extensions: [StarterKit,
      RemoteCursorExtension.configure({
        cursors:remoteCursors,
      })
    ], // Basic formatting (bold, italic, lists, etc.)
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
        type:"cursor-update-sender",
        userId:"omya",
        name:"Omya",
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
      <button onClick={generateRoomId}>Create Room Id</button>
      
      {roomId?<div>
        <h1>RoomId : {roomId}</h1>
        <button onClick={()=>{
        socket?.send(JSON.stringify({type:"sender",roomId:roomId}))
      }}>Connect</button>
      </div>
      :"" }
    
    {roomCreated?<div className="editor-container">
      <EditorContent  editor={editor} />

    </div>:""}
    </div>
  );
};

export default TextEditor;
