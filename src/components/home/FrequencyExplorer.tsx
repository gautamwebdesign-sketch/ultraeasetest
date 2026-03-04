"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

const frequencies = [
    {
        id: "low",
        label: "Low",
        power: "0.29",
        unit: "W/cm²",
        purpose: "Gentle facial care",
        desc: "Ideal for delicate skin, collagen stimulation, and enhancing absorption of skincare.",
        angle: -45,
        // cy = % from top of right panel. SVG body is centered; face/head region sits ~20-28% down.
        cy: 24,
        area: "Face & Neck",
        waveAmplitude: 6,   // SVG units — gentle ripple
        wavePeriods: 8,     // must be even for seamless -50% loop
        waveSpeed: 4.2,     // seconds per loop — slow, calming
    },
    {
        id: "med",
        label: "Med",
        power: "0.44",
        unit: "W/cm²",
        purpose: "Surface muscle & daily recovery",
        desc: "Perfect for post-workout soreness, minor joint stiffness, and daily mobility maintenance.",
        angle: 0,
        cy: 44,             // upper-to-mid torso — shoulder/joint region
        area: "Joints & Surface",
        waveAmplitude: 14,
        wavePeriods: 10,
        waveSpeed: 1.9,
    },
    {
        id: "high",
        label: "High",
        power: "0.53",
        unit: "W/cm²",
        purpose: "Deep tissue & chronic tension",
        desc: "Penetrates dense fascia and thick muscle groups for profound relief from chronic pain.",
        angle: 45,
        cy: 64,             // lower torso / hip — deep muscle zone
        area: "Deep Muscle",
        waveAmplitude: 22,
        wavePeriods: 6,
        waveSpeed: 0.85,    // fast, intense
    }
];

/**
 * Builds a sine-wave SVG path spanning totalWidth units.
 * The path tiles every (totalWidth / 2) units, so animating translateX(-50%)
 * on a 200%-wide SVG gives a seamless infinite scroll.
 * Requirement: `periods` must be even.
 */
function buildWavePath(totalWidth: number, height: number, amplitude: number, periods: number): string {
    const midY = height * 0.52;
    const steps = totalWidth * 2;
    const pts: string[] = [];
    for (let i = 0; i <= steps; i++) {
        const x = (i / steps) * totalWidth;
        const y = midY - amplitude * Math.sin((i / steps) * periods * Math.PI * 2);
        pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
}

// SVG arc path — angles measured clockwise from 12 o'clock
function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
    const s = startDeg === endDeg ? startDeg - 0.01 : startDeg;
    const sx = cx + r * Math.cos(toRad(s));
    const sy = cy + r * Math.sin(toRad(s));
    const ex = cx + r * Math.cos(toRad(endDeg));
    const ey = cy + r * Math.sin(toRad(endDeg));
    const large = Math.abs(endDeg - s) > 180 ? 1 : 0;
    return `M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`;
}

