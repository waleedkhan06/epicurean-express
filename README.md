# Epicurean Express

> **The Culinary Revolution Has Arrived.**
>
> A complete, ultra-premium luxury gourmet burger website built with Next.js 16, Tailwind CSS, and Framer Motion.

<img src="public/images/logo.jpg" alt="Epicurean Express" style="width:100%;max-width:800px;height:180px;object-fit:cover;border-radius:8px;" />

## Overview

Epicurean Express represents the highest level of indulgence — Wagyu burgers, black truffles, aged cheeses, and fine dining experience in fast-casual form. This website features a dark, moody, cinematic, seductive luxury aesthetic with dramatic food photography, volumetric smoke effects, and Apple-level attention to detail.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router & Turbopack |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Utility-first styling with custom luxury theme |
| **Framer Motion** | Cinematic scroll animations, parallax, micro-interactions |
| **Lucide React** | Premium iconography |
| **clsx + tailwind-merge** | Conditional class composition |

## Design System

### Color Palette
- **Deep Black** `#0A0A0A` — Primary background
- **Rich Gold** `#D4AF37` — Primary accent, CTAs, highlights
- **Warm Amber** — Secondary accents
- **Off-White** `#F2F2F2` — Primary text
- **Dark Red/Maroon** — Subtle highlights

### Typography
- **Playfair Display** — Elegant serif for headlines
- **Inter** — Clean sans-serif for body text
- **Satoshi** — Modern geometric sans (fallback)

### Animations
- Steam/steam particle effects on food images
- Parallax scrolling on hero and image sections
- Scroll-triggered reveal animations
- Golden shimmer on primary buttons
- Hover glow effects on cards
- Smooth cart drawer transitions

## Project Structure

```
epicurean-express/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.tsx       # Sticky navigation with cart
│   │   ├── CartDrawer.tsx   # Slide-out cart panel
│   │   ├── GoldButton.tsx   # Premium CTA buttons with shimmer
│   │   ├── SteamEffect.tsx  # Cinematic steam particles
│   │   ├── AnimatedSection.tsx # Scroll-triggered animations
│   │   └── Footer.tsx       # Site footer with newsletter
│   ├── sections/            # Page sections
│   │   ├── HeroSection.tsx              # Cinematic hero with parallax
│   │   ├── SignatureCreations.tsx       # Horizontal scroll menu
│   │   ├── WhyEpicurean.tsx             # Feature cards
│   │   ├── Testimonials.tsx             # Food critic reviews
│   │   ├── CraftedForConnoisseurs.tsx   # Image + text story
│   │   ├── ParallaxImageSection.tsx     # Full-width parallax
│   │   └── CTASection.tsx               # Final call-to-action
│   ├── hooks/
│   │   ├── useCart.ts       # Cart state with localStorage
│   │   └── useScrollAnimation.ts # Intersection Observer hook
│   ├── lib/
│   │   ├── data.ts          # All menu items, testimonials, locations
│   │   └── utils.ts         # Helper functions
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── menu/page.tsx        # Full menu with filtering
│   ├── about/page.tsx       # Brand story & team
│   ├── locations/page.tsx   # Interactive location finder
│   ├── contact/page.tsx     # Contact form
│   ├── page.tsx             # Homepage
│   ├── layout.tsx           # Root layout with fonts
│   ├── globals.css          # Global styles & Tailwind
│   └── not-found.tsx        # 404 page
├── public/                  # Static assets
├── tailwind.config.ts       # Custom theme configuration
├── next.config.js           # Next.js configuration
└── package.json             # Dependencies
```

## Pages

### Homepage (`/`)
1. **Hero Section** — Full-screen cinematic banner with parallax, golden bokeh particles, and steam effects
2. **Signature Creations** — Horizontal scroll cards with hover steam animations
3. **Why Epicurean** — 4 feature cards with stats and hover glow
4. **Parallax Image** — Full-width atmospheric break
5. **Crafted for Connoisseurs** — Brand story with parallax image
6. **Testimonials** — Food critic reviews in elegant cards
7. **CTA Section** — Final conversion push with central glow

### Menu (`/menu`)
- Category filtering (Burgers, Sides, Drinks, Desserts, Combos)
- Real-time search
- Steam effects on hover
- Add to cart functionality
- Ingredient previews
- Preparation time & calorie info

### About (`/about`)
- Brand philosophy and founding story
- Core values with animated icons
- Timeline of milestones
- Team profiles with hover effects

### Locations (`/locations`)
- Interactive location selector
- Detailed venue information
- Contact details and hours
- Map placeholder with coordinates

### Contact (`/contact`)
- Sophisticated dark-themed form
- Contact information cards
- Response time guarantee
- Form validation with success state

## Key Features

### Authentication (Clerk)
- Custom sign-in / sign-up pages (no Clerk defaults)
- User profile on `/settings`
- Route protection via proxy middleware
- Auth state reflected in navbar (Sign In / Account dropdown)

### Cart System
- Persistent cart via localStorage
- Add/remove/update quantities
- Slide-out drawer with animations
- Real-time price calculation
- Empty state with CTA

### Steam Effects
- CSS + Framer Motion particle system
- Multiple intensity levels (low/medium/high)
- Automatic rising animation with drift
- Golden-tinted wispy layers
- Triggered on hover for food images

### Scroll Animations
- Intersection Observer-based reveals
- Configurable directions (up/down/left/right)
- Staggered delays for lists
- Parallax on hero and image sections

### Responsive Design
- Mobile-first approach
- Collapsible mobile navigation
- Adaptive grid layouts
- Touch-friendly interactions

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd epicurean-express

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

## Customization

### Adding Menu Items
Edit `app/lib/data.ts`:

```typescript
{
  id: "your-item",
  name: "Your Burger",
  description: "Description here",
  price: 35,
  category: "burgers",
  image: "https://your-image-url.jpg",
  tags: ["Signature", "Wagyu"],
  calories: 750,
  prepTime: "10 min",
  isSignature: true,
  ingredients: ["Ingredient 1", "Ingredient 2"],
}
```

### Changing Colors
Edit `tailwind.config.ts`:

```typescript
colors: {
  gold: {
    400: "#D4AF37", // Primary gold
    // ... shades
  },
}
```

### Adding Pages
Create a new folder in `app/` with a `page.tsx` file. The Navbar and Footer are reusable components.

## Performance

- **Image Optimization**: Next.js Image component with lazy loading
- **Animation Performance**: GPU-accelerated transforms only
- **Code Splitting**: Automatic per-page splitting via App Router
- **Font Optimization**: next/font for zero-layout-shift loading

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License — feel free to use this as a foundation for your own luxury brand website.

---

**Crafted with obsession.** 🍔✨
