import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Preload, Sparkles } from '@react-three/drei';
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

function AnimatedSweepLight() {
  const lightRef = useRef(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;

    const time = clock.getElapsedTime();
    const cycle = (time % 7) / 7;
    const sweep = THREE.MathUtils.smoothstep(cycle, 0.08, 0.85);
    const pulse = Math.sin(Math.min(cycle / 0.78, 1) * Math.PI);

    lightRef.current.position.x = THREE.MathUtils.lerp(-4.8, 4.8, sweep);
    lightRef.current.position.y = 1.1 + Math.sin(time * 0.6) * 0.45;
    lightRef.current.intensity = cycle < 0.82 ? Math.max(0, pulse) * 26 : 0;
  });

  return (
    <pointLight
      ref={lightRef}
      color="#ff2f35"
      position={[-4.8, 1.1, 3.2]}
      intensity={0}
      distance={8}
      decay={2}
    />
  );
}

function Scene() {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.32} />

      <spotLight
        color="#ffffff"
        position={[3.8, 4.5, 6]}
        intensity={85}
        angle={0.55}
        penumbra={1}
        distance={18}
        decay={2}
      />

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

      <AnimatedSweepLight />

      <Sparkles
        count={42}
        scale={[6.2, 4.2, 2.4]}
        size={1.15}
        speed={0.16}
        opacity={0.28}
        noise={0.75}
        color="#ffffff"
      />
      <Sparkles
        count={14}
        scale={[5.6, 3.6, 2]}
        size={1.6}
        speed={0.12}
        opacity={0.3}
        noise={1}
        color="#dc2528"
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
