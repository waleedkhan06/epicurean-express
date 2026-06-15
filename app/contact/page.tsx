"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { BackToTop } from "@/app/components/BackToTop";
import { AnimatedSection } from "@/app/components/AnimatedSection";
import { GoldButton } from "@/app/components/GoldButton";
import { useCart } from "@/app/hooks/useCart";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const cart = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
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
      />

      <PageHero
        overline="Get in Touch"
        title={<>Contact <span className="text-gold-400">Us</span></>}
        description="Whether you have a question, feedback, or want to plan a private event, our concierge team is at your service."
        breadcrumb={[{ label: "Contact" }]}
      />

      {/* Contact Content */}
      <section className="py-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <AnimatedSection direction="left" className="space-y-8">
              <div>
                <h2 className="font-display text-display-sm text-obsidian-100 mb-6">
                  The <span className="text-gold-400">Concierge</span>
                </h2>
                <p className="font-body text-obsidian-300 leading-relaxed mb-8">
                  Our dedicated team is available around the clock to assist with reservations, 
                  private dining inquiries, catering requests, and any special accommodations 
                  you may require.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, label: "Email", value: "concierge@epicurean.com" },
                  { icon: Phone, label: "Phone", value: "+1 (212) 555-0142" },
                  { icon: MapPin, label: "Headquarters", value: "42 Prince Street, New York, NY 10012" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-obsidian-700/50 border border-gold-400/10"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-gold-400" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-body text-sm text-obsidian-500 uppercase tracking-wider mb-1">
                        {item.label}
                      </div>
                      <div className="font-body text-obsidian-200">{item.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Response time */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gold-400/10 to-transparent border border-gold-400/20">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-gold-400" aria-hidden="true" />
                  <span className="font-body font-semibold text-gold-400">
                    Response Guarantee
                  </span>
                </div>
                <p className="font-body text-sm text-obsidian-400">
                  We respond to all inquiries within 2 hours during business hours, 
                  and within 12 hours for after-hours messages.
                </p>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection direction="right">
              <motion.form
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 rounded-2xl bg-obsidian-700 border border-gold-400/10 space-y-6"
              >
                <h3 className="font-display text-2xl text-obsidian-100 mb-2">
                  Send a Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block font-body text-sm text-obsidian-400 mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-obsidian-600 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block font-body text-sm text-obsidian-400 mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-obsidian-600 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block font-body text-sm text-obsidian-400 mb-2">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-obsidian-600 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Private Dining</option>
                    <option value="catering">Catering Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="press">Press & Media</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block font-body text-sm text-obsidian-400 mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-obsidian-600 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-500 focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us how we can assist you..."
                  />
                </div>

                <GoldButton className="w-full" size="lg">
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Message
                  </span>
                </GoldButton>

                {/* Success message */}
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: isSubmitted ? 1 : 0, 
                    height: isSubmitted ? "auto" : 0 
                  }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" aria-hidden="true" />
                    <span className="font-body text-green-400">
                      Message sent successfully! We&apos;ll be in touch shortly.
                    </span>
                  </div>
                </motion.div>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </main>
  );
}
