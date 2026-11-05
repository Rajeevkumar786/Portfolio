import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';

export const ProjectScene: React.FC = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { reducedMotion, performanceMode } = usePortfolioStore();

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    const time = state.clock.elapsedTime;

    // Gentle tilt with pointer
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      state.pointer.x * 0.35 + time * 0.05,
      0.03
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -state.pointer.y * 0.2,
      0.03
    );
  });

  return (
    <group ref={meshRef} position={[0, -0.5, -2]}>
      {/* 3D Holographic Platform Grid */}
      <gridHelper
        args={[16, 24, '#38bdf8', '#1e293b']}
        position={[0, -2, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Floating Accent Octahedron Pillar */}
      <mesh position={[-3.5, 0.5, 0]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#2563eb"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      <mesh position={[3.5, 0.2, -1]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>

      {/* Soft spotlight highlighting the project center */}
      <spotLight
        position={[0, 8, 4]}
        angle={0.6}
        penumbra={0.8}
        intensity={performanceMode === 'low' ? 1.5 : 3}
        color="#60a5fa"
      />
    </group>
  );
};
