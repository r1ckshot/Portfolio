"use client";

import { useEffect, useRef } from "react";

const GRID = 28;
const DOT_R = 1;
const BASE_ALPHA = 0.045;
const WAVE_PEAK = 0.30;
const WAVE_WIDTH = 260;
const WAVE_SPEED = 130; // px per second

// Base dot color (white) → wave peak color (primary green)
const BASE_RGB = [255, 255, 255] as const;
const PEAK_RGB = [76, 175, 80] as const;

export function GridWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const startTime = performance.now();
    let raf: number;

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      const t = (now - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Wave travels top-left → bottom-right
      const maxPos = canvas.width + canvas.height;
      const wavePos = (t * WAVE_SPEED) % (maxPos + WAVE_WIDTH * 2) - WAVE_WIDTH;

      const cols = Math.ceil(canvas.width / GRID) + 1;
      const rows = Math.ceil(canvas.height / GRID) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GRID;
          const y = row * GRID;

          const dotPos = x + y;
          const dist = Math.abs(dotPos - wavePos);
          const waveFactor = Math.max(0, 1 - dist / WAVE_WIDTH);
          const alpha = BASE_ALPHA + waveFactor * WAVE_PEAK;

          const r = Math.round(BASE_RGB[0] + (PEAK_RGB[0] - BASE_RGB[0]) * waveFactor);
          const g = Math.round(BASE_RGB[1] + (PEAK_RGB[1] - BASE_RGB[1]) * waveFactor);
          const b = Math.round(BASE_RGB[2] + (PEAK_RGB[2] - BASE_RGB[2]) * waveFactor);

          ctx.beginPath();
          ctx.arc(x, y, DOT_R + waveFactor * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.fill();
        }
      }
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
