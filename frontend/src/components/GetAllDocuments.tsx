import axios from "axios"
import { useEffect, useState } from "react";
const token = localStorage.getItem("token")
export default function GetAllDocuments(){
    const [allDocuments,setAllDocuments] = useState<[]>([]);
    useEffect(()=>{
    async function fetchAllDocuments(){
        const response = await axios.get("http://localhost:3000/api/v1/docs/get-all-docs",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
            console.log("Response",response)
            const data = response.data.allDocs;
            console.log(data)
            setAllDocuments(data);
        }
        fetchAllDocuments();
    },[])
    

    async function handleOpenDocument(){

    }

return <div>
<h1>All Documents are Listed Below</h1>
    {
        allDocuments && allDocuments.length>0 ? allDocuments.map((value:any)=>{
            return <div>
                {value.documentName}
                <br />
                
                <button onClick={handleOpenDocument}>Open the Document</button>
                
            </div>
        })  :"Loading...."
    }

    </div>
}