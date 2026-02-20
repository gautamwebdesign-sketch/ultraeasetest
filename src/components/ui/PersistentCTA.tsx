"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PersistentCTA() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 1 viewport height
            const show = window.scrollY > window.innerHeight * 0.8;
            setIsVisible(show);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
                }`}
        >
            <Button
                size="lg"
                className="h-12 px-8 rounded-full bg-deep-teal text-white hover:bg-mid-teal hover:scale-105 shadow-xl transition-all duration-300 font-medium tracking-wide flex items-center gap-2 group"
                onClick={() => window.open("https://amazon.com", "_blank")}
            >
                View on Amazon
                <ExternalLink size={16} className="opacity-70 group-hover:translate-x-1 transition-transform" />
            </Button>
        </div>
    );
}
