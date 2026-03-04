import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import { ProblemRecognition } from "@/components/home/ProblemRecognition";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { TwoPaths } from "@/components/home/TwoPaths";
import { TissueDepthVisualiser } from "@/components/home/TissueDepthVisualiser";
import { SessionWalkthrough } from "@/components/home/SessionWalkthrough";
import { Reviews } from "@/components/home/Reviews";
import { MindBodyBonus } from "@/components/home/MindBodyBonus";
import { StillnessMoment } from "@/components/home/StillnessMoment";
import { ScienceAccordion } from "@/components/home/ScienceAccordion";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-warm-ivory selection:bg-amber-glow/20">
      <Navbar />
      <Hero />

      {/* Narrative & Education */}
      <ProblemRecognition />
      <ProductShowcase />
      <TwoPaths />
      <TissueDepthVisualiser />

      {/* How to Use */}
      <SessionWalkthrough />

      {/* Trust & Conversion */}
      <MindBodyBonus />
      <Reviews />

      {/* Emotional Close */}
      <StillnessMoment />

      {/* Final Objection Handling + CTA */}
      <ScienceAccordion />
      <FinalCTA />

      <Footer />
    </main>
  );
}
