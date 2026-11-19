import React from 'react';

/**
 * Three original pastel SVG romantic character cards with distinct poses & animations
 */
export default function CuteCharacters() {
  return (
    <div className="characters-column" aria-label="Cute romantic illustrations">
      {/* Card 1: Snuggling Pastel Bunnies */}
      <article className="character-card card-float-1">
        <span className="mini-heart-decor decor-1" aria-hidden="true">❤️</span>
        <svg viewBox="0 0 180 120" className="character-svg" aria-hidden="true">
          {/* Soft blush backdrop */}
          <ellipse cx="90" cy="102" rx="64" ry="10" fill="#ffe0ea" />
          {/* Floating heart above bunnies */}
          <path
            d="M90 34 C88 30, 81 27, 81 22 C81 18.5, 84 16, 87 16 C88.8 16, 89.6 17, 90 18.2 C90.4 17, 91.2 16, 93 16 C96 16, 99 18.5, 99 22 C99 27, 92 30, 90 34 Z"
            fill="#ff4d6d"
          />
          {/* Left Bunny (Cream White) */}
          <g className="bunny-left">
            <ellipse cx="56" cy="40" rx="7" ry="18" transform="rotate(-10 56 40)" fill="#fff8fa" stroke="#f5c2d1" strokeWidth="2" />
            <ellipse cx="72" cy="40" rx="7" ry="18" transform="rotate(8 72 40)" fill="#fff8fa" stroke="#f5c2d1" strokeWidth="2" />
            <ellipse cx="56" cy="41" rx="3.5" ry="11" transform="rotate(-10 56 41)" fill="#ffc2d4" />
            <ellipse cx="72" cy="41" rx="3.5" ry="11" transform="rotate(8 72 41)" fill="#ffc2d4" />
            <ellipse cx="66" cy="82" rx="22" ry="20" fill="#fff8fa" stroke="#f5c2d1" strokeWidth="2" />
            <circle cx="65" cy="64" r="19" fill="#fff8fa" stroke="#f5c2d1" strokeWidth="2" />
            <circle cx="58" cy="63" r="2.2" fill="#4a2535" />
            <circle cx="71" cy="63" r="2.2" fill="#4a2535" />
            <ellipse cx="54" cy="68" rx="4" ry="2.2" fill="#ff9ebb" opacity="0.7" />
            <ellipse cx="74" cy="68" rx="4" ry="2.2" fill="#ff9ebb" opacity="0.7" />
            <path d="M62 67 Q64.5 70 67 67" fill="none" stroke="#4a2535" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          {/* Right Bunny (Soft Blush Pink) */}
          <g className="bunny-right">
            <ellipse cx="107" cy="41" rx="7" ry="18" transform="rotate(-8 107 41)" fill="#ffe6ee" stroke="#f2adc2" strokeWidth="2" />
            <ellipse cx="123" cy="41" rx="7" ry="18" transform="rotate(12 123 41)" fill="#ffe6ee" stroke="#f2adc2" strokeWidth="2" />
            <ellipse cx="107" cy="42" rx="3.5" ry="11" transform="rotate(-8 107 42)" fill="#ffb3c6" />
            <ellipse cx="123" cy="42" rx="3.5" ry="11" transform="rotate(12 123 42)" fill="#ffb3c6" />
            <ellipse cx="113" cy="82" rx="22" ry="20" fill="#ffe6ee" stroke="#f2adc2" strokeWidth="2" />
            <circle cx="114" cy="64" r="19" fill="#ffe6ee" stroke="#f2adc2" strokeWidth="2" />
            <circle cx="108" cy="63" r="2.2" fill="#4a2535" />
            <circle cx="121" cy="63" r="2.2" fill="#4a2535" />
            <ellipse cx="104" cy="68" rx="4" ry="2.2" fill="#ff758f" opacity="0.65" />
            <ellipse cx="124" cy="68" rx="4" ry="2.2" fill="#ff758f" opacity="0.65" />
            <path d="M111 67 Q113.5 70 116 67" fill="none" stroke="#4a2535" strokeWidth="1.6" strokeLinecap="round" />
          </g>
        </svg>
        <p className="character-caption">Always by your side</p>
      </article>

      {/* Card 2: Cute Bear Holding a Love Letter */}
      <article className="character-card card-float-2">
        <span className="mini-heart-decor decor-2" aria-hidden="true">💕</span>
        <svg viewBox="0 0 180 120" className="character-svg" aria-hidden="true">
          <ellipse cx="90" cy="104" rx="54" ry="9" fill="#ffe6d9" />
          {/* Bear Ears */}
          <circle cx="64" cy="34" r="11" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
          <circle cx="116" cy="34" r="11" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
          <circle cx="64" cy="34" r="5.5" fill="#ffb8c8" />
          <circle cx="116" cy="34" r="5.5" fill="#ffb8c8" />
          {/* Bear Body */}
          <ellipse cx="90" cy="84" rx="27" ry="22" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
          {/* Bear Head */}
          <ellipse cx="90" cy="52" rx="28" ry="24" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
          {/* Snout */}
          <ellipse cx="90" cy="57" rx="11" ry="8.5" fill="#fff4eb" />
          <ellipse cx="90" cy="54" rx="4" ry="2.8" fill="#6d4337" />
          <path d="M87 58 Q90 61 93 58" fill="none" stroke="#6d4337" strokeWidth="1.6" strokeLinecap="round" />
          {/* Eyes & Blush */}
          <circle cx="77" cy="49" r="2.5" fill="#4a2535" />
          <circle cx="103" cy="49" r="2.5" fill="#4a2535" />
          <ellipse cx="70" cy="54" rx="4.5" ry="2.5" fill="#ff9ebb" opacity="0.75" />
          <ellipse cx="110" cy="54" rx="4.5" ry="2.5" fill="#ff9ebb" opacity="0.75" />
          {/* Love Envelope held in paws */}
          <g transform="translate(68, 70)">
            <rect x="0" y="0" width="44" height="28" rx="6" fill="#ffffff" stroke="#ff9ebb" strokeWidth="2" />
            <path d="M2 3 L22 17 L42 3" fill="none" stroke="#ff9ebb" strokeWidth="2" strokeLinecap="round" />
            <path
              d="M22 22 C20.5 19.5, 16 17.5, 16 14 C16 11.8, 17.8 10, 19.8 10 C21 10, 21.7 10.8, 22 11.6 C22.3 10.8, 23 10, 24.2 10 C26.2 10, 28 11.8, 28 14 C28 17.5, 23.5 19.5, 22 22 Z"
              fill="#e11d48"
            />
          </g>
          {/* Bear Paws */}
          <circle cx="67" cy="82" r="7" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
          <circle cx="113" cy="82" r="7" fill="#f5d0b5" stroke="#dfb091" strokeWidth="2" />
        </svg>
        <p className="character-caption">A note full of love</p>
      </article>

      {/* Card 3: Two Sweet Kittens Making a Heart */}
      <article className="character-card card-float-3">
        <span className="mini-heart-decor decor-3" aria-hidden="true">💖</span>
        <svg viewBox="0 0 180 120" className="character-svg" aria-hidden="true">
          <ellipse cx="90" cy="103" rx="62" ry="9" fill="#ffe4ef" />
          {/* Curved Tails forming a heart silhouette behind them */}
          <path
            d="M42 86 C22 72, 26 44, 48 48"
            fill="none"
            stroke="#f7b267"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <path
            d="M138 86 C158 72, 154 44, 132 48"
            fill="none"
            stroke="#d8b4fe"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Left Peach Kitten */}
          <polygon points="48,46 53,28 66,40" fill="#ffd6ba" stroke="#eab08a" strokeWidth="2" />
          <polygon points="71,40 81,28 84,46" fill="#ffd6ba" stroke="#eab08a" strokeWidth="2" />
          <ellipse cx="66" cy="82" rx="19" ry="18" fill="#ffd6ba" stroke="#eab08a" strokeWidth="2" />
          <circle cx="66" cy="58" r="18" fill="#ffd6ba" stroke="#eab08a" strokeWidth="2" />
          <path d="M58 57 Q60.5 54 63 57" fill="none" stroke="#4a2535" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M69 57 Q71.5 54 74 57" fill="none" stroke="#4a2535" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="56" cy="63" rx="3.5" ry="2" fill="#ff758f" opacity="0.65" />
          <ellipse cx="75" cy="63" rx="3.5" ry="2" fill="#ff758f" opacity="0.65" />
          <path d="M63 63 Q66 66 69 63" fill="none" stroke="#4a2535" strokeWidth="1.5" strokeLinecap="round" />

          {/* Right Lavender-Pink Kitten */}
          <polygon points="96,46 99,28 109,40" fill="#fce7f3" stroke="#e5b3d2" strokeWidth="2" />
          <polygon points="114,40 127,28 132,46" fill="#fce7f3" stroke="#e5b3d2" strokeWidth="2" />
          <ellipse cx="114" cy="82" rx="19" ry="18" fill="#fce7f3" stroke="#e5b3d2" strokeWidth="2" />
          <circle cx="114" cy="58" r="18" fill="#fce7f3" stroke="#e5b3d2" strokeWidth="2" />
          <path d="M106 57 Q108.5 54 111 57" fill="none" stroke="#4a2535" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M117 57 Q119.5 54 122 57" fill="none" stroke="#4a2535" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="104" cy="63" rx="3.5" ry="2" fill="#ff758f" opacity="0.65" />
          <ellipse cx="123" cy="63" rx="3.5" ry="2" fill="#ff758f" opacity="0.65" />
          <path d="M111 63 Q114 66 117 63" fill="none" stroke="#4a2535" strokeWidth="1.5" strokeLinecap="round" />

          {/* Tiny sparkling heart between them */}
          <path
            d="M90 48 C88.3 45, 83 42.5, 83 38.5 C83 35.8, 85 33.8, 87.5 33.8 C89 33.8, 89.7 34.6, 90 35.6 C90.3 34.6, 91 33.8, 92.5 33.8 C95 33.8, 97 35.8, 97 38.5 C97 42.5, 91.7 45, 90 48 Z"
            fill="#ff4d6d"
          />
        </svg>
        <p className="character-caption">Better together</p>
      </article>
    </div>
  );
}
