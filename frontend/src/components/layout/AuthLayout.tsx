import React from 'react';
import Logo from '../common/Logo';
import { useNavigate } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-900 to-slate-800">
      <header className="py-6 px-6">
        <div className="container mx-auto">
          <div 
            className="cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <Logo size="medium" />
          </div>
        </div>
      </header>
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
              {subtitle && <p className="text-gray-400">{subtitle}</p>}
            </div>
            
            {children}
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="flex justify-center items-center">
            <p className="text-sm text-gray-500">© 2025 SyncSpace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}