// 'use client';

// import * as React from 'react';
// import * as THREE from 'three';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';

// // Fiber 9 / React 19 safe types
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       group: any;
//       mesh: any;
//       capsuleGeometry: any;
//       meshPhongMaterial: any;
//       sphereGeometry: any;
//       coneGeometry: any;
//       boxGeometry: any;
//       torusGeometry: any;
//       ambientLight: any;
//       directionalLight: any;
//       pointLight: any;
//       gridHelper: any;
//       axesHelper: any;
//     }
//   }
// }

// // Separate Scene to keep hooks isolated
// function Scene({ parasiteId }: { parasiteId: string }) {
//   const model = React.useMemo(() => {
//     switch (parasiteId) {
//       case 'tapeworm':
//         return (
//           <mesh>
//             <boxGeometry args={[1, 1, 1]} />
//             <meshPhongMaterial color="#FF6B35" />
//           </mesh>
//         );
//       case 'hookworm':
//         return (
//           <mesh>
//             <torusGeometry args={[0.5, 0.2, 16, 100]} />
//             <meshPhongMaterial color="#9B59B6" />
//           </mesh>
//         );
//       default:
//         return (
//           <mesh>
//             <capsuleGeometry args={[0.3, 2, 4, 16]} />
//             <meshPhongMaterial color="#0088FF" />
//           </mesh>
//         );
//     }
//   }, [parasiteId]);

//   return (
//     <>
//       <PerspectiveCamera makeDefault position={[0, 0, 5]} />
//       <OrbitControls autoRotate />
//       <ambientLight intensity={0.7} />
//       <directionalLight position={[5, 5, 5]} intensity={1.5} />
//       <React.Suspense fallback={null}>
//         <Environment preset="studio" />
//         {model}
//       </React.Suspense>
//     </>
//   );
// }

// export function ParasiteViewer({ parasiteId }: { parasiteId: string }) {
//   const [mounted, setMounted] = React.useState(false);

//   React.useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return <div className="w-full h-full bg-muted/10 animate-pulse" />;

//   return (
//     <div className="w-full h-full min-h-[400px]">
//       <Canvas
//         shadows
//         flat // Helps with React 19 rendering
//         camera={{ position: [0, 0, 5], fov: 50 }}
//         style={{ background: 'linear-gradient(135deg, #e8f1f7 0%, #f5f9fc 100%)' }}
//       >
//         <Scene parasiteId={parasiteId} />
//       </Canvas>
//     </div>
//   );
// }

'use client';

import * as React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Stars } from '@react-three/drei';

// --- Parasite 1: Roundworm (Ascaris) ---
// Key Features: Long, tapered body with a distinct "head" bulb.
function RoundwormModel() {
  const groupRef = React.useRef<THREE.Group>(null);
  
  return (
    <group ref={groupRef}>
      {/* Tapered Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.3, 2, 4, 16]} />
        <meshStandardMaterial color="#FF6B35" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Head section */}
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#e6d5a7" />
      </mesh>
    </group>
  );
}

// --- Parasite 2: Tapeworm (Taenia) ---
// Key Features: Segmented body (proglottids) and a small head (scolex).
function TapewormModel() {
  return (
    <group>
      {/* Scolex (Head) */}
      <mesh position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial color="#9B59B6" roughness={0.5} />
      </mesh>
      {/* Segmented Body */}
      {[...Array(12)].map((_, i) => (
        <mesh key={i} position={[0, 1.5 - i * 0.3, 0]}>
          <boxGeometry args={[0.4, 0.25, 0.1]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#9B59B6" : "#9B70A1"} 
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// --- Parasite 3: Hookworm ---
// Key Features: "C" shaped body with a hook-like buccal cavity.
function HookwormModel() {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group>
      {/* Main Curved Body using a partial Torus */}
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.5, 0.2, 16, 100]} />
        <meshStandardMaterial color="#0088FF" roughness={0.4} />
      </mesh>
      {/* Hook-shaped Head */}
      <mesh position={[0.8, 0.1, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#c08080" />
      </mesh>
    </group>
  );
}

// --- Scene Logic ---
function Scene({ parasiteId }: { parasiteId: string }) {
  const Model = React.useMemo(() => {
    switch (parasiteId) {
      case 'tapeworm': return <TapewormModel />;
      case 'hookworm': return <HookwormModel />;
      default: return <RoundwormModel />;
    }
  }, [parasiteId]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 6]} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
      
      {/* Lighting for biological depth */}
      <ambientLight intensity={0.4} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="blue" intensity={1} />
      
      <React.Suspense fallback={null}>
        <Environment preset="studio" />``
        {Model}
      </React.Suspense>
      
      {/* Visual aid for scale */}
      <gridHelper args={[10, 10, 0x888888, 0x444444]} position={[0, -2, 0]} />
    </>
  );
}

export function ParasiteViewer({ parasiteId }: { parasiteId: string }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-slate-900 animate-pulse" />;

  return (
    <div className="w-full h-full min-h-[500px] rounded-xl overflow-hidden shadow-inner border border-white/10">
      <Canvas shadows flat gl={{ antialias: true }}>
        <Scene parasiteId={parasiteId} />
      </Canvas>
    </div>
  );
}