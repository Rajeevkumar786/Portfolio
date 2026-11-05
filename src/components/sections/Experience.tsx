import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2, Terminal, ArrowUpRight } from 'lucide-react';
import { portfolioData, type ExperienceItem } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Career Evolution"
          number="03"
          title="Professional"
          highlight="Experience"
          subtitle="Hands-on software engineering internships and structured technical traineeships."
        />

        {/* 3D Timeline Container */}
        <div className="relative border-l border-cyan-500/30 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {portfolioData.experience.map((item: ExperienceItem, index: number) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30, z: -50 }}
              whileInView={{ opacity: 1, x: 0, z: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Timeline Orb Node */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-5 h-5 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.7)] group-hover:scale-125 transition-transform duration-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>

              {/* 3D Glass Card */}
              <TiltCard maxTilt={4} scale={1.01}>
                <GlassCard className="p-6 sm:p-8 border-slate-800/80 hover:border-cyan-500/40">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                          {item.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          {item.location}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 shrink-0 self-start sm:self-auto">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-3 mb-6 bg-slate-950/40 p-4 sm:p-5 rounded-xl border border-slate-800/60">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-xs font-mono text-slate-500 mr-2 flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-blue-400" />
                      Stack:
                    </span>
                    {item.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
