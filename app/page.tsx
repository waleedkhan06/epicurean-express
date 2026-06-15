"use client";

import { Navbar } from "@/app/components/Navbar";
import { CartDrawer } from "@/app/components/CartDrawer";
import { Footer } from "@/app/components/Footer";
import { ScrollProgress } from "@/app/components/ScrollProgress";
import { SocialProofBar } from "@/app/components/SocialProofBar";
import { NewsletterPopup } from "@/app/components/NewsletterPopup";
import { BackToTop } from "@/app/components/BackToTop";
import { HeroSection } from "@/app/sections/HeroSection";
import { SignatureCreations } from "@/app/sections/SignatureCreations";
import { WhyEpicurean } from "@/app/sections/WhyEpicurean";
import { Testimonials } from "@/app/sections/Testimonials";
import { CraftedForConnoisseurs } from "@/app/sections/CraftedForConnoisseurs";
import { ParallaxImageSection } from "@/app/sections/ParallaxImageSection";
import { CTASection } from "@/app/sections/CTASection";
import { useCart } from "@/app/hooks/useCart";
import { MenuItem } from "@/app/types";

export default function Home() {
  const cart = useCart();

  const handleAddItem = (item: MenuItem) => {
    cart.addItem(item);
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
        onAddItem={handleAddItem}
      />

      <HeroSection />
      <SignatureCreations />
      <WhyEpicurean />
      <ParallaxImageSection />
      <CraftedForConnoisseurs />
      <Testimonials />
      <CTASection />
      <Footer />

      <SocialProofBar />
      <NewsletterPopup />
      <BackToTop />
    </main>
  );
}
