"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { testimonials } from "@/app/lib/data";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
  return (
    <section className="relative py-32 bg-obsidian-700 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-400/[0.04] rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />

      {/* Gold top border accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gold-gradient" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
            Critical Acclaim
          </span>
          <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance">
            Voices of <span className="text-gold-400">Distinction</span>
          </h2>
          <p className="font-body text-obsidian-400 max-w-xl mx-auto">
            Hear from the world&apos;s most discerning palates.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={testimonial.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative p-8 sm:p-10 rounded-2xl bg-obsidian-600/50 border border-gold-400/10 hover:border-gold-400/20 transition-all duration-500 h-full"
              >
                {/* Quote icon */}
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-400/[0.06]" aria-hidden="true" />

                {/* Stars */}
                <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" aria-hidden="true" />
                  ))}
                </div>

                {/* Quote */}
                <p className="font-body text-obsidian-200 leading-relaxed mb-8 text-base sm:text-lg italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/30 flex-shrink-0">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div>
                    <div className="font-body font-semibold text-obsidian-100">{testimonial.name}</div>
                    <div className="font-body text-sm text-gold-400/80">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
