"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getDirectImageUrl, formatCurrency } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    offerPrice?: number;
    image: string;
    category: string;
    stock?: number;
    showStock?: boolean;
}

interface ProductCardProps {
    product: Product;
}

import { useCart } from "@/context/CartContext";
import { useState } from "react";

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    // Default to available if stock is undefined (for legacy products)
    const isOutOfStock = product.stock !== undefined && product.stock === 0;

    const handleQuickAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent Link navigation
        e.stopPropagation();

        if (isOutOfStock) return;

        addItem({
            id: product.id,
            name: product.name,
            price: product.offerPrice || product.price,
            image: product.image,
            quantity: 1
        });

        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative flex flex-col gap-4"
        >
            <Link href={`/products/${product.id}`} className="block w-full">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary/5 rounded-sm">
                    <Image
                        src={getDirectImageUrl(product.image)}
                        alt={product.name}
                        fill
                        className={`object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 ${isOutOfStock ? 'grayscale opacity-70' : ''}`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={product.image?.includes("drive.google.com")}
                    />

                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                    {product.offerPrice ? (
                       <div className="absolute top-2 left-2 bg-white text-black text-[10px] uppercase font-bold tracking-wider px-2 py-1 z-10 shadow-sm">
                           {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                       </div>
                    ) : null}

                    {/* Stock Badge if enabled */}
                    {product.showStock && !isOutOfStock && product.stock !== undefined && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] px-2 py-1 uppercase tracking-widest z-10">
                            {product.stock} Left
                        </div>
                    )}

                    {/* Sold Out Badge */}
                    {isOutOfStock && (
                        <div className="absolute top-2 right-2 bg-red-900/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 uppercase tracking-widest z-10">
                            Sold Out
                        </div>
                    )}

                    {/* Quick Action Button - Slides up */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <Button
                            onClick={handleQuickAdd}
                            disabled={isOutOfStock}
                            className={`w-full backdrop-blur-md shadow-lg font-medium tracking-wide uppercase text-xs h-10 ${isOutOfStock ? 'bg-zinc-800 text-white/50 cursor-not-allowed' : 'bg-white/90 text-black hover:bg-white'}`}
                        >
                            {isOutOfStock ? "Sold Out" : isAdded ? "Added" : "Quick Add"}
                        </Button>
                    </div>
                </div>
            </Link>

            <div className="flex flex-col items-start gap-1 p-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium">
                    {product.category}
                </span>
                <h3 className="text-lg font-serif tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="flex items-center justify-between w-full mt-1">
                    <div className="flex items-baseline gap-2">
                        {product.offerPrice ? (
                            <>
                                <p className="text-sm font-medium text-destructive">{formatCurrency(product.offerPrice)}</p>
                                <p className="text-xs text-muted-foreground line-through decoration-muted-foreground/50">{formatCurrency(product.price)}</p>
                            </>
                        ) : (
                            <p className="text-sm font-medium text-foreground">{formatCurrency(product.price)}</p>
                        )}
                    </div>
                    <div className="w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-16 opacity-50" />
                </div>
            </div>
        </motion.div>
    );
}
