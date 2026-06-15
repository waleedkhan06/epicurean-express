"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { navLinks } from "@/app/lib/data";
import { GoldButton } from "./GoldButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-obsidian-800/80 backdrop-blur-2xl border-b border-gold-400/10 shadow-2xl shadow-black/50"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group" aria-label="Epicurean Express Home">
              <span className="font-display text-2xl sm:text-3xl text-gold-400 tracking-wider group-hover:text-gold-300 transition-colors duration-500 relative">
                EPICUREAN
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold-gradient group-hover:w-full transition-all duration-500" />
              </span>
              <span className="font-body text-[10px] text-gold-400/60 tracking-[0.3em] uppercase">
                Express
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`font-body text-sm tracking-[0.15em] uppercase transition-all duration-300 relative ${
                      isActive
                        ? "text-gold-400"
                        : "text-obsidian-200 hover:text-gold-400"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-gold-gradient rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-5">
              <motion.button
                onClick={onCartClick}
                className="relative text-obsidian-200 hover:text-gold-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Shopping cart with ${cartCount} items`}
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-gold-400 text-obsidian-900 text-[11px] font-bold rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <div className="hidden md:block">
                <GoldButton size="sm" href="/menu">
                  Order Now
                </GoldButton>
              </div>

              {/* Mobile Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-obsidian-200 hover:text-gold-400 transition-colors"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-obsidian-800/98 backdrop-blur-2xl pt-24 overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-10 p-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`font-display text-4xl sm:text-5xl transition-colors duration-300 ${
                        isActive ? "text-gold-400" : "text-obsidian-100 hover:text-gold-400"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <GoldButton size="lg" href="/menu" onClick={() => setIsMobileMenuOpen(false)}>
                  Order Now
                </GoldButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
