import React, { useMemo } from 'react';

/**
 * Ambient rising translucent hearts across the page background
 */
export default function FloatingParticles({ density = 16 }) {
  const particles = useMemo(() => {
    return Array.from({ length: density }, (_, idx) => {
      const left = ((idx * 37 + 11) % 96) + 2;
      const size = 10 + ((idx * 13) % 14);
      const duration = 10 + ((idx * 7) % 11);
      const delay = -((idx * 2.7) % 14);
      const opacity = 0.22 + ((idx * 5) % 25) / 100;
      const sway = (idx % 2 === 0 ? 1 : -1) * (14 + ((idx * 9) % 22));
      const color =
        idx % 3 === 0
          ? '#ff4d6d'
          : idx % 3 === 1
          ? '#ff8fa3'
          : '#fb7185';

      return { id: idx, left, size, duration, delay, opacity, sway, color };
    });
  }, [density]);

  return (
    <div className="floating-particles" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="floating-particle-heart"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            color: p.color,
            '--sway-x': `${p.sway}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
