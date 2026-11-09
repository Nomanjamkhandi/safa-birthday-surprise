import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

interface Step1WelcomeProps {
  onNext: () => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({ onNext }) => {
  const handleClick = () => {
    sounds.playSparkle();
    // Auto-start music if not yet playing
    if (!sounds.getIsMusicPlaying()) {
      sounds.startMusic();
    }
    onNext();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-8">
      {/* Decorative top garland / banner */}
      <div className="mb-6 flex items-center gap-3">
        <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-pink-300" />
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200/80 shadow-xs backdrop-blur-xs">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span className="text-xs uppercase tracking-widest font-semibold text-pink-500">
            For A Truly Special Soul
          </span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>
        <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-pink-300" />
      </div>

      {/* Main Card */}
      <div className="relative max-w-lg w-full bg-white/70 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-pink-100 shadow-xl shadow-pink-100/50">
        {/* Soft glowing ambient orb behind */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-rose-300 rounded-3xl blur-xl opacity-20 -z-1" />

        {/* Floating Heart & Tulip Badge */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-pink-100 animate-ping opacity-25" />
          <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 flex items-center justify-center shadow-lg shadow-pink-300/40 text-white animate-float">
            <Heart className="w-10 h-10 fill-white" />
          </div>
          {/* Mini tulip icon float */}
          <div className="absolute -top-1 -right-1 bg-white p-1.5 rounded-full shadow-sm border border-pink-100">
            <span className="text-xl">🌷</span>
          </div>
        </div>

        {/* Birthday greeting label */}
        <p className="font-handwriting text-2xl sm:text-3xl text-pink-500 mb-2">
          Dearest Safa...
        </p>

        {/* Main Heading */}
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 tracking-tight leading-tight mb-4 text-balance">
          Something Special Is Waiting For You...
        </h1>

        {/* Sweet Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base max-w-sm mx-auto mb-8 leading-relaxed">
          A little magical universe filled with smiles, heartfelt messages, and surprises crafted just for you today.
        </p>

        {/* Large Animated Surprise Button */}
        <button
          onClick={handleClick}
          className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-semibold text-base sm:text-lg shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <span>Click For Your Surprise ❤️</span>
          <Sparkles className="w-5 h-5 text-pink-200 group-hover:rotate-12 transition-transform" />
        </button>

        {/* Cute subtle note */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-pink-400 font-medium">
          <span>✨</span>
          <span>Turn up your volume for the best experience</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};
