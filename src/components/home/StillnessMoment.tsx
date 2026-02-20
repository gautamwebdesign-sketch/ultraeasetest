"use client";

import { motion } from "framer-motion";

export function StillnessMoment() {
    return (
        <section className="py-24 lg:py-48 bg-white flex items-center justify-center border-y border-black/5 selection:bg-deep-teal/10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-center w-full"
            >
                {/* Clear Visual Icon for 10 minutes */}
                <div className="w-32 h-32 mx-auto mb-16 lg:mb-20 rounded-full bg-deep-charcoal border-[6px] border-warm-stone/30 flex items-center justify-center shadow-lg">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-glow">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>

                <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl text-deep-charcoal italic px-4 leading-[1.15]">
                    10 minutes. <br className="md:hidden" /> That's all it asks.
                </h2>
            </motion.div>
        </section>
    );
}
