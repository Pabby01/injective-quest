import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Chapter } from "@/data/chapters";
import { getPlayerState } from "@/lib/gameState";
import { Lock, CheckCircle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

export function ChapterCard({ chapter, index }: ChapterCardProps) {
  const navigate = useNavigate();
  const player = getPlayerState();
  
  const isCompleted = player.completedChapters.includes(chapter.id);
  const isUnlocked = chapter.id === 1 || player.completedChapters.includes(chapter.id - 1);
  const chapterScore = player.chapterScores[chapter.id] || 0;
  const maxScore = chapter.questions.length * 10 + 10; // Questions + bonus

  const Icon = chapter.icon;

  const colorClasses = {
    cyan: "from-primary/20 to-primary/5 border-primary/30 hover:border-primary/50",
    blue: "from-injective-blue/20 to-injective-blue/5 border-injective-blue/30 hover:border-injective-blue/50",
    purple: "from-secondary/20 to-secondary/5 border-secondary/30 hover:border-secondary/50",
    teal: "from-accent/20 to-accent/5 border-accent/30 hover:border-accent/50",
    magenta: "from-injective-magenta/20 to-injective-magenta/5 border-injective-magenta/30 hover:border-injective-magenta/50"
  };

  const iconColorClasses = {
    cyan: "text-primary",
    blue: "text-injective-blue",
    purple: "text-secondary",
    teal: "text-accent",
    magenta: "text-injective-magenta"
  };

  const handleClick = () => {
    if (isUnlocked) {
      navigate(`/chapter/${chapter.slug}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={isUnlocked ? { y: -8, scale: 1.02 } : undefined}
      onClick={handleClick}
      className={cn(
        "relative group cursor-pointer",
        !isUnlocked && "cursor-not-allowed opacity-60"
      )}
    >
      <div
        className={cn(
          "glass-card p-6 h-full transition-all duration-300 bg-gradient-to-br",
          colorClasses[chapter.color as keyof typeof colorClasses],
          isUnlocked && "hover:shadow-[0_0_40px_hsl(180_100%_50%_/_0.2)]"
        )}
      >
        {/* Chapter Number Badge */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center font-orbitron font-bold text-primary">
          {chapter.id}
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          {isCompleted ? (
            <div className="flex items-center gap-1 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="text-xs font-semibold">{chapterScore}/{maxScore}</span>
            </div>
          ) : !isUnlocked ? (
            <Lock className="w-5 h-5 text-muted-foreground" />
          ) : null}
        </div>

        {/* Icon */}
        <div className={cn(
          "w-14 h-14 rounded-xl bg-card/50 flex items-center justify-center mb-4 transition-all duration-300",
          isUnlocked && "group-hover:scale-110",
          iconColorClasses[chapter.color as keyof typeof iconColorClasses]
        )}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Content */}
        <h3 className="font-orbitron font-bold text-lg text-foreground mb-1 pr-16">
          {chapter.title}
        </h3>
        <p className={cn(
          "text-sm mb-3",
          iconColorClasses[chapter.color as keyof typeof iconColorClasses]
        )}>
          {chapter.subtitle}
        </p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {chapter.loreIntro}
        </p>

        {/* Progress Bar */}
        {isCompleted && (
          <div className="mt-4">
            <div className="progress-bar">
              <div 
                className="progress-bar-fill"
                style={{ width: `${(chapterScore / maxScore) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Arrow indicator */}
        {isUnlocked && !isCompleted && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
