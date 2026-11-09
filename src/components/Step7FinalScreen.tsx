import React, { useEffect, useState } from 'react';
import { Heart, Sparkles, RotateCcw, QrCode, Music, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireCelebrationBarrage } from '../utils/confetti';
import { QRCodeModal } from './QRCodeModal';

interface Step7FinalScreenProps {
  onRestart: () => void;
}

export const Step7FinalScreen: React.FC<Step7FinalScreenProps> = ({ onRestart }) => {
  const [showQR, setShowQR] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  useEffect(() => {
    // Fire celebration barrage on landing
    fireCelebrationBarrage();
    sounds.playCelebration();

    // Ensure music is playing softly
    if (!sounds.getIsMusicPlaying()) {
      sounds.startMusic();
    }
    setIsMusicPlaying(!sounds.getIsMuted());
  }, []);

  const handleToggleMusic = () => {
    const active = sounds.toggleMusic();
    setIsMusicPlaying(active);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4 relative z-10 py-8">
      <div className="max-w-xl w-full bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-10 border-2 border-pink-200/90 shadow-2xl shadow-pink-200/60 animate-scale-up relative">
        {/* Soft magical background aura */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 via-rose-300 to-purple-300 rounded-3xl blur-xl opacity-30 -z-1 animate-pulse-glow" />

        {/* Celebration Badges */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl animate-bounce">✨</span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '150ms' }}>
            🌷
          </span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '300ms' }}>
            🎉
          </span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '450ms' }}>
            🌷
          </span>
          <span className="text-2xl animate-bounce" style={{ animationDelay: '600ms' }}>
            ✨
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-pink-500 tracking-tight leading-snug mb-2">
          YOU HAVE RECEIVED YOUR SURPRISE! ❤️
        </h1>

        {/* Subheading */}
        <div className="inline-block px-5 py-2 rounded-2xl bg-gradient-to-r from-pink-50 to-rose-50 border border-pink-200 mb-6 shadow-xs">
          <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold">
            Happy Birthday Once Again, My Pariiii! 🎂
          </p>
        </div>

        {/* Birthday Cake Display */}
        <div className="my-4 flex justify-center">
          <div className="relative p-4 rounded-3xl bg-gradient-to-b from-pink-50/60 to-rose-50/40 border border-pink-100 flex items-center justify-center shadow-inner">
            <div className="text-6xl sm:text-7xl animate-float">🎂</div>
            <div className="absolute -top-2 -left-2 text-2xl animate-twinkle">✨</div>
            <div className="absolute -bottom-1 -right-1 text-2xl animate-float-reverse">🌷</div>
          </div>
        </div>

        {/* Emotional Message Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#FFF9FA] border border-pink-100 text-slate-700 space-y-4 mb-6 shadow-xs text-sm sm:text-base leading-relaxed text-balance">
          <p className="font-medium text-pink-900">
            I hope this little surprise brought a smile to your face.
          </p>
          <p className="font-medium">
            Stay happy, stay blessed, and keep smiling.
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 leading-snug">
            "May Allah always protect you and give you everything your heart wishes for."
          </p>
          <p className="text-slate-600 font-medium pt-1">
            Thank you for being a special part of my life. ❤️
          </p>
        </div>

        {/* Action Controls: Music, Replay & QR Code */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          {/* Music Control */}
          <button
            onClick={handleToggleMusic}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-100/80 hover:bg-pink-200 text-pink-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-pink-600" />
                <span>Music: On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-pink-400" />
                <span>Music: Muted</span>
              </>
            )}
          </button>

          {/* Trigger Confetti Fireworks */}
          <button
            onClick={() => {
              fireCelebrationBarrage();
              sounds.playCelebration();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-100/80 hover:bg-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>More Confetti! 🎉</span>
          </button>

          {/* Share QR Code */}
          <button
            onClick={() => setShowQR(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-100/80 hover:bg-purple-200 text-purple-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>Get QR Code 📲</span>
          </button>

          {/* Replay Complete Journey */}
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Experience ↺</span>
          </button>
        </div>

        {/* Creator signature */}
        <div className="pt-4 border-t border-pink-100 flex flex-col items-center">
          <p className="font-handwriting text-2xl sm:text-3xl text-pink-600 font-bold flex items-center gap-2">
            <span>Made with lots of care by Noman</span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500 inline" />
          </p>
          <p className="text-[11px] text-pink-400/80 mt-1 font-medium">
            Forever your friend · Happy Birthday Safa (Pariii)
          </p>
        </div>
      </div>

      {/* QR Code Modal */}
      <QRCodeModal isOpen={showQR} onClose={() => setShowQR(false)} />
    </div>
  );
};
