import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <Container>
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 mb-12">
                    <div>
                        <Link href="/" className="text-2xl font-bold font-heading text-white mb-4 block">
                            Ultraease
                        </Link>
                        <p className="text-sm text-white/50 max-w-sm">
                            *Disclaimer: The Ultraease device is intended for home use to support
                            muscle relaxation and regeneration. For medical conditions or joint
                            pain, please consult a doctor or therapist. Not a substitute for
                            professional medical advice.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <span className="text-sm text-white/40">© {currentYear} Ultraease. German Engineering.</span>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Use", "Sales & Refunds", "Legal", "Site Map"].map((link) => (
                            <Link
                                key={link}
                                href={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                className="text-xs text-white/40 hover:text-white transition-colors"
                            >
                                {link}
                            </Link>
                        ))}
                    </div>
                </div>
            </Container>
        </footer>
    );
}
