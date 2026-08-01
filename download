import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  ContactShadows,
  Html,
  MeshReflectorMaterial,
  Preload,
  Sparkles,
} from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import Logo3D from './Logo3D.jsx';

const CAMERA_TARGET = new THREE.Vector3();

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

function ReflectionFloor() {
  const size = useThree((state) => state.size);
  const compact = size.width < 760;

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0.25]}>
        <planeGeometry args={[12, 12]} />
        <MeshReflectorMaterial
          blur={compact ? [180, 55] : [420, 115]}
          resolution={compact ? 256 : 512}
          mixBlur={1}
          mixStrength={compact ? 0.34 : 0.48}
          mixContrast={1.08}
          mirror={0.22}
          depthScale={0.24}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.35}
          depthToBlurRatioBias={0.32}
          reflectorOffset={0.02}
          color="#070707"
          roughness={0.84}
          metalness={0.28}
        />
      </mesh>

      <ContactShadows
        position={[0, -1.455, 0]}
        scale={7.2}
        opacity={0.52}
        blur={2.9}
        far={4.5}
        resolution={compact ? 128 : 256}
        color="#000000"
        frames={Infinity}
      />
    </>
  );
}

function SceneRig({ scrollProgressRef }) {
  const logoRigRef = useRef(null);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);
  const compact = size.width < 760;
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useFrame((_, delta) => {
    if (!logoRigRef.current) return;

    const rawProgress = reducedMotion ? 0 : scrollProgressRef?.current ?? 0;
    const progress = THREE.MathUtils.smoothstep(rawProgress, 0.1, 0.86);
    const damping = 1 - Math.exp(-4.2 * delta);

    const targetX = compact
      ? THREE.MathUtils.lerp(0, -0.15, progress)
      : THREE.MathUtils.lerp(0, -0.82, progress);
    const targetY = compact
      ? THREE.MathUtils.lerp(-0.2, 0.5, progress)
      : THREE.MathUtils.lerp(0, 0.78, progress);
    const targetZ = THREE.MathUtils.lerp(0, -0.5, progress);
    const targetScale = compact
      ? THREE.MathUtils.lerp(0.92, 0.66, progress)
      : THREE.MathUtils.lerp(1, 0.72, progress);

    logoRigRef.current.position.x = THREE.MathUtils.lerp(
      logoRigRef.current.position.x,
      targetX,
      damping,
    );
    logoRigRef.current.position.y = THREE.MathUtils.lerp(
      logoRigRef.current.position.y,
      targetY,
      damping,
    );
    logoRigRef.current.position.z = THREE.MathUtils.lerp(
      logoRigRef.current.position.z,
      targetZ,
      damping,
    );
    logoRigRef.current.rotation.y = THREE.MathUtils.lerp(
      logoRigRef.current.rotation.y,
      THREE.MathUtils.lerp(0, -0.26, progress),
      damping,
    );

    const currentScale = logoRigRef.current.scale.x;
    logoRigRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, damping));

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      compact ? 0 : THREE.MathUtils.lerp(0, -0.24, progress),
      damping,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      THREE.MathUtils.lerp(0, 0.24, progress),
      damping,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      THREE.MathUtils.lerp(7.6, 8.25, progress),
      damping,
    );

    CAMERA_TARGET.set(
      compact ? 0 : THREE.MathUtils.lerp(0, -0.35, progress),
      THREE.MathUtils.lerp(0, 0.25, progress),
      0,
    );
    camera.lookAt(CAMERA_TARGET);
  });

  return (
    <group ref={logoRigRef}>
      <Sparkles
        count={compact ? 22 : 42}
        scale={[6.2, 4.2, 2.4]}
        size={1.15}
        speed={reducedMotion ? 0 : 0.16}
        opacity={0.26}
        noise={0.75}
        color="#ffffff"
      />
      <Sparkles
        count={compact ? 8 : 14}
        scale={[5.6, 3.6, 2]}
        size={1.6}
        speed={reducedMotion ? 0 : 0.12}
        opacity={0.3}
        noise={1}
        color="#dc2528"
      />
      <Logo3D />
    </group>
  );
}

function Scene({ scrollProgressRef }) {
  return (
    <>
      <ambientLight color="#ffffff" intensity={0.3} />

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
      <ReflectionFloor />

      <Suspense fallback={<LoadingFallback />}>
        <SceneRig scrollProgressRef={scrollProgressRef} />
        <Preload all />
      </Suspense>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          mipmapBlur
          intensity={0.82}
          luminanceThreshold={1}
          luminanceSmoothing={0.18}
        />
      </EffectComposer>
    </>
  );
}

export default function HeroScene({ scrollProgressRef }) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.6], fov: 35, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#000000', 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.02;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
    >
      <Scene scrollProgressRef={scrollProgressRef} />
    </Canvas>
  );
}
