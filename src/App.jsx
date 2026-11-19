import React, { useCallback, useEffect, useState } from 'react';
import { giftConfig } from './config/giftConfig';
import { soundManager } from './utils/soundManager';
import FloatingParticles from './components/FloatingParticles';
import MusicControl from './components/MusicControl';
import OpeningScreen from './components/OpeningScreen';
import HeartTree from './components/HeartTree';
import RelationshipCountdown from './components/RelationshipCountdown';
import RomanticLetter from './components/RomanticLetter';
import FinalSurprise from './components/FinalSurprise';

export default function App() {
  // Incremented on replay to cleanly reset all animations and typing states
  const [experienceKey, setExperienceKey] = useState(0);
  const [scene, setScene] = useState('opening'); // 'opening' | 'story'
  const [showCountdown, setShowCountdown] = useState(false);
  const [showLetterButton, setShowLetterButton] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync theme colors, title, and audio settings from central giftConfig
  useEffect(() => {
    document.title = giftConfig.siteMeta.pageTitle;

    const root = document.documentElement;
    const { theme } = giftConfig;
    root.style.setProperty('--bg-pastel-pink', theme.bgPastelPink);
    root.style.setProperty('--bg-blush-pink', theme.bgBlushPink);
    root.style.setProperty('--bg-peach', theme.bgPeach);
    root.style.setProperty('--heart-red', theme.heartRed);
    root.style.setProperty('--heart-soft', theme.heartSoft);
    root.style.setProperty('--accent-gold', theme.accentGold);
    root.style.setProperty('--text-primary', theme.textPrimary);
    root.style.setProperty('--text-muted', theme.textMuted);
    root.style.setProperty('--card-bg', theme.cardBg);

    soundManager.configure(giftConfig.music);
  }, []);

  const handleToggleMusic = async () => {
    const playing = await soundManager.toggleMusic();
    setIsMusicPlaying(playing);
  };

  const handleEnterStory = useCallback(async () => {
    setScene('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Start gentle background music only after user interaction if enabled
    if (giftConfig.music.enabled && !soundManager.isPlaying) {
      const started = await soundManager.startMusic();
      setIsMusicPlaying(started);
    }
  }, []);

  const handleTreeComplete = useCallback(() => {
    setShowCountdown(true);
    setTimeout(() => {
      setShowLetterButton(true);
    }, 650);
  }, []);

  const handleOpenLetter = useCallback(() => {
    soundManager.playSoftChime();
  }, []);

  const handleLetterComplete = useCallback(() => {
    setShowFinalSurprise(true);
  }, []);

  const handleReplay = useCallback(() => {
    soundManager.playSoftChime();
    setShowCountdown(false);
    setShowLetterButton(false);
    setShowFinalSurprise(false);
    setScene('opening');
    setExperienceKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="app-shell">
      <FloatingParticles density={16} />

      {giftConfig.music.enabled && (
        <MusicControl isPlaying={isMusicPlaying} onToggle={handleToggleMusic} />
      )}

      {scene === 'opening' ? (
        <OpeningScreen
          key={`opening-${experienceKey}`}
          title={giftConfig.opening.title}
          subtitle={giftConfig.opening.subtitle}
          ctaText={giftConfig.opening.ctaText}
          onContinue={handleEnterStory}
        />
      ) : (
        <main className="story-main" key={`story-${experienceKey}`}>
          <HeartTree
            caption={giftConfig.tree.caption}
            onAnimationComplete={handleTreeComplete}
          />

          <RelationshipCountdown
            heading={giftConfig.countdown.heading}
            subtext={giftConfig.countdown.subtext}
            startDate={giftConfig.relationshipStartDate}
            isVisible={showCountdown}
          />

          <RomanticLetter
            buttonText={giftConfig.letter.buttonText}
            content={giftConfig.letter.content}
            signaturePrefix={giftConfig.letter.signaturePrefix}
            senderName={giftConfig.myName}
            isVisible={showLetterButton}
            onOpenLetter={handleOpenLetter}
            onLetterComplete={handleLetterComplete}
          />

          <FinalSurprise
            title={giftConfig.finalSurprise.title}
            subtitle={giftConfig.finalSurprise.subtitle}
            replayButtonText={giftConfig.finalSurprise.replayButtonText}
            isVisible={showFinalSurprise}
            onReplay={handleReplay}
          />
        </main>
      )}
    </div>
  );
}
