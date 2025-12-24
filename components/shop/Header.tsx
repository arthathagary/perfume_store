"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

import { useCart } from "@/context/CartContext";

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();
    const { data: session } = useSession();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-8">
                <div className="flex gap-6 md:gap-10">
                    <Link href="/" className="flex items-center space-x-2" onClick={closeMenu}>
                        <span className="text-xl font-medium tracking-tight">LUXE SCENTS</span>
                    </Link>
                    <nav className="hidden gap-6 md:flex">
                        <Link
                            href="/collections/new"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            New Arrivals
                        </Link>
                        <Link
                            href="/collections/bestsellers"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Bestsellers
                        </Link>
                        <Link
                            href="/about"
                            className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Our Story
                        </Link>
                    </nav>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Menu</span>
                    </Button>

                    {/* User Menu */}
                    <div className="relative group">
                        <Button variant="ghost" size="icon" className="hidden md:flex">
                            <UserIcon className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Button>

                        {/* Hover Dropdown (Simple CSS Implementation for M1) */}
                        <div className="absolute right-0 top-full pt-2 w-48 hidden group-hover:block hover:block">
                            <div className="bg-background border border-border shadow-lg rounded-md overflow-hidden py-1">
                                {session?.user ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-border/50">
                                            <p className="text-sm font-medium truncate">{session.user.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                                        </div>
                                        <Link href="/account" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                                            My Account
                                        </Link>
                                        {(session.user as any).role === 'admin' && (
                                            <Link href="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                                                Admin Dashboard
                                            </Link>
                                        )}
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-muted transition-colors"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                                            Sign In
                                        </Link>
                                        <Link href="/register" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                                            Create Account
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <Link href="/cart" className="relative">
                        <Button variant="ghost" size="icon">
                            <ShoppingBag className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            )}
                            <span className="sr-only">Cart</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 w-full border-b border-border/40 bg-background/95 backdrop-blur-lg md:hidden"
                    >
                        <div className="container mx-auto flex flex-col p-4 gap-4">
                            <nav className="flex flex-col gap-4">
                                <Link
                                    href="/collections/new"
                                    className="text-sm font-medium hover:text-primary py-2"
                                    onClick={closeMenu}
                                >
                                    New Arrivals
                                </Link>
                                <Link
                                    href="/collections/bestsellers"
                                    className="text-sm font-medium hover:text-primary py-2"
                                    onClick={closeMenu}
                                >
                                    Bestsellers
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-sm font-medium hover:text-primary py-2"
                                    onClick={closeMenu}
                                >
                                    Our Story
                                </Link>
                            </nav>
                            <div className="border-t border-border/40 pt-4 mt-2">
                                <Button variant="luxury" onClick={closeMenu} className="w-full justify-center">
                                    View Account
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
