"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MediaItem } from "@/lib/shopify";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductGalleryProps {
    media: MediaItem[];
}

export function ProductGallery({ media }: ProductGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // If no media, show a fallback or nothing
    if (!media || media.length === 0) {
        return (
            <div className="aspect-square bg-warm-stone/20 rounded-3xl flex items-center justify-center">
                <p className="text-deep-charcoal/50">No images available</p>
            </div>
        );
    }

    const currentMedia = media[currentIndex];

    return (
        <div className="flex flex-col gap-6">
            {/* Main Image View */}
            <div className="relative aspect-square sm:aspect-[4/5] lg:aspect-square bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        {currentMedia.type === 'IMAGE' && currentMedia.url ? (
                            <Image
                                src={currentMedia.url}
                                alt={currentMedia.altText || "Product Image"}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-warm-stone/10">
                                <span className="text-deep-charcoal/40">Media type not supported</span>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {media.length > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center text-deep-charcoal opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-black/5 flex items-center justify-center text-deep-charcoal opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {media.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                    {media.map((item, index) => (
                        <button
                            key={item.id}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${currentIndex === index
                                    ? "border-deep-teal shadow-md"
                                    : "border-transparent bg-white shadow-sm hover:border-warm-stone"
                                }`}
                        >
                            {item.url && item.type === 'IMAGE' && (
                                <Image
                                    src={item.url}
                                    alt="Thumbnail"
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
