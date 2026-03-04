"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
    return (
        <section className="py-24 lg:py-32 bg-warm-ivory selection:bg-deep-teal/10">
            <Container>
                <div className="bg-deep-charcoal rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col md:flex-col lg:flex-row border border-black/10">

                    {/* Left Side: Content */}
                    <div className="relative z-10 p-10 lg:p-20 flex flex-col items-start justify-center flex-1 order-2 lg:order-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full max-w-xl"
                        >
                            {/* Rating Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                                <div className="flex gap-0.5">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={12} className="fill-amber-glow text-amber-glow" />
                                    ))}
                                </div>
                                <span className="font-sans text-warm-ivory/80 text-xs font-medium tracking-[0.2em] ml-2">
                                    4.3 · 252 Verified Reviews
                                </span>
                            </div>

                            <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#17bbb0] mb-5">
                                Two applications. One device.
                            </p>

                            <h2 className="font-heading text-3xl sm:text-4xl text-warm-ivory leading-[1.2] mb-5">
                                Built for deep tissue recovery.<br />
                                <em className="italic text-amber-glow/90">Effective for skin, too.</em>
                            </h2>

                            <p className="font-sans text-base text-warm-ivory/60 leading-relaxed mb-10 max-w-sm">
                                Therapeutic ultrasound for chronic muscle tension and joint pain — and a separate mode for facial skin rejuvenation. Clinical technology, designed for home.
                            </p>

                            {/* Main CTA */}
                            <Button
                                href="/product/ultrasound-device-for-home-wireless-warming-physiological-therapy"
                                variant="primary"
                                size="lg"
                                className="w-full sm:w-auto group"
                            >
                                Buy Now
                                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>

                            {/* Guarantee Callout */}
                            <div className="mt-8 flex items-center gap-3 text-warm-ivory/50 font-sans text-sm">
                                <ShieldCheck size={18} className="text-mid-teal" />
                                <p className="font-sans">30-Day Satisfaction Guarantee. Free returns available.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="relative w-full lg:w-[45%] h-[400px] lg:h-auto flex-shrink-0 order-1 lg:order-2 bg-[#0d1f27]">
                        {/* Gradient overlay — fades left edge into content panel */}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-deep-charcoal via-deep-charcoal/20 to-transparent z-10 pointer-events-none" />
                        <Image
                            src="/AI generated product images/hero_product_device_1771658893867.png"
                            alt="Ultraease Ultrasound Device"
                            fill
                            className="object-cover object-center mix-blend-normal opacity-100"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
