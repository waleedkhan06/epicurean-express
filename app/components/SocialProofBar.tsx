"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";

export function SocialProofBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden lg:flex"
    >
      <div className="bg-obsidian-800/90 backdrop-blur-xl border border-gold-400/20 rounded-full px-6 py-3 flex items-center gap-6 shadow-2xl">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="font-body text-xs text-obsidian-300">
            12 orders in the last hour
          </span>
        </div>
        <div className="w-px h-4 bg-gold-400/20" aria-hidden="true" />
        <div className="flex items-center gap-2 text-obsidian-400">
          <Clock className="w-3 h-3 text-gold-400" aria-hidden="true" />
          <span className="font-body text-xs">Open now — 11AM to 11PM</span>
        </div>
        <div className="w-px h-4 bg-gold-400/20" aria-hidden="true" />
        <div className="flex items-center gap-2 text-obsidian-400">
          <Users className="w-3 h-3 text-gold-400" aria-hidden="true" />
          <span className="font-body text-xs">4.9 ★ from 2,847 reviews</span>
        </div>
      </div>
    </motion.div>
  );
}
