"use client";

import { useReducedMotion } from "framer-motion";

interface SteamEffectProps {
  intensity?: "low" | "medium" | "high";
  className?: string;
}

export function SteamEffect({ intensity = "medium", className = "" }: SteamEffectProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  const particleCount = intensity === "high" ? 6 : intensity === "medium" ? 4 : 2;

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {Array.from({ length: particleCount }).map((_, i) => (
        <div
          key={i}
          className="absolute w-16 sm:w-20 h-24 sm:h-32 bg-gradient-to-t from-white/10 via-white/5 to-transparent rounded-full blur-xl animate-steam"
          style={{
            left: `${15 + i * 18}%`,
            bottom: "15%",
            animationDuration: `${5 + i * 0.8}s`,
            animationDelay: `${i * 0.6}s`,
          }}
        />
      ))}
      <div
        key="wisp"
        className="absolute w-24 sm:w-32 h-32 sm:h-48 bg-gradient-to-t from-gold-400/5 via-white/3 to-transparent rounded-full blur-2xl animate-steam-slow"
        style={{
          left: "35%",
          bottom: "10%",
        }}
      />
      <style jsx>{`
        @keyframes steamRise {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.5; }
          50% { transform: translateY(-40px) scale(1.2); opacity: 0.3; }
          100% { transform: translateY(-80px) scale(1.8); opacity: 0; }
        }
        .animate-steam {
          animation: steamRise ease-in-out infinite;
        }
        .animate-steam-slow {
          animation: steamRise 8s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
