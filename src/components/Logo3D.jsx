import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import logoUrl from '../assets/HWP Logo.svg?url';

const MAX_TILT = THREE.MathUtils.degToRad(3);
const INTRO_DURATION = 1.7;

function buildExtrudedLogo(svgData) {
  const artwork = new THREE.Group();

  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path);

    shapes.forEach((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: 18,
        bevelEnabled: true,
        bevelThickness: 2.2,
        bevelSize: 1.7,
        bevelOffset: 0,
        bevelSegments: 4,
        curveSegments: 16,
        steps: 1,
      });

      geometry.computeVertexNormals();

      const fillColor = path.color?.clone?.() ?? new THREE.Color('#ffffff');
      const isRed = fillColor.r > 0.65 && fillColor.g < 0.4;
      const bloomColor = isRed
        ? new THREE.Color().setRGB(2.7, 0.045, 0.065)
        : new THREE.Color().setRGB(1.3, 1.3, 1.25);

      const material = new THREE.MeshPhysicalMaterial({
        color: fillColor,
        emissive: bloomColor,
        emissiveIntensity: isRed ? 0.42 : 0.12,
        metalness: 0.12,
        roughness: 0.29,
        clearcoat: 0.34,
        clearcoatRoughness: 0.45,
        side: THREE.DoubleSide,
        toneMapped: false,
      });

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

  const targetWidth = 4.9;
  const scale = targetWidth / Math.max(size.x, 1);
  normalized.scale.setScalar(scale);

  return normalized;
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose());
    else child.material?.dispose?.();
  });
}

export default function Logo3D() {
  const entranceGroup = useRef(null);
  const tiltGroup = useRef(null);
  const startedAt = useRef(null);
  const svgData = useLoader(SVGLoader, logoUrl);
  const viewport = useThree((state) => state.viewport);
  const logoObject = useMemo(() => buildExtrudedLogo(svgData), [svgData]);
  const responsiveScale = Math.min(1, viewport.width / 5.2, viewport.height / 3.4);
  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useEffect(() => () => disposeObject(logoObject), [logoObject]);

  useFrame((state, delta) => {
    if (!tiltGroup.current || !entranceGroup.current) return;

    const elapsed = state.clock.getElapsedTime();
    if (startedAt.current === null) startedAt.current = elapsed;

    const introProgress = reducedMotion
      ? 1
      : THREE.MathUtils.clamp((elapsed - startedAt.current) / INTRO_DURATION, 0, 1);
    const introEase = THREE.MathUtils.smootherstep(introProgress, 0, 1);

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

    tiltGroup.current.rotation.x = THREE.MathUtils.lerp(
      tiltGroup.current.rotation.x,
      targetX,
      damping,
    );
    tiltGroup.current.rotation.y = THREE.MathUtils.lerp(
      tiltGroup.current.rotation.y,
      targetY,
      damping,
    );
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.05}
      rotationIntensity={0}
      floatIntensity={reducedMotion ? 0 : 0.18}
      floatingRange={[-0.08, 0.08]}
    >
      <group ref={entranceGroup}>
        <group ref={tiltGroup} scale={responsiveScale}>
          <primitive object={logoObject} />
        </group>
      </group>
    </Float>
  );
}
