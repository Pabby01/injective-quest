import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Question } from "@/data/chapters";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, XCircle, ChevronRight } from "lucide-react";
import { useAudio } from "@/hooks/useAudio";

interface QuizPanelProps {
  questions: Question[];
  onComplete: (score: number, perfectChapter: boolean) => void;
}

export function QuizPanel({ questions, onComplete }: QuizPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const { playCorrect, playIncorrect, playChapterComplete } = useAudio();

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleSelectAnswer = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleConfirm = () => {
    if (selectedAnswer === null) return;

    setShowResult(true);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      playCorrect();
    } else {
      playIncorrect();
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate bonus for perfect chapter
      const perfectChapter = correctAnswers + (isCorrect ? 1 : 0) === questions.length;
      const finalScore = score + (isCorrect ? 10 : 0) + (perfectChapter ? 10 : 0);
      playChapterComplete();
      onComplete(finalScore, perfectChapter);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-8 max-w-2xl mx-auto"
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-muted-foreground font-space">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="font-orbitron text-primary font-bold">
          +{score} pts
        </span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar mb-8">
        <motion.div
          className="progress-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-orbitron text-xl text-foreground mb-6">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === currentQuestion.correctAnswer;

              let stateClass = "";
              if (showResult) {
                if (isCorrectAnswer) {
                  stateClass = "answer-correct";
                } else if (isSelected && !isCorrectAnswer) {
                  stateClass = "answer-incorrect";
                }
              } else if (isSelected) {
                stateClass = "answer-selected";
              }

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={showResult}
                  whileHover={!showResult ? { scale: 1.01 } : undefined}
                  whileTap={!showResult ? { scale: 0.99 } : undefined}
                  className={cn(
                    "w-full p-4 rounded-xl text-left transition-all duration-300",
                    "glass border border-border/50 hover:border-primary/30",
                    "flex items-center gap-4",
                    stateClass,
                    showResult && "cursor-default"
                  )}
                >
                  <span className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                    "bg-card/50 border border-border",
                    isSelected && !showResult && "bg-primary/20 border-primary text-primary",
                    showResult && isCorrectAnswer && "bg-success/20 border-success text-success",
                    showResult && isSelected && !isCorrectAnswer && "bg-destructive/20 border-destructive text-destructive"
                  )}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1 font-rajdhani text-lg">{option}</span>
                  {showResult && isCorrectAnswer && (
                    <CheckCircle className="w-5 h-5 text-success" />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6"
              >
                <div className={cn(
                  "p-4 rounded-xl border",
                  isCorrect
                    ? "bg-success/10 border-success/30"
                    : "bg-destructive/10 border-destructive/30"
                )}>
                  <p className="text-sm font-semibold mb-2">
                    {isCorrect ? "🎯 Correct!" : "❌ Not quite..."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentQuestion.explanation}
                  </p>
                  {isCorrect && (
                    <p className="text-sm text-success font-bold mt-2">+10 points!</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            {!showResult ? (
              <Button
                variant="hero"
                size="lg"
                onClick={handleConfirm}
                disabled={selectedAnswer === null}
              >
                Confirm Answer
              </Button>
            ) : (
              <Button
                variant="hero"
                size="lg"
                onClick={handleNext}
              >
                {isLastQuestion ? "Complete Chapter" : "Next Question"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
