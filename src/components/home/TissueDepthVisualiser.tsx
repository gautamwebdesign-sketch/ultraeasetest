"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Container } from "@/components/ui/Container";

const steps = [
    {
        title: "Surface Remains Cool",
        desc: "Traditional heat pads and creams warm the skin — and stop there. The epidermis and dermis absorb the heat before it can travel any deeper. You feel warmth on the surface, but the tension in your muscle and fascia remains completely untouched.\n\nUltraease produces no surface heat at all. The skin stays cool. That's not a limitation — it's the point.",
        layerIndex: 0
    },
    {
        title: "The Ultrasound Wave",
        desc: "Ultrasound waves are sound energy — not heat. At this frequency, they pass straight through the upper tissue layers without being absorbed. The epidermis, dermis, and subcutaneous fat offer no resistance.\n\nThis is why you feel nothing on the surface while the device is working. The energy isn't stopping here. It's travelling.",
        layerIndex: 1
    },
    {
        title: "Warmth From Within",
        desc: "When the ultrasound wave reaches the dense tissue of your fascia and deep muscle, it finally meets resistance. That resistance is where the conversion happens — sound energy becomes thermal energy, generating a deep, sustained warmth exactly where the tension lives.\n\nThis is what a heat pad cannot do. This is what a massage gun cannot do. The warmth begins at the source, not the surface.",
        layerIndex: 2
    }
];

export function TissueDepthVisualiser() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Beam starts at top (10%) and travels DOWN to 100% (Deep Muscle)
    const beamHeight = useTransform(scrollYProgress, [0, 0.4, 0.8], ["10%", "50%", "95%"]);

    // Deep warmth ONLY erupts when it reaches the bottom
    const deepWarmthOpacity = useTransform(scrollYProgress, [0.65, 0.85], [0, 1]);
    const deepWarmthScale = useTransform(scrollYProgress, [0.65, 0.85, 1], [0.8, 1, 1.1]);

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
                                    <div className="w-1.5 h-4 bg-[#17bbb0] rounded-full" />
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

                        {/* Penetration Beam Visual */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-[8%] bottom-[16%] w-24 z-10 flex flex-col items-center">

                            {/* Device representation at the top (Skin Contact) */}
                            <div className="w-20 h-5 bg-white rounded-b-xl border border-[#17bbb0]/20 shadow-[0_4px_12px_rgba(23,187,176,0.1)] z-30 relative overflow-hidden flex items-end justify-center">
                                <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#17bbb0]" />
                            </div>

                            {/* The Penetration Beam Container */}
                            <div className="relative w-full h-full flex flex-col items-center">
                                {/* The Wave Beam */}
                                <motion.div
                                    className="w-1.5 sm:w-2 bg-gradient-to-b from-[#14a096]/80 via-[#17bbb0] to-amber-glow relative z-20 origin-top rounded-full shadow-[0_0_15px_rgba(23,187,176,0.5)]"
                                    style={{ height: beamHeight }}
                                >
                                    {/* Pulse effect running down the beam */}
                                    <div className="absolute inset-x-0 top-0 bottom-0 overflow-hidden rounded-full">
                                        <div className="w-full h-1/4 bg-white/60 blur-[4px] animate-[pulse-down_2s_ease-in-out_infinite]" />
                                    </div>

                                    {/* Beam Head (Leading Edge) */}
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,1),_0_0_24px_rgba(23,187,176,0.8)] z-30" />
                                </motion.div>

                                {/* Ambient Beam track (faint path indicating where it can go) */}
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#17bbb0]/10 border-r border-[#17bbb0]/5 border-dashed z-0" />
                            </div>
                        </div>

                        {/* Deep Heat Eruption (Fires only at bottom) */}
                        <motion.div
                            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-64 h-32 flex items-center justify-center z-0 pointer-events-none"
                            style={{
                                opacity: deepWarmthOpacity,
                                scale: deepWarmthScale
                            }}
                        >
                            {/* Core Intense Heat */}
                            <div className="absolute w-24 h-12 bg-amber-glow/60 blur-[20px] rounded-full mix-blend-multiply" />
                            {/* Outer Radiating Warmth */}
                            <div className="absolute w-64 h-32 bg-[#17bbb0]/20 blur-[40px] rounded-full mix-blend-multiply" />
                            {/* Center bright spark */}
                            <div className="absolute w-8 h-4 bg-white/40 blur-[8px] rounded-full mix-blend-overlay" />
                        </motion.div>

                        {/* Footnote positioned at bottom left */}
                        <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-30">
                            <p className="text-xs sm:text-sm text-deep-charcoal/80 font-sans tracking-wide bg-white/90 backdrop-blur-md py-3 px-5 rounded-xl inline-block border border-black/5 shadow-sm font-medium">
                                <span className="text-[#17bbb0] font-bold mr-2 inline-block animate-pulse">●</span>
                                Penetrating Deep Tissue Focus
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

function TextStep({ step, index, progress, start, end }: { step: { title: string, desc: string, layerIndex: number }, index: number, progress: MotionValue<number>, start: number, end: number }) {
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
            style={{ opacity, y, pointerEvents: pointerEvents as unknown as "auto" | "none" }}
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
