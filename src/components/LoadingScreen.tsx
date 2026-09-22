import React from 'react';

interface LoadingScreenProps {
  progress: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#100C22] select-none transition-opacity duration-700"
      style={{ backgroundColor: '#100C22' }}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Minimal signature mark */}
        <span className="name-script text-3xl font-semibold text-white/90 tracking-wider">
          Areeza
        </span>

        {/* Minimal elegant progress line */}
        <div className="w-36 h-[1.5px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white/70 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        </div>

        {/* Subtle percentage */}
        <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-mono">
          Loading {Math.round(progress * 100)}%
        </span>
      </div>
    </div>
  );
};
