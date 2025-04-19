import { useState } from "react"
import axios from "axios";
export default function CreateDocument(){
    const [documentName,setDocumentName] = useState<string>("");

    async function handleCreateDocument(){
        const response = await axios.post("http://localhost:3000/api/v1/docs/create-doc",{documentName:documentName})
        const data = response.data;
        console.log(data);
    }

    return <div>
        <h1>Enter Document Name</h1>
        <input type="text" placeholder="Enter Document Name" onChange={(e)=>{
            setDocumentName(e.target.value);
        }} />
        <button onClick={handleCreateDocument}>Create Document</button>

    </div>
}