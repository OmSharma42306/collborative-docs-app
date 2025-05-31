import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { RemoteCursorExtension } from "./utils/remote-cursor-plugin";
import { Bold, Italic, List, Heading1, Heading2, Share2 } from "lucide-react";
import {SocketData,CursorData,CursorPostions} from "../Types/types"

const host = import.meta.env.VITE_HOST;
// todo add dynamic user name
const myUserId = "john";

const TextEditor2: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket>();
  const [text, setText] = useState<string | null>("");
  const [roomId, setRoomId] = useState<string>("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [remoteCursors, setRemoteCursors] = useState<Record<string, { from: number; to: number; color: string; name: string }>>({});

  useEffect(() => {
    if (!roomId) return;

    const socket = new WebSocket(`wss://${host}/ws/${roomId}`);
    // const socket = new WebSocket(`ws://${host}:8080/${roomId}`);

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
        <h1 className="text-xl font-bold text-gray-800">📝 CollabDocs</h1>
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
