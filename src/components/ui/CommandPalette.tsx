import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Command,
  Home,
  User,
  Cpu,
  Briefcase,
  Layers,
  GraduationCap,
  Award,
  Mail,
  FileDown,
  Sparkles,
  Zap,
  Activity,
  Copy,
  ExternalLink,
  Check,
  X,
} from 'lucide-react';
import { usePortfolioStore, type PerformanceMode } from '@/store/portfolioStore';
import { portfolioData } from '@/data/portfolio';

interface CommandItem {
  id: string;
  title: string;
  section?: string;
  category: 'Navigation' | 'Actions' | 'Preferences' | 'External';
  icon: React.ReactNode;
  action: () => void;
  badge?: string;
}

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    performanceMode,
    setPerformanceMode,
    reducedMotion,
    setReducedMotion,
    webglAvailable,
    setWebglAvailable,
  } = usePortfolioStore();

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close on Escape, toggle on Ctrl/Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
      if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  const scrollTo = (id: string) => {
    setIsCommandPaletteOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsCommandPaletteOpen(false);
    }, 1200);
  };

  const downloadResume = () => {
    setIsCommandPaletteOpen(false);
    // Print/Save resume dialog or trigger direct PDF print
    window.print();
  };

  const nextPerformanceMode = () => {
    const modes: PerformanceMode[] = ['high', 'medium', 'low'];
    const next = modes[(modes.indexOf(performanceMode) + 1) % modes.length];
    setPerformanceMode(next);
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-home',
      title: 'Go to Hero / Home',
      category: 'Navigation',
      icon: <Home className="w-4 h-4 text-cyan-400" />,
      action: () => scrollTo('hero'),
    },
    {
      id: 'nav-about',
      title: 'About Identity',
      category: 'Navigation',
      icon: <User className="w-4 h-4 text-blue-400" />,
      action: () => scrollTo('about'),
    },
    {
      id: 'nav-skills',
      title: '3D Skills Constellation',
      category: 'Navigation',
      icon: <Cpu className="w-4 h-4 text-indigo-400" />,
      action: () => scrollTo('skills'),
    },
    {
      id: 'nav-experience',
      title: 'Experience Timeline',
      category: 'Navigation',
      icon: <Briefcase className="w-4 h-4 text-emerald-400" />,
      action: () => scrollTo('experience'),
    },
    {
      id: 'nav-projects',
      title: 'Projects Showcase',
      category: 'Navigation',
      icon: <Layers className="w-4 h-4 text-amber-400" />,
      action: () => scrollTo('projects'),
    },
    {
      id: 'nav-education',
      title: 'Education & Academics',
      category: 'Navigation',
      icon: <GraduationCap className="w-4 h-4 text-purple-400" />,
      action: () => scrollTo('education'),
    },
    {
      id: 'nav-achievements',
      title: 'Achievements & Certifications',
      category: 'Navigation',
      icon: <Award className="w-4 h-4 text-yellow-400" />,
      action: () => scrollTo('achievements'),
    },
    {
      id: 'nav-contact',
      title: 'Contact Portal',
      category: 'Navigation',
      icon: <Mail className="w-4 h-4 text-rose-400" />,
      action: () => scrollTo('contact'),
    },
    {
      id: 'act-resume',
      title: 'Download / Print Resume',
      category: 'Actions',
      icon: <FileDown className="w-4 h-4 text-blue-400" />,
      action: downloadResume,
      badge: 'PDF',
    },
    {
      id: 'act-email',
      title: copied ? 'Email Copied!' : 'Copy Email Address',
      category: 'Actions',
      icon: copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />,
      action: copyEmail,
      badge: portfolioData.personal.email,
    },
    {
      id: 'pref-perf',
      title: `Toggle Performance Mode (Current: ${performanceMode.toUpperCase()})`,
      category: 'Preferences',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      action: nextPerformanceMode,
      badge: performanceMode,
    },
    {
      id: 'pref-motion',
      title: `Toggle Reduced Motion (${reducedMotion ? 'Enabled' : 'Disabled'})`,
      category: 'Preferences',
      icon: <Activity className="w-4 h-4 text-cyan-400" />,
      action: () => setReducedMotion(!reducedMotion),
      badge: reducedMotion ? 'Reduced' : 'Smooth',
    },
    {
      id: 'pref-3d',
      title: `Toggle 3D Experience (${webglAvailable ? 'Active' : 'Disabled'})`,
      category: 'Preferences',
      icon: <Sparkles className="w-4 h-4 text-indigo-400" />,
      action: () => setWebglAvailable(!webglAvailable),
      badge: webglAvailable ? '3D WebGL' : '2D Ambient',
    },
    {
      id: 'ext-github',
      title: 'Visit GitHub Profile',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-slate-400" />,
      action: () => {
        window.open(portfolioData.social.github, '_blank');
        setIsCommandPaletteOpen(false);
      },
    },
    {
      id: 'ext-linkedin',
      title: 'Visit LinkedIn Profile',
      category: 'External',
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      action: () => {
        window.open(portfolioData.social.linkedin, '_blank');
        setIsCommandPaletteOpen(false);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 md:pt-28 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl rounded-2xl glass-panel-glow border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden z-10"
            onKeyDown={handleKeyDownList}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-slate-800/80 gap-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or jump to section..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setIsCommandPaletteOpen(false)}
                className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  No commands matching "{search}"
                </div>
              ) : (
                filteredCommands.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer text-sm transition-all duration-150 ${
                        isSelected
                          ? 'bg-blue-600/25 text-white border border-blue-500/30'
                          : 'text-slate-300 hover:bg-slate-800/40 hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg ${
                            isSelected ? 'bg-blue-500/20 text-cyan-300' : 'bg-slate-800/80 text-slate-400'
                          }`}
                        >
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.title}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono uppercase bg-slate-800/80 text-slate-400 border border-slate-700/60">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-slate-500">{item.category}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 bg-slate-950/70 border-t border-slate-800/70 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">↑↓</kbd>
                  Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">↵</kbd>
                  Select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">Esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
