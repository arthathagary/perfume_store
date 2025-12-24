"use client";

import { useCart } from "@/context/CartContext";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, Lock, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getDirectImageUrl } from "@/lib/utils";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalAmount, totalItems } = useCart();

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 py-12 sm:py-20 bg-background">
                <div className="container mx-auto max-w-screen-lg px-4">
                    <h1 className="text-3xl font-light tracking-tight mb-10 text-center">Your Selection</h1>

                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-secondary/10 rounded-lg">
                            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
                            <Link href="/products">
                                <Button size="lg">Start Shopping</Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
                            {/* Cart Items */}
                            <div className="lg:col-span-7">
                                <div className="border-t border-border">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex py-6 lg:py-10 border-b border-border">
                                            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-sm border border-border bg-secondary/30">
                                                <Image
                                                    src={getDirectImageUrl(item.image)}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={item.image?.includes("drive.google.com")}
                                                />
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <Link href={`/products/${item.id}`} className="font-medium text-foreground hover:text-primary">
                                                                    {item.name}
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-muted-foreground">{item.concentration || "Eau de Parfum"}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-foreground">${item.price.toFixed(2)}</p>
                                                    </div>
                                                    <div className="mt-4 sm:mt-0 sm:pr-9">
                                                        <div className="flex items-center border border-border rounded-sm w-fit">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="p-1 hover:bg-secondary transition-colors"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="p-1 hover:bg-secondary transition-colors"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                        <div className="absolute top-0 right-0">
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                type="button"
                                                                className="-m-2 inline-flex p-2 text-muted-foreground hover:text-foreground"
                                                            >
                                                                <span className="sr-only">Remove</span>
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-5">
                                <div className="bg-secondary/10 px-4 py-6 sm:rounded-lg sm:px-6 lg:p-8 border border-border/50 sticky top-24">
                                    <h2 className="text-lg font-medium text-foreground mb-6">Order Summary</h2>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-muted-foreground">Subtotal</dt>
                                            <dd className="text-sm font-medium text-foreground">${totalAmount.toFixed(2)}</dd>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-border pt-4">
                                            <dt className="text-sm text-muted-foreground">Shipping</dt>
                                            <dd className="text-sm font-medium text-foreground">
                                                {totalAmount > 150 ? "Free" : "Calculated at Checkout"}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-border pt-4">
                                            <dt className="text-base font-medium text-foreground">Total</dt>
                                            <dd className="text-base font-medium text-foreground">${totalAmount.toFixed(2)}</dd>
                                        </div>
                                    </div>

                                    <div className="mt-8">
                                        <Link href="/checkout">
                                            <Button className="w-full h-12 text-sm uppercase tracking-wider">
                                                Proceed to Checkout
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                        <Lock className="h-3 w-3" />
                                        <span>Secure Checkout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
