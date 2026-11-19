/**
 * Central Personalization Configuration
 * Update any text, date, music path, or color below to tailor this gift.
 */
export const giftConfig = {
  siteMeta: {
    pageTitle: 'A Little Something For You ❤️',
  },

  // Names
  herName: 'My Love',
  myName: 'Yours Forever',

  // Relationship Start Date (YYYY-MM-DDTHH:mm:ss)
  relationshipStartDate: '2024-02-14T00:00:00',

  // Scene 1: Opening Screen
  opening: {
    title: 'A Little Something For You ❤️',
    subtitle: 'Made with love, just for you.',
    ctaText: 'Open Your Surprise',
  },

  // Scene 2: Heart Tree Caption
  tree: {
    caption: 'Just like this tree, my love for you keeps growing every day.',
  },

  // Scene 3: Live Relationship Timer
  countdown: {
    heading: 'Our Time Together...',
    subtext: 'Every single second with you has been my favorite.',
  },

  // Scene 4: Romantic Letter
  letter: {
    buttonText: 'Open My Letter ❤️',
    content: `Hey, My Love ❤️

I just wanted to remind you how special you are to me and how much happiness you have shared with me.

Our time together has been a wonderful gift, full of laughter, dreams, and beautiful memories.

Every day by your side is a new adventure, and I want to create so many more beautiful memories with you.

Thank you for being you. Thank you for bringing so much happiness into my life.

I love you more than words can ever explain. ❤️`,
    signaturePrefix: 'With all my heart,',
  },

  // Scene 5: Final Surprise
  finalSurprise: {
    title: "You're My Favorite Person ❤️",
    subtitle: "Here's to more beautiful memories together.",
    replayButtonText: 'Replay Our Story',
  },

  // Audio Settings
  // Optional: place an MP3 at `public/music/our-song.mp3` and set audioFile: './music/our-song.mp3'.
  // When audioFile is null (or fails to load), a soft built-in Web Audio music-box melody plays instead.
  music: {
    enabled: true,
    audioFile: null,
    volume: 0.38,
    soundEffects: true,
  },

  // Theme Colors (applied automatically to CSS custom properties)
  theme: {
    bgPastelPink: '#fff0f5',
    bgBlushPink: '#ffdbe8',
    bgPeach: '#ffeadb',
    heartRed: '#e11d48',
    heartSoft: '#ff6b8b',
    accentGold: '#f7b267',
    textPrimary: '#4a2535',
    textMuted: '#7d5264',
    cardBg: 'rgba(255, 255, 255, 0.78)',
  },
};