export function FrequencyExplorer() {
    const [activeIndex, setActiveIndex] = useState(1);
    const active = frequencies[activeIndex];

    const isLow = activeIndex === 0;
    const accentText = isLow ? "text-mid-teal"      : "text-amber-glow";
    const accentBg   = isLow ? "bg-mid-teal"        : "bg-amber-glow";
    const accentHex  = isLow ? "#17BBB0"            : "#E8A56B";
    const glowBig    = isLow ? "bg-mid-teal/15"     : activeIndex === 1 ? "bg-amber-glow/20" : "bg-amber-glow/28";
    const ringBorder = isLow ? "border-mid-teal/40" : "border-amber-glow/40";
    // Pre-compute wave path — only recalculates when mode changes
    const wavePath = useMemo(
        () => buildWavePath(800, 56, active.waveAmplitude, active.wavePeriods),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [activeIndex]
    );

    return (
        <section className="py-16 lg:py-0 lg:h-screen overflow-hidden bg-deep-charcoal border-t border-black/10 flex items-center">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

                    {/* ── Left: Title + Dial + Info ── */}
                    <div className="flex flex-col gap-5">

                        {/* Header */}
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/35 font-semibold mb-2.5">Intensity Control</p>
                            <h2 className="font-heading italic text-4xl sm:text-5xl lg:text-6xl text-warm-ivory mb-2.5 leading-[1.1]">
                                Dial in your relief.
                            </h2>
                            <p className="font-sans text-base lg:text-lg text-warm-ivory/50 max-w-xs leading-relaxed">
                                Three precise intensities. Seamless control for whatever your body needs today.
                            </p>
                        </div>

                        {/* Dial — 208px container, arc at r=30, ticks at r=36, labels at r=44 */}
                        <div className="relative w-52 h-52 mx-auto lg:mx-0 select-none">
                            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" overflow="visible">
                                {/* Dim track — r=30 */}
                                <path
                                    d={arcPath(50, 50, 30, -45, 45)}
                                    fill="none" stroke="white" strokeOpacity="0.08"
                                    strokeWidth="2.2" strokeLinecap="round"
                                />
                                {/* Active fill arc — r=30, draw-in animation */}
                                <motion.path
                                    key={activeIndex}
                                    d={arcPath(50, 50, 30, -45, active.angle)}
                                    fill="none"
                                    stroke={accentHex}
                                    strokeOpacity="0.9"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                                {/* Stop markers at r=36 — between arc (r=30) and labels (r=44) */}
                                {frequencies.map((f) => {
                                    const rad = ((f.angle - 90) * Math.PI) / 180;
                                    return (
                                        <circle
                                            key={f.id}
                                            cx={(50 + 36 * Math.cos(rad)).toFixed(2)}
                                            cy={(50 + 36 * Math.sin(rad)).toFixed(2)}
                                            r="1.6"
                                            fill="white"
                                            fillOpacity="0.28"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Labels — at r=44, well clear of arc */}
                            <div className="absolute inset-0">
                                {frequencies.map((f, i) => {
                                    const rad = ((f.angle - 90) * Math.PI) / 180;
                                    const x = 50 + 44 * Math.cos(rad);
                                    const y = 50 + 44 * Math.sin(rad);
                                    const isActive = activeIndex === i;
                                    return (
                                        <button
                                            key={f.id}
                                            onClick={() => setActiveIndex(i)}
                                            style={{ left: `${x}%`, top: `${y}%` }}
                                            className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center cursor-pointer z-20"
                                            aria-label={`Select ${f.label} intensity`}
                                        >
                                            <motion.span
                                                animate={{ scale: isActive ? 1.15 : 1, opacity: isActive ? 1 : 0.32 }}
                                                whileHover={{ opacity: isActive ? 1 : 0.65 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                className={`text-[10px] uppercase font-bold tracking-widest ${isActive ? accentText : "text-white"}`}
                                            >
                                                {f.label}
                                            </motion.span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Rotating knob */}
                            <motion.div
                                className="absolute inset-0 w-full h-full pointer-events-none"
                                animate={{ rotate: active.angle }}
                                transition={{ type: "spring", stiffness: 240, damping: 26 }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5.5rem] h-[5.5rem] rounded-full bg-gradient-to-br from-[#2e4450] via-[#1e333e] to-[#131f26] border border-white/[0.07] shadow-[0_10px_32px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.07)] flex items-center justify-center">
                                    <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-[#0e1c22] shadow-[inset_0_3px_10px_rgba(0,0,0,0.9),inset_0_-1px_2px_rgba(255,255,255,0.04)]" />
                                </div>
                                {/* Indicator pip — sits just above knob edge, points toward arc */}
                                <div
                                    className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[3px] h-[13px] rounded-full"
                                    style={{ background: accentHex, boxShadow: `0 0 8px ${accentHex}cc, 0 0 18px ${accentHex}55` }}
                                />
                            </motion.div>
                        </div>

                        {/* Info panel */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                                className="pt-5 border-t border-white/[0.08]"
                            >
                                {/* Level pills */}
                                <div className="flex items-center gap-1.5 mb-3.5">
                                    {frequencies.map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className={`h-[3px] rounded-full transition-colors duration-500 ${i <= activeIndex ? accentBg : "bg-white/10"}`}
                                            animate={{ width: i <= activeIndex ? 26 : 12 }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                        />
                                    ))}
                                    <span className="font-sans ml-1.5 text-[10px] text-warm-ivory/30 uppercase tracking-[0.2em] font-semibold">
                                        {activeIndex === 0 ? "Level 1/3" : activeIndex === 1 ? "Level 2/3" : "Level 3/3"}
                                    </span>
                                </div>

                                <div className="flex items-end gap-2.5 mb-1.5">
                                    <span className="font-heading text-[2.4rem] leading-none text-warm-ivory tabular-nums">{active.power}</span>
                                    <span className="font-sans text-warm-ivory/35 text-sm font-medium tracking-wide pb-1">{active.unit} · {active.area}</span>
                                </div>
                                <p className={`font-sans font-semibold text-xs uppercase tracking-[0.2em] mb-2.5 ${accentText}`}>{active.purpose}</p>
                                <p className="font-sans text-sm text-warm-ivory/50 leading-relaxed max-w-xs">{active.desc}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* ── Right: Visual Panel ── */}
                    <div className="relative h-[460px] lg:h-[78vh] lg:max-h-[640px] bg-[#0c1820] rounded-3xl border border-white/[0.05] overflow-hidden flex items-center justify-center">

                        {/* ── Use-Case Zone Visual ── */}

                        {/* Animated glow behind highlighted zone — zero-size anchor */}
                        <motion.div
                            className="absolute left-1/2 z-0 pointer-events-none"
                            animate={{ top: `${active.cy}%` }}
                            transition={{ type: "spring", stiffness: 75, damping: 18 }}
                        >
                            {/* Pulse ring 1 */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`r1-${activeIndex}`}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${ringBorder}`}
                                    style={
                                        activeIndex === 0
                                            ? { width: 96, height: 96 }
                                            : activeIndex === 1
                                            ? { width: 144, height: 144 }
                                            : { width: 192, height: 192 }
                                    }
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: [0, 0.5, 0], scale: [0.7, 1.2, 1.5] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                                />
                            </AnimatePresence>
                            {/* Pulse ring 2 — offset */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`r2-${activeIndex}`}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border ${ringBorder}`}
                                    style={
                                        activeIndex === 0
                                            ? { width: 96, height: 96 }
                                            : activeIndex === 1
                                            ? { width: 144, height: 144 }
                                            : { width: 192, height: 192 }
                                    }
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: [0, 0.35, 0], scale: [0.7, 1.2, 1.5] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.9 }}
                                />
                            </AnimatePresence>
                            {/* Main glow blob */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`glow-${activeIndex}`}
                                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${glowBig}`}
                                    style={
                                        activeIndex === 0
                                            ? { width: 160, height: 160, filter: "blur(60px)" }
                                            : activeIndex === 1
                                            ? { width: 224, height: 224, filter: "blur(75px)" }
                                            : { width: 288, height: 288, filter: "blur(90px)" }
                                    }
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                />
                            </AnimatePresence>
                        </motion.div>

                        {/* Body silhouette SVG — centered, ~72% panel height */}
                        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ bottom: "60px" }}>
                            <svg
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid meet"
                                className="h-[72%] w-auto"
                            >
                                {/* Ghost body — very subtle */}
                                <path d="M50 5 C45 5, 42 10, 42 15 C42 18, 44 21, 46 22 L46 26 L54 26 L54 22 C56 21, 58 18, 58 15 C58 10, 55 5, 50 5 Z" fill="rgba(255,255,255,0.08)" />
                                <path d="M40 28 L60 28 C65 28, 68 32, 68 38 L65 65 L35 65 L32 38 C32 32, 35 28, 40 28 Z" fill="rgba(255,255,255,0.08)" />
                                <path d="M30 35 C28 35, 25 38, 25 42 L25 60 L32 60 L32 38 C32 36, 31 35, 30 35 Z" fill="rgba(255,255,255,0.08)" />
                                <path d="M70 35 C72 35, 75 38, 75 42 L75 60 L68 60 L68 38 C68 36, 69 35, 70 35 Z" fill="rgba(255,255,255,0.08)" />
                                <path d="M35 68 L48 68 L48 95 L35 95 Z" fill="rgba(255,255,255,0.08)" />
                                <path d="M52 68 L65 68 L65 95 L52 95 Z" fill="rgba(255,255,255,0.08)" />

                                {/* Zone highlight — animated in/out per activeIndex */}
                                <AnimatePresence mode="wait">
                                    {activeIndex === 0 && (
                                        <motion.g
                                            key="highlight-low"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <path d="M50 5 C45 5, 42 10, 42 15 C42 18, 44 21, 46 22 L46 26 L54 26 L54 22 C56 21, 58 18, 58 15 C58 10, 55 5, 50 5 Z" fill={accentHex} fillOpacity="0.7" />
                                        </motion.g>
                                    )}
                                    {activeIndex === 1 && (
                                        <motion.g
                                            key="highlight-med"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <path d="M40 28 L60 28 C65 28, 68 32, 68 38 L65 65 L35 65 L32 38 C32 32, 35 28, 40 28 Z" fill={accentHex} fillOpacity="0.7" />
                                            <path d="M30 35 C28 35, 25 38, 25 42 L25 60 L32 60 L32 38 C32 36, 31 35, 30 35 Z" fill={accentHex} fillOpacity="0.7" />
                                            <path d="M70 35 C72 35, 75 38, 75 42 L75 60 L68 60 L68 38 C68 36, 69 35, 70 35 Z" fill={accentHex} fillOpacity="0.7" />
                                        </motion.g>
                                    )}
                                    {activeIndex === 2 && (
                                        <motion.g
                                            key="highlight-high"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.35 }}
                                        >
                                            <path d="M50 5 C45 5, 42 10, 42 15 C42 18, 44 21, 46 22 L46 26 L54 26 L54 22 C56 21, 58 18, 58 15 C58 10, 55 5, 50 5 Z" fill={accentHex} fillOpacity="0.55" />
                                            <path d="M40 28 L60 28 C65 28, 68 32, 68 38 L65 65 L35 65 L32 38 C32 32, 35 28, 40 28 Z" fill={accentHex} fillOpacity="0.55" />
                                            <path d="M30 35 C28 35, 25 38, 25 42 L25 60 L32 60 L32 38 C32 36, 31 35, 30 35 Z" fill={accentHex} fillOpacity="0.55" />
                                            <path d="M70 35 C72 35, 75 38, 75 42 L75 60 L68 60 L68 38 C68 36, 69 35, 70 35 Z" fill={accentHex} fillOpacity="0.55" />
                                            <path d="M35 68 L48 68 L48 95 L35 95 Z" fill={accentHex} fillOpacity="0.55" />
                                            <path d="M52 68 L65 68 L65 95 L52 95 Z" fill={accentHex} fillOpacity="0.55" />
                                        </motion.g>
                                    )}
                                </AnimatePresence>
                            </svg>
                        </div>

                        {/* Use-case area label — bottom right corner */}
                        <div className="absolute bottom-[72px] right-4 z-20 pointer-events-none">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="text-[9px] uppercase tracking-[0.18em] font-bold"
                                    style={{ color: accentHex }}
                                >
                                    {active.area}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/*
                            Waveform — single continuous SVG sine wave.
                            The SVG is 200% wide. Animating translateX(-50%) scrolls by exactly
                            one container width, which equals one tile of the wave pattern.
                            wavePeriods is always even so the half-path tiles seamlessly.
                        */}
                        <div className="absolute bottom-0 left-0 right-0 h-[60px] overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    className="absolute inset-0 h-full"
                                    style={{ width: "200%" }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1, x: ["0%", "-50%"] }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        opacity: { duration: 0.4 },
                                        x: {
                                            duration: active.waveSpeed,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatType: "loop",
                                        },
                                    }}
                                >
                                    <svg
                                        viewBox="0 0 800 60"
                                        preserveAspectRatio="none"
                                        className="w-full h-full"
                                    >
                                        <path
                                            d={wavePath}
                                            fill="none"
                                            stroke={accentHex}
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            opacity="0.6"
                                        />
                                    </svg>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
