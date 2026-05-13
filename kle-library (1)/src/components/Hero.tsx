import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface HeroProps {
  role: UserRole;
}

export const Hero: React.FC<HeroProps> = ({ role }) => {
  const isStaff = role === 'EMPLOYEE' || role === 'ADMIN';

  return (
    <div 
      className={`relative overflow-hidden ${isStaff ? 'bg-slate-950' : 'bg-f1-black'} text-white min-h-[70vh] flex items-center bg-cover bg-center transition-colors duration-1000`}
      style={{ 
        backgroundImage: isStaff 
          ? 'linear-gradient(to right, rgba(15, 23, 42, 0.98) 30%, rgba(15, 23, 42, 0.8)), url("https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000")'
          : 'linear-gradient(to right, rgba(21, 21, 30, 0.95) 40%, rgba(21, 21, 30, 0.4)), url("https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=2000")' 
      }}
    >
      {/* Background Graphic Overlay */}
      <div className="absolute inset-0 opacity-40">
        {isStaff ? (
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        ) : (
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800/40 transform skew-x-[-20deg] translate-x-32" />
        )}
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col items-center text-center">
        <motion.div
          key={role}
          initial={{ opacity: 0, x: -100, skewX: -10 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="max-w-3xl flex flex-col items-center"
        >
          <h1 className="text-6xl md:text-8xl font-display font-extrabold italic leading-tight mb-6 text-gray-400">
            KLE <span className={`${isStaff ? 'text-blue-400' : 'text-f1-green'}`}>LIBRARY</span> <br />
            <span className="text-white">{isStaff ? 'MANAGEMENT' : 'KNOWLEDGE.'}</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-md mb-8 font-sans">
            {isStaff 
              ? 'Real-time telemetry and inventory control for the academic grand prix.'
              : 'Accelerate your learning curve with high-octane literature and technical excellence in the academic circuit.'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className={`${isStaff ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-gray-200'} ${isStaff ? 'text-white' : 'text-f1-black'} px-8 py-4 rounded-sm font-bold uppercase italic text-sm transition-all flex items-center gap-2 group shadow-xl`}>
              {isStaff ? 'Manage Inventory' : 'Browse Collection'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            {!isStaff && (
              <button className="border-2 border-white/40 hover:border-white px-6 py-2 rounded-sm font-bold uppercase italic text-sm transition-colors backdrop-blur-sm">
                Our Vision
              </button>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Velocity Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1 flex overflow-hidden">
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="flex-shrink-0 w-full flex justify-around"
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`h-full ${isStaff ? 'bg-blue-400/30' : 'bg-f1-green/30'} mx-2 w-20 transform -skew-x-45`} 
            />
          ))}
        </motion.div>
        <motion.div 
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
          className="flex-shrink-0 w-full flex justify-around absolute"
        >
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`h-full ${isStaff ? 'bg-blue-400/30' : 'bg-f1-green/30'} mx-2 w-20 transform -skew-x-45`} 
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
