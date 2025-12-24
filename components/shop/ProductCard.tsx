"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { getDirectImageUrl } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized={product.image?.includes("drive.google.com")}
                    />

                    {/* Overlay Gradient on Hover */}
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                    {/* Quick Action Button - Slides up */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center px-4 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <Button
                            className="w-full bg-white/90 text-black hover:bg-white backdrop-blur-md shadow-lg font-medium tracking-wide uppercase text-xs h-10"
                        >
                            Quick Add
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
                    <p className="text-sm font-medium text-foreground">${product.price.toFixed(2)}</p>
                    <div className="w-0 h-[1px] bg-foreground transition-all duration-300 group-hover:w-16 opacity-50" />
                </div>
            </div>
        </motion.div>
    );
}
