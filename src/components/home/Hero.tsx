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
            <Container className="relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <h1 className="font-heading font-semibold text-6xl sm:text-7xl lg:text-9xl text-white leading-[0.9] tracking-tight">
                        Warmth that begins from within.
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.75 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="font-sans text-xl sm:text-2xl text-white max-w-xl mx-auto leading-relaxed font-light"
                    >
                        An ultrasound device designed for home use. <br className="hidden sm:block" />
                        Gentle. Effective. Yours.
                    </motion.p>
                </motion.div>

                {/* Scroll Cue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.4 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="text-white text-[11px] uppercase tracking-[0.2em] font-medium animate-pulse">
                        Discover how it works ↓
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
