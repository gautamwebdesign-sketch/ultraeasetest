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
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        )}>
            <Container className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold font-heading text-white">
                    Ultraease
                </Link>

                <nav className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        {["Overview", "Features", "Specs", "About"].map((item) => (
                            <li key={item}>
                                <Link
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <Button size="sm" variant="primary" href="/product">
                        Buy Now
                    </Button>
                </div>
            </Container>
        </header>
    );
}
