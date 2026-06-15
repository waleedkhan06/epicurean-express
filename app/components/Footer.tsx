"use client";

import { motion } from "framer-motion";
import { Instagram, Twitter, Facebook, Youtube, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-obsidian-900 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="block group">
              <span className="font-display text-2xl text-gold-400 group-hover:text-gold-300 transition-colors">
                EPICUREAN
              </span>
              <span className="font-body text-xs text-gold-400/60 tracking-[0.3em] uppercase block">
                Express
              </span>
            </Link>
            <p className="font-body text-sm text-obsidian-400 leading-relaxed">
              Where culinary artistry meets unparalleled indulgence. Every bite is a masterpiece.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-obsidian-700 border border-gold-400/20 flex items-center justify-center text-obsidian-400 hover:text-gold-400 hover:border-gold-400/40 transition-colors"
                  aria-label={`Follow us on ${Icon.name}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg text-obsidian-100 mb-6">Explore</h3>
            <ul className="space-y-3">
              {[
                { label: "Our Menu", href: "/menu" },
                { label: "Locations", href: "/locations" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-obsidian-400 hover:text-gold-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg text-obsidian-100 mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-body text-sm text-obsidian-400">
                  42 Prince Street, New York, NY 10012
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-sm text-obsidian-400">
                  +1 (212) 555-0142
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                <span className="font-body text-sm text-obsidian-400">
                  concierge@epicurean.com
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display text-lg text-obsidian-100 mb-6">Join the Inner Circle</h3>
            <p className="font-body text-sm text-obsidian-400 mb-4">
              Exclusive offers, new creations, and culinary secrets.
            </p>
            <div className="flex gap-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="flex-1 bg-obsidian-700 border border-gold-400/20 rounded-lg px-4 py-3 font-body text-sm text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 bg-gold-gradient rounded-lg text-obsidian-900 font-body font-semibold"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gold-400/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-obsidian-600">
            &copy; {currentYear} Epicurean Express. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
              <Link
                key={link}
                href="#"
                className="font-body text-xs text-obsidian-600 hover:text-gold-400 transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
