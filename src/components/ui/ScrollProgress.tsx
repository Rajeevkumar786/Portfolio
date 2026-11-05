import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-slate-800/40 pointer-events-none">
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 origin-left shadow-[0_0_12px_rgba(56,189,248,0.7)]"
        style={{ scaleX }}
      />
    </div>
  );
};
