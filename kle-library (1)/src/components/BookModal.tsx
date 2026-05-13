import React, { useState, useEffect } from 'react';
import { Book } from '../types';
import { X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (book: Omit<Book, 'id'> & { id?: string }) => void;
  book?: Book | null;
}

export const BookModal: React.FC<BookModalProps> = ({ isOpen, onClose, onSave, book }) => {
  const [formData, setFormData] = useState<Omit<Book, 'id'>>({
    title: '',
    author: '',
    category: 'Fiction',
    year: new Date().getFullYear(),
    isbn: '',
    coverImage: ''
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.year,
        isbn: book.isbn,
        coverImage: book.coverImage || ''
      });
    } else {
      setFormData({
        title: '',
        author: '',
        category: 'Fiction',
        year: new Date().getFullYear(),
        isbn: '',
        coverImage: ''
      });
    }
  }, [book, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, id: book?.id });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-f1-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-md shadow-2xl overflow-hidden border-t-8 border-f1-red"
          >
            <div className="bg-f1-carbon p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="text-2xl text-white font-display italic">
                {book ? 'Update Engine' : 'Add New Entry'}
              </h2>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">Book Title</label>
                  <input
                    required
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold"
                    placeholder="Enter book title..."
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">Author / Team</label>
                  <input
                    required
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold"
                    placeholder="Who wrote it?"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold uppercase italic text-sm"
                    >
                      <option>Fiction</option>
                      <option>Non-Fiction</option>
                      <option>Biography</option>
                      <option>Design</option>
                      <option>Motorsport</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">Release Year</label>
                    <input
                      required
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">ISBN Serial</label>
                  <input
                    required
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold"
                    placeholder="Format: 000-0000000000"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1 italic tracking-widest">Cover Image URL</label>
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="w-full bg-gray-50 border-b-2 border-gray-200 focus:border-f1-red outline-none px-0 py-2 transition-colors font-semibold"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-f1-red hover:bg-red-700 text-white font-display uppercase italic font-bold py-4 rounded-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
              >
                <Save className="w-5 h-5" />
                {book ? 'Execute Update' : 'Apply for Grid'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
