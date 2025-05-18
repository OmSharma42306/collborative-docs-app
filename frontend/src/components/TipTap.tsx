// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useEffect, useState } from "react";
// import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";


// import Document from '@tiptap/extension-document'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'

// // Socket Messages and Data types

// interface SocketData{
//   msg:string;
//   data:CursorData;
//   type:string;
// }

// // interface for Position of Cursors

// interface CursorPostions{
//   from:number;
//   to:number
// }

// // websocket incomming data types
// interface CursorData{
//   userId:string;
//   name:string;
//   from:number;
//   to:number;
//   color:string;
// }


// const host = import.meta.env.VITE_HOST
// const myUserId:string = "omya";

// const TextEditor: React.FC = () => {
  
//   const [socket,setSocket] = useState<WebSocket>();
//   const [text,setText] = useState<string|null>("");
//   const [roomId,setRoomId] = useState<string>("");
//   const [roomCreated,setRoomCreated] = useState<Boolean>(false);
//   const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});


//   // useeffect for socket initialization.
  
//   function generateRoomId(){
//     const randomNumber:string = Math.floor(1000000+ Math.random() * 9000000).toString();
//     setRoomId(randomNumber);
//   }
  
  
//     console.log("TRIGGERD")
//     useEffect(()=>{
//       const socket = new WebSocket(`wss://${host}/ws/${roomId}`);
      
//       console.log("RoomID",roomId);
//       if(!socket || socket.readyState !== WebSocket.OPEN){
//         console.log("Sockets are Not Connected!");
//       }
  
//       socket.onopen = () =>{
//         console.log("Sockets are Connected!");
//         setSocket(socket);
//       }
      
  
      
//       return ()=>{
//         socket.close();
//       }
  
//     },[roomId]);
  
  

  
//   // Sending Edits event to WebSocket Server through Sockets.
//   useEffect(()=>{
//     if(!socket || socket.readyState !== WebSocket.OPEN){
//       console.log("Sockets are Not Connected!");
//       return;
//     }
//     socket?.send(JSON.stringify({type:"sender-edit",data:text}))
//   },[text])

//   if(socket){
//     socket.onmessage = async (event:any) =>{
//       const {msg,data,type}:SocketData= JSON.parse(event.data);
//       console.log(msg);
//       setRoomCreated(true);

//       if(type === "receiverData"){
//         editor?.commands.setContent(`<p>${data}</p>`);
//       }else if(type === "senderCursor" || type === "receiverCursor"){
//         const {userId,name,from,to,color}:CursorData = data;
//         if(userId !== myUserId){
//           setRemoteCursors(prev=>({
//             ...prev,
//             [userId]:{from,to,name,color}
//           }))
//         }
//       }

//     }
//   }
  
//   // Editor Area Stuff.
//   const editor = useEditor({
//     extensions: [StarterKit,Document,Paragraph,Text,

//       RemoteCursorExtension.configure({
//         cursors:remoteCursors,
//       })
//     ], // Basic formatting (bold, italic, lists, etc.)
//     content:
//     // "<p>Start writing...</p>", // Initial content
//     `
//     <p>
//       This is a radically reduced version of Tiptap. It has support for a document, with paragraphs and text. That’s it. It’s probably too much for real minimalists though.
//     </p>
//     <p>
//       The paragraph extension is not really required, but you need at least one node. Sure, that node can be something different.
//     </p>
//   `,
//     onUpdate: ({editor}) => {
//         // get content in JSON format.
//         const content = editor.getJSON();
//         let extractedContent:string|any = "";
//         content.content?.map(co=>{
//             co.content?.map(c=>{
//                  extractedContent+=c.text;
//             })
            
//         })
//         setText(extractedContent);
//     },
//     onSelectionUpdate:({editor})=>{
//       const {from,to}:CursorPostions = editor.state.selection;

//       socket?.send(JSON.stringify({
//         type:"cursor-update-sender",
//         userId:"omya",
//         name:"Omya",
//         color:"Blue",
//         from,
//         to,
//       }))

//     }
//   }
// );

// useEffect(() => {
//   if (!editor) return

//   editor.view.dispatch(
//     editor.view.state.tr.setMeta('remoteCursorPlugin', {
//       cursors: remoteCursors,
//     })
//   )
// }, [remoteCursors])


