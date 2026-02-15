
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemove, onUpdateQty }) => {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              Your Cart 
              <span className="ml-2 bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full">{items.length} items</span>
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                <p>Your cart is empty.</p>
                <button 
                  onClick={onClose}
                  className="mt-4 text-indigo-600 font-semibold hover:underline"
                >
                  Start shopping
                </button>
              </div>
            ) : (
              items.map(item => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-20 h-28 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden">
                    <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-semibold text-slate-900 line-clamp-1">{item.title}</h3>
                      <button 
                        onClick={() => onRemove(item.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{item.author}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 bg-slate-50 rounded-lg px-2 py-1">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white hover:shadow-sm rounded transition-all"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center hover:bg-white hover:shadow-sm rounded transition-all"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>
            <button 
              disabled={items.length === 0}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200"
            >
              Checkout
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">Free shipping on orders over $50</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
