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
        desc: "Ultraease sends high-frequency sound waves that bypass the surface entirely. You feel nothing on the skin, but the energy is traveling deeper.",
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

    const signalDepth = useTransform(scrollYProgress, [0, 0.4, 0.8], ["10%", "50%", "85%"]);
    const deepWarmthOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
    const deepWarmthScale = useTransform(scrollYProgress, [0.6, 0.8, 1], [0.8, 1, 1.1]);
    const signalOpacity = useTransform(scrollYProgress, [0.7, 0.9], [1, 0]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-warm-ivory">
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full h-[60vh] lg:h-[80vh]">

                    {/* Left: Animation */}
                    <div className="relative h-full bg-[#FAFAFA] rounded-[2rem] border border-[#17bbb0]/10 overflow-hidden flex flex-col justify-end p-8 lg:p-12 shadow-[0_8px_32px_rgba(23,187,176,0.05)]">

                        {/* Premium Legend Panel (Top Right now to avoid left-side overlaps) */}
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

                        {/* Anatomical Diagram Background */}
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

                        {/* Animated Signal (Target: #17bbb0 Glowing Arcs) */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 top-0 flex flex-col items-center z-10"
                            style={{
                                height: signalDepth,
                                opacity: signalOpacity
                            }}
                        >
                            {/* Device Head */}
                            <div className="w-20 lg:w-24 h-12 bg-white border-b border-x border-[#17bbb0]/20 rounded-b-full shadow-[0_12px_24px_rgba(23,187,176,0.1)] absolute top-0 -translate-y-px z-20 flex justify-center items-end pb-2">
                                <div className="w-8 h-1 rounded-full bg-[#17bbb0]/40" />
                            </div>

                            {/* Beam */}
                            <div className="w-12 lg:w-16 h-full border-x border-[#17bbb0]/20 bg-gradient-to-b from-[#17bbb0]/5 to-[#17bbb0]/20 relative mt-12 overflow-hidden">
                                {/* Animated scanning lines inside beam */}
                                <motion.div
                                    className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAiLz4KPHBhdGggZD0iTTAgNEw0IDBaIiBzdHJva2U9IiMxN2JiYjAiIHN0cm9rZS1vcGFjaXR5PSIwLjIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] opacity-50"
                                    animate={{ backgroundPositionY: ["0px", "100px"] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            </div>

                            {/* Soundwave Arcs */}
                            <motion.div
                                animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6], scale: [0.95, 1.05, 0.95] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="w-24 lg:w-32 h-8 border-b-[3px] border-[#17bbb0] rounded-[100%] absolute bottom-0 shadow-[0_8px_24px_rgba(23,187,176,0.8)]"
                            >
                                <div className="absolute -inset-4 border-b-2 border-[#17bbb0]/40 rounded-[100%] top-2" />
                            </motion.div>
                        </motion.div>

                        {/* Deep Warmth (Amber Glow mapping to deep muscle) */}
                        <motion.div
                            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-32 bg-gradient-to-t from-amber-glow/80 to-amber-glow/0 blur-[40px] rounded-full z-0 mix-blend-multiply"
                            style={{
                                opacity: deepWarmthOpacity,
                                scale: deepWarmthScale
                            }}
                        />

                        {/* Footnote positioned at bottom left */}
                        <div className="absolute bottom-6 left-6 right-6 lg:right-auto z-30">
                            <p className="text-[10px] text-deep-charcoal/60 font-sans tracking-wide bg-white/80 backdrop-blur-md py-2 px-4 rounded-xl inline-block border border-black/5 shadow-sm">
                                <span className="text-amber-glow font-bold mr-1.5 inline-block animate-pulse">●</span>
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
