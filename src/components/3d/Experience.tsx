import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';
import { ParticleField } from './ParticleField';
import { FloatingObjects } from './FloatingObjects';
import { HeroScene } from './HeroScene';
import { SkillUniverse } from './SkillUniverse';
import { ProjectScene } from './ProjectScene';

export const Experience: React.FC = () => {
  const { activeSection, performanceMode, reducedMotion } = usePortfolioStore();
  const { camera } = useThree();
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    // Dynamically adjust camera targets according to active section
    switch (activeSection) {
      case 'hero':
        targetCamPos.current.set(0, 0, 7.5);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'about':
        targetCamPos.current.set(-1, 0, 8.5);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'skills':
        targetCamPos.current.set(0, 0, 8);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'experience':
        targetCamPos.current.set(1.5, -0.5, 9);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'projects':
        targetCamPos.current.set(0, 0.5, 7.8);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'education':
      case 'achievements':
        targetCamPos.current.set(-1, -0.2, 8.5);
        targetLookAt.current.set(0, 0, 0);
        break;
      case 'contact':
        targetCamPos.current.set(0, -0.5, 7.2);
        targetLookAt.current.set(0, 0, 0);
        break;
      default:
        targetCamPos.current.set(0, 0, 8);
        targetLookAt.current.set(0, 0, 0);
    }

    if (!reducedMotion) {
      // Parallax mouse camera sway
      const mouseX = state.pointer.x * 0.4;
      const mouseY = state.pointer.y * 0.3;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        targetCamPos.current.x + mouseX,
        0.05
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        targetCamPos.current.y + mouseY,
        0.05
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        targetCamPos.current.z,
        0.05
      );
    } else {
      camera.position.lerp(targetCamPos.current, 0.05);
    }

    camera.lookAt(targetLookAt.current);
  });

  const showPostProcessing = performanceMode === 'high' && !reducedMotion;

  return (
    <>
      {/* Lighting Architecture */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[0, 0, 5]} intensity={1.5} color="#6366f1" />

      {/* Persistent 3D Particle Field & Floating Space Objects */}
      <ParticleField />
      <FloatingObjects />

      {/* Section Focused 3D Elements */}
      {activeSection === 'hero' && <HeroScene />}
      {activeSection === 'skills' && <SkillUniverse />}
      {activeSection === 'projects' && <ProjectScene />}

      {/* Subtle Cinematic Post Processing */}
      {showPostProcessing && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.65}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.8}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.8} />
          <ChromaticAberration
            offset={new THREE.Vector2(0.0006, 0.0006)}
            radialModulation={false}
            modulationOffset={0.15}
          />
        </EffectComposer>
      )}
    </>
  );
};
