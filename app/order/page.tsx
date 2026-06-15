"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { GoldButton } from "@/app/components/GoldButton";
import { BackToTop } from "@/app/components/BackToTop";
import { useCart } from "@/app/hooks/useCart";
import { menuItems } from "@/app/lib/data";
import { formatPrice } from "@/app/lib/utils";
import { Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function OrderPage() {
  const cart = useCart();

  const suggestedItems = menuItems
    .filter((item) => item.price < 20 && !cart.items.some((i) => i.id === item.id))
    .slice(0, 4);

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

      <PageHero
        overline="Your Order"
        title={<>Review Your <span className="text-gold-400">Selection</span></>}
        description="Review your selections before proceeding to checkout."
        breadcrumb={[{ label: "Order" }]}
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {cart.items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-20 h-20 text-obsidian-700 mx-auto mb-6" aria-hidden="true" />
              <h2 className="font-display text-2xl text-obsidian-300 mb-3">Your order is empty</h2>
              <p className="font-body text-obsidian-500 mb-8">
                Start building your culinary experience.
              </p>
              <GoldButton href="/menu">Browse the Menu</GoldButton>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl text-obsidian-100">
                    Items ({cart.totalItems})
                  </h2>
                  <button
                    onClick={cart.clearCart}
                    className="font-body text-sm text-obsidian-500 hover:text-ember-light transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <AnimatePresence mode="popLayout">
                  {cart.items.map((item) => (
                    <motion.div
                      key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, scale: 0.9 }}
                      className="flex gap-5 bg-obsidian-700/50 rounded-2xl p-5 border border-gold-400/10"
                    >
                      <Link href={`/menu/${item.id}`} className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <Link href={`/menu/${item.id}`}>
                              <h3 className="font-body font-semibold text-obsidian-100 hover:text-gold-400 transition-colors">
                                {item.name}
                              </h3>
                            </Link>
                            {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                              <p className="font-body text-sm text-obsidian-400 mt-1">
                                {Object.values(item.selectedOptions).join(", ")}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => cart.removeItem(item.id, item.selectedOptions)}
                            className="text-obsidian-500 hover:text-ember-light transition-colors flex-shrink-0"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => cart.updateQuantity(item.id, item.quantity - 1, item.selectedOptions)}
                              className="w-8 h-8 rounded-full bg-obsidian-600 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                              aria-label={`Decrease quantity`}
                            >
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <span className="font-body font-semibold text-obsidian-100 w-7 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => cart.updateQuantity(item.id, item.quantity + 1, item.selectedOptions)}
                              className="w-8 h-8 rounded-full bg-obsidian-600 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                              aria-label={`Increase quantity`}
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>
                          <span className="font-display text-lg text-gold-400">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Suggestions */}
                {suggestedItems.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-gold-400/10">
                    <div className="flex items-center gap-2 mb-5">
                      <Tag className="w-4 h-4 text-gold-400" aria-hidden="true" />
                      <h3 className="font-body text-sm text-obsidian-400 uppercase tracking-wider">
        Complete Your Experience
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {suggestedItems.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => cart.addItem(s)}
                          className="flex items-center gap-4 p-4 rounded-xl bg-obsidian-700/30 border border-gold-400/5 hover:border-gold-400/20 transition-all text-left group"
                        >
                          <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={s.image}
                              alt={s.name}
                              fill
                              className="object-cover"
                              sizes="56px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="font-body text-sm text-obsidian-200 group-hover:text-gold-400 transition-colors block truncate">
                              {s.name}
                            </span>
                            <span className="font-body text-xs text-obsidian-500">{formatPrice(s.price)}</span>
                          </div>
                          <Plus className="w-5 h-5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10">
                  <h3 className="font-display text-xl text-obsidian-100 mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between font-body text-obsidian-300">
                      <span>Subtotal ({cart.totalItems} items)</span>
                      <span>{formatPrice(cart.totalPrice)}</span>
                    </div>
                    <div className="flex items-center justify-between font-body text-obsidian-300">
                      <span>Service Fee</span>
                      <span>{formatPrice(0)}</span>
                    </div>
                    <div className="flex items-center justify-between font-body text-obsidian-300">
                      <span>Estimated Tax</span>
                      <span>{formatPrice(Math.round(cart.totalPrice * 0.08))}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gold-400/10">
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-display text-lg text-obsidian-100">Total</span>
                      <span className="font-display text-2xl text-gold-400">
                        {formatPrice(cart.totalPrice + Math.round(cart.totalPrice * 0.08))}
                      </span>
                    </div>
                    <GoldButton size="lg" className="w-full" href="/checkout">
                      <span className="flex items-center justify-center gap-2">
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </GoldButton>
                    <Link
                      href="/menu"
                      className="block text-center font-body text-sm text-obsidian-500 hover:text-gold-400 transition-colors mt-4"
                    >
                      Continue Ordering
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <BackToTop />
      <Footer />
    </main>
  );
}
