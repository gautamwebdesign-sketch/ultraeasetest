import Link from "next/link";
import styles from "./Hero.module.css";
import { Button } from "@/components/ui";
import { Scene } from "./Scene";

export function Hero() {
    return (
        <section className={styles.hero}>
            <span className={styles.eyebrow}>New</span>
            <h1 className={styles.headline}>Ultraease. Profound Relief.</h1>

            <p className={styles.subheadline}>
                Vibration-free therapeutic heat and ultrasound. <br />
                Professional recovery at home.
            </p>

            <div className={styles.ctaGroup}>
                <Button size="lg" variant="primary" href="/product">
                    Buy
                </Button>
                <Button size="lg" variant="ghost" href="#features">
                    Learn more &gt;
                </Button>
            </div>

            <div className={styles.imageContainer}>
                {/* 3D Model Scene */}
                <Scene />
            </div>
        </section>
    );
}
