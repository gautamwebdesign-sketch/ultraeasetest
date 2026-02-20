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
                <Link href="/" className="text-2xl transition-opacity duration-300 hover:opacity-80 flex items-center">
                    <span className="font-heading font-bold text-[#17bbb0]">Ultra</span>
                    <span className={cn(
                        "font-sans font-light tracking-wide transition-colors duration-300",
                        scrolled ? "text-deep-charcoal" : "text-white"
                    )}>ease</span>
                </Link>

                {/* Mobile/Traditional Nav */}
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-10">
                        {["Overview", "Features", "Specs", "About"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className={cn(
                                        "text-base font-medium transition-colors duration-300",
                                        scrolled ? "text-deep-charcoal/70 hover:text-[#17bbb0]" : "text-white/80 hover:text-white"
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
                        href="/product/ultraease"
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
