"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/lib/shopify";
import { ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    media: MediaItem[];
}

export function ProductGallery({ media }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoomed, setZoomed] = useState(false);
    const [direction, setDirection] = useState(0);

    if (!media || media.length === 0) {
        return (
            <div className="aspect-square bg-warm-stone/20 rounded-3xl flex items-center justify-center">
                <p className="text-deep-charcoal/50 font-sans">No images available</p>
            </div>
        );
    }

    const images = media.filter(m => m.type === "IMAGE" && m.url);
    const current = images[activeIndex] ?? images[0];

    const navigate = (dir: 1 | -1) => {
        setDirection(dir);
        setActiveIndex(i => (i + dir + images.length) % images.length);
    };

    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row gap-4">

                {/* ── Thumbnail strip — vertical on desktop, horizontal on mobile ── */}
                {images.length > 1 && (
                    <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-1 lg:pb-0 shrink-0">
                        {images.map((item, index) => (
                            <motion.button
                                key={item.id}
                                onClick={() => { setDirection(index > activeIndex ? 1 : -1); setActiveIndex(index); }}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.96 }}
                                className={`relative shrink-0 w-[68px] h-[68px] lg:w-[76px] lg:h-[76px] rounded-xl overflow-hidden transition-all duration-200 ${
                                    activeIndex === index
                                        ? "ring-2 ring-deep-teal ring-offset-2 ring-offset-warm-ivory"
                                        : "ring-1 ring-warm-stone/60 hover:ring-deep-teal/40"
                                }`}
                            >
                                <Image
                                    src={item.url}
                                    alt={item.altText || `View ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    sizes="76px"
                                />
                                {activeIndex === index && (
                                    <div className="absolute inset-0 bg-deep-teal/6 pointer-events-none" />
                                )}
                            </motion.button>
                        ))}
                    </div>
                )}

                {/* ── Main image ── */}
                <div className="flex-1 min-w-0">
                    <div
                        className="relative aspect-square lg:aspect-[5/6] bg-[#F5F3F0] rounded-3xl overflow-hidden cursor-zoom-in group"
                        onClick={() => setZoomed(true)}
                    >
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={{
                                    enter: (d: number) => ({ opacity: 0, x: d * 24 }),
                                    center: { opacity: 1, x: 0 },
                                    exit: (d: number) => ({ opacity: 0, x: d * -24 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={current.url}
                                    alt={current.altText || "Ultraease Device"}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    priority={activeIndex === 0}
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Prev / Next arrows on hover */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-black/6 flex items-center justify-center text-deep-charcoal opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white shadow-sm z-10"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(1); }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm border border-black/6 flex items-center justify-center text-deep-charcoal opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white shadow-sm z-10"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </>
                        )}

                        {/* Zoom hint */}
                        <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-sm border border-black/5">
                                <ZoomIn className="w-3 h-3 text-deep-charcoal/60" />
                                <span className="font-sans text-[11px] text-deep-charcoal/55">Zoom</span>
                            </div>
                        </div>

                        {/* Dot indicators — mobile only */}
                        {images.length > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 lg:hidden z-10">
                                {images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                                        className={`h-1.5 rounded-full transition-all duration-200 ${
                                            i === activeIndex ? "bg-deep-teal w-5" : "bg-deep-charcoal/25 w-1.5"
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Zoom lightbox ── */}
            <AnimatePresence>
                {zoomed && current && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="fixed inset-0 z-[9999] bg-black/92 flex items-center justify-center p-6"
                        onClick={() => setZoomed(false)}
                    >
                        <button
                            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                            onClick={() => setZoomed(false)}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(1); }}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </>
                        )}

                        <motion.div
                            initial={{ scale: 0.88, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.88, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                            className="relative w-full max-w-2xl aspect-square"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={current.url}
                                alt={current.altText || "Ultraease Device"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </motion.div>

                        {images.length > 1 && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-xs text-white/40">
                                {activeIndex + 1} / {images.length}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
