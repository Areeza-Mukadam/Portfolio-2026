import React, { useEffect, useRef } from 'react';
import { CHARACTER_CONFIG } from '../constants/character';
import { LoadedFrames } from '../utils/frameLoader';
import { TrackingState, lerpAngle, angleToFrameIndex } from '../hooks/useCharacterTracking';

interface CharacterCanvasProps {
  framesData: LoadedFrames;
  trackingState: React.MutableRefObject<TrackingState>;
}

export const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  framesData,
  trackingState,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let viewportW = window.innerWidth;
    let viewportH = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Compute layout & scaling
    let destW = 0;
    let destH = 0;
    let destX = 0;
    let destY = 0;

    const updateDimensions = () => {
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(viewportW * dpr);
      canvas.height = Math.round(viewportH * dpr);
      canvas.style.width = `${viewportW}px`;
      canvas.style.height = `${viewportH}px`;

      // Scale to cover vertically while maintaining aspect ratio
      const videoRatio = CHARACTER_CONFIG.FRAME_ASPECT_RATIO;
      const screenRatio = viewportW / viewportH;

      if (screenRatio > videoRatio) {
        // Ultra-wide or wide desktop
        destW = viewportW;
        destH = viewportW / videoRatio;
        destX = 0;
        destY = (viewportH - destH) / 2;
      } else if (viewportW >= 768) {
        // Standard desktop / landscape
        destH = viewportH;
        destW = viewportH * videoRatio;
        destX = (viewportW - destW) / 2;
        destY = (viewportH - destH) / 2;
      } else {
        // Mobile portrait: scale character to sit gracefully in the upper 80%
        destH = Math.max(viewportH * 0.82, viewportW * 1.35);
        destW = destH * videoRatio;
        destX = viewportW / 2 - destW * 0.50;
        destY = viewportH * 0.02;
      }

      // Update face center in viewport coordinates for accurate cursor tracking
      const rect = canvas.getBoundingClientRect();
      trackingState.current.faceViewportPos = {
        x: rect.left + destX + destW * CHARACTER_CONFIG.FACE_CENTER_X_RATIO,
        y: rect.top + destY + destH * CHARACTER_CONFIG.FACE_CENTER_Y_RATIO,
      };
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('scroll', updateDimensions, { passive: true });

    // Track previous deadzone state to detect when exiting center
    let wasDeadzone = true;

    // Render loop
    const render = () => {
      // Pause drawing if scrolled out of view to save battery & GPU
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const state = trackingState.current;

      if (state.isDeadzone) {
        // While in deadzone, sync currentAngle to targetAngle directly
        // so when the user exits in ANY direction, the starting angle is already aligned
        state.currentAngle = state.targetAngle;
        wasDeadzone = true;
      } else {
        if (wasDeadzone) {
          // Just exited deadzone: instantly snap to target angle so there is 0ms lag
          state.currentAngle = state.targetAngle;
          wasDeadzone = false;
        } else {
          // Normal circular tracking outside deadzone
          state.currentAngle = lerpAngle(
            state.currentAngle,
            state.targetAngle,
            0.32 // Crisp responsive lerp
          );
        }
      }

      state.currentFrameIndex = angleToFrameIndex(
        state.currentAngle,
        CHARACTER_CONFIG.TOTAL_FRAMES
      );

      // 2. Select exactly ONE frame (Zero ghosting requirement)
      let activeImage: HTMLImageElement;
      if (state.isDeadzone || state.isReducedMotion || state.isTouchDevice) {
        activeImage = framesData.centerFrame;
      } else {
        const frame = framesData.frames[state.currentFrameIndex];
        activeImage = frame || framesData.centerFrame;
      }

      // 3. Crisp single-frame draw
      ctx.save();
      ctx.scale(dpr, dpr);

      // Fill canvas with exact background color to prevent gaps on edges
      ctx.fillStyle = CHARACTER_CONFIG.BACKGROUND_COLOR;
      ctx.fillRect(0, 0, viewportW, viewportH);

      // Draw exactly ONE frame at 100% opacity
      ctx.globalAlpha = 1.0;
      ctx.drawImage(activeImage, destX, destY, destW, destH);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', updateDimensions);
    };
  }, [framesData, trackingState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      style={{
        backgroundColor: CHARACTER_CONFIG.BACKGROUND_COLOR,
      }}
      aria-hidden="true"
    />
  );
};
