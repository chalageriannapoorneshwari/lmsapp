import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    onLogin();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-f1-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-f1-carbon p-8 rounded-sm border-t-4 border-f1-green shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-display italic font-black uppercase tracking-tighter text-white">
            PIT <span className="text-f1-green">ENTRY</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase italic mt-2 tracking-widest">Authorized Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Email Terminal</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
              <input 
                type="email"
                required
                className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium"
                placeholder="driver@kle.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
              <input 
                type="password"
                required
                className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-f1-green hover:bg-f1-green/90 text-white font-black uppercase italic py-4 flex items-center justify-center gap-3 transform -skew-x-12 transition-all group shadow-lg shadow-f1-green/20"
          >
            Initiate Sync <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-f1-slate text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase italic tracking-widest mb-4">New Personnel?</p>
          <button 
            onClick={onSwitchToRegister}
            className="text-white hover:text-f1-green text-[11px] font-black uppercase italic underline decoration-f1-green decoration-2 underline-offset-4 transition-colors"
          >
            Apply for Technical Credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
};
