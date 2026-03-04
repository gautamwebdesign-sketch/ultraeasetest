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
        <section className="py-24 lg:py-32 bg-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-32">
                    <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal leading-[1.1] mb-6">
                        How it feels, day by day.
                    </h2>
                    <p className="font-sans text-lg lg:text-xl text-deep-charcoal/70 leading-relaxed">
                        Relief builds quietly. <br className="hidden sm:block" /> Here&apos;s what people notice as the sessions add up.
                    </p>
                </div>

                <div className="relative">
                    {/* Horizontal Line (Desktop) / Vertical Line (Mobile) */}
                    <div className="absolute left-[20px] md:left-0 md:top-6 bottom-0 md:bottom-auto w-[2px] md:w-full h-full md:h-[2px] bg-deep-charcoal/10" />

                    <div className="flex flex-col md:grid md:grid-cols-4 gap-12 md:gap-8">
                        {milestones.map((m, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-10%" }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                                className="relative pl-14 md:pl-0 flex flex-col group cursor-default"
                            >
                                {/* Marker Dot */}
                                <div className="absolute left-[-2px] md:relative md:left-auto md:mb-8 md:mx-auto w-12 h-12 bg-white rounded-full border border-black/5 shadow-sm flex items-center justify-center z-10 transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:border-deep-teal/20">
                                    <div className="w-3 h-3 rounded-full bg-deep-teal transition-transform duration-300 group-hover:scale-[1.3] group-hover:bg-amber-glow" />
                                </div>

                                <div className="pt-2 md:pt-0">
                                    <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-amber-glow mb-3 transition-colors duration-300 group-hover:text-deep-teal">{m.time}</p>
                                    <h3 className="font-heading text-2xl lg:text-3xl text-deep-charcoal mb-4 pr-4">{m.title}</h3>
                                    <p className="font-sans text-base text-deep-charcoal/70 leading-relaxed pr-4">{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
