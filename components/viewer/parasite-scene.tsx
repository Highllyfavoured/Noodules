'use client';

import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

/**
 * Parasite 1: Roundworm (Ascaris lumbricoides)
 * Features: Tapered cylindrical body, smooth cuticle, and distinct head bulb.
 */
function RoundwormModel() {
  return (
    <group>
      {/* Main Body - Tapered Capsule */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.2, 3.2, 8, 24]} />
        <meshStandardMaterial 
          color="#f3e5ab" 
          roughness={0.3} 
          metalness={0.05} 
          emissive="#221100"
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Anterior end (Head) */}
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#e6d5a7" roughness={0.2} />
      </mesh>
    </group>
  );
}

/**
 * Parasite 2: Tapeworm (Taenia)
 * Features: Scolex (head) with suckers and segmented proglottids that flatten.
 */
function TapewormModel() {
  return (
    <group>
      {/* Scolex with Suckers */}
      <group position={[0, 1.8, 0]}>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#fff5e6" roughness={0.4} />
        </mesh>
        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
          <mesh key={i} position={[Math.cos(angle) * 0.1, 0, Math.sin(angle) * 0.1]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial color="#d1c4b2" />
          </mesh>
        ))}
      </group>

      {/* Segmented Body (Proglottids) */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[0, 1.5 - i * 0.32, 0]}>
          <boxGeometry args={[0.45, 0.28, 0.08]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#ffffff" : "#fcf3e8"} 
            roughness={0.6}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Parasite 3: Hookworm (Ancylostoma)
 * Features: Characteristic "C" curve and an open buccal cavity (mouth) with "teeth".
 */
function HookwormModel() {
  const groupRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle biological wriggling motion
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Curved body using a torus arc */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0.4, 0, 0]}>
        <torusGeometry args={[1, 0.15, 12, 48, Math.PI * 1.1]} />
        <meshStandardMaterial color="#d4a5a5" roughness={0.4} />
      </mesh>
      
      {/* Buccal Cavity (Hook Mouth) */}
      <group position={[0.4, 1.0, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color="#c08080" />
        </mesh>
        {/* Mouth Opening */}
        <mesh position={[0.1, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.08, 0.03, 8, 16]} />
          <meshStandardMaterial color="#8e4444" />
        </mesh>
      </group>
    </group>
  );
}

// --- Main Scene Component ---
export default function ParasiteScene({ parasiteId }: { parasiteId: string }) {
  const model = React.useMemo(() => {
    if (parasiteId === 'tapeworm') return <TapewormModel />;
    if (parasiteId === 'hookworm') return <HookwormModel />;
    return <RoundwormModel />;
  }, [parasiteId]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls 
        autoRotate 
        autoRotateSpeed={1.5} 
        enableDamping 
        dampingFactor={0.05} 
      />
      
      {/* Organic Lighting Setup */}
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#444444" />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, -5, -5]} color="#0088ff" intensity={0.8} />

      <React.Suspense fallback={null}>
        {/* Using "studio" for a clean, professional medical look */}
        <Environment preset="studio" />
        {model}
      </React.Suspense>
      
      {/* Background scale grid */}
      <gridHelper args={[10, 10, "#888888", "#333333"]} position={[0, -2, 0]} />
    </>
  );
}