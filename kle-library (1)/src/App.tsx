/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookCard } from './components/BookCard';
import { BookModal } from './components/BookModal';
import { BookDetailModal } from './components/BookDetailModal';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Book, UserRole, View } from './types';
import { Plus, Search, Mail, Github, Twitter, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [role, setRole] = useState<UserRole>('STUDENT');
  const [currentView, setCurrentView] = useState<View>('home');
  const [booksLimit, setBooksLimit] = useState(7);
  const [blogLimit, setBlogLimit] = useState(3);
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'LATEST' | 'ANIMATED'>('ALL');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBookForDetail, setSelectedBookForDetail] = useState<Book | null>(null);

  const handleViewBook = (book: Book) => {
    setSelectedBookForDetail(book);
    setIsDetailModalOpen(true);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/books');
      if (!response.ok) throw new Error('Failed to fetch books');
      const data = await response.json();
      setBooks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async (bookData: Omit<Book, 'id'>) => {
    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (!response.ok) throw new Error('Failed to add book');
      await fetchBooks();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to add book');
    }
  };

  const handleUpdateBook = async (bookData: Omit<Book, 'id'> & { id?: string }) => {
    try {
      const response = await fetch(`/api/books/${bookData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData)
      });
      if (!response.ok) throw new Error('Failed to update book');
      await fetchBooks();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update book');
    }
  };

  const handleDeleteBook = async (id: string) => {
    // Immediate feedback for high-speed feel
    setBooks(prev => prev.filter(b => b.id !== id));
    
    try {
      const response = await fetch(`/api/books/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete book');
      // No need to fetchBooks again if we trust our local filter, 
      // but we do it to ensure sync with server
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete book');
      fetchBooks(); // Re-sync on failure
    }
  };

  const filteredBooks = books
    .filter(book => 
      (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filterType === 'ALL' || (book.year && book.year >= 2020))
    )
    .sort((a, b) => {
      if (filterType === 'LATEST') return (b.year || 0) - (a.year || 0);
      return 0;
    });

  const latestBooks = [...books]
    .sort((a, b) => (b.year || 0) - (a.year || 0))
    .slice(0, 10);

  const isStaff = role === 'EMPLOYEE' || role === 'ADMIN';

  const featuredIntel = [
    {
      title: "The Future of Hybrid Power Units in 2026",
      excerpt: "Analyzing the shift towards sustainable fuels and increased electrical power deployment in the next generation of technical regulations.",
      author: "Chief Engineer",
      date: "May 12, 2026",
      category: "Engineering",
      readTime: "12 min",
      imageUrl: "https://images.unsplash.com/photo-1547038577-da80abbc4f19?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Aerodynamic Efficiency vs. Ground Effect",
      excerpt: "A deep dive into the trade-offs between drag reduction and downforce generation in modern high-performance vehicles.",
      author: "Aero Lead",
      date: "May 10, 2026",
      category: "Physics",
      readTime: "8 min",
      imageUrl: "https://images.unsplash.com/photo-1594731802111-070115ee5e81?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Data Acquisition: The Digital Pitlane",
      excerpt: "How real-time telemetry and edge computing are redefining strategic decision-making mid-performance.",
      author: "Systems Architect",
      date: "May 08, 2026",
      category: "Computer Science",
      readTime: "15 min",
      imageUrl: "https://images.unsplash.com/photo-1510511459019-5dee997dd3db?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const blogPosts = [
    ...featuredIntel,
    ...books.map(book => ({
      title: `Technical Deep Dive: ${book.title}`,
      excerpt: `Exploring the critical telemetry and strategic insights found within ${book.author}'s latest contribution to our technical archives.`,
      author: "Library Engineering Team",
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      category: book.category,
      readTime: `${Math.floor(Math.random() * 5) + 3} min`,
      imageUrl: book.imageUrl || "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=600",
      bookId: book.id
    }))
  ];

  const categorizedBooks = books.reduce((acc, book) => {
    if (!acc[book.category]) acc[book.category] = [];
    acc[book.category].push(book);
    return acc;
  }, {} as Record<string, Book[]>);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.8, filter: "blur(8px)" },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.8
      }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isStaff ? 'bg-slate-950 text-slate-100 staff-grid' : 'bg-white'}`}>
      <Navbar role={role} setRole={setRole} currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero role={role} />

              {/* Featured Section for Students */}
              {role === 'STUDENT' && books.length > 0 && !isLoading && (
                <section className="bg-f1-black py-16 overflow-hidden">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1 h-8 bg-f1-red" />
                        <h3 className="text-2xl font-display italic text-white uppercase tracking-tighter">Recent Arrivals</h3>
                      </div>
                      <button 
                        onClick={() => {
                          setFilterType('LATEST');
                          window.scrollTo({ top: document.getElementById('collection-start')?.offsetTop || 0, behavior: 'smooth' });
                        }}
                        className="text-f1-red text-xs font-bold uppercase italic hover:underline flex items-center gap-1"
                      >
                        Global Grid <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <motion.div 
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 pb-8"
                    >
                      {latestBooks.slice(0, booksLimit).map((book) => (
                        <motion.div 
                          key={book.id} 
                          variants={itemVariants}
                          className="snap-start"
                        >
                          <BookCard 
                            book={book} 
                            role={role}
                            compact
                            onView={handleViewBook}
                            onEdit={(b) => {
                              setEditingBook(b);
                              setIsModalOpen(true);
                            }}
                            onDelete={handleDeleteBook}
                          />
                        </motion.div>
                      ))}
                    </motion.div>

                    {booksLimit < latestBooks.length && (
                      <div className="flex justify-center mt-4">
                        <button 
                          onClick={() => setBooksLimit(prev => prev + 7)}
                          className="bg-white/10 hover:bg-white/20 text-white text-[10px] font-black uppercase italic px-10 py-3 transform -skew-x-12 transition-all tracking-widest border border-white/20"
                        >
                          Deploy More Units
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}
              
              {/* Main Content Area */}
              <section id="collection-start" className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-colors ${isStaff ? 'bg-slate-950/50' : 'bg-white'}`}>
                <div className={`flex flex-col items-center text-center gap-8 mb-16 border-b-2 ${isStaff ? 'border-slate-800' : 'border-gray-100'} pb-12`}>
                  <div className="space-y-6 flex flex-col items-center w-full">
                    <div>
                      <h2 className={`text-5xl italic font-display font-black uppercase tracking-tighter ${isStaff ? 'text-white' : 'text-f1-black'}`}>
                        {role === 'STUDENT' && !searchQuery ? 'Academic Sectors' : 'The Collection'}
                      </h2>
                      <p className={`${isStaff ? 'text-slate-400' : 'text-gray-500'} max-w-xl mx-auto mt-2`}>
                        {isStaff 
                          ? 'Inventory telemetry for technical manuals and high-performance academic literature.'
                          : searchQuery 
                            ? `Telemetry results for "${searchQuery}"`
                            : 'High-performance literature grouped by academic discipline and technical specialty.'
                        }
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-3">
                      <button 
                        onClick={() => setFilterType('ALL')}
                        className={`px-8 py-3 text-[11px] font-black uppercase italic transition-all transform -skew-x-12 ring-1 ring-inset ${
                          filterType === 'ALL' 
                            ? (isStaff ? 'bg-white text-slate-900 ring-white' : 'bg-f1-black text-white ring-f1-black') 
                            : (isStaff ? 'bg-slate-800 text-slate-400 ring-slate-700 hover:bg-slate-700' : 'bg-white text-gray-400 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50')
                        }`}
                      >
                        Full Grid
                      </button>
                      <button 
                        onClick={() => setFilterType('LATEST')}
                        className={`px-8 py-3 text-[11px] font-black uppercase italic transition-all transform -skew-x-12 ring-1 ring-inset ${
                          filterType === 'LATEST' 
                            ? 'bg-f1-red text-white ring-f1-red shadow-lg shadow-f1-red/20' 
                            : (isStaff ? 'bg-slate-800 text-slate-400 ring-slate-700 hover:bg-slate-700' : 'bg-white text-gray-400 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50')
                        }`}
                      >
                        Latest 10
                      </button>
                      <button 
                        onClick={() => setFilterType('ANIMATED')}
                        className={`px-8 py-3 text-[11px] font-black uppercase italic transition-all transform -skew-x-12 ring-1 ring-inset ${
                          filterType === 'ANIMATED' 
                            ? 'bg-blue-600 text-white ring-blue-600 shadow-lg shadow-blue-600/20' 
                            : (isStaff ? 'bg-slate-800 text-slate-400 ring-slate-700 hover:bg-slate-700' : 'bg-white text-gray-400 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50')
                        }`}
                      >
                        Top 5 Speed
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
                    {/* Search Bar */}
                    <div className="relative w-full">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder={isStaff ? "Query database..." : "Search across all sectors..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full ${isStaff ? 'bg-slate-900 text-white border-slate-700 placeholder-slate-500 focus:bg-slate-800' : 'bg-gray-50 border-transparent text-gray-900 focus:bg-white'} border-2 focus:border-f1-green focus:text-gray-900 outline-none pl-12 pr-6 py-4 text-sm transition-all shadow-inner`}
                      />
                    </div>
                    
                    {/* Add Button - Visible to Employee/Admin */}
                    {(role === 'EMPLOYEE' || role === 'ADMIN') && (
                      <button 
                        onClick={() => {
                          setEditingBook(null);
                          setIsModalOpen(true);
                        }}
                        className="w-full sm:w-auto whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-sm font-black uppercase italic text-[11px] flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 border-b-4 border-blue-900 tracking-widest"
                      >
                        <Plus className="w-4 h-4" />
                        New Entry
                      </button>
                    )}
                  </div>
                </div>

                {/* Book Display Logic */}
                {isLoading ? (
                  <div className={`grid gap-8 ${role === 'STUDENT' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}>
                    {[...Array(role === 'STUDENT' ? 16 : 5)].map((_, i) => (
                      <div key={i} className="aspect-[3/4] bg-gray-200 animate-pulse rounded-sm" />
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-20 bg-red-50 border-2 border-red-100 rounded-sm">
                    <p className="text-f1-red font-bold uppercase italic">Error: {error}</p>
                    <button 
                      onClick={fetchBooks}
                      className="mt-4 text-sm font-bold underline hover:text-f1-red"
                    >
                      Try Again
                    </button>
                  </div>
                ) : filterType === 'ANIMATED' ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 py-10"
                  >
                    {[...books].sort((a,b) => (b.year || 0) - (a.year || 0)).slice(0, 5).map((book) => (
                      <motion.div
                        key={`animated-filter-${book.id}`}
                        variants={itemVariants}
                        whileHover={{ 
                          y: -20, 
                          rotateY: 15,
                          scale: 1.05,
                          transition: { duration: 0.3 }
                        }}
                        style={{ perspective: 1000 }}
                        className="relative group cursor-pointer"
                      >
                        <BookCard 
                          book={book} 
                          role={role}
                          onView={handleViewBook}
                          onEdit={(b) => {
                            setEditingBook(b);
                            setIsModalOpen(true);
                          }}
                          onDelete={handleDeleteBook}
                        />
                        <div className="absolute -bottom-6 left-1/2 -translate-y-1/2 w-[80%] h-4 bg-black/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : !searchQuery && filterType === 'ALL' ? (
                  <div className="space-y-20">
                    {Object.keys(categorizedBooks).map((category) => {
                      const catBooks = categorizedBooks[category];
                      return (
                        <div key={category} className="space-y-8">
                          <div className="flex items-center gap-4">
                            <div className={`w-1.5 h-6 ${isStaff ? 'bg-blue-500' : 'bg-f1-green'}`} />
                            <h3 className={`text-xl font-display font-black italic uppercase tracking-tight whitespace-nowrap ${isStaff ? 'text-white' : 'text-f1-black'}`}>
                              {category}
                            </h3>
                            <div className={`h-px ${isStaff ? 'bg-slate-800' : 'bg-gray-100'} w-full`} />
                          </div>
                          
                          <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className={`grid gap-8 ${role === 'STUDENT' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}
                          >
                            {catBooks.map((book) => (
                              <motion.div
                                key={book.id}
                                variants={itemVariants}
                              >
                                <BookCard 
                                  book={book} 
                                  role={role}
                                  onView={handleViewBook}
                                  onEdit={(b) => {
                                    setEditingBook(b);
                                    setIsModalOpen(true);
                                  }}
                                  onDelete={handleDeleteBook}
                                />
                              </motion.div>
                            ))}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                ) : filteredBooks.length > 0 ? (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid gap-8 ${role === 'STUDENT' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}`}
                  >
                    <AnimatePresence mode="popLayout">
                      {/* Quick Add Placeholder for Admins/Employees */}
                      {(role === 'ADMIN' || role === 'EMPLOYEE') && (
                        <motion.div
                          layout
                          variants={itemVariants}
                          className={`aspect-[3/4] border-2 border-dashed ${isStaff ? 'border-slate-700 bg-slate-900/50 hover:bg-slate-900' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50'} rounded-sm flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors group`}
                          onClick={() => {
                            setEditingBook(null);
                            setIsModalOpen(true);
                          }}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-blue-100 group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6 text-blue-600" />
                          </div>
                          <span className="text-[10px] font-black uppercase italic text-blue-600 tracking-widest">Add Entry</span>
                        </motion.div>
                      )}
                      {filteredBooks.map((book) => (
                        <motion.div
                          key={book.id}
                          layout
                          variants={itemVariants}
                          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                          viewport={{ once: true }}
                        >
                          <BookCard 
                            book={book} 
                            role={role}
                            onView={handleViewBook}
                            onEdit={(b) => {
                              setEditingBook(b);
                              setIsModalOpen(true);
                            }}
                            onDelete={handleDeleteBook}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className="text-center py-20 bg-white border border-dashed border-gray-300 rounded-sm w-full">
                    <p className="text-gray-400 font-display italic uppercase text-xs tracking-widest">No matching literature found in pits.</p>
                  </div>
                )}
              </section>
            </motion.div>
          )}

          {currentView === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-20 pb-32"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 relative">
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="w-1 h-8 bg-f1-green" />
                    <h2 className="text-4xl font-display italic font-black uppercase tracking-tighter text-f1-black">Technical Intelligence</h2>
                  </div>
                  <p className="text-gray-500 max-w-2xl text-lg italic relative z-10 font-medium">
                    Strategic reports and technical telemetry from our technical sectors and archive divisions.
                  </p>
                  <div className="absolute top-0 right-0 opacity-[0.03] select-none pointer-events-none">
                    <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 50L400 50M0 100L400 100M0 150L400 150M100 0L100 200M200 0L200 200M300 0L300 200" stroke="currentColor" strokeWidth="2" />
                      <circle cx="200" cy="100" r="80" stroke="currentColor" strokeWidth="2" />
                      <path d="M200 20L200 180M120 100L280 100" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {blogPosts.slice(0, blogLimit).map((post, i) => (
                    <motion.div
                      key={post.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden mb-6 rounded-sm bg-gray-100 cursor-pointer" onClick={() => {
                        const book = books.find(b => b.id === (post as any).bookId);
                        if (book) handleViewBook(book);
                      }}>
                        <img 
                          src={post.imageUrl} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 bg-f1-green text-white text-[10px] font-black uppercase italic px-2 py-1 transform -skew-x-12">
                          {post.category}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-black uppercase italic text-gray-400">
                          <span>{post.author}</span>
                          <div className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>{post.date}</span>
                        </div>
                        <h3 className="text-xl font-display font-bold italic text-f1-black group-hover:text-f1-green transition-colors leading-tight cursor-pointer" onClick={() => {
                          const book = books.find(b => b.id === (post as any).bookId);
                          if (book) handleViewBook(book);
                        }}>
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                        <button 
                          onClick={() => {
                            const book = books.find(b => b.id === (post as any).bookId);
                            if (book) handleViewBook(book);
                          }}
                          className="flex items-center gap-2 text-f1-green text-[10px] font-black uppercase italic tracking-widest pt-2 group-hover:gap-4 transition-all"
                        >
                          Launch Article <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {blogLimit < blogPosts.length && (
                  <div className="mt-20 flex justify-center">
                    <button 
                      onClick={() => setBlogLimit(prev => prev + 3)}
                      className="bg-f1-black hover:bg-f1-carbon text-white text-[11px] font-black uppercase italic px-12 py-4 transform -skew-x-12 transition-all tracking-[0.2em]"
                    >
                      Sync More Intel
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {currentView === 'login' && (
            <Login 
              onLogin={() => setCurrentView('home')} 
              onSwitchToRegister={() => setCurrentView('register')} 
            />
          )}

          {currentView === 'register' && (
            <Register 
              onRegister={() => setCurrentView('home')} 
              onSwitchToLogin={() => setCurrentView('login')} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-f1-black text-white border-t-8 border-f1-green py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-2xl font-display italic font-extrabold tracking-tighter">
                  KLE <span className="text-f1-green">LIBRARY</span>
                </span>
              </div>
              <p className="text-gray-400 max-w-sm mb-6">
                The leading edge in technical automotive literature and high-speed information management.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-f1-carbon rounded-sm hover:bg-f1-red transition-colors text-white">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-f1-carbon rounded-sm hover:bg-f1-red transition-colors text-white">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-f1-carbon rounded-sm hover:bg-f1-red transition-colors text-white">
                  <Mail className="w-5 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase italic border-b border-f1-slate pb-4 mb-6">Portals</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase italic">
                <li className="hover:text-f1-red cursor-pointer" onClick={() => setRole('STUDENT')}>Student Hub</li>
                <li className="hover:text-f1-red cursor-pointer" onClick={() => setRole('EMPLOYEE')}>Employee Terminal</li>
                <li className="hover:text-f1-red cursor-pointer" onClick={() => setRole('ADMIN')}>Admin Command</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase italic border-b border-f1-slate pb-4 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-400 font-bold uppercase italic">
                <li className="hover:text-f1-red cursor-pointer text-gray-400 no-underline">Technical Specs</li>
                <li className="hover:text-f1-red cursor-pointer text-gray-400 no-underline">API Docs</li>
                <li className="hover:text-f1-red cursor-pointer text-gray-400 no-underline">Pitlane Schedule</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-f1-slate pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
            <p>© 2026 KLE LIBRARY. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white no-underline text-gray-500">Privacy Policy</a>
              <a href="#" className="hover:text-white no-underline text-gray-500">Cookie Selection</a>
              <a href="#" className="hover:text-white no-underline text-gray-500">Team Credits</a>
            </div>
          </div>
        </div>
      </footer>

      <BookModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBook(null);
        }}
        onSave={(data) => {
          if (editingBook) {
            handleUpdateBook(data as Book);
          } else {
            handleAddBook(data as Omit<Book, 'id'>);
          }
        }}
        book={editingBook}
      />

      <BookDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedBookForDetail(null);
        }}
        book={selectedBookForDetail}
      />
    </div>
  );
}
