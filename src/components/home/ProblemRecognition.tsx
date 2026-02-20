"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const phrases = [
    "You've tried heat pads. Massage. Creams. And you wake up the next morning feeling it again.",
    "The problem isn't what you've been using. It's how deep it reaches.",
    "Ultrasound works where other methods stop."
];

export function ProblemRecognition() {
    return (
        <section className="py-32 lg:py-48 bg-white selection:bg-deep-teal/10">
            <Container className="max-w-4xl mx-auto flex flex-col justify-center min-h-[50vh]">
                <div className="space-y-12 lg:space-y-24">
                    {phrases.map((phrase, index) => (
                        <motion.h2
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{
                                duration: 1,
                                ease: [0.21, 0.47, 0.32, 0.98],
                                delay: index * 0.2 // Stagger slightly if multiple visible
                            }}
                            className={`font-heading font-medium text-4xl sm:text-5xl lg:text-7xl leading-tight tracking-tight text-deep-charcoal
                                ${index === 1 ? "lg:text-right" : ""}
                                ${index === 2 ? "lg:text-center text-deep-teal mt-12" : ""}
                            `}
                        >
                            {phrase}
                        </motion.h2>
                    ))}
                </div>
            </Container>
        </section>
    );
}
