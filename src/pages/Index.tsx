import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScoreHUD } from "@/components/ScoreHUD";
import { ChapterCard } from "@/components/ChapterCard";
import { Leaderboard } from "@/components/Leaderboard";
import { LiveDataDisplay } from "@/components/LiveDataDisplay";
import { WalletConnectButton } from "@/components/WalletConnectButton";
import { AudioControl } from "@/components/AudioControl";
import { useAudio } from "@/hooks/useAudio";
import { chapters } from "@/data/chapters";
import { getPlayerState, startQuest } from "@/lib/gameState";
import { useState, useEffect } from "react";
import { Swords, Zap, ChevronDown, ExternalLink } from "lucide-react";
import ninjaHero from "@/assets/ninja-hero.png";

export default function Index() {
  const navigate = useNavigate();
  const [player, setPlayer] = useState(getPlayerState());
  const { startBackgroundMusic, musicStarted } = useAudio();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(getPlayerState());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Start background music on first user interaction
  useEffect(() => {
    if (!musicStarted) {
      const startMusic = () => {
        startBackgroundMusic();
        // Remove listeners after first interaction
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
      };

      document.addEventListener('click', startMusic);
      document.addEventListener('keydown', startMusic);

      return () => {
        document.removeEventListener('click', startMusic);
        document.removeEventListener('keydown', startMusic);
      };
    }
  }, [startBackgroundMusic, musicStarted]);

  const handleStartQuest = () => {
    startQuest();
    setPlayer(getPlayerState());
    // Scroll to chapters
    document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <AnimatedBackground />

      {player.questStarted && <ScoreHUD />}
      <AudioControl />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        {/* Background Hero Image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${ninjaHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto relative z-10"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-8"
          >
            <img
              src="/logo.svg"
              alt="Injective Ninja Quest Logo"
              className="w-48 h-48 mx-auto drop-shadow-[0_0_30px_rgba(0,242,254,0.5)]"
            />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-orbitron text-5xl md:text-7xl font-bold gradient-text mb-6"
          >
            Injective Ninja Quest
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-2 font-rajdhani"
          >
            Master the Injective Blockchain
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-base md:text-lg text-muted-foreground/70 mb-12 max-w-2xl mx-auto"
          >
            An immersive story-driven quest to learn about Injective's lightning-fast Layer 1 blockchain
            and join the Ninja Labs community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {!player.questStarted ? (
              <>
                <Button
                  variant="hero"
                  size="xl"
                  onClick={handleStartQuest}
                  className="group"
                >
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                  Begin Your Quest
                </Button>
                <WalletConnectButton />
              </>
            ) : (
              <>
                <Button
                  variant="hero"
                  size="xl"
                  onClick={() => document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Continue Quest
                  <ChevronDown className="w-5 h-5" />
                </Button>
                <WalletConnectButton />
              </>
            )}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "5", label: "Chapters" },
              { value: "10", label: "Questions" },
              { value: "150", label: "Max Score" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-orbitron text-3xl md:text-4xl font-bold gradient-text-cyan">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-8 h-8 text-primary/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Live Data Section */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <LiveDataDisplay />
        </div>
      </section>

      {/* Chapters Section */}
      <section id="chapters" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Path
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Complete each chapter to unlock the next. Master all five to become a true Injective Ninja.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {chapters.map((chapter, index) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={index} />
            ))}
          </div>

          {/* Leaderboard */}
          <div className="max-w-2xl mx-auto">
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/30">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-6 mb-6">
            <a
              href="https://injective.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              Injective
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="https://docs.injective.network"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
            >
              Docs
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            Built for the Injective Hackathon by Ninja Labs Community
          </p>
        </div>
      </footer>
    </div>
  );
}
