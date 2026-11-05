import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Sparkles, Download, Layers, ShieldCheck, Mail } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { fadeInUpVariants, staggerContainerVariants } from '@/lib/animations';
import { usePortfolioStore } from '@/store/portfolioStore';

export const Hero: React.FC = () => {
  const { setActiveSection } = usePortfolioStore();

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Hero Content */}
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 text-left z-10"
        >
          {/* Status Badge */}
          <motion.div
            variants={fadeInUpVariants}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide uppercase mb-6 border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.18)]"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>HELLO, I'M</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">GRADUATING 2027</span>
          </motion.div>

          {/* Name Header */}
          <motion.h1
            variants={fadeInUpVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.08]"
          >
            {portfolioData.personal.name}
          </motion.h1>

          {/* Professional Title */}
          <motion.div
            variants={fadeInUpVariants}
            className="text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-6 glow-text-cyan flex items-center gap-2"
          >
            <span>{portfolioData.personal.title}</span>
          </motion.div>

          {/* Short Resume-based Intro */}
          <motion.p
            variants={fadeInUpVariants}
            className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8"
          >
            {portfolioData.personal.summary}
          </motion.p>

          {/* Call to Actions */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => scrollTo('projects')}
              className="group"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </MagneticButton>

            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => scrollTo('contact')}
            >
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>Let's Connect</span>
            </MagneticButton>

            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => window.print()}
              className="text-slate-300"
            >
              <Download className="w-4 h-4" />
              <span>Resume</span>
            </MagneticButton>
          </motion.div>

          {/* Live Proof Badges */}
          <motion.div
            variants={fadeInUpVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-800/80 text-xs font-mono"
          >
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-500 block text-[11px] uppercase">Experience</span>
              <span className="text-white font-semibold">Code Technologies</span>
              <span className="text-cyan-400 block text-[10px]">Full Stack Intern</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-500 block text-[11px] uppercase">GitHub Work</span>
              <a
                href={portfolioData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-cyan-400 transition-colors block truncate"
              >
                35+ Repositories
              </a>
              <span className="text-blue-400 block text-[10px]">@Rajeevkumar786</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-500 block text-[11px] uppercase">Problem Solving</span>
              <span className="text-white font-semibold">50+ DSA Solved</span>
              <span className="text-indigo-400 block text-[10px]">LeetCode & GFG</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <span className="text-slate-500 block text-[11px] uppercase">Certified</span>
              <span className="text-white font-semibold">MERN Stack</span>
              <span className="text-emerald-400 block text-[10px]">IIIT Prayagraj</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Scene Focus Space */}
        <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-[500px] flex items-center justify-center relative pointer-events-none">
          {/* Ambient Glowing Portal Aura in background */}
          <div className="absolute w-72 h-72 rounded-full bg-cyan-500/10 blur-[90px] animate-pulse" />
          <div className="absolute w-60 h-60 rounded-full bg-indigo-500/15 blur-[80px]" />
          
          {/* Overlay Tag in bottom right of 3D Hero */}
          <div className="absolute bottom-4 right-4 glass-panel px-3.5 py-2 rounded-xl text-xs font-mono text-slate-300 border border-slate-700/60 flex items-center gap-2 pointer-events-auto">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive 3D Core • Drag / Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
};
