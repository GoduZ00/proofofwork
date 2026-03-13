import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { ProjectGrid } from './components/ProjectGrid';
import { DataExplorer } from './components/DataExplorer';
import { Contact } from './components/Contact';
import { Project } from './types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Terminal Bot',
    description: 'A Telegram bot that allows you to interact with Terminal.',
    tags: ['Telegram', 'Bot', 'Python'],
    date: '2026.01.23',
    status: 'completed',
    link: 'https://t.me/ovvokol'
  },
  {
    id: '2',
    title: 'BetFun',
    description: 'DeFi prediction playground for the wildest Pumpfun,Solana launches.',
    tags: ['Pumpfun', 'Solana', 'DeFi', 'Prediction'],
    date: '2026.02.28',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'Parcing Bot',
    description: 'A bot for parsing and analyzing data.',
    tags: ['Parsing', 'Analysis', 'Python'],
    date: '2026.03.05',
    status: 'in-progress'
  },
  {
    id: '4',
    title: 'Makenzo',
    description: 'Sober driver.',
    tags: ['Car', 'DD', 'Car delivery service'],
    date: '2026.03.05',
    status: 'completed',
    link: 'https://makenzo.vercel.app/'
  },
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let step = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = canvas.width = parent.offsetWidth;
        height = canvas.height = parent.offsetHeight;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // ИЗМЕНЕНО: Цвет линий теперь темный (черный с очень низкой прозрачностью)
      // Чтобы они элегантно смотрелись на светлом фоне
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.14)'; 
      ctx.lineWidth = 1;

      for (let j = 1; j <= 3; j++) {
        ctx.beginPath();
        for (let i = 0; i <= width; i += 40) {
          const amplitude = 20 + j * 5; 
          const frequency = 0.003 / j;
          const y = Math.sin(i * frequency + step * 0.01 * j) * amplitude + height / 2;
          
          if (i === 0) ctx.moveTo(i, y);
          else ctx.lineTo(i, y);
        }
        ctx.stroke();
      }
      
      step++;
      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // ИЗМЕНЕНО: Вернули bg-paper и text-ink
    <div className="min-h-screen selection:bg-ink selection:text-paper bg-paper text-ink">
      <Header />
      
      <main>
        <ProjectGrid projects={MOCK_PROJECTS} />
        <DataExplorer projects={MOCK_PROJECTS} />
        <Contact />
      </main>

      {/* ИЗМЕНЕНО: Футер теперь без темного фона, граница темная (ink/10) */}
      <footer className="relative border-t border-ink/10 py-12 px-6 md:px-12 mt-16 overflow-hidden">
        
        {/* Контейнер для Canvas */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <canvas ref={canvasRef} className="w-full h-full" />
        </div>

        {/* Контент футера: используем оригинальный темный текст */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xs font-mono uppercase tracking-widest opacity-40">
            © 2026 PROOF OF WORK. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
            <a className="hover:underline opacity-60 hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a className="hover:underline opacity-60 hover:opacity-100 transition-opacity">Terms of Service</a>
            <a className="hover:underline opacity-60 hover:opacity-100 transition-opacity">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
