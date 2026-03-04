"use client";

import { useState, useRef, useEffect } from "react";
import { Product } from "@/lib/shopify";
import { motion, AnimatePresence } from "framer-motion";
import {
    Check, Shield, Truck, Star, Minus, Plus,
    ChevronDown, RefreshCw, ArrowRight,
} from "lucide-react";

// ─── Static content ────────────────────────────────────────────────────────────

const BENEFITS = [
    "Deep tissue penetration up to 5cm",
    "No heat felt on the surface — 100% focused energy",
    "1 MHz therapeutic frequency, clinically validated",
    "FDA-cleared technology, engineered for home use",
];

const TRUST_ITEMS = [
    { icon: Truck,      label: "Free Shipping",      sub: "Delivered to your door"       },
    { icon: Shield,     label: "30-Day Guarantee",   sub: "Full refund, no questions"    },
    { icon: RefreshCw,  label: "1-Year Warranty",    sub: "Covered against defects"      },
];

const SPECS = [
    { label: "Operating Frequency",           value: "1 MHz ± 10%"                      },
    { label: "Effective Radiating Area (ERA)", value: "4.0 cm² ± 20%"                   },
    { label: "Intensity Range",               value: "0.29 / 0.44 / 0.53 W/cm²"        },
    { label: "Session Timer",                 value: "10 min (auto-shutoff)"             },
    { label: "Power",                         value: "Wireless charging dock (USB-C)"   },
    { label: "Head Material",                 value: "Medical-grade aluminium"           },
];

const IN_BOX = [
    "Ultraease Therapeutic Device",
    "250ml Conductive Ultrasound Gel",
    "Magnetic Wireless Charging Dock",
    "USB-C Cable & Power Adapter",
    "4 Guided Audio Relaxation Sessions",
    "\"Mind, Body & Recovery\" Hardcover Book",
    "Quick Start Guide",
];

