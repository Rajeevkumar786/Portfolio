import type { PerformanceMode } from '@/store/portfolioStore';

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function getParticleCount(mode: PerformanceMode): number {
  switch (mode) {
    case 'high':
      return 1400;
    case 'medium':
      return 600;
    case 'low':
      return 200;
    default:
      return 800;
  }
}

export function getFloatingObjectsCount(mode: PerformanceMode): number {
  switch (mode) {
    case 'high':
      return 18;
    case 'medium':
      return 10;
    case 'low':
      return 4;
    default:
      return 12;
  }
}
