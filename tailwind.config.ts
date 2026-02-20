import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // V1.0 Palette (Updated with new primary brand color)
                "deep-teal": "#1A4A5A",
                "mid-teal": "#17bbb0", // Primary Brand Color
                "warm-ivory": "#FAF8F4",
                "warm-stone": "#E8E0D8",
                "amber-glow": "#D4956A",
                "deep-charcoal": "#1A2B35",
                "medium-grey": "#6D7B82",
            },
            fontFamily: {
                heading: ["var(--font-cormorant)", "serif"],
                sans: ["var(--font-dm-sans)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
