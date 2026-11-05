import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Command,
  FileDown,
  Menu,
  X,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { usePortfolioStore, type PerformanceMode } from '@/store/portfolioStore';
import { portfolioData } from '@/data/portfolio';
import { MagneticButton } from '@/components/ui/MagneticButton';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    toggleCommandPalette,
    performanceMode,
    setPerformanceMode,
    reducedMotion,
    setReducedMotion,
  } = usePortfolioStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cyclePerformanceMode = () => {
    const modes: PerformanceMode[] = ['high', 'medium', 'low'];
    const next = modes[(modes.indexOf(performanceMode) + 1) % modes.length];
    setPerformanceMode(next);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-slate-950/75 backdrop-blur-xl border-b border-slate-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(56,189,248,0.3)]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-transparent transition-colors">
              <span className="font-mono text-sm font-bold text-cyan-400 group-hover:text-white transition-colors">
                RK
              </span>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              {portfolioData.personal.name}
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] font-mono text-slate-400 block tracking-wider uppercase">
              SE • 2027
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full border border-slate-800/80">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-blue-950/60 border border-cyan-500/30 rounded-full -z-10 shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={toggleCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 hover:border-slate-700 text-xs font-mono transition-all cursor-pointer shadow-sm"
            title="Command Palette (Ctrl + K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Commands</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] bg-slate-800 border border-slate-700 text-slate-400">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Performance Mode Toggle */}
          <button
            onClick={cyclePerformanceMode}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800/80 text-xs font-mono transition-all cursor-pointer"
            title={`Performance: ${performanceMode.toUpperCase()} (Click to change)`}
          >
            <Zap
              className={`w-3.5 h-3.5 ${
                performanceMode === 'high'
                  ? 'text-cyan-400'
                  : performanceMode === 'medium'
                  ? 'text-amber-400'
                  : 'text-slate-500'
              }`}
            />
            <span className="text-[11px] uppercase tracking-wider">{performanceMode}</span>
          </button>

          {/* Resume PDF Button */}
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => window.print()}
            className="hidden sm:inline-flex"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Resume</span>
          </MagneticButton>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col gap-2 mb-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left py-2.5 px-3 rounded-lg text-sm font-mono transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-950/50 text-cyan-400 border border-cyan-800/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Graphics Mode:</span>
                <button
                  onClick={cyclePerformanceMode}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-400 uppercase"
                >
                  {performanceMode}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Reduced Motion:</span>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-400"
                >
                  {reducedMotion ? 'ON' : 'OFF'}
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.print();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 text-white font-medium text-sm mt-2"
              >
                <FileDown className="w-4 h-4" />
                <span>Download / Print Resume</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
