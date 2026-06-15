"use client";

import { useState, useEffect } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { PageHero } from "@/app/components/PageHero";
import { BackToTop } from "@/app/components/BackToTop";
import { GoldButton } from "@/app/components/GoldButton";
import { useCart } from "@/app/hooks/useCart";
import { formatPrice } from "@/app/lib/utils";
import { User, ShoppingBag, LogOut, Package, Calendar, Clock, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SavedOrder {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  date: string;
  status: string;
}

export default function SettingsPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const cart = useCart();
  const [orders, setOrders] = useState<SavedOrder[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("epicurean-orders");
    if (saved) {
      try { setOrders(JSON.parse(saved)); } catch { /* ignore */ }
    }
  }, []);

  const [activeTab, setActiveTab] = useState("profile");
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Order History", icon: Package },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-obsidian-800 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    router.push("/sign-in");
    return null;
  }

  const handleSignOut = () => {
    cart.clearCart();
    signOut({ redirectUrl: "/" });
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

      <PageHero
        overline="Account"
        title={<>Your <span className="text-gold-400">Settings</span></>}
        description="Manage your profile, view order history, and account preferences."
        breadcrumb={[{ label: "Settings" }]}
      />

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex gap-1 mb-10 p-1 bg-obsidian-700/50 rounded-2xl border border-gold-400/10 w-fit">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gold-gradient text-obsidian-900 font-semibold"
                      : "text-obsidian-400 hover:text-gold-400"
                  }`}
                >
                  <TabIcon className="w-4 h-4" aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* User Info Card */}
              <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gold-400/30 flex-shrink-0">
                    {user?.imageUrl ? (
                      <Image src={user.imageUrl} alt="" fill className="object-cover" sizes="80px" />
                    ) : (
                      <div className="w-full h-full bg-obsidian-600 flex items-center justify-center">
                        <User className="w-8 h-8 text-obsidian-400" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-display text-2xl text-obsidian-100">
                      {user?.fullName || "User"}
                    </h2>
                    <p className="font-body text-obsidian-400 mt-1">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                    <p className="font-body text-xs text-gold-400 mt-1">
                      Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Today"}
                    </p>
                  </div>
                  <GoldButton variant="outline" size="sm" onClick={handleSignOut}>
                    <span className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" aria-hidden="true" />
                      Sign Out
                    </span>
                  </GoldButton>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-obsidian-700/50 rounded-2xl p-6 sm:p-8 border border-gold-400/10">
                <h3 className="font-display text-lg text-obsidian-100 mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm text-obsidian-400">Email</p>
                      <p className="font-body text-obsidian-200">{user?.primaryEmailAddress?.emailAddress || "—"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-body text-sm text-obsidian-400">Phone</p>
                      <p className="font-body text-obsidian-200">{user?.primaryPhoneNumber?.phoneNumber || "—"}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gold-400/10">
                    <p className="font-body text-xs text-obsidian-500">
                      Manage your account details on{" "}
                      <a
                        href="https://clerk.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gold-400 hover:underline"
                      >
                        Clerk Dashboard
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-obsidian-700/50 rounded-2xl border border-gold-400/10">
                  <Package className="w-16 h-16 text-obsidian-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="font-display text-xl text-obsidian-300 mb-2">No orders yet</h3>
                  <p className="font-body text-obsidian-500 mb-6">
                    Your culinary journey starts with your first order.
                  </p>
                  <GoldButton href="/menu">Browse the Menu</GoldButton>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-obsidian-700/50 rounded-2xl p-6 border border-gold-400/10"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-display text-lg text-obsidian-100">
                              Order #{order.id.slice(-6).toUpperCase()}
                            </span>
                            <span className="px-3 py-1 bg-gold-400/10 border border-gold-400/20 rounded-full font-body text-xs text-gold-400">
                              {order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 font-body text-sm text-obsidian-500">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                              {new Date(order.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                              {new Date(order.date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                            </span>
                          </div>
                        </div>
                        <span className="font-display text-xl text-gold-400">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between font-body text-sm">
                            <span className="text-obsidian-400">
                              <span className="text-obsidian-500">{item.quantity}x</span> {item.name}
                            </span>
                            <span className="text-obsidian-300">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <BackToTop />
      <Footer />
    </main>
  );
}
