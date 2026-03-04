"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "The Problem",  href: "#overview" },
    { label: "Applications", href: "#features" },
    { label: "Technology",   href: "#specs"    },
    { label: "Wellness Kit", href: "#about"    },
] as const;

export function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [menuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [menuOpen]);

    return (
        <>
            <header className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled || menuOpen || !isHomePage
                    ? "bg-warm-ivory/95 backdrop-blur-md border-b border-mid-teal/10 py-4 shadow-sm"
                    : "bg-transparent py-6"
            )}>
                <Container className="flex items-center justify-between">
                    <Link href="/" className="text-2xl transition-opacity duration-300 hover:opacity-80 flex items-center" onClick={() => setMenuOpen(false)}>
                        <span className={cn(
                            "font-heading font-medium transition-colors duration-300",
                            scrolled || menuOpen || !isHomePage ? "text-deep-charcoal" : "text-white/90"
                        )}>ultra</span>
                        <span className="font-heading font-bold text-[#17bbb0]">ease</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:block">
                        <ul className="flex items-center gap-10">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "font-sans text-base font-medium transition-colors duration-300",
                                            scrolled || !isHomePage ? "text-deep-charcoal/70 hover:text-mid-teal" : "text-white/80 hover:text-white"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Button
                            size="sm"
                            variant="primary"
                            href="/product/ultrasound-device-for-home-wireless-warming-physiological-therapy"
                            className="hidden sm:inline-flex"
                        >
                            Buy Now
                        </Button>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] rounded-full hover:bg-black/5 transition-colors"
                        >
                            <motion.span
                                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className={cn("block w-5 h-[1.5px] rounded-full transition-colors", scrolled || menuOpen || !isHomePage ? "bg-deep-charcoal" : "bg-white")}
                            />
                            <motion.span
                                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                                className={cn("block w-5 h-[1.5px] rounded-full transition-colors", scrolled || menuOpen || !isHomePage ? "bg-deep-charcoal" : "bg-white")}
                            />
                            <motion.span
                                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25 }}
                                className={cn("block w-5 h-[1.5px] rounded-full transition-colors", scrolled || menuOpen || !isHomePage ? "bg-deep-charcoal" : "bg-white")}
                            />
                        </button>
                    </div>
                </Container>
            </header>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="fixed inset-0 z-40 bg-warm-ivory flex flex-col pt-24 px-8 pb-12 md:hidden"
                    >
                        <nav className="flex-1 flex flex-col justify-center gap-2">
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className="block font-heading italic text-5xl text-deep-charcoal hover:text-mid-teal transition-colors py-3 border-b border-warm-stone/60"
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28, duration: 0.3 }}
                        >
                            <Button
                                size="lg"
                                variant="primary"
                                href="/product/ultrasound-device-for-home-wireless-warming-physiological-therapy"
                                className="w-full"
                                onClick={() => setMenuOpen(false)}
                            >
                                Buy Now
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
