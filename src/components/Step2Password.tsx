import React, { useState } from 'react';
import { KeyRound, Sparkles, Heart, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireGiftBoxConfetti } from '../utils/confetti';

interface Step2PasswordProps {
  onSuccess: () => void;
}

export const Step2Password: React.FC<Step2PasswordProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = password.trim().toLowerCase();

    // Check if password matches "pari" (or natural variations like "parii", "pariii")
    if (clean === 'pari' || clean === 'parii' || clean === 'pariii') {
      setStatus('success');
      sounds.playSparkle();
      fireGiftBoxConfetti(0.5, 0.4);
      setTimeout(() => {
        onSuccess();
      }, 1600);
    } else {
      setStatus('error');
      setErrorMessage("You're not Safa! 😜");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-8">
      <div
        className={`relative max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-pink-100 shadow-xl shadow-pink-100/60 transition-transform ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        {/* Soft aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-300 to-pink-300 rounded-3xl blur-xl opacity-20 -z-1" />

        {/* Cute Lock Icon */}
        <div className="mx-auto w-18 h-18 mb-5 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 border border-pink-300/40 flex items-center justify-center shadow-inner text-pink-500">
          {status === 'success' ? (
            <Heart className="w-9 h-9 fill-pink-500 animate-pulse" />
          ) : (
            <KeyRound className="w-8 h-8" />
          )}
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-500 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Security Check</span>
        </div>

        {/* Question Heading */}
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-2 leading-snug">
          "Noman tumhe zyada kya karke bulata tha?"
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Only the real Safa knows the cute nickname... 😉
        </p>

        {status === 'success' ? (
          <div className="py-6 animate-scale-up">
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg shadow-lg shadow-pink-300">
              <Heart className="w-5 h-5 fill-white" />
              <span>Haan, tum hi Pari ho! ❤️</span>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 text-pink-500 font-medium text-sm">
              <span className="text-xl">🌷</span>
              <span>Opening your surprise...</span>
              <span className="text-xl">🌷</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter Password..."
                className="w-full px-5 py-3.5 rounded-2xl border-2 border-pink-200 bg-white/90 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all text-center text-base sm:text-lg font-medium shadow-inner"
                autoComplete="off"
                autoFocus
              />
            </div>

            {status === 'error' && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm font-medium flex items-center justify-center gap-2">
                <span>{errorMessage}</span>
                <span className="text-xs text-rose-400 underline cursor-pointer" onClick={() => setPassword('')}>
                  Try again
                </span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold shadow-md shadow-pink-300/40 hover:shadow-lg hover:shadow-pink-400/50 active:scale-98 transition-all cursor-pointer"
            >
              <span>Unlock Secret</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Playful hint at bottom */}
        <p className="mt-6 text-[11px] text-pink-400/80">
          Hint: A 4-letter magical angel word 🧚‍♀️
        </p>
      </div>
    </div>
  );
};
