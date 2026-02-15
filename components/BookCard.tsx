
import React from 'react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onAddToCart: (book: Book) => void;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart, onClick }) => {
  return (
    <div className="book-3d-container perspective-lg group">
      <div 
        className="relative liquid-glass rounded-3xl overflow-visible transition-all duration-500 flex flex-col h-full hover:shadow-[0_48px_80px_-32px_rgba(0,0,0,0.15)] hover:bg-white/80"
      >
        {/* 3D Book Cover Wrapper */}
        <div 
          className="book-3d-card preserve-3d relative aspect-[3/4] cursor-pointer z-10 p-2"
          onClick={onClick}
        >
          {/* Main Cover Image */}
          <div className="absolute inset-2 z-20 shadow-[10px_10px_30px_rgba(0,0,0,0.2)] rounded-r-lg overflow-hidden backface-hidden gloss-effect">
            <img 
              src={book.coverImage} 
              alt={book.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />
          </div>

          {/* Book Spine Simulation */}
          <div 
            className="absolute left-2 top-2 bottom-2 w-10 bg-slate-900 z-10 origin-left preserve-3d"
            style={{ transform: 'rotateY(-90deg) translateX(-100%)' }}
          >
            <div className="w-full h-full bg-gradient-to-b from-slate-800 to-black flex items-center justify-center border-r border-white/5">
               <span className="text-[10px] text-white/50 font-bold -rotate-90 whitespace-nowrap uppercase tracking-[0.3em]">
                 {book.title.substring(0, 15)}
               </span>
            </div>
          </div>

          {/* Page stack effect */}
          <div 
            className="absolute inset-2 bg-slate-50 z-0 border border-slate-200 rounded-r-lg"
            style={{ transform: 'translateZ(-15px)' }}
          >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-r from-transparent to-slate-200/50" />
          </div>

          {/* Quick View Button with Liquid Glass */}
          <div className="absolute inset-0 z-30 bg-indigo-900/0 group-hover:bg-indigo-900/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-0 group-hover:backdrop-blur-[2px]">
            <button className="liquid-glass text-slate-900 px-6 py-3 rounded-full font-bold shadow-2xl translate-y-6 group-hover:translate-y-0 transition-all duration-500 border border-white/50 text-sm">
              Inquire
            </button>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 z-40 liquid-glass px-2.5 py-1 rounded-xl shadow-lg border border-white/40">
            <div className="flex items-center text-amber-500 text-xs font-black">
              <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              {book.rating}
            </div>
          </div>
        </div>
        
        <div className="p-6 flex flex-col flex-grow z-0">
          <span className="text-[10px] uppercase tracking-[0.3em] text-indigo-500 font-black mb-2 opacity-70">{book.category}</span>
          <h3 
            className="serif text-xl font-bold text-slate-900 line-clamp-1 hover:text-indigo-600 transition-colors cursor-pointer mb-1 tracking-tight"
            onClick={onClick}
          >
            {book.title}
          </h3>
          <p className="text-sm text-slate-500 font-semibold mb-6">by {book.author}</p>
          
          <div className="mt-auto flex items-center justify-between">
            <span className="text-2xl font-bold text-slate-900 tracking-tighter">${book.price.toFixed(2)}</span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(book);
              }}
              className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-indigo-600 hover:scale-110 transition-all active:scale-95 shadow-lg shadow-slate-200"
              title="Add to cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
