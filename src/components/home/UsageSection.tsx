
"use client";

import { Container } from "@/components/ui/Container";
import { Play, Pause, Headphones } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const tracks = [
    { title: "Progressive Muscle Relaxation", duration: "10:00" },
    { title: "Deep Relaxation Imagination", duration: "15:00" },
    { title: "Autogenic Training", duration: "12:00" },
    { title: "Pain Relief Hypnosis", duration: "20:00" },
];

export function UsageSection() {
    const [activeTrack, setActiveTrack] = useState<number | null>(null);

    return (
        <section className="py-24 bg-black relative">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Video / Visual Guide */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warm-ivory leading-[1.1] mb-6">How to Use <span className="text-gradient">Ultraease</span></h2>
                            <p className="font-sans text-lg lg:text-xl text-warm-ivory/60 mb-8 max-w-md leading-relaxed">
                                Follow our step-by-step guide to get the most out of your therapy sessions. Simple, safe, and effective.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group cursor-pointer overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-warm-ivory/80 mb-1">Video Guide</p>
                                <h3 className="font-heading text-2xl lg:text-3xl text-warm-ivory">Quick Start Tutorial</h3>
                            </div>

                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all z-10">
                                <Play className="fill-white text-white ml-1" size={24} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Audio Therapy */}
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <Headphones size={24} />
                            </div>
                            <div>
                                <h3 className="font-heading text-2xl lg:text-3xl text-warm-ivory">Audio Therapy</h3>
                                <p className="font-sans text-sm text-warm-ivory/50">Guided relaxation included with your device</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {tracks.map((track, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-xl flex items-center justify-between transition-colors cursor-pointer ${activeTrack === index
                                        ? "bg-primary/20 border border-primary/30"
                                        : "bg-white/5 border border-transparent hover:bg-white/10"
                                        }`}
                                    onClick={() => setActiveTrack(activeTrack === index ? null : index)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTrack === index ? "bg-primary text-white" : "bg-white/10 text-white/50"
                                            }`}>
                                            {activeTrack === index ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                                        </div>
                                        <div>
                                            <p className={`font-sans font-medium ${activeTrack === index ? "text-warm-ivory" : "text-warm-ivory/80"}`}>
                                                {track.title}
                                            </p>
                                            <p className="font-sans text-xs text-warm-ivory/40">{track.duration}</p>
                                        </div>
                                    </div>
                                    {activeTrack === index && (
                                        <div className="flex gap-1 items-end h-4">
                                            <span className="w-0.5 h-2 bg-primary animate-pulse" />
                                            <span className="w-0.5 h-4 bg-primary animate-pulse delay-75" />
                                            <span className="w-0.5 h-3 bg-primary animate-pulse delay-150" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="font-sans text-sm text-warm-ivory/40 text-center">
                                Purchase Ultraease to unlock full access to all relaxation technique sessions.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
