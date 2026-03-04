"use client";

import { motion } from "framer-motion";
import { Headphones, Brain, Waves, Moon } from "lucide-react";
import { Container } from "@/components/ui/Container";

const techniques = [
    {
        icon: Waves,
        title: "Progressive Muscle Relaxation",
        description: "Developed by Dr. Edmund Jacobson — releases physical tension from the muscles outward. A clinical standard in pain therapy.",
    },
    {
        icon: Brain,
        title: "Visualisation Exercise",
        description: "Guided by psychotherapist Luise Reddemann — uses directed imagery to reduce the brain's pain response over time.",
    },
    {
        icon: Moon,
        title: "Autogenic Training",
        description: "Developed by Dr. Johannes H. Schultz — trains the nervous system toward calm through focused, repeated suggestion.",
    },
    {
        icon: Headphones,
        title: "Hypnosis & Deep Relaxation",
        description: "A guided audio session that quiets the stress response — shown to lower pain sensitivity in chronic cases.",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const fadeUpVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
    },
};

const cardVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
    },
};

export function MindBodyBonus() {
    return (
        <section id="about" className="py-24 lg:py-36 bg-deep-charcoal overflow-hidden">
            <Container>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                >
                    {/* Trust badge */}
                    <motion.div variants={fadeUpVariant} className="mb-10 flex items-center gap-3">
                        <span className="h-px w-10 bg-amber-glow/50" />
                        <span className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-amber-glow/80">
                            Developed with Psychologists
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h2
                        variants={fadeUpVariant}
                        className="font-heading text-4xl sm:text-5xl lg:text-6xl text-warm-ivory leading-[1.1] max-w-3xl mb-8"
                    >
                        Your device ships with
                        <br />
                        <em className="text-amber-glow italic">a complete recovery system.</em>
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        variants={fadeUpVariant}
                        className="font-sans text-lg lg:text-xl text-warm-ivory/60 max-w-2xl leading-relaxed mb-6"
                    >
                        Alongside the ultrasound device, every order includes four guided audio relaxation sessions
                        and a hardcover book on pain therapy — developed with clinical psychologists. Because the
                        body heals faster when the mind stops bracing.
                    </motion.p>

                    {/* Stress-pain pull quote */}
                    <motion.p
                        variants={fadeUpVariant}
                        className="mb-16 lg:mb-20 font-sans text-sm italic text-warm-ivory/35"
                    >
                        Research consistently shows that stress heightens pain sensitivity. Treating both changes the outcome.
                    </motion.p>

                    {/* Divider label */}
                    <motion.p
                        variants={fadeUpVariant}
                        className="font-sans text-xs font-semibold tracking-[0.2em] uppercase text-warm-ivory/30 mb-8"
                    >
                        4 Guided Audio Sessions Included
                    </motion.p>

                    {/* Technique cards */}
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-20"
                    >
                        {techniques.map((technique) => {
                            const Icon = technique.icon;
                            return (
                                <motion.div
                                    key={technique.title}
                                    variants={cardVariant}
                                    className="group relative bg-white/[0.04] border border-white/8 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-amber-glow/25 transition-all duration-300"
                                >
                                    <div className="mb-5 w-10 h-10 rounded-xl bg-amber-glow/10 border border-amber-glow/20 flex items-center justify-center group-hover:bg-amber-glow/15 transition-colors duration-300">
                                        <Icon size={18} className="text-amber-glow" strokeWidth={1.75} />
                                    </div>
                                    <h3 className="font-heading text-lg text-warm-ivory leading-snug mb-3">
                                        {technique.title}
                                    </h3>
                                    <p className="font-sans text-sm text-warm-ivory/45 leading-relaxed">
                                        {technique.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Book callout strip */}
                    <motion.div
                        variants={fadeUpVariant}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white/[0.04] border border-white/8 rounded-2xl px-8 py-6"
                    >
                        <div className="shrink-0 w-12 h-16 rounded-md bg-amber-glow/15 border border-amber-glow/25 flex items-center justify-center">
                            <svg
                                width="22"
                                height="22"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-amber-glow"
                            >
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-amber-glow/70 mb-1.5">
                                Also Included
                            </p>
                            <p className="font-heading text-xl text-warm-ivory leading-snug">
                                &ldquo;Mind, Body &amp; Recovery&rdquo;
                            </p>
                            <p className="font-sans text-sm text-warm-ivory/45 mt-1.5 leading-relaxed">
                                A hardcover companion written with clinical psychologists — covering the psychology of chronic pain, practical recovery exercises, and the science behind lasting relief.
                            </p>
                        </div>
                        <div className="sm:ml-auto shrink-0">
                            <span className="inline-block font-sans text-xs font-semibold tracking-wide uppercase text-amber-glow border border-amber-glow/30 rounded-full px-4 py-1.5">
                                Complimentary
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
