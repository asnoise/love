import React, { useEffect, useRef, useState } from 'react';

export default function OpeningScreen({
  title,
  subtitle,
  ctaText,
  onContinue,
}) {
  const [charIndex, setCharIndex] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const hasTriggeredRef = useRef(false);

  // Subtle typing animation for the subtitle
  useEffect(() => {
    if (charIndex >= subtitle.length) return undefined;
    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, 58);
    return () => clearTimeout(timer);
  }, [charIndex, subtitle]);

  const handleProceed = () => {
    if (hasTriggeredRef.current) return;
    hasTriggeredRef.current = true;
    setIsLeaving(true);
    setTimeout(() => {
      onContinue();
    }, 650);
  };

  // Gentle automatic transition shortly after typing finishes
  useEffect(() => {
    if (charIndex < subtitle.length) return undefined;
    const autoTimer = setTimeout(() => {
      handleProceed();
    }, 2800);
    return () => clearTimeout(autoTimer);
  }, [charIndex, subtitle.length]);

  const typedSubtitle = subtitle.slice(0, charIndex);
  const isTypingDone = charIndex >= subtitle.length;

  return (
    <section
      className={`opening-screen ${isLeaving ? 'is-leaving' : ''}`}
      aria-label="Romantic introduction"
    >
      <div className="opening-card">
        <button
          type="button"
          className="opening-heart-badge"
          onClick={handleProceed}
          aria-label="Enter surprise"
        >
          <svg
            viewBox="0 0 64 64"
            className="opening-heart-svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="openingHeartGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff5c7c" />
                <stop offset="100%" stopColor="#e11d48" />
              </linearGradient>
            </defs>
            <path
              d="M32 54C30.4 54 10 40.3 10 23.8C10 15.6 16.4 9.5 23.8 9.5C28.2 9.5 30.8 11.8 32 14.1C33.2 11.8 35.8 9.5 40.2 9.5C47.6 9.5 54 15.6 54 23.8C54 40.3 33.6 54 32 54Z"
              fill="url(#openingHeartGrad)"
            />
          </svg>
        </button>

        <h1 className="opening-title">{title}</h1>

        <p className="opening-subtitle" aria-live="polite">
          <span>{typedSubtitle}</span>
          {!isTypingDone && <span className="typing-cursor" aria-hidden="true" />}
        </p>

        <button
          type="button"
          className={`opening-cta ${isTypingDone ? 'is-visible' : ''}`}
          onClick={handleProceed}
        >
          <span>{ctaText}</span>
          <span aria-hidden="true">❤️</span>
        </button>
      </div>
    </section>
  );
}
