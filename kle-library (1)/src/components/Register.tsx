import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Briefcase, GraduationCap, Calendar, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'STUDENT' as UserRole,
    age: '',
    department: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate register
    onRegister();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-f1-black">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl bg-f1-carbon p-10 rounded-sm border-t-4 border-f1-green shadow-2xl"
      >
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-display italic font-black uppercase tracking-tighter text-white">
            JOIN <span className="text-f1-green">GRID</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase italic mt-2 tracking-widest">Technical Personnel Registration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Callsign (Username)</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
                <input 
                  type="text"
                  required
                  className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium"
                  placeholder="FastDriver_01"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Age */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Years of Service (Age)</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
                <input 
                  type="number"
                  required
                  className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium"
                  placeholder="21"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Personnel Type (Role)</label>
              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
                <select 
                  className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium appearance-none"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                >
                  <option value="STUDENT">Junior Mechanic (Student)</option>
                  <option value="EMPLOYEE">Technical Crew (Employee)</option>
                  <option value="ADMIN">Team Principal (Admin)</option>
                </select>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase italic text-gray-400 tracking-widest ml-1">Engineering Sector (Dept/Course)</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-f1-green" />
                <input 
                  type="text"
                  required
                  className="w-full bg-f1-slate border-2 border-transparent focus:border-f1-green text-white pl-12 pr-4 py-3 text-sm outline-none transition-all italic font-medium"
                  placeholder="Mechanical Engineering"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-f1-green hover:bg-f1-green/90 text-white font-black uppercase italic py-4 flex items-center justify-center gap-3 transform -skew-x-12 transition-all group shadow-lg shadow-f1-green/20"
          >
            Confirm Deployment <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-f1-slate text-center">
          <p className="text-gray-400 text-[10px] font-black uppercase italic tracking-widest mb-4">Already Active?</p>
          <button 
            onClick={onSwitchToLogin}
            className="text-white hover:text-f1-green text-[11px] font-black uppercase italic underline decoration-f1-green decoration-2 underline-offset-4 transition-colors"
          >
            Sync Existing Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};
