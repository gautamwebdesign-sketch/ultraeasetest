"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

const frequencies = [
    {
        id: "low",
        label: "Low",
        power: "0.29 W/cm²",
        purpose: "Gentle facial care",
        desc: "Ideal for delicate skin, collagen stimulation, and enhancing the absorption of your favorite skincare products.",
        angle: -45,
        speed: 1.5,
        cy: 15, // Glow position on abstract body
        area: "Face & Neck"
    },
    {
        id: "med",
        label: "Med",
        power: "0.44 W/cm²",
        purpose: "Surface muscle & daily recovery",
        desc: "Perfect for post-workout soreness, minor joint stiffness, and daily maintenance of your body's mobility.",
        angle: 0,
        speed: 0.8,
        cy: 45, // Glow position
        area: "Joints & Surface"
    },
    {
        id: "high",
        label: "High",
        power: "0.53 W/cm²",
        purpose: "Deep tissue & chronic tension",
        desc: "Designed to penetrate dense fascia and thick muscle groups for profound relief from chronic, stubborn pain.",
        angle: 45,
        speed: 0.4,
        cy: 65, // Glow position
        area: "Deep Muscle"
    }
];

export function FrequencyExplorer() {
    const [activeIndex, setActiveIndex] = useState(1); // Default to Med
    const activeData = frequencies[activeIndex];

    return (
        <section className="py-24 lg:py-32 bg-deep-charcoal border-t border-black/10 overflow-hidden relative">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left: Text & Dial */}
                    <div className="flex flex-col space-y-12">
                        <div>
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
                                Dial in your relief.
                            </h2>
                            <p className="font-sans text-xl text-white/70 max-w-md">
                                Three precise ultrasonic intensities. Seamless control for whatever your body needs today.
                            </p>
                        </div>

                        {/* Interactive Dial Area */}
                        <div className="relative w-64 h-64 mx-auto lg:mx-0">
                            {/* Dial Background SVG */}
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-white/10 opacity-50">
                                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1 4" />
                            </svg>

                            {/* Clickable Zones & Labels */}
                            <div className="absolute inset-0">
                                {frequencies.map((f, i) => {
                                    // Math to place labels around an arc
                                    // angle -90 because top is 0 in standard UI circle, but mathematically 0 is 3 o'clock
                                    // we want 0 to be top, -45 to be top-left, 45 to be top-right
                                    const rad = (f.angle - 90) * (Math.PI / 180);
                                    const r = 38; // radius
                                    const x = 50 + r * Math.cos(rad);
                                    const y = 50 + r * Math.sin(rad);

                                    return (
                                        <button
                                            key={f.id}
                                            onClick={() => setActiveIndex(i)}
                                            className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center cursor-pointer group z-20"
                                            style={{ left: `${x}%`, top: `${y}%` }}
                                            aria-label={`Select ${f.label} intensity`}
                                        >
                                            <span
                                                className={`text-[10px] uppercase font-bold tracking-widest transition-colors duration-300 ${activeIndex === i ? "text-amber-glow" : "text-white/40 group-hover:text-white"}`}
                                            >
                                                {f.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* The Rotating Knob */}
                            <motion.div
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                animate={{ rotate: activeData.angle }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                {/* Knob Center */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-[#2A3F49] to-deep-charcoal border border-white/5 shadow-2xl flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-black/20 inner-shadow" />
                                </div>

                                {/* Indicator Line */}
                                <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-1 h-3 rounded-full bg-amber-glow shadow-[0_0_8px_theme(colors.amber.glow)]" />
                            </motion.div>
                        </div>

                        {/* Text Output based on selection */}
                        <div className="h-48">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="pt-6 border-t border-white/10"
                                >
                                    <div className="flex items-end gap-3 mb-3">
                                        <span className="font-heading text-3xl text-white">{activeData.power}</span>
                                        <span className="text-white/50 text-sm font-medium tracking-wide pb-1.5">{activeData.area}</span>
                                    </div>
                                    <h3 className="text-amber-glow font-medium mb-2">{activeData.purpose}</h3>
                                    <p className="text-white/70 font-sans leading-relaxed">{activeData.desc}</p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Visual Feedback */}
                    <div className="relative h-[600px] bg-[#121F26] rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-8">

                        {/* Abstract Body Silhouette */}
                        <svg viewBox="0 0 100 100" className="h-[80%] opacity-20" preserveAspectRatio="xMidYMin meet">
                            {/* Head & Neck */}
                            <path d="M50 5 C45 5, 42 10, 42 15 C42 18, 44 21, 46 22 L46 26 L54 26 L54 22 C56 21, 58 18, 58 15 C58 10, 55 5, 50 5 Z" fill="currentColor" />
                            {/* Torso */}
                            <path d="M40 28 L60 28 C65 28, 68 32, 68 38 L65 65 L35 65 L32 38 C32 32, 35 28, 40 28 Z" fill="currentColor" />
                            {/* Shoulders/Arms cut off */}
                            <path d="M30 35 C28 35, 25 38, 25 42 L25 60 L32 60 L32 38 C32 36, 31 35, 30 35 Z" fill="currentColor" />
                            <path d="M70 35 C72 35, 75 38, 75 42 L75 60 L68 60 L68 38 C68 36, 69 35, 70 35 Z" fill="currentColor" />
                            {/* Legs cut off */}
                            <path d="M35 68 L48 68 L48 95 L35 95 Z" fill="currentColor" />
                            <path d="M52 68 L65 68 L65 95 L52 95 Z" fill="currentColor" />
                        </svg>

                        {/* Moving Glow Indicator */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 w-48 h-48 rounded-[100%] bg-amber-glow/40 blur-[50px] mix-blend-screen pointer-events-none"
                            animate={{ top: `${activeData.cy}%` }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        />

                        {/* Waveform Visualizer */}
                        <div className="absolute bottom-8 left-8 right-8 h-24 border-b border-white/10 flex items-end justify-between px-4 overflow-hidden mask-gradient-horizontal">
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="w-1 bg-mid-teal rounded-t-full origin-bottom"
                                    animate={{ height: ["10%", "90%", "10%"] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: activeData.speed,
                                        delay: i * 0.05,
                                        ease: "easeInOut"
                                    }}
                                />
                            ))}
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}
