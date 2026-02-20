"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function TwoPaths() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const paths = [
        {
            title: "Pain & Recovery",
            subtitle: "For the body",
            bgClass: "bg-[#E6EBEF]", // Cool blue-grey tint based on brand
            bullets: [
                "Relieve deep muscle tension",
                "Soothe chronic joint pain",
                "Accelerate post-exercise recovery"
            ]
        },
        {
            title: "Skin & Beauty",
            subtitle: "For the face",
            bgClass: "bg-warm-stone/50", // Warm cream tint (warm-stone with opacity or solid)
            bullets: [
                "Stimulate natural collagen",
                "Enhance product absorption",
                "Tighten and tone facial skin"
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
                        onClick={() => {
                            // On mobile, click could toggle expand/collapse, but let's rely on hover/focus or basic flex for desktop
                            // Scroll to Amazon CTA or show modal? Brief says "Explore -> button".
                            // For V1.0, they all lead to amazon, or scroll down. Let's just make it look clickable.
                        }}
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
                                <ul className="space-y-4 mb-12">
                                    {path.bullets.map((bullet, i) => (
                                        <li key={i} className="flex items-start gap-4 text-deep-charcoal/80 font-sans text-lg">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-deep-teal shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>

                                <button className="flex items-center gap-2 group/btn">
                                    <span className="font-medium text-deep-teal border-b-2 border-transparent group-hover/btn:border-deep-teal transition-all pb-0.5">
                                        Explore
                                    </span>
                                    <ArrowRight className="text-deep-teal w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                );
            })}
        </section>
    );
}
