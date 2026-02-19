
"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
    {
        name: "Johanna Baumann",
        role: "Verified Buyer",
        content: "After a long day in the garden, the Ultraease helps me relax. It's like having a personal wellness session at home.",
        initials: "JB"
    },
    {
        name: "Thomas Richter",
        role: "Hiker",
        content: "I've always struggled with tension. Thanks to Ultraease, I find quick relief after my hikes. A blessing for my active life.",
        initials: "TR"
    },
    {
        name: "Sandra Neumann",
        role: "Office Worker",
        content: "My relaxation anchor after stressful workdays. Loosens my muscles and lets me forget everyday life.",
        initials: "SN"
    },
    {
        name: "Michaela Krause",
        role: "Yoga Instructor",
        content: "Since using Ultraease, my yoga practice has improved. The tension in my back is gone!",
        initials: "MK"
    },
    {
        name: "Erwin Schmitz",
        role: "Verified Buyer",
        content: "Exceeded my expectations! First-class workmanship and the different modes offer individual treatment.",
        initials: "ES"
    }
];

export function Reviews() {
    return (
        <section className="py-24 overflow-hidden relative border-t border-white/5 bg-black">
            <Container className="mb-12 text-center">
                <h2 className="text-3xl font-bold font-heading text-white mb-4">
                    Trusted by <span className="text-gradient">Thousands</span>
                </h2>
                <p className="text-white/60">See what our community has to say about Ultraease.</p>
            </Container>

            {/* Marquee Effect */}
            <div className="flex gap-6 relative w-full overflow-hidden mask-gradient">
                <motion.div
                    className="flex gap-6 min-w-max"
                    animate={{ x: [0, -100 + "%"] }} // Basic marquee logic, simplified for this snippet
                    transition={{ ease: "linear", duration: 30, repeat: Infinity }}
                >
                    {[...reviews, ...reviews, ...reviews].map((review, i) => (
                        <div
                            key={i}
                            className="w-[350px] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                        >
                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={16} className="fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-white/80 mb-6 italic">"{review.content}"</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white text-sm">
                                    {review.initials}
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{review.name}</p>
                                    <p className="text-xs text-white/40">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
                {/* Duplicate for seamless loop if needed, but the map above handles it simply */}
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
        </section>
    );
}
