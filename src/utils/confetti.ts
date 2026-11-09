import confetti from 'canvas-confetti';

const PASTEL_COLORS = ['#F472B6', '#FB7185', '#FDA4AF', '#FBCFE8', '#C084FC', '#E879F9', '#FDE047', '#FFFFFF'];

export function fireBalloonPopConfetti(originX = 0.5, originY = 0.45) {
  // Center burst
  confetti({
    particleCount: 80,
    spread: 90,
    origin: { x: originX, y: originY },
    colors: PASTEL_COLORS,
    startVelocity: 35,
    ticks: 250,
  });

  // Small heart-like shape burst
  setTimeout(() => {
    confetti({
      particleCount: 45,
      angle: 60,
      spread: 70,
      origin: { x: originX - 0.1, y: originY },
      colors: ['#F43F5E', '#EC4899', '#FDA4AF'],
      scalar: 1.2,
    });
    confetti({
      particleCount: 45,
      angle: 120,
      spread: 70,
      origin: { x: originX + 0.1, y: originY },
      colors: ['#F43F5E', '#EC4899', '#FDA4AF'],
      scalar: 1.2,
    });
  }, 100);
}

export function fireGiftBoxConfetti(originX = 0.5, originY = 0.5) {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { x: originX, y: originY },
    colors: ['#F472B6', '#E879F9', '#FDE047', '#FFFFFF'],
    startVelocity: 25,
    ticks: 180,
    scalar: 0.9,
  });
}

export function fireCakeCutConfetti() {
  confetti({
    particleCount: 60,
    spread: 80,
    origin: { x: 0.5, y: 0.55 },
    colors: ['#FDA4AF', '#F472B6', '#C084FC', '#FEE2E2', '#FEF08A'],
    startVelocity: 32,
    ticks: 200,
  });
}

export function fireCelebrationBarrage() {
  const duration = 3.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // Left side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.1, y: Math.random() * 0.4 + 0.3 },
      colors: PASTEL_COLORS,
    });
    // Right side burst
    confetti({
      ...defaults,
      particleCount,
      origin: { x: Math.random() * 0.3 + 0.6, y: Math.random() * 0.4 + 0.3 },
      colors: PASTEL_COLORS,
    });
  }, 250);
}
