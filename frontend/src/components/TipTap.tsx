import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";


import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'

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
  
  if(roomId){
    useEffect(()=>{
      const socket = new WebSocket(`wss://${host}/${roomId}`);
      
      
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
  
  }

  
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
      console.log(msg);
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
    extensions: [StarterKit,Document,Paragraph,Text,

      RemoteCursorExtension.configure({
        cursors:remoteCursors,
      })
    ], // Basic formatting (bold, italic, lists, etc.)
    content:
    // "<p>Start writing...</p>", // Initial content
    `
    <p>
      This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
    </p>
    <p>
      The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
    </p>
  `,
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

// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useEffect, useState } from "react";
// import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";
// import Document from '@tiptap/extension-document';
// import Paragraph from '@tiptap/extension-paragraph';
// import Text from '@tiptap/extension-text';
// import { Code2, Users, Share2 } from 'lucide-react';

// // Socket Messages and Data types
// interface SocketData {
//   msg: string;
//   data: CursorData;
//   type: string;
// }

// interface CursorPostions {
//   from: number;
//   to: number;
// }

// interface CursorData {
//   userId: string;
//   name: string;
//   from: number;
//   to: number;
//   color: string;
// }

// const host = import.meta.env.VITE_HOST;
// const myUserId: string = "omya";

// const TextEditor: React.FC = () => {
//   const [socket, setSocket] = useState<WebSocket>();
//   const [text, setText] = useState<string | null>("");
//   const [roomId, setRoomId] = useState<string>("");
//   const [roomCreated, setRoomCreated] = useState<Boolean>(false);
//   const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number; to: number; color: string; name: string }>>({});

//   function generateRoomId() {
//     const randomNumber: string = Math.floor(1000000 + Math.random() * 9000000).toString();
//     setRoomId(randomNumber);
//   }

//   useEffect(() => {
//     const socket = new WebSocket(`ws://${host}:8080/${roomId}`);

//     if (!socket || socket.readyState !== WebSocket.OPEN) {
//       console.log("Sockets are Not Connected!");
//     }

//     socket.onopen = () => {
//       console.log("Sockets are Connected!");
//       setSocket(socket);
//     }

//     return () => {
//       socket.close();
//     }
//   }, []);

//   useEffect(() => {
//     if (!socket || socket.readyState !== WebSocket.OPEN) {
//       console.log("Sockets are Not Connected!");
//       return;
//     }
//     socket?.send(JSON.stringify({ type: "sender-edit", data: text }))
//   }, [text])

//   if (socket) {
//     socket.onmessage = async (event: any) => {
//       const { msg, data, type }: SocketData = JSON.parse(event.data);
//       console.log(msg);
//       setRoomCreated(true);

//       if (type === "receiverData") {
//         editor?.commands.setContent(`<p>${data}</p>`);
//       } else if (type === "senderCursor" || type === "receiverCursor") {
//         const { userId, name, from, to, color }: CursorData = data;
//         if (userId !== myUserId) {
//           setRemoteCursors(prev => ({
//             ...prev,
//             [userId]: { from, to, name, color }
//           }))
//         }
//       }
//     }
//   }

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Document,
//       Paragraph,
//       Text,
//       RemoteCursorExtension.configure({
//         cursors: remoteCursors,
//       })
//     ],
//     content: `
//     <p>
//       This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That's it. It's probably too much for real minimalists though.
//     </p>
//     <p>
//       The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
//     </p>
//     `,
//     onUpdate: ({ editor }) => {
//       const content = editor.getJSON();
//       let extractedContent: string | any = "";
//       content.content?.map(co => {
//         co.content?.map(c => {
//           extractedContent += c.text;
//         })
//       })
//       setText(extractedContent);
//     },
//     onSelectionUpdate: ({ editor }) => {
//       const { from, to }: CursorPostions = editor.state.selection;

//       socket?.send(JSON.stringify({
//         type: "cursor-update-sender",
//         userId: "omya",
//         name: "Omya",
//         color: "Blue",
//         from,
//         to,
//       }))
//     }
//   });

//   useEffect(() => {
//     if (!editor) return;

//     editor.view.dispatch(
//       editor.view.state.tr.setMeta('remoteCursorPlugin', {
//         cursors: remoteCursors,
//       })
//     )
//   }, [remoteCursors])

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
//       {/* Header */}
//       <header className="border-b border-slate-700">
//         <div className="container mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <Code2 className="h-7 w-7 text-blue-400" />
//               <span className="text-xl font-bold text-white">SyncSpace Editor</span>
//             </div>
            
//             <div className="flex items-center space-x-4">
//               {!roomCreated && (
//                 <button
//                   onClick={generateRoomId}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
//                 >
//                   <Users size={18} />
//                   <span>Create Room</span>
//                 </button>
//               )}
              
//               {roomId && !roomCreated && (
//                 <button
//                   onClick={() => {
//                     socket?.send(JSON.stringify({ type: "sender", roomId: roomId }))
//                   }}
//                   className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
//                 >
//                   <Share2 size={18} />
//                   <span>Connect</span>
//                 </button>
//               )}
//             </div>
//           </div>
          
//           {roomId && !roomCreated && (
//             <div className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
//               <p className="text-gray-300">Room ID: <span className="text-blue-400 font-mono">{roomId}</span></p>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Editor */}
//       {roomCreated && (
//         <main className="container mx-auto px-6 py-8">
//           <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-6">
//             <div className="prose prose-invert max-w-none">
//               <EditorContent editor={editor} className="min-h-[500px] focus:outline-none" />
//             </div>
//           </div>
//         </main>
//       )}
//     </div>
//   );
// };

// export default TextEditor;