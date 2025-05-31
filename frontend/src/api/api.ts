import axios from "axios";
import { signUpType,signInType,createDocumentType,deleteDocumentType } from "../Types/types";
const host = import.meta.env.VITE_HOST
const token = localStorage.getItem("token");
const sslEndPoint = `https://${host}/api/v1`;
const localEndPoint = `http://${host}:3000/api/v1`

console.log("FOR TEST PURPOSE : ",localEndPoint);

export async function signUp({name,email,password}:signUpType){
    const response = await axios.post(`${sslEndPoint}/user/signup`, {
        name: name,
        email: email,
        password: password
      });

      console.log("REs",response.data);
}

export async function signIn({email,password}:signInType){
    const response = await axios.post(`${sslEndPoint}/user/login`, {
        email: email,
        password: password
      });
    return response.data;
}

export async function createDocument({documentName}:createDocumentType){
    const response = await axios.post(`${sslEndPoint}/docs/create-doc`,{documentName:documentName},
           { headers: {
                Authorization : `Bearer ${token}`
              }
            }            
        )
    return response.data;
}

export async function getAllDocument(){
    const response = await axios.get(`${sslEndPoint}/docs/get-all-docs`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
    return response.data.allDocs;
}

export async function deleteDocument({documentName}:deleteDocumentType){

    const response = await axios.post(`${sslEndPoint}/docs/delete-doc`,{documentName},{
                headers:{
                    Authorization:`Bearer ${token}`
                },
    })
    return response;
}

