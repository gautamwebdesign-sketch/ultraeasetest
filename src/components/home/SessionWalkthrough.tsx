"use client";

import { motion } from "framer-motion";
import { Droplets, SlidersHorizontal, RotateCcw, Thermometer } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { LucideIcon } from "lucide-react";

const steps: { num: string; title: string; desc: string; Icon: LucideIcon }[] = [
    {
        num: "01",
        title: "Apply Your Care Product",
        desc: "Apply a generous layer of ultrasound gel, your preferred serum, or a therapeutic ointment. The wave then drives active ingredients beneath the surface — deeper than any topical application alone.",
        Icon: Droplets,
    },
    {
        num: "02",
        title: "Select Intensity",
        desc: "Choose from Low, Medium, or High depending on your goal — from daily facial care to deep chronic tension relief.",
        Icon: SlidersHorizontal,
    },
    {
        num: "03",
        title: "Move in Circles",
        desc: "Slow, deliberate circles distribute energy evenly and ensure full coverage of the treatment area. There is no discomfort.",
        Icon: RotateCcw,
    },
    {
        num: "04",
        title: "Feel it Build",
        desc: "You won't feel anything at the surface. Within a few minutes, a sustained warmth builds from inside the tissue — not from the skin inward, but from the source outward.",
        Icon: Thermometer,
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 32,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.65,
            ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number],
        },
    },
};

export function SessionWalkthrough() {
    return (
        <section className="py-24 lg:py-32 bg-warm-ivory selection:bg-deep-teal/10">
            <Container>
                {/* Section Heading */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-16 lg:mb-24"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={headingVariants}
                >
                    <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6 leading-[1.1]">
                        Your first session,{" "}
                        <br className="hidden sm:block" />
                        step by step.
                    </h2>
                    <p className="font-sans text-lg lg:text-xl text-deep-charcoal/65 leading-relaxed">
                        Applying the device correctly takes under a minute to learn.{" "}
                        <br className="hidden md:block" />
                        Most people feel comfortable from the very first session.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <div className="relative">
                    {/* Dashed connector line — desktop only, sits behind cards */}
                    <div
                        className="hidden lg:block absolute top-[3.75rem] left-[12.5%] right-[12.5%] h-[1px] z-0"
                        aria-hidden="true"
                        style={{
                            backgroundImage:
                                "repeating-linear-gradient(to right, #E8E0D8 0px, #E8E0D8 8px, transparent 8px, transparent 18px)",
                        }}
                    />

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-60px" }}
                        variants={containerVariants}
                    >
                        {steps.map((step, index) => {
                            const Icon = step.Icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover="hovered"
                                    initial="rest"
                                    animate="rest"
                                    className="group relative bg-white border border-warm-stone/60 rounded-2xl p-8 pt-10 flex flex-col
                                               transition-shadow duration-300 ease-out
                                               hover:shadow-[0_8px_40px_rgba(26,74,90,0.08),0_2px_12px_rgba(26,74,90,0.05)]"
                                >
                                    {/* Ghost numeral watermark */}
                                    <motion.span
                                        aria-hidden="true"
                                        className="absolute -top-4 -right-2 font-heading font-bold leading-none select-none pointer-events-none
                                                   text-[7rem] sm:text-[8rem] transition-colors duration-300"
                                        style={{
                                            color: "rgba(212, 149, 106, 0.15)",
                                            lineHeight: 1,
                                        }}
                                        variants={{
                                            rest: { color: "rgba(212, 149, 106, 0.15)" },
                                            hovered: { color: "rgba(212, 149, 106, 0.27)" },
                                        }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        {step.num}
                                    </motion.span>

                                    {/* Icon */}
                                    <div className="mb-5 w-10 h-10 rounded-xl bg-deep-teal/8 border border-deep-teal/15 flex items-center justify-center relative z-10 group-hover:bg-deep-teal/12 transition-colors duration-300">
                                        <Icon size={18} className="text-deep-teal" strokeWidth={1.75} />
                                    </div>

                                    {/* Step label */}
                                    <p
                                        className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-mid-teal mb-3 relative z-10"
                                        style={{ fontVariant: "small-caps" }}
                                    >
                                        Step {step.num}
                                    </p>

                                    {/* Title */}
                                    <h3 className="font-heading italic text-2xl lg:text-[1.6rem] text-deep-charcoal mb-4 leading-snug relative z-10">
                                        {step.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="font-sans text-base text-deep-charcoal/65 leading-relaxed relative z-10">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
