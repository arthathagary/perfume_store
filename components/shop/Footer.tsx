import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto max-w-screen-2xl px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-2xl font-serif tracking-tight">LUXE SCENTS</h2>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs font-light">
                            Crafting memories through scent. Sustainable, ethereal, and timeless fragrances for the modern soul.
                            Designed in Paris, bottled with passion.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Icons Placeholder */}
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                            <div className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer" />
                        </div>
                    </div>

                    {/* Navigation - Shop */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/40">Shop</h3>
                        <ul className="space-y-4 text-sm text-white/70 font-light">
                            <li><Link href="/products" className="hover:text-white transition-colors">All Perfumes</Link></li>
                            <li><Link href="/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
                            <li><Link href="/sets" className="hover:text-white transition-colors">Gift Sets</Link></li>
                            <li><Link href="/exclusive" className="hover:text-white transition-colors">Exclusives</Link></li>
                        </ul>
                    </div>

                    {/* Navigation - Legal */}
                    <div className="md:col-span-2">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/40">Legal</h3>
                        <ul className="space-y-4 text-sm text-white/70 font-light">
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-white/40">Newsletter</h3>
                        <p className="text-white/60 text-xs mb-4 font-light">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-white/60 transition-colors placeholder:text-white/20"
                            />
                            <button className="text-left text-xs uppercase tracking-widest font-bold mt-2 hover:text-primary transition-colors">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 font-light">
                    <p>&copy; {new Date().getFullYear()} Luxe Scents. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span>Currency: USD</span>
                        <span>Language: EN</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
