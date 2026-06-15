"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { GoldButton } from "@/app/components/GoldButton";
import { Check, ArrowRight } from "lucide-react";
import Image from "next/image";

const highlights = [
  "A5 Wagyu beef from Miyazaki Prefecture",
  "Black truffles sourced from Périgord, France",
  "Artisan brioche baked fresh every 4 hours",
  "Aged cheeses from family creameries",
  "House-made sauces with 24-hour preparation",
];

export function CraftedForConnoisseurs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [100, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [50, -50]);

  return (
    <section ref={containerRef} className="relative py-32 bg-obsidian-800 overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-400/[0.03] rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-amber-500/[0.03] rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left" className="relative">
            <motion.div style={{ y: imageY }} className="relative">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/images/crafted-chef.jpg"
                  alt="Chef preparing premium ingredients"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800/60 via-obsidian-800/10 to-transparent" />
              </div>

              {/* Floating badge */}
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-5 sm:-bottom-7 sm:-right-7 bg-obsidian-900/95 backdrop-blur-xl border border-gold-400/30 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-gold-400/10"
              >
                <div className="font-display text-3xl sm:text-4xl text-gold-400">2024</div>
                <div className="font-body text-[11px] text-obsidian-400 uppercase tracking-[0.2em]">
                  Established
                </div>
              </motion.div>
            </motion.div>
          </AnimatedSection>

          {/* Content Side */}
          <motion.div style={{ y: contentY }} className="space-y-8">
            <AnimatedSection direction="right">
              <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
                Our Philosophy
              </span>
              <h2 className="font-display text-display-sm text-obsidian-100 mb-6 text-balance">
                Crafted for <span className="text-gold-400">Connoisseurs</span>
              </h2>
              <p className="font-body text-base sm:text-lg text-obsidian-300 leading-relaxed mb-8">
                We believe that extraordinary ingredients, treated with reverence and skill, 
                create extraordinary experiences. Every element of our menu is a love letter 
                to the art of gastronomy.
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="space-y-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 group/item"
                  >
                    <div className="w-7 h-7 rounded-full bg-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-gold-400/30 transition-colors duration-300">
                      <Check className="w-3.5 h-3.5 text-gold-400" aria-hidden="true" />
                    </div>
                    <span className="font-body text-obsidian-300 group-hover/item:text-obsidian-100 transition-colors duration-300">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.4}>
              <GoldButton href="/about">
                <span className="flex items-center gap-2">
                  Discover Our Story
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </GoldButton>
            </AnimatedSection>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
