import axios from "axios"
const token = localStorage.getItem("token")
export default function GetAllDocuments(){
    async function fetchAllDocuments(){
        const response = await axios.get("http://localhost:3000/api/v1/docs/get-all-docs",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        console.log("Response",response)

    }
    return <div>
gggg
<button onClick={fetchAllDocuments}>click</button>
    </div>
}