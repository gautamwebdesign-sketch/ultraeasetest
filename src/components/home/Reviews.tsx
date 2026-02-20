"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

type Category = "All" | "Pain & Recovery" | "Skin & Beauty";

const reviews = [
    {
        name: "Insider",
        role: "Verified Purchase",
        content: "A good investment for quality of life! Since using it for my polyneuropathy pain, my life quality has improved significantly. Easy to use and I feel a clear reduction in symptoms after just a few sessions.",
        initials: "IN",
        category: "Pain & Recovery"
    },
    {
        name: "Rene",
        role: "Verified Purchase",
        content: "Crazy device... The secret to eternal youth! I used it for back pain and saw immediate relief. Then I tried it for beauty with a moisture mask - the results for skin tightening were amazing.",
        initials: "RE",
        category: "Skin & Beauty" // Fits both, but let's categorize for filtering
    },
    {
        name: "Leseratte",
        role: "Verified Purchase",
        content: "Very good device. The large metal head is perfect for the face and covers larger areas. I use it to work in my cosmetics and the results are super.",
        initials: "LE",
        category: "Skin & Beauty"
    },
    {
        name: "Gertrude Heger",
        role: "Verified Purchase",
        content: "It works perfectly. You have to try it out to see if ultrasound is good for your specific complaints, but for me, it functions flawlessly.",
        initials: "GH",
        category: "Pain & Recovery"
    },
    {
        name: "Francisco Javier",
        role: "Verified Purchase",
        content: "Very practical and manageable. Being wireless, you can take it anywhere. You feel a pleasant sensation of heat without burning. Great for my mother's knee osteoarthritis.",
        initials: "FJ",
        category: "Pain & Recovery"
    },
    {
        name: "Jens Stührmann",
        role: "Verified Purchase",
        content: "Great device, easy to operate and does my ankle osteoarthritis a lot of good.",
        initials: "JS",
        category: "Pain & Recovery"
    }
];

export function Reviews() {
    const [activeFilter, setActiveFilter] = useState<Category>("All");

    const filteredReviews = reviews.filter(r =>
        activeFilter === "All" || r.category === activeFilter
    );

    return (
        <section className="py-24 lg:py-32 bg-[#F8F6F2] selection:bg-deep-teal/10">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-deep-charcoal mb-6">
                            In Their Words
                        </h2>
                        <p className="font-sans text-xl text-deep-charcoal/70">
                            Real experiences from people who trusted Ultraease to help them heal.
                        </p>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {(["All", "Pain & Recovery", "Skin & Beauty"] as Category[]).map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-2.5 rounded-full font-sans text-sm font-medium tracking-wide transition-all
                                    ${activeFilter === filter
                                        ? "bg-deep-teal text-white shadow-md shadow-deep-teal/20 pointer-events-none"
                                        : "bg-white text-deep-charcoal border border-warm-stone/50 hover:border-deep-teal/30 hover:bg-warm-stone/20"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Horizontal Scroll Track on Mobile, Masonry-ish Grid on Desktop */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 lg:snap-none">
                    <AnimatePresence mode="popLayout">
                        {filteredReviews.map((review, i) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{ duration: 0.4, type: "spring", bounce: 0.1 }}
                                key={review.name + activeFilter}
                                className="min-w-[300px] sm:min-w-[350px] lg:min-w-0 snap-center bg-white p-8 rounded-[2rem] shadow-sm border border-black/5 flex flex-col justify-between"
                                style={{
                                    // Slight rotation for handwritten note feel, alternating
                                    rotate: i % 2 === 0 ? -1 : 1
                                }}
                            >
                                <div>
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star key={s} size={14} className="fill-amber-glow text-amber-glow" />
                                        ))}
                                    </div>
                                    <p className="font-heading text-xl lg:text-2xl text-deep-charcoal italic leading-relaxed mb-8">
                                        "{review.content}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-10 h-10 rounded-full bg-warm-stone/30 flex items-center justify-center font-bold text-deep-teal font-sans text-sm tracking-widest shrink-0">
                                        {review.initials}
                                    </div>
                                    <div>
                                        <p className="font-sans font-medium text-deep-charcoal text-sm">{review.name}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-deep-teal/50" />
                                            <p className="text-xs text-deep-charcoal/50 uppercase tracking-wider">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </Container>
        </section>
    );
}
