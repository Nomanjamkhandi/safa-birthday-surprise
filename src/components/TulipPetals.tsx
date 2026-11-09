import React, { useMemo } from 'react';

// Soft, beautiful tulip petals and hearts background overlay
export const TulipPetals: React.FC = () => {
  // Generate stable random items
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.6 + (i % 3) * 2.5) % 96 + 2}%`,
      delay: `${(i * 0.7) % 6}s`,
      duration: `${7 + (i % 5) * 1.5}s`,
      size: 16 + (i % 4) * 5,
      rotation: (i * 37) % 360,
      opacity: 0.35 + (i % 3) * 0.15,
      type: i % 3 === 0 ? 'tulip' : i % 3 === 1 ? 'petal' : 'heart',
    }));
  }, []);

  const stars = useMemo(() => {
    return Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      top: `${(i * 7.2) % 90 + 5}%`,
      left: `${(i * 9.1) % 92 + 4}%`,
      delay: `${(i * 0.4) % 3}s`,
      size: 8 + (i % 3) * 4,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft gradient background glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-purple-200/30 blur-3xl" />

      {/* Floating stars */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className="absolute animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-pink-300 drop-shadow-sm">
            <path
              d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"
              fill="currentColor"
              opacity={0.7}
            />
          </svg>
        </div>
      ))}

      {/* Falling Tulip Petals & Hearts */}
      {petals.map((item) => (
        <div
          key={`petal-${item.id}`}
          className="absolute"
          style={{
            left: item.left,
            top: '-50px',
            animation: `petalDrift ${item.duration} linear infinite`,
            animationDelay: item.delay,
            opacity: item.opacity,
          }}
        >
          {item.type === 'tulip' ? (
            // Tulip Blossom Silhouette
            <svg
              width={item.size * 1.2}
              height={item.size * 1.3}
              viewBox="0 0 36 40"
              fill="none"
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="drop-shadow-sm text-pink-400"
            >
              {/* Petal center */}
              <path
                d="M18 4C14 12 11 20 18 30C25 20 22 12 18 4Z"
                fill="url(#tulip-grad-1)"
              />
              {/* Left petal */}
              <path
                d="M16 6C10 11 6 20 13 29C10 24 10 14 16 6Z"
                fill="url(#tulip-grad-2)"
              />
              {/* Right petal */}
              <path
                d="M20 6C26 11 30 20 23 29C26 24 26 14 20 6Z"
                fill="url(#tulip-grad-2)"
              />
              <defs>
                <linearGradient id="tulip-grad-1" x1="18" y1="4" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F43F5E" />
                  <stop offset="1" stopColor="#FDA4AF" />
                </linearGradient>
                <linearGradient id="tulip-grad-2" x1="18" y1="6" x2="18" y2="29" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FB7185" />
                  <stop offset="1" stopColor="#FECDD3" />
                </linearGradient>
              </defs>
            </svg>
          ) : item.type === 'heart' ? (
            // Floating Heart
            <svg
              width={item.size}
              height={item.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-pink-400/80 drop-shadow-sm"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            // Curved Rose/Tulip Single Petal
            <svg
              width={item.size}
              height={item.size * 1.1}
              viewBox="0 0 30 34"
              fill="none"
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="drop-shadow-xs"
            >
              <path
                d="M15 2C7 8 5 20 15 32C25 20 23 8 15 2Z"
                fill="#F472B6"
                fillOpacity="0.75"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
