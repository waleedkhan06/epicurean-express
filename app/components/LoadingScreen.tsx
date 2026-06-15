"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-obsidian-800 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-2 border-gold-400/20 border-t-gold-400 rounded-full mx-auto mb-6"
              aria-hidden="true"
            />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="font-display text-2xl text-gold-400">EPICUREAN</span>
              <span className="font-body text-xs text-gold-400/60 tracking-[0.3em] uppercase block mt-1">
                Express
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
