import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { usePortfolioStore } from '@/store/portfolioStore';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  spotlight?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  spotlight = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const { performanceMode, reducedMotion } = usePortfolioStore();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (performanceMode === 'low' || reducedMotion || !spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative rounded-2xl overflow-hidden transition-all duration-300',
        glow ? 'glass-panel-glow' : 'glass-panel',
        'hover:border-slate-500/40 group',
        className
      )}
      {...props}
    >
      {spotlight && isHovered && performanceMode !== 'low' && !reducedMotion && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.12), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
