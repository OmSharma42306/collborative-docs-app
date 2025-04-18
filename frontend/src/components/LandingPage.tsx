
// import { Code2, Users, Zap, Globe2, ArrowRight } from 'lucide-react';

// function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
//       {/* Hero Section */}
//       <nav className="container mx-auto px-6 py-6">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Code2 className="h-8 w-8 text-blue-400" />
//             <span className="text-2xl font-bold text-white">SyncSpace</span>
//           </div>
//           <div className="hidden md:flex space-x-8">
//             <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
//             <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
//             <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
//           </div>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
//             Try Now
//           </button>
//         </div>
//       </nav>

//       <main className="container mx-auto px-6 pt-20 pb-12">
//         <div className="text-center max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
//             Collaborate in Real-Time,{' '}
//             <span className="text-blue-400">Code Together</span>
//           </h1>
//           <p className="text-xl text-gray-300 mb-12">
//             Experience seamless collaboration with our real-time collaborative editor. 
//             Write, edit, and create together from anywhere in the world.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4">
//             <button className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
//               <span>Get Started</span>
//               <ArrowRight className="w-5 h-5" />
//             </button>
//             <button className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
//               <span>Live Demo</span>
//             </button>
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="mt-32 grid md:grid-cols-3 gap-12">
//           <div className="bg-slate-800/50 p-8 rounded-xl">
//             <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
//               <Zap className="h-6 w-6 text-blue-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-4">Real-Time Editing</h3>
//             <p className="text-gray-400">
//               See changes instantly as your team edits. No delays, no conflicts, just smooth collaboration.
//             </p>
//           </div>
//           <div className="bg-slate-800/50 p-8 rounded-xl">
//             <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
//               <Users className="h-6 w-6 text-blue-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-4">Multi-User Support</h3>
//             <p className="text-gray-400">
//               Work with unlimited team members simultaneously. Perfect for pair programming and team collaboration.
//             </p>
//           </div>
//           <div className="bg-slate-800/50 p-8 rounded-xl">
//             <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
//               <Globe2 className="h-6 w-6 text-blue-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-4">Cloud-Powered</h3>
//             <p className="text-gray-400">
//               Access your workspace from anywhere. Your work is always saved and synced in real-time.
//             </p>
//           </div>
//         </div>

//         {/* Preview Image */}
//         <div className="mt-20 rounded-xl overflow-hidden shadow-2xl">
//           <img 
//             src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
//             alt="Code Editor Preview"
//             className="w-full h-auto"
//           />
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="border-t border-slate-800">
//         <div className="container mx-auto px-6 py-8">
//           <div className="flex flex-col md:flex-row justify-between items-center">
//             <div className="flex items-center space-x-2 mb-4 md:mb-0">
//               <Code2 className="h-6 w-6 text-blue-400" />
//               <span className="text-xl font-bold text-white">SyncSpace</span>
//             </div>
//             <div className="text-gray-400">
//               © 2025 SyncSpace. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;



import { 
  Files, 
  Users, 
  Settings, 
  PlusCircle, 
  Clock, 
  Star,
  Activity
} from 'lucide-react';

function LandingPage() {
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">DocCollab</h1>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <PlusCircle size={20} />
              New Document
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
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
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
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
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
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{doc.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Last edited {doc.lastEdited}</p>
                  </div>
                  <div className="flex -space-x-2">
                    {[...Array(doc.collaborators)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                      >
                        <Users size={14} className="text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <Activity size={20} className="text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users size={14} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-900">{activity.user}</span>{' '}
                      {activity.action}{' '}
                      <span className="font-medium text-gray-900">{activity.document}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
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

export default LandingPage;