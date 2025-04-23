import EditorSender from './components/Editor_Sender'
import EditorReceiver from './components/Editor_Receiver'
import Dashboard from './components/Dashboard';
import SignUp from './components/SignUp';
import {Route,Routes,useNavigate} from "react-router-dom"
import { useEffect, useState } from 'react';
import Login from './components/Login';
import LandingPage from './components/LandingPage';
import CreateDocument from './components/CreateDocument';
import GetAllDocuments from './components/GetAllDocuments';
function App() {
  const navigate = useNavigate();
  const [isAuthenticated,setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!isAuthenticated);
  },[])

  if(isAuthenticated === null){
    return(
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
    )
  }

  
  
  
  return (
    <div>
    <Routes>
      <Route path='/' element={<LandingPage/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/sender' element={<EditorSender />}></Route>
      <Route path='/receiver' element={<EditorReceiver/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/createDocument'element={<CreateDocument/>}></Route>
      <Route path='/getAllDocuments' element={<GetAllDocuments/>}></Route>
    </Routes>
  
    </div>
  )
}

export default App