// ─── Accordion component ───────────────────────────────────────────────────────

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-t border-warm-stone/50">
            <button
                onClick={() => setOpen(v => !v)}
                className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
            >
                <span className={`font-sans font-medium text-sm transition-colors duration-200 ${
                    open ? "text-deep-teal" : "text-deep-charcoal group-hover:text-deep-teal"
                }`}>
                    {title}
                </span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                        open ? "text-deep-teal/60" : "text-deep-charcoal/40"
                    }`} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function ProductInfo({ product, storeDomain }: { product: Product; storeDomain?: string }) {
    const [qty, setQty] = useState(1);
    const [loading, setLoading] = useState(false);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const el = ctaRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => setShowSticky(!entry.isIntersecting),
            { threshold: 0 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const price = product.priceRange.minVariantPrice;
    const unitPrice = parseFloat(price.amount);
    const fmt = (n: number) =>
        new Intl.NumberFormat("de-DE", { style: "currency", currency: price.currencyCode }).format(n);

    const handleCheckout = () => {
        setLoading(true);
        const variantId = product.variants.nodes[0]?.id;
        if (!variantId) { setLoading(false); return; }
        const numericId = variantId.split("/").pop();
        const cleanDomain = storeDomain
            ? storeDomain.replace(/^https?:\/\//, "").replace(/\/$/, "")
            : "ultra-ease.myshopify.com";
        window.location.href = `https://${cleanDomain}/cart/${numericId}:${qty}`;
    };

    return (
        <div>

            {/* ── 1. Social proof + header ─────────────────────────────────── */}
            <div className="pb-7 border-b border-warm-stone/50">

                {/* Stars */}
                <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => (
                            <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${s <= 4 ? "fill-amber-glow text-amber-glow" : "fill-amber-glow/35 text-amber-glow/35"}`}
                            />
                        ))}
                    </div>
                    <span className="font-sans text-sm text-deep-charcoal/55">
                        <strong className="font-semibold text-deep-charcoal">4.3</strong> · 252 verified reviews
                    </span>
                </div>

                {/* Eyebrow */}
                <p className="font-sans text-[11px] font-semibold tracking-[0.22em] uppercase text-amber-glow mb-3">
                    Professional Grade
                </p>

                {/* Title from Shopify */}
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] text-deep-charcoal leading-[1.08] tracking-tight mb-5">
                    {product.title}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                    <span className="font-sans text-2xl font-semibold text-deep-teal tracking-tight">
                        {fmt(unitPrice)}
                    </span>
                    <span className="font-sans text-xs text-deep-charcoal/40">incl. VAT · free shipping</span>
                </div>
            </div>

            {/* ── 2. Key benefits ──────────────────────────────────────────── */}
            <div className="py-6 border-b border-warm-stone/50">
                <ul className="space-y-3">
                    {BENEFITS.map((b, i) => (
                        <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.06, duration: 0.35 }}
                            className="flex items-start gap-3"
                        >
                            <div className="mt-0.5 w-[18px] h-[18px] rounded-full bg-deep-teal/10 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-deep-teal" strokeWidth={2.5} />
                            </div>
                            <span className="font-sans text-sm text-deep-charcoal/72 leading-relaxed">{b}</span>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {/* ── 3. Quantity + CTA ────────────────────────────────────────── */}
            <div className="py-6 space-y-3 border-b border-warm-stone/50">

                {/* Qty stepper + Buy Now in one row */}
                <div className="flex items-center gap-3">

                    {/* Quantity stepper */}
                    <div className="inline-flex items-center border border-warm-stone/80 rounded-2xl overflow-hidden bg-white shadow-sm shrink-0">
                        <motion.button
                            onClick={() => setQty(q => Math.max(1, q - 1))}
                            disabled={qty <= 1}
                            whileTap={{ scale: 0.82 }}
                            className="w-11 h-11 flex items-center justify-center text-deep-charcoal/50 hover:text-deep-charcoal hover:bg-warm-stone/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                        >
                            <Minus className="w-3.5 h-3.5" />
                        </motion.button>

                        <AnimatePresence mode="wait">
                            <motion.span
                                key={qty}
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 6 }}
                                transition={{ duration: 0.14 }}
                                className="w-10 text-center font-sans font-semibold text-sm text-deep-charcoal select-none"
                            >
                                {qty}
                            </motion.span>
                        </AnimatePresence>

                        <motion.button
                            onClick={() => setQty(q => Math.min(5, q + 1))}
                            disabled={qty >= 5}
                            whileTap={{ scale: 0.82 }}
                            className="w-11 h-11 flex items-center justify-center text-deep-charcoal/50 hover:text-deep-charcoal hover:bg-warm-stone/20 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </motion.button>
                    </div>

                    {/* Checkout button — flex-1 fills remaining width naturally */}
                    <button
                        ref={ctaRef}
                        onClick={handleCheckout}
                        disabled={loading}
                        className="btn-capsule-primary flex-1 h-[54px] font-sans font-semibold text-[15px] flex items-center justify-center gap-2.5 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <AnimatePresence mode="wait">
                            {loading ? (
                                <motion.span
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2"
                                >
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Redirecting…
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="cta"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center gap-2.5"
                                >
                                    Buy Now — {fmt(unitPrice * qty)}
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </div>

                {/* Guarantee line */}
                <p className="text-center font-sans text-xs text-deep-charcoal/38 flex items-center justify-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-deep-teal/60 shrink-0" />
                    30-day satisfaction guarantee · Free returns
                </p>
            </div>

            {/* ── 4. Trust badges ──────────────────────────────────────────── */}
            <div className="py-5 border-b border-warm-stone/50">
                <div className="grid grid-cols-3 gap-2.5">
                    {TRUST_ITEMS.map(({ icon: Icon, label, sub }) => (
                        <motion.div
                            key={label}
                            whileHover={{ y: -4, boxShadow: "0 10px 28px rgba(26,74,90,0.11)" }}
                            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
                            className="flex flex-col items-center text-center gap-2 px-2 py-4 rounded-2xl bg-white border border-warm-stone/40 cursor-default"
                        >
                            <motion.div
                                whileHover={{ scale: 1.14 }}
                                transition={{ duration: 0.2 }}
                                className="w-8 h-8 rounded-xl bg-deep-teal/8 border border-deep-teal/10 flex items-center justify-center"
                            >
                                <Icon className="w-4 h-4 text-deep-teal" strokeWidth={1.75} />
                            </motion.div>
                            <div>
                                <p className="font-sans text-[11px] font-semibold text-deep-charcoal leading-snug">{label}</p>
                                <p className="font-sans text-[10px] text-deep-charcoal/42 mt-0.5 leading-snug">{sub}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ── 5. Accordions ────────────────────────────────────────────── */}

            {/* Description from Shopify */}
            {product.descriptionHtml && (
                <Accordion title="About this product">
                    <div className="prose prose-sm max-w-none prose-headings:font-heading prose-headings:text-deep-charcoal prose-headings:font-medium prose-p:text-deep-charcoal/72 prose-p:leading-relaxed prose-strong:text-deep-charcoal prose-li:text-deep-charcoal/72 prose-li:marker:text-deep-teal/50">
                        <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                    </div>
                </Accordion>
            )}

            {/* Technical Specs */}
            <Accordion title="Technical Specifications">
                <div>
                    {SPECS.map(({ label, value }, i) => (
                        <div
                            key={i}
                            className={`flex justify-between gap-4 py-3 text-sm ${i < SPECS.length - 1 ? "border-b border-warm-stone/30" : ""}`}
                        >
                            <span className="font-sans text-deep-charcoal/52">{label}</span>
                            <span className="font-sans font-medium text-deep-charcoal text-right">{value}</span>
                        </div>
                    ))}
                </div>
            </Accordion>

            {/* What's in the Box */}
            <Accordion title="What's in the Box">
                <ul className="space-y-3">
                    {IN_BOX.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className="mt-0.5 w-4 h-4 rounded-full bg-amber-glow/15 flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 text-amber-glow" strokeWidth={2.5} />
                            </div>
                            <span className="font-sans text-sm text-deep-charcoal/68 leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </Accordion>

            {/* Bottom padding so last accordion doesn't hit footer */}
            <div className="pb-8" />

            {/* ── Sticky buy bar — slides up when CTA scrolls off screen ─── */}
            <AnimatePresence>
                {showSticky && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
                        className="fixed bottom-0 inset-x-0 z-30 bg-warm-ivory/96 backdrop-blur-xl border-t border-warm-stone/60 shadow-[0_-4px_24px_rgba(26,74,90,0.08)]"
                    >
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="font-heading text-base text-deep-charcoal truncate leading-tight">{product.title}</p>
                                <p className="font-sans text-sm font-semibold text-deep-teal">{fmt(unitPrice * qty)}</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={loading}
                                className="btn-capsule-primary h-11 px-7 font-sans font-semibold text-sm flex items-center gap-2 shrink-0 disabled:opacity-70"
                            >
                                Buy Now
                                <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
