import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Search,
  Sparkles,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Wrench,
  Gamepad2,
} from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { portfolioData, type Project } from '@/data/portfolio';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { MagneticButton } from '@/components/ui/MagneticButton';

type FilterCategory = 'All' | 'Full Stack' | 'Python & AI' | 'Extensions & Tools' | 'Interactive & Games';

export const ProjectGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: FilterCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'All', label: 'All Works', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'Full Stack', label: 'Full Stack & MERN', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'Python & AI', label: 'Python & Computer Vision', icon: <Cpu className="w-3.5 h-3.5" /> },
    { id: 'Extensions & Tools', label: 'Extensions & Utilities', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'Interactive & Games', label: 'Interactive UI & Games', icon: <Gamepad2 className="w-3.5 h-3.5" /> },
  ];

  const filteredProjects = portfolioData.projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Filtering and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects by tech / name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 transition-colors font-mono"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="py-16 text-center text-slate-500 font-mono text-xs">
          No repositories found matching "{searchQuery}" in this category.
        </div>
      )}

      {/* Callout to Explore All 35+ GitHub Repositories */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl glass-panel-glow border border-slate-800 text-center flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <div className="flex items-center gap-2 mb-1">
            <Github className="w-5 h-5 text-cyan-400" />
            <h4 className="text-lg font-bold text-white">
              Explore All 35+ Repositories on GitHub
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
            From MERN medical appointment booking to facial recognition, Chrome extensions, and browser games — see the complete commits and code history on <span className="text-cyan-400 font-mono">@Rajeevkumar786</span>.
          </p>
        </div>

        <MagneticButton
          asAnchor
          href={portfolioData.social.github}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="md"
          className="shrink-0 font-mono text-xs"
        >
          <Github className="w-4 h-4 mr-2" />
          <span>github.com/Rajeevkumar786</span>
          <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
        </MagneticButton>
      </div>

      {/* Accessible Detail Dialog */}
      <ProjectModal />
    </>
  );
};
