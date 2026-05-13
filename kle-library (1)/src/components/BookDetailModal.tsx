import React from 'react';
import { Book } from '../types';
import { X, Calendar, Hash, Tag, User, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ isOpen, onClose, book }) => {
  if (!book) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-f1-black/90 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-white w-full max-w-4xl shadow-2xl overflow-hidden rounded-sm flex flex-col md:flex-row"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-f1-black text-white p-2 rounded-full hover:bg-f1-red transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto h-full bg-gray-100 overflow-hidden">
              <img 
                src={book.coverImage || 'https://images.unsplash.com/photo-1543004629-ff569f872783?auto=format&fit=crop&q=80&w=600'} 
                alt={book.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="mb-8">
                <div className="inline-block bg-f1-red text-white text-[10px] font-bold px-3 py-1 italic uppercase transform -skew-x-12 mb-4 tracking-widest">
                  {book.category}
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-black italic tracking-tighter uppercase leading-tight mb-4 text-f1-black">
                  {book.title}
                </h2>
                <div className="flex items-center gap-2 text-xl font-medium text-gray-500 italic">
                  <User className="w-5 h-5 text-f1-red" />
                  {book.author}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                    <Calendar className="w-3 h-3" />
                    Published
                  </div>
                  <div className="text-xl font-display font-bold text-f1-black italic">{book.year}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                    <Hash className="w-3 h-3" />
                    ISBN Serial
                  </div>
                  <div className="text-xl font-display font-medium text-f1-black italic">{book.isbn}</div>
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="p-4 bg-gray-100 border-l-4 border-f1-red text-sm text-gray-600 font-sans leading-relaxed">
                  "Speed is a matter of time, but knowledge is a matter of focus. Secure this engine in your collection for maximum academic performance."
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      // Logic for borrowing can be added later
                      alert('Borrowing functionality coming soon to the grid!');
                    }}
                    className="flex-1 bg-f1-black text-white px-6 py-4 rounded-sm font-display font-black italic text-sm uppercase tracking-tighter hover:bg-f1-red transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Reserve Entry
                  </button>
                </div>
              </div>
            </div>
            
            {/* Design Accents */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-f1-red via-f1-black to-f1-red" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
