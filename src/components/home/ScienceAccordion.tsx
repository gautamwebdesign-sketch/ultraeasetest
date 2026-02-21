"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Plus, Minus, ChevronDown } from "lucide-react";

const faqData = [
    {
        id: "real-ultrasound",
        question: "Is this real ultrasound or just a massager?",
        layers: [
            {
                type: "Simple",
                content: "It is real therapeutic ultrasound. Unlike massage guns or surface massagers, Ultraease doesn't vibrate on your skin. It uses high-frequency sound waves to generate deep internal heat."
            },
            {
                type: "Detailed",
                content: "Surface massagers rely on physical percussions to push tissues around, which only treats the epidermis and superficial muscles. Ultraease uses a piezoelectric crystal to emit 1MHz sound waves. These waves pass through the skin without friction and release their energy only when they hit dense tissues like fascia, creating targeted relief."
            },
            {
                type: "Technical",
                content: "Operating frequency: 1 MHz ± 10%. ERA (Effective Radiating Area): 4.0 cm² ± 20%. The mechanical vibration of the transducer crystal generates acoustic streaming and cavitation within tissues at varying intensities (0.29, 0.44, 0.53 W/cm²), promoting cellular metabolism."
            }
        ]
    },
    {
        id: "need-gel",
        question: "Do I really need to use the conductive gel?",
        layers: [
            {
                type: "Simple",
                content: "Yes, the gel is absolutely essential. Without it, the device cannot work."
            },
            {
                type: "Detailed",
                content: "Ultrasound waves cannot travel through air. Even the microscopic layer of air between the bare device head and your skin is enough to block the waves from entering your body. The conductive gel acts as a bridge, allowing the sound waves to seamlessly enter your tissues."
            },
            {
                type: "Technical",
                content: "Acoustic impedance matching is required. The gel minimizes the reflection coefficient at the transducer-skin interface, which would otherwise approach 99.9% in air. This ensures maximum energy transfer and prevents potentially damaging thermal buildup within the transducer head."
            }
        ]
    },
    {
        id: "usage",
        question: "How long and how often should I use it?",
        layers: [
            {
                type: "Simple",
                content: "A standard session is just 10 minutes. You can use it once or twice daily depending on your needs."
            },
            {
                type: "Detailed",
                content: "For acute pain or intensive skincare, two 10-minute sessions per day are ideal. For general maintenance and chronic tension relief, a single 10-minute session is sufficient. The device has a safety auto-shutoff to prevent overexposure."
            },
            {
                type: "Technical",
                content: "Max duty cycle is automatically regulated. Continuous thermal therapy over 15 minutes in a single localized area is not recommended to prevent excessive tissue heating. The 10-minute timer ensures therapy remains within the optimal therapeutic window."
            }
        ]
    }
];

export function ScienceAccordion() {
    return (
        <section className="py-24 lg:py-32 bg-warm-stone/10 selection:bg-deep-teal/10">
            <Container className="max-w-4xl">
                <div className="text-center mb-16 lg:mb-24">
                    <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6">
                        The Science, Unpacked.
                    </h2>
                    <p className="font-sans text-xl text-deep-charcoal/70">
                        Ask any question. Go as deep as you&apos;d like.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqData.map((faq) => (
                        <AccordionItem key={faq.id} faq={faq} />
                    ))}
                </div>
            </Container>
        </section>
    );
}

function AccordionItem({ faq }: { faq: typeof faqData[0] }) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLayer, setActiveLayer] = useState(0);

    return (
        <div className="bg-white border border-black/5 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 lg:p-8 text-left bg-white z-10 relative focus:outline-none"
            >
                <h3 className="font-heading text-2xl lg:text-3xl text-deep-charcoal pr-8">{faq.question}</h3>
                <div className="w-10 h-10 rounded-full border border-black/10 flex flex-shrink-0 items-center justify-center text-deep-teal transition-transform duration-300">
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 lg:p-8 lg:pt-0">
                            <div className="h-[1px] w-full bg-black/5 mb-8" />

                            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                                {/* Layer Navigation */}
                                <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:w-48 shrink-0 scrollbar-hide">
                                    {faq.layers.map((layer, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveLayer(idx)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-sans text-sm font-medium tracking-wide transition-colors whitespace-nowrap lg:whitespace-normal
                                                ${activeLayer === idx
                                                    ? "bg-deep-teal text-white"
                                                    : "bg-warm-stone/20 text-deep-charcoal hover:bg-warm-stone/40"
                                                }`}
                                        >
                                            {layer.type}
                                            {idx > 0 && activeLayer !== idx && (
                                                <ChevronDown size={14} className="ml-auto opacity-50 -rotate-90 lg:rotate-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Active Content */}
                                <div className="flex-1 min-h-[120px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeLayer}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="font-sans text-lg lg:text-xl text-deep-charcoal/80 leading-relaxed"
                                        >
                                            {faq.layers[activeLayer].content}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
