import axios from "axios";
import { useState } from "react"
import {useNavigate} from "react-router-dom"
export default function Login(){
    const [email,setEmail]  = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const navigate = useNavigate();
    async function handleLogin(){
        try{    
            const response = await axios.post("http://localhost:3000/api/v1/user/login",{email:email,password:password});
            const data = await response.data;
            console.log(data);
            const token = data.token;
            localStorage.setItem("JWT TOKEN",token);
            navigate("/")
            
            
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

        <h2 onClick={()=>{
            navigate("/signup")
        }}>New User ? Signup Here! </h2>

    </div>
}