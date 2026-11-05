import React, { useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import { cn } from '@/lib/utils';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  className,
  variant = 'primary',
  size = 'md',
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { reducedMotion, performanceMode } = usePortfolioStore();

  const isLowPerformance = performanceMode === 'low' || reducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (isLowPerformance || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white font-medium shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] border border-blue-400/30',
    secondary:
      'bg-slate-900/80 text-slate-200 border border-slate-700/60 hover:border-slate-500 hover:bg-slate-850 hover:text-white backdrop-blur-md shadow-lg',
    outline:
      'bg-transparent text-slate-300 border border-slate-700 hover:border-blue-500 hover:text-blue-400',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-transparent',
  };

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  };

  const baseStyles = cn(
    'relative inline-flex items-center justify-center font-medium transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 active:scale-95 cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asAnchor && href) {
    return (
      <motion.a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={baseStyles}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={isLowPerformance ? undefined : { x: position.x, y: position.y }}
        transition={{ type: 'spring' as const, damping: 15, stiffness: 200, mass: 0.1 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type="button"
      className={baseStyles}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={isLowPerformance ? undefined : { x: position.x, y: position.y }}
      transition={{ type: 'spring' as const, damping: 15, stiffness: 200, mass: 0.1 }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};
