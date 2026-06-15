"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { BackToTop } from "@/app/components/BackToTop";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { GoldButton } from "@/app/components/GoldButton";
import { useCart } from "@/app/hooks/useCart";
import { locations } from "@/app/lib/data";
import { MapPin, Clock, Phone, ChevronRight, Navigation } from "lucide-react";
import Image from "next/image";

export default function LocationsPage() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);
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
        overline="Find Us"
        title={<>Our <span className="text-gold-400">Locations</span></>}
        description="Experience Epicurean Express in person. Each location is designed to immerse you in luxury from the moment you arrive."
        breadcrumb={[{ label: "Locations" }]}
      />

      {/* Locations Grid */}
      <section className="py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Location List */}
            <div className="lg:col-span-1 space-y-4">
              {locations.map((location, index) => (
                <AnimatedSection key={location.id} delay={index * 0.1}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveLocation(location)}
                    className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${
                      activeLocation.id === location.id
                        ? "bg-obsidian-700 border-gold-400/40 shadow-lg shadow-gold-400/5"
                        : "bg-obsidian-700/50 border-gold-400/10 hover:border-gold-400/20"
                    }`}
                    aria-pressed={activeLocation.id === location.id}
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-display text-lg mb-3 truncate ${
                          activeLocation.id === location.id ? "text-gold-400" : "text-obsidian-100"
                        }`}>
                          {location.name}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{location.address}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{location.hours}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-obsidian-400">
                            <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" aria-hidden="true" />
                            <span className="truncate">{location.phone}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 flex-shrink-0 mt-1 transition-colors ${
                        activeLocation.id === location.id ? "text-gold-400" : "text-obsidian-600"
                      }`} aria-hidden="true" />
                    </div>
                  </motion.button>
                </AnimatedSection>
              ))}
            </div>

            {/* Active Location Detail */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLocation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src={activeLocation.image}
                      alt={activeLocation.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <h2 className="font-display text-2xl sm:text-3xl text-obsidian-100 mb-2">
                        {activeLocation.name}
                      </h2>
                      <div className="flex items-center gap-2 text-obsidian-300">
                        <Navigation className="w-4 h-4 text-gold-400" aria-hidden="true" />
                        <span className="font-body text-sm">{activeLocation.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 rounded-xl bg-obsidian-700 border border-gold-400/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Clock className="w-5 h-5 text-gold-400" aria-hidden="true" />
                        <h3 className="font-display text-lg text-obsidian-100">Hours</h3>
                      </div>
                      <p className="font-body text-obsidian-400">{activeLocation.hours}</p>
                    </div>
                    <div className="p-6 rounded-xl bg-obsidian-700 border border-gold-400/10">
                      <div className="flex items-center gap-3 mb-3">
                        <Phone className="w-5 h-5 text-gold-400" aria-hidden="true" />
                        <h3 className="font-display text-lg text-obsidian-100">Contact</h3>
                      </div>
                      <p className="font-body text-obsidian-400">{activeLocation.phone}</p>
                    </div>
                  </div>

                  {/* Map */}
                  <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-obsidian-700 border border-gold-400/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <MapPin className="w-12 h-12 text-gold-400/40 mx-auto mb-4" aria-hidden="true" />
                        <p className="font-body text-obsidian-500">
                          Interactive Map Integration
                        </p>
                        <p className="font-body text-sm text-obsidian-600 mt-1">
                          {activeLocation.coordinates.lat}, {activeLocation.coordinates.lng}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 opacity-10" aria-hidden="true" style={{
                      backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }} />
                  </div>

                  <GoldButton className="w-full" size="lg">
                    <span className="flex items-center justify-center gap-2">
                      <Navigation className="w-4 h-4" aria-hidden="true" />
                      Get Directions
                    </span>
                  </GoldButton>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
