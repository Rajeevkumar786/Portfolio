import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';
import { getParticleCount } from '@/lib/performance';

export const ParticleField: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { performanceMode, reducedMotion } = usePortfolioStore();

  const count = useMemo(() => getParticleCount(performanceMode), [performanceMode]);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const color1 = new THREE.Color('#38bdf8'); // Cyan
    const color2 = new THREE.Color('#6366f1'); // Indigo
    const color3 = new THREE.Color('#3b82f6'); // Blue

    for (let i = 0; i < count; i++) {
      // Cylindrical / spherical spread across scene
      const radius = 12 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 35;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * radius - 5;

      // Color interpolation
      const choice = Math.random();
      const chosenColor = choice < 0.4 ? color1 : choice < 0.75 ? color2 : color3;

      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    // Gentle rotation
    const speed = performanceMode === 'low' ? 0.015 : 0.035;
    pointsRef.current.rotation.y += delta * speed;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;

    // React to pointer
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      state.pointer.x * 0.8,
      0.03
    );
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      state.pointer.y * 0.8,
      0.03
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={performanceMode === 'low' ? 0.07 : 0.09}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
