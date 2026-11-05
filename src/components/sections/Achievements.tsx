import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Terminal, Sparkles, Code2, ExternalLink } from 'lucide-react';
import { portfolioData, type AchievementItem } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Credentials & Recognition"
          number="06"
          title="Achievement"
          highlight="Vault"
          subtitle="Accredited technical certifications and proven competitive programming milestone."
        />

        {/* 3D Vault Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.achievements.map((item: AchievementItem, index: number) => {
            const isCert = item.category === 'Certification';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <TiltCard maxTilt={6}>
                  <GlassCard
                    glow={index === 0}
                    className="p-6 sm:p-7 h-full flex flex-col justify-between border-slate-800/80 hover:border-cyan-500/40 relative group"
                  >
                    <div>
                      {/* Top Category Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-slate-900 text-cyan-400 border border-slate-800">
                          {item.category}
                        </span>

                        <div className="w-9 h-9 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                          {isCert ? <Award className="w-5 h-5" /> : <Code2 className="w-5 h-5" />}
                        </div>
                      </div>

                      {/* Title & Issuer */}
                      <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs font-mono text-cyan-400 mb-4 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <span>{item.issuer}</span>
                        {item.location && <span>• {item.location}</span>}
                      </p>

                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 bg-slate-950/40 p-4 rounded-xl border border-slate-800/60">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer verification */}
                    <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Verified Credential
                      </span>

                      {item.stats && (
                        <span className="text-slate-400 text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                          {item.stats}
                        </span>
                      )}
                    </div>
                  </GlassCard>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
