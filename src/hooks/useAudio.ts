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

// Background music using Web Audio API - Upbeat Electronic Dance
class BackgroundMusic {
    private audioContext: AudioContext | null = null;
    private oscillators: OscillatorNode[] = [];
    private gainNodes: GainNode[] = [];
    private masterGain: GainNode | null = null;
    private isPlaying = false;
    private intervalId: number | null = null;
    private bpm = 100;
    private beatDuration = 0;

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.connect(this.audioContext.destination);
            this.masterGain.gain.value = 0.15; // Moderate volume for dance music
            this.beatDuration = 60 / this.bpm;
        }
    }

    // Kick drum (bass hit)
    private playKick(time: number) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, time);
        osc.frequency.exponentialRampToValueAtTime(40, time + 0.1);

        gain.gain.setValueAtTime(0.8, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.3);
    }

    // Hi-hat
    private playHiHat(time: number) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(8000, time);

        gain.gain.setValueAtTime(0.1, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.05);
    }

    // Bass line
    private playBass(time: number, freq: number) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.4);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + 0.4);
    }

    // Lead synth melody
    private playLead(time: number, freq: number, duration: number) {
        if (!this.audioContext) return;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

        osc.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(time);
        osc.stop(time + duration);
    }

    // Pattern scheduler
    private schedulePattern() {
        if (!this.audioContext || !this.isPlaying) return;

        const now = this.audioContext.currentTime;
        const barDuration = this.beatDuration * 4; // 4 beats per bar

        // Bass line pattern (E, E, G, A)
        const bassNotes = [82.41, 82.41, 98.00, 110.00];

        // Lead melody pattern
        const melodyNotes = [
            { freq: 329.63, duration: 0.3 }, // E
            { freq: 392.00, duration: 0.3 }, // G
            { freq: 440.00, duration: 0.3 }, // A
            { freq: 493.88, duration: 0.3 }, // B
        ];

        // Schedule next 2 bars
        for (let bar = 0; bar < 2; bar++) {
            const barStart = now + bar * barDuration;

            // Kick on beats 1 and 3
            this.playKick(barStart);
            this.playKick(barStart + this.beatDuration * 2);

            // Hi-hats on every half beat
            for (let i = 0; i < 8; i++) {
                this.playHiHat(barStart + i * this.beatDuration / 2);
            }

            // Bass line
            bassNotes.forEach((freq, i) => {
                this.playBass(barStart + i * this.beatDuration, freq);
            });

            // Lead melody (every other bar)
            if (bar % 2 === 0) {
                melodyNotes.forEach((note, i) => {
                    this.playLead(barStart + i * this.beatDuration, note.freq, note.duration);
                });
            }
        }
    }

    start() {
        if (this.isPlaying || !this.audioContext) return;

        this.isPlaying = true;

        // Schedule patterns every bar
        this.schedulePattern();
        this.intervalId = window.setInterval(() => {
            if (this.isPlaying) {
                this.schedulePattern();
            }
        }, (this.beatDuration * 4 * 1000) - 100); // Schedule slightly before bar ends
    }

    stop() {
        this.isPlaying = false;
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.oscillators.forEach(osc => {
            try {
                osc.stop();
                osc.disconnect();
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
    }

    setVolume(volume: number) {
        if (this.masterGain) {
            this.masterGain.gain.value = volume * 0.15;
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
                // Music is now handled by toggleMuteEnhanced
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

    // Enhanced toggle that actually stops music
    const toggleMuteEnhanced = useCallback(() => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        // Immediately stop music if muting
        if (newMutedState && bgMusic.current) {
            bgMusic.current.stop();
            setMusicStarted(false);
        }
    }, [isMuted]);

    return {
        isMuted,
        toggleMute: toggleMuteEnhanced,
        playCorrect,
        playIncorrect,
        playChapterComplete,
        playClick,
        startBackgroundMusic,
        stopBackgroundMusic,
        musicStarted,
    };
}
