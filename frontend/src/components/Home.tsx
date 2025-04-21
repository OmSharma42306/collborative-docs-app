import Login from "./Login";
import SignUp from "./SignUp";

interface props{
    type:string;
}

export default function Home(props:props){
    if(props.type === "signUp"){
        return <div>
        <SignUp/>
        </div>
    }else{
        return <div>
            <Login/>
        </div>
    }
}