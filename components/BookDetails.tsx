
import React, { useState } from 'react';
import { Book } from '../types';

interface BookDetailsProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onBack: () => void;
}

const BookDetails: React.FC<BookDetailsProps> = ({ book, onAddToCart, onBack }) => {
  const [activeTab, setActiveTab] = useState<'synopsis' | 'details' | 'reviews'>('synopsis');

  return (
    <div className="space-y-12">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-400 hover:text-slate-900 font-bold text-sm tracking-widest uppercase transition-colors"
      >
        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Return to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left: Book Cover Display */}
        <div className="lg:col-span-5 perspective-lg">
          <div className="relative group animate-float-3d transform preserve-3d">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 transition-all duration-700" 
            />
            <div className="absolute -bottom-8 -right-8 glass-panel px-6 py-4 rounded-3xl shadow-xl flex items-center space-x-3">
               <div className="flex text-amber-400">
                  {[1,2,3,4,5].map(s => <svg key={s} className={`w-4 h-4 ${s <= Math.round(book.rating) ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
               </div>
               <span className="font-bold text-slate-900">{book.rating}</span>
            </div>
          </div>
        </div>

        {/* Right: Book Content Details */}
        <div className="lg:col-span-7 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest border border-indigo-100">
                {book.category}
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Archive Ref: #2094-{book.id}</span>
            </div>
            <h1 className="serif text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] italic tracking-tight">{book.title}</h1>
            <p className="text-2xl text-slate-500 font-medium italic">by {book.author}</p>
          </div>

          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-fit">
              {(['synopsis', 'details', 'reviews'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                    activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-sm' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
          </div>

          <div className="min-h-[200px] animate-in fade-in duration-500">
            {activeTab === 'synopsis' && (
              <p className="text-xl text-slate-600 leading-relaxed font-light">{book.description}</p>
            )}
            {activeTab === 'details' && (
              <div className="grid grid-cols-2 gap-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hardcover</p>
                    <p className="text-slate-900 font-bold">Collector's Edition</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publication Date</p>
                    <p className="text-slate-900 font-bold">October 24, 2023</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Publisher</p>
                    <p className="text-slate-900 font-bold">Book Box Archive</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dimensions</p>
                    <p className="text-slate-900 font-bold">6.5" x 9.25"</p>
                 </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                 <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-4">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-full bg-indigo-200" />
                       <span className="font-bold text-slate-900">Julianne Ross</span>
                    </div>
                    <p className="text-slate-600 italic leading-relaxed">"A masterwork of prose. The themes discussed here are timeless and incredibly poignant in our modern context."</p>
                 </div>
              </div>
            )}
          </div>

          <div className="pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-slate-50 px-8 py-6 rounded-3xl flex flex-col min-w-[160px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Price</span>
              <span className="text-3xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
            </div>
            <button 
              onClick={() => onAddToCart(book)}
              disabled={book.stock === 0}
              className="flex-grow bg-slate-900 text-white px-10 py-6 rounded-3xl font-bold text-xl hover:bg-indigo-600 active:scale-95 transition-all flex items-center justify-center shadow-2xl disabled:opacity-50"
            >
              Acquire Edition
              <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
