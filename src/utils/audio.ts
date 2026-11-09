// Web Audio API synthesizer for interactive sounds and soft music-box melodies
// Completely self-contained, no external mp3 dependencies, 100% reliable across browsers.

class SoundManager {
  private ctx: AudioContext | null = null;
  private musicPlaying = false;
  private musicInterval: number | null = null;
  private isMuted = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.musicPlaying) {
      this.stopMusic();
      this.musicPlaying = false;
    }
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsMusicPlaying(): boolean {
    return this.musicPlaying;
  }

  // Balloon Pop Sound (instant frequency drop + noise envelope)
  public playPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.8, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.14);

      // Add white noise burst for snappy latex pop
      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.5, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      noise.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
    } catch {
      // Audio autoplay policy fallback
    }
  }

  // Magic Sparkle / Gift Open Chime
  public playSparkle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.45);
      });
    } catch {}
  }

  // Cake Slice Sweet Sound
  public playSlice() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {}
  }

  // Celebratory Chime
  public playCelebration() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99],       // C
        [587.33, 739.99, 880.00],       // D
        [659.25, 830.61, 987.77],       // E
        [1046.50, 1318.51, 1567.98]     // High C Major
      ];

      chords.forEach((chord, i) => {
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.14);

          gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.14);
          gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.14 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.14 + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + i * 0.14);
          osc.stop(ctx.currentTime + i * 0.14 + 0.65);
        });
      });
    } catch {}
  }

  // Soft Music-Box Birthday Melody
  public startMusic() {
    if (this.musicPlaying || this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    this.musicPlaying = true;

    // Happy birthday melody notes & duration (seconds)
    // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392, A4=440, B4=493.88, C5=523.25
    const melody: Array<{ note: number; dur: number }> = [
      { note: 261.63, dur: 0.35 },
      { note: 261.63, dur: 0.25 },
      { note: 293.66, dur: 0.6 },
      { note: 261.63, dur: 0.6 },
      { note: 349.23, dur: 0.6 },
      { note: 329.63, dur: 1.1 },

      { note: 261.63, dur: 0.35 },
      { note: 261.63, dur: 0.25 },
      { note: 293.66, dur: 0.6 },
      { note: 261.63, dur: 0.6 },
      { note: 392.00, dur: 0.6 },
      { note: 349.23, dur: 1.1 },

      { note: 261.63, dur: 0.35 },
      { note: 261.63, dur: 0.25 },
      { note: 523.25, dur: 0.6 },
      { note: 440.00, dur: 0.6 },
      { note: 349.23, dur: 0.6 },
      { note: 329.63, dur: 0.6 },
      { note: 293.66, dur: 1.0 },

      { note: 466.16, dur: 0.35 },
      { note: 466.16, dur: 0.25 },
      { note: 440.00, dur: 0.6 },
      { note: 349.23, dur: 0.6 },
      { note: 392.00, dur: 0.6 },
      { note: 349.23, dur: 1.4 },
    ];

    let noteIdx = 0;
    const playNextNote = () => {
      if (!this.musicPlaying || this.isMuted) return;
      const current = melody[noteIdx];
      const now = ctx.currentTime;

      // Soft music box bell: fundamental + gentle overtone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(current.note, now);
      osc2.frequency.setValueAtTime(current.note * 2, now); // soft octave shine

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + current.dur * 0.95);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + current.dur);
      osc2.stop(now + current.dur);

      noteIdx = (noteIdx + 1) % melody.length;
      this.musicInterval = window.setTimeout(playNextNote, current.dur * 1000 + 40);
    };

    playNextNote();
  }

  public stopMusic() {
    this.musicPlaying = false;
    if (this.musicInterval) {
      clearTimeout(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public toggleMusic(): boolean {
    if (this.musicPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.isMuted = false;
      this.startMusic();
      return true;
    }
  }
}

export const sounds = new SoundManager();
