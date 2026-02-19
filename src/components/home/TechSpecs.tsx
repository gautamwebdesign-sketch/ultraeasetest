
"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";

const specs = [
    { label: "Low Intensity", value: "0.29 W/cm²" },
    { label: "Medium Intensity", value: "0.44 W/cm²" },
    { label: "High Intensity", value: "0.53 W/cm²" },
    { label: "Auto-Timer", value: "10 minutes (Safety Cut-off)" },
    { label: "Included Audio", value: "4 Relaxation Techniques" },
    { label: "Origin", value: "German Engineering & Quality" },
];

export function TechSpecs() {
    return (
        <section id="specs" className="py-24 relative overflow-hidden">
            {/* Abstract Background Element */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading mb-6">
                            Precision Engineering <br />
                            <span className="text-gradient">Technical Specifications</span>
                        </h2>
                        <p className="text-lg text-white/60 mb-8 max-w-lg">
                            Designed with safety and efficacy in mind. The Ultraease device offers three distinct intensity levels to suit various therapeutic needs, all controlled by an intelligent microprocessor.
                        </p>

                        <div className="glass-dark rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent" />
                                Important Safety Information
                            </h3>
                            <p className="text-sm text-white/50 leading-relaxed">
                                The device is designed for versatile home use. However, sales do not constitute physiotherapeutic advice. For use on sensitive areas like knees, elbows, and other joints, please consult a doctor, therapist, or pharmacist.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {specs.map((spec, index) => (
                            <div
                                key={spec.label}
                                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
                            >
                                <div className="text-sm text-white/40 mb-1">{spec.label}</div>
                                <div className="text-xl font-semibold text-white">{spec.value}</div>
                            </div>
                        ))}
                        <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20">
                            <div className="text-sm text-primary/80 mb-1">Kit Includes</div>
                            <div className="text-lg font-medium text-white">
                                Ultrasound Device, Charging Dock, Adapter, User Manual
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
