"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GoldButton } from "@/app/components/GoldButton";
import { ChevronLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-obsidian-800 flex items-center justify-center">
      <div className="text-center px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="font-display text-8xl sm:text-9xl text-gold-400/20 select-none">
            404
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-obsidian-100 text-balance">
            This Creation Doesn&apos;t Exist
          </h1>
          <p className="font-body text-obsidian-400 leading-relaxed">
            The masterpiece you seek is not on our menu. But we have many other 
            extraordinary creations waiting for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <GoldButton href="/">Return to Homepage</GoldButton>
            <Link
              href="/menu"
              className="font-body text-sm text-obsidian-400 hover:text-gold-400 transition-colors flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              Browse Menu
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
