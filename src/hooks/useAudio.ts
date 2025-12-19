// Audio management hook for game sounds and music
import { useState, useEffect, useCallback, useRef } from 'react';

// Simple procedural audio generation using Web Audio API
class AudioGenerator {
    private audioContext: AudioContext | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
    }

    // Play correct answer sound (pleasant chime)
    playCorrect() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    // Play incorrect answer sound (lower tone)
    playIncorrect() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.2);
        osc.type = 'sawtooth';

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
    }

    // Play chapter complete sound (triumphant)
    playChapterComplete() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const notes = [523.25, 659.25, 783.99]; // C, E, G (major chord)

        notes.forEach((freq, i) => {
            const osc = this.audioContext!.createOscillator();
            const gain = this.audioContext!.createGain();

            osc.connect(gain);
            gain.connect(this.audioContext!.destination);

            osc.frequency.setValueAtTime(freq, now + i * 0.1);
            osc.type = 'sine';

            gain.gain.setValueAtTime(0.2, now + i * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.5);

            osc.start(now + i * 0.1);
            osc.stop(now + i * 0.1 + 0.5);
        });
    }

    // Play button click sound (subtle)
    playClick() {
        if (!this.audioContext) return;

        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.frequency.setValueAtTime(1000, now);
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
    }
}

// Background music using Web Audio API - Cosmic Ambient
class BackgroundMusic {
    private audioContext: AudioContext | null = null;
    private oscillators: OscillatorNode[] = [];
    private gainNodes: GainNode[] = [];
    private masterGain: GainNode | null = null;
    private isPlaying = false;
    private lfos: OscillatorNode[] = [];

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.08; // Gentle background volume
        }
    }

    start() {
        if (this.isPlaying || !this.audioContext || !this.masterGain) return;

        this.isPlaying = true;
        const now = this.audioContext.currentTime;

        // Bass drone (deep space rumble)
        const bass = this.audioContext.createOscillator();
        const bassGain = this.audioContext.createGain();
        bass.type = 'sine';
        bass.frequency.value = 55; // A1
        bassGain.gain.value = 0.4;
        bass.connect(bassGain);
        bassGain.connect(this.masterGain);
        bass.start(now);
        this.oscillators.push(bass);
        this.gainNodes.push(bassGain);

        // Atmospheric pad layer 1
        const pad1 = this.audioContext.createOscillator();
        const pad1Gain = this.audioContext.createGain();
        pad1.type = 'sine';
        pad1.frequency.value = 110; // A2
        pad1Gain.gain.value = 0.15;
        pad1.connect(pad1Gain);
        pad1Gain.connect(this.masterGain);
        pad1.start(now);
        this.oscillators.push(pad1);
        this.gainNodes.push(pad1Gain);

        // Atmospheric pad layer 2 (fifth harmonic)
        const pad2 = this.audioContext.createOscillator();
        const pad2Gain = this.audioContext.createGain();
        pad2.type = 'sine';
        pad2.frequency.value = 165; // E3
        pad2Gain.gain.value = 0.12;
        pad2.connect(pad2Gain);
        pad2Gain.connect(this.masterGain);
        pad2.start(now);
        this.oscillators.push(pad2);
        this.gainNodes.push(pad2Gain);

        // High shimmer (cosmic sparkle)
        const shimmer = this.audioContext.createOscillator();
        const shimmerGain = this.audioContext.createGain();
        shimmer.type = 'sine';
        shimmer.frequency.value = 880; // A5
        shimmerGain.gain.value = 0.05;
        shimmer.connect(shimmerGain);
        shimmerGain.connect(this.masterGain);
        shimmer.start(now);
        this.oscillators.push(shimmer);
        this.gainNodes.push(shimmerGain);

        // Add LFO (Low Frequency Oscillator) for pulsing effect
        const lfo = this.audioContext.createOscillator();
        const lfoGain = this.audioContext.createGain();
        lfo.type = 'sine';
        lfo.frequency.value = 0.2; // Very slow pulse
        lfoGain.gain.value = 0.03;
        lfo.connect(lfoGain);
        lfoGain.connect(bassGain.gain);
        lfo.start(now);
        this.lfos.push(lfo);

        // High frequency shimmer LFO for ethereal effect
        const shimmerLfo = this.audioContext.createOscillator();
        const shimmerLfoGain = this.audioContext.createGain();
        shimmerLfo.type = 'sine';
        shimmerLfo.frequency.value = 0.5;
        shimmerLfoGain.gain.value = 0.02;
        shimmerLfo.connect(shimmerLfoGain);
        shimmerLfoGain.connect(shimmerGain.gain);
        shimmerLfo.start(now);
        this.lfos.push(shimmerLfo);
    }

    stop() {
        this.oscillators.forEach(osc => {
            try {
                osc.stop();
                osc.disconnect();
            } catch (e) {
                // Already stopped
            }
        });
        this.lfos.forEach(lfo => {
            try {
                lfo.stop();
                lfo.disconnect();
            } catch (e) {
                // Already stopped
            }
        });
        this.gainNodes.forEach(gain => {
            try {
                gain.disconnect();
            } catch (e) {
                // Already disconnected
            }
        });
        this.oscillators = [];
        this.gainNodes = [];
        this.lfos = [];
        this.isPlaying = false;
    }

    setVolume(volume: number) {
        if (this.masterGain) {
            this.masterGain.gain.value = volume * 0.08;
        }
    }

    getIsPlaying(): boolean {
        return this.isPlaying;
    }
}

