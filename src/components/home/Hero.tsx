
"use client";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-32">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -ml-[50vw] h-[50rem] w-[100vw] -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-primary/5 to-transparent blur-3xl" />

            <Container className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-start gap-6 text-center lg:text-left"
                    >
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium backdrop-blur-xl">
                            <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                            Available Now
                        </div>

                        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-balance">
                            Professional <span className="text-gradient">Physiotherapy</span> at Home
                        </h1>

                        <p className="text-lg text-white/70 sm:text-xl max-w-xl mx-auto lg:mx-0">
                            Experience the power of vibration-free ultrasound therapy. Relieve pain, relax muscles, and accelerate recovery with Ultraease.
                        </p>

                        <div className="flex flex-col w-full sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" href="/product">
                                Buy Now - $199
                            </Button>
                            <Button variant="outline" size="lg" href="#features">
                                Learn More
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative lg:h-auto"
                    >
                        <HeroVisual />
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
