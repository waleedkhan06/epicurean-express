"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function ParallaxImageSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-20%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1.1, 1]);

  return (
    <section ref={containerRef} className="relative h-[55vh] sm:h-[65vh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div style={{ scale }} className="absolute inset-0">
          <Image
            src="/images/parallax-bg.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian-800/80 via-obsidian-800/40 to-obsidian-800/80" />
        <div className="absolute inset-0 bg-hero-vignette" />
      </motion.div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gold-gradient z-10" aria-hidden="true" />

      <motion.div style={{ opacity }} className="relative z-10 h-full flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl"
        >
          <h2 className="font-display text-display-sm sm:text-display-md md:text-display-lg text-obsidian-100 mb-4 text-balance">
            Taste the <span className="text-gold-400">Extraordinary</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-obsidian-300 max-w-xl mx-auto leading-relaxed">
            Every visit is an occasion. Every bite, a celebration.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
