import Link from "next/link";
import styles from "./Footer.module.css";
import { Container } from "@/components/ui/Container";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <Container className={styles.content}>
                <div className={styles.disclaimer}>
                    <p>
                        *Disclaimer: The Ultraease device is intended for home use to support
                        muscle relaxation and regeneration. For medical conditions or joint
                        pain, please consult a doctor or therapist. Not a substitute for
                        professional medical advice.
                    </p>
                </div>

                <div className={styles.legal}>
                    <span>Copyright © {currentYear} Ultraease. All rights reserved. German Quality.</span>
                    <div className={styles.links}>
                        <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
                        <Link href="/terms" className={styles.link}>Terms of Use</Link>
                        <Link href="/sales" className={styles.link}>Sales & Refunds</Link>
                        <Link href="/legal" className={styles.link}>Legal</Link>
                        <Link href="/sitemap" className={styles.link}>Site Map</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
