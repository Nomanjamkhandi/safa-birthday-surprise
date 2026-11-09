import React, { useState, useEffect } from 'react';
import { StepNumber } from './types';
import { TulipPetals } from './components/TulipPetals';
import { AudioPlayer } from './components/AudioPlayer';
import { ProgressBar } from './components/ProgressBar';
import { Step1Welcome } from './components/Step1Welcome';
import { Step2Password } from './components/Step2Password';
import { Step3BalloonPop } from './components/Step3BalloonPop';
import { Step4GiftBoxes } from './components/Step4GiftBoxes';
import { Step5Letters } from './components/Step5Letters';
import { Step6CakeCutting } from './components/Step6CakeCutting';
import { Step7FinalScreen } from './components/Step7FinalScreen';
import { QrCode } from 'lucide-react';
import { QRCodeModal } from './components/QRCodeModal';

export default function App() {
  const [currentStep, setCurrentStep] = useState<StepNumber>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safa_birthday_step');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 7) return num as StepNumber;
      }
    }
    return 1;
  });

  const [maxUnlockedStep, setMaxUnlockedStep] = useState<StepNumber>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safa_birthday_max_step');
      if (saved) {
        const num = parseInt(saved, 10);
        if (num >= 1 && num <= 7) return num as StepNumber;
      }
    }
    return 1;
  });

  const [showGlobalQR, setShowGlobalQR] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('safa_birthday_step', currentStep.toString());
    if (currentStep > maxUnlockedStep) {
      setMaxUnlockedStep(currentStep);
      localStorage.setItem('safa_birthday_max_step', currentStep.toString());
    }
  }, [currentStep, maxUnlockedStep]);

  const goToStep = (step: StepNumber) => {
    setCurrentStep(step);
    if (step > maxUnlockedStep) {
      setMaxUnlockedStep(step);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    localStorage.removeItem('safa_birthday_step');
    localStorage.removeItem('safa_birthday_max_step');
    setMaxUnlockedStep(1);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FFF0F4] to-[#FDF2F8] relative overflow-hidden flex flex-col justify-between selection:bg-pink-200">
      {/* Ambient background particles (Petals, hearts, stars) */}
      <TulipPetals />

      {/* Top Header Bar */}
      <header className="relative z-40 w-full px-4 pt-3 pb-2 flex items-center justify-between">
        {/* Brand Kicker */}
        <div className="flex items-center gap-2">
          <span className="font-handwriting text-2xl sm:text-3xl font-bold text-pink-600 tracking-wide drop-shadow-xs">
            Safa (Pariii)
          </span>
          <span className="hidden sm:inline-block text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-medium">
            Birthday Edition ✨
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGlobalQR(true)}
            title="Share & QR Code"
            className="p-2 rounded-full bg-white/80 hover:bg-pink-50 border border-pink-200 text-pink-600 shadow-xs transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
          </button>
          <AudioPlayer />
        </div>
      </header>

      {/* Progress Track */}
      <nav aria-label="Surprise Journey Progress" className="relative z-30">
        <ProgressBar
          currentStep={currentStep}
          maxUnlockedStep={maxUnlockedStep}
          onSelectStep={(step) => goToStep(step)}
        />
      </nav>

      {/* Main Content Area based on current step */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-20 px-2 py-4">
        {currentStep === 1 && <Step1Welcome onNext={() => goToStep(2)} />}
        {currentStep === 2 && <Step2Password onSuccess={() => goToStep(3)} />}
        {currentStep === 3 && <Step3BalloonPop onNext={() => goToStep(4)} />}
        {currentStep === 4 && <Step4GiftBoxes onNext={() => goToStep(5)} />}
        {currentStep === 5 && <Step5Letters onNext={() => goToStep(6)} />}
        {currentStep === 6 && <Step6CakeCutting onNext={() => goToStep(7)} />}
        {currentStep === 7 && <Step7FinalScreen onRestart={handleRestart} />}
      </main>

      {/* Quiet Footer */}
      <footer className="relative z-30 py-3 text-center text-xs text-pink-400/80 font-medium border-t border-pink-100/60 bg-white/30 backdrop-blur-xs">
        <span>Designed with care for Pariii ❤️</span>
      </footer>

      {/* Global QR Code Modal */}
      <QRCodeModal isOpen={showGlobalQR} onClose={() => setShowGlobalQR(false)} />
    </div>
  );
}
