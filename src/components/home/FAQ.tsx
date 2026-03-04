
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
                <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warm-ivory leading-[1.1] mb-12 text-center">
                    Frequently <span className="text-gradient">Asked Questions</span>
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`rounded-xl border transition-all duration-300 ${openIndex === index
                                    ? "bg-white/10 border-primary/30 shadow-lg shadow-primary/5"
                                    : "bg-white/5 border-white/5 hover:border-white/10"
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                                <span className={`font-heading text-2xl lg:text-3xl leading-tight transition-colors ${openIndex === index ? "text-warm-ivory" : "text-warm-ivory/80"
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? "bg-primary text-white rotate-180" : "bg-white/5 text-white/50"
                                    }`}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "circOut" }}
                                    >
                                        <div className="font-sans p-6 pt-0 text-base text-warm-ivory/70 leading-relaxed text-balance border-t border-white/5 mt-2">
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
