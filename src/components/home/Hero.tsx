"use client";

import { motion } from "framer-motion";
import { Waveform } from "./Waveform";
import { Container } from "@/components/ui/Container";

export function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-deep-charcoal via-[#1a3540] to-[#15252e]">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <Waveform />
            </div>

            {/* Content Layer */}
            <Container className="relative z-10 text-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl mx-auto space-y-8"
                >
                    <h1 className="font-heading font-semibold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[0.9] tracking-tight drop-shadow-2xl">
                        Warmth that begins <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">from within.</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.9, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                        className="font-sans text-xl sm:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light drop-shadow-md"
                    >
                        An ultrasound device designed for home use. <br className="hidden sm:block" />
                        Gentle. Effective. Yours.
                    </motion.p>
                </motion.div>
            </Container>

            {/* Scroll Cue */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1, ease: "easeOut" }}
                className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex items-center gap-3 text-white/80 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] animate-pulse hover:bg-white/10 transition-colors duration-500 cursor-pointer pointer-events-auto">
                    Discover how it works
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </div>
            </motion.div>
        </section>
    );
}
