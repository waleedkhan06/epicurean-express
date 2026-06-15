"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { GoldButton } from "@/app/components/GoldButton";
import { BackToTop } from "@/app/components/BackToTop";
import { useCart } from "@/app/hooks/useCart";
import { menuItems } from "@/app/lib/data";
import { formatPrice } from "@/app/lib/utils";
import { Clock, Flame, Star, ChevronLeft, Check, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const cart = useCart();
  const item = menuItems.find((i) => i.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  if (!item) return notFound();

  const relatedItems = menuItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cart.addItem(item, selectedOptions);
    }
  };

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
        onAddItem={(i) => cart.addItem(i)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Breadcrumb */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-2 font-body text-sm text-obsidian-400 hover:text-gold-400 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/3] lg:aspect-square rounded-3xl overflow-hidden bg-obsidian-700"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800/60 via-transparent to-transparent" />
            {item.isSignature && (
              <div className="absolute top-6 left-6 px-4 py-2 bg-gold-gradient rounded-full flex items-center gap-2">
                <Star className="w-4 h-4 text-obsidian-900" aria-hidden="true" />
                <span className="font-body text-sm font-bold text-obsidian-900">Signature</span>
              </div>
            )}
            <div className="absolute bottom-6 left-6 px-5 py-2 bg-obsidian-900/80 backdrop-blur-sm border border-gold-400/20 rounded-xl">
              <span className="font-display text-3xl text-gold-400">{formatPrice(item.price)}</span>
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase mb-3">
              {item.category}
            </span>
            <h1 className="font-display text-display-sm sm:text-display-md text-obsidian-100 mb-4 text-balance">
              {item.name}
            </h1>
            <p className="font-body text-obsidian-300 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Specs */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gold-400/10">
              <div className="flex items-center gap-2 text-sm text-obsidian-400">
                <Clock className="w-4 h-4 text-gold-400" aria-hidden="true" />
                {item.prepTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-obsidian-400">
                <Flame className="w-4 h-4 text-gold-400" aria-hidden="true" />
                {item.calories} cal
              </div>
            </div>

            {/* Ingredients */}
            {item.ingredients && (
              <div className="mb-8">
                <h3 className="font-body text-sm text-obsidian-500 uppercase tracking-wider mb-3">
                  Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="px-3 py-1.5 bg-obsidian-700 border border-gold-400/10 rounded-lg font-body text-sm text-obsidian-200"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Customization */}
            {item.customization && item.customization.length > 0 && (
              <div className="mb-8 space-y-6">
                <h3 className="font-body text-sm text-obsidian-500 uppercase tracking-wider">
                  Customize Your Order
                </h3>
                {item.customization.map((group) => (
                  <div key={group.name}>
                    <p className="font-body text-sm text-obsidian-300 mb-3">{group.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map((opt) => {
                        const isSelected = selectedOptions[group.name] === opt.label ||
                          (!selectedOptions[group.name] && opt.label === group.options[0].label);
                        return (
                          <button
                            key={opt.label}
                            onClick={() => setSelectedOptions((prev) => ({ ...prev, [group.name]: opt.label }))}
                            className={`px-4 py-2 rounded-full font-body text-sm border transition-all ${
                              isSelected
                                ? "bg-gold-gradient text-obsidian-900 border-gold-400 font-semibold"
                                : "bg-obsidian-700 text-obsidian-400 border-gold-400/20 hover:border-gold-400/40"
                            }`}
                          >
                            {opt.label}{opt.price > 0 ? ` (+${formatPrice(opt.price)})` : ""}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-auto pt-6 border-t border-gold-400/10">
              <div className="flex items-center gap-4 mb-4">
                <span className="font-body text-sm text-obsidian-400">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-full bg-obsidian-700 border border-gold-400/20 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <span className="font-body font-semibold text-xl text-obsidian-100 w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-full bg-obsidian-700 border border-gold-400/20 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <GoldButton size="lg" className="w-full" onClick={handleAddToCart}>
                <span className="flex items-center justify-center gap-2">
                  Add to Order — {formatPrice(item.price * quantity)}
                </span>
              </GoldButton>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="mt-24">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="font-body text-xs text-gold-400 tracking-[0.3em] uppercase block mb-2">
                  You May Also Like
                </span>
                <h2 className="font-display text-display-xs sm:text-display-sm text-obsidian-100">
                  More from <span className="text-gold-400">{item.category}</span>
                </h2>
              </div>
              <Link
                href="/menu"
                className="font-body text-sm text-gold-400 hover:text-gold-300 transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((related) => (
                <Link key={related.id} href={`/menu/${related.id}`} className="group">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-obsidian-700 border border-gold-400/10 group-hover:border-gold-400/30 transition-all duration-500">
                    <Image
                      src={related.image}
                      alt={related.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-display text-lg text-obsidian-100 group-hover:text-gold-400 transition-colors">
                        {related.name}
                      </h3>
                      <span className="font-body text-sm text-gold-400">
                        {formatPrice(related.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
