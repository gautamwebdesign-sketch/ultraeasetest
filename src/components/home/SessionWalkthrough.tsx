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
        <section className="py-24 lg:py-32 bg-[#F6F4EF] selection:bg-deep-teal/10">
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6">
                        No guesswork. <br className="hidden sm:block" /> Just results.
                    </h2>
                    <p className="font-sans text-xl text-deep-charcoal/70">
                        Professional-grade technology, simplified for your living room. <br className="hidden md:block" /> A standard session takes just 10 minutes.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col relative">
                            {/* Connecting Line (Desktop) */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-[48px] left-[60%] w-[80%] h-[1px] bg-warm-stone/80" />
                            )}

                            {/* Icon / Animation Box */}
                            <div className="w-24 h-24 rounded-2xl bg-[#1a3540] border border-[#1a3540]/50 shadow-md mb-8 flex items-center justify-center relative overflow-hidden shrink-0 z-10 transition-transform duration-500 hover:scale-105">
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
                        animate={{ y: [-15, 0, 10], scaleY: [1, 1.2, 0.8], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="w-5 h-6 bg-amber-glow/80 rounded-b-full rounded-t-[50%] blur-[0.5px]"
                    />
                    <div className="absolute bottom-5 w-14 h-3 bg-amber-glow/20 rounded-[100%] blur-[1px]" />
                </div>
            );
        case "dial":
            return (
                <div className="relative w-full h-full flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full border border-white/10 bg-[#15252e] flex items-center justify-center shadow-inner">
                        <motion.div
                            animate={{ rotate: [0, 90, 180, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "anticipate" }}
                            className="w-10 h-10 rounded-full bg-deep-teal/20 shadow-md border border-white/5 relative"
                        >
                            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-2.5 bg-amber-glow rounded-full" />
                        </motion.div>
                    </div>
                </div>
            );
        case "circles":
            return (
                <div className="relative flex items-center justify-center w-full h-full">
                    <svg viewBox="0 0 100 100" className="w-14 h-14 text-mid-teal overflow-visible">
                        <motion.path
                            d="M 50,15 A 35,35 0 1,1 49.9,15"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeDasharray="6 10"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: "50px 50px" }}
                        />
                        <circle cx="50" cy="15" r="5" fill="#f3a76a" />
                    </svg>
                </div>
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
