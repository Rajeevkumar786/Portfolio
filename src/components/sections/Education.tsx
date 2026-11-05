import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, MapPin } from 'lucide-react';
import { portfolioData, type EducationItem } from '@/data/portfolio';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { TiltCard } from '@/components/ui/TiltCard';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="Academic Foundations"
          number="05"
          title="Educational"
          highlight="Milestones"
          subtitle="Formal computer science discipline and foundational secondary academic achievements."
        />

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.education.map((edu: EducationItem, index: number) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              <TiltCard maxTilt={5}>
                <GlassCard className="p-6 h-full flex flex-col justify-between border-slate-800/80 hover:border-cyan-500/30">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        {edu.period}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                      {edu.degree}
                    </h3>
                    {edu.field && (
                      <p className="text-xs font-mono text-blue-400 mb-2">
                        {edu.field}
                      </p>
                    )}
                    <p className="text-sm text-slate-300 font-medium mb-1">
                      {edu.institution}
                    </p>
                    {edu.location && (
                      <p className="text-xs text-slate-500 flex items-center gap-1 mb-4">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">Academic Standing:</span>
                    <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/50 border border-cyan-800/30">
                      {edu.score}
                    </span>
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
