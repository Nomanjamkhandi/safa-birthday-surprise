import React, { useState, useRef } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireCakeCutConfetti } from '../utils/confetti';

interface Step6CakeCuttingProps {
  onNext: () => void;
}

export const Step6CakeCutting: React.FC<Step6CakeCuttingProps> = ({ onNext }) => {
  const [isCut, setIsCut] = useState(false);
  const [knifePos, setKnifePos] = useState({ x: 0, y: 0 });
  const [isDraggingKnife, setIsDraggingKnife] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const triggerCakeCut = () => {
    if (isCut) return;
    setIsCut(true);
    sounds.playSlice();
    sounds.playCelebration();
    fireCakeCutConfetti();
  };

  const handleKnifeMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (isCut) return;
    setIsDraggingKnife(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - knifePos.x, y: clientY - knifePos.y };
  };

  const handleWindowMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingKnife || isCut) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const newX = clientX - dragStart.current.x;
    const newY = clientY - dragStart.current.y;
    setKnifePos({ x: newX, y: newY });

    // If dragged towards the cake center (near 0, 0 or downward)
    if (newY > 30 || Math.abs(newX) > 60) {
      setIsDraggingKnife(false);
      triggerCakeCut();
    }
  };

  const handleWindowUp = () => {
    if (isDraggingKnife && !isCut) {
      setIsDraggingKnife(false);
      setKnifePos({ x: 0, y: 0 });
    }
  };

  return (
    <div
      onMouseMove={handleWindowMove}
      onMouseUp={handleWindowUp}
      onTouchMove={handleWindowMove}
      onTouchEnd={handleWindowUp}
      className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-6 select-none"
    >
      {/* Headings */}
      <div className="mb-4 max-w-md w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Birthday Tradition</span>
        </div>
        <h1 className="font-display text-2xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-2">
          One Last Surprise... Cut Your Birthday Cake! 🎂
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium">
          Touch and Cut the Cake With the Knife!
        </p>
      </div>

      {/* Main 3D-Style Cake Experience Container */}
      <div className="relative my-4 flex flex-col items-center justify-center max-w-lg w-full">
        {/* Soft background glow halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300/40 via-rose-200/50 to-amber-100/40 blur-2xl -z-1 animate-pulse-glow" />

        {/* Floating knife controller (if not yet cut) */}
        {!isCut && (
          <div
            onMouseDown={handleKnifeMouseDown}
            onTouchStart={handleKnifeMouseDown}
            onClick={triggerCakeCut}
            style={{
              transform: `translate(${knifePos.x}px, ${knifePos.y}px) rotate(-35deg)`,
              transition: isDraggingKnife ? 'none' : 'transform 0.3s ease',
            }}
            className="absolute -top-10 sm:-top-14 right-8 sm:right-16 z-30 cursor-grab active:cursor-grabbing group p-2 hover:scale-110 active:scale-95"
            title="Drag knife across cake or tap to cut!"
          >
            {/* Realistic decorative knife SVG */}
            <div className="relative flex flex-col items-center drop-shadow-xl">
              {/* Knife Blade */}
              <div className="w-4 h-24 sm:w-5 sm:h-28 bg-gradient-to-r from-slate-200 via-white to-slate-300 rounded-t-sm border-r-2 border-slate-300 clip-knife" />
              {/* Knife Guard */}
              <div className="w-8 h-2 bg-amber-400 rounded-sm shadow-xs" />
              {/* Knife Handle (Rose Gold / Pink) */}
              <div className="w-5 h-16 bg-gradient-to-b from-pink-500 via-rose-400 to-pink-600 rounded-b-lg border-2 border-amber-300/60 shadow-md flex items-center justify-center">
                <Heart className="w-2.5 h-2.5 fill-white text-white" />
              </div>
            </div>
            <span className="block text-[10px] font-bold text-pink-600 mt-1 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-full shadow-xs">
              Slice Me!
            </span>
          </div>
        )}

        {/* Interactive 3D Cake Block */}
        <div
          onClick={triggerCakeCut}
          className="relative cursor-pointer group flex flex-col items-center transition-transform hover:scale-102"
        >
          {/* Candle Section */}
          <div className="relative z-20 flex items-center gap-4 mb-1">
            {/* Left Candle */}
            <div className="flex flex-col items-center">
              <div className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]" />
              <div className="w-1.5 h-6 bg-gradient-to-b from-pink-200 to-white rounded-t-xs" />
            </div>

            {/* Center Candle (Main) */}
            <div className="flex flex-col items-center">
              <div className="w-3.5 h-6 bg-gradient-to-t from-orange-500 via-amber-300 to-yellow-100 rounded-full animate-pulse drop-shadow-[0_0_10px_rgba(251,191,36,1)]" />
              <div className="w-2 h-8 bg-gradient-to-b from-rose-200 to-pink-100 rounded-t-xs border-x border-pink-200" />
            </div>

            {/* Right Candle */}
            <div className="flex flex-col items-center">
              <div
                className="w-2.5 h-4 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full animate-bounce drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]"
                style={{ animationDelay: '200ms' }}
              />
              <div className="w-1.5 h-6 bg-gradient-to-b from-pink-200 to-white rounded-t-xs" />
            </div>
          </div>

          {/* Tier 1 (Top Tier) */}
          <div className="w-36 sm:w-44 h-16 sm:h-20 bg-gradient-to-b from-white via-pink-100 to-pink-200 rounded-t-2xl border-t-4 border-white shadow-md relative overflow-hidden flex items-center justify-center">
            {/* White frosting drip */}
            <div className="absolute top-0 w-full flex justify-around text-white text-xs">
              <span>☁️</span>
              <span>☁️</span>
              <span>☁️</span>
              <span>☁️</span>
            </div>
            {/* Tulip flower on top tier */}
            <div className="text-xl sm:text-2xl animate-float">🌷</div>
          </div>

          {/* Tier 2 (Middle Tier) */}
          <div className="w-52 sm:w-64 h-20 sm:h-24 bg-gradient-to-b from-pink-200 via-rose-200 to-pink-300 rounded-t-2xl border-t-4 border-pink-100 shadow-lg relative flex items-center justify-center">
            {/* Cut line / slice opening effect */}
            {isCut && (
              <div className="absolute inset-y-0 w-3 bg-rose-500/70 blur-xs animate-pulse" />
            )}
            <div className="text-center">
              <span className="font-handwriting text-2xl sm:text-3xl text-rose-700 font-bold tracking-wider">
                Safa Pariii
              </span>
              <div className="flex justify-center gap-2 text-xs text-rose-500 mt-0.5">
                <span>🌸</span>
                <span>✨</span>
                <span>🌸</span>
              </div>
            </div>
          </div>

          {/* Tier 3 (Bottom Tier) */}
          <div className="w-68 sm:w-80 h-22 sm:h-26 bg-gradient-to-b from-white via-pink-100 to-rose-200 rounded-t-2xl border-t-4 border-white shadow-xl relative overflow-hidden flex items-center justify-center">
            {/* Cut line split */}
            {isCut && (
              <div className="absolute inset-y-0 w-4 bg-gradient-to-b from-rose-400 to-pink-600 animate-fade-in" />
            )}
            <div className="flex items-center gap-3 text-sm text-pink-600 font-semibold tracking-widest">
              <span>🌷</span>
              <span className="font-display">SWEET BIRTHDAY</span>
              <span>🌷</span>
            </div>
          </div>

          {/* Cake Stand / Base Platter */}
          <div className="w-80 sm:w-96 h-6 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-full shadow-2xl border border-pink-200/80 -mt-1" />
          <div className="w-40 sm:w-48 h-3 bg-gradient-to-b from-slate-200 to-slate-300 rounded-b-xl shadow-md -mt-0.5" />
        </div>

        {/* Slice status tag */}
        <div className="mt-4">
          {isCut ? (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold shadow-xs animate-scale-up">
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              <span>Cake Cut Successfully! A Sweet Wish For You ❤️</span>
            </div>
          ) : (
            <button
              onClick={triggerCakeCut}
              className="text-xs text-pink-600 font-semibold underline underline-offset-4 hover:text-pink-800"
            >
              (Or tap here to cut the cake with one click)
            </button>
          )}
        </div>
      </div>

      {/* Celebratory Musical-Style Lyrics Reveal */}
      {isCut && (
        <div className="mt-6 max-w-lg w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-pink-200 shadow-xl shadow-pink-200/50 animate-scale-up">
          <div className="flex items-center justify-center gap-2 text-pink-500 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">A Special Birthday Verse</span>
            <Sparkles className="w-4 h-4" />
          </div>

          <div className="font-letter-body text-xl sm:text-2xl text-pink-800 leading-relaxed space-y-1.5 py-4 px-3 sm:px-6 bg-pink-50/70 rounded-2xl border border-pink-100 my-4 shadow-inner">
            <p className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              "Runway ready, gotta get some confetti
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              'Cause we gotta celebrate like it's your birthday
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              Looking like a 20 from Korea to Miami
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              Oh, I wanna get with you in the worst way (whoa)
            </p>
            <p className="animate-fade-in text-rose-700 font-semibold" style={{ animationDelay: '500ms' }}>
              It should be a crime just to look that fine
            </p>
            <p className="animate-fade-in text-rose-700 font-semibold" style={{ animationDelay: '600ms' }}>
              Girl, if you're single, let me make you mine
            </p>
            <p className="animate-fade-in" style={{ animationDelay: '700ms' }}>
              Call a nurse before it gets worse
            </p>
            <p className="animate-fade-in font-bold text-rose-700" style={{ animationDelay: '800ms' }}>
              I'ma really, really need first aid" 🎵✨
            </p>
          </div>

          <button
            onClick={() => {
              sounds.playCelebration();
              onNext();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-base shadow-lg shadow-pink-400/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Finale Surprise 💖</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
