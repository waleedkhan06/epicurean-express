"use client";

import { motion } from "framer-motion";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/app/lib/utils";

interface PageHeroProps {
  overline: string;
  title: React.ReactNode;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ overline, title, description, breadcrumb, className, children }: PageHeroProps) {
  return (
    <section className={cn("relative pt-32 pb-20 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-700 to-obsidian-800" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          {breadcrumb && (
            <div className="flex justify-center">
              <Breadcrumb items={breadcrumb} />
            </div>
          )}
          <div className="text-center max-w-4xl mx-auto">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block"
            >
              {overline}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-display-sm sm:text-display-md md:text-display-lg lg:text-display-xl text-obsidian-100 mb-4 text-balance"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-body text-base sm:text-lg text-obsidian-300 max-w-2xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
