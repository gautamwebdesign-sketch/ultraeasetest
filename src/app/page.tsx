import { Navbar, Footer } from "@/components/layout";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { TechSpecs } from "@/components/home/TechSpecs";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Features />
      <TechSpecs />
      <Footer />
    </main>
  );
}
