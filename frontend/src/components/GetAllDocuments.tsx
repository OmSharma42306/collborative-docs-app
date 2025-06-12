import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Code2, FileText, Plus, Loader2 } from 'lucide-react';
import { deleteDocument, getAllDocument } from "../api/api";
import { useRecoilState } from "recoil";
import { docsNameState } from "../recoil/atoms";

export default function GetAllDocuments(){
    const [allDocuments,setAllDocuments] = useState<[]>([]);
    const [,setDocsName] = useRecoilState(docsNameState);

    
    const navigate = useNavigate();
    useEffect(()=>{
    async function fetchAllDocuments(){
            const data = await getAllDocument();
            setAllDocuments(data);
        }
        fetchAllDocuments();
    },[])
    

    async function handleOpenDocument(docsName:string){
        setDocsName(docsName)
        navigate("/sender");
        
    }

    async function handleDeleteDocument(documentName:string){
        try{
            const response : any = await deleteDocument({documentName});
            console.log(response.data.msg);
            if(response.status === 200){
                // todo add a state managment to remove document after deletion without refershing page


            }
            alert(response.data.msg);

        }catch(error){
            console.error(error);
        }
        

        
    }


    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <header className="border-b border-slate-700">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center space-x-2">
                        <Code2 className="h-7 w-7 text-blue-400" />
                        <span className="text-xl font-bold text-white">Your Documents</span>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">All Documents</h1>
                    <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
                        <Plus size={18} />
                        // todo navigate or do an operation to create document.
                        <span>New Document</span> 
                    </button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allDocuments && allDocuments.length <= 0 ? (
                        <div className="col-span-full text-center py-12">
                            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-8">
                                <p className="text-gray-400">No documents found. Create your first document to get started.</p>
                            </div>
                        </div>
                    ) : allDocuments && allDocuments.length > 0 ? (
                        allDocuments.map((value: any) => (
                            <div key={value.documentName} className="bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex items-center space-x-3 mb-4">
                                        <FileText className="h-5 w-5 text-blue-400" />
                                        <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                                            {value.documentName}
                                        </h3>
                                    </div>
                                </div>
                                <div className="bg-slate-700/50 px-6 py-3">
                                    <button 
                                        onClick={() => handleOpenDocument(value.documentName)}
                                        className="w-full text-blue-400 hover:text-blue-300 transition font-medium"
                                    >
                                        Open Document
                                    </button>
                                </div>
                                <div className="bg-slate-700/50 px-6 py-3">
                                    <button 
                                        onClick={() => handleDeleteDocument(value.documentName)}
                                        className="w-full text-blue-400 hover:text-blue-300 transition font-medium"
                                    >
                                        Delete Document
                                    </button>
                                </div>
 
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex justify-center py-12">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Loading documents...</span>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}