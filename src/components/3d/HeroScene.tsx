import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';

export const HeroScene: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);

  const { reducedMotion, performanceMode } = usePortfolioStore();

  useFrame((state, delta) => {
    if (!coreRef.current || reducedMotion) return;

    const time = state.clock.elapsedTime;
    const isLow = performanceMode === 'low';

    // Core smooth mouse tracking
    const targetX = state.pointer.x * 0.9;
    const targetY = state.pointer.y * 0.7;

    coreRef.current.rotation.y = THREE.MathUtils.lerp(
      coreRef.current.rotation.y,
      targetX + time * 0.12,
      0.04
    );
    coreRef.current.rotation.x = THREE.MathUtils.lerp(
      coreRef.current.rotation.x,
      -targetY * 0.5 + Math.sin(time * 0.5) * 0.08,
      0.04
    );

    // Floating breathing effect
    coreRef.current.position.y = Math.sin(time * 0.8) * 0.22;

    // Rings independent rotation
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y += delta * 0.2;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.45;
      ring2Ref.current.rotation.z += delta * 0.25;
    }
    if (ring3Ref.current && !isLow) {
      ring3Ref.current.rotation.x -= delta * 0.25;
      ring3Ref.current.rotation.z -= delta * 0.4;
    }

    // Inner core pulse
    if (innerSphereRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.06;
      innerSphereRef.current.scale.set(pulse, pulse, pulse);
    }

    if (outerWireRef.current) {
      outerWireRef.current.rotation.y -= delta * 0.15;
    }
  });

  return (
    <group ref={coreRef} position={[2.2, 0.2, 0]}>
      {/* Central Glowing Core */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#4338ca"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Holographic Wireframe Shell */}
      <mesh ref={outerWireRef}>
        <icosahedronGeometry args={[1.45, 2]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Orbital Ring 1 */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.0, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.35, 0.02, 16, 64]} />
        <meshStandardMaterial
          color="#818cf8"
          emissive="#6366f1"
          emissiveIntensity={1.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Orbital Ring 3 (High / Medium mode) */}
      {performanceMode !== 'low' && (
        <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.7, 0.018, 16, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* Floating Orbital Node Satellites */}
      <group rotation={[0.5, 0.8, 0]}>
        <mesh position={[2.0, 0, 0]}>
          <octahedronGeometry args={[0.12, 0]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[-2.35, 0.5, 0]}>
          <octahedronGeometry args={[0.1, 0]} />
          <meshBasicMaterial color="#a855f7" />
        </mesh>
        <mesh position={[0, -2.7, 0.4]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshBasicMaterial color="#34d399" />
        </mesh>
      </group>

      {/* Point light localized in the core for cast reflections */}
      <pointLight color="#60a5fa" intensity={4} distance={8} decay={2} />
    </group>
  );
};
