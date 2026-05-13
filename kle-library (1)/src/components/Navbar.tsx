import React from 'react';
import { UserRole, View } from '../types';
import { Trophy, Users, ShieldCheck, LogIn, UserPlus } from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentView: View;
  setCurrentView: (view: View) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, setRole, currentView, setCurrentView }) => {
  return (
    <nav className="bg-f1-black text-white sticky top-0 z-50 border-b-4 border-f1-green">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
            <span className="text-2xl font-display italic font-extrabold tracking-tighter">
              KLE <span className="text-f1-green">LIBRARY</span>
            </span>
          </div>

          {/* Core Navigation */}
          <div className="hidden lg:flex items-center gap-1 h-full">
            {['home', 'blog', 'about', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'home' || item === 'blog') {
                    setCurrentView(item);
                  }
                }}
                className={`relative px-6 py-2 text-[11px] font-black uppercase italic tracking-tighter transition-all overflow-hidden group h-full flex items-center gap-2 ${
                  currentView === item ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className={`w-1 h-1 rounded-full ${currentView === item ? 'bg-f1-green shadow-[0_0_8px_var(--color-f1-green)]' : 'bg-f1-slate group-hover:bg-f1-green'} transition-all`} />
                <div className={`absolute inset-0 bg-f1-green opacity-0 group-hover:opacity-10 transition-opacity transform -skew-x-20 translate-y-12 group-hover:translate-y-0 duration-300 ${currentView === item ? 'opacity-10 translate-y-0' : ''}`} />
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentView('login')}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase italic tracking-widest transition-all ${
                  currentView === 'login' ? 'text-f1-green' : 'text-white hover:text-f1-green'
                }`}
              >
                <LogIn className="w-3 h-3" />
                Login
              </button>
              <div className="h-4 w-px bg-f1-slate" />
              <button 
                onClick={() => setCurrentView('register')}
                className={`flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase italic tracking-widest transition-all ${
                  currentView === 'register' ? 'text-f1-green' : 'text-white hover:text-f1-green'
                }`}
              >
                <UserPlus className="w-3 h-3" />
                Register
              </button>
            </div>

            {/* Role Switcher */}
            <div className="hidden sm:flex items-center gap-4 bg-f1-carbon p-1 rounded-sm border border-f1-slate">
              <button
                onClick={() => setRole('STUDENT')}
                className={`flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase italic transition-colors rounded-sm ${
                  role === 'STUDENT' ? 'bg-f1-green text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-3 h-3" />
                Student
              </button>
              <button
                onClick={() => setRole('EMPLOYEE')}
                className={`flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase italic transition-colors rounded-sm ${
                  role === 'EMPLOYEE' ? 'bg-f1-green text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Trophy className="w-3 h-3" />
                Crew
              </button>
              <button
                onClick={() => setRole('ADMIN')}
                className={`flex items-center gap-2 px-3 py-1 text-xs font-bold uppercase italic transition-colors rounded-sm ${
                  role === 'ADMIN' ? 'bg-f1-green text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3" />
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-nav indicator */}
      <div className="bg-f1-green h-1 w-full overflow-hidden">
        <div className="bg-white/30 h-full w-1/3 animate-[shimmer_2s_infinite]"></div>
      </div>
      
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </nav>
  );
};
