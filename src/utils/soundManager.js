/**
 * Gentle Audio Manager
 * - Supports a custom MP3/OGG file via giftConfig.music.audioFile
 * - Falls back gracefully to a built-in Web Audio API romantic music-box melody
 * - Only starts after explicit user interaction (browser-compliant, zero console errors)
 */
class SoundManager {
  constructor() {
    this.audioCtx = null;
    this.htmlAudio = null;
    this.isPlaying = false;
    this.melodyTimer = null;
    this.noteIndex = 0;
    this.config = {
      audioFile: null,
      volume: 0.35,
      soundEffects: true,
    };

    // Soft romantic C-major / F-major / G-major lullaby arpeggio (Hz)
    this.melodyNotes = [
      523.25, 659.25, 783.99, 659.25, // C5 E5 G5 E5
      440.0, 523.25, 659.25, 523.25,  // A4 C5 E5 C5
      349.23, 440.0, 523.25, 659.25,  // F4 A4 C5 E5
      392.0, 493.88, 587.33, 493.88,  // G4 B4 D5 B4
    ];
  }

  configure(musicConfig) {
    this.config = { ...this.config, ...musicConfig };
  }

  ensureAudioContext() {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  playMusicBoxNote(freq, duration = 1.4, gainPeak = 0.06) {
    try {
      const ctx = this.ensureAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const harmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(freq * 2, now);

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.setValueAtTime(0.18, now);

      const scaledGain = gainPeak * (this.config.volume / 0.38);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(
        Math.max(0.005, scaledGain),
        now + 0.04
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      harmonic.start(now);
      osc.stop(now + duration + 0.05);
      harmonic.stop(now + duration + 0.05);
    } catch {
      // Fail silently if audio context is blocked
    }
  }

  startBuiltInMelody() {
    if (this.melodyTimer) clearInterval(this.melodyTimer);
    this.ensureAudioContext();

    const playNext = () => {
      if (!this.isPlaying) return;
      const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.playMusicBoxNote(freq, 1.5, 0.055);
      this.noteIndex += 1;
    };

    playNext();
    this.melodyTimer = setInterval(playNext, 650);
  }

  async startMusic() {
    if (this.isPlaying) return true;
    this.isPlaying = true;

    if (this.config.audioFile) {
      try {
        if (!this.htmlAudio) {
          this.htmlAudio = new Audio(this.config.audioFile);
          this.htmlAudio.loop = true;
        }
        this.htmlAudio.volume = Math.min(1, Math.max(0, this.config.volume));
        await this.htmlAudio.play();
        return true;
      } catch {
        // Fallback smoothly to built-in music box if MP3 fails or is missing
        this.startBuiltInMelody();
        return true;
      }
    }

    this.startBuiltInMelody();
    return true;
  }

  pauseMusic() {
    this.isPlaying = false;
    if (this.melodyTimer) {
      clearInterval(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.htmlAudio) {
      try {
        this.htmlAudio.pause();
      } catch {
        // Ignore
      }
    }
  }

  async toggleMusic() {
    if (this.isPlaying) {
      this.pauseMusic();
      return false;
    }
    await this.startMusic();
    return true;
  }

  playSoftChime() {
    if (!this.config.soundEffects) return;
    this.playMusicBoxNote(783.99, 0.65, 0.045);
    setTimeout(() => {
      this.playMusicBoxNote(1046.5, 0.9, 0.04);
    }, 110);
  }
}

export const soundManager = new SoundManager();
