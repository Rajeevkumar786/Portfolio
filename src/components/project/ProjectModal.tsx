import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Calendar, Terminal } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import { usePortfolioStore } from '@/store/portfolioStore';
import { portfolioData, type Project } from '@/data/portfolio';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const ProjectModal: React.FC = () => {
  const { selectedProject, setSelectedProject } = usePortfolioStore();

  const project: Project | undefined = portfolioData.projects.find(
    (p) => p.id === selectedProject
  );

  if (!selectedProject || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel-glow border border-slate-700/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 z-10 shadow-[0_25px_80px_rgba(0,0,0,0.85)]"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="mb-6 pr-10">
            <div className="flex items-center gap-3 mb-2 text-xs font-mono text-cyan-400 uppercase tracking-wider">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/50 border border-cyan-800/40">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                {project.period}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {project.title}
            </h3>
            {project.role && (
              <p className="text-sm font-mono text-slate-400 mt-1">
                Role: <span className="text-blue-400">{project.role}</span>
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
            {project.description}
          </p>

          {/* Key Features & Architecture Highlights */}
          <div className="mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              Engineered Architecture & Accomplishments
            </h4>
            <div className="space-y-2.5">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-800/40"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Technologies Utilized
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono rounded-lg bg-blue-950/40 text-blue-300 border border-blue-800/40"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            {project.metrics && (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.metrics}
              </span>
            )}

            <div className="flex items-center gap-3 ml-auto">
              {project.githubUrl && (
                <MagneticButton
                  asAnchor
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  size="sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repo</span>
                </MagneticButton>
              )}

              {project.liveUrl && (
                <MagneticButton
                  asAnchor
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live App</span>
                </MagneticButton>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
