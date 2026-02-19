import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading"
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
    <html lang="en">
      <body className={cn(
        "min-h-screen font-sans antialiased",
        inter.variable,
        poppins.variable
      )}>
        {children}
      </body>
    </html>
  );
}
