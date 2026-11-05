import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';
import { getFloatingObjectsCount } from '@/lib/performance';

interface ObjectData {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  rotSpeed: [number, number, number];
  type: 'octahedron' | 'icosahedron' | 'torus' | 'tetrahedron';
}

export const FloatingObjects: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { performanceMode, reducedMotion } = usePortfolioStore();

  const count = useMemo(() => getFloatingObjectsCount(performanceMode), [performanceMode]);

  const objects = useMemo<ObjectData[]>(() => {
    const list: ObjectData[] = [];
    const types: ObjectData['type'][] = ['octahedron', 'icosahedron', 'torus', 'tetrahedron'];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 9 + Math.random() * 8;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 22;
      const z = Math.sin(angle) * radius - 4;

      list.push({
        position: [x, y, z],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: 0.35 + Math.random() * 0.45,
        speed: 0.4 + Math.random() * 0.8,
        rotSpeed: [
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.6,
          (Math.random() - 0.5) * 0.4,
        ],
        type: types[i % types.length],
      });
    }
    return list;
  }, [count]);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    groupRef.current.children.forEach((child, i) => {
      const data = objects[i];
      if (!data) return;

      // Gentle floating sine motion
      child.position.y =
        data.position[1] + Math.sin(state.clock.elapsedTime * data.speed + i) * 0.45;

      // Rotation
      child.rotation.x += delta * data.rotSpeed[0];
      child.rotation.y += delta * data.rotSpeed[1];
      child.rotation.z += delta * data.rotSpeed[2];
    });
  });

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        emissive: '#0284c7',
        emissiveIntensity: 0.35,
        wireframe: true,
        transparent: true,
        opacity: 0.35,
        roughness: 0.3,
        metalness: 0.8,
      }),
    []
  );

  return (
    <group ref={groupRef}>
      {objects.map((obj, i) => (
        <mesh
          key={i}
          position={obj.position}
          rotation={obj.rotation}
          scale={obj.scale}
          material={material}
        >
          {obj.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {obj.type === 'icosahedron' && <icosahedronGeometry args={[0.9, 0]} />}
          {obj.type === 'torus' && <torusGeometry args={[0.8, 0.25, 8, 24]} />}
          {obj.type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
        </mesh>
      ))}
    </group>
  );
};
