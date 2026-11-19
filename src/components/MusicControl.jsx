import React from 'react';

export default function MusicControl({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      className={`music-control ${isPlaying ? 'is-playing' : ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause romantic music' : 'Play romantic music'}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      <span className="music-bars" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="music-label">{isPlaying ? 'Playing' : 'Music'}</span>
    </button>
  );
}
