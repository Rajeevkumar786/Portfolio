import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Terminal, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectGallery } from '@/components/project/ProjectGallery';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Featured Engineering Works"
          number="04"
          title="Engineered"
          highlight="Projects"
          subtitle="Production-ready web applications built with dynamic rendering, state management, and high-performance routing."
        />

        {/* 3D Gallery Grid with Interactive Cards & Detail Modal */}
        <div className="relative">
          <ProjectGallery />
        </div>

        {/* Tech note banner */}
        <div className="mt-12 p-4 rounded-xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Click any project card to inspect its full architecture breakdown and features.</span>
          </div>
          <span className="text-cyan-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            100% Resume-Verified Codebases
          </span>
        </div>
      </div>
    </section>
  );
};
