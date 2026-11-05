import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/store/portfolioStore';
import { cn } from '@/lib/utils';

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxTilt = 8,
  scale = 1.02,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { performanceMode, reducedMotion } = usePortfolioStore();

  const isLowPerf = performanceMode === 'low' || reducedMotion;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isLowPerf || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = -((y - centerY) / centerY) * maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={
          isLowPerf
            ? {}
            : {
                rotateX: tilt.x,
                rotateY: tilt.y,
                scale: isHovered ? scale : 1,
              }
        }
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          mass: 0.2,
        }}
        className={cn('w-full transform-gpu', className)}
        {...(props as any)}
      >
        {children}
      </motion.div>
    </div>
  );
};
