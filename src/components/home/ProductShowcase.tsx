"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { CircleDot, Sliders, BatteryFull, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";

const features = [
    {
        icon: CircleDot,
        title: "Conductive Head",
        desc: "Medical-grade aluminium head. Precision-machined for even wave distribution.",
        delay: 0.3
    },
    {
        icon: Sliders,
        title: "Adjustable Intensity",
        desc: "Three settings — from daily skin care to deep chronic tension relief.",
        delay: 0.4
    },
    {
        icon: BatteryFull,
        title: "Wireless & Rechargeable",
        desc: "Fully cordless. 2–3 full sessions per charge — use it anywhere.",
        delay: 0.5
    },
    {
        icon: ShieldCheck,
        title: "Medical-Grade",
        desc: "Manufactured to strict medical-device standards.",
        delay: 0.6
    }
];

export function ProductShowcase() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "start 0.3"]
    });

    const rawY = useTransform(scrollYProgress, [0, 1], [-220, 0]);
    const deviceY = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.8 });

    return (
        <section ref={sectionRef} className="relative py-20 lg:py-0 lg:h-screen bg-deep-teal text-warm-ivory selection:bg-white/20 flex items-center">
            {/* Ambient glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-mid-teal/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
            </div>

            <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full">
                <div className="relative flex flex-col lg:block min-h-[500px] lg:min-h-[80vh]">

                    {/* ── Product Image: Center stage, large ── */}
                    <div className="relative z-10 flex justify-center lg:absolute lg:inset-0 lg:flex lg:items-center lg:justify-center pointer-events-none">
                        <motion.div
                            style={{ y: deviceY }}
                            className="relative w-[320px] sm:w-[430px] lg:w-[540px] xl:w-[630px]"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-[450px] sm:h-[580px] lg:h-[730px] xl:h-[820px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
                            >
                                <Image
                                    src="/product.png"
                                    alt="Ultraease Ultrasound Therapy Device"
                                    fill
                                    className="object-contain object-center"
                                    sizes="(max-width: 1024px) 80vw, 40vw"
                                    priority
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* ── Left Side: Heading & Text (sits behind product on desktop) ── */}
                    <div className="relative z-20 lg:absolute lg:left-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[45%] mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="space-y-5"
                        >
                            <div className="flex items-center gap-4">
                                <span className="h-px w-8 bg-warm-ivory/40"></span>
                                <span className="font-sans uppercase tracking-[0.2em] text-xs font-semibold text-warm-ivory/80 leading-none">The Device</span>
                            </div>

                            <h2 className="font-heading font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                                Meet<br /><span className="text-warm-ivory/90">ultra</span><span className="text-[#17bbb0]">ease</span><span className="text-warm-ivory">.</span>
                            </h2>

                            <p className="font-sans text-base lg:text-lg text-warm-ivory/75 max-w-sm leading-relaxed">
                                The same therapeutic ultrasound used in physiotherapy clinics — now engineered for home, without the appointments.
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                            className="flex gap-14 mt-10"
                        >
                            <div className="flex flex-col">
                                <div className="text-warm-ivory text-[2.5rem] lg:text-[3rem] mb-1 font-heading font-light tracking-tight leading-none">1<span className="text-xl lg:text-2xl ml-0.5 font-light">MHz</span></div>
                                <div className="font-sans text-[9px] sm:text-[10px] text-warm-stone/60 tracking-[0.15em] uppercase font-semibold leading-[1.6]">Therapeutic<br />Frequency</div>
                            </div>
                            <div className="flex flex-col">
                                <div className="text-warm-ivory text-[2.5rem] lg:text-[3rem] mb-1 font-heading font-light tracking-tight leading-none">5<span className="text-xl lg:text-2xl ml-0.5 font-light">cm</span></div>
                                <div className="font-sans text-[9px] sm:text-[10px] text-warm-stone/60 tracking-[0.15em] uppercase font-semibold leading-[1.6]">Depth of<br />Penetration</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right Side: Feature List (clean, minimal, tight to product) ── */}
                    <div className="relative z-20 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-[30%] xl:w-[27%] mt-8 lg:mt-0">
                        <div className="flex flex-col gap-2">
                            {features.map((feature, idx) => {
                                const Icon = feature.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-10%" }}
                                        transition={{ duration: 0.6, delay: feature.delay, ease: [0.21, 0.47, 0.32, 0.98] }}
                                        className="group py-5 px-5 rounded-xl cursor-default transition-all duration-500 hover:bg-white/[0.06] border border-transparent hover:border-white/10"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-full bg-white/[0.07] group-hover:bg-mid-teal/20 flex items-center justify-center shrink-0 mt-0.5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(23,187,176,0.15)]">
                                                <Icon className="w-6 h-6 text-warm-ivory/50 group-hover:text-white transition-colors duration-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading text-xl text-warm-ivory/90 mb-1 group-hover:text-warm-ivory transition-colors duration-500">
                                                    {feature.title}
                                                </h3>
                                                <p className="font-sans text-sm text-warm-stone/55 leading-relaxed group-hover:text-warm-stone/75 transition-colors duration-500">
                                                    {feature.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
}
