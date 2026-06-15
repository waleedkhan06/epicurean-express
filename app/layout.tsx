import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Epicurean Express | The Culinary Revolution",
  description:
    "Where classic meets unparalleled indulgence. Premium Wagyu burgers, black truffles, and aged cheeses — crafted for the discerning palate.",
  keywords: [
    "gourmet burger",
    "Wagyu beef",
    "truffle burger",
    "luxury fast food",
    "premium dining",
  ],
  openGraph: {
    title: "Epicurean Express | The Culinary Revolution",
    description: "Premium Wagyu burgers crafted with Michelin-starred precision.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@1,2,3,4,5,6,7,8&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${playfair.variable} font-body bg-obsidian-800 text-obsidian-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
