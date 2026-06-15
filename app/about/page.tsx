"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { BackToTop } from "@/app/components/BackToTop";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { useCart } from "@/app/hooks/useCart";
import { Award, Heart, Globe, Users } from "lucide-react";
import Image from "next/image";

const milestones = [
  { year: "2024", title: "The Beginning", desc: "Founded in New York with a singular vision: elevate the burger to fine art." },
  { year: "2024", title: "First Michelin Mention", desc: "Recognized for culinary excellence in our debut year." },
  { year: "2025", title: "Coast to Coast", desc: "Expanded to Beverly Hills, bringing West Coast sophistication." },
  { year: "2025", title: "Global Ambition", desc: "London Mayfair opening marks our international debut." },
];

const values = [
  { icon: Award, title: "Excellence", desc: "We never compromise. Every ingredient, every technique, every interaction must be exceptional." },
  { icon: Heart, title: "Passion", desc: "Food is our love language. We pour our souls into every creation that leaves our kitchen." },
  { icon: Globe, title: "Sustainability", desc: "Ethical sourcing isn't optional. We partner with farms that share our reverence for the land." },
  { icon: Users, title: "Community", desc: "We feed more than appetites. We nurture connections, celebrations, and memories." },
];

export default function AboutPage() {
  const cart = useCart();

  return (
    <main className="min-h-screen bg-obsidian-800">
      <ScrollProgress />
      <Navbar cartCount={cart.totalItems} onCartClick={() => cart.setIsOpen(true)} />

      <CartDrawer
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        totalPrice={cart.totalPrice}
        onUpdateQuantity={cart.updateQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
      />

      <PageHero
        overline="Our Story"
        title={<>Born from <span className="text-gold-400">Obsession</span></>}
        description='What began as a rebellious question — "Why can&apos;t fast food be extraordinary?" — has evolved into a global movement. We are Epicurean Express, and we refuse to accept the ordinary.'
        breadcrumb={[{ label: "Our Story" }]}
      />

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src="/images/about-story.jpg"
                  alt="Chef in kitchen"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800/60 to-transparent" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <h2 className="font-display text-display-sm text-obsidian-100">
                The <span className="text-gold-400">Philosophy</span>
              </h2>
              <p className="font-body text-obsidian-300 leading-relaxed">
                Our founder, Chef Antoine Moreau, spent fifteen years in Michelin-starred kitchens 
                across Europe before a simple realization struck him: the world&apos;s finest ingredients 
                deserved to be accessible. Not locked behind white tablecloths and reservation lists, 
                but available to anyone with an appreciation for the extraordinary.
              </p>
              <p className="font-body text-obsidian-300 leading-relaxed">
                Epicurean Express was born from this conviction. We bring the precision of fine dining 
                to the convenience of fast-casual. Every patty is hand-formed. Every sauce is made fresh 
                daily. Every bun is baked in-house every four hours.
              </p>
              <div className="pt-4">
                <div className="font-display text-2xl sm:text-3xl text-gold-400 italic">
                  &ldquo;Luxury is not a price point. It is a standard.&rdquo;
                </div>
                <div className="font-body text-sm text-obsidian-500 mt-2">
                  — Chef Antoine Moreau, Founder
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-obsidian-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              Our Principles
            </span>
            <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance">
              Our <span className="text-gold-400">Values</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <AnimatedSection key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full p-8 rounded-2xl bg-obsidian-600/50 border border-gold-400/10 hover:border-gold-400/30 transition-all duration-500 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-400/20 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-8 h-8 text-gold-400" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl text-obsidian-100 mb-3">{value.title}</h3>
                  <p className="font-body text-sm text-obsidian-400 leading-relaxed">
                    {value.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              Milestones
            </span>
            <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance">
              Our <span className="text-gold-400">Journey</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <AnimatedSection key={milestone.year + milestone.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex gap-6 sm:gap-8 items-start"
                >
                  <div className="flex-shrink-0 w-20 sm:w-24 text-right">
                    <span className="font-display text-xl sm:text-2xl text-gold-400">{milestone.year}</span>
                  </div>
                  <div className="relative pl-8 sm:pl-10">
                    <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-gold-400 ring-4 ring-obsidian-800" />
                    <div
                      className="absolute left-[5px] top-5 bottom-0 w-px bg-gold-400/20"
                      style={{ height: index === milestones.length - 1 ? "0" : "calc(100% + 3rem)" }}
                      aria-hidden="true"
                    />
                    <h3 className="font-display text-lg sm:text-xl text-obsidian-100 mb-2">{milestone.title}</h3>
                    <p className="font-body text-obsidian-400">{milestone.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-obsidian-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-4 block">
              Leadership
            </span>
            <h2 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance">
              The <span className="text-gold-400">Minds</span> Behind
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Antoine Moreau", role: "Founder & Executive Chef", image: "/images/team-antoine.jpg" },
              { name: "Sarah Chen", role: "Head of Culinary Innovation", image: "/images/team-sarah.jpg" },
              { name: "Marcus Webb", role: "Director of Operations", image: "/images/team-marcus.jpg" },
            ].map((person, index) => (
              <AnimatedSection key={person.name} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="text-center"
                >
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-gold-400/30">
                    <Image src={person.image} alt={person.name} fill className="object-cover" sizes="(max-width: 640px) 160px, 192px" />
                  </div>
                  <h3 className="font-display text-xl text-obsidian-100">{person.name}</h3>
                  <p className="font-body text-sm text-gold-400 mt-1">{person.role}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
