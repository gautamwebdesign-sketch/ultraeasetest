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
                    <div className="relative h-full bg-white rounded-3xl border border-black/5 overflow-hidden flex flex-col justify-end p-8 lg:p-12 shadow-sm">

                        {/* Header/Legend */}
                        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 z-20">
                            <h4 className="font-heading text-lg lg:text-xl text-deep-charcoal flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-black/5">
                                <Thermometer className="text-amber-glow w-5 h-5 lg:w-6 lg:h-6" />
                                Tissue Depth & Heat Level
                            </h4>
                        </div>

                        {/* Footnote */}
                        <div className="absolute bottom-6 left-6 right-6 z-20 text-center">
                            <p className="text-[10px] lg:text-xs text-deep-charcoal/60 font-sans tracking-wide bg-white/60 backdrop-blur-md py-2 px-4 rounded-full inline-block border border-black/5 shadow-sm">
                                <span className="text-amber-glow font-bold mr-1">*</span>
                                Orange glow indicates deep penetrating warmth while surface skin remains cool.
                            </p>
                        </div>

                        {/* Anatomical Diagram Background */}
                        <div className="absolute inset-0 flex flex-col justify-between py-12 px-8 z-0 opacity-40">
                            <div className="border-b border-deep-charcoal border-dashed w-full relative">
                                <span className="absolute -top-6 right-0 text-xs font-sans text-deep-charcoal font-medium uppercase tracking-widest hidden sm:block">Epidermis</span>
                            </div>
                            <div className="border-b border-deep-charcoal border-dashed w-full relative">
                                <span className="absolute -top-6 right-0 text-xs font-sans text-deep-charcoal font-medium uppercase tracking-widest hidden sm:block">Dermis</span>
                            </div>
                            <div className="border-b border-deep-charcoal border-dashed w-full relative">
                                <span className="absolute -top-6 right-0 text-xs font-sans text-deep-charcoal font-medium uppercase tracking-widest hidden sm:block">Subcutaneous Fat</span>
                            </div>
                            <div className="border-b border-deep-charcoal border-dashed w-full relative">
                                <span className="absolute -top-6 right-0 text-xs font-sans text-deep-charcoal font-medium uppercase tracking-widest hidden sm:block">Fascia</span>
                            </div>
                            <div className="border-b border-deep-charcoal border-dashed w-full border-b-[3px]">
                                <span className="absolute -top-6 right-0 text-xs font-sans text-deep-charcoal font-medium uppercase tracking-widest hidden sm:block">Deep Muscle</span>
                            </div>
                        </div>

                        {/* Animated Signal (Target: Mid Teal Arcs) */}
                        <motion.div
                            className="absolute left-[20%] sm:left-1/2 sm:-translate-x-1/2 top-0 flex flex-col items-center z-10"
                            style={{
                                height: signalDepth,
                                opacity: signalOpacity
                            }}
                        >
                            <div className="w-12 sm:w-16 h-full border-x-2 border-mid-teal/40 rounded-b-full bg-gradient-to-b from-mid-teal/10 to-mid-teal/40" />

                            <motion.div
                                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-20 sm:w-24 h-6 border-b-4 border-mid-teal rounded-[100%] absolute bottom-0 shadow-[0_4px_12px_rgba(74,124,142,0.5)]"
                            />
                        </motion.div>

                        {/* Deep Warmth (Amber Glow at bottom) */}
                        <motion.div
                            className="absolute bottom-12 left-[20%] sm:left-1/2 sm:-translate-x-1/2 w-32 sm:w-48 h-24 bg-amber-glow/60 blur-[40px] rounded-[100%] z-0"
                            style={{
                                opacity: deepWarmthOpacity,
                                scale: deepWarmthScale
                            }}
                        />

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
