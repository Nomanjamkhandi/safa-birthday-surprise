import React, { useState } from 'react';
import { LetterId } from '../types';
import { Mail, Sparkles, Heart, ArrowRight, X, Lock } from 'lucide-react';
import { sounds } from '../utils/audio';
import { fireGiftBoxConfetti } from '../utils/confetti';

interface Step5LettersProps {
  onNext: () => void;
}

export const Step5Letters: React.FC<Step5LettersProps> = ({ onNext }) => {
  const [jkRead, setJkRead] = useState(false);
  const [nomanRead, setNomanRead] = useState(false);
  const [openedLetter, setOpenedLetter] = useState<LetterId | null>(null);
  const [showTeaseModal, setShowTeaseModal] = useState(false);

  const bothLettersRead = jkRead && nomanRead;

  const handleSelectLetter = (id: LetterId) => {
    if (id === 'noman') {
      if (!jkRead) {
        // Teasing logic triggered!
        sounds.playSparkle();
        setShowTeaseModal(true);
        return;
      }
      // Allowed to open Noman's letter
      sounds.playSparkle();
      fireGiftBoxConfetti(0.5, 0.5);
      setOpenedLetter('noman');
      setNomanRead(true);
    } else if (id === 'jung-kook') {
      sounds.playSparkle();
      fireGiftBoxConfetti(0.5, 0.5);
      setOpenedLetter('jung-kook');
      setJkRead(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[82vh] text-center px-4 relative z-10 py-6">
      {/* Header */}
      <div className="mb-6 max-w-md w-full">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Heartfelt Envelopes</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-800 tracking-tight mb-2">
          Two Special Letters 💌
        </h1>
        <p className="text-slate-600 text-sm font-medium">
          Choose only ONE letter... You can open only one first! 🤫
        </p>
      </div>

      {/* Two Envelope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full mb-8">
        {/* Jung Kook's Letter */}
        <div
          onClick={() => handleSelectLetter('jung-kook')}
          className={`relative cursor-pointer group rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
            jkRead
              ? 'bg-purple-50/90 border-purple-300 shadow-md'
              : 'bg-white/90 border-purple-200 shadow-xl shadow-purple-100/50 hover:-translate-y-2 hover:shadow-2xl hover:border-purple-300 active:scale-98'
          }`}
        >
          {/* BTS Purple Accents */}
          <div className="relative mx-auto w-28 h-24 mb-4 flex items-center justify-center">
            {/* Envelope Envelope Art */}
            <div className="w-24 h-16 bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 rounded-lg shadow-md border border-purple-200 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              {/* Envelope flap */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-purple-300/40 clip-triangle" />
              <Mail className="w-7 h-7 text-purple-600" />
            </div>
            {/* BTS Heart Emblem */}
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs shadow-sm">
              💜
            </div>
          </div>

          <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            Special Guest Message
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Jung Kook's Letter
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            A sweet birthday greeting straight from the star!
          </p>

          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
              jkRead ? 'bg-purple-200 text-purple-800' : 'bg-purple-100 text-purple-700'
            }`}
          >
            {jkRead ? 'Read Again 💜' : 'Open Letter ✉️'}
          </span>
        </div>

        {/* Noman's Letter */}
        <div
          onClick={() => handleSelectLetter('noman')}
          className={`relative cursor-pointer group rounded-3xl p-6 sm:p-8 transition-all duration-300 border ${
            nomanRead
              ? 'bg-rose-50/90 border-pink-300 shadow-md'
              : jkRead
              ? 'bg-white/95 border-pink-300 shadow-xl shadow-pink-200/50 ring-2 ring-pink-300/60 hover:-translate-y-2 hover:shadow-2xl'
              : 'bg-white/70 border-pink-100 shadow-md hover:-translate-y-1'
          }`}
        >
          {/* Lock badge if JK not read yet */}
          {!jkRead && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 text-[11px] font-semibold">
              <Lock className="w-3 h-3" />
              <span>Secret</span>
            </div>
          )}

          <div className="relative mx-auto w-28 h-24 mb-4 flex items-center justify-center">
            {/* Envelope Art */}
            <div className="w-24 h-16 bg-gradient-to-br from-pink-300 via-rose-200 to-pink-200 rounded-lg shadow-md border border-pink-300 relative overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <Mail className="w-7 h-7 text-rose-600" />
            </div>
            {/* Heart Seal */}
            <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs shadow-sm">
              ❤️
            </div>
          </div>

          <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
            From The Best Friend
          </p>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-2">
            Noman's Letter
          </h2>
          <p className="text-xs text-slate-500 mb-3">
            Handwritten with lots of care, heartfelt words & care.
          </p>

          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold ${
              nomanRead
                ? 'bg-rose-200 text-rose-800'
                : jkRead
                ? 'bg-pink-500 text-white animate-pulse'
                : 'bg-pink-100 text-pink-700'
            }`}
          >
            {nomanRead ? 'Read Again ❤️' : jkRead ? 'Unlocked! Open Now 💌' : 'Locked 🤫'}
          </span>
        </div>
      </div>

      {/* Progress & Next Step */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => {
            if (bothLettersRead) {
              sounds.playSparkle();
              onNext();
            }
          }}
          disabled={!bothLettersRead}
          className={`flex items-center gap-2 px-8 py-3.5 rounded-2xl font-semibold text-base transition-all duration-300 ${
            bothLettersRead
              ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-400/40 hover:shadow-pink-500/60 hover:scale-105 active:scale-95 cursor-pointer'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
          }`}
        >
          <span>Time For Birthday Cake! 🎂</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {!bothLettersRead && (
          <p className="text-xs text-slate-500">
            {!jkRead
              ? 'Read Jung Kook’s letter first to unlock Noman’s heartfelt letter!'
              : 'Now read Noman’s letter to proceed to the cake!'}
          </p>
        )}
      </div>

      {/* TEASING MODAL: When she clicks Noman's letter FIRST */}
      {showTeaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 border border-pink-300 shadow-2xl text-center animate-scale-up">
            <button
              onClick={() => setShowTeaseModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl">
              😂
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800 mb-3">
              Wait a second, Pariii!
            </h3>

            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 text-slate-700 text-base leading-relaxed mb-6 font-medium">
              "Pariii, tumne pehle mera letter open kiya? Mujhe yakeen hi nahi ho raha! 😂 Lekin tumhara birthday hai... jaao pehle JK ka letter padh ke aao!"
            </div>

            <button
              onClick={() => {
                setShowTeaseModal(false);
                handleSelectLetter('jung-kook');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm shadow-md shadow-purple-300 hover:opacity-95 cursor-pointer"
            >
              Okay, Open JK's Letter First 💜
            </button>
          </div>
        </div>
      )}

      {/* JUNG KOOK'S LETTER MODAL */}
      {openedLetter === 'jung-kook' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#FAF5FF] rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-2xl text-left max-h-[90vh] flex flex-col animate-scale-up">
            {/* Header of Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-200 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💜</span>
                <div>
                  <h3 className="font-display font-bold text-purple-950 text-lg">
                    Jung Kook's Letter
                  </h3>
                  <p className="text-xs text-purple-600 font-medium">From Seoul with Love</p>
                </div>
              </div>
              <button
                onClick={() => setOpenedLetter(null)}
                className="p-1.5 rounded-full text-purple-400 hover:text-purple-700 hover:bg-purple-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Letter Content - Scrollable */}
            <div className="overflow-y-auto no-scrollbar flex-1 pr-2 space-y-4">
              {/* Paper styled block */}
              <div className="bg-white/90 rounded-2xl p-6 shadow-sm border border-purple-100 relative">
                <div className="font-letter-body text-xl sm:text-2xl text-purple-900 leading-relaxed space-y-4">
                  <p>Hi Safa! Ohh sorry, Noman ne mujhe Pari bulane bola hai. 😂</p>
                  <p className="font-bold text-purple-800">Haan, Hi Parriiii! ❤️</p>
                  <p>From all of us in BTS, Happy Birthday! May God bless you.</p>
                  <p>Aur haan, tum jaldi milne wali ho hum sab se, toh apna khayal rakhna.</p>
                  <p className="italic">Aur Noman jo bolta hai, woh sunna!</p>
                  <p className="pt-2 font-bold">Thank you! 💜</p>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-xs text-purple-400 italic">
                  <span>With BTS Love 🎵</span>
                  <span>- JK</span>
                </div>
              </div>

              {/* Disclaimer Note */}
              <p className="text-[11px] text-purple-600/70 text-center italic bg-purple-100/60 p-2.5 rounded-xl border border-purple-200/50">
                NOTE: This is a fictional fan-style birthday letter, not an actual message from Jung Kook or BTS.
              </p>
            </div>

            {/* Done Reading button */}
            <div className="pt-4 mt-2 border-t border-purple-200">
              <button
                onClick={() => {
                  setOpenedLetter(null);
                  setJkRead(true);
                  sounds.playSparkle();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-sm shadow-md shadow-purple-300 hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Done Reading 💜 Unlock Noman's Letter</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOMAN'S LETTER MODAL - Handwritten Cream Paper */}
      {openedLetter === 'noman' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#FFFBF0] rounded-3xl p-6 sm:p-8 border-2 border-amber-200/80 shadow-2xl text-left max-h-[92vh] flex flex-col animate-scale-up">
            {/* Top Close & Stamp */}
            <div className="flex items-center justify-between pb-3 border-b border-amber-200/60 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌷</span>
                <div>
                  <h3 className="font-display font-bold text-amber-950 text-lg">
                    Noman's Birthday Letter
                  </h3>
                  <p className="text-xs text-amber-700/80 font-medium">To My Dearest Pariii</p>
                </div>
              </div>

              {/* Postage Stamp Illustration */}
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-white border border-dashed border-rose-300 rounded text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                  Postage: LOVE
                </div>
                <button
                  onClick={() => setOpenedLetter(null)}
                  className="p-1.5 rounded-full text-amber-700 hover:text-amber-950 hover:bg-amber-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Handwritten Paper Body */}
            <div className="overflow-y-auto no-scrollbar flex-1 pr-1 space-y-4">
              <div className="bg-[#FFFDF6] rounded-2xl p-5 sm:p-7 shadow-sm border border-amber-200/50 relative">
                {/* Lined paper texture styling */}
                <div className="font-letter-body text-xl sm:text-2xl text-slate-800 leading-relaxed space-y-4">
                  <p className="text-rose-600 font-bold">Hi Parriiii! ❤️</p>

                  <p className="font-bold">Happy Birthday! 🎂</p>

                  <p>
                    First of all, Allah Ta'ala tumhe har cheez se nawaze, tumhari zindagi mein kisi bhi cheez ki kami na hone de.
                  </p>

                  <p>
                    Aur jo tumhara future mein aim hai, woh poora ho. Success mile. Ameen.
                  </p>

                  <p>
                    Aur ye tum khoobsurat ho, achhi ho, ye toh sab hi bolte hain. Chhodo, woh toh hai hi tum mein.
                  </p>

                  <p>
                    Main bolun toh tumhari aadatein achhi hain, tumhare akhlaaq achhe hain. So I'm grateful to have such a friend like you. 🤧
                  </p>

                  <p>
                    Aur mehnat jo lagi hai tumhare friend tak ka safar karne mein! 😂
                  </p>

                  <p>
                    Beech beech mein hamare beech bahut saari situations aisi aayi jaise hum alag hi ho jaayenge, lekin hamari friendship itni strong thi ki humein alag hi nahi hone diya. 🤧
                  </p>

                  <p className="bg-rose-50/60 p-3 rounded-xl border-l-2 border-rose-400 font-semibold text-rose-700">
                    So, badaam khao, paani piyo, fruits khao.
                  </p>

                  <p>
                    Jab tak zinda hoon, tumhari fikr karta rahunga aur bolta rahunga.
                  </p>

                  <p className="text-rose-600 font-bold text-2xl">
                    So Happy Birthday, Parriiii! Sorry, meri Pari. ❤️
                  </p>

                  <p>Enjoy your day!</p>

                  <p className="font-bold text-rose-600 text-2xl pt-2">
                    Thank You! ❤️
                  </p>
                </div>

                {/* Decorative handwritten signature */}
                <div className="mt-6 pt-4 border-t border-amber-200/70 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-rose-500 text-sm font-handwriting font-bold">
                    <span>Forever Your Best Friend,</span>
                    <span>Noman</span>
                  </div>
                  <span className="text-xl">🌷</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-4 mt-2 border-t border-amber-200/60">
              <button
                onClick={() => {
                  setOpenedLetter(null);
                  setNomanRead(true);
                  sounds.playSparkle();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-md shadow-pink-300 hover:opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Keep in Heart ❤️ Proceed to Birthday Cake</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
