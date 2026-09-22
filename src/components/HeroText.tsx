import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface HeroTextProps {
  onHoverInteractive?: (hovering: boolean) => void;
}

export const HeroText: React.FC<HeroTextProps> = ({ onHoverInteractive }) => {
  return (
    <div className="absolute inset-x-0 bottom-0 md:inset-x-auto md:bottom-16 md:left-20 z-20 pointer-events-auto px-6 sm:px-12 md:px-0 pt-24 pb-8 md:p-0 bg-gradient-to-t from-[#100C22] via-[#100C22]/90 to-transparent md:bg-none max-w-full md:max-w-[420px]">
      {/* Intro & Name */}
      <div className="mb-3 sm:mb-4">
        <p className="text-[11px] sm:text-sm uppercase tracking-[0.25em] text-white/60 font-medium mb-1">
          Hi, I'm
        </p>
        <h1 className="name-script text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-wide leading-tight">
          Areeza
        </h1>
      </div>

      {/* Positioning Statement */}
      <div className="space-y-2 mb-8 max-w-[340px]">
        <p className="text-sm sm:text-base text-white/90 font-medium leading-snug tracking-tight">
          Computer Engineering student building intelligent digital experiences.
        </p>
        <p className="text-xs sm:text-sm text-white/55 leading-relaxed font-light">
          I build full-stack applications and AI-powered products, turning ideas into practical, polished experiences.
        </p>
      </div>

      {/* Premium Pill CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Primary CTA */}
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => onHoverInteractive?.(true)}
          onMouseLeave={() => onHoverInteractive?.(false)}
          onFocus={() => onHoverInteractive?.(true)}
          onBlur={() => onHoverInteractive?.(false)}
          className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#100C22] text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-white/10 hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <span>View My Work</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>

        {/* Secondary CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onMouseEnter={() => onHoverInteractive?.(true)}
          onMouseLeave={() => onHoverInteractive?.(false)}
          onFocus={() => onHoverInteractive?.(true)}
          onBlur={() => onHoverInteractive?.(false)}
          className="inline-flex items-center px-6 py-2.5 rounded-full glass-pill text-white text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          <span>Let's Talk</span>
        </a>
      </div>
    </div>
  );
};
