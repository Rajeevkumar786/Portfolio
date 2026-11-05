import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { detectDefaultPerformanceMode } from '@/lib/utils';
import { isWebGLAvailable } from '@/lib/performance';

export function usePerformanceMode() {
  const { performanceMode, setPerformanceMode, setWebglAvailable } = usePortfolioStore();

  useEffect(() => {
    const hasWebGL = isWebGLAvailable();
    setWebglAvailable(hasWebGL);

    const defaultMode = detectDefaultPerformanceMode();
    // Only set if not already modified or default
    setPerformanceMode(defaultMode);

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPerformanceMode('low');
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [setPerformanceMode, setWebglAvailable]);

  return performanceMode;
}
