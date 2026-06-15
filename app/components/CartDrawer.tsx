"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { CartItem, MenuItem } from "@/app/types";
import { formatPrice } from "@/app/lib/utils";
import { GoldButton } from "./GoldButton";
import Image from "next/image";
import { menuItems } from "@/app/lib/data";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (id: string, quantity: number, options?: Record<string, string>) => void;
  onRemove: (id: string, options?: Record<string, string>) => void;
  onClear: () => void;
  onAddItem?: (item: MenuItem) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  totalPrice,
  onUpdateQuantity,
  onRemove,
  onClear,
  onAddItem,
}: CartDrawerProps) {
  const suggestedItems = menuItems
    .filter((item) => item.price < 20 && !items.some((i) => i.id === item.id))
    .slice(0, 3);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-obsidian-800 border-l border-gold-400/10 z-50 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gold-400/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-gold-400" aria-hidden="true" />
                <h2 className="font-display text-xl text-obsidian-100">Your Order</h2>
              </div>
              <button
                onClick={onClose}
                className="text-obsidian-300 hover:text-gold-400 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <ShoppingBag className="w-16 h-16 text-obsidian-600 mx-auto mb-4" aria-hidden="true" />
                    <p className="font-body text-obsidian-400">Your cart is empty</p>
                    <p className="font-body text-sm text-obsidian-500 mt-2">
                      Add some culinary masterpieces
                    </p>
                  </motion.div>
                ) : (
                  <>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.id}-${JSON.stringify(item.selectedOptions)}`}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9, x: 100 }}
                        className="flex gap-4 bg-obsidian-700/50 rounded-xl p-3 sm:p-4 border border-gold-400/5"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-body font-semibold text-obsidian-100 text-sm truncate">
                            {item.name}
                          </h3>
                          {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                            <p className="text-xs text-obsidian-400 mt-1">
                              {Object.entries(item.selectedOptions)
                                .map(([, v]) => v)
                                .join(", ")}
                            </p>
                          )}
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.selectedOptions)}
                                className="w-7 h-7 rounded-full bg-obsidian-600 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                <Minus className="w-3 h-3" aria-hidden="true" />
                              </button>
                              <span className="font-body font-semibold text-obsidian-100 w-6 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedOptions)}
                                className="w-7 h-7 rounded-full bg-obsidian-600 flex items-center justify-center text-obsidian-300 hover:bg-gold-400 hover:text-obsidian-900 transition-colors"
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                <Plus className="w-3 h-3" aria-hidden="true" />
                              </button>
                            </div>
                            <span className="font-body font-semibold text-gold-400">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => onRemove(item.id, item.selectedOptions)}
                          className="text-obsidian-500 hover:text-ember-light transition-colors self-start"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </motion.div>
                    ))}

                    {/* Suggested add-ons */}
                    {suggestedItems.length > 0 && onAddItem && (
                      <div className="pt-4 border-t border-gold-400/10">
                        <p className="font-body text-xs text-obsidian-500 uppercase tracking-wider mb-3">
                          Complete your meal
                        </p>
                        <div className="space-y-2">
                          {suggestedItems.map((suggestion) => (
                            <button
                              key={suggestion.id}
                              onClick={() => onAddItem(suggestion)}
                              className="w-full flex items-center gap-3 p-3 rounded-xl bg-obsidian-700/30 border border-gold-400/5 hover:border-gold-400/20 transition-colors text-left group"
                            >
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                  src={suggestion.image}
                                  alt={suggestion.name}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="font-body text-sm text-obsidian-200 group-hover:text-gold-400 transition-colors truncate block">
                                  {suggestion.name}
                                </span>
                              </div>
                              <span className="font-body text-sm text-gold-400 flex-shrink-0">
                                +{formatPrice(suggestion.price)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-gold-400/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-body text-obsidian-400">Subtotal</span>
                  <span className="font-display text-xl text-gold-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <GoldButton className="w-full" size="lg" href="/order">
                  Proceed to Checkout
                </GoldButton>
                <button
                  onClick={onClear}
                  className="w-full text-center font-body text-sm text-obsidian-500 hover:text-ember-light transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
