
// import { 
//     Files, 
//     Users, 
//     Settings, 
//     PlusCircle, 
//     Clock, 
//     Star,
//     Activity
//   } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
  
//   function Dashboard() {
//     const naviagte = useNavigate();
//     const recentDocs = [
//       { id: 1, title: "Product Roadmap 2024", lastEdited: "2 hours ago", collaborators: 5 },
//       { id: 2, title: "Meeting Notes", lastEdited: "5 hours ago", collaborators: 3 },
//       { id: 3, title: "Project Proposal", lastEdited: "1 day ago", collaborators: 4 },
//     ];
  
//     const activities = [
//       { id: 1, user: "Sarah K.", action: "edited", document: "Product Roadmap 2024", time: "2 hours ago" },
//       { id: 2, user: "Mike R.", action: "commented on", document: "Meeting Notes", time: "3 hours ago" },
//       { id: 3, user: "Alex M.", action: "created", document: "Project Proposal", time: "1 day ago" },
//     ];
  
//     return (
//       <div className="min-h-screen bg-gray-50 flex">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white border-r border-gray-200">
//           <div className="p-6">
//             <h1 className="text-2xl font-bold text-gray-800">DocCollab</h1>
//           </div>
//           <nav className="mt-6">
//             <div className="px-3">
//               <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>{
//                 naviagte("/createDocument")
//               }}>
//                 <PlusCircle size={20} />
//                 New Document
//               </button>
              
//             </div>
//             <div className='px-3 py-2.5'>
//             <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>{
//               naviagte("/receiver")
//             }}>
//                 <PlusCircle size={20} />
//                 Join Via Room Id
//               </button>
              
//             </div>
            
//             <div className='px-3 py-2.5'>
//             <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" onClick={()=>{
//               naviagte("/getAllDocuments")
//             }}>
//                 <PlusCircle size={20} />
//                 Open Existing Docs
//               </button>
              
//             </div>
            
            
//             <div className="px-3 mt-6 space-y-1">
//               {[
//                 { icon: Files, label: "My Documents" },
//                 { icon: Users, label: "Shared with me" },
//                 { icon: Star, label: "Starred" },
//                 { icon: Clock, label: "Recent" },
//                 { icon: Settings, label: "Settings" },
//               ].map((item) => (
//                 <a
//                   key={item.label}
//                   href="#"
//                   className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
//                 >
//                   <item.icon size={20} className="mr-3" />
//                   {item.label}
//                 </a>
//               ))}
//             </div>
//           </nav>
//         </aside>
  
//         {/* Main Content */}
//         <main className="flex-1 p-8">
//           <div className="max-w-7xl mx-auto">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
//               <div className="flex items-center gap-4">
//                 <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
//                   <Users size={20} />
//                   Share
//                 </button>
//               </div>
//             </div>
  
//             {/* Recent Documents Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//               {recentDocs.map((doc) => (
//                 <div
//                   key={doc.id}
//                   className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
//                 >
//                   <div className="flex items-start justify-between">
//                     <div>
//                       <h3 className="font-medium text-gray-900">{doc.title}</h3>
//                       <p className="text-sm text-gray-500 mt-1">Last edited {doc.lastEdited}</p>
//                     </div>
//                     <div className="flex -space-x-2">
//                       {[...Array(doc.collaborators)].map((_, i) => (
//                         <div
//                           key={i}
//                           className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
//                         >
//                           <Users size={14} className="text-gray-600" />
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
  
//             {/* Activity Feed */}
//             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//               <div className="flex items-center gap-2 mb-6">
//                 <Activity size={20} className="text-gray-600" />
//                 <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
//               </div>
//               <div className="space-y-4">
//                 {activities.map((activity) => (
//                   <div key={activity.id} className="flex items-start gap-4">
//                     <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
//                       <Users size={14} className="text-gray-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-gray-600">
//                         <span className="font-medium text-gray-900">{activity.user}</span>{' '}
//                         {activity.action}{' '}
//                         <span className="font-medium text-gray-900">{activity.document}</span>
//                       </p>
//                       <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
  
//   export default Dashboard;
import { 
  Files, 
  Users, 
  Settings, 
  PlusCircle, 
  Clock, 
  Star,
  Activity,
  Code2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const naviagte = useNavigate();
  const recentDocs = [
    { id: 1, title: "Product Roadmap 2024", lastEdited: "2 hours ago", collaborators: 5 },
    { id: 2, title: "Meeting Notes", lastEdited: "5 hours ago", collaborators: 3 },
    { id: 3, title: "Project Proposal", lastEdited: "1 day ago", collaborators: 4 },
  ];

  const activities = [
    { id: 1, user: "Sarah K.", action: "edited", document: "Product Roadmap 2024", time: "2 hours ago" },
    { id: 2, user: "Mike R.", action: "commented on", document: "Meeting Notes", time: "3 hours ago" },
    { id: 3, user: "Alex M.", action: "created", document: "Project Proposal", time: "1 day ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800/50 border-r border-slate-700/50">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <Code2 className="h-7 w-7 text-blue-400" />
            <span className="text-2xl font-bold text-white">SyncSpace</span>
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            <button 
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors" 
              onClick={() => naviagte("/createDocument")}
            >
              <PlusCircle size={20} />
              New Document
            </button>
          </div>
          
          <div className='px-3 py-2.5'>
            <button 
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors" 
              onClick={() => naviagte("/receiver")}
            >
              <Users size={20} />
              Join Via Room Id
            </button>
          </div>
          
          <div className='px-3 py-2.5'>
            <button 
              className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors" 
              onClick={() => naviagte("/getAllDocuments")}
            >
              <Files size={20} />
              Open Existing Docs
            </button>
          </div>
          
          <div className="px-3 mt-6 space-y-1">
            {[
              { icon: Files, label: "My Documents" },
              { icon: Users, label: "Shared with me" },
              { icon: Star, label: "Starred" },
              { icon: Clock, label: "Recent" },
              { icon: Settings, label: "Settings" },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <item.icon size={20} className="mr-3" />
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <Users size={20} />
                Share
              </button>
            </div>
          </div>

          {/* Recent Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-white">{doc.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">Last edited {doc.lastEdited}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(doc.collaborators)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center"
                      >
                        <Users size={14} className="text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-blue-400" />
              <h3 className="text-lg font-medium text-white">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
                    <Users size={14} className="text-gray-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-white">{activity.user}</span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium text-white">{activity.document}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;