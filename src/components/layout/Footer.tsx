import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black py-12 border-t border-white/10">
            <Container>
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-16 mb-12">
                    <div>
                        <Link href="/" className="font-heading text-2xl mb-4 inline-flex items-center">
                            <span className="font-medium text-warm-ivory/90">ultra</span>
                            <span className="font-bold text-[#17bbb0]">ease</span>
                        </Link>
                        <p className="font-sans text-sm text-warm-ivory/50 max-w-sm leading-relaxed">
                            *Disclaimer: The Ultraease device is intended for home use to support
                            muscle relaxation and regeneration. For medical conditions or joint
                            pain, please consult a doctor or therapist. Not a substitute for
                            professional medical advice.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-warm-ivory/40 mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Shop", href: "/product/ultrasound-device-for-home-wireless-warming-physiological-therapy" },
                                { label: "How It Works", href: "#overview" },
                                { label: "FAQ", href: "#faq" }
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="font-sans text-sm text-warm-ivory/50 hover:text-warm-ivory transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-warm-ivory/40 mb-5">Contact</h4>
                        <p className="font-sans text-sm text-warm-ivory/50 leading-relaxed">
                            Questions? Reach out anytime.
                        </p>
                        <a href="mailto:support@ultraease.com" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors duration-300 mt-2 inline-block">
                            support@ultraease.com
                        </a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
                    <span className="font-sans text-sm text-warm-ivory/40">© {currentYear} Ultraease. German Engineering.</span>
                    <div className="flex items-center gap-6">
                        {["Privacy Policy", "Terms of Use", "Sales & Refunds", "Legal", "Site Map"].map((link) => (
                            <Link
                                key={link}
                                href={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                                className="font-sans text-xs text-warm-ivory/40 hover:text-warm-ivory transition-colors"
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
