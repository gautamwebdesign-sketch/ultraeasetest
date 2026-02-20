"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
            scrolled
                ? "bg-warm-ivory/80 backdrop-blur-md border-b border-mid-teal/10 py-4 shadow-sm"
                : "bg-transparent py-6"
        )}>
            <Container className="flex items-center justify-between">
                <Link href="/" className={cn(
                    "text-2xl font-bold font-heading transition-colors duration-300",
                    scrolled ? "text-deep-charcoal" : "text-white"
                )}>
                    Ultraease
                </Link>

                {/* Mobile/Traditional Nav (Hidden on desktop per V1.0 brief, but kept for mobile/fallback) */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {["Overview", "Features", "Specs", "About"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className={cn(
                                        "text-sm font-medium transition-colors duration-300",
                                        scrolled ? "text-deep-charcoal/70 hover:text-deep-teal" : "text-white/70 hover:text-white"
                                    )}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <Button
                        size="sm"
                        variant="primary"
                        href="https://amazon.com"
                        className={cn(
                            "transition-all duration-300",
                            scrolled ? "bg-deep-teal text-white hover:bg-mid-teal" : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                        )}
                    >
                        Buy Now
                    </Button>
                </div>
            </Container>
        </header>
    );
}
