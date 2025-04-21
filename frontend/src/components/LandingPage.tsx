
import { Code2, Users, Zap, Globe2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">SyncSpace</span>
          </div>
          <div className="hidden md:flex space-x-10">
            <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          </div>
          <button onClick={()=>{
            navigate("/login")
          }} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">
            Login
          </button>
          
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-12">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Collaborate in Real-Time,{' '}
            <span className="text-blue-400">Code Together</span>
          </h1>
          <p className="text-xl text-gray-300 mb-12">
            Experience seamless collaboration with our real-time collaborative editor. 
            Write, edit, and create together from anywhere in the world.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={()=>{
              navigate("/signup")
            }} className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition">
              <span>Live Demo</span>
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-12">
          <div className="bg-slate-800/50 p-8 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
              <Zap className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Real-Time Editing</h3>
            <p className="text-gray-400">
              See changes instantly as your team edits. No delays, no conflicts, just smooth collaboration.
            </p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Multi-User Support</h3>
            <p className="text-gray-400">
              Work with unlimited team members simultaneously. Perfect for pair programming and team collaboration.
            </p>
          </div>
          <div className="bg-slate-800/50 p-8 rounded-xl">
            <div className="bg-blue-500/10 w-12 h-12 flex items-center justify-center rounded-lg mb-6">
              <Globe2 className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">Cloud-Powered</h3>
            <p className="text-gray-400">
              Access your workspace from anywhere. Your work is always saved and synced in real-time.
            </p>
          </div>
        </div>

        {/* Preview Image */}
        <div className="mt-20 rounded-xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80"
            alt="Code Editor Preview"
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold text-white">SyncSpace</span>
            </div>
            <div className="text-gray-400">
              © 2025 SyncSpace. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;


