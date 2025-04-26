import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";
 
//import "../styles/Editor.css"; // Add basic styles

const TextEditor: React.FC = () => {
  
  const [socket,setSocket] = useState<WebSocket>();
  const [text,setText] = useState<string|null>("");
  const [roomId,setRoomId] = useState<string>("");
  const [roomCreated,setRoomCreated] = useState<Boolean>(false);
  // const [remoteCursors,setRemoteCursors] = useState<[]>([]);
//  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});
const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});


  // useeffect for socket initialization.
  
  function generateRoomId(){
    const randomNumber:string = Math.floor(1000000+ Math.random() * 9000000).toString();
    setRoomId(randomNumber);
  }
  
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
      const {msg,data,type}:{msg:string,data:string,type:string} = JSON.parse(event.data);
      console.log(event.data);
      console.log(msg)
      console.log(data)
      console.log("data set")
      
      setRoomCreated(true);

      if(type === "receiverData"){
        editor?.commands.setContent(`<p>${data}</p>`);
      }else if(type === "receiverCursor"){
        const {userId,name,from,to,color}:any = data;
        console.log("KEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
        console.log(userId,name,from,to)
        setRemoteCursors(prev =>({
          ...prev,
          [userId]:{from,to,name,color}
        }))
        
      }

    }
  }
  
  
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
      const {from,to}:any = editor.state.selection;
      console.log("from",from)
      console.log("to",to)
      socket?.send(JSON.stringify({
        type:"cursor-update-sender",
        userId:"xuz",
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