export function useAudio() {
    const [isMuted, setIsMuted] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('audio-muted') === 'true';
        }
        return false;
    });

    const [musicStarted, setMusicStarted] = useState(false);

    const audioGenerator = useRef<AudioGenerator | null>(null);
    const bgMusic = useRef<BackgroundMusic | null>(null);

    useEffect(() => {
        audioGenerator.current = new AudioGenerator();
        bgMusic.current = new BackgroundMusic();

        return () => {
            bgMusic.current?.stop();
        };
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('audio-muted', isMuted.toString());
        }

        // Stop or start background music based on mute state
        if (bgMusic.current) {
            if (isMuted) {
                bgMusic.current.stop();
                setMusicStarted(false);
            } else if (musicStarted) {
                // Restart if it was playing before
                bgMusic.current.stop();
                bgMusic.current.start();
            }
        }
    }, [isMuted, musicStarted]);

    const playCorrect = useCallback(() => {
        if (!isMuted && audioGenerator.current) {
            audioGenerator.current.playCorrect();
        }
    }, [isMuted]);

    const playIncorrect = useCallback(() => {
        if (!isMuted && audioGenerator.current) {
            audioGenerator.current.playIncorrect();
        }
    }, [isMuted]);

    const playChapterComplete = useCallback(() => {
        if (!isMuted && audioGenerator.current) {
            audioGenerator.current.playChapterComplete();
        }
    }, [isMuted]);

    const playClick = useCallback(() => {
        if (!isMuted && audioGenerator.current) {
            audioGenerator.current.playClick();
        }
    }, [isMuted]);

    const toggleMute = useCallback(() => {
        setIsMuted(prev => !prev);
    }, []);

    const startBackgroundMusic = useCallback(() => {
        if (!isMuted && bgMusic.current && !bgMusic.current.getIsPlaying()) {
            bgMusic.current.start();
            setMusicStarted(true);
        }
    }, [isMuted]);

    const stopBackgroundMusic = useCallback(() => {
        if (bgMusic.current) {
            bgMusic.current.stop();
            setMusicStarted(false);
        }
    }, []);

    return {
        isMuted,
        toggleMute,
        playCorrect,
        playIncorrect,
        playChapterComplete,
        playClick,
        startBackgroundMusic,
        stopBackgroundMusic,
        musicStarted,
    };
}
