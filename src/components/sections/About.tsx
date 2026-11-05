import React from 'react';
import { motion } from 'framer-motion';
import {
  Code2,
  Terminal,
  Cpu,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  GitBranch,
  Layers,
} from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animations';

export const About: React.FC = () => {
  const corePillars = [
    {
      icon: <Layers className="w-5 h-5 text-cyan-400" />,
      title: 'Full Stack Web Architecture',
      description:
        'Engineering responsive web applications and interactive frontends using JavaScript, HTML5, CSS3, and Node.js backends.',
      skills: ['JavaScript', 'HTML5', 'CSS3', 'Node.js', 'REST APIs'],
    },
    {
      icon: <Terminal className="w-5 h-5 text-indigo-400" />,
      title: 'Python Scripting & OOP',
      description:
        'Practical expertise in logic building, OOP principles, maintainable architecture, and algorithmic automation with 5+ mini-projects.',
      skills: ['Python', 'OOP Design', 'Scripting', 'Logic Building'],
    },
    {
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      title: 'Algorithmic Problem Solving',
      description:
        'Implementing robust data structures and high-efficiency algorithmic routines in C/C++ with 50+ problems solved on LeetCode & GFG.',
      skills: ['C++', 'C', 'Data Structures', 'Algorithm Design'],
    },
    {
      icon: <GitBranch className="w-5 h-5 text-emerald-400" />,
      title: 'Modular & Scalable Development',
      description:
        'Designing modular UI rendering components, scaling legacy interfaces, and collaborating using Git and clean coding workflows.',
      skills: ['Git', 'VS Code', 'Clean Code', 'Responsive Layouts'],
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Engineering Profile"
          number="01"
          title="Architecting Resilient Web"
          highlight="Experiences"
          subtitle="Combining full-stack software development with rigorous computer science fundamentals."
        />

        {/* Narrative & Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-start">
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 border-slate-800/80">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Code2 className="w-6 h-6 text-cyan-400" />
                <span>Developer Summary</span>
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {portfolioData.personal.summary}
              </p>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-300">
                  Graduating in <strong className="text-white">2027</strong> from United Institute of Technology with a B.Tech in Computer Science & Engineering.
                </span>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Metrics Grid */}
          <motion.div
            variants={fadeInUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            <GlassCard className="p-6 text-center border-slate-800/80 flex flex-col justify-center items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-mono mb-1">
                7.76
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                B.Tech CGPA / 10.0
              </span>
            </GlassCard>

            <GlassCard className="p-6 text-center border-slate-800/80 flex flex-col justify-center items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-mono mb-1">
                50+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                DSA Solved (LeetCode/GFG)
              </span>
            </GlassCard>

            <GlassCard className="p-6 text-center border-slate-800/80 flex flex-col justify-center items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 font-mono mb-1">
                35+
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                GitHub Public Repos
              </span>
            </GlassCard>

            <GlassCard className="p-6 text-center border-slate-800/80 flex flex-col justify-center items-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 font-mono mb-1">
                2
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Certifications (IIIT)
              </span>
            </GlassCard>
          </motion.div>
        </div>

        {/* 4 Pillars of Competence */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {corePillars.map((pillar, index) => (
            <TiltCard key={index} maxTilt={5}>
              <GlassCard className="p-6 sm:p-8 h-full flex flex-col justify-between border-slate-800/80 hover:border-cyan-500/30">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 shadow-sm">
                    {pillar.icon}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{pillar.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-800/60">
                  {pillar.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-slate-900/90 text-cyan-300 border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
