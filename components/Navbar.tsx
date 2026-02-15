
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  onNavigate: (view: View) => void;
  currentView: View;
  cartCount: number;
  onCartOpen: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, cartCount, onCartOpen }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-4 md:px-0">
      <div className="container mx-auto h-20 flex items-center justify-between">
        <div 
          className="flex items-center space-x-3 cursor-pointer group"
          onClick={() => onNavigate(View.SHOP)}
        >
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-xl group-hover:bg-indigo-600 transition-all duration-500 transform group-hover:rotate-12">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10a7.969 7.969 0 013.5-.804c1.17 0 2.307.253 3.333.708 1.026-.455 2.163-.708 3.334-.708 1.17 0 2.307.253 3.333.708V4.804A7.967 7.967 0 0114.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>
          </div>
          <span className="serif text-2xl font-bold tracking-tight text-slate-900">Book Box</span>
        </div>

        <div className="flex items-center space-x-10">
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold tracking-wide uppercase">
            <button 
              onClick={() => onNavigate(View.SHOP)}
              className={`relative py-1 transition-all ${currentView === View.SHOP ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Shop
              {currentView === View.SHOP && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
            <button 
              onClick={() => onNavigate(View.ADMIN)}
              className={`relative py-1 transition-all ${currentView === View.ADMIN ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
            >
              CMS
              {currentView === View.ADMIN && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-full" />}
            </button>
          </div>

          <div className="flex items-center space-x-6">
             <button 
              onClick={onCartOpen}
              className="relative p-2.5 text-slate-700 hover:bg-slate-50 rounded-full transition-all group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="hidden sm:flex items-center space-x-3 bg-slate-50 hover:bg-slate-100 transition-colors py-1.5 px-3 rounded-full cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-900 border border-slate-100 overflow-hidden">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <span className="text-sm font-bold text-slate-700">Sign In</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
