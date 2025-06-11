import Tiptap from "./TipTap"
import { useLocation } from "react-router-dom"

export default function EditorSender()    {
    const location = useLocation();
    const docsName = location.state?.documentName || "untitled";
    
    return <div className="card">
     <h1 className="text-2xl font-bold">Document Name : {docsName}</h1>
        <Tiptap />
    </div>
}