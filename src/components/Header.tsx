import React from 'react';
import { Terminal, Globe, Github, Mail, Twitter, Send } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b border-ink/10 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest opacity-50 mb-4">
            <Terminal size={14} />
            <span>System: Active</span>
            <span className="ml-4">v2.4.0</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] mb-8 uppercase">
            PROOF <br />
            <span className="text-outline-ink text-transparent">OF</span> WORK
          </h1>
          <p className="max-w-md text-lg opacity-80 font-medium">
            A technical log of experiments, projects, and data points by a digital architect.
          </p>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <a href="https://t.me/@Jaymendep01" className="p-3 border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
              <Send  size={20} />
            </a>
            <a href="https://x.com/Jaymendep01" className="p-3 border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
              <Twitter size={20} />
            </a>
            <a href="mailto:ovvoterminal@gmail.com?subject=Вопрос по проекту&body=Здравствуйте, я хотел бы узнать..." className="p-3 border border-ink/10 hover:bg-ink hover:text-paper transition-colors">
              <Mail size={20} />
            </a>
          </div>
          <div className="text-xs font-mono uppercase tracking-tighter">
            Last Updated: {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>
    </header>
  );
};
