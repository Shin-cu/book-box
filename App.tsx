
import React, { useState, useEffect, useMemo } from 'react';
import { View, Book, CartItem } from './types';
import { INITIAL_BOOKS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import BookCard from './components/BookCard';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import AIChatAssistant from './components/AIChatAssistant';
import BookDetails from './components/BookDetails';

const App: React.FC = () => {
  const [view, setView] = useState<View>(View.SHOP);
  const [books, setBooks] = useState<Book[]>(() => {
    const saved = localStorage.getItem('bb_books');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    localStorage.setItem('bb_books', JSON.stringify(books));
  }, [books]);

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  const addToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const openBookDetails = (book: Book) => {
    setSelectedBook(book);
    setView(View.DETAILS);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col perspective-lg relative">
      <Navbar 
        onNavigate={(v) => {
            setView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
        currentView={view} 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <main className="flex-grow container mx-auto px-4 py-12 page-enter relative z-10">
        {view === View.SHOP && (
          <div className="space-y-24">
            {/* Liquid Glass Hero Section */}
            <section className="relative flex flex-col items-center text-center overflow-hidden py-32 px-6 rounded-[4rem] liquid-glass-dark text-white border border-white/5 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] group">
              <div className="z-10 max-w-4xl space-y-10">
                <div className="flex justify-center opacity-0 translate-y-4 animate-[fadeInUp_0.8s_0.2s_forwards]">
                  <span className="px-5 py-2 rounded-full border border-indigo-400/20 text-indigo-200 text-xs font-bold uppercase tracking-[0.2em] bg-white/5 backdrop-blur-xl">
                    Next-Gen Literary Intelligence
                  </span>
                </div>
                <h1 className="serif text-7xl md:text-9xl italic font-bold leading-[0.95] tracking-tighter opacity-0 translate-y-4 animate-[fadeInUp_0.8s_0.4s_forwards]">
                  Stories that <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">breathe</span>.
                </h1>
                <p className="text-slate-300 text-2xl max-w-2xl mx-auto leading-relaxed font-light opacity-0 translate-y-4 animate-[fadeInUp_0.8s_0.6s_forwards]">
                  Immerse yourself in a fluid browsing experience where AI transcends the shelf. Discover your next soul-match today.
                </p>
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6 opacity-0 translate-y-4 animate-[fadeInUp_0.8s_0.8s_forwards]">
                  <button 
                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })} 
                    className="group relative bg-white text-slate-900 px-12 py-6 rounded-full font-bold transition-all hover:scale-105 shadow-[0_20px_40px_rgba(255,255,255,0.15)] overflow-hidden"
                  >
                    <span className="relative z-10">Explore the Archive</span>
                    <div className="absolute inset-0 bg-indigo-50 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  </button>
                  <button className="text-indigo-200 px-10 py-6 rounded-full font-bold border border-white/10 hover:bg-white/5 transition-all flex items-center group backdrop-blur-md">
                    Learn about AI
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                </div>
              </div>

              {/* Internal Glowing Blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none group-hover:bg-indigo-600/30 transition-colors duration-1000" />
            </section>

            {/* Catalog Section with Liquid Glass Panels */}
            <div id="catalog" className="space-y-16">
              <div className="flex flex-col md:flex-row items-end justify-between gap-10">
                <div className="space-y-3">
                  <h2 className="serif text-5xl font-bold text-slate-900 italic tracking-tight">The Modern Stacks</h2>
                  <p className="text-slate-500 font-medium text-lg">AI-curated, human-authenticated.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-6 w-full md:w-auto">
                  <div className="flex liquid-glass p-1.5 rounded-2xl w-full sm:w-auto shadow-sm">
                    {['All', 'Fiction', 'Sci-Fi', 'Self-Help'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                          selectedCategory === cat 
                          ? 'bg-white text-slate-900 shadow-md transform scale-105' 
                          : 'text-slate-500 hover:text-slate-900'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <div className="relative group w-full sm:w-72">
                    <input 
                      type="text" 
                      placeholder="Search the archive..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-14 pr-6 py-4 rounded-2xl border-none liquid-glass w-full focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all font-semibold text-slate-700 placeholder:text-slate-400"
                    />
                    <svg className="w-6 h-6 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  </div>
                </div>
              </div>

              {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
                  {filteredBooks.map((book, idx) => (
                    <div key={book.id} className="page-enter" style={{ animationDelay: `${idx * 0.05}s` }}>
                      <BookCard 
                        book={book} 
                        onAddToCart={addToCart} 
                        onClick={() => openBookDetails(book)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-48 liquid-glass rounded-[4rem] border border-white/40 shadow-sm animate-pulse">
                  <div className="w-24 h-24 bg-slate-100/50 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 backdrop-blur-md">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                  </div>
                  <h3 className="serif text-3xl font-bold text-slate-900 mb-4 italic">No matches in our stacks</h3>
                  <p className="text-slate-500 max-w-md mx-auto text-lg">Our Librarian couldn't find a book matching your current frequency. Try clearing your filters.</p>
                  <button onClick={() => {setSelectedCategory('All'); setSearchQuery('');}} className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-indigo-600 transition-all transform hover:scale-110 active:scale-95">Clear All Filters</button>
                </div>
              )}
            </div>

            {/* Premium Newsletter with Glassmorphism */}
            <section className="bg-slate-900 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden group shadow-2xl">
               <div className="relative z-10 max-w-3xl">
                  <h2 className="serif text-5xl md:text-6xl font-bold italic mb-8 tracking-tighter">The Bibliophile Collective</h2>
                  <p className="text-indigo-100 text-xl mb-12 leading-relaxed font-light opacity-80">Join an exclusive network of literary explorers. Get AI-curated reading experiences and early access to archival releases.</p>
                  <div className="flex flex-col sm:flex-row gap-6 liquid-glass-dark p-2.5 rounded-[2.5rem] border border-white/5 shadow-inner">
                    <input type="email" placeholder="Enter your archival email" className="bg-transparent border-none px-8 py-5 flex-grow focus:outline-none placeholder:text-indigo-200/50 text-lg font-medium" />
                    <button className="bg-white text-slate-900 px-12 py-5 rounded-[2rem] font-bold hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95">Join Collective</button>
                  </div>
               </div>
               {/* Internal Flowing Blobs */}
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-[3s]" />
               <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] group-hover:translate-x-20 transition-transform duration-[4s]" />
            </section>
          </div>
        )}

        {view === View.ADMIN && (
          <div className="page-enter">
            <AdminPanel 
              books={books} 
              setBooks={setBooks} 
            />
          </div>
        )}

        {view === View.DETAILS && selectedBook && (
          <div className="page-enter">
            <BookDetails 
              book={selectedBook} 
              onAddToCart={addToCart} 
              onBack={() => setView(View.SHOP)}
            />
          </div>
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQty={updateCartQuantity}
      />

      <AIChatAssistant catalog={books} onSelectBook={(book) => openBookDetails(book)} />

      <footer className="bg-white/30 backdrop-blur-xl border-t border-white/20 py-32 mt-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-24">
            <div className="md:col-span-5 space-y-10">
               <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-2xl transform rotate-3">
                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10a7.969 7.969 0 013.5-.804c1.17 0 2.307.253 3.333.708 1.026-.455 2.163-.708 3.334-.708 1.17 0 2.307.253 3.333.708V4.804A7.967 7.967 0 0114.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>
                  </div>
                  <h2 className="serif text-4xl font-bold text-slate-900 italic tracking-tighter">Book Box</h2>
               </div>
               <p className="text-slate-500 leading-relaxed font-medium text-lg max-w-md">A sanctuary for the written word, reimagined for the intelligence age. We bridge the gap between human curiosity and archival discovery.</p>
               <div className="flex space-x-5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-12 h-12 liquid-glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:scale-110 transition-all cursor-pointer shadow-sm">
                      <div className="w-6 h-6 bg-current rounded-sm opacity-20" />
                    </div>
                  ))}
               </div>
            </div>
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] opacity-50">Catalog</h3>
              <ul className="space-y-5 text-sm text-slate-600 font-bold">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">The Archive</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">New Arrivals</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">AI Collections</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">Gift Subscriptions</li>
              </ul>
            </div>
            <div className="md:col-span-2 space-y-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] opacity-50">Discovery</h3>
              <ul className="space-y-5 text-sm text-slate-600 font-bold">
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">Our Story</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">AI Journal</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">Ethical Sourcing</li>
                <li className="hover:text-indigo-600 transition-colors cursor-pointer hover:translate-x-1 transform duration-300">Global Concierge</li>
              </ul>
            </div>
            <div className="md:col-span-3 space-y-8">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] opacity-50">Boutique</h3>
              <div className="p-8 rounded-[2.5rem] liquid-glass space-y-5 shadow-sm border border-white/50">
                <p className="text-sm text-slate-800 font-bold italic serif text-lg">New York Flagship</p>
                <p className="text-sm text-slate-500 leading-relaxed font-semibold">124 Crosby St, SoHo <br/>New York, NY 10012</p>
                <div className="flex items-center text-indigo-600 text-xs font-bold space-x-2 group cursor-pointer">
                  <span className="uppercase tracking-widest">Digital Tour</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-10 text-slate-400 text-xs font-bold tracking-[0.2em] uppercase">
            <p>© 2024 Book Box Studio. Curating the Future of Reading.</p>
            <div className="flex space-x-16">
                <span className="hover:text-slate-900 transition-colors cursor-pointer">Archive Privacy</span>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">Terms of Discovery</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
