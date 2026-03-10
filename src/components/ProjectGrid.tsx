import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Tag } from 'lucide-react';
import { Project } from '../types';
import { cn } from '../lib/utils';

interface ProjectGridProps {
  projects: Project[];
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
  return (
    <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-2xl font-bold uppercase tracking-tight">Projects</h2>
        <div className="h-px flex-1 bg-ink/10" />
        <span className="font-mono text-xs opacity-50">Count: {projects.length}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-ink">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="border-r border-b border-ink p-8 group flex flex-col h-full hover:bg-ink hover:text-paper transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
                {project.date}
              </span>
              <div className={cn(
                "px-2 py-0.5 text-[10px] uppercase font-bold border",
                project.status === 'completed' ? "border-emerald-500 text-emerald-600" : 
                project.status === 'in-progress' ? "border-amber-500 text-amber-600" : 
                "border-ink/20 text-ink/40"
              )}>
                {project.status}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2 group-hover:underline cursor-pointer">
              {project.title}
            </h3>
            
            <p className="text-sm opacity-70 mb-6 flex-grow">
              {project.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="flex items-center gap-1 text-[10px] font-mono bg-ink/5 px-2 py-1">
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>
            
            <a 
              href={project.link || "#"} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "mt-auto flex items-center justify-between text-xs font-bold uppercase tracking-widest pt-4 border-t border-ink/5",
                "transition-colors duration-300",
                "group-hover:text-paper group-hover:border-paper/20"
              )}
            >
              <span>View Documentation</span>
              <ExternalLink size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
