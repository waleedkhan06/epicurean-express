"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { GoldButton } from "@/app/components/GoldButton";
import { BackToTop } from "@/app/components/BackToTop";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/lib/utils";
import { Check, ChevronLeft, CreditCard, Truck, User, Shield, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  { id: "info", label: "Information", icon: User },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "confirm", label: "Confirm", icon: Shield },
];

export default function CheckoutPage() {
  const cart = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
    notes: "",
  });

  const updateForm = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      const order = {
        id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        items: cart.items.map((i) => ({
          name: i.name,
          quantity: i.quantity,
          price: i.price,
        })),
        total: cart.totalPrice + Math.round(cart.totalPrice * 0.08),
        date: new Date().toISOString(),
        status: "Confirmed",
      };
      const existing = JSON.parse(localStorage.getItem("epicurean-orders") || "[]");
      existing.unshift(order);
      localStorage.setItem("epicurean-orders", JSON.stringify(existing));
      setIsComplete(true);
    }
  };

  const stepLabels = ["Information", "Shipping", "Payment", "Confirmation"];

  if (isComplete) {
    return (
      <main className="min-h-screen bg-obsidian-800">
        <ScrollProgress />
        <Navbar cartCount={cart.totalItems} onCartClick={() => cart.setIsOpen(true)} />
        <div className="max-w-lg mx-auto px-4 pt-32 pb-24 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 rounded-full bg-gold-gradient mx-auto mb-8 flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-obsidian-900" aria-hidden="true" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-display-sm text-obsidian-100 mb-4"
          >
            Order Confirmed
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-obsidian-300 mb-6"
          >
            Thank you, {form.firstName}! Your culinary experience is being prepared with the utmost care.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-obsidian-700/50 rounded-2xl p-6 border border-gold-400/10 mb-8"
          >
            <p className="font-body text-sm text-obsidian-400 mb-2">Estimated Preparation Time</p>
            <p className="font-display text-2xl text-gold-400">15–20 minutes</p>
            <div className="mt-4 pt-4 border-t border-gold-400/10">
              <p className="font-body text-sm text-obsidian-500">A confirmation has been sent to</p>
              <p className="font-body text-obsidian-300">{form.email}</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <GoldButton href="/menu">Order Again</GoldButton>
            <GoldButton variant="outline" href="/">Return Home</GoldButton>
          </motion.div>
        </div>
      </main>
    );
  }

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
        overline="Checkout"
        title={<>Complete Your <span className="text-gold-400">Order</span></>}
        description="Almost there. Please review and confirm your details."
        breadcrumb={[{ label: "Order", href: "/order" }, { label: "Checkout" }]}
      />

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="flex items-center gap-0 mb-12">
                {steps.map((step, i) => {
                  const StepIcon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-semibold transition-all duration-500 ${
                            i < currentStep
                              ? "bg-gold-gradient text-obsidian-900"
                              : i === currentStep
                              ? "bg-gold-400/20 border-2 border-gold-400 text-gold-400"
                              : "bg-obsidian-700 text-obsidian-500"
                          }`}
                        >
                          {i < currentStep ? <Check className="w-5 h-5" /> : <StepIcon className="w-4 h-4" />}
                        </div>
                        <span className={`hidden sm:block font-body text-sm ${
                          i <= currentStep ? "text-obsidian-200" : "text-obsidian-500"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {i < steps.length - 1 && (
                        <div className={`flex-1 h-px mx-4 ${
                          i < currentStep ? "bg-gold-400" : "bg-obsidian-600"
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Step 1: Information */}
                    {currentStep === 0 && (
                      <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10 space-y-5">
                        <h3 className="font-display text-xl text-obsidian-100 mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block font-body text-sm text-obsidian-400 mb-2">
                              First Name
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              required
                              value={form.firstName}
                              onChange={(e) => updateForm("firstName", e.target.value)}
                              className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                              placeholder="John"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block font-body text-sm text-obsidian-400 mb-2">
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              required
                              value={form.lastName}
                              onChange={(e) => updateForm("lastName", e.target.value)}
                              className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                              placeholder="Doe"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block font-body text-sm text-obsidian-400 mb-2">
                            Email Address
                          </label>
                          <input
                            id="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block font-body text-sm text-obsidian-400 mb-2">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Shipping */}
                    {currentStep === 1 && (
                      <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10 space-y-5">
                        <h3 className="font-display text-xl text-obsidian-100 mb-6">Delivery Address</h3>
                        <div>
                          <label htmlFor="address" className="block font-body text-sm text-obsidian-400 mb-2">
                            Street Address
                          </label>
                          <input
                            id="address"
                            type="text"
                            required
                            value={form.address}
                            onChange={(e) => updateForm("address", e.target.value)}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                            placeholder="123 Gourmet Lane"
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2">
                            <label htmlFor="city" className="block font-body text-sm text-obsidian-400 mb-2">
                              City
                            </label>
                            <input
                              id="city"
                              type="text"
                              required
                              value={form.city}
                              onChange={(e) => updateForm("city", e.target.value)}
                              className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                              placeholder="New York"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-col">
                            <div>
                              <label htmlFor="state" className="block font-body text-sm text-obsidian-400 mb-2">
                                State
                              </label>
                              <input
                                id="state"
                                type="text"
                                required
                                value={form.state}
                                onChange={(e) => updateForm("state", e.target.value)}
                                className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                                placeholder="NY"
                              />
                            </div>
                            <div>
                              <label htmlFor="zip" className="block font-body text-sm text-obsidian-400 mb-2">
                                ZIP
                              </label>
                              <input
                                id="zip"
                                type="text"
                                required
                                value={form.zip}
                                onChange={(e) => updateForm("zip", e.target.value)}
                                className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                                placeholder="10012"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="notes" className="block font-body text-sm text-obsidian-400 mb-2">
                            Delivery Notes (Optional)
                          </label>
                          <textarea
                            id="notes"
                            value={form.notes}
                            onChange={(e) => updateForm("notes", e.target.value)}
                            rows={3}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors resize-none"
                            placeholder="Gate code, floor number, etc."
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Payment */}
                    {currentStep === 2 && (
                      <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10 space-y-5">
                        <h3 className="font-display text-xl text-obsidian-100 mb-2">Payment Details</h3>
                        <p className="font-body text-sm text-obsidian-500 mb-6">
                          This is a demo — no real payment will be processed.
                        </p>
                        <div>
                          <label htmlFor="cardName" className="block font-body text-sm text-obsidian-400 mb-2">
                            Cardholder Name
                          </label>
                          <input
                            id="cardName"
                            type="text"
                            required
                            value={form.cardName}
                            onChange={(e) => updateForm("cardName", e.target.value)}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                            placeholder="John Doe"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardNumber" className="block font-body text-sm text-obsidian-400 mb-2">
                            Card Number
                          </label>
                          <input
                            id="cardNumber"
                            type="text"
                            required
                            value={form.cardNumber}
                            onChange={(e) => updateForm("cardNumber", e.target.value)}
                            maxLength={19}
                            className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                            placeholder="4242 4242 4242 4242"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expDate" className="block font-body text-sm text-obsidian-400 mb-2">
                              Expiry Date
                            </label>
                            <input
                              id="expDate"
                              type="text"
                              required
                              value={form.expDate}
                              onChange={(e) => updateForm("expDate", e.target.value)}
                              maxLength={5}
                              className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvv" className="block font-body text-sm text-obsidian-400 mb-2">
                              CVV
                            </label>
                            <input
                              id="cvv"
                              type="text"
                              required
                              value={form.cvv}
                              onChange={(e) => updateForm("cvv", e.target.value)}
                              maxLength={4}
                              className="w-full bg-obsidian-800 border border-gold-400/20 rounded-xl px-4 py-3 font-body text-obsidian-100 placeholder:text-obsidian-600 focus:outline-none focus:ring-2 focus:ring-gold-400/40 transition-colors"
                              placeholder="123"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 4: Confirm */}
                    {currentStep === 3 && (
                      <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10 space-y-5">
                        <h3 className="font-display text-xl text-obsidian-100 mb-6">Review Your Order</h3>

                        <div className="space-y-3 mb-6">
                          {cart.items.map((item) => (
                            <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex items-center justify-between font-body text-sm">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="text-obsidian-500 w-6 text-right">{item.quantity}x</span>
                                <span className="text-obsidian-200 truncate">{item.name}</span>
                              </div>
                              <span className="text-gold-400 flex-shrink-0 ml-4">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 border-t border-gold-400/10 space-y-2 font-body text-sm">
                          <div className="flex justify-between text-obsidian-400">
                            <span>Contact</span>
                            <span className="text-obsidian-200">{form.email}</span>
                          </div>
                          <div className="flex justify-between text-obsidian-400">
                            <span>Deliver to</span>
                            <span className="text-obsidian-200 text-right max-w-[60%]">{form.address}, {form.city}</span>
                          </div>
                          {form.notes && (
                            <div className="flex justify-between text-obsidian-400">
                              <span>Notes</span>
                              <span className="text-obsidian-200 text-right max-w-[60%]">{form.notes}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between mt-8">
                  {currentStep > 0 ? (
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="inline-flex items-center gap-2 font-body text-sm text-obsidian-400 hover:text-gold-400 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Back
                    </button>
                  ) : (
                    <div />
                  )}
                  <GoldButton type="submit" size="lg">
                    {currentStep < steps.length - 1 ? (
                      <span className="flex items-center gap-2">
                        Continue
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4" aria-hidden="true" />
                        Place Order
                      </span>
                    )}
                  </GoldButton>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10">
                <h3 className="font-display text-lg text-obsidian-100 mb-6">Order Summary</h3>

                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.selectedOptions)}`} className="flex gap-3">
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm text-obsidian-200 truncate">{item.name}</p>
                        <p className="font-body text-xs text-obsidian-500">Qty: {item.quantity}</p>
                        <p className="font-body text-sm text-gold-400">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gold-400/10 space-y-3 font-body text-sm">
                  <div className="flex justify-between text-obsidian-400">
                    <span>Subtotal</span>
                    <span>{formatPrice(cart.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-obsidian-400">
                    <span>Tax (8%)</span>
                    <span>{formatPrice(Math.round(cart.totalPrice * 0.08))}</span>
                  </div>
                  <div className="pt-3 border-t border-gold-400/10 flex justify-between">
                    <span className="font-display text-base text-obsidian-100">Total</span>
                    <span className="font-display text-xl text-gold-400">
                      {formatPrice(cart.totalPrice + Math.round(cart.totalPrice * 0.08))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </main>
  );
}
