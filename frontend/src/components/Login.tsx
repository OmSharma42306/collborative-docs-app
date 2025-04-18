import axios from "axios";
import { useState } from "react"

export default function Login(){
    const [email,setEmail]  = useState<string>("");
    const [password,setPassword] = useState<string>("");
    async function handleLogin(){
        try{    
            const response = await axios.post("http://localhost:3000/api/v1/user/login",{email:email,password:password});
            const data = await response.data;
            console.log(data);
            
        }catch(error){
            console.error(error);
        }
    }
    return <div>
        <input type="email" placeholder="Email" onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
        <br />
        <input type="password" placeholder="Password" onChange={(e)=>{
            setPassword(e.target.value);
        }} />
        <br />
        <button onClick={handleLogin}>Login</button>
    </div>
}