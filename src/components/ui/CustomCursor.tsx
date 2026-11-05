import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';

export const CustomCursor: React.FC = () => {
  const { cursorHovered, cursorText, reducedMotion, performanceMode } = usePortfolioStore();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const trailConfig = { damping: 30, stiffness: 180, mass: 0.5 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    // Check if touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);

    if (isTouch || reducedMotion || performanceMode === 'low') {
      document.body.classList.remove('custom-cursor-active');
      return;
    }

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [reducedMotion, performanceMode, isVisible, mouseX, mouseY]);

  if (isTouchDevice || reducedMotion || performanceMode === 'low' || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer trailing aura */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full border border-cyan-400/30 -translate-x-1/2 -translate-y-1/2 will-change-transform"
        style={{
          x: trailX,
          y: trailY,
          width: cursorHovered ? 64 : 36,
          height: cursorHovered ? 64 : 36,
          backgroundColor: cursorHovered ? 'rgba(56, 189, 248, 0.08)' : 'transparent',
          boxShadow: cursorHovered ? '0 0 25px rgba(56, 189, 248, 0.25)' : 'none',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />

      {/* Inner precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-50 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center text-[10px] font-mono font-bold text-slate-950 uppercase"
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorHovered && cursorText ? 44 : cursorHovered ? 12 : 6,
          height: cursorHovered && cursorText ? 44 : cursorHovered ? 12 : 6,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      >
        {cursorHovered && cursorText && (
          <span className="scale-75 tracking-wider">{cursorText}</span>
        )}
      </motion.div>
    </>
  );
};
