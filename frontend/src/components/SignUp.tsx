import { useState } from "react"
import axios from "axios";
export default function SignUp(){

    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");


    async function handleSignUp(){
        try{
            const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                name:name,email:email,password:password
            });
            const data = await response.data;
            console.log(data);
        }catch(error){
            console.error(error);
        }
    }

    return <div>
    <input type="text" placeholder="Name" onChange={(e)=>{
        setName(e.target.value);
    }}/>
    <br />
    <input type="email" placeholder="Email" onChange={(e)=>{
        setEmail(e.target.value);
    }}  />
    <br />
    <input type="password" placeholder="Password" onChange={(e)=>{
        setPassword(e.target.value);
    }}/>
    <br />
    <button onClick={handleSignUp}>SignUp</button>
    
    </div>
}