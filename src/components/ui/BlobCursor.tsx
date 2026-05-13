'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import gsap from 'gsap';

interface BlobCursorProps {
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  opacities?: number[];
  filterStdDeviation?: number;
}

const INTERACTIVE = 'a, button, input, textarea, select, label, [role="button"], [tabindex]';

export function BlobCursor({
  fillColor = '#4CAF50',
  trailCount = 3,
  sizes = [28, 52, 36],
  opacities = [0.75, 0.5, 0.6],
  filterStdDeviation = 18,
}: BlobCursorProps) {
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setActive(true);
    }
  }, []);

  useEffect(() => {
    if (!active) return;
    blobsRef.current.forEach(el => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50 });
    });
  }, [active]);

  const handleMove = useCallback((e: MouseEvent) => {
    blobsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        x: e.clientX,
        y: e.clientY,
        duration: i === 0 ? 0.08 : 0.3 + i * 0.12,
        ease: i === 0 ? 'power3.out' : 'power1.out',
      });
    });
  }, []);

  const handleOver = useCallback((e: MouseEvent) => {
    const target = e.target as Element;
    const isInteractive = !!target.closest(INTERACTIVE);
    blobsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scale: isInteractive ? 0.15 : 1,
        opacity: isInteractive ? 0.08 : opacities[i],
        duration: 0.6,
        ease: 'power3.inOut',
      });
    });
  }, [opacities]);

  useEffect(() => {
    if (!active) return;
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseover', handleOver);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseover', handleOver);
    };
  }, [active, handleMove, handleOver]);

  if (!active) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="blob-cursor-filter">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -10" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: 'url(#blob-cursor-filter)', position: 'absolute', inset: 0 }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => { blobsRef.current[i] = el; }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: sizes[i],
              height: sizes[i],
              borderRadius: '50%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </div>
  );
}
