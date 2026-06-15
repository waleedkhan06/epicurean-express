"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { GoldButton } from "@/app/components/GoldButton";
import { Star, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-32 bg-obsidian-800 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian-700 via-obsidian-800 to-obsidian-800" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/8 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gold-gradient" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-6 block">
            Begin Your Journey
          </span>
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg text-obsidian-100 mb-6 leading-tight text-balance">
            Ready to Experience
            <br />
            <span className="text-gold-gradient">Perfection?</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-obsidian-400 max-w-2xl mx-auto mb-6 leading-relaxed">
            Join thousands of discerning diners who have discovered the pinnacle of fast-casual 
            luxury. Your masterpiece awaits.
          </p>

          {/* Social proof inline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" aria-hidden="true" />
              ))}
            </div>
            <span className="font-body text-sm text-obsidian-400">
              4.9 ★ from 2,847 reviews
            </span>
          </motion.div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton size="lg" href="/menu">
              <span className="flex items-center gap-2">
                Order Now
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </GoldButton>
            <GoldButton variant="outline" size="lg" href="/locations">
              Find a Location
            </GoldButton>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
