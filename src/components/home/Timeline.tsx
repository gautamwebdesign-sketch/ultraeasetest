"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const milestones = [
    {
        time: "First Session",
        title: "Gentle internal warmth",
        desc: "You won't feel vibration. You'll simply notice a soothing heat expanding from deep within the targeted area."
    },
    {
        time: "Day 2-3",
        title: "Reduced surface tension",
        desc: "Initial stiffness begins to melt away. Movement feels slightly more fluid as local circulation improves."
    },
    {
        time: "Day 7",
        title: "Cumulative effect",
        desc: "Whether you're treating chronic pain or stimulating facial collagen, the consistent energy delivery starts showing compounding results."
    },
    {
        time: "Day 14+",
        title: "Sustained results",
        desc: "Deeper cellular repair and sustained relief. The treatment moves from tackling acute issues to maintaining baseline wellness."
    }
];

export function Timeline() {
    return (
        <section className="py-24 lg:py-32 bg-warm-stone/20">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-32">
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6">
                        What to Expect
                    </h2>
                    <p className="font-sans text-xl text-deep-charcoal/70">
                        Healing isn't an instant switch. It's a progressive journey of cellular repair and deep tissue relief.
                    </p>
                </div>

                <div className="relative">
                    {/* Horizontal Line (Desktop) / Vertical Line (Mobile) */}
                    <div className="absolute left-[23px] md:left-0 md:top-6 bottom-4 md:bottom-auto w-[2px] md:w-full h-[calc(100%-1rem)] md:h-[2px] bg-deep-charcoal/10" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="relative pl-16 md:pl-0 md:pt-16"
                            >
                                {/* Marker Dot */}
                                <div className="absolute left-0 md:top-0 md:left-0 w-12 h-12 bg-white rounded-full border border-black/5 shadow-sm flex items-center justify-center md:-translate-y-6 z-10 transition-transform duration-500 hover:scale-110">
                                    <div className="w-3 h-3 rounded-full bg-deep-teal" />
                                </div>

                                <p className="text-amber-glow font-medium text-sm tracking-widest uppercase mb-3 pt-2 md:pt-0">{m.time}</p>
                                <h3 className="font-heading text-2xl text-deep-charcoal mb-4 pr-4">{m.title}</h3>
                                <p className="font-sans text-deep-charcoal/70 leading-relaxed pr-4">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
