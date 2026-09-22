import { useEffect, useRef } from 'react';
import { CHARACTER_CONFIG } from '../constants/character';

export function lerpAngle(current: number, target: number, factor: number): number {
  const TWO_PI = Math.PI * 2;
  let diff = (target - current) % TWO_PI;
  if (diff < -Math.PI) diff += TWO_PI;
  if (diff > Math.PI) diff -= TWO_PI;
  return current + diff * factor;
}

export function angleToFrameIndex(angle: number, totalFrames: number = 64): number {
  const TWO_PI = Math.PI * 2;
  let norm = angle % TWO_PI;
  if (norm < 0) norm += TWO_PI;
  const index = Math.floor((norm / TWO_PI) * totalFrames + 0.5) % totalFrames;
  return (index + totalFrames) % totalFrames;
}

export interface TrackingState {
  currentAngle: number;
  targetAngle: number;
  currentFrameIndex: number;
  isDeadzone: boolean;
  mousePos: { x: number; y: number };
  faceViewportPos: { x: number; y: number };
  isTouchDevice: boolean;
  isReducedMotion: boolean;
}

export function useCharacterTracking() {
  const stateRef = useRef<TrackingState>({
    currentAngle: 0,
    targetAngle: 0,
    currentFrameIndex: 0,
    isDeadzone: true, // Start in center eye-contact until mouse moves
    mousePos: { x: -1000, y: -1000 },
    faceViewportPos: { x: 0, y: 0 },
    isTouchDevice: false,
    isReducedMotion: false,
  });

  const interactiveHoverRef = useRef(false);

  useEffect(() => {
    // Detect reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    stateRef.current.isReducedMotion = motionQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      stateRef.current.isReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Detect touch device
    const checkTouch = () => {
      stateRef.current.isTouchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };
    checkTouch();

    const handlePointerMove = (e: MouseEvent) => {
      stateRef.current.mousePos.x = e.clientX;
      stateRef.current.mousePos.y = e.clientY;

      const { faceViewportPos, isReducedMotion, isTouchDevice } = stateRef.current;
      if (isReducedMotion || isTouchDevice) {
        stateRef.current.isDeadzone = true;
        return;
      }

      const dx = e.clientX - faceViewportPos.x;
      const dy = e.clientY - faceViewportPos.y;
      const dist = Math.hypot(dx, dy);

      const minDim = Math.min(window.innerWidth, window.innerHeight);
      const deadzoneRadius = minDim * CHARACTER_CONFIG.DEADZONE_RADIUS_RATIO;

      // Always update targetAngle as long as cursor is not at exact singularity
      if (dist > 3) {
        stateRef.current.targetAngle = Math.atan2(dy, dx);
      }

      // Hysteresis threshold to prevent edge jitter
      const isDeadzoneNow = stateRef.current.isDeadzone;
      const threshold = isDeadzoneNow ? deadzoneRadius * 1.12 : deadzoneRadius;

      if (dist <= threshold) {
        stateRef.current.isDeadzone = true;
      } else {
        stateRef.current.isDeadzone = false;
      }
    };

    const handleMouseLeave = () => {
      // When cursor leaves viewport, look back to center
      stateRef.current.isDeadzone = true;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      handlePointerMove(e);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return {
    stateRef,
    interactiveHoverRef,
  };
}
