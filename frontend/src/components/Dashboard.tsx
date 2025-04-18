import { useState } from 'react';
import { 
  Search, 
  Plus, 
  Code, 
  FileText, 
  Settings, 
  Users, 
  Bell, 
  LogOut, 
  Star, 
  Clock, 
  MoreVertical, 
  FolderPlus,
  Menu,
  X
} from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample project data
  const projects = [
    {
      id: 1,
      name: "Frontend Components",
      type: "code",
      lastEdited: "10 minutes ago",
      collaborators: 4,
      starred: true
    },
    {
      id: 2,
      name: "Project Roadmap",
      type: "document",
      lastEdited: "2 hours ago",
      collaborators: 7,
      starred: true
    },
    {
      id: 3,
      name: "API Documentation",
      type: "code",
      lastEdited: "Yesterday",
      collaborators: 3,
      starred: false
    },
    {
      id: 4,
      name: "Meeting Notes",
      type: "document",
      lastEdited: "3 days ago",
      collaborators: 12,
      starred: false
    },
    {
      id: 5,
      name: "Authentication Service",
      type: "code",
      lastEdited: "1 week ago",
      collaborators: 2,
      starred: false
    },
    {
      id: 6,
      name: "User Flow Diagrams",
      type: "document",
      lastEdited: "2 weeks ago",
      collaborators: 5,
      starred: false
    }
  ];

  // Recent activities
  const activities = [
    {
      user: "Alex Kim",
      action: "edited",
      project: "Frontend Components",
      time: "10 minutes ago"
    },
    {
      user: "Jamie Chen",
      action: "commented on",
      project: "Project Roadmap",
      time: "1 hour ago"
    },
    {
      user: "Morgan Taylor",
      action: "shared",
      project: "API Documentation",
      time: "3 hours ago"
    },
    {
      user: "Casey Jones",
      action: "created",
      project: "New Feature Spec",
      time: "Yesterday"
    }
  ];

  // Filter projects based on active tab
  const filteredProjects = projects.filter(project => {
    if (activeTab === 'all') return true;
    if (activeTab === 'code') return project.type === 'code';
    if (activeTab === 'docs') return project.type === 'document';
    if (activeTab === 'starred') return project.starred;
    return true;
  });

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar for desktop */}
      <aside 
        className={`${
          sidebarOpen ? 'lg:w-64' : 'lg:w-20'
        } fixed lg:static inset-y-0 left-0 z-50 transform ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-all duration-300 bg-white border-r border-slate-200 flex flex-col`}
      >
        {/* Logo area */}
        <div className={`h-16 flex items-center ${sidebarOpen ? 'px-6 justify-between' : 'justify-center'}`}>
          <div className="flex items-center">
            <Code size={28} className="text-indigo-600 shrink-0" />
            {sidebarOpen && <span className="text-xl font-bold text-indigo-600 ml-2">FluxEdit</span>}
          </div>
          
          {/* Mobile close button */}
          <button 
            className="lg:hidden text-slate-500 hover:text-slate-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-3">
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg font-medium bg-indigo-50 text-indigo-700"
              >
                <FileText size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">My Projects</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg font-medium"
              >
                <Users size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">Shared With Me</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg font-medium"
              >
                <Star size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">Starred</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg font-medium"
              >
                <Clock size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">Recent</span>}
              </a>
            </li>
          </ul>
          
          <div className={`mt-6 ${sidebarOpen ? 'px-6' : 'px-3'}`}>
            <div className={`h-px bg-slate-200 ${sidebarOpen ? 'mx-0' : 'mx-3'}`}></div>
          </div>
          
          <div className={`mt-6 ${sidebarOpen ? 'px-6' : 'px-3'}`}>
            <h3 className={`${sidebarOpen ? 'text-sm font-medium text-slate-500 mb-2' : 'sr-only'}`}>Teams</h3>
            <ul className="space-y-1">
              <li>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                >
                  <div className="w-6 h-6 rounded bg-emerald-500 flex items-center justify-center text-white font-medium text-xs shrink-0">FE</div>
                  {sidebarOpen && <span className="ml-3">Frontend Team</span>}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                >
                  <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white font-medium text-xs shrink-0">BE</div>
                  {sidebarOpen && <span className="ml-3">Backend Team</span>}
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                >
                  <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-white font-medium text-xs shrink-0">PM</div>
                  {sidebarOpen && <span className="ml-3">Product Team</span>}
                </a>
              </li>
            </ul>
          </div>
        </nav>
        
        {/* Bottom items */}
        <div className="p-4 border-t border-slate-200">
          <ul className="space-y-1">
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
              >
                <Settings size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">Settings</span>}
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="flex items-center px-3 py-2 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
              >
                <LogOut size={20} className="shrink-0" />
                {sidebarOpen && <span className="ml-3">Logout</span>}
              </a>
            </li>
          </ul>
        </div>
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
          {/* Left side - Mobile menu button and search */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-slate-600 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <button 
              className="hidden lg:block text-slate-600"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64 text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>
          
          {/* Right side - User menu */}
          <div className="flex items-center space-x-3">
            <button className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-red-500 w-2 h-2 rounded-full"></span>
            </button>
            <div className="flex items-center">
              <div className="hidden md:block mr-3 text-right">
                <div className="text-sm font-medium">Morgan Smith</div>
                <div className="text-xs text-slate-500">morgan@fluxedit.com</div>
              </div>
              <div className="relative">
                <button className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium">
                  MS
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-4 lg:px-8 py-6 bg-slate-50">
          {/* Dashboard header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">My Projects</h1>
              <p className="text-slate-500 mt-1">Manage and access your collaborative projects</p>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button className="px-4 py-2 text-sm rounded-lg border border-slate-300 hover:bg-slate-100 flex items-center justify-center">
                <FolderPlus size={18} className="mr-2" />
                New Folder
              </button>
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center">
                <Plus size={18} className="mr-2" />
                New Project
              </button>
            </div>
          </div>
          
          {/* Project filter tabs */}
          <div className="flex border-b border-slate-200 mb-6">
            <button 
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'all' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Projects
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'code' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('code')}
            >
              Code
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'docs' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('docs')}
            >
              Documents
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'starred' 
                  ? 'text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('starred')}
            >
              Starred
            </button>
          </div>
          
          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {project.type === 'code' ? (
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                          <Code size={20} />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                          <FileText size={20} />
                        </div>
                      )}
                      <div className="ml-3">
                        <h3 className="font-medium text-slate-900">{project.name}</h3>
                        <p className="text-xs text-slate-500">Last edited {project.lastEdited}</p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex -space-x-2">
                      {Array(Math.min(project.collaborators, 3)).fill(0).map((_, i) => (
                        <div 
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-medium"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      {project.collaborators > 3 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-medium">
                          +{project.collaborators - 3}
                        </div>
                      )}
                    </div>
                    <button className={`text-${project.starred ? 'amber-400' : 'slate-300'} hover:text-amber-400`}>
                      <Star size={18} fill={project.starred ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>
                <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500">{project.type === 'code' ? 'Code' : 'Document'}</span>
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                    Open
                  </button>
                </div>
              </div>
            ))}
            
            {/* New project card */}
            <div className="bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center p-5 hover:border-indigo-400 transition-colors cursor-pointer h-full min-h-40">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mx-auto mb-3">
                  <Plus size={24} />
                </div>
                <h3 className="font-medium text-slate-700 mb-1">Create new project</h3>
                <p className="text-sm text-slate-500">Start a new collaborative document</p>
              </div>
            </div>
          </div>
          
          {/* Activity section */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">View all</button>
            </div>
            
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
             {activities.map((activity, index) => (
                <div 
                  key={index} 
                  className={`px-5 py-4 flex items-center ${
                    index !== activities.length - 1 ? 'border-b border-slate-100' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-medium shrink-0">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm">
                      <span className="font-medium text-slate-900">{activity.user}</span>
                      <span className="text-slate-600"> {activity.action} </span>
                      <span className="font-medium text-slate-900">{activity.project}</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                  {activity.action === 'shared' && (
                    <button className="text-sm px-3 py-1 border border-slate-300 rounded-lg hover:bg-slate-50">
                      View
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;