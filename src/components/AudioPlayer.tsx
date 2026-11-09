import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sounds } from '../utils/audio';

interface AudioPlayerProps {
  autoStartOnInteraction?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Keep in sync
    const checkState = () => {
      setIsPlaying(sounds.getIsMusicPlaying() && !sounds.getIsMuted());
    };
    const interval = setInterval(checkState, 500);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = () => {
    const active = sounds.toggleMusic();
    setIsPlaying(active);
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <button
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
        className={`group relative flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-md backdrop-blur-md border ${
          isPlaying
            ? 'bg-pink-500/90 text-white border-pink-300 shadow-pink-300/40 hover:bg-pink-600'
            : 'bg-white/80 text-pink-700 border-pink-200/80 hover:bg-pink-50 shadow-pink-100'
        }`}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3.5">
              <span className="w-0.5 bg-white rounded-full animate-bounce h-2" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce h-3.5" style={{ animationDelay: '150ms' }} />
              <span className="w-0.5 bg-white rounded-full animate-bounce h-2.5" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="hidden sm:inline">Music Playing</span>
            <Volume2 className="w-4 h-4" />
          </>
        ) : (
          <>
            <Music className="w-3.5 h-3.5 text-pink-500 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Play Melody</span>
            <VolumeX className="w-4 h-4 text-pink-400" />
          </>
        )}
      </button>
    </div>
  );
};
