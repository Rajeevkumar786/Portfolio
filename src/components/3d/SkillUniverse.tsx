import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { usePortfolioStore } from '@/store/portfolioStore';
import { portfolioData, type SkillNode } from '@/data/portfolio';

interface Node3DData {
  skill: SkillNode;
  position: [number, number, number];
  color: string;
  radius: number;
}

export const SkillUniverse: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [activeNode, setActiveNode] = useState<SkillNode | null>(null);
  const { reducedMotion, performanceMode, setCursorHovered } = usePortfolioStore();

  // Combine skills into 3D nodes
  const nodes = useMemo<Node3DData[]>(() => {
    const list: Node3DData[] = [];
    const allSkills = [
      ...portfolioData.skills.languages.map((s) => ({ ...s, color: '#38bdf8' })), // cyan
      ...portfolioData.skills.web.map((s) => ({ ...s, color: '#818cf8' })), // indigo
      ...portfolioData.skills.tools.map((s) => ({ ...s, color: '#34d399' })), // emerald
      ...portfolioData.skills.coursework.map((s) => ({ ...s, color: '#fbbf24' })), // amber
    ];

    const total = allSkills.length;
    // Fibonacci sphere distribution for harmonious spacing
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const sphereRadius = 3.2;
      const x = Math.cos(theta) * radiusAtY * sphereRadius;
      const z = Math.sin(theta) * radiusAtY * sphereRadius;

      list.push({
        skill: allSkills[i],
        position: [x, y * sphereRadius, z],
        color: allSkills[i].color,
        radius: allSkills[i].highlight ? 0.22 : 0.16,
      });
    }

    return list;
  }, []);

  // Compute constellation lines connecting adjacent nodes
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = new THREE.Vector3(...nodes[i].position);
        const p2 = new THREE.Vector3(...nodes[j].position);
        const dist = p1.distanceTo(p2);
        // Connect nearby nodes within distance threshold
        if (dist < 2.6) {
          points.push(p1);
          points.push(p2);
        }
      }
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [nodes]);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    // Slow orbital rotation
    const rotSpeed = performanceMode === 'low' ? 0.08 : 0.15;
    groupRef.current.rotation.y += delta * rotSpeed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;

    // Soft mouse interaction
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      state.pointer.x * 0.4,
      0.05
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Tech Core Hub */}
      <mesh>
        <sphereGeometry args={[0.75, 32, 32]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#2563eb"
          emissiveIntensity={0.8}
          roughness={0.2}
          wireframe
        />
      </mesh>

      {/* Constellation Lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#38bdf8"
          transparent
          opacity={performanceMode === 'low' ? 0.15 : 0.25}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Individual Skill Nodes */}
      {nodes.map((node, idx) => {
        const isHovered = activeNode?.name === node.skill.name;

        return (
          <group key={idx} position={node.position}>
            <mesh
              onPointerOver={(e) => {
                e.stopPropagation();
                setActiveNode(node.skill);
                setCursorHovered(true, 'SKILL');
              }}
              onPointerOut={() => {
                setActiveNode(null);
                setCursorHovered(false);
              }}
              scale={isHovered ? 1.4 : 1}
            >
              <sphereGeometry args={[node.radius, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={isHovered ? 1.6 : 0.7}
                roughness={0.2}
              />
            </mesh>

            {/* Always visible label or hover label */}
            {(isHovered || node.skill.highlight) && (
              <Html
                position={[0, node.radius + 0.25, 0]}
                center
                distanceFactor={10}
                style={{ pointerEvents: 'none' }}
              >
                <div
                  className={`px-2 py-0.8 rounded-md text-[10px] font-mono font-semibold whitespace-nowrap transition-all duration-200 border ${
                    isHovered
                      ? 'bg-slate-900/90 text-white border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-110'
                      : 'bg-slate-950/70 text-slate-300 border-slate-700/60'
                  }`}
                >
                  {node.skill.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* Central Ambient Light for the Skill Universe */}
      <pointLight color="#38bdf8" intensity={3} distance={10} decay={2} />
    </group>
  );
};
