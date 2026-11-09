import React, { useState } from 'react';
import { GiftItem } from '../types';
import { ArrowRight, Sparkles, Heart, Check, X } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireGiftBoxConfetti } from '../utils/confetti';

interface Step4GiftBoxesProps {
  onNext: () => void;
}

const INITIAL_GIFTS: GiftItem[] = [
  {
    id: 1,
    title: 'Gift 1',
    emoji: '💖',
    boxColor: 'from-pink-400 to-rose-400',
    ribbonColor: '#FDE047',
    message: "You're my special person btw. ❤️",
    opened: false,
  },
  {
    id: 2,
    title: 'Gift 2',
    emoji: '🤲',
    boxColor: 'from-rose-400 to-pink-500',
    ribbonColor: '#FFFFFF',
    message: 'Allah tumhe zindagi ke har mod pe kamiyabi, khushiyan, sukoon aur achhi sehat ata farmaye. Ameen.',
    opened: false,
  },
  {
    id: 3,
    title: 'Gift 3',
    emoji: '🌸',
    boxColor: 'from-purple-400 to-pink-400',
    ribbonColor: '#FDE047',
    message: 'Allah ki rehmat hamesha tumhare saath rahe. ❤️',
    opened: false,
  },
  {
    id: 4,
    title: 'Gift 4',
    emoji: '🤧',
    boxColor: 'from-pink-500 to-rose-500',
    ribbonColor: '#FFFFFF',
    message:
      'Tumhari jaisi best friend milna... best friend hi bolu kya? 🤧 Chhodo, wohi achha lagta hai tumhe... Haan, milna bahut khushnaseeb hai mere liye.',
    opened: false,
  },
];

export const Step4GiftBoxes: React.FC<Step4GiftBoxesProps> = ({ onNext }) => {
  const [gifts, setGifts] = useState<GiftItem[]>(INITIAL_GIFTS);
  const [activeGiftModal, setActiveGiftModal] = useState<GiftItem | null>(null);

  const openedCount = gifts.filter((g) => g.opened).length;
  const allOpened = openedCount === 4;

  const handleOpenBox = (gift: GiftItem, e?: React.MouseEvent) => {
    sounds.playSparkle();
    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.5;
    fireGiftBoxConfetti(x, y);

    setGifts((prev) =>
      prev.map((g) => (g.id === gift.id ? { ...g, opened: true } : g))
    );

    setActiveGiftModal({ ...gift, opened: true });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-6">
      {/* Header Info */}
      <div className="mb-6 max-w-md w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Little Tokens of Affection</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-2">
          Four Little Gifts For You 🎁
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          Tap to Open Your Gifts ({openedCount}/4 Opened)
        </p>
      </div>

      {/* 2x2 Grid of Gift Boxes */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-3xl w-full mb-8">
        {gifts.map((gift) => {
          return (
            <div
              key={gift.id}
              onClick={(e) => handleOpenBox(gift, e)}
              className={`relative cursor-pointer group rounded-3xl p-5 sm:p-6 transition-all duration-300 border ${
                gift.opened
                  ? 'bg-white/90 border-pink-300 shadow-md scale-98'
                  : 'bg-white/80 border-pink-100 shadow-lg shadow-pink-100/60 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-pink-200/50 active:scale-95'
              }`}
            >
              {/* Opened Checkmark Indicator */}
              {gift.opened && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Gift Box Graphic */}
              <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center my-2">
                {gift.opened ? (
                  // Open Gift Visual
                  <div className="relative flex flex-col items-center animate-scale-up">
                    <div className="text-4xl mb-1">{gift.emoji}</div>
                    <div className="w-16 h-12 rounded-xl bg-gradient-to-tr from-pink-100 to-rose-100 border border-pink-300 flex items-center justify-center text-xs font-bold text-pink-600 shadow-inner">
                      Opened ❤️
                    </div>
                  </div>
                ) : (
                  // Closed Gift Box with animated lid and ribbon
                  <div className="relative flex flex-col items-center group-hover:scale-105 transition-transform">
                    {/* Ribbon Bow on top */}
                    <div className="relative z-20 flex items-center justify-center -mb-1">
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-300 bg-yellow-200 shadow-xs -mr-1" />
                      <div className="w-4 h-4 rounded-full border-2 border-yellow-300 bg-yellow-200 shadow-xs -ml-1" />
                    </div>

                    {/* Box Lid */}
                    <div
                      className={`w-20 sm:w-22 h-6 rounded-t-lg bg-gradient-to-r ${gift.boxColor} shadow-md relative z-10 flex items-center justify-center border-t border-white/40 group-hover:-translate-y-1 transition-transform`}
                    >
                      <div className="w-3 h-full bg-yellow-300/80 shadow-xs" />
                    </div>

                    {/* Box Base */}
                    <div
                      className={`w-18 sm:w-20 h-14 sm:h-16 rounded-b-xl bg-gradient-to-b ${gift.boxColor} shadow-lg relative flex items-center justify-center border-b-2 border-black/10`}
                    >
                      {/* Vertical Ribbon */}
                      <div className="w-3 h-full bg-yellow-300/80 shadow-xs" />
                      {/* Horizontal Ribbon */}
                      <div className="absolute w-full h-3 bg-yellow-300/80 shadow-xs" />
                      {/* Center Bow Knot */}
                      <div className="absolute w-4 h-4 rounded-full bg-yellow-300 shadow-sm" />
                    </div>
                  </div>
                )}
              </div>

              {/* Title and prompt */}
              <h3 className="font-display font-semibold text-base sm:text-lg text-slate-800 mb-1">
                {gift.title}
              </h3>
              <p className="text-xs text-pink-500 font-medium">
                {gift.opened ? 'Tap to view note' : 'Tap to unwrap ✨'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Next Button — enabled only when all 4 are opened */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => {
            if (allOpened) {
              sounds.playSparkle();
              onNext();
            }
          }}
          disabled={!allOpened}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-base transition-all duration-300 ${
            allOpened
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-400/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Read Two Special Letters 💌</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!allOpened && (
          <p className="text-xs text-slate-500">
            Please unwrap all 4 gifts above to unlock the letters!
          </p>
        )}
      </div>

      {/* Gift Message Modal */}
      {activeGiftModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-pink-200 shadow-2xl text-center animate-scale-up">
            {/* Close Button */}
            <button
              onClick={() => setActiveGiftModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gift Icon Badge */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-100 to-rose-100 flex items-center justify-center text-3xl mb-4 shadow-inner">
              {activeGiftModal.emoji}
            </div>

            <p className="text-xs uppercase tracking-wider text-pink-500 font-bold mb-1">
              {activeGiftModal.title}
            </p>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-4">
              A Special Thought For You
            </h3>

            {/* Message with heartfelt handwriting font or warm block */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-pink-50/80 to-rose-50/50 border border-pink-100 mb-6 shadow-xs">
              <p className="font-handwriting text-2xl sm:text-3xl text-pink-700 leading-relaxed">
                "{activeGiftModal.message}"
              </p>
            </div>

            <button
              onClick={() => setActiveGiftModal(null)}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-300 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
            >
              Keep This Close To Heart ❤️
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
