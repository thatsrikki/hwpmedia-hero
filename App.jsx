import { useMemo, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import logoUrl from '../assets/HWP Logo.svg?url';

const MAX_TILT = THREE.MathUtils.degToRad(3);

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
      const material = new THREE.MeshPhysicalMaterial({
        color: fillColor,
        metalness: 0.08,
        roughness: 0.36,
        clearcoat: 0.22,
        clearcoatRoughness: 0.62,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      artwork.add(mesh);
    });
  });

  // SVG coordinates run downward, so flip the artwork into a normal 3D coordinate system.
  artwork.scale.y = -1;
  artwork.updateMatrixWorld(true);

  const bounds = new THREE.Box3().setFromObject(artwork);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());

  artwork.position.set(-center.x, -center.y, -center.z);

  const normalized = new THREE.Group();
  normalized.add(artwork);

  // Normalize the original 2048px SVG into scene units.
  const targetWidth = 4.9;
  const scale = targetWidth / Math.max(size.x, 1);
  normalized.scale.setScalar(scale);

  return normalized;
}

export default function Logo3D() {
  const tiltGroup = useRef();
  const svgData = useLoader(SVGLoader, logoUrl);
  const viewport = useThree((state) => state.viewport);
  const logoObject = useMemo(() => buildExtrudedLogo(svgData), [svgData]);
  const responsiveScale = Math.min(1, viewport.width / 5.2, viewport.height / 3.4);

  useFrame((state, delta) => {
    if (!tiltGroup.current) return;

    const targetX = -state.pointer.y * MAX_TILT;
    const targetY = state.pointer.x * MAX_TILT;
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
    <Float speed={1.05} rotationIntensity={0} floatIntensity={0.18} floatingRange={[-0.08, 0.08]}>
      <group ref={tiltGroup} scale={responsiveScale}>
        <primitive object={logoObject} />
      </group>
    </Float>
  );
}
