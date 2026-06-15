"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface GoldButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export function GoldButton({
  children,
  variant = "solid",
  size = "md",
  className,
  onClick,
  href,
  type = "button",
}: GoldButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const baseStyles = "relative overflow-hidden font-body font-semibold tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center";

  const variants = {
    solid: "bg-gold-gradient text-obsidian-900 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    outline: "border-2 border-gold-400 text-gold-400 hover:bg-gold-400/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]",
    ghost: "text-gold-400 hover:text-gold-200 hover:bg-gold-400/5",
  };

  const sizes = {
    sm: "px-5 py-2 text-xs rounded-lg",
    md: "px-8 py-3 text-sm rounded-xl",
    lg: "px-10 py-4 text-base rounded-xl sm:px-12",
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      href={href}
      onClick={onClick}
      type={href ? undefined : type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
    >
      {variant === "solid" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={shouldReduceMotion ? {} : { x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          aria-hidden="true"
        />
      )}
      <span className="relative z-10">{children}</span>
    </Component>
  );
}
