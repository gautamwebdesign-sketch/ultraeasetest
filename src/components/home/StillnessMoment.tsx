"use client";

import { motion } from "framer-motion";

export function StillnessMoment() {
    return (
        <section className="py-32 lg:py-64 bg-white flex items-center justify-center border-y border-black/5 selection:bg-deep-teal/10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-center w-full"
            >
                {/* Visual placeholder for the "beautiful photo of the device on linen" */}
                <div className="w-64 h-64 mx-auto mb-16 lg:mb-24 rounded-full bg-warm-stone/20 overflow-hidden relative shadow-sm">
                    {/* Placeholder content - a soft, calming gradient / abstract shape representing the device */}
                    <div className="absolute inset-x-8 bottom-0 top-[30%] bg-gradient-to-t from-mid-teal/5 to-white/50 rounded-t-full mask-gradient-vertical" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent" />
                </div>

                <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl text-deep-charcoal italic px-4 leading-tight">
                    10 minutes. <br className="md:hidden" /> That's all it asks.
                </h2>
            </motion.div>
        </section>
    );
}
