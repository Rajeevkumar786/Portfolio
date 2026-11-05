import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Terminal, Sparkles, CheckCircle2 } from 'lucide-react';
import { Github } from '@/components/ui/Icons';
import type { Project } from '@/data/portfolio';
import { TiltCard } from '@/components/ui/TiltCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { usePortfolioStore } from '@/store/portfolioStore';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { setSelectedProject, setCursorHovered } = usePortfolioStore();

  return (
    <TiltCard maxTilt={6} scale={1.015}>
      <GlassCard
        className="h-full flex flex-col justify-between p-6 sm:p-8 cursor-pointer relative group transition-all duration-300 border-slate-800/80 hover:border-cyan-500/40"
        onClick={() => setSelectedProject(project.id)}
        onMouseEnter={() => setCursorHovered(true, 'VIEW')}
        onMouseLeave={() => setCursorHovered(false)}
      >
        {/* Top Badges & Category */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-500">{project.period}</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-950/50 group-hover:border group-hover:border-cyan-500/30 transition-all">
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          {project.role && (
            <p className="text-xs font-mono text-slate-400 mb-4 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>{project.role}</span>
            </p>
          )}

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Key bullets from resume */}
          <div className="space-y-2 mb-6">
            {project.features.slice(0, 2).map((feat, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                <span className="line-clamp-2">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info: Tech stack & actions */}
        <div>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.8 text-[11px] font-mono rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
            {project.metrics ? (
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {project.metrics}
              </span>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {project.githubUrl && (
                <MagneticButton
                  asAnchor
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="ghost"
                  size="sm"
                  className="p-2"
                >
                  <Github className="w-4 h-4 text-slate-400 hover:text-white" />
                </MagneticButton>
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  );
};
