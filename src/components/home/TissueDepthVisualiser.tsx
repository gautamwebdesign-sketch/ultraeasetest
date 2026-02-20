"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Thermometer } from "lucide-react";

const steps = [
    {
        title: "Surface Heat Stops Here",
        desc: "Traditional heating pads and creams only warm the epidermis and dermis. The heat dissipates before it can reach the source of the problem.",
        layerIndex: 0
    },
    {
        title: "The Ultrasound Wave",
        desc: "Ultraease sends high-frequency sound waves that bypass the surface layers entirely. You feel nothing on the skin, but the energy is traveling deeper.",
        layerIndex: 1
    },
    {
        title: "Warmth From Within",
        desc: "When the waves hit the dense tissue of your fascia and deep muscle, the kinetic energy converts into deep, soothing warmth directly where you need it.",
        layerIndex: 2
    }
];

export function TissueDepthVisualiser() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Correct Logic: Starts TOP (Epidermis) -> Travels DOWN to 100% (Deep Muscle)
    const signalDepth = useTransform(scrollYProgress, [0, 0.4, 0.8], ["10%", "50%", "100%"]);

    // Deep warmth is ONLY visible when it reaches the bottom (Deep Muscle)
    const deepWarmthOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
    const deepWarmthScale = useTransform(scrollYProgress, [0.6, 0.8, 1], [0.8, 1, 1.1]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-warm-ivory">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full h-[60vh] lg:h-[80vh]">

                    {/* Left: Animation */}
                    <div className="relative h-full bg-[#FAFAFA] rounded-[2rem] border border-[#17bbb0]/10 overflow-hidden flex flex-col justify-end p-8 lg:p-12 shadow-[0_8px_32px_rgba(23,187,176,0.05)]">

                        {/* Premium Legend Panel */}
                        <div className="absolute top-6 right-6 lg:top-8 lg:right-8 z-30">
                            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/40 shadow-[0_8px_24px_rgba(0,0,0,0.04)] ring-1 ring-[#17bbb0]/10">
                                <div className="w-8 h-8 rounded-full bg-[#17bbb0]/10 flex items-center justify-center">
                                    <Thermometer className="text-[#17bbb0] w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-deep-charcoal/40">Indicator</span>
                                    <span className="font-sans text-sm font-semibold text-deep-charcoal">Thermal Depth</span>
                                </div>
                            </div>
                        </div>

                        {/* Anatomical Diagram Background - Correct Order (Top to Bottom) */}
                        <div className="absolute inset-0 flex flex-col justify-between py-16 px-6 lg:px-12 z-0 opacity-40">
                            <div className="border-b border-deep-charcoal/20 border-dashed w-full relative">
                                <span className="absolute -top-5 left-0 text-[10px] font-sans text-deep-charcoal font-bold uppercase tracking-[0.2em] hidden sm:block">Epidermis</span>
                            </div>
                            <div className="border-b border-deep-charcoal/20 border-dashed w-full relative">
                                <span className="absolute -top-5 left-0 text-[10px] font-sans text-deep-charcoal font-bold uppercase tracking-[0.2em] hidden sm:block">Dermis</span>
                            </div>
                            <div className="border-b border-deep-charcoal/20 border-dashed w-full relative">
                                <span className="absolute -top-5 left-0 text-[10px] font-sans text-deep-charcoal font-bold uppercase tracking-[0.2em] hidden sm:block">Subcutaneous Fat</span>
                            </div>
                            <div className="border-b border-deep-charcoal/20 border-dashed w-full relative">
                                <span className="absolute -top-5 left-0 text-[10px] font-sans text-deep-charcoal font-bold uppercase tracking-[0.2em] hidden sm:block">Fascia</span>
                            </div>
                            <div className="border-b border-[#17bbb0]/30 border-solid w-full border-b-[2px] relative">
                                <span className="absolute -top-5 left-0 text-[10px] font-sans text-[#17bbb0] font-bold uppercase tracking-[0.2em] hidden sm:block">Deep Muscle</span>
                            </div>
                        </div>

                        {/* Cohesive Thermometer Visual (Travels Downwards) */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-[12%] bottom-[16%] w-20 z-10 flex flex-col items-center">

                            {/* The Glass Housing */}
                            <div className="relative w-full h-full flex flex-col items-center">
                                {/* Tube Section */}
                                <div className="w-10 flex-1 bg-white/40 backdrop-blur-md rounded-t-full border-x border-t border-white/60 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05)] p-1.5 z-10 relative overflow-hidden pb-10 flex flex-col justify-start">
                                    {/* Flowing Medium (Grows Top to Bottom) */}
                                    <motion.div
                                        className="w-full bg-gradient-to-b from-[#14a096] to-[#17bbb0] rounded-b-full rounded-t-full relative z-20 origin-top"
                                        style={{ height: signalDepth }}
                                    >
                                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-white/60 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                                        <div className="absolute right-1.5 top-2 bottom-4 w-0.5 bg-white/30 rounded-full blur-[0.5px]" />
                                    </motion.div>

                                    {/* Ticks */}
                                    <div className="absolute left-0 top-6 bottom-16 flex flex-col justify-between pointer-events-none z-30">
                                        {Array.from({ length: 8 }).map((_, i) => (
                                            <div key={i} className="w-2.5 h-[1.5px] bg-[#17bbb0]/30" />
                                        ))}
                                    </div>
                                </div>

                                {/* Bulb Section (Bottom) */}
                                <div className="w-20 h-20 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-[inset_0_2px_12px_rgba(0,0,0,0.05),_0_8px_32px_rgba(23,187,176,0.15)] -mt-10 z-20 flex items-center justify-center p-2.5 relative">
                                    <div className="absolute inset-2 bg-white/60 rounded-full flex items-center justify-center overflow-hidden shadow-[inset_-4px_-4px_12px_rgba(0,0,0,0.1),_inset_4px_4px_12px_rgba(255,255,255,0.5)]">
                                        <div className="absolute top-2 left-3 w-4 h-4 bg-white/60 rounded-full blur-[1px] z-30" />

                                        {/* Bulb only fills when signal reaches bottom */}
                                        <motion.div
                                            className="absolute inset-0 bg-[#17bbb0]"
                                            style={{ opacity: deepWarmthOpacity }}
                                        />

                                        {/* Amber Glow inside Bulb (Fires at bottom) */}
                                        <motion.div
                                            className="absolute inset-0 bg-amber-glow mix-blend-screen"
                                            style={{ opacity: deepWarmthOpacity }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Ambient Deep Warmth (Background Aura) - Fires at bottom */}
                        <motion.div
                            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 bg-amber-glow/40 blur-[40px] rounded-full z-0 mix-blend-multiply pointer-events-none"
                            style={{
                                opacity: deepWarmthOpacity,
                                scale: deepWarmthScale
                            }}
                        />

                        {/* Footnote positioned at bottom left */}
                        <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-30">
                            <p className="text-xs sm:text-sm text-deep-charcoal/80 font-sans tracking-wide bg-white/90 backdrop-blur-md py-3 px-5 rounded-xl inline-block border border-black/5 shadow-sm font-medium">
                                <span className="text-amber-glow font-bold mr-2 inline-block animate-pulse">●</span>
                                Thermal energy deeply penetrates tissue
                            </p>
                        </div>
                    </div>

                    {/* Right: Scrolling Text */}
                    <div className="flex flex-col justify-center h-full relative">
                        {steps.map((step, i) => {
                            const start = i * 0.33;
                            const end = (i + 1) * 0.33;

                            return (
                                <TextStep
                                    key={i}
                                    step={step}
                                    index={i}
                                    progress={scrollYProgress}
                                    start={start}
                                    end={end}
                                />
                            );
                        })}
                    </div>

                </Container>
            </div>
        </section>
    );
}

function TextStep({ step, index, progress, start, end }: { step: any, index: number, progress: MotionValue<number>, start: number, end: number }) {
    const fadeStart = start;
    const fadeEnd = end;
    const peakStart = start + 0.1;
    const peakEnd = end - 0.1;

    // Special case for first and last to stay visible at edges
    const opacityValues = index === 0
        ? [1, 1, 1, 0]
        : index === steps.length - 1
            ? [0, 1, 1, 1]
            : [0, 1, 1, 0];

    const opacity = useTransform(
        progress,
        [fadeStart, peakStart, peakEnd, fadeEnd],
        opacityValues
    );

    const yValues = index === 0
        ? [0, 0, 0, -30]
        : index === steps.length - 1
            ? [30, 0, 0, 0]
            : [30, 0, 0, -30];

    const y = useTransform(
        progress,
        [fadeStart, peakStart, peakEnd, fadeEnd],
        yValues
    );

    const pointerEvents = useTransform(opacity, (val) => val > 0.5 ? "auto" : "none");

    return (
        <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-full max-w-md bg-white/80 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-6 lg:p-0 rounded-2xl lg:rounded-none lg:shadow-none shadow-sm"
            style={{ opacity, y, pointerEvents: pointerEvents as any }}
        >
            <p className="text-amber-glow font-medium text-sm tracking-widest uppercase mb-4">
                0{index + 1}
            </p>
            <h3 className="font-heading text-3xl lg:text-5xl text-deep-charcoal mb-4 lg:mb-6">
                {step.title}
            </h3>
            <p className="font-sans text-lg lg:text-xl text-deep-charcoal/70 leading-relaxed">
                {step.desc}
            </p>
        </motion.div>
    );
}
