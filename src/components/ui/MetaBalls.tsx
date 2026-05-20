'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Transform, Vec3, Camera } from 'ogl';

type MetaBallsProps = {
  color?: string;
  speed?: number;
  enableMouseInteraction?: boolean;
  hoverSmoothness?: number;
  animationSize?: number;
  ballCount?: number;
  clumpFactor?: number;
  cursorBallSize?: number;
  cursorBallColor?: string;
  enableTransparency?: boolean;
  spreadX?: boolean;
  className?: string;
};

function parseHexColor(hex: string): [number, number, number] {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16) / 255;
  const g = parseInt(c.substring(2, 4), 16) / 255;
  const b = parseInt(c.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function hash31(p: number): number[] {
  const r = [p * 0.1031, p * 0.103, p * 0.0973].map(fract);
  const dotVal = r[0] * (r[1] + 33.33) + r[1] * (r[2] + 33.33) + r[2] * (r[0] + 33.33);
  return r.map(v => fract(v + dotVal));
}

function hash33(v: number[]): number[] {
  const p = [v[0] * 0.1031, v[1] * 0.103, v[2] * 0.0973].map(fract);
  const dotVal = p[0] * (p[1] + 33.33) + p[1] * (p[0] + 33.33) + p[2] * (p[1] + 33.33);
  const q = p.map(v => fract(v + dotVal));
  return [fract((q[0] + q[1]) * q[2]), fract((q[0] + q[0]) * q[1]), fract((q[1] + q[0]) * q[0])];
}

const vertex = `#version 300 es
precision highp float;
layout(location = 0) in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform vec3 iMouse;
uniform vec3 iColor;
uniform vec3 iCursorColor;
uniform float iAnimationSize;
uniform int iBallCount;
uniform float iCursorBallSize;
uniform vec3 iMetaBalls[50];
uniform float iClumpFactor;
uniform bool enableTransparency;
out vec4 outColor;

float getMetaBallValue(vec2 c, float r, vec2 p) {
    vec2 d = p - c;
    float dist2 = dot(d, d);
    return (r * r) / dist2;
}

void main() {
    vec2 fc = gl_FragCoord.xy;
    float scale = iAnimationSize / iResolution.y;
    vec2 coord = (fc - iResolution.xy * 0.5) * scale;
    vec2 mouseW = (iMouse.xy - iResolution.xy * 0.5) * scale;
    float m1 = 0.0;
    for (int i = 0; i < 50; i++) {
        if (i >= iBallCount) break;
        m1 += getMetaBallValue(iMetaBalls[i].xy, iMetaBalls[i].z, coord);
    }
    float m2 = getMetaBallValue(mouseW, iCursorBallSize, coord);
    float total = m1 + m2;
    float f = smoothstep(-1.0, 1.0, (total - 1.3) / min(1.0, fwidth(total)));
    vec3 cFinal = vec3(0.0);
    if (total > 0.0) {
        float alpha1 = m1 / total;
        float alpha2 = m2 / total;
        cFinal = iColor * alpha1 + iCursorColor * alpha2;
    }
    outColor = vec4(cFinal * f, enableTransparency ? f : 1.0);
}
`;

type BallParams = {
  st: number;
  dtFactor: number;
  baseScale: number;
  toggle: number;
  radius: number;
};

export default function MetaBalls({
  color = '#4CAF50',
  speed = 0.3,
  enableMouseInteraction = true,
  hoverSmoothness = 0.05,
  animationSize = 30,
  ballCount = 12,
  clumpFactor = 1,
  cursorBallSize = 3,
  cursorBallColor = '#81C784',
  enableTransparency = true,
  spreadX = false,
  className = '',
}: MetaBallsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ dpr: 1, alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, enableTransparency ? 0 : 1);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl, { left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 });
    camera.position.z = 1;

    const geometry = new Triangle(gl);
    const [r1, g1, b1] = parseHexColor(color);
    const [r2, g2, b2] = parseHexColor(cursorBallColor);

    const metaBallsUniform: Vec3[] = Array.from({ length: 50 }, () => new Vec3(0, 0, 0));

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(0, 0, 0) },
        iMouse: { value: new Vec3(0, 0, 0) },
        iColor: { value: new Vec3(r1, g1, b1) },
        iCursorColor: { value: new Vec3(r2, g2, b2) },
        iAnimationSize: { value: animationSize },
        iBallCount: { value: ballCount },
        iCursorBallSize: { value: cursorBallSize },
        iMetaBalls: { value: metaBallsUniform },
        iClumpFactor: { value: clumpFactor },
        enableTransparency: { value: enableTransparency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    const scene = new Transform();
    mesh.setParent(scene);

    const effectiveBallCount = Math.min(ballCount, 50);
    const ballParams: BallParams[] = Array.from({ length: effectiveBallCount }, (_, i) => {
      const h1 = hash31(i + 1);
      const h2 = hash33(h1);
      return {
        st: h1[0] * (2 * Math.PI),
        dtFactor: 0.1 * Math.PI + h1[1] * (0.4 * Math.PI - 0.1 * Math.PI),
        baseScale: 5.0 + h1[1] * 5.0,
        toggle: Math.floor(h2[0] * 2.0),
        radius: 0.5 + h2[2] * 1.5,
      };
    });

    const mouseBallPos = { x: 0, y: 0 };
    let pointerInside = false;
    let pointerX = 0;
    let pointerY = 0;

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      gl.canvas.style.width = `${w}px`;
      gl.canvas.style.height = `${h}px`;
      program.uniforms.iResolution.value.set(w, h, 0);
    };
    window.addEventListener('resize', resize);
    resize();

    const onMove = (e: PointerEvent) => {
      if (!enableMouseInteraction) return;
      const rect = container.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * gl.canvas.width;
      pointerY = (1 - (e.clientY - rect.top) / rect.height) * gl.canvas.height;
    };
    const onEnter = () => { pointerInside = true; };
    const onLeave = () => { pointerInside = false; };
    container.addEventListener('pointermove', onMove);
    container.addEventListener('pointerenter', onEnter);
    container.addEventListener('pointerleave', onLeave);

    const startTime = performance.now();
    let raf: number;

    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      const elapsed = (t - startTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      const coordScale = animationSize / gl.canvas.height;
      const halfW = (gl.canvas.width * coordScale) / 2;

      for (let i = 0; i < effectiveBallCount; i++) {
        const p = ballParams[i];
        const dt = elapsed * speed * p.dtFactor;
        const th = p.st + dt;
        const xOffset = spreadX
          ? ((i / (effectiveBallCount - 1)) - 0.5) * halfW * 0.8
          : 0;
        metaBallsUniform[i].set(
          Math.cos(th) * p.baseScale * clumpFactor + xOffset,
          Math.sin(th + dt * p.toggle) * p.baseScale * clumpFactor,
          p.radius
        );
      }

      const cx = gl.canvas.width * 0.5;
      const cy = gl.canvas.height * 0.5;
      const targetX = pointerInside ? pointerX : cx + Math.cos(elapsed * speed) * cx * 0.15;
      const targetY = pointerInside ? pointerY : cy + Math.sin(elapsed * speed) * cy * 0.15;
      mouseBallPos.x += (targetX - mouseBallPos.x) * hoverSmoothness;
      mouseBallPos.y += (targetY - mouseBallPos.y) * hoverSmoothness;
      program.uniforms.iMouse.value.set(mouseBallPos.x, mouseBallPos.y, 0);

      renderer.render({ scene, camera });
    };
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      container.removeEventListener('pointermove', onMove);
      container.removeEventListener('pointerenter', onEnter);
      container.removeEventListener('pointerleave', onLeave);
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, cursorBallColor, speed, enableMouseInteraction, hoverSmoothness, animationSize, ballCount, clumpFactor, cursorBallSize, enableTransparency]);

  return <div ref={containerRef} className={`w-full h-full ${className}`} />;
}
