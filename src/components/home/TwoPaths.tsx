"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, TrendingUp, Sparkles, Droplets, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

export function TwoPaths() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setMounted(true);
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check, { passive: true });
        return () => window.removeEventListener("resize", check);
    }, []);

    const paths = [
        {
            title: "Pain & Recovery",
            subtitle: "For the body",
            bgClass: "bg-[#E6EBEF]",
            image: "/ai%20generated%20product%20images/medium_intensity_lifestyle_1771659005548.png",
            bullets: [
                { text: "Relieve deep muscle tension", icon: Activity },
                { text: "Soothe chronic joint pain", icon: Zap },
                { text: "Accelerate post-exercise recovery", icon: TrendingUp }
            ]
        },
        {
            title: "Skin & Beauty",
            subtitle: "For the face",
            bgClass: "bg-warm-stone/50",
            image: "/ai%20generated%20product%20images/beauty_lifestyle_hero_1771658941728.png",
            bullets: [
                { text: "Stimulate natural collagen", icon: Sparkles },
                { text: "Drive serums deeper into the dermis", icon: Droplets },
                { text: "Tighten and tone facial skin", icon: Sun }
            ]
        }
    ];

    return (
        <section id="features" className="min-h-[80vh] flex flex-col md:flex-row overflow-hidden border-t border-b border-black/5 bg-white">
            {paths.map((path, index) => {
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

                // Calculate flex basis based on hover state, safely checking post-mount
                let animateState: any = {};
                if (mounted) {
                    if (window.innerWidth >= 768) {
                        animateState = { flexBasis: isHovered ? "65%" : isOtherHovered ? "35%" : "50%" };
                    } else {
                        animateState = { flexBasis: "100%" };
                    }
                }

                return (
                    <motion.div
                        key={index}
                        className={`relative flex-1 ${path.bgClass} flex flex-col justify-center px-12 py-24 md:py-0 transition-colors duration-700 ease-out cursor-pointer group`}
                        layout
                        initial={false}
                        animate={animateState}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Lifestyle image — fades in on hover */}
                        <motion.div
                            className="absolute inset-0 z-0"
                            animate={{ opacity: isHovered ? 0.18 : 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                        >
                            <Image
                                src={path.image}
                                alt=""
                                fill
                                className="object-cover object-center"
                                sizes="50vw"
                            />
                        </motion.div>

                        <div className="relative z-10 max-w-md mx-auto w-full">
                            <motion.p
                                className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-deep-charcoal/60 mb-4"
                                animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
                            >
                                {path.subtitle}
                            </motion.p>
                            <motion.h3
                                className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-8 leading-tight"
                                animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
                            >
                                {path.title}
                            </motion.h3>

                            {/* Expandable Content — always visible on mobile, hover-revealed on desktop */}
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{
                                    opacity: isMobile || isHovered ? 1 : 0,
                                    height: isMobile || isHovered ? "auto" : 0,
                                    marginTop: isMobile || isHovered ? 32 : 0
                                }}
                                transition={{ duration: 0.4 }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-6 mb-12">
                                    {path.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-center gap-5 text-deep-charcoal/80 font-sans text-lg">
                                            <div className="w-10 h-10 rounded-full bg-deep-teal/10 flex items-center justify-center shrink-0">
                                                <bullet.icon className="w-5 h-5 text-deep-teal" />
                                            </div>
                                            {bullet.text}
                                        </li>
                                    ))}
                                </ul>

                                <Button href="/technology" variant="secondary" size="sm" className="group">
                                    Explore the Science
                                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}
