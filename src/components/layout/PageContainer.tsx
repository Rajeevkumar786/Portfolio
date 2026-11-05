import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { Experience } from '@/components/3d/Experience';
import { WebGLErrorBoundary } from '@/components/3d/WebGLErrorBoundary';
import { usePortfolioStore } from '@/store/portfolioStore';
import { usePerformanceMode } from '@/hooks/usePerformanceMode';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const {
    activeSection,
    setActiveSection,
    reducedMotion,
    webglAvailable,
  } = usePortfolioStore();

  usePerformanceMode();
  useReducedMotion();

  // Lenis smooth scroll setup
  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, [reducedMotion]);

  // Section observer to update active section in store
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'achievements', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.25, rootMargin: '-10% 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [setActiveSection]);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-600/30 selection:text-white">
      {/* Top dynamic scroll progress line */}
      <ScrollProgress />

      {/* Custom Context-aware Cursor (Desktop) */}
      <CustomCursor />

      {/* Global Accessible Command Palette (Ctrl+K) */}
      <CommandPalette />

      {/* Fixed Navigation Header */}
      <Navbar />

      {/* Global 3D Experience Canvas Background */}
      {webglAvailable && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <WebGLErrorBoundary>
            <Suspense fallback={null}>
              <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{
                  antialias: true,
                  powerPreference: 'high-performance',
                  alpha: true,
                }}
                dpr={[1, 2]}
                style={{ pointerEvents: 'auto' }}
              >
                <Experience />
              </Canvas>
            </Suspense>
          </WebGLErrorBoundary>
        </div>
      )}

      {/* Ambient CSS Glow layers (underlay) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[5%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute top-[45%] -right-[10%] w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute top-[80%] left-[10%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px]" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
