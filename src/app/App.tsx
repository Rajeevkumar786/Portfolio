import React, { Suspense, lazy } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import { Hero } from '@/components/sections/Hero';

// Lazy load subsequent sections to maximize initial page render speed and optimize bundle splitting
const About = lazy(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import('@/components/sections/Skills').then((m) => ({ default: m.Skills }))
);
const Experience = lazy(() =>
  import('@/components/sections/Experience').then((m) => ({ default: m.Experience }))
);
const Projects = lazy(() =>
  import('@/components/sections/Projects').then((m) => ({ default: m.Projects }))
);
const Education = lazy(() =>
  import('@/components/sections/Education').then((m) => ({ default: m.Education }))
);
const Achievements = lazy(() =>
  import('@/components/sections/Achievements').then((m) => ({ default: m.Achievements }))
);
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact }))
);

export const App: React.FC = () => {
  return (
    <PageContainer>
      <Hero />
      <Suspense
        fallback={
          <div className="py-20 text-center font-mono text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block mr-2" />
            Loading engineering modules...
          </div>
        }
      >
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </Suspense>
    </PageContainer>
  );
};

export default App;
