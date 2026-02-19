
"use client";

import { Container } from "@/components/ui/Container";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Does the device vibrate?",
        answer: "No. Ultraease uses physiological ultrasound waves which are completely vibration-free and silent. You will not feel a buzz, but rather a gentle, deep warming sensation in the tissue after 1-2 minutes."
    },
    {
        question: "Can I use creams or gels with it?",
        answer: "Yes! This is called Phonophoresis. You can use your favorite pain relief gels, ointments, or skincare serums (like Hyaluron). The ultrasound helps the active ingredients absorb deeper into the tissue for better effect."
    },
    {
        question: "Is it safe for home use?",
        answer: "Absolutely. It is designed for home therapy with an automatic switch-off timer (10 minutes) and controlled intensity levels (Low to High). However, avoid using on open wounds, eyes, or directly over the heart."
    },
    {
        question: "How long is the battery life?",
        answer: "The device is 100% wireless and the Lithium-Ion battery lasts for at least 2-3 full applications (approx. 30 mins total) per charge, depending on the intensity level used."
    },
    {
        question: "What are the specific intensity levels?",
        answer: "There are 3 levels: Low (0.29 W/cm²), Medium (0.44 W/cm²), and High (0.53 W/cm²). This allows you to treat different body parts safely."
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
