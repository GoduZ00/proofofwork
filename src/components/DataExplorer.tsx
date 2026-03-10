import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Loader2, Database } from 'lucide-react';
import { Project } from '../types';

interface DataExplorerProps {
  projects: Project[];
}

export const DataExplorer: React.FC<DataExplorerProps> = ({ projects }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  
  const fullPlaceholder = "Waiting for input. State your query...";
  const terminalRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // 3D эффект терминала
  useEffect(() => {
    const card = terminalRef.current;
    if (!card) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      frameIdRef.current = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (y - rect.height / 2) / -25; 
        const rotateY = (x - rect.width / 2) / 25;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
    };
    const startTyping = (targetValue: number, speed: number) => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = setInterval(() => {
        setVisibleChars((prev) => {
          if (prev < targetValue) return prev + 1;
          if (prev > targetValue) return prev - 1;
          return prev;
        });
      }, speed);
    };
    const handleMouseEnter = () => startTyping(fullPlaceholder.length, 30);
    const handleMouseLeave = () => {
      startTyping(0, 40);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, []);

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setResponse(null);

    try {
      // Инициализируем API (Ключ уже должен быть активен)
      const genAI = new GoogleGenerativeAI("AIzaSyDk9jkFS-jHcb5tQaK6t_XnoJ1Iu0E-sJI");
      
      // Используем стабильную версию модели
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      });

      const prompt = `Context: ${JSON.stringify(projects)}. User query: ${query}. Answer briefly in 1-2 short sentences as a terminal system. No markdown.`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      setResponse(text);
    } catch (err: any) {
      console.error("Full Error details:", err);
      // Если опять 404 - значит Google вредничает с версией
      setResponse(`SYSTEM_ERROR: CONNECTION_FAILED. (Code: ${err.message?.slice(0, 15)})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-ink/10">
      <div className="flex items-center gap-4 mb-8">
        <Database size={20} className="text-ink" />
        <h2 className="text-2xl font-bold uppercase tracking-tight font-mono">Data Explorer</h2>
        <div className="h-px flex-1 bg-ink/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm opacity-70 mb-6 font-mono italic">{"[SYSTEM] READY_FOR_QUERY..."}</p>
          <form onSubmit={handleQuery} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask something about projects..."
              className="w-full bg-white border border-ink p-4 font-mono text-sm focus:outline-none"
            />
            <button type="submit" disabled={loading} className="absolute right-2 top-2 p-2 bg-ink text-paper">
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </form>
        </div>

        <div className="h-[250px] flex items-center justify-center">
          <div 
            ref={terminalRef}
            className="w-full h-full border border-ink bg-ink text-paper p-8 font-mono text-xs relative shadow-2xl transition-transform duration-200 ease-out overflow-hidden"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            {/* ВЕРСТКА БЕЗ НАЛОЖЕНИЙ */}
            <div className="pointer-events-none select-none relative h-full flex flex-col">
              <div className="absolute top-0 right-0 opacity-20 uppercase text-[10px]">Neural_Link_v1.5</div>
              
              <div style={{ transform: 'translateZ(40px)' }} className="mt-4 flex items-start w-full h-full">
                <span className="text-emerald-400 mr-2 shrink-0">❯</span>
                
                <div className="flex-1 min-w-0">
                  {response ? (
                    <span className="text-zinc-100 leading-relaxed block break-words">{response}</span>
                  ) : (
                    <div className="opacity-80 italic leading-relaxed block">
                      {loading ? (
                        <span className="text-amber-300 animate-pulse font-bold">ANALYZING_SYSTEM_DATA...</span>
                      ) : (
                        <div className="flex flex-wrap gap-x-1">
                          {fullPlaceholder.slice(0, visibleChars).split(' ').map((word, i) => {
                            let color = "text-zinc-500";
                            if (word.toLowerCase().includes("input")) color = "text-emerald-400";
                            if (word.toLowerCase().includes("query")) color = "text-amber-300 font-bold";
                            return <span key={i} className={color}>{word}</span>;
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Курсор теперь не мешает основному тексту */}
                <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse ml-1 shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};