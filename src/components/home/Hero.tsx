"use client";

import { motion } from "framer-motion";
import { Waveform } from "./Waveform";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

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
                    className="max-w-4xl mx-auto space-y-7"
                >
                    <h1 className="font-heading font-semibold text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] text-white leading-[1.05] tracking-tight drop-shadow-2xl">
                        Warmth that begins <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">from within.</span>
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                        className="font-sans text-xl sm:text-2xl text-white max-w-xl mx-auto leading-relaxed font-normal drop-shadow-lg"
                    >
                        An ultrasound device designed for home use.
                        <br />
                        <span className="font-heading italic text-white/80">Gentle. Effective. Yours.</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                        className="flex items-center justify-center pt-6 pointer-events-auto"
                    >
                        <Button
                            href="#overview"
                            variant="primary"
                            size="lg"
                            className="group"
                        >
                            Explore the Device
                            <svg className="ml-2.5 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>

            {/* Scroll indicator — UV arrow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 1, ease: "easeOut" }}
                className="absolute bottom-8 lg:bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
            >
                <div className="relative flex items-center justify-center">
                    {/* UV glow bloom */}
                    <motion.div
                        animate={{ opacity: [0.15, 0.5, 0.15], scale: [1, 1.6, 1] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute w-12 h-12 rounded-full blur-xl"
                        style={{ background: "rgba(23, 187, 176, 0.45)" }}
                    />
                    {/* Bouncing arrow */}
                    <motion.svg
                        width="18" height="18" viewBox="0 0 24 24"
                        fill="none" stroke="#17bbb0" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                        className="relative z-10"
                        animate={{ y: [0, 7, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </motion.svg>
                </div>
            </motion.div>
        </section>
    );
}
