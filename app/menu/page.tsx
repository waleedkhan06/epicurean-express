"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, categories } from "@/app/lib/data";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { GoldButton } from "@/app/components/GoldButton";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/lib/utils";
import { Search, Clock, Flame, Star, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const cart = useCart();

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
        onAddItem={(item) => cart.addItem(item)}
      />

      <PageHero
        overline="The Collection"
        title={<>Our <span className="text-gold-400">Menu</span></>}
        description="Every creation is a masterpiece. Browse our curated selection of gourmet burgers, sides, and artisanal beverages."
        breadcrumb={[{ label: "Menu" }]}
      />

      {/* Filters & Search */}
      <section className="sticky top-20 z-30 bg-obsidian-800/95 backdrop-blur-xl border-y border-gold-400/10 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian-500" aria-hidden="true" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search creations... (Ctrl+K)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-obsidian-700 border border-gold-400/20 rounded-xl pl-11 pr-4 py-3 font-body text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
                aria-label="Search menu items"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full font-body text-sm whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat.id
                      ? "bg-gold-gradient text-obsidian-900 font-semibold"
                      : "bg-obsidian-700 text-obsidian-400 hover:text-gold-400 border border-gold-400/10"
                  }`}
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-obsidian-700 rounded-2xl overflow-hidden border border-gold-400/10 hover:border-gold-400/30 transition-all duration-500"
                >
                  <Link href={`/menu/${item.id}`} className="block">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-700 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {item.isSignature && (
                          <span className="px-3 py-1 bg-gold-gradient rounded-full font-body text-xs font-bold text-obsidian-900 flex items-center gap-1">
                            <Star className="w-3 h-3" aria-hidden="true" />
                            Signature
                          </span>
                        )}
                        {item.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-obsidian-900/80 backdrop-blur-sm border border-gold-400/20 rounded-full font-body text-xs text-gold-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="absolute top-4 right-4 px-4 py-1.5 bg-obsidian-900/90 backdrop-blur-sm border border-gold-400/20 rounded-lg">
                        <span className="font-display text-xl text-gold-400">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6 space-y-4">
                    <div>
                      <Link href={`/menu/${item.id}`}>
                        <h3 className="font-display text-lg sm:text-xl text-obsidian-100 group-hover:text-gold-400 transition-colors mb-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="font-body text-sm text-obsidian-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

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

                    {item.ingredients && (
                      <div className="flex flex-wrap gap-1">
                        {item.ingredients.slice(0, 3).map((ing) => (
                          <span
                            key={ing}
                            className="px-2 py-1 bg-obsidian-600/50 rounded-md font-body text-xs text-obsidian-400"
                          >
                            {ing}
                          </span>
                        ))}
                        {item.ingredients.length > 3 && (
                          <span className="px-2 py-1 font-body text-xs text-obsidian-500">
                            +{item.ingredients.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    {item.id === "chef-combo" && (
                      <div className="px-3 py-1.5 bg-ember/10 border border-ember/20 rounded-lg">
                        <span className="font-body text-xs text-ember-light font-semibold">
                          Save $10 compared to individual items
                        </span>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <GoldButton
                        className="flex-1"
                        size="sm"
                        onClick={() => cart.addItem(item)}
                      >
                        Add to Order
                      </GoldButton>
                      <Link
                        href={`/menu/${item.id}`}
                        className="w-10 h-10 rounded-xl bg-obsidian-600/50 border border-gold-400/20 flex items-center justify-center text-gold-400 hover:bg-gold-400 hover:text-obsidian-900 transition-all flex-shrink-0"
                        aria-label={`View details for ${item.name}`}
                      >
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className="w-16 h-16 text-obsidian-700 mx-auto mb-4" aria-hidden="true" />
              <h3 className="font-display text-2xl text-obsidian-300 mb-2">
                No creations found
              </h3>
              <p className="font-body text-obsidian-500">
                Try adjusting your search or filters
              </p>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
