import { useRecoilValue } from "recoil";
import Tiptap from "./TipTap"
import { docsNameState } from "../recoil/atoms";

export default function EditorSender()    {
    const docsName = useRecoilValue(docsNameState);
    return <div className="card">
     <h1 className="text-2xl font-bold">Document Name : {docsName}</h1>
        <Tiptap />
    </div>
}