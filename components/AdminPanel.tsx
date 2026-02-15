
import React, { useState } from 'react';
import { Book } from '../types';
import { generateBookDescription } from '../services/geminiService';

interface AdminPanelProps {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ books, setBooks }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newBook, setNewBook] = useState<Partial<Book>>({
    title: '',
    author: '',
    category: 'Fiction',
    price: 0,
    stock: 0,
    description: '',
    rating: 5,
    coverImage: 'https://picsum.photos/seed/' + Math.random() + '/400/600'
  });

  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;

    const bookToAdd: Book = {
      ...newBook as Book,
      id: Date.now().toString(),
    };

    setBooks(prev => [bookToAdd, ...prev]);
    setIsAdding(false);
    setNewBook({
      title: '',
      author: '',
      category: 'Fiction',
      price: 0,
      stock: 0,
      description: '',
      rating: 5,
      coverImage: 'https://picsum.photos/seed/' + Math.random() + '/400/600'
    });
  };

  const handleAIDescription = async () => {
    if (!newBook.title || !newBook.author) {
      alert("Please enter title and author first.");
      return;
    }
    setIsGenerating(true);
    try {
      const desc = await generateBookDescription(newBook.title, newBook.author);
      setNewBook(prev => ({ ...prev, description: desc }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Management Console</h2>
          <p className="text-slate-500 font-medium mt-1">Global inventory and archival controls.</p>
        </div>
        <div className="flex items-center space-x-3">
            <button className="px-6 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-all text-sm">
              Export Archive
            </button>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 flex items-center text-sm"
            >
              {isAdding ? 'Close Portal' : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                  New Entry
                </>
              )}
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Volumes</p>
            <p className="text-4xl font-bold text-slate-900 tracking-tight">{books.length}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Stock</p>
            <p className="text-4xl font-bold text-slate-900 tracking-tight">{books.reduce((a, b) => a + b.stock, 0)}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Catalog Value</p>
            <p className="text-4xl font-bold text-slate-900 tracking-tight">${books.reduce((a, b) => a + (b.price * b.stock), 0).toLocaleString()}</p>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI Efficiency</p>
            <p className="text-4xl font-bold text-indigo-600 tracking-tight">98.4%</p>
          </div>
      </div>

      {isAdding && (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl space-y-10 animate-in slide-in-from-top-4 duration-500">
          <div className="border-b border-slate-50 pb-6">
            <h3 className="text-2xl font-bold text-slate-900 italic serif">Archive New Edition</h3>
          </div>
          <form onSubmit={handleAddBook} className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-4 space-y-6">
               <div className="aspect-[3/4] bg-slate-50 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center group cursor-pointer relative">
                  {newBook.coverImage ? (
                    <img src={newBook.coverImage} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="text-center text-slate-400">
                      <svg className="w-12 h-12 mx-auto mb-2 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span className="text-xs font-bold uppercase tracking-widest">Set Cover Art</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                     <button type="button" onClick={() => setNewBook(prev => ({ ...prev, coverImage: 'https://picsum.photos/seed/' + Math.random() + '/400/600' }))} className="bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold">Shuffle Image</button>
                  </div>
               </div>
            </div>
            
            <div className="md:col-span-8 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Edition Title</label>
                  <input required type="text" value={newBook.title} onChange={e => setNewBook(prev => ({ ...prev, title: e.target.value }))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-900 outline-none" placeholder="e.g. The Great Gatsby" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Lead Author</label>
                  <input required type="text" value={newBook.author} onChange={e => setNewBook(prev => ({ ...prev, author: e.target.value }))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-900 outline-none" placeholder="e.g. F. Scott Fitzgerald" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Genre Category</label>
                  <select value={newBook.category} onChange={e => setNewBook(prev => ({ ...prev, category: e.target.value }))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-900 outline-none">
                    {['Fiction', 'Self-Help', 'Sci-Fi', 'Finance', 'Biography', 'Mystery'].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Price (USD)</label>
                    <input type="number" step="0.01" value={newBook.price} onChange={e => setNewBook(prev => ({ ...prev, price: parseFloat(e.target.value) }))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-900 outline-none text-center" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Stock Vol.</label>
                    <input type="number" value={newBook.stock} onChange={e => setNewBook(prev => ({ ...prev, stock: parseInt(e.target.value) }))} className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-bold text-slate-900 outline-none text-center" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Edition Blurb</label>
                  <button type="button" onClick={handleAIDescription} disabled={isGenerating} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center uppercase tracking-widest">
                    {isGenerating ? 'AI Archiving...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea rows={4} value={newBook.description} onChange={e => setNewBook(prev => ({ ...prev, description: e.target.value }))} className="w-full px-5 py-4 rounded-3xl bg-slate-50 border-none focus:ring-4 focus:ring-indigo-500/10 font-medium text-slate-600 outline-none leading-relaxed" placeholder="Describe this masterpiece..." />
              </div>

              <button type="submit" className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-indigo-600 shadow-2xl transition-all">
                Publish to Archive
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-50">
            <tr>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Volume Details</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Genre</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market Value</th>
              <th className="px-8 py-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Availability</th>
              <th className="px-8 py-6 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {books.map(book => (
              <tr key={book.id} className="hover:bg-slate-50/40 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <img src={book.coverImage} className="w-12 h-16 object-cover rounded-lg shadow-md" alt="" />
                    <div>
                      <div className="font-bold text-slate-900 text-lg tracking-tight">{book.title}</div>
                      <div className="text-sm text-slate-500 font-medium">by {book.author}</div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-[10px] font-bold px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg uppercase tracking-wider">
                    {book.category}
                  </span>
                </td>
                <td className="px-8 py-6 font-bold text-slate-900 text-lg">${book.price.toFixed(2)}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${book.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="text-sm font-bold text-slate-700">{book.stock} units</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => setBooks(prev => prev.filter(b => b.id !== book.id))} className="p-2.5 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
