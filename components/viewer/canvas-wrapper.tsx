'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

// We wrap the Canvas specifically to isolate the @react-three/fiber context
export default function CanvasWrapper({ children, ...props }: any) {
  return (
    <Canvas {...props}>
      {children}
    </Canvas>
  );
}