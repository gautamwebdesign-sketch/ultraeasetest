import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PageLoader } from "@/components/ui/PageLoader";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultraease | Advanced Home Ultrasound Therapy",
  description: "Experience vibration-free, silent therapeutic heat with the Ultraease Ultrasound device. Professional physiotherapy at home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        "min-h-screen font-sans antialiased bg-warm-ivory text-deep-charcoal selection:bg-mid-teal/20",
        dmSans.variable,
        cormorant.variable
      )}>
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
