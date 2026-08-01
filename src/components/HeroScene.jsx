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
const LIGHT_FLOOR = new THREE.Color('#e7e0d7');
const DARK_FLOOR = new THREE.Color('#111012');
const LIGHT_RING = new THREE.Color('#5f5658');
const DARK_RING = new THREE.Color('#f5efe8');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function themeFromProgress(progress) {
  const normalized = clamp((progress - 0.18) / 0.56, 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="canvas-loader" aria-label="Loading 3D logo">
        <span />
      </div>
    </Html>
  );
}

function ThemeLighting({ scrollProgressRef }) {
  const ambientRef = useRef(null);
  const keyRef = useRef(null);
  const redRef = useRef(null);
  const rimRef = useRef(null);

  useFrame((_, delta) => {
    const theme = themeFromProgress(scrollProgressRef?.current ?? 0);
    const damping = 1 - Math.exp(-4.2 * delta);

    if (ambientRef.current) {
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity,
        THREE.MathUtils.lerp(1.08, 0.34, theme),
        damping,
      );
    }

    if (keyRef.current) {
      keyRef.current.intensity = THREE.MathUtils.lerp(
        keyRef.current.intensity,
        THREE.MathUtils.lerp(62, 92, theme),
        damping,
      );
      keyRef.current.position.x = THREE.MathUtils.lerp(4.8, 3.4, theme);
    }

    if (redRef.current) {
      redRef.current.intensity = THREE.MathUtils.lerp(
        redRef.current.intensity,
        THREE.MathUtils.lerp(18, 38, theme),
        damping,
      );
    }

    if (rimRef.current) {
      rimRef.current.intensity = THREE.MathUtils.lerp(
        rimRef.current.intensity,
        THREE.MathUtils.lerp(5, 26, theme),
        damping,
      );
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} color="#fffaf4" intensity={1.08} />
      <spotLight
        ref={keyRef}
        color="#fffaf2"
        position={[4.8, 4.8, 6]}
        intensity={62}
        angle={0.54}
        penumbra={1}
        distance={18}
        decay={2}
      />
      <pointLight
        ref={redRef}
        color="#ec1c24"
        position={[-3.8, 0.6, -2.6]}
        intensity={18}
        distance={10}
        decay={2}
      />
      <pointLight
        ref={rimRef}
        color="#ffffff"
        position={[-3.1, 3.1, -3.7]}
        intensity={5}
        distance={13}
        decay={2}
      />
    </>
  );
}

function AnimatedSweepLight({ scrollProgressRef }) {
  const lightRef = useRef(null);

  useFrame(({ clock }) => {
    if (!lightRef.current) return;

    const time = clock.getElapsedTime();
    const cycle = (time % 7) / 7;
    const sweep = THREE.MathUtils.smoothstep(cycle, 0.08, 0.85);
    const pulse = Math.sin(Math.min(cycle / 0.78, 1) * Math.PI);
    const theme = themeFromProgress(scrollProgressRef?.current ?? 0);

    lightRef.current.position.x = THREE.MathUtils.lerp(-4.8, 4.8, sweep);
    lightRef.current.position.y = 1.1 + Math.sin(time * 0.6) * 0.45;
    lightRef.current.intensity = cycle < 0.82
      ? Math.max(0, pulse) * THREE.MathUtils.lerp(12, 30, theme)
      : 0;
  });

  return (
    <pointLight
      ref={lightRef}
      color="#ff2930"
      position={[-4.8, 1.1, 3.2]}
      intensity={0}
      distance={8}
      decay={2}
    />
  );
}

function ReflectionFloor({ scrollProgressRef }) {
  const materialRef = useRef(null);
  const size = useThree((state) => state.size);
  const compact = size.width < 760;

  useFrame(() => {
    if (!materialRef.current) return;
    const theme = themeFromProgress(scrollProgressRef?.current ?? 0);

    materialRef.current.color.copy(LIGHT_FLOOR).lerp(DARK_FLOOR, theme);
    materialRef.current.mixStrength = THREE.MathUtils.lerp(0.22, compact ? 0.34 : 0.52, theme);
    materialRef.current.mirror = THREE.MathUtils.lerp(0.08, 0.25, theme);
    materialRef.current.roughness = THREE.MathUtils.lerp(0.94, 0.8, theme);
    materialRef.current.metalness = THREE.MathUtils.lerp(0.08, 0.32, theme);
  });

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.48, 0.25]}>
        <planeGeometry args={[12, 12]} />
        <MeshReflectorMaterial
          ref={materialRef}
          blur={compact ? [170, 50] : [420, 110]}
          resolution={compact ? 256 : 512}
          mixBlur={1}
          mixStrength={0.22}
          mixContrast={1.04}
          mirror={0.08}
          depthScale={0.22}
          minDepthThreshold={0.35}
          maxDepthThreshold={1.35}
          depthToBlurRatioBias={0.32}
          reflectorOffset={0.02}
          color="#e7e0d7"
          roughness={0.94}
          metalness={0.08}
        />
      </mesh>

      <ContactShadows
        position={[0, -1.455, 0]}
        scale={7.2}
        opacity={0.34}
        blur={3.1}
        far={4.5}
        resolution={compact ? 128 : 256}
        color="#231f20"
        frames={Infinity}
      />
    </>
  );
}

