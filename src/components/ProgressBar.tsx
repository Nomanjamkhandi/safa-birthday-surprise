import React from 'react';
import { StepNumber } from '../types';
import { Heart, Sparkles, Gift, Mail, Cake, PartyPopper, KeyRound } from 'lucide-react';

interface ProgressBarProps {
  currentStep: StepNumber;
  maxUnlockedStep: StepNumber;
  onSelectStep?: (step: StepNumber) => void;
}

const STEP_CONFIG: Array<{ step: StepNumber; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { step: 1, label: 'Welcome', icon: Heart },
  { step: 2, label: 'Secret', icon: KeyRound },
  { step: 3, label: 'Surprise', icon: Sparkles },
  { step: 4, label: 'Gifts', icon: Gift },
  { step: 5, label: 'Letters', icon: Mail },
  { step: 6, label: 'Cake', icon: Cake },
  { step: 7, label: 'Finale', icon: PartyPopper },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, maxUnlockedStep, onSelectStep }) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-2 z-40">
      <div className="flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-pink-200/70 rounded-full -z-1" />
        
        {/* Active connector progress */}
        <div
          className="absolute left-3 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-500 -z-1"
          style={{
            width: `${((Math.max(1, currentStep) - 1) / (STEP_CONFIG.length - 1)) * 95}%`,
          }}
        />

        {STEP_CONFIG.map(({ step, label, icon: Icon }) => {
          const isCurrent = step === currentStep;
          const isPassed = step < currentStep;
          const isUnlocked = step <= maxUnlockedStep;

          return (
            <button
              key={step}
              onClick={() => {
                if (isUnlocked && onSelectStep) {
                  onSelectStep(step);
                }
              }}
              disabled={!isUnlocked}
              title={label}
              className={`relative flex flex-col items-center group transition-all duration-300 ${
                isUnlocked ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              <div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                  isCurrent
                    ? 'bg-pink-500 text-white border-pink-300 ring-4 ring-pink-200/60 scale-110 shadow-md'
                    : isPassed
                    ? 'bg-rose-400 text-white border-rose-300 shadow-sm'
                    : 'bg-white text-pink-300 border-pink-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span
                className={`text-[10px] mt-1 font-medium transition-colors hidden sm:block ${
                  isCurrent ? 'text-pink-600 font-semibold' : isPassed ? 'text-rose-500' : 'text-pink-300'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
