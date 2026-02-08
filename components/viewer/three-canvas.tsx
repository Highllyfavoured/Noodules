'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';

export default function ThreeCanvas({ children, ...props }: any) {
  return (
    <Canvas {...props}>
      {children}
    </Canvas>
  );
}