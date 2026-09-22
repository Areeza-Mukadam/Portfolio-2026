import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  interactiveHover?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ interactiveHover = false }) => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  // Track hover and click states with refs to avoid any React re-renders
  const isHoveringRef = useRef<boolean>(interactiveHover);
  const isClickingRef = useRef<boolean>(false);

  useEffect(() => {
    isHoveringRef.current = interactiveHover;
  }, [interactiveHover]);

  useEffect(() => {
    // Disable on touch devices or if user prefers reduced motion
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReduced) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let animationFrameId: number;

    const setVisibility = (visible: boolean) => {
      isVisible = visible;
      if (visible) {
        document.body.classList.add('custom-cursor-active');
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      } else {
        document.body.classList.remove('custom-cursor-active');
        if (dotRef.current) dotRef.current.style.opacity = '0';
        if (ringRef.current) ringRef.current.style.opacity = '0';
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        ringX = mouseX;
        ringY = mouseY;
        setVisibility(true);
      }

      // Update dot position immediately for 0ms physical latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onPointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [role="button"], input, select, [data-interactive]')) {
        isHoveringRef.current = true;
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest('a, button, [role="button"], input, select, [data-interactive]')) {
        isHoveringRef.current = interactiveHover;
      }
    };

    const onMouseDown = () => {
      isClickingRef.current = true;
    };

    const onMouseUp = () => {
      isClickingRef.current = false;
    };

    const onMouseLeave = () => {
      setVisibility(false);
    };

    const onMouseEnter = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      ringX = mouseX;
      ringY = mouseY;
      setVisibility(true);
    };

    // Smooth inertia render loop for the trailing aura/ring
    let currentScale = 1;
    const loop = () => {
      if (isVisible) {
        // Smooth lerp trailing position
        ringX += (mouseX - ringX) * 0.22;
        ringY += (mouseY - ringY) * 0.22;

        // Compute target scale based on hover and click
        let targetScale = 1.0;
        if (isClickingRef.current) {
          targetScale = 0.85;
        } else if (isHoveringRef.current) {
          targetScale = 1.45;
        }

        currentScale += (targetScale - currentScale) * 0.2;

        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentScale.toFixed(3)})`;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerover', onPointerOver, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerover', onPointerOver);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactiveHover]);

  // If touch device, render nothing
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Trailing Aura / Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none opacity-0 will-change-transform border border-white/30 bg-white/[0.04] backdrop-blur-[1px] shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-colors duration-200"
      />

      {/* Central Sharp Glowing Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] pointer-events-none opacity-0 will-change-transform"
      />
    </div>
  );
};
