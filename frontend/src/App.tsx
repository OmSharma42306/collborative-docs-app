import EditorSender from './components/Editor_Sender'
import EditorReceiver from './components/Editor_Receiver'
import {Route,Routes,useNavigate} from "react-router-dom"
function App() {
  const navigate = useNavigate();
  return (
    <div>
    <Routes>
      <Route path='/sender' element={<EditorSender/>}></Route>
      <Route path='/receiver' element={<EditorReceiver/>}></Route>
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