function ArchitecturalRings({ scrollProgressRef }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useFrame(({ clock }, delta) => {
    const progress = scrollProgressRef?.current ?? 0;
    const theme = themeFromProgress(progress);
    const damping = 1 - Math.exp(-3.8 * delta);

    [outerRef.current, innerRef.current].forEach((mesh, index) => {
      if (!mesh) return;
      mesh.material.color.copy(LIGHT_RING).lerp(DARK_RING, theme);
      mesh.material.opacity = THREE.MathUtils.lerp(
        mesh.material.opacity,
        THREE.MathUtils.lerp(index === 0 ? 0.11 : 0.07, index === 0 ? 0.2 : 0.13, theme),
        damping,
      );
    });

    if (outerRef.current) {
      outerRef.current.rotation.z = clock.getElapsedTime() * 0.035 + progress * 0.8;
      outerRef.current.rotation.x = THREE.MathUtils.lerp(1.02, 1.28, progress);
    }
    if (innerRef.current) {
      innerRef.current.rotation.z = -clock.getElapsedTime() * 0.05 - progress * 0.55;
      innerRef.current.rotation.y = THREE.MathUtils.lerp(0.3, -0.48, progress);
    }
  });

  return (
    <group position={[0, 0.02, -1.25]}>
      <mesh ref={outerRef} rotation={[1.02, 0.08, 0]}>
        <torusGeometry args={[3.05, 0.006, 8, 180]} />
        <meshBasicMaterial color="#5f5658" transparent opacity={0.11} depthWrite={false} />
      </mesh>
      <mesh ref={innerRef} rotation={[0.82, 0.3, 0.25]}>
        <torusGeometry args={[2.42, 0.004, 8, 160]} />
        <meshBasicMaterial color="#5f5658" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
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
    const progress = THREE.MathUtils.smoothstep(rawProgress, 0.06, 0.94);
    const damping = 1 - Math.exp(-4.2 * delta);

    const targetX = compact
      ? THREE.MathUtils.lerp(0, -0.12, progress)
      : THREE.MathUtils.lerp(0, -0.76, progress);
    const targetY = compact
      ? THREE.MathUtils.lerp(-0.18, 0.42, progress)
      : THREE.MathUtils.lerp(0, 0.72, progress);
    const targetZ = THREE.MathUtils.lerp(0, -0.55, progress);
    const targetScale = compact
      ? THREE.MathUtils.lerp(0.9, 0.64, progress)
      : THREE.MathUtils.lerp(1, 0.71, progress);

    logoRigRef.current.position.x = THREE.MathUtils.lerp(logoRigRef.current.position.x, targetX, damping);
    logoRigRef.current.position.y = THREE.MathUtils.lerp(logoRigRef.current.position.y, targetY, damping);
    logoRigRef.current.position.z = THREE.MathUtils.lerp(logoRigRef.current.position.z, targetZ, damping);
    logoRigRef.current.rotation.y = THREE.MathUtils.lerp(
      logoRigRef.current.rotation.y,
      THREE.MathUtils.lerp(0, -0.3, progress),
      damping,
    );
    logoRigRef.current.rotation.z = THREE.MathUtils.lerp(
      logoRigRef.current.rotation.z,
      THREE.MathUtils.lerp(0, 0.035, progress),
      damping,
    );

    const currentScale = logoRigRef.current.scale.x;
    logoRigRef.current.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, damping));

    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      compact ? 0 : THREE.MathUtils.lerp(0, -0.22, progress),
      damping,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      THREE.MathUtils.lerp(0, 0.2, progress),
      damping,
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      THREE.MathUtils.lerp(7.7, 8.3, progress),
      damping,
    );

    CAMERA_TARGET.set(
      compact ? 0 : THREE.MathUtils.lerp(0, -0.34, progress),
      THREE.MathUtils.lerp(0, 0.24, progress),
      0,
    );
    camera.lookAt(CAMERA_TARGET);
  });

  return (
    <group ref={logoRigRef}>
      <Sparkles
        count={compact ? 18 : 34}
        scale={[6.2, 4.2, 2.4]}
        size={1.05}
        speed={reducedMotion ? 0 : 0.13}
        opacity={0.22}
        noise={0.8}
        color="#7f7476"
      />
      <Sparkles
        count={compact ? 8 : 16}
        scale={[5.5, 3.7, 2]}
        size={1.45}
        speed={reducedMotion ? 0 : 0.11}
        opacity={0.34}
        noise={1}
        color="#ec1c24"
      />
      <Logo3D scrollProgressRef={scrollProgressRef} />
    </group>
  );
}

function Scene({ scrollProgressRef }) {
  return (
    <>
      <ThemeLighting scrollProgressRef={scrollProgressRef} />
      <AnimatedSweepLight scrollProgressRef={scrollProgressRef} />
      <ArchitecturalRings scrollProgressRef={scrollProgressRef} />
      <ReflectionFloor scrollProgressRef={scrollProgressRef} />

      <Suspense fallback={<LoadingFallback />}>
        <SceneRig scrollProgressRef={scrollProgressRef} />
        <Preload all />
      </Suspense>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          mipmapBlur
          intensity={0.72}
          luminanceThreshold={1}
          luminanceSmoothing={0.2}
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
      camera={{ position: [0, 0, 7.7], fov: 35, near: 0.1, far: 100 }}
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
