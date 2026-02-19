
"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Zap, Waves, Sparkles, ShieldCheck } from "lucide-react";

const features = [
    {
        name: "Silent & Vibration-Free",
        description: "Pure ultrasonic waves treat deep tissue without mechanical vibration. 100% silent operation for true relaxation.",
        icon: Waves,
    },
    {
        name: "2-in-1 Care & Regeneration",
        description: "Phonophoresis technology helps creams and serums absorb deeper for pain relief or beauty treatments.",
        icon: Sparkles,
    },
    {
        name: "Wireless Freedom",
        description: "Powerful Li-Ion battery (2-3 sessions per charge) for on-the-go therapy. Treat yourself anywhere.",
        icon: Zap,
    },
    {
        name: "German Quality",
        description: "Engineered to strict standards. Includes 4 relaxation audio guides for a holistic healing experience.",
        icon: ShieldCheck,
    },
];

export function Features() {
    return (
        <section id="features" className="py-24 bg-secondary/30 relative">
            <div className="absolute inset-0 bg-grid-white/[0.02]" />
            <Container>
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-heading">
                        Advanced Technology for <span className="text-gradient">Home Care</span>
                    </h2>
                    <p className="mt-4 text-lg text-white/60">
                        Professional-grade ultrasound technology adapted for safe and effective home use.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                            <div className="relative z-10">
                                <div className="inline-flex p-3 rounded-lg bg-primary/20 text-primary mb-5 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold font-heading text-white mb-3 group-hover:text-primary-foreground transition-colors">{feature.name}</h3>
                                <p className="text-sm text-white/60 leading-relaxed text-balance group-hover:text-white transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
