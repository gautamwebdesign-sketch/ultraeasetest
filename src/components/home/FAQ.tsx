
"use client";

import { Container } from "@/components/ui/Container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How often should I use the Ultraease device?",
        answer: "For best results, we recommend using the device 2-3 times per week on the affected area. Each session usually lasts about 10 minutes."
    },
    {
        question: "Is it safe to use on all body parts?",
        answer: "Ultraease is safe for most body parts including back, neck, shoulders, arms, and legs. Avoid using directly on eyes, heart, or open wounds. Consult the manual for a detailed safety map."
    },
    {
        question: "Does it vibrate?",
        answer: "No, Ultraease uses ultrasonic waves which are vibration-free and silent. You will feel a gentle warming sensation deep within the tissue."
    },
    {
        question: "Can I use my own creams?",
        answer: "Yes! Phonephoresis allows you to use your favorite pain relief gels or skincare serums. The ultrasound helps deeper absorption of active ingredients."
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 bg-secondary/20">
            <Container className="max-w-3xl">
                <h2 className="text-3xl font-bold font-heading text-white mb-12 text-center">
                    Frequently <span className="text-gradient">Asked Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-white/5 bg-white/5 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                            >
                                <span className="font-medium text-white">{faq.question}</span>
                                <ChevronDown
                                    className={`text-white/50 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
