"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dots = [0, 1, 2];

export function PageLoader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const handleLoad = () => {
            setVisible(false);
        };

        if (document.readyState === "complete") {
            // Page already fully loaded (e.g. fast cached load)
            setVisible(false);
        } else {
            window.addEventListener("load", handleLoad);
        }

        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="page-loader"
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                    style={{ backgroundColor: "#FAF8F4" }}
                >
                    {/* Logo */}
                    <div className="flex items-baseline mb-10">
                        <span className="font-heading font-medium text-4xl text-deep-charcoal">
                            ultra
                        </span>
                        <span
                            className="font-heading font-bold text-4xl"
                            style={{ color: "#17bbb0" }}
                        >
                            ease
                        </span>
                    </div>

                    {/* Pulsing dots wave */}
                    <div className="flex items-center gap-3">
                        {dots.map((i) => (
                            <motion.div
                                key={i}
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: "#17bbb0" }}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{
                                    duration: 0.9,
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
