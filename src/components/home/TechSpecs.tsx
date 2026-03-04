
"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";



export function TechSpecs() {
    return (
        <section id="specs" className="py-24 relative overflow-hidden bg-black/50">
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

            <Container>
                <div className="text-center mb-16">
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warm-ivory leading-[1.1] mb-6">
                        Precision <span className="text-gradient">Engineering</span>
                    </h2>
                    <p className="font-sans text-lg lg:text-xl text-warm-ivory/70 max-w-2xl mx-auto leading-relaxed text-balance">
                        Built to strict German quality standards, providing safe and effective therapy zones for every part of your body.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Intensity Zones - Visualized */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h3 className="font-heading text-2xl lg:text-3xl text-warm-ivory mb-6">Therapy Zones &amp; Intensity</h3>

                        {/* Low */}
                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-sans text-warm-ivory font-medium">Sensitive Areas</span>
                                <span className="font-sans text-primary font-bold">0.29 W/cm²</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400 w-[30%]" />
                            </div>
                            <p className="font-sans text-xs text-warm-ivory/50 mt-2">Face, Neck, Delicate Tissue</p>
                        </div>

                        {/* Medium */}
                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-sans text-warm-ivory font-medium">General Therapy</span>
                                <span className="font-sans text-primary font-bold">0.44 W/cm²</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[60%]" />
                            </div>
                            <p className="font-sans text-xs text-warm-ivory/50 mt-2">Joints, Shoulders, Arms</p>
                        </div>

                        {/* High */}
                        <div className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-sans text-warm-ivory font-medium">Deep Tissue</span>
                                <span className="font-sans text-primary font-bold">0.53 W/cm²</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 w-[90%]" />
                            </div>
                            <p className="font-sans text-xs text-warm-ivory/50 mt-2">Back, Large Muscle Groups, Glutes</p>
                        </div>
                    </motion.div>

                    {/* Audio & Power - Visualized */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <h3 className="font-heading text-2xl lg:text-3xl text-warm-ivory mb-6">Holistic Experience</h3>

                        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>
                                </div>
                                <div>
                                    <div className="font-sans text-warm-ivory font-medium">Included Audio Guides</div>
                                    <div className="font-sans text-sm text-warm-ivory/50">4 Premium Relaxation Tracks</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {["Progressive Muscle Relaxation", "Imagination Exercise", "Autogenic Training", "Deep Sleep Induction"].map((track, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-colors cursor-pointer group">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-xs text-white/50">
                                            ▶
                                        </div>
                                        <span className="font-sans text-sm text-warm-ivory/80">{track}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="font-heading text-2xl text-warm-ivory mb-1">10 Min</div>
                                <div className="font-sans text-xs text-warm-ivory/50">Auto Safety Timer</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                                <div className="font-heading text-2xl text-warm-ivory mb-1">1 MHz</div>
                                <div className="font-sans text-xs text-warm-ivory/50">Deep Penetration</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
