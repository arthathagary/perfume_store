"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/shop/Header";
import { Footer } from "@/components/shop/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, Package, User, MapPin } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/lib/actions/user-actions";
import { getUserOrders } from "@/lib/actions/order-actions";
import Link from "next/link";

export default function AccountPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("profile");
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState<any[]>([]);

    // Profile State
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        zip: "",
        country: ""
    });
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated") {
            fetchData();
        }
    }, [status, router]);

    const fetchData = async () => {
        try {
            const [profile, userOrders] = await Promise.all([
                getUserProfile(),
                getUserOrders()
            ]);

            if (profile) {
                setProfileData({
                    name: profile.name || "",
                    email: profile.email || "",
                    phone: profile.phone || "",
                    address: profile.address || "",
                    city: profile.city || "",
                    zip: profile.zip || "",
                    country: profile.country || ""
                });
            }
            setOrders(userOrders || []);
        } catch (error) {
            console.error("Failed to load account data");
        } finally {
            setLoading(false);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        const result = await updateUserProfile(profileData);
        if (result.success) {
            setMessage("Profile updated successfully");
        } else {
            setMessage("Failed to update profile");
        }
        setIsSaving(false);
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 py-12 bg-secondary/10">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-3xl font-light mb-8">My Account</h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar Navigation */}
                        <div className="w-full md:w-64 space-y-2">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${activeTab === "profile" ? "bg-white shadow-sm font-medium" : "hover:bg-white/50 text-muted-foreground"}`}
                            >
                                <User className="h-4 w-4" /> Profile Details
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`w-full text-left px-4 py-3 rounded-md transition-colors flex items-center gap-3 ${activeTab === "orders" ? "bg-white shadow-sm font-medium" : "hover:bg-white/50 text-muted-foreground"}`}
                            >
                                <Package className="h-4 w-4" /> Order History
                            </button>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-white rounded-lg border border-border/50 p-6 md:p-8 shadow-sm">
                            {activeTab === "profile" ? (
                                <form onSubmit={handleProfileUpdate} className="space-y-6 animate-in fade-in duration-300">
                                    <h2 className="text-xl font-medium border-b border-border pb-4">Personal Information</h2>

                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <input
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                value={profileData.email}
                                                disabled
                                                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm text-muted-foreground cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Phone</label>
                                            <input
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-medium border-b border-border pb-4 pt-4">Shipping Address</h2>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Address</label>
                                            <input
                                                value={profileData.address}
                                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="Street address"
                                            />
                                        </div>
                                        <div className="grid gap-6 md:grid-cols-3">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">City</label>
                                                <input
                                                    value={profileData.city}
                                                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Zip Code</label>
                                                <input
                                                    value={profileData.zip}
                                                    onChange={(e) => setProfileData({ ...profileData, zip: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Country</label>
                                                <input
                                                    value={profileData.country}
                                                    onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {message && (
                                        <div className={`text-sm p-3 rounded text-center ${message.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                            {message}
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Save Changes
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-6 animate-in fade-in duration-300">
                                    <h2 className="text-xl font-medium border-b border-border pb-4">Order History</h2>

                                    {orders.length === 0 ? (
                                        <div className="text-center py-12">
                                            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                            <h3 className="text-lg font-medium text-foreground">No orders yet</h3>
                                            <p className="text-muted-foreground mt-1">Start shopping to see your orders here.</p>
                                            <Link href="/products">
                                                <Button variant="outline" className="mt-4">Browse Collection</Button>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {orders.map((order) => (
                                                <div key={order._id} className="border border-border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-secondary/5 transition-colors">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-1">
                                                            <span className="font-medium">#{order._id.substring(0, 8)}</span>
                                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                                        order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                                                'bg-gray-100 text-gray-800'
                                                                }`}>
                                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">
                                                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-sm mt-1">
                                                            {order.items.length} item(s) • ${order.total.toFixed(2)}
                                                        </p>
                                                    </div>
                                                    <Button variant="outline" size="sm" disabled>
                                                        View Details
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
