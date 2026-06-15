"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift } from "lucide-react";
import { GoldButton } from "./GoldButton";

export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("epicurean-newsletter-dismissed");
    if (dismissed) return;

    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 15000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("epicurean-newsletter-dismissed", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("epicurean-newsletter-dismissed", "true");
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-md w-full bg-obsidian-800 border border-gold-400/20 rounded-2xl p-6 sm:p-8"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-obsidian-500 hover:text-gold-400 transition-colors"
              aria-label="Close newsletter popup"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                  <Gift className="w-8 h-8 text-gold-400" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl text-obsidian-100 text-center mb-2">
                  Join the Inner Circle
                </h3>
                <p className="font-body text-sm text-obsidian-400 text-center mb-6">
                  Subscribe for exclusive offers, new creations, and culinary secrets. 
                  Get 15% off your first order.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-obsidian-700 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
                  />
                  <GoldButton className="w-full">Claim My 15% Off</GoldButton>
                </form>
                <p className="font-body text-xs text-obsidian-600 text-center mt-4">
                  No spam, ever. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-green-400" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl text-obsidian-100 mb-2">
                  Welcome to the Circle
                </h3>
                <p className="font-body text-sm text-obsidian-400">
                  Check your inbox for your exclusive 15% discount code.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
