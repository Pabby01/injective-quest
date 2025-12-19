import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getChapterBySlug } from "@/data/chapters";
import { getPlayerState, completeChapter } from "@/lib/gameState";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ScoreHUD } from "@/components/ScoreHUD";
import { LiveDataDisplay } from "@/components/LiveDataDisplay";
import { QuizPanel } from "@/components/QuizPanel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Scroll, Trophy, Sparkles } from "lucide-react";

type Phase = "story" | "quiz" | "complete";

export default function ChapterPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("story");
  const [chapterScore, setChapterScore] = useState(0);
  const [isPerfect, setIsPerfect] = useState(false);

  const chapter = getChapterBySlug(slug || "");
  const player = getPlayerState();

  useEffect(() => {
    if (!chapter) {
      navigate("/");
      return;
    }

    // Check if chapter is unlocked
    const isUnlocked = chapter.id === 1 || player.completedChapters.includes(chapter.id - 1);
    if (!isUnlocked && !player.completedChapters.includes(chapter.id)) {
      navigate("/");
    }
  }, [chapter, player, navigate]);

  if (!chapter) return null;

  const Icon = chapter.icon;

  const handleStartQuiz = () => {
    setPhase("quiz");
  };

  const handleQuizComplete = (score: number, perfectChapter: boolean) => {
    setChapterScore(score);
    setIsPerfect(perfectChapter);
    completeChapter(chapter.id, score);
    setPhase("complete");
  };

  const handleContinue = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ScoreHUD />

      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-4 left-4 z-50"
      >
        <Button
          variant="glass"
          size="sm"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </motion.div>

      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Chapter Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-space text-muted-foreground">
                Chapter {chapter.id}
              </span>
            </div>
            <h1 className="font-orbitron text-3xl md:text-4xl font-bold text-foreground mb-2">
              {chapter.title}
            </h1>
            <p className="text-lg text-primary">{chapter.subtitle}</p>
          </motion.div>

          {/* Live Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <LiveDataDisplay dataPoint={chapter.dataPoint} />
          </motion.div>

          <AnimatePresence mode="wait">
            {/* Story Phase */}
            {phase === "story" && (
              <motion.div
                key="story"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Scroll className="w-6 h-6 text-secondary" />
                  <h2 className="font-orbitron text-xl text-foreground">The Story</h2>
                </div>

                <div className="prose prose-invert max-w-none mb-8">
                  {chapter.story.split("\n\n").map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-muted-foreground leading-relaxed mb-4 text-lg"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex justify-end"
                >
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleStartQuiz}
                  >
                    <BookOpen className="w-4 h-4" />
                    Begin Quiz
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {/* Quiz Phase */}
            {phase === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <QuizPanel
                  questions={chapter.questions}
                  onComplete={handleQuizComplete}
                />
              </motion.div>
            )}

            {/* Complete Phase */}
            {phase === "complete" && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-success to-primary flex items-center justify-center shadow-[0_0_40px_hsl(142_76%_45%_/_0.4)]"
                >
                  <Trophy className="w-10 h-10 text-background" />
                </motion.div>

                <h2 className="font-orbitron text-3xl font-bold text-foreground mb-2">
                  Chapter Complete!
                </h2>
                <p className="text-muted-foreground mb-6">
                  You've mastered {chapter.title}
                </p>

                <div className="glass p-6 rounded-xl max-w-sm mx-auto mb-8">
                  <div className="text-4xl font-orbitron font-bold gradient-text mb-2">
                    +{chapterScore}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Points Earned
                  </div>
                  
                  {isPerfect && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="mt-4 flex items-center justify-center gap-2 text-success"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span className="font-bold">Perfect Chapter Bonus!</span>
                    </motion.div>
                  )}
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleContinue}
                >
                  Continue Quest
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
