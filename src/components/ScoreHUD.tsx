import { motion } from "framer-motion";
import { Wallet, Trophy, User, LogOut } from "lucide-react";
import { shortenAddress, getPlayerState, resetGame } from "@/lib/gameState";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useWallet } from "@/hooks/useWallet";

interface ScoreHUDProps {
  onWalletConnect?: () => void;
}

export function ScoreHUD({ onWalletConnect }: ScoreHUDProps) {
  const [player, setPlayer] = useState(getPlayerState());
  const { address, isConnected } = useWallet();

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayer(getPlayerState());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleReset = () => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      resetGame();
      setPlayer(getPlayerState());
      window.location.href = "/";
    }
  };

  const displayAddress = isConnected && address ? address : player.walletAddress;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-3"
    >
      {/* Score Display */}
      <div className="glass-card px-4 py-2 flex items-center gap-3">
        <Trophy className="w-5 h-5 text-primary" />
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Score</span>
          <span className="font-orbitron font-bold text-primary text-lg leading-tight">
            {player.score}
          </span>
        </div>
      </div>

      {/* Player Info */}
      <div className="glass-card px-4 py-2 flex items-center gap-3">
        {isConnected ? (
          <Wallet className="w-5 h-5 text-success" />
        ) : (
          <User className="w-5 h-5 text-secondary" />
        )}
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Ninja</span>
          <span className="font-space text-sm text-foreground leading-tight">
            {displayAddress
              ? shortenAddress(displayAddress)
              : player.ninjaName
            }
          </span>
        </div>
      </div>

      {/* Reset Button */}
      {player.questStarted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          className="h-10 w-10 text-muted-foreground hover:text-destructive"
          title="Reset Progress"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      )}
    </motion.div>
  );
}
