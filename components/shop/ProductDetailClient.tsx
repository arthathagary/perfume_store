"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Wind, AlertCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";

export default function ProductDetailClient({ product }: { product: any }) {
    const { addItem } = useCart();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        setAdding(true);
        addItem({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity: 1,
            concentration: product.details?.concentration
        });

        // Simulate loading for better UX
        setTimeout(() => setAdding(false), 500);
    };

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 py-12 sm:py-20 bg-background transition-colors duration-500">
                <div className="container mx-auto px-4 max-w-screen-xl">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
                    </Link>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
                        {/* Product Image Section */}
                        <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/30 rounded-sm">
                            <Image
                                src={getDirectImageUrl(product.images?.[0])}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                unoptimized={product.images?.[0]?.includes("drive.google.com")}
                            />
                        </div>

                        {/* Product Info Section */}
                        <div className="flex flex-col justify-center">
                            <span className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                                {product.details?.concentration || "Eau de Parfum"}
                            </span>
                            <h1 className="text-4xl font-light tracking-tight text-foreground sm:text-5xl mb-6">
                                {product.name}
                            </h1>
                            <p className="text-xl text-primary font-medium mb-8">
                                ${product.price.toFixed(2)}
                            </p>

                            <div className="prose prose-stone dark:prose-invert mb-10 text-muted-foreground leading-relaxed">
                                <p>{product.description}</p>
                            </div>

                            <div className="space-y-8 mb-10">
                                <div className="border-t border-border pt-6">
                                    <h3 className="text-sm font-semibold uppercase tracking-wide mb-4">Olfactory Notes</h3>
                                    <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase mb-1">Top</span>
                                            {product.notes?.top || "N/A"}
                                        </div>
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase mb-1">Heart</span>
                                            {product.notes?.heart || "N/A"}
                                        </div>
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase mb-1">Base</span>
                                            {product.notes?.base || "N/A"}
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-border pt-6 grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase">Longevity</span>
                                            <span className="text-sm">{product.details?.longevity || "N/A"}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Wind className="h-5 w-5 text-muted-foreground" />
                                        <div>
                                            <span className="block text-muted-foreground text-xs uppercase">Sillage</span>
                                            <span className="text-sm">{product.details?.sillage || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button
                                    size="xl"
                                    onClick={handleAddToCart}
                                    disabled={adding}
                                    className="w-full uppercase tracking-wider h-14"
                                >
                                    {adding ? "Adding..." : `Add to Cart - $${product.price.toFixed(2)}`}
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-secondary/30 py-2 rounded-md">
                                    <ShoppingCart className="h-3 w-3" />
                                    <span>Free shipping on orders over $150</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
