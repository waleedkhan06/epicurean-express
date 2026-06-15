"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { menuItems } from "@/app/lib/data";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { GoldButton } from "@/app/components/GoldButton";
import { formatPrice } from "@/app/lib/utils";
import { Clock, Flame, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function SignatureCreations() {
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  const signatureItems = menuItems.filter((item) => item.isSignature);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w < 640) setVisibleCount(1);
        else if (w < 1024) setVisibleCount(2);
        else setVisibleCount(3);
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const totalSlides = Math.max(1, signatureItems.length - visibleCount + 1);
  const slidePercent = 100 / visibleCount;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = undefined; }
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (shouldReduceMotion || isPaused) {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = undefined; }
      return;
    }
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = undefined; } };
  }, [next, shouldReduceMotion, isPaused]);

  return (
    <section className="relative py-32 bg-obsidian-800 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold-400/[0.03] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              Curated Selection
            </span>
            <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 text-balance">
              Our Signature <span className="text-gold-400">Creations</span>
            </h2>
          </div>
          <p className="font-body text-obsidian-400 max-w-md leading-relaxed md:text-right">
            Meticulously crafted. Unforgettable flavors. Each creation is a testament to our
            relentless pursuit of perfection.
          </p>
        </AnimatedSection>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex gap-6"
            animate={{ x: `-${currentIndex * slidePercent}%` }}
            transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.8 }}
          >
            {signatureItems.map((item) => (
              <div
                key={item.id}
                className="flex-shrink-0"
                style={{ width: `calc(${slidePercent}% - ${24 * (visibleCount - 1) / visibleCount}px)` }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="relative h-[500px] rounded-2xl overflow-hidden bg-obsidian-700 border border-gold-400/10 hover:border-gold-400/30 transition-all duration-700 group"
                >
                  <div className="relative h-[280px] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-700 via-obsidian-700/30 to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      {item.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-obsidian-900/80 backdrop-blur-sm border border-gold-400/20 rounded-full font-body text-[11px] text-gold-300 uppercase tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="absolute top-4 right-4 px-4 py-1.5 bg-gold-gradient rounded-lg shadow-lg shadow-gold-400/20">
                      <span className="font-body font-bold text-obsidian-900 text-sm">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-display text-xl sm:text-2xl text-obsidian-100 group-hover:text-gold-400 transition-colors duration-500">
                      {item.name}
                    </h3>
                    <p className="font-body text-sm text-obsidian-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-obsidian-500">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                        {item.prepTime}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                        {item.calories} cal
                      </span>
                    </div>
                    <GoldButton
                      variant="outline"
                      size="sm"
                      href={`/menu#${item.id}`}
                      className="w-full mt-2 group/btn"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </GoldButton>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Navigation arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-obsidian-800/80 backdrop-blur-sm border border-gold-400/20 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 transition-all z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-obsidian-800/80 backdrop-blur-sm border border-gold-400/20 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 transition-all z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "bg-gold-400 w-6"
                  : "bg-obsidian-600 hover:bg-obsidian-500"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <GoldButton href="/menu">View Full Menu</GoldButton>
      </motion.div>
    </section>
  );
}
