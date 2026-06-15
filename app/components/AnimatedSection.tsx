"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollAnimation } from "@/app/hooks/useScrollAnimation";
import { cn } from "@/app/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation();
  const shouldReduceMotion = useReducedMotion();

  const directions = {
    up: { y: shouldReduceMotion ? 0 : 60, x: 0 },
    down: { y: shouldReduceMotion ? 0 : -60, x: 0 },
    left: { x: shouldReduceMotion ? 0 : 60, y: 0 },
    right: { x: shouldReduceMotion ? 0 : -60, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? {} : { opacity: 0, ...directions[direction] }}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
