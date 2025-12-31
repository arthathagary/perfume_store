"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Wind, AlertCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDirectImageUrl, formatCurrency } from "@/lib/utils";

export default function ProductDetailClient({ product }: { product: any }) {
    const { addItem } = useCart();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = () => {
        setAdding(true);
        addItem({
            id: product._id,
            name: product.name,
            price: product.offerPrice || product.price,
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
                            <div className="flex items-center gap-4 mb-8">
                                {product.offerPrice ? (
                                    <>
                                        <p className="text-3xl text-destructive font-medium">
                                            {formatCurrency(product.offerPrice)}
                                        </p>
                                        <p className="text-xl text-muted-foreground line-through decoration-muted-foreground/50">
                                            {formatCurrency(product.price)}
                                        </p>
                                        <div className="bg-primary text-primary-foreground text-sm uppercase font-bold tracking-wider px-3 py-1 rounded-sm">
                                           {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-xl text-primary font-medium">
                                        {formatCurrency(product.price)}
                                    </p>
                                )}
                            </div>

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
                                {/* Stock Availability Indicator */}
                                {product.showStock && product.stock !== undefined && product.stock > 0 && (
                                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500 font-medium text-sm animate-pulse">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Only {product.stock} units left in stock</span>
                                    </div>
                                )}

                                {product.stock !== undefined && product.stock === 0 && (
                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-500 font-medium text-sm">
                                        <AlertCircle className="h-4 w-4" />
                                        <span>Currently Sold Out</span>
                                    </div>
                                )}

                                <Button
                                    size="xl"
                                    onClick={handleAddToCart}
                                    disabled={adding || (product.stock !== undefined && product.stock === 0)}
                                    className={`w-full uppercase tracking-wider h-14 transition-colors duration-300 ${product.stock !== undefined && product.stock === 0 ? 'bg-zinc-800 text-white/50 cursor-not-allowed' : 'bg-black text-white hover:bg-black/80 cursor-pointer'}`}
                                >
                                    {product.stock !== undefined && product.stock === 0 ? "Sold Out" : adding ? "Adding..." : `Add to Cart - ${formatCurrency(product.offerPrice || product.price)}`}
                                </Button>
                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground bg-secondary/30 py-2 rounded-md">
                                    <ShoppingCart className="h-3 w-3" />
                                    <span>Free shipping on orders over Rs. 15,000</span>
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
