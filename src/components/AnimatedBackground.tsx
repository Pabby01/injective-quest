import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${6 + Math.random() * 4}s`;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 animated-gradient-bg" />
      
      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Radial glow from center */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 30%, hsl(180 100% 50% / 0.08) 0%, transparent 60%)"
        }}
      />
      
      {/* Secondary glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 80% 80%, hsl(270 91% 65% / 0.06) 0%, transparent 50%)"
        }}
      />

      {/* Floating particles container */}
      <div ref={containerRef} className="absolute inset-0" />

      {/* Animated orbs */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: "radial-gradient(circle, hsl(180 100% 50%) 0%, transparent 70%)",
          top: "10%",
          left: "10%",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
        style={{
          background: "radial-gradient(circle, hsl(270 91% 65%) 0%, transparent 70%)",
          bottom: "10%",
          right: "10%",
        }}
        animate={{
          x: [0, -80, 0],
          y: [0, -60, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 100% 50% / 0.03) 2px, hsl(180 100% 50% / 0.03) 4px)"
        }}
      />
    </div>
  );
}
