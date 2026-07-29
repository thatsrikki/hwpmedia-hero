import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, Preload } from '@react-three/drei';
import * as THREE from 'three';
import Logo3D from './Logo3D.jsx';

function LoadingFallback() {
  return (
    <Html center>
      <div className="canvas-loader" aria-label="Loading 3D logo">
        <span />
      </div>
    </Html>
  );
}

function Scene() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.35} />

      {/* Soft white key light */}
      <spotLight
        color="#ffffff"
        position={[3.8, 4.5, 6]}
        intensity={85}
        angle={0.55}
        penumbra={1}
        distance={18}
        decay={2}
      />

      {/* Subtle red rim light behind the logo */}
      <pointLight
        color="#dc2528"
        position={[-3.8, 0.6, -2.6]}
        intensity={32}
        distance={10}
        decay={2}
      />

      <pointLight
        color="#ffffff"
        position={[-2.5, -3.2, 3.5]}
        intensity={9}
        distance={12}
        decay={2}
      />

      <Suspense fallback={<LoadingFallback />}>
        <Logo3D />
        <Preload all />
      </Suspense>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.6], fov: 35, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Scene />
    </Canvas>
  );
}
