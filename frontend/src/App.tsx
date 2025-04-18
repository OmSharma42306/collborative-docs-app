import EditorSender from './components/Editor_Sender'
import EditorReceiver from './components/Editor_Receiver'
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import {Route,Routes,useNavigate} from "react-router-dom"
import { useState } from 'react';
function App() {
  const navigate = useNavigate();

  // @ts-ignore
  const [userId,setUserId] = useState("");
  
  return (
    <div>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/sender' element={<EditorSender/>}></Route>
      <Route path='/receiver' element={<EditorReceiver/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
    </Routes>
    <button onClick={()=>{
      navigate("/sender")
    }}>Sender</button>
    <button onClick={()=>{
      navigate("/receiver")
    }}>Receiver</button>
    </div>
  )
}

export default App
