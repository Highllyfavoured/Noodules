'use client';

import * as React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

function RoundwormModel() {
  return (
    <group>
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.18, 3.2, 4, 12]} />
        <meshPhongMaterial color="#0088FF" emissive="#003366" shininess={80} />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshPhongMaterial color="#0099FF" emissive="#004488" shininess={100} />
      </mesh>
    </group>
  );
}

function TapewormModel() {
  return (
    <group>
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshPhongMaterial color="#FF6B35" shininess={100} />
      </mesh>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[0, 1.5 - (i + 1) * 0.4, 0]}>
          <boxGeometry args={[0.28, 0.35, 0.15]} />
          <meshPhongMaterial color="#FF8C42" />
        </mesh>
      ))}
    </group>
  );
}

function HookwormModel() {
  const groupRef = React.useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3;
    }
  });
  return (
    <group ref={groupRef}>
      <mesh><torusGeometry args={[0.35, 0.12, 8, 100]} /><meshPhongMaterial color="#9B59B6" /></mesh>
    </group>
  );
}

export default function ParasiteScene({ parasiteId }: { parasiteId: string }) {
  const model = React.useMemo(() => {
    if (parasiteId === 'tapeworm') return <TapewormModel />;
    if (parasiteId === 'hookworm') return <HookwormModel />;
    return <RoundwormModel />;
  }, [parasiteId]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls autoRotate autoRotateSpeed={3} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <React.Suspense fallback={null}>
        <Environment preset="studio" />
        {model}
      </React.Suspense>
    </>
  );
}