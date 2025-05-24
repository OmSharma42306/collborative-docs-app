// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import React, { useEffect, useState } from "react";
// import "../styles/Editor.css"; // Add basic styles
// import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";

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

// // todo declaring just for test , later getting dynamically the name.
// const myUserId:string = "sagya";

// const TextEditor2: React.FC = () => {
  
//   const [socket,setSocket] = useState<WebSocket>();
//   const [text,setText] = useState<string|null>("");
//   const [roomId,setRoomId] = useState<string>("");
//   const [roomCreated,setRoomCreated] = useState<Boolean>(false);
//   const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number, to: number, color: string, name: string }>>({});

//   // useeffect for socket initialization.
  
//   useEffect(()=>{
//     const socket = new WebSocket(`wss://${host}/ws/${roomId}`);
    
//     if(!socket || socket.readyState !== WebSocket.OPEN){
//       console.log("Sockets are Not Connected!");
//     }

//     socket.onopen = () =>{
//       console.log("Sockets are Connected!");
//       setSocket(socket);
//     }

//     return ()=>{
//       socket.close(); // cleanup when component unmounts.// doubt.
//     }

//     // for when the text state changes the socket will send an data to ws server.
//   },[]);

//   // Sending Edits event to WebSocket Server through Sockets.
//   useEffect(()=>{
    
//     socket?.send(JSON.stringify({type:"receiver-edit",data:text}))
//   },[text])


//  useEffect(()=>{
//   if(!socket) return;
//   socket.onmessage = (event:any) =>{
//     console.log(event.data);
//     const {msg,data,type}:SocketData = JSON.parse(event.data);
//     console.log(msg);
//     setRoomCreated(true);

//     if(type === "senderData"){
//       editor?.commands.setContent(`<p>${data}</p>`)
//     }else if(type === "senderCursor" || type === "receiverCursor"){
//       const {userId,name,from,to,color}:CursorData = data;
      
//       if(userId !== myUserId){
//         setRemoteCursors(prev=>({
//           ...prev,
//           [userId]:{from,to,name,color}
//         }))
//       }
//     }
//   }
//  })

//  // Editor Stuff.
//   const editor = useEditor({
//     extensions: [StarterKit,RemoteCursorExtension.configure({
//       cursors:remoteCursors
//     })], // Basic formatting (bold, italic, lists, etc.)
//     content: "<p>Start writing...</p>", // Initial content
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
//         type:"cursor-update-receiver",
//         userId:"sagya",
//         name:"Sagar",
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
//       <h1>Enter RoomId given by Sender!</h1>
//       <input type="text" placeholder="Enter RoomId" onChange={(e)=>{
//         setRoomId(e.target.value);
//       }} />
//       {roomId?<button onClick={()=>{
//         socket?.send(JSON.stringify({type:"receiver",roomId:roomId}))
//       }}>Connect</button>:""}
// {roomCreated?<div className="editor-container">
//       <EditorContent editor={editor} />
//     </div>:""}
//     </div>
//   );
// };

// export default TextEditor2;

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";
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
const myUserId = "sagya";

const TextEditor2: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [text, setText] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string>("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number; to: number; color: string; name: string }>>({});

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`wss://${host}/ws/${roomId}`);

    socket.onopen = () => {
      console.log("Socket Connected");
      setSocket(socket);
    };

    socket.onclose = () => console.log("Socket closed");
    socket.onerror = (e) => console.error("Socket error", e);

    return () => socket.close();
  }, [roomId]);

  useEffect(() => {
    if (!socket || socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify({ type: "receiver-edit", data: text }));
  }, [text]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      RemoteCursorExtension.configure({
        cursors: remoteCursors,
      }),
    ],
    content: "<p>Start writing...</p>",
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
          type: "cursor-update-receiver",
          userId: myUserId,
          name: "Sagar",
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

      if (type === "senderData") {
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
        <h1 className="text-xl font-bold text-gray-800">📝 SyncSpace Viewer</h1>
        <div className="flex items-center gap-3">
          {!roomCreated && (
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter Room ID"
              className="border border-gray-300 px-3 py-1 rounded-md"
            />
          )}
          {roomId && !roomCreated && (
            <button
              onClick={() => socket?.send(JSON.stringify({ type: "receiver", roomId }))}
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
          Connecting to Room ID:{" "}
          <code className="bg-gray-200 px-2 py-1 rounded">{roomId}</code>
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

export default TextEditor2;
