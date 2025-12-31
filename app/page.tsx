import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Hero } from "@/components/shop/Hero";
import { ProductCard } from "@/components/shop/ProductCard";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getProducts } from "@/lib/actions/product-actions";
import { getDirectImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductWithId {
  _id: string;
  name: string;
  price: number;
  offerPrice?: number;
  images?: string[];
  category: string;
  stock?: number;
  showStock?: boolean;
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProducts = await getProducts();

  const FEATURED_PRODUCTS = allProducts.slice(0, 3).map((p: ProductWithId) => ({
    id: p._id.toString(),
    name: p.name,
    price: p.price,
    offerPrice: p.offerPrice,
    image: getDirectImageUrl(p.images?.[0]),
    category: p.category,
    stock: p.stock,
    showStock: p.showStock
  }));

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Collection */}
        <section className="container mx-auto py-32 px-6 max-w-screen-2xl">
          <ScrollReveal>
            <div className="flex flex-col items-center mb-16 space-y-4 text-center">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary/60">Selected Works</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-foreground">
                Curated Masterpieces
              </h2>
              <div className="h-[1px] w-24 bg-primary/20 mt-6" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_PRODUCTS.length > 0 ? (
              FEATURED_PRODUCTS.map((product: { id: string; name: string; price: number; image: string; category: string }) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground p-12 border border-dashed">
                Our atelier is currently restocking. Please check back soon.
              </p>
            )}
          </div>

          <div className="mt-16 text-center">
            <Link href="/products">
              <Button variant="outline" size="lg" className="px-12 tracking-widest uppercase text-xs h-12">
                View All Creations
              </Button>
            </Link>
          </div>
        </section>

        {/* Brand Narrative Section - Parallax/Visual */}
        <section className="relative py-40 overflow-hidden text-white">
          {/* Background */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-40 fixed-parallax" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black" />
          </div>

          <div className="container relative z-10 mx-auto max-w-4xl text-center px-6">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-serif italic mb-10 text-white/90">"The Philosophy"</h2>
              <p className="text-xl md:text-2xl leading-relaxed text-white/70 font-light mb-12">
                We believe perfume is more than a scent—it is an invisible aura, a memory written in the air.
                Our blends use only the rarest ingredients, ethically sourced and aged to perfection in Sri Lanka.
              </p>
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-white/20 pt-10">
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-primary">100%</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Vegan</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-primary">24h</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Longevity</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-3xl font-serif text-primary">SL</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50">Made in Sri Lanka</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
