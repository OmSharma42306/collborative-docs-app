// import { useState } from "react"
// import axios from "axios";
// const token = localStorage.getItem("token");
// export default function CreateDocument(){
//     const [documentName,setDocumentName] = useState<string>("");

//     async function handleCreateDocument(){
//         const response = await axios.post("http://localhost:3000/api/v1/docs/create-doc",{documentName:documentName},
//            { headers: {
//                 Authorization : `Bearer ${token}`
//               }
//             }
            
//         )
//         const data = response.data;
//         console.log(data);
//     }

//     return <div>
//         <h1>Enter Document Name</h1>
//         <input type="text" placeholder="Enter Document Name" onChange={(e)=>{
//             setDocumentName(e.target.value);
//         }} />
//         <button onClick={handleCreateDocument}>Create Document</button>

//     </div>
// }




// new code with ui

import { useState } from "react"
import axios from "axios";
import { Code2, FileText, Plus } from 'lucide-react';
const token = localStorage.getItem("token");
const host = import.meta.env.VITE_HOST
export default function CreateDocument(){
    const [documentName,setDocumentName] = useState<string>("");

    async function handleCreateDocument(){
        const response = await axios.post(`http://${host}:3000/api/v1/docs/create-doc`,{documentName:documentName},
           { headers: {
                Authorization : `Bearer ${token}`
              }
            }
            
        )
        const data = response.data;
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <header className="border-b border-slate-700">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Code2 className="h-7 w-7 text-blue-400" />
                        <span className="text-xl font-bold text-white">Create New Document</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="max-w-md mx-auto">
                    <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <FileText className="h-6 w-6 text-blue-400" />
                            <h1 className="text-xl font-semibold text-white">Enter Document Name</h1>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <input 
                                    type="text" 
                                    placeholder="Enter Document Name" 
                                    onChange={(e)=>{
                                        setDocumentName(e.target.value);
                                    }}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                            
                            <button 
                                onClick={handleCreateDocument}
                                className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                            >
                                <Plus className="h-5 w-5" />
                                <span>Create Document</span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}