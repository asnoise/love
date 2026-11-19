import React, { useEffect, useState } from 'react';

function calculateElapsed(startDateString) {
  const startMs = new Date(startDateString).getTime();
  const nowMs = Date.now();

  if (Number.isNaN(startMs) || nowMs <= startMs) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor((nowMs - startMs) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

function padTwo(val) {
  return String(val).padStart(2, '0');
}

export default function RelationshipCountdown({
  heading,
  subtext,
  startDate,
  isVisible,
}) {
  const [elapsed, setElapsed] = useState(() => calculateElapsed(startDate));

  useEffect(() => {
    setElapsed(calculateElapsed(startDate));
    const interval = setInterval(() => {
      setElapsed(calculateElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  const units = [
    { label: 'Days', value: elapsed.days },
    { label: 'Hours', value: padTwo(elapsed.hours) },
    { label: 'Minutes', value: padTwo(elapsed.minutes) },
    { label: 'Seconds', value: padTwo(elapsed.seconds) },
  ];

  return (
    <section
      className={`countdown-section reveal-block ${
        isVisible ? 'is-visible' : ''
      }`}
      aria-label="Relationship timer"
    >
      <div className="glass-panel countdown-panel">
        <h2 className="section-heading">{heading}</h2>
        <p className="section-subtext">{subtext}</p>

        <div className="countdown-grid">
          {units.map((unit) => (
            <div className="countdown-box" key={unit.label}>
              <span key={`${unit.label}-${unit.value}`} className="countdown-value">
                {unit.value}
              </span>
              <span className="countdown-label">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
