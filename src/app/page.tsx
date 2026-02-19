import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { TechSpecs } from "@/components/home/TechSpecs";
import { UsageSection } from "@/components/home/UsageSection";
import { Reviews } from "@/components/home/Reviews";
import { FAQ } from "@/components/home/FAQ";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <UsageSection />
      <Reviews />
      <TechSpecs />
      <FAQ />
      <Footer />
    </main>
  );
}
