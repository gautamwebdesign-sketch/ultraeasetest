import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import { ProblemRecognition } from "@/components/home/ProblemRecognition";
import { TwoPaths } from "@/components/home/TwoPaths";
import { TissueDepthVisualiser } from "@/components/home/TissueDepthVisualiser";
import { FrequencyExplorer } from "@/components/home/FrequencyExplorer";
import { SessionWalkthrough } from "@/components/home/SessionWalkthrough";
import { Timeline } from "@/components/home/Timeline";
import { Reviews } from "@/components/home/Reviews";
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
      <TwoPaths />
      <TissueDepthVisualiser />

      {/* Interactive Features */}
      <FrequencyExplorer />
      <SessionWalkthrough />
      <Timeline />

      {/* Trust & Conversion */}
      <Reviews />
      <StillnessMoment />
      <ScienceAccordion />
      <FinalCTA />

      <Footer />
    </main>
  );
}
