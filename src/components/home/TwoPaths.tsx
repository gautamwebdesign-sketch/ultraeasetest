"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, TrendingUp, Sparkles, Droplets, Sun } from "lucide-react";

export function TwoPaths() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const paths = [
        {
            title: "Pain & Recovery",
            subtitle: "For the body",
            bgClass: "bg-[#E6EBEF]", // Cool blue-grey tint based on brand
            bullets: [
                { text: "Relieve deep muscle tension", icon: Activity },
                { text: "Soothe chronic joint pain", icon: Zap },
                { text: "Accelerate post-exercise recovery", icon: TrendingUp }
            ]
        },
        {
            title: "Skin & Beauty",
            subtitle: "For the face",
            bgClass: "bg-warm-stone/50", // Warm cream tint (warm-stone with opacity or solid)
            bullets: [
                { text: "Stimulate natural collagen", icon: Sparkles },
                { text: "Enhance product absorption", icon: Droplets },
                { text: "Tighten and tone facial skin", icon: Sun }
            ]
        }
    ];

    return (
        <section className="min-h-[80vh] flex flex-col md:flex-row overflow-hidden border-t border-b border-black/5 bg-white">
            {paths.map((path, index) => {
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

                // Calculate flex basis based on hover state
                let flex = "100%"; // Mobile default
                if (typeof window !== "undefined" && window.innerWidth >= 768) {
                    flex = isHovered ? "65%" : isOtherHovered ? "35%" : "50%";
                }

                return (
                    <motion.div
                        key={index}
                        className={`relative flex-1 ${path.bgClass} flex flex-col justify-center px-12 py-24 md:py-0 transition-colors duration-700 ease-out cursor-pointer group`}
                        layout
                        initial={false}
                        animate={{ flexBasis: flex }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="max-w-md mx-auto w-full">
                            <motion.p
                                className="text-medium-grey text-sm tracking-[0.2em] uppercase font-medium mb-4"
                                animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
                            >
                                {path.subtitle}
                            </motion.p>
                            <motion.h3
                                className="font-heading text-5xl md:text-6xl text-deep-charcoal mb-8"
                                animate={{ opacity: isOtherHovered ? 0.3 : 1 }}
                            >
                                {path.title}
                            </motion.h3>

                            {/* Expandable Content */}
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{
                                    opacity: isHovered ? 1 : 0,
                                    height: isHovered ? "auto" : 0,
                                    marginTop: isHovered ? 32 : 0
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

                                <a href="/technology" className="flex items-center gap-2 group/btn w-fit">
                                    <span className="font-medium text-deep-teal border-b-2 border-transparent group-hover/btn:border-deep-teal transition-all pb-0.5">
                                        Explore the Science
                                    </span>
                                    <ArrowRight className="text-deep-teal w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}
