interface FloatingParticlesProps {
  count?: number;
  includeEdges?: boolean;
}

export function FloatingParticles({
  count = 20,
  includeEdges = false,
}: FloatingParticlesProps) {
  // Sizes for variation: 2px, 3px, 4px
  const sizes = [2, 3, 4];
  // Opacity values for variation: 0.3, 0.4, 0.5
  const opacities = [0.3, 0.4, 0.5];

  const particles = Array.from({ length: count }).map((_, i) => ({
    left: `${10 + (i * 37) % 80}%`,
    top: `${5 + (i * 53) % 85}%`,
    animationDelay: `${i * 0.7}s`,
    animationDuration: `${4 + (i % 4) * 2}s`,
    size: sizes[i % sizes.length],
    opacity: opacities[i % opacities.length],
  }));

  // Extra particles for edges if requested
  const edgeParticles = includeEdges
    ? [
        // Left edge
        { left: "2%", top: "15%", animationDelay: "0s", animationDuration: "5s", size: 3, opacity: 0.4 },
        { left: "3%", top: "45%", animationDelay: "1.2s", animationDuration: "7s", size: 2, opacity: 0.3 },
        { left: "1%", top: "75%", animationDelay: "2.1s", animationDuration: "6s", size: 4, opacity: 0.5 },
        // Right edge
        { left: "97%", top: "20%", animationDelay: "0.8s", animationDuration: "6s", size: 3, opacity: 0.4 },
        { left: "98%", top: "55%", animationDelay: "1.8s", animationDuration: "8s", size: 4, opacity: 0.5 },
        { left: "96%", top: "80%", animationDelay: "2.5s", animationDuration: "5s", size: 2, opacity: 0.3 },
      ]
    : [];

  return (
    <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
      {[...particles, ...edgeParticles].map((particle, i) => (
        <div
          key={i}
          className="floating-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
}
