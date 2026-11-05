import { useEffect } from 'react';
import { usePortfolioStore } from '@/store/portfolioStore';
import { prefersReducedMotion } from '@/lib/utils';

export function useReducedMotion() {
  const { reducedMotion, setReducedMotion } = usePortfolioStore();

  useEffect(() => {
    const isReduced = prefersReducedMotion();
    setReducedMotion(isReduced);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [setReducedMotion]);

  return reducedMotion;
}
