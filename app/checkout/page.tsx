"use client";

import { useCart } from "@/context/CartContext";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/lib/actions/order-actions";
import { registerCustomer } from "@/lib/actions/auth-actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { getDirectImageUrl, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { getUserProfile } from "@/lib/actions/user-actions";

export default function CheckoutPage() {
    const { items, totalAmount, clearCart } = useCart();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [redirecting, setRedirecting] = useState(false);
    const [createAccount, setCreateAccount] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const profile = await getUserProfile();
                if (profile) {
                    setUserProfile(profile);
                }
            } catch (err) {
                console.error(err);
            }
        };
        loadUser();
    }, []);

    if (items.length === 0 && !redirecting) {
        return (
            <div className="flex min-h-screen flex-col font-sans">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-light mb-4">Your cart is empty</h1>
                        <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    if (redirecting) {
        return (
            <div className="flex min-h-screen flex-col font-sans items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                    <h1 className="text-2xl font-medium">Redirecting to Payment Gateway...</h1>
                    <p className="text-muted-foreground">Please do not close this window.</p>
                </div>
            </div>
        );
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const name = `${formData.get("firstName")} ${formData.get("lastName")}`;
        let userId = userProfile?._id || undefined;

        // 1. Handle Account Creation if requested and not logged in
        if (createAccount && !userProfile) {
            const password = formData.get("password") as string;
            if (password) {
                const registerResult = await registerCustomer(name, email, password);
                if (!registerResult.success) {
                    alert(`Registration failed: ${registerResult.error}`);
                    setLoading(false);
                    return;
                }
                userId = registerResult.userId;
            }
        }

        // 2. Update existing profile if logged in
        if (userProfile) {
            // Optional: Update user address if they changed it during checkout ??? 
            // For now, let's just use the checkout details for the order.
            // If we wanted to save back to profile, we'd call updateUserProfile here.
        }

        const orderData = {
            customer: {
                name,
                email,
                address: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("zip")}`,
                phone: formData.get("phone") as string
            },
            items: items.map(i => ({
                productId: i.id,
                name: i.name,
                price: i.price,
                quantity: i.quantity
            })),
            total: totalAmount,
            status: "pending" as const,
            userId // Link order to new user if created or existing user
        };

        // Create Order in DB
        const result = await createOrder(orderData);

        if (result.success) {
            // Mock IPG Redirect
            setLoading(false);
            setRedirecting(true);
            clearCart();

            // Navigate after delay (simulate external redirect)
            setTimeout(() => {
                alert("This is a demo. Payment would happen here.");
                router.push("/");
            }, 3000);
        } else {
            alert("Failed to place order. Please try again.");
            setLoading(false);
        }
    }

    // Helper to split name
    const firstName = userProfile?.name?.split(" ")[0] || "";
    const lastName = userProfile?.name?.split(" ").slice(1).join(" ") || "";

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 py-12 bg-background">
                <div className="container mx-auto px-4 max-w-screen-lg">
                    <h1 className="text-3xl font-light tracking-tight mb-8 text-center sm:text-left">Checkout</h1>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
                        {/* Shipping Form */}
                        <div className="lg:col-span-7 space-y-8">
                            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6" key={userProfile?._id || 'guest'}>
                                <div className="space-y-4">
                                    <h2 className="text-xl font-medium border-b border-border pb-2">Contact Information</h2>
                                    <div className="grid gap-2">
                                        <label className="text-sm">Email Address</label>
                                        <input
                                            name="email"
                                            type="email"
                                            required
                                            defaultValue={userProfile?.email}
                                            readOnly={!!userProfile}
                                            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${userProfile ? 'opacity-70 bg-secondary/10' : ''}`}
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm">Phone</label>
                                        <input name="phone" type="tel" required defaultValue={userProfile?.phone} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                                    </div>

                                    {/* Optional Account Creation - Hide if logged in */}
                                    {!userProfile && (
                                        <>
                                            <div className="flex items-start gap-2 pt-2">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        id="create-account"
                                                        type="checkbox"
                                                        checked={createAccount}
                                                        onChange={(e) => setCreateAccount(e.target.checked)}
                                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <label htmlFor="create-account" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                                        Create an account for faster checkout
                                                    </label>
                                                    <p className="text-[11px] text-muted-foreground mt-1">
                                                        Save your details for future purchases.
                                                    </p>
                                                </div>
                                            </div>

                                            {createAccount && (
                                                <div className="grid gap-2 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                                    <label className="text-sm">Create Password</label>
                                                    <input
                                                        name="password"
                                                        type="password"
                                                        required={createAccount}
                                                        minLength={6}
                                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                        placeholder="Minimum 6 characters"
                                                    />
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-xl font-medium border-b border-border pb-2">Shipping Address</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label className="text-sm">First Name</label>
                                            <input name="firstName" required defaultValue={firstName} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label className="text-sm">Last Name</label>
                                            <input name="lastName" required defaultValue={lastName} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                                        </div>
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-sm">Address</label>
                                        <input name="address" required defaultValue={userProfile?.address} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Street, Apt, etc." />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="grid gap-2">
                                            <label className="text-sm">City</label>
                                            <input name="city" required defaultValue={userProfile?.city} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                                        </div>
                                        <div className="grid gap-2">
                                            <label className="text-sm">Zip / Postal Code</label>
                                            <input name="zip" required defaultValue={userProfile?.zip} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-secondary/10 px-6 py-6 rounded-md border border-border/50 sticky top-24">
                                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                                <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative h-16 w-16 bg-background rounded-sm overflow-hidden border border-border">
                                                <Image
                                                    src={getDirectImageUrl(item.image)}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={item.image?.includes("drive.google.com")}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-medium">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                                <p className="text-sm">{formatCurrency(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-border pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal</span>
                                        <span>{formatCurrency(totalAmount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="flex justify-between font-medium text-lg pt-2 border-t border-border/50">
                                        <span>Total</span>
                                        <span>{formatCurrency(totalAmount)}</span>
                                    </div>
                                </div>

                                <Button
                                    form="checkout-form"
                                    type="submit"
                                    className="w-full mt-6 h-12 text-sm uppercase tracking-wider bg-black hover:bg-black/90 text-white"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" /> Processing...
                                        </span>
                                    ) : (
                                        "Pay Now"
                                    )}
                                </Button>
                                <p className="text-xs text-center mt-3 text-muted-foreground">
                                    You will be redirected to the secure payment gateway.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
