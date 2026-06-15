import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FDF8E8",
          100: "#F9EDC0",
          200: "#F3DB81",
          300: "#EDC942",
          400: "#D4AF37",
          500: "#B8960B",
          600: "#8A7008",
          700: "#5C4A05",
          800: "#2E2503",
          900: "#171201",
        },
        obsidian: {
          50: "#F2F2F2",
          100: "#E6E6E6",
          200: "#BFBFBF",
          300: "#999999",
          400: "#666666",
          500: "#333333",
          600: "#1A1A1A",
          700: "#0F0F0F",
          800: "#0A0A0A",
          900: "#050505",
        },
        truffle: { DEFAULT: "#3D2B1F", light: "#5C4033", dark: "#2A1D15" },
        ember: { DEFAULT: "#8B2500", light: "#B83200", dark: "#5C1800" },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Satoshi", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-lg": ["3.75rem", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-xs": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.005em" }],
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "drift": "drift 20s ease-in-out infinite",
        "drift-reverse": "driftReverse 25s ease-in-out infinite",
        "ken-burns": "kenBurns 20s ease-in-out infinite alternate",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.2)" },
          "50%": { boxShadow: "0 0 60px rgba(212, 175, 55, 0.5)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(20px, -15px)" },
          "66%": { transform: "translate(-15px, -25px)" },
        },
        driftReverse: {
          "0%, 100%": { transform: "translate(0px, 0px)" },
          "33%": { transform: "translate(-20px, 15px)" },
          "66%": { transform: "translate(15px, 25px)" },
        },
        kenBurns: {
          "0%": { transform: "scale(1) translate(0%, 0%)" },
          "100%": { transform: "scale(1.08) translate(-1%, -0.5%)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #F3DB81 50%, #B8960B 100%)",
        "dark-radial": "radial-gradient(ellipse at center, #1A1A1A 0%, #0A0A0A 100%)",
        "hero-overlay": "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 50%, rgba(10,10,10,0.9) 100%)",
        "hero-vignette": "radial-gradient(ellipse at center, transparent 50%, rgba(5,5,5,0.7) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
