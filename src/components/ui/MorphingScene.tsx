"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 500;
const LERP_SPEED = 2.5;

/* ── Shape generators ──────────────────────────────────── */

function generateTorusKnot(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const R = 1.4; // major radius
  const r = 0.5; // tube radius
  const p = 3;   // winds around axis
  const q = 5;   // winds through hole

  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2 * p;
    const phi = (i / count) * Math.PI * 2 * 7.3; // spread around tube

    // Torus knot centerline
    const cx = (R + r * Math.cos(q * t / p)) * Math.cos(t);
    const cy = (R + r * Math.cos(q * t / p)) * Math.sin(t);
    const cz = r * Math.sin(q * t / p);

    // Offset along tube surface
    const tubeR = 0.25;
    const nx = Math.cos(phi) * tubeR;
    const ny = Math.sin(phi) * tubeR;

    // Tangent-based offset (simplified)
    const dt = 0.01;
    const cx2 = (R + r * Math.cos(q * (t + dt) / p)) * Math.cos(t + dt);
    const cy2 = (R + r * Math.cos(q * (t + dt) / p)) * Math.sin(t + dt);
    const cz2 = r * Math.sin(q * (t + dt) / p);
    const tx = cx2 - cx;
    const ty = cy2 - cy;
    const tz = cz2 - cz;
    const tLen = Math.sqrt(tx * tx + ty * ty + tz * tz) || 1;

    // Normal and binormal
    const bnx = ty * tz - tz * ty || 0.1;
    const bny = tz * tx - tx * tz || 0.1;
    const bnz = tx * ty - ty * tx || 0.1;

    positions[i * 3] = cx + nx * (bnx / (Math.abs(bnx) + 0.1));
    positions[i * 3 + 1] = cy + ny * (bny / (Math.abs(bny) + 0.1));
    positions[i * 3 + 2] = cz + nx * 0.3 + ny * 0.3;
  }

  return positions;
}

function generateDNA(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const height = 4;
  const radius = 1.2;
  const turns = 3;
  const helix1Count = Math.floor(count * 0.4);
  const helix2Count = Math.floor(count * 0.4);
  const rungCount = count - helix1Count - helix2Count;

  let idx = 0;

  // Helix strand 1
  for (let i = 0; i < helix1Count; i++) {
    const t = (i / helix1Count) * turns * Math.PI * 2;
    const y = (i / helix1Count - 0.5) * height;
    positions[idx++] = Math.cos(t) * radius;
    positions[idx++] = y;
    positions[idx++] = Math.sin(t) * radius;
  }

  // Helix strand 2 (offset by PI)
  for (let i = 0; i < helix2Count; i++) {
    const t = (i / helix2Count) * turns * Math.PI * 2 + Math.PI;
    const y = (i / helix2Count - 0.5) * height;
    positions[idx++] = Math.cos(t) * radius;
    positions[idx++] = y;
    positions[idx++] = Math.sin(t) * radius;
  }

  // Connecting rungs between helices
  for (let i = 0; i < rungCount; i++) {
    const frac = i / rungCount;
    const t = frac * turns * Math.PI * 2;
    const y = (frac - 0.5) * height;
    const lerpVal = (i % 3) / 2;
    const x1 = Math.cos(t) * radius;
    const z1 = Math.sin(t) * radius;
    const x2 = Math.cos(t + Math.PI) * radius;
    const z2 = Math.sin(t + Math.PI) * radius;
    positions[idx++] = x1 + (x2 - x1) * lerpVal;
    positions[idx++] = y;
    positions[idx++] = z1 + (z2 - z1) * lerpVal;
  }

  return positions;
}

function generateHeart(count: number, scale: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const goldenRatio = (1 + Math.sqrt(5)) / 2;

  for (let i = 0; i < count; i++) {
    // Use golden angle for even distribution around the heart
    const t = (i / count) * Math.PI * 2;
    // Parametric heart in 2D
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    // Give it 3D depth using fibonacci distribution for z
    const phi = (2 * Math.PI * i) / goldenRatio;
    const depthFactor = Math.sin(phi) * 0.15;

    positions[i * 3] = x * scale * (1 + depthFactor);
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = Math.cos(phi) * 0.8;
  }

  return positions;
}

