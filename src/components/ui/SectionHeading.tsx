import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUpVariants } from '@/lib/animations';

interface SectionHeadingProps {
  badge: string;
  number?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  number,
  title,
  highlight,
  subtitle,
  center = false,
  className,
}) => {
  return (
    <motion.div
      variants={fadeInUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={cn('mb-12 md:mb-16', center && 'text-center mx-auto max-w-2xl', className)}
    >
      <div
        className={cn(
          'inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase mb-4 border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.15)]',
          center && 'justify-center'
        )}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        {number && <span className="text-cyan-500/70">{number} //</span>}
        <span>{badge}</span>
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
        {title}{' '}
        {highlight && (
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent glow-text-cyan">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
