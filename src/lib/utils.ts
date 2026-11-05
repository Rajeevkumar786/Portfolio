import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function detectDefaultPerformanceMode(): 'high' | 'medium' | 'low' {
  if (typeof window === 'undefined') return 'high';

  const isMobile = window.innerWidth < 768;
  const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  if (isMobile || hardwareConcurrency <= 2) {
    return 'low';
  }
  if (isTablet || hardwareConcurrency <= 4) {
    return 'medium';
  }
  return 'high';
}
