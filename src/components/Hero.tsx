import React, { useState, useEffect } from 'react';
import { preloadCharacterFrames, LoadedFrames } from '../utils/frameLoader';
import { useCharacterTracking } from '../hooks/useCharacterTracking';
import { CharacterCanvas } from './CharacterCanvas';
import { FloatingNav } from './FloatingNav';
import { HeroText } from './HeroText';
import { CustomCursor } from './CustomCursor';
import { LoadingScreen } from './LoadingScreen';

export const Hero: React.FC = () => {
  const [framesData, setFramesData] = useState<LoadedFrames | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [interactiveHover, setInteractiveHover] = useState<boolean>(false);

  const { stateRef } = useCharacterTracking();

  useEffect(() => {
    let isMounted = true;

    preloadCharacterFrames((progress) => {
      if (isMounted) setLoadProgress(progress);
    })
      .then((data) => {
        if (isMounted) {
          setFramesData(data);
        }
      })
      .catch((err) => {
        console.error('Frame preloading error:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-screen h-screen overflow-hidden bg-[#100C22] select-none"
      style={{ backgroundColor: '#100C22' }}
    >
      {/* Loading state until all 65 WebP images are cached */}
      {!framesData && <LoadingScreen progress={loadProgress} />}

      {/* Zero-ghosting Canvas Renderer */}
      {framesData && (
        <CharacterCanvas
          framesData={framesData}
          trackingState={stateRef}
        />
      )}

      {/* Floating Navigation */}
      <FloatingNav onHoverInteractive={setInteractiveHover} />

      {/* Editorial Hero Typography & CTAs */}
      <HeroText onHoverInteractive={setInteractiveHover} />

      {/* Custom Magnetic Cursor */}
      <CustomCursor interactiveHover={interactiveHover} />
    </section>
  );
};
