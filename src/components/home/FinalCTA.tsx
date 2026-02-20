"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
                                <span className="text-white/80 font-sans text-xs font-medium tracking-widest ml-2">
                                    4.8/5 Verified Reviews
                                </span>
                            </div>

                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-8">
                                Professional deep tissue relief, sitting on your nightstand.
                            </h2>

                            {/* Main CTA */}
                            <Link
                                href="/product/ultrasonic-physiological-therapy"
                                className="group inline-flex items-center justify-center w-full sm:w-auto px-10 py-5 bg-deep-teal rounded-full overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(23,187,176,0.3)] hover:shadow-[0_0_60px_rgba(23,187,176,0.5)]"
                            >
                                <span className="relative z-10 font-sans font-medium text-lg text-white flex items-center gap-3">
                                    Buy Now
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* Guarantee Callout */}
                            <div className="mt-8 flex items-center gap-3 text-white/50 font-sans text-sm">
                                <ShieldCheck size={18} className="text-mid-teal" />
                                <p>30-Day Satisfaction Guarantee. Free returns available.</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Side: Image */}
                    <div className="relative w-full lg:w-[45%] h-[400px] lg:h-auto flex-shrink-0 order-1 lg:order-2 bg-[#1a3540]">
                        {/* Gradient overlay for blending */}
                        <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-l from-deep-charcoal via-deep-charcoal/30 to-transparent z-10 pointer-events-none" />
                        <Image
                            src="/cta-device.png"
                            alt="Ultraease Ultrasound Device"
                            fill
                            className="object-cover lg:object-right object-center mix-blend-screen opacity-90"
                        />
                    </div>
                </div>
            </Container>
        </section>
    );
}
