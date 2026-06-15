"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { Beef, ChefHat, Zap, Sparkles } from "lucide-react";

const features = [
  {
    icon: Beef,
    title: "Premium Ingredients",
    description:
      "A5 Wagyu from Japan, black truffles from Périgord, and cheeses aged to perfection. We accept nothing less than extraordinary.",
    stat: "100%",
    statLabel: "Wagyu Sourced",
    gradient: "from-amber-500/20 to-orange-600/10",
  },
  {
    icon: ChefHat,
    title: "Chef-Crafted",
    description:
      "Every recipe is developed by our Michelin-starred culinary team. Precision, passion, and decades of expertise in every creation.",
    stat: "12",
    statLabel: "Michelin Stars",
    gradient: "from-gold-400/20 to-gold-600/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Gourmet doesn&apos;t mean slow. Our optimized kitchen delivers masterpieces to your door in under 30 minutes, peak freshness guaranteed.",
    stat: "28",
    statLabel: "Min. Delivery",
    gradient: "from-blue-500/20 to-purple-600/10",
  },
  {
    icon: Sparkles,
    title: "Unforgettable Experience",
    description:
      "From unboxing to the final bite, every touchpoint is designed to delight. Because luxury is in the details.",
    stat: "4.9",
    statLabel: "Customer Rating",
    gradient: "from-gold-400/20 to-amber-600/10",
  },
];

export function WhyEpicurean() {
  return (
    <section className="relative py-32 bg-obsidian-700 overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(212,175,55,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-20">
          <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
            The Difference
          </span>
          <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance max-w-3xl mx-auto">
            Why <span className="text-gold-400">Epicurean</span>
          </h2>
          <p className="font-body text-obsidian-400 max-w-2xl mx-auto leading-relaxed text-base sm:text-lg">
            We don&apos;t just make burgers. We craft experiences that linger in memory long after the last bite.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative h-full p-8 rounded-2xl bg-obsidian-600/50 border border-gold-400/10 hover:border-gold-400/30 transition-all duration-500 group overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl`}
                  aria-hidden="true"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-obsidian-800/50 group-hover:opacity-0 transition-opacity duration-500" aria-hidden="true" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-400/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold-400/20 transition-all duration-500">
                    <feature.icon className="w-7 h-7 text-gold-400" aria-hidden="true" />
                  </div>

                  {/* Stat */}
                  <div className="mb-4">
                    <span className="font-display text-3xl text-gold-400">{feature.stat}</span>
                    <span className="font-body text-[11px] text-obsidian-500 uppercase tracking-[0.2em] ml-2">
                      {feature.statLabel}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl text-obsidian-100 mb-3 group-hover:text-gold-400 transition-colors duration-500">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-obsidian-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
