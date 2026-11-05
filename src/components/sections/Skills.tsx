import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Globe,
  Wrench,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';
import { portfolioData, type SkillNode } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animations';

type CategoryKey = 'all' | 'languages' | 'web' | 'tools' | 'coursework';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');
  const [hoveredSkill, setHoveredSkill] = useState<SkillNode | null>(null);

  const categories = [
    { id: 'all' as CategoryKey, label: 'All Technologies', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'languages' as CategoryKey, label: 'Programming Languages', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'web' as CategoryKey, label: 'Web Tech & Frameworks', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'tools' as CategoryKey, label: 'Tools & Version Control', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'coursework' as CategoryKey, label: 'Computer Science Coursework', icon: <BookOpen className="w-3.5 h-3.5" /> },
  ];

  const allSkills: SkillNode[] = [
    ...portfolioData.skills.languages,
    ...portfolioData.skills.web,
    ...portfolioData.skills.tools,
    ...portfolioData.skills.coursework,
  ];

  const displayedSkills = activeCategory === 'all'
    ? allSkills
    : allSkills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Technical Competencies"
          number="02"
          title="3D Skills"
          highlight="Constellation"
          subtitle="A structured technology graph spanning full stack development, systems algorithms, and foundational computer science."
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600/30 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Constellation Notice & Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Interactive Skills Grid */}
          <div className="lg:col-span-8">
            <motion.div
              layout
              variants={staggerContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {displayedSkills.map((skill, index) => (
                <TiltCard key={skill.name} maxTilt={5}>
                  <GlassCard
                    className={`p-5 h-full flex flex-col justify-between border-slate-800/80 transition-all cursor-pointer ${
                      hoveredSkill?.name === skill.name
                        ? 'border-cyan-500/50 bg-slate-900/90 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                        : 'hover:border-slate-700'
                    }`}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                          {skill.name}
                          {skill.highlight && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          )}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase border border-slate-700/60">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {skill.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-3 border-t border-slate-800/60">
                      <span className="capitalize">{skill.category}</span>
                      <span className="text-cyan-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    </div>
                  </GlassCard>
                </TiltCard>
              ))}
            </motion.div>
          </div>

          {/* Interactive Inspection Glass Panel */}
          <div className="lg:col-span-4 sticky top-28">
            <GlassCard className="p-6 border-slate-800/90 glass-panel-glow">
              <div className="flex items-center gap-2.5 mb-4 text-xs font-mono text-cyan-400 uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Node Inspector</span>
              </div>

              {hoveredSkill ? (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Target Technology
                    </span>
                    <h4 className="text-2xl font-bold text-white glow-text-cyan">
                      {hoveredSkill.name}
                    </h4>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Classification & Domain
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-blue-950/60 text-blue-300 border border-blue-800/40 capitalize inline-block">
                      {hoveredSkill.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                      Practical Capability
                    </span>
                    <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3 rounded-lg border border-slate-800/60">
                      {hoveredSkill.description}
                    </p>
                  </div>

                  <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                    <span>Proficiency Level:</span>
                    <span className="text-cyan-400 font-semibold">{hoveredSkill.level}</span>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Cpu className="w-10 h-10 text-slate-600 mx-auto mb-3 animate-spin-slow" />
                  <p className="text-xs font-mono text-slate-400">
                    Hover over any skill node in the grid or the 3D scene to inspect engineering details.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};
