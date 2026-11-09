import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireBalloonPopConfetti } from '../utils/confetti';

interface Step3BalloonPopProps {
  onNext: () => void;
}

export const Step3BalloonPop: React.FC<Step3BalloonPopProps> = ({ onNext }) => {
  const [isPopped, setIsPopped] = useState(false);
  const [arrowPos, setArrowPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const balloonRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const triggerPop = useCallback(() => {
    if (isPopped) return;
    setIsPopped(true);
    sounds.playPop();
    sounds.playCelebration();
    fireBalloonPopConfetti(0.5, 0.4);
  }, [isPopped]);

  // Handle Dragging
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isPopped) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX - arrowPos.x, y: clientY - arrowPos.y };
  };

  useEffect(() => {
    const handleMove = (e: TouchEvent | MouseEvent) => {
      if (!isDragging || isPopped) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newX = clientX - dragStartRef.current.x;
      const newY = clientY - dragStartRef.current.y;
      setArrowPos({ x: newX, y: newY });

      // Check collision with balloon
      if (balloonRef.current) {
        const balloonRect = balloonRef.current.getBoundingClientRect();
        const arrowCenterX = clientX;
        const arrowCenterY = clientY;

        // Collision radius
        if (
          arrowCenterX >= balloonRect.left &&
          arrowCenterX <= balloonRect.right &&
          arrowCenterY >= balloonRect.top &&
          arrowCenterY <= balloonRect.bottom
        ) {
          setIsDragging(false);
          triggerPop();
        }
      }
    };

    const handleEnd = () => {
      if (isDragging && !isPopped) {
        setIsDragging(false);
        // snap back smoothly if not collided
        setArrowPos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, isPopped, triggerPop]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-6 select-none"
    >
      {!isPopped ? (
        /* Pre-Popped Balloon Scene */
        <div className="flex flex-col items-center max-w-md w-full">
          {/* Instruction */}
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100/90 text-pink-700 font-semibold text-sm border border-pink-200 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Pull the arrow to pop the balloon!</span>
          </div>

          {/* Balloon Container */}
          <div
            ref={balloonRef}
            onClick={triggerPop}
            className="relative cursor-pointer group my-4 p-4"
            title="Click or drag arrow to pop!"
          >
            {/* The Big Balloon */}
            <div className="w-48 h-60 sm:w-56 sm:h-72 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] bg-gradient-to-br from-pink-400 via-rose-400 to-pink-600 shadow-2xl shadow-pink-400/50 relative flex items-center justify-center animate-float transform transition-transform group-hover:scale-105">
              {/* Balloon glossy reflection */}
              <div className="absolute top-6 left-8 w-12 h-20 sm:w-14 sm:h-24 bg-white/40 rounded-[50%] -rotate-30 blur-xs" />
              <div className="absolute top-8 left-14 w-4 h-8 bg-white/60 rounded-[50%] -rotate-30" />

              {/* Balloon cute heart emblem */}
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center border border-white/40">
                <Heart className="w-9 h-9 text-white/90 fill-white/80 animate-pulse" />
              </div>

              {/* Balloon knot */}
              <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-5 h-4 bg-rose-600 rounded-b-md" />
              {/* Balloon string */}
              <svg
                className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-10 h-24 overflow-visible"
                viewBox="0 0 40 100"
                fill="none"
              >
                <path
                  d="M20 0 Q30 30 15 50 T22 100"
                  stroke="#fda4af"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Draggable Arrow Controller */}
          <div className="mt-16 sm:mt-20 flex flex-col items-center">
            <p className="text-xs text-slate-500 mb-3">
              Drag arrow up towards the balloon (or tap either to pop)
            </p>

            <div
              onMouseDown={handleTouchStart}
              onTouchStart={handleTouchStart}
              style={{
                transform: `translate(${arrowPos.x}px, ${arrowPos.y}px)`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              }}
              className="touch-none cursor-grab active:cursor-grabbing w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-400/50 border-2 border-white hover:scale-110 active:scale-95"
            >
              <div className="flex flex-col items-center">
                <span className="text-xs font-bold uppercase tracking-wider mb-0.5">Pop</span>
                <div className="-rotate-90">
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Revealed Grand Birthday Surprise */
        <div className="max-w-xl w-full bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-2xl shadow-pink-200/50 animate-scale-up">
          {/* Confetti celebration top ribbon */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl animate-bounce">🎈</span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>
              🌷
            </span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>
              ✨
            </span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '450ms' }}>
              🎂
            </span>
            <span className="text-2xl animate-bounce" style={{ animationDelay: '600ms' }}>
              🎈
            </span>
          </div>

          <h2 className="font-display text-xs sm:text-sm tracking-widest text-pink-600 font-bold uppercase mb-1">
            ✨ IT'S YOUR DAY ✨
          </h2>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 tracking-tight mb-2">
            HAPPY BIRTHDAY
          </h1>

          <div className="inline-block px-6 py-2 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 mb-6 shadow-xs">
            <span className="font-handwriting text-3xl sm:text-4xl text-pink-600 font-bold">
              SAFA (PARIIII) ❤️
            </span>
          </div>

          {/* Birthday Cake Illustration & Floating Accents */}
          <div className="relative mx-auto my-4 w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
            {/* Glowing background circle */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-200 to-rose-100 blur-xl opacity-70 animate-pulse-glow" />

            {/* Stylized Birthday Cake Illustration */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Candle flame */}
              <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-orange-400 to-yellow-200 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.9)] mb-1" />
              {/* Candle stick */}
              <div className="w-2 h-7 bg-gradient-to-r from-pink-200 via-white to-pink-300 rounded-t-sm shadow-xs mb-1" />

              {/* Cake Top Tier */}
              <div className="w-24 h-12 bg-gradient-to-r from-pink-200 via-white to-pink-200 rounded-t-xl border-t-2 border-white shadow-md relative overflow-hidden flex items-center justify-center">
                <div className="absolute bottom-0 w-full h-2 bg-pink-300/40 rounded-full" />
                <span className="text-xs">🍓 🌸 🍓</span>
              </div>

              {/* Cake Middle Tier */}
              <div className="w-34 h-14 bg-gradient-to-r from-pink-300 via-rose-200 to-pink-300 rounded-t-xl border-t-2 border-white shadow-lg relative flex items-center justify-center">
                <div className="absolute top-1 w-full flex justify-around px-2 text-pink-400 text-xs">
                  <span>🤍</span>
                  <span>🤍</span>
                  <span>🤍</span>
                </div>
                <span className="text-xs font-bold text-rose-600/80 tracking-wider">PARI</span>
              </div>

              {/* Cake Plate */}
              <div className="w-44 h-4 bg-white rounded-full shadow-md border border-pink-100" />
            </div>

            {/* Floating balloons on sides */}
            <div className="absolute -top-3 -left-4 text-3xl animate-float">🎈</div>
            <div className="absolute -top-2 -right-4 text-3xl animate-float-reverse">🤍</div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6 leading-relaxed">
            May this year bring you endless happiness, beautiful blessings, laughter, and every good thing you deserve!
          </p>

          {/* Next Button */}
          <button
            onClick={() => {
              sounds.playSparkle();
              onNext();
            }}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-base shadow-lg shadow-pink-400/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Open Your Special Gifts 🎁</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
