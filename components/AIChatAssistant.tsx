
import React, { useState, useRef, useEffect } from 'react';
import { Book, ChatMessage } from '../types';
import { getBookRecommendations, chatWithLibrarian, RecommendationPreferences } from '../services/geminiService';

interface AIChatAssistantProps {
  catalog: Book[];
  onSelectBook: (book: Book) => void;
}

const MOODS = ['Cozy', 'Dark', 'Inspiring', 'Thrilling', 'Melancholic', 'Whimsical'];

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ catalog, onSelectBook }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<RecommendationPreferences>({ mood: '', themes: [], similarAuthors: [] });
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Welcome back to the archives. I'm your Librarian. Looking for a specific frequency today? Use 'Refine' to set your mood preferences." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, showPrefs, isLoading]);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput && !showPrefs && isLoading) return;
    
    const userMsg = trimmedInput || (showPrefs ? "Recommend based on my preferences." : "");
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);
    setShowPrefs(false);

    try {
      const isRecRequest = userMsg.toLowerCase().includes('recommend') || 
                           userMsg.toLowerCase().includes('suggest') || 
                           userMsg.toLowerCase().includes('find') || 
                           (prefs.mood || (prefs.themes && prefs.themes.length > 0) || (prefs.similarAuthors && prefs.similarAuthors.length > 0));

      if (isRecRequest) {
        const result = await getBookRecommendations(userMsg, catalog, prefs);
        setMessages(prev => [...prev, { role: 'model', content: result.message }]);
        if (result.recommendations?.length > 0) {
          result.recommendations.forEach((rec: any) => {
            const book = catalog.find(b => b.id === rec.bookId);
            if (book) {
              setMessages(prev => [...prev, { role: 'model', content: `✨ **Recommendation:** ${book.title}\n\n${rec.reason}` }]);
            }
          });
        }
      } else {
        const reply = await chatWithLibrarian(messages, userMsg);
        setMessages(prev => [...prev, { role: 'model', content: reply || "The stacks are a bit foggy. Please rephrase?" }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', content: "Archive connection interrupted. Re-centering." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="mb-8 w-[380px] sm:w-[420px] h-[550px] sm:h-[650px] liquid-glass rounded-[3rem] shadow-[0_48px_80px_-24px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-white/50">
          <div className="p-8 sm:p-10 bg-slate-900/90 text-white flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center space-x-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[1.25rem] bg-indigo-600 flex items-center justify-center shadow-2xl transform rotate-6 border border-white/20">
                <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/></svg>
              </div>
              <div>
                <span className="font-bold block text-lg tracking-tighter italic serif leading-tight">Archive AI</span>
                <span className="text-[10px] text-indigo-300 font-black uppercase tracking-[0.3em]">Lead Librarian</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2.5 rounded-2xl transition-all active:scale-90">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"/></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow p-8 sm:p-10 overflow-y-auto space-y-8 scrollbar-hide">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 sm:p-6 rounded-[2.5rem] text-sm leading-relaxed shadow-sm transition-all duration-300 ${
                  m.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none font-semibold shadow-indigo-100' 
                  : 'liquid-glass text-slate-800 border border-white rounded-tl-none font-medium'
                }`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex space-x-2 px-4">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-150" />
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-300" />
              </div>
            )}
            
            {showPrefs && (
              <div className="bg-white/80 border border-white rounded-[3rem] p-8 sm:p-10 space-y-8 shadow-2xl animate-in slide-in-from-bottom-10 duration-700 backdrop-blur-2xl">
                <div>
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] block mb-6">Archive Frequency</label>
                   <div className="flex flex-wrap gap-2">
                     {MOODS.map(m => (
                       <button 
                        key={m} 
                        onClick={() => setPrefs(p => ({ ...p, mood: p.mood === m ? '' : m }))} 
                        className={`px-4 py-2 rounded-full text-[10px] font-bold transition-all duration-300 ${prefs.mood === m ? 'bg-slate-900 text-white shadow-xl scale-110' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                       >
                        {m}
                       </button>
                     ))}
                   </div>
                </div>
                <button onClick={handleSend} className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-2xl hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95">Set Sync</button>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8 bg-white/40 border-t border-white/50 flex items-center space-x-4 backdrop-blur-3xl">
            <button 
              onClick={() => setShowPrefs(!showPrefs)} 
              className={`p-3.5 rounded-2xl transition-all shadow-sm transform active:scale-90 ${showPrefs ? 'bg-indigo-600 text-white shadow-indigo-200' : 'liquid-glass text-slate-500 hover:bg-slate-100'}`}
              title="Refine Inquiry"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
            </button>
            <input 
              type="text" 
              placeholder="Inquire..." 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              className="flex-grow bg-white/60 border-none rounded-2xl px-5 py-3.5 text-sm font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/10 outline-none placeholder:text-slate-400" 
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || (!input.trim() && !showPrefs)} 
              className="bg-slate-900 text-white p-3.5 rounded-2xl hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 active:scale-90"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-900 text-white rounded-[2.5rem] shadow-[0_24px_48px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 hover:bg-indigo-600 transition-all active:scale-90 group overflow-hidden border border-white/10"
      >
        <svg className={`w-8 h-8 sm:w-9 sm:h-9 transition-transform duration-700 ${isOpen ? 'rotate-180 scale-75 opacity-50' : 'group-hover:rotate-12'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
      </button>
    </div>
  );
};

export default AIChatAssistant;
