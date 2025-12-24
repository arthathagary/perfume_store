import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Luxury/Modern font
import "./globals.css";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";
import { SessionProvider } from "@/components/providers/SessionProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | LUXE SCENTS",
    default: "LUXE SCENTS | Artisanal Perfumery",
  },
  description: "Discover our curated collection of artisanal, high-concentration fragrances using the world's finest ingredients.",
  keywords: ["perfume", "luxury fragrance", "artisanal scents", "niche perfume", "oud", "saffron"],
  openGraph: {
    title: "LUXE SCENTS",
    description: "Artisanal fragrances for the distinct.",
    type: "website",
    locale: "en_US",
    siteName: "LUXE SCENTS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          outfit.variable
        )}
        suppressHydrationWarning
      >
        <CartProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </CartProvider>
      </body>
    </html>
  );
}
