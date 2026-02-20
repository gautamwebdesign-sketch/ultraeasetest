"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
    return (
        <section className="py-24 lg:py-48 bg-deep-charcoal relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-glow/5 blur-[120px] rounded-[100%] pointer-events-none" />

            <Container className="relative z-10 text-center max-w-2xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Rating Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-12">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <Star key={s} size={12} className="fill-amber-glow text-amber-glow" />
                            ))}
                        </div>
                        <span className="text-white/80 font-sans text-xs font-bold tracking-widest uppercase ml-2">
                            4.8/5 Verified Reviews
                        </span>
                    </div>

                    {/* Main CTA */}
                    <Link
                        href="/product/ultraease"
                        className="group relative inline-flex items-center justify-center w-full sm:w-auto px-12 py-6 bg-deep-teal rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        {/* Button Glow/Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-deep-teal via-mid-teal to-deep-teal opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="absolute -inset-1 bg-amber-glow/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />

                        <span className="relative z-10 font-sans font-medium text-lg text-white flex items-center gap-3">
                            Buy Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    {/* Guarantee Callout */}
                    <div className="mt-12 flex items-center justify-center gap-3 text-white/50 font-sans text-sm">
                        <ShieldCheck size={18} className="text-mid-teal" />
                        <p>30-Day Satisfaction Guarantee. Free returns available.</p>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}
