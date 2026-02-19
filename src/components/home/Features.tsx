
"use client";

import { Container } from "@/components/ui/Container";
import { motion } from "framer-motion";
import { Thermometer, Zap, Activity, Waves } from "lucide-react";

const features = [
    {
        name: "Vibration-Free Therapy",
        description: "Deep tissue stimulation without uncomfortable vibrations. Perfect for sensitive areas.",
        icon: Waves,
    },
    {
        name: "Therapeutic Heat",
        description: "Gentle warming effect develops after 1-2 minutes, promoting blood flow and relaxation.",
        icon: Thermometer,
    },
    {
        name: "Wireless Freedom",
        description: "Built-in rechargeable battery allows for treatment anywhere, anytime.",
        icon: Zap,
    },
    {
        name: "Pain Management",
        description: "Effective relief for muscle tension, joint pain, and chronic discomfort.",
        icon: Activity,
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
                            className="group relative p-8 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                            <div className="relative z-10">
                                <div className="inline-flex p-3 rounded-lg bg-primary/20 text-primary mb-5 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.name}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">
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
