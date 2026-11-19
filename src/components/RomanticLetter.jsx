import React, { useEffect, useRef, useState } from 'react';
import CuteCharacters from './CuteCharacters';

export default function RomanticLetter({
  buttonText,
  content,
  signaturePrefix,
  senderName,
  isVisible,
  onOpenLetter,
  onLetterComplete,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const completedRef = useRef(false);

  const handleOpenClick = () => {
    if (isOpen) return;
    setIsOpen(true);
    if (onOpenLetter) onOpenLetter();
  };

  // Gradual handwriting-style typing animation
  useEffect(() => {
    if (!isOpen) return undefined;
    if (charIndex >= content.length) {
      if (!completedRef.current) {
        completedRef.current = true;
        const finishTimer = setTimeout(() => {
          if (onLetterComplete) onLetterComplete();
        }, 700);
        return () => clearTimeout(finishTimer);
      }
      return undefined;
    }

    const currentChar = content[charIndex];
    const delay =
      currentChar === '\n'
        ? 190
        : currentChar === '.' || currentChar === ','
        ? 95
        : 28;

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, charIndex, content, onLetterComplete]);

  const typedText = content.slice(0, charIndex);
  const isFinished = charIndex >= content.length;

  return (
    <section
      className={`letter-section reveal-block ${isVisible ? 'is-visible' : ''}`}
      aria-label="Romantic love letter"
    >
      {!isOpen ? (
        <div className="heart-button-wrapper">
          <button
            type="button"
            className="heart-letter-btn"
            onClick={handleOpenClick}
            aria-label={buttonText}
          >
            <svg
              viewBox="0 0 220 200"
              className="heart-btn-svg"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="heartBtnGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ff5d7d" />
                  <stop offset="55%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
              <path
                d="M110 184 C105 184, 16 126, 16 64 C16 32, 42 12, 70 12 C90 12, 104 24, 110 34 C116 24, 130 12, 150 12 C178 12, 204 32, 204 64 C204 126, 115 184, 110 184 Z"
                fill="url(#heartBtnGradient)"
              />
            </svg>
            <span className="heart-btn-label">{buttonText}</span>
          </button>
          <p className="heart-btn-hint">Tap the heart to read my note</p>
        </div>
      ) : (
        <div className="letter-and-characters">
          <div className="letter-panel" role="region" aria-live="polite">
            <div className="letter-header-ornament" aria-hidden="true">
              <span>✿</span>
              <span className="ornament-line" />
              <span>❤️</span>
              <span className="ornament-line" />
              <span>✿</span>
            </div>

            <div className="letter-body">
              <p className="letter-typed-text">
                {typedText}
                {!isFinished && (
                  <span className="typing-cursor" aria-hidden="true" />
                )}
              </p>

              <div
                className={`letter-signature ${
                  isFinished ? 'is-visible' : ''
                }`}
              >
                <span>{signaturePrefix}</span>
                <strong>{senderName}</strong>
              </div>
            </div>
          </div>

          <CuteCharacters />
        </div>
      )}
    </section>
  );
}
