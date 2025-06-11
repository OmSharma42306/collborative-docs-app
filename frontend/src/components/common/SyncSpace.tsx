import { Code2 } from "lucide-react"

interface syncSpaceProps{
    color:string;
}

export default function SyncSpace({color}:syncSpaceProps){
    return <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-400" />
            {color==="white"?<span className="text-2xl font-bold text-white">SyncSpace</span>:<span className="text-2xl font-bold text-black">SyncSpace</span>}
            {/* <span className="text-2xl font-bold text-white">SyncSpace</span> */}
          </div>
}