//   return (
//     <div>
//       <button onClick={generateRoomId}>Create Room Id</button>
      
//       {roomId?<div>
//         <h1>RoomId : {roomId}</h1>
//         <button onClick={()=>{
//         socket?.send(JSON.stringify({type:"sender",roomId:roomId}))
//       }}>Connect</button>
//       </div>
//       :"" }
    
//     {roomCreated?<div className="editor-container">
//       <EditorContent  editor={editor} />
      

//     </div>:""}
//     </div>
//   );
// };

// export default TextEditor;


// Added UI STUFF TO EDITOR....

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin"; // Your plugin
import { Bold, Italic, List, Heading1, Heading2, Users, Share2 } from "lucide-react";

interface SocketData {
  msg: string;
  data: CursorData;
  type: string;
}

interface CursorData {
  userId: string;
  name: string;
  from: number;
  to: number;
  color: string;
}

interface CursorPostions {
  from: number;
  to: number;
}

const host = import.meta.env.VITE_HOST;
const myUserId = "omya";

const TextEditor: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [text, setText] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string>("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number; to: number; color: string; name: string }>>({});

  function generateRoomId() {
    const randomNumber: string = Math.floor(1000000 + Math.random() * 9000000).toString();
    setRoomId(randomNumber);
  }

  useEffect(() => {
    if (!roomId) return;
    const socket = new WebSocket(`wss://${host}/ws/${roomId}`);
    socket.onopen = () => {
      console.log("Sockets Connected");
      setSocket(socket);
    };
    socket.onclose = () => console.log("Socket closed");
    socket.onerror = (e) => console.error("Socket error", e);

    return () => socket.close();
  }, [roomId]);

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ type: "sender-edit", data: text }));
  }, [text]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      RemoteCursorExtension.configure({
        cursors: remoteCursors,
      }),
    ],
    content: "<p>Start writing here...</p>",
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      let extracted = "";
      json.content?.forEach((block) => {
        block.content?.forEach((c) => {
          extracted += c.text ?? "";
        });
      });
      setText(extracted);
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to }: CursorPostions = editor.state.selection;
      socket?.send(
        JSON.stringify({
          type: "cursor-update-sender",
          userId: myUserId,
          name: "Omya",
          color: "blue",
          from,
          to,
        })
      );
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.view.dispatch(
      editor.view.state.tr.setMeta("remoteCursorPlugin", {
        cursors: remoteCursors,
      })
    );
  }, [remoteCursors]);

  if (socket) {
    socket.onmessage = (event: any) => {
      const { data, type }: SocketData = JSON.parse(event.data);
      setRoomCreated(true);

      if (type === "receiverData") {
        editor?.commands.setContent(`<p>${data}</p>`);
      } else if (type === "senderCursor" || type === "receiverCursor") {
        const { userId, name, from, to, color }: CursorData = data;
        if (userId !== myUserId) {
          setRemoteCursors((prev) => ({
            ...prev,
            [userId]: { from, to, name, color },
          }));
        }
      }
    };
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">📄 SyncSpace Docs</h1>
        <div className="flex items-center gap-3">
          {!roomCreated && (
            <button
              onClick={generateRoomId}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Users size={16} />
              Create Room
            </button>
          )}
          {roomId && !roomCreated && (
            <button
              onClick={() =>
                socket?.send(JSON.stringify({ type: "sender", roomId }))
              }
              className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <Share2 size={16} />
              Connect
            </button>
          )}
        </div>
      </header>

      {/* Room Info */}
      {roomId && !roomCreated && (
        <div className="text-center text-sm text-gray-600 mt-2">
          Room ID: <code className="bg-gray-200 px-2 py-1 rounded">{roomId}</code>
        </div>
      )}

      {/* Editor */}
      {roomCreated && (
        <main className="flex justify-center py-10 px-4">
          <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded-md ${
                  editor?.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <Bold size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded-md ${
                  editor?.isActive("italic") ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <Italic size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 rounded-md ${
                  editor?.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1 rounded-md ${
                  editor?.isActive("heading", { level: 1 }) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <Heading1 size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1 rounded-md ${
                  editor?.isActive("heading", { level: 2 }) ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <Heading2 size={16} />
              </button>
            </div>

            {/* Editor Area */}
            <div className="prose max-w-none">
              <EditorContent editor={editor} className="min-h-[300px]" />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default TextEditor;
