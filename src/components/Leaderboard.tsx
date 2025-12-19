import { motion } from "framer-motion";
import { Trophy, Medal, Crown, User } from "lucide-react";
import { getLeaderboard, LeaderboardEntry } from "@/lib/gameState";
import { cn } from "@/lib/utils";

export function Leaderboard() {
  const entries = getLeaderboard();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-300" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center font-mono text-muted-foreground">{rank}</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-primary" />
        <h2 className="font-orbitron font-bold text-xl text-foreground">
          Ninja Leaderboard
        </h2>
      </div>

      <div className="space-y-2">
        {entries.slice(0, 10).map((entry, index) => (
          <motion.div
            key={entry.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg transition-all duration-300",
              entry.isPlayer 
                ? "bg-primary/20 border border-primary/40 shadow-[0_0_20px_hsl(180_100%_50%_/_0.2)]" 
                : "bg-card/20 hover:bg-card/30"
            )}
          >
            {/* Rank */}
            <div className="w-8 flex justify-center">
              {getRankIcon(entry.rank)}
            </div>

            {/* Name */}
            <div className="flex-1 flex items-center gap-2">
              {entry.isPlayer && <User className="w-4 h-4 text-primary" />}
              <span className={cn(
                "font-space",
                entry.isPlayer ? "text-primary font-bold" : "text-foreground"
              )}>
                {entry.name}
              </span>
              {entry.isPlayer && (
                <span className="text-xs bg-primary/30 text-primary px-2 py-0.5 rounded-full font-semibold">
                  YOU
                </span>
              )}
            </div>

            {/* Score */}
            <div className={cn(
              "font-orbitron font-bold text-lg",
              entry.isPlayer ? "text-primary" : "text-muted-foreground"
            )}>
              {entry.score}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground">
          Complete all chapters for a max score of <span className="text-primary font-bold">150</span>
        </p>
      </div>
    </motion.div>
  );
}
