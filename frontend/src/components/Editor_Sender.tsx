import Tiptap from "./TipTap"
export default function EditorSender({docsName}:any)    {
    console.log("Omya",docsName)
    return <div className="card">
        <h1>{docsName}</h1>
        <Tiptap />
    </div>
}