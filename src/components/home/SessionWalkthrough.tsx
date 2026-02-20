"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
    {
        num: "01",
        title: "Apply Gel",
        desc: "A generous layer of conductive gel ensures the ultrasound waves penetrate your skin seamlessly without bouncing off the surface.",
        animContext: "gel"
    },
    {
        num: "02",
        title: "Select Intensity",
        desc: "Choose from Low, Medium, or High depending on your goal—from daily facial care to deep chronic tension relief.",
        animContext: "dial"
    },
    {
        num: "03",
        title: "Move in Circles",
        desc: "Slow, continuous circular motions prevent heat buildup in one spot and cover the entire treatment area.",
        animContext: "circles"
    },
    {
        num: "04",
        title: "Feel it Build",
        desc: "You won't feel anything on your skin, but after a few minutes, a deep, soothing warmth will emanate from within your muscle.",
        animContext: "warmth"
    }
];

export function SessionWalkthrough() {
    return (
        <section className="py-24 lg:py-32 bg-white selection:bg-deep-teal/10">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6">
                        No guesswork. Just results.
                    </h2>
                    <p className="font-sans text-xl text-deep-charcoal/70">
                        Professional-grade technology, simplified for your living room. A standard session takes just 10 minutes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col relative">
                            {/* Connecting Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[60px] left-[60%] w-[80%] h-[1px] bg-warm-stone" />
                            )}

                            {/* Icon / Animation Box */}
                            <div className="w-24 h-24 rounded-2xl bg-warm-ivory border border-warm-stone/50 mb-8 flex items-center justify-center relative overflow-hidden shrink-0 z-10">
                                <StepIcon type={step.animContext} />
                            </div>

                            {/* Content */}
                            <p className="text-mid-teal font-medium text-sm tracking-widest uppercase mb-3">Step {step.num}</p>
                            <h3 className="font-heading text-2xl text-deep-charcoal mb-4">{step.title}</h3>
                            <p className="font-sans text-deep-charcoal/70 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function StepIcon({ type }: { type: string }) {
    switch (type) {
        case "gel":
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        animate={{ y: [-10, 0, 10], scale: [0.8, 1.2, 0.5], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-4 h-4 bg-mid-teal/40 rounded-full blur-[1px]"
                    />
                    <div className="absolute bottom-6 w-12 h-2 bg-mid-teal/10 rounded-[100%] blur-[2px]" />
                </div>
            );
        case "dial":
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full border-2 border-warm-stone flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: [0, 90, 180, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "anticipate" }}
                            className="w-10 h-10 rounded-full bg-white shadow-sm border border-black/5 relative"
                        >
                            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-2 bg-mid-teal rounded-full" />
                        </motion.div>
                    </div>
                </div>
            );
        case "circles":
            return (
                <svg viewBox="0 0 100 100" className="w-12 h-12 text-mid-teal overflow-visible">
                    <motion.path
                        d="M 50,20 A 30,30 0 1,1 49.9,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray="4 8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ transformOrigin: "50px 50px" }}
                    />
                    <circle cx="50" cy="20" r="4" fill="currentColor" />
                </svg>
            );
        case "warmth":
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 bg-amber-glow rounded-full blur-md"
                    />
                    <div className="absolute w-4 h-4 bg-amber-glow rounded-full shadow-[0_0_15px_theme(colors.amber.glow)]" />
                </div>
            );
        default:
            return null;
    }
}
