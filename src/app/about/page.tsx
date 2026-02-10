import { Navbar, Footer } from "@/components/layout";
import { Container } from "@/components/ui";
import styles from "./page.module.css";

export default function About() {
    return (
        <main className={styles.main}>
            <Navbar />

            <Container className={styles.content}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Designed for Relief.</h1>
                    <p className={styles.subtitle}>
                        German engineering meets advanced ultrasound technology to bring professional therapy home.
                    </p>
                </div>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Our Mission</h2>
                    <p className={styles.text}>
                        At Ultraease, we believe in the power of natural regeneration. Our mission is to provide accessible, high-quality physiological ultrasound devices that support muscle relaxation and pain therapy in the comfort of your home.
                    </p>
                    <p className={styles.text}>
                        We combine silence, safety, and effectiveness to create a product that not only works but feels good to use. Vibration-free and whisper-quiet, the Ultraease device allows you to focus entirely on your recovery.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Quality & Precision</h2>
                    <p className={styles.text}>
                        As a German company, we adhere to the highest standards of quality control. The Ultraease system is microprocessor-controlled to ensure precise intensity levels and maximum safety.
                    </p>
                    <p className={styles.text}>
                        Every kit comes with high-quality instructions and background knowledge on ultrasonic applications, empowering you to understand your therapy.
                    </p>
                </section>
            </Container>

            <Footer />
        </main>
    );
}
