import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import logoUrl from '../assets/HWP-RB.svg?url';

const MAX_TILT = THREE.MathUtils.degToRad(3);
const INTRO_DURATION = 1.7;
const CHARCOAL_LIGHT = new THREE.Color('#231f20');
const CHARCOAL_DARK = new THREE.Color('#4d4547');
const CHARCOAL_EMISSIVE = new THREE.Color('#b7ada7');
const BLACK = new THREE.Color('#000000');

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function themeFromProgress(progress) {
  const normalized = clamp((progress - 0.18) / 0.56, 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
}

function buildExtrudedLogo(svgData) {
  const artwork = new THREE.Group();
  const redMaterials = [];
  const charcoalMaterials = [];

  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 16,
        bevelEnabled: true,
        bevelThickness: 2,
        bevelSize: 1.55,
        bevelOffset: 0,
        bevelSegments: 4,
        curveSegments: 18,
        steps: 1,
      });

      geometry.computeVertexNormals();

      const fillColor = path.color?.clone?.() ?? new THREE.Color('#231f20');
      const isRed = fillColor.r > 0.65 && fillColor.g < 0.35;
      const material = new THREE.MeshPhysicalMaterial({
        color: fillColor,
        emissive: isRed ? new THREE.Color().setRGB(2.8, 0.025, 0.04) : BLACK,
        emissiveIntensity: isRed ? 0.2 : 0,
        metalness: isRed ? 0.18 : 0.38,
        roughness: isRed ? 0.28 : 0.34,
        clearcoat: isRed ? 0.42 : 0.5,
        clearcoatRoughness: 0.4,
        side: THREE.DoubleSide,
        toneMapped: !isRed,
      });

      if (isRed) redMaterials.push(material);
      else charcoalMaterials.push(material);

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = false;
      artwork.add(mesh);
    });
  });

  artwork.scale.y = -1;
  artwork.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(artwork);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());

  artwork.position.set(-center.x, -center.y, -center.z);

  const normalized = new THREE.Group();
  normalized.add(artwork);

  const targetWidth = 4.75;
  const scale = targetWidth / Math.max(size.x, 1);
  normalized.scale.setScalar(scale);

  return { object: normalized, redMaterials, charcoalMaterials };
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
    else child.material?.dispose?.();
  });
}

export default function Logo3D({ scrollProgressRef }) {
  const entranceGroup = useRef(null);
  const tiltGroup = useRef(null);
  const startedAt = useRef(null);
  const svgData = useLoader(SVGLoader, logoUrl);
  const viewport = useThree((state) => state.viewport);
  const logo = useMemo(() => buildExtrudedLogo(svgData), [svgData]);
  const responsiveScale = Math.min(1, viewport.width / 5.15, viewport.height / 3.55);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => () => disposeObject(logo.object), [logo]);

  useFrame((state, delta) => {
    if (!tiltGroup.current || !entranceGroup.current) return;

    const elapsed = state.clock.getElapsedTime();
    if (startedAt.current === null) startedAt.current = elapsed;

    const introProgress = reducedMotion
      ? 1
      : THREE.MathUtils.clamp((elapsed - startedAt.current) / INTRO_DURATION, 0, 1);
    const introEase = THREE.MathUtils.smootherstep(introProgress, 0, 1);
    const theme = themeFromProgress(scrollProgressRef?.current ?? 0);

    entranceGroup.current.scale.setScalar(THREE.MathUtils.lerp(0.68, 1, introEase));
    entranceGroup.current.position.z = THREE.MathUtils.lerp(1.9, 0, introEase);
    entranceGroup.current.rotation.z = THREE.MathUtils.lerp(
      THREE.MathUtils.degToRad(-5),
      0,
      introEase,
    );

    const targetX = reducedMotion ? 0 : -state.pointer.y * MAX_TILT;
    const targetY = reducedMotion ? 0 : state.pointer.x * MAX_TILT;
    const damping = 1 - Math.exp(-4.5 * delta);

    tiltGroup.current.rotation.x = THREE.MathUtils.lerp(tiltGroup.current.rotation.x, targetX, damping);
    tiltGroup.current.rotation.y = THREE.MathUtils.lerp(tiltGroup.current.rotation.y, targetY, damping);

    logo.redMaterials.forEach((material) => {
      material.emissiveIntensity = THREE.MathUtils.lerp(0.16, 0.42, theme);
      material.metalness = THREE.MathUtils.lerp(0.16, 0.24, theme);
    });

    logo.charcoalMaterials.forEach((material) => {
      material.color.copy(CHARCOAL_LIGHT).lerp(CHARCOAL_DARK, theme);
      material.emissive.copy(BLACK).lerp(CHARCOAL_EMISSIVE, theme);
      material.emissiveIntensity = THREE.MathUtils.lerp(0, 0.12, theme);
      material.metalness = THREE.MathUtils.lerp(0.38, 0.58, theme);
      material.roughness = THREE.MathUtils.lerp(0.34, 0.25, theme);
    });
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.02}
      rotationIntensity={0}
      floatIntensity={reducedMotion ? 0 : 0.16}
      floatingRange={[-0.075, 0.075]}
    >
      <group ref={entranceGroup}>
        <group ref={tiltGroup} scale={responsiveScale}>
          <primitive object={logo.object} />
        </group>
      </group>
    </Float>
  );
}
