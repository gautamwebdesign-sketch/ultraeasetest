"use client";

import { useState } from "react";
import { Product } from "@/lib/shopify";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Shield, Truck } from "lucide-react";

export function ProductInfo({ product }: { product: Product }) {
    const [isAdding, setIsAdding] = useState(false);

    const price = product.priceRange.minVariantPrice;
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: price.currencyCode,
    }).format(parseFloat(price.amount));

    const handleAddToCart = async () => {
        setIsAdding(true);
        // Integrate with Shopify cart API here later if needed
        // For now, redirect to the direct checkout link or simulate
        setTimeout(() => {
            const variantId = product.variants.nodes[0]?.id;
            if (variantId) {
                // Extract the raw ID from the gid (e.g. gid://shopify/ProductVariant/42220436324483 -> 42220436324483)
                const numericId = variantId.split('/').pop();
                window.location.href = `https://ultra-ease.myshopify.com/cart/${numericId}:1`;
            } else {
                setIsAdding(false);
                alert("Error: No product variant found.");
            }
        }, 300);
    };

    return (
        <div className="space-y-10">
            {/* Header & Price */}
            <div className="space-y-4 border-b border-warm-stone/50 pb-8">
                <span className="text-amber-glow font-medium text-sm tracking-widest uppercase">
                    Professional Grade
                </span>
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal leading-[1.1]">
                    {product.title}
                </h1>
                <p className="text-3xl text-deep-teal font-sans font-medium tracking-tight">
                    {formattedPrice}
                </p>
            </div>

            {/* Quick Benefits */}
            <ul className="space-y-4">
                {[
                    "Deep tissue penetration up to 5cm",
                    "No heat felt on the surface, 100% focused energy",
                    "1 MHz and 3 MHz dual-frequency modes",
                    "FDA Cleared technology for home use"
                ].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3 text-deep-charcoal/80">
                        <div className="mt-1 w-5 h-5 rounded-full bg-warm-stone/40 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 text-deep-teal" />
                        </div>
                        <span className="font-sans leading-relaxed">{benefit}</span>
                    </li>
                ))}
            </ul>

            {/* Add to Cart Section */}
            <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-sm space-y-6">
                <Button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="w-full h-14 text-lg font-medium group relative overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {isAdding ? (
                            <motion.div
                                key="adding"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </motion.div>
                        ) : (
                            <motion.div
                                key="add"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                Add to Cart — {formattedPrice}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Button>

                <div className="grid grid-cols-2 gap-4 text-sm text-deep-charcoal/60 px-2">
                    <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-amber-glow" />
                        Free US Shipping
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-glow" />
                        1-Year Warranty
                    </div>
                </div>
            </div>

            {/* Description HTML from Shopify */}
            <div className="prose prose-teal max-w-none pt-4">
                {/* Basic sanitize or trust Shopify HTML */}
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
            </div>

            <ProductSpecsAccordion />
        </div>
    );
}

function ProductSpecsAccordion() {
    return (
        <div className="pt-8 border-t border-warm-stone/50 space-y-4">
            <details className="group border border-warm-stone/50 rounded-2xl bg-white/50 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-sans font-medium text-lg text-deep-charcoal select-none">
                    Technical Specifications
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div className="px-6 pb-6 text-deep-charcoal/70 text-sm leading-relaxed space-y-3">
                    <div className="flex justify-between py-2 border-b border-warm-stone/30">
                        <span>Frequency</span>
                        <span className="font-medium text-deep-charcoal">1 MHz & 3 MHz</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-warm-stone/30">
                        <span>Intensity Levels</span>
                        <span className="font-medium text-deep-charcoal">Low (0.8), Med (1.2), High (1.5 W/cm²)</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-warm-stone/30">
                        <span>Treatment Timer</span>
                        <span className="font-medium text-deep-charcoal">5, 10, 15 minutes</span>
                    </div>
                </div>
            </details>

            <details className="group border border-warm-stone/50 rounded-2xl bg-white/50 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-sans font-medium text-lg text-deep-charcoal select-none">
                    What&apos;s in the Box
                    <span className="transition group-open:rotate-180">
                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                </summary>
                <div className="px-6 pb-6 text-deep-charcoal/70 text-sm leading-relaxed space-y-2">
                    <ul className="list-disc pl-4 space-y-2">
                        <li>Ultraease Advanced Handheld Device</li>
                        <li>250ml Conductive Ultrasound Gel</li>
                        <li>Magnetic Wireless Charging Dock</li>
                        <li>USB-C Cable & Power Adapter</li>
                        <li>Quick Start Protocol Guide</li>
                    </ul>
                </div>
            </details>
        </div>
    )
}
