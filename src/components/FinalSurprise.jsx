import React, { useMemo } from 'react';

export default function FinalSurprise({
  title,
  subtitle,
  replayButtonText,
  isVisible,
  onReplay,
}) {
  const burstHearts = useMemo(() => {
    return Array.from({ length: 14 }, (_, idx) => {
      const angle = (idx / 14) * Math.PI * 2;
      const distance = 74 + (idx % 3) * 26;
      return {
        id: idx,
        tx: `${Math.cos(angle) * distance}px`,
        ty: `${Math.sin(angle) * distance}px`,
        delay: `${(idx % 5) * 0.25}s`,
        size: 12 + (idx % 3) * 4,
      };
    });
  }, []);

  return (
    <section
      className={`final-surprise-section reveal-block ${
        isVisible ? 'is-visible' : ''
      }`}
      aria-label="Final romantic surprise"
    >
      <div className="final-surprise-card">
        <div className="final-heart-stage" aria-hidden="true">
          {burstHearts.map((h) => (
            <span
              key={h.id}
              className="burst-heart"
              style={{
                '--tx': h.tx,
                '--ty': h.ty,
                animationDelay: h.delay,
                fontSize: `${h.size}px`,
              }}
            >
              ❤️
            </span>
          ))}

          <div className="final-center-heart">
            <svg viewBox="0 0 64 64" className="final-heart-svg">
              <defs>
                <linearGradient
                  id="finalHeartGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff6b8b" />
                  <stop offset="100%" stopColor="#e11d48" />
                </linearGradient>
              </defs>
              <path
                d="M32 54C30.4 54 10 40.3 10 23.8C10 15.6 16.4 9.5 23.8 9.5C28.2 9.5 30.8 11.8 32 14.1C33.2 11.8 35.8 9.5 40.2 9.5C47.6 9.5 54 15.6 54 23.8C54 40.3 33.6 54 32 54Z"
                fill="url(#finalHeartGrad)"
              />
            </svg>
          </div>
        </div>

        <h2 className="final-glow-title">{title}</h2>
        <p className="final-subtitle">{subtitle}</p>

        <button type="button" className="replay-btn" onClick={onReplay}>
          <span aria-hidden="true">↺</span>
          <span>{replayButtonText}</span>
        </button>
      </div>
    </section>
  );
}
