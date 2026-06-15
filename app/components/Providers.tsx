"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ToastProvider } from "./Toast";

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: "#D4AF37",
    colorBackground: "#0A0A0A",
    colorInputBackground: "#1A1A1A",
    colorInputText: "#E6E6E6",
    colorText: "#E6E6E6",
    colorTextSecondary: "#999999",
    colorNeutral: "#333333",
    fontFamily: "Inter, system-ui, sans-serif",
    borderRadius: "0.75rem",
  },
  elements: {
    formButtonPrimary: "bg-gold-gradient text-obsidian-900 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] border-none",
    card: "bg-obsidian-800 border border-gold-400/10 shadow-xl",
    headerTitle: "font-display text-obsidian-100",
    headerSubtitle: "text-obsidian-400",
    socialButtonsBlockButton: "border-gold-400/20 text-obsidian-200 hover:bg-obsidian-700",
    formFieldLabel: "text-obsidian-400",
    formFieldInput: "bg-obsidian-800 border-gold-400/20 text-obsidian-100",
    footerActionLink: "text-gold-400 hover:text-gold-300",
    identityPreviewText: "text-obsidian-300",
    identityPreviewEditButton: "text-gold-400",
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={clerkAppearance}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <ToastProvider>{children}</ToastProvider>
    </ClerkProvider>
  );
}
