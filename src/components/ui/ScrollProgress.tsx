'use client';
import { useEffect, useRef } from 'react';

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      if (!barRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      barRef.current.style.transform = `scaleX(${scrollTop / (scrollHeight - clientHeight)})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'linear-gradient(to right, #4CAF50, #66BB6A)',
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        willChange: 'transform',
        zIndex: 9998,
        pointerEvents: 'none',
      }}
    />
  );
}
