"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative h-screen w-full bg-[#030303] text-white overflow-hidden flex items-center justify-center">

            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for text readability */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                >
                    {/* <source src="https://videos.pexels.com/video-files/6774640/6774640-hd_1920_1080_30fps.mp4" type="video/mp4" /> */}
                    {/* Fallback abstraction if video fails or loads slow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#1a1a1a] to-[#050505]" />
                </video>
            </div>

            {/* Main Content - Centered & Minimal */}
            <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="flex items-center gap-4 mb-10 opacity-70">
                        <span className="h-[1px] w-12 bg-white/60" />
                        <span className="text-xs uppercase tracking-[0.5em] text-white/90">
                        The Signature Collection
                        </span>
                        <span className="h-[1px] w-12 bg-white/60" />
                    </div>

                    <h1 className="font-serif text-6xl md:text-8xl tracking-tight mb-8 leading-none mix-blend-overlay opacity-90 text-center">
                        UNVEIL YOUR <br /> ESSENCE
                    </h1>

                    <p className="max-w-md text-base md:text-lg leading-relaxed text-white/70 font-light mb-12 tracking-wide">
                        Handcrafted in Sri Lanka. Designed for the soul. <br />
                        Experience the art of timeless perfumery.
                    </p>

                    <div className="flex gap-6">
                        <Link href="/products">
                            <Button
                                className="h-14 px-12 bg-white text-black hover:bg-white/90 rounded-full text-xs uppercase tracking-[0.25em] font-medium transition-transform hover:scale-105"
                            >
                                Shop Now
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 w-full px-10 grid grid-cols-3 items-end text-[10px] uppercase tracking-widest text-white/40 z-20"
            >
                <div>
                    Sri Lanka
                </div>
                <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span>Scroll</span>
                    <div className="h-12 w-[1px] bg-white/20" />
                </motion.div>
                <div className="text-right">
                    Est. 2024
                </div>
            </motion.div>
        </section>
    );
}
