import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "success" | "error" | "none";
  onClick?: () => void;
}

export function GlassCard({ 
  children, 
  className, 
  hover = false, 
  glow = "none",
  onClick 
}: GlassCardProps) {
  const glowStyles = {
    cyan: "hover:shadow-[0_0_40px_hsl(180_100%_50%_/_0.3)] hover:border-primary/40",
    purple: "hover:shadow-[0_0_40px_hsl(270_91%_65%_/_0.3)] hover:border-secondary/40",
    success: "hover:shadow-[0_0_40px_hsl(142_76%_45%_/_0.3)] hover:border-success/40",
    error: "hover:shadow-[0_0_40px_hsl(0_84%_60%_/_0.3)] hover:border-destructive/40",
    none: ""
  };

  return (
    <motion.div
      className={cn(
        "glass-card p-6 transition-all duration-300",
        hover && "cursor-pointer hover:scale-[1.02] hover:bg-card/30",
        glowStyles[glow],
        className
      )}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
