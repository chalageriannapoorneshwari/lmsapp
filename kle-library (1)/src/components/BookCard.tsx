import React from 'react';
import { Book, UserRole } from '../types';
import { Edit2, Trash2, BookOpen } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
  onView: (book: Book) => void;
  role: UserRole;
  compact?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete, onView, role, compact }) => {
  const canModify = role === 'EMPLOYEE' || role === 'ADMIN';
  const isStaff = role === 'EMPLOYEE' || role === 'ADMIN';

  return (
    <div className={`${isStaff ? 'bg-slate-900 border-l-4 border-blue-600 shadow-2xl' : 'bg-white border-l-4 border-f1-black shadow-lg'} f1-card-hover group overflow-hidden flex flex-col h-full ${compact ? 'text-sm' : ''} transition-all duration-300`}>
      <div 
        className={`relative ${compact ? 'aspect-[2/3]' : 'aspect-[3/4]'} overflow-hidden ${isStaff ? 'bg-slate-900' : 'bg-gray-100'} cursor-pointer`}
        onClick={() => onView(book)}
      >
        <img 
          src={book.coverImage || 'https://images.unsplash.com/photo-1543004629-ff569f872783?auto=format&fit=crop&q=80&w=400'} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {!compact && (
          <div className="absolute top-2 right-2 bg-f1-green text-white text-[10px] font-bold px-2 py-1 italic uppercase transform -skew-x-12">
            {book.category}
          </div>
        )}
      </div>
      
      <div 
        className={`${compact ? 'p-3' : 'p-5'} flex-grow cursor-pointer`}
        onClick={() => onView(book)}
      >
        <div className={`${isStaff ? 'text-slate-500' : 'text-gray-400'} text-[10px] font-bold uppercase mb-1`}>{book.author}</div>
        <h3 className={`${compact ? 'text-sm' : 'text-xl'} leading-tight mb-2 ${isStaff ? 'text-white' : 'text-f1-black'} group-hover:text-f1-green transition-colors line-clamp-2 font-display italic font-bold`}>{book.title}</h3>
        {!compact && (
          <div className={`flex justify-between items-center text-xs ${isStaff ? 'text-slate-500' : 'text-gray-500'} font-mono`}>
            <span>{book.isbn}</span>
            <span>{book.year}</span>
          </div>
        )}
        {compact && (
          <div className={`text-[10px] ${isStaff ? 'text-slate-500' : 'text-gray-500'} font-mono`}>{book.year}</div>
        )}
      </div>
      
      {canModify && (
        <div className={`grid grid-cols-2 gap-0 border-t ${isStaff ? 'border-slate-700' : 'border-gray-100'} mt-auto`}>
          <button 
            onClick={() => onEdit(book)}
            className="flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase italic text-[11px] transition-colors"
          >
            <Edit2 className="w-3 h-3" />
            Update
          </button>
          <button 
            onClick={() => onDelete(book.id)}
            className="flex items-center justify-center gap-2 py-3 bg-f1-red hover:bg-black text-white font-bold uppercase italic text-[11px] transition-all duration-200 active:bg-f1-red"
            title="Remove from collection"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      )}
      
      {role === 'STUDENT' && (
        <button 
          onClick={() => onView(book)}
          className="flex items-center justify-center gap-2 py-3 bg-f1-black hover:bg-f1-slate text-white font-bold uppercase italic text-[11px] transition-colors mt-auto"
        >
          <BookOpen className="w-3 h-3" />
          View Details
        </button>
      )}
    </div>
  );
};