function generateCross(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const verticalCount = Math.floor(count * 0.55);
  const horizontalCount = count - verticalCount;

  const armWidth = 0.35;
  const vertH = 2.2;
  const horizW = 1.5;
  const crossbarY = 0.5; // crossbar positioned in upper portion
  const depth = 0.3;

  let idx = 0;

  // Vertical beam (full height)
  for (let i = 0; i < verticalCount; i++) {
    const frac = i / verticalCount;
    // Distribute on the surface of the vertical beam
    const face = Math.floor(frac * 4) % 4;
    const localFrac = (frac * 4) % 1;

    const y = (localFrac - 0.5) * vertH * 2;
    let x: number, z: number;

    switch (face) {
      case 0:
        x = -armWidth + Math.random() * armWidth * 2;
        z = depth;
        break;
      case 1:
        x = -armWidth + Math.random() * armWidth * 2;
        z = -depth;
        break;
      case 2:
        x = armWidth;
        z = -depth + Math.random() * depth * 2;
        break;
      default:
        x = -armWidth;
        z = -depth + Math.random() * depth * 2;
        break;
    }

    positions[idx++] = x;
    positions[idx++] = y;
    positions[idx++] = z;
  }

  // Horizontal beam
  for (let i = 0; i < horizontalCount; i++) {
    const frac = i / horizontalCount;
    const face = Math.floor(frac * 4) % 4;
    const localFrac = (frac * 4) % 1;

    const x = (localFrac - 0.5) * horizW * 2;
    let y: number, z: number;

    switch (face) {
      case 0:
        y = crossbarY + armWidth;
        z = -depth + Math.random() * depth * 2;
        break;
      case 1:
        y = crossbarY - armWidth;
        z = -depth + Math.random() * depth * 2;
        break;
      case 2:
        y = crossbarY - armWidth + Math.random() * armWidth * 2;
        z = depth;
        break;
      default:
        y = crossbarY - armWidth + Math.random() * armWidth * 2;
        z = -depth;
        break;
    }

    positions[idx++] = x;
    positions[idx++] = y;
    positions[idx++] = z;
  }

  return positions;
}

/* ── All 4 shape targets (pre-computed) ───────────────── */

const SHAPES = [
  generateTorusKnot(PARTICLE_COUNT),
  generateDNA(PARTICLE_COUNT),
  generateHeart(PARTICLE_COUNT, 0.12),
  generateCross(PARTICLE_COUNT),
];

/* ── Particles component ──────────────────────────────── */

function MorphingParticles({
  shapeIndexRef,
}: {
  shapeIndexRef: React.RefObject<number>;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const currentPositions = useRef(new Float32Array(PARTICLE_COUNT * 3));

  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;

    timeRef.current += delta;

    const idx = Math.min(Math.max(shapeIndexRef.current ?? 0, 0), SHAPES.length - 1);
    const target = SHAPES[idx];
    const current = currentPositions.current;
    const speed = Math.min(delta * LERP_SPEED, 1);

    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      current[i] += (target[i] - current[i]) * speed;
    }

    const posAttr = pointsRef.current.geometry.getAttribute("position");
    (posAttr as THREE.BufferAttribute).set(current);
    posAttr.needsUpdate = true;

    // Smooth Y rotation + gentle X oscillation (never flips)
    pointsRef.current.rotation.y += delta * 0.15;
    pointsRef.current.rotation.x = Math.sin(timeRef.current * 0.3) * 0.15;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(PARTICLE_COUNT * 3), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#4CAF50"
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ── Exported scene ───────────────────────────────────── */

export function MorphingScene({
  shapeIndexRef,
}: {
  shapeIndexRef: React.RefObject<number>;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
    >
      <MorphingParticles shapeIndexRef={shapeIndexRef} />
    </Canvas>
  );
}
