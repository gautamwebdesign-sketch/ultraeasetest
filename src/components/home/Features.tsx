import { Container } from "@/components/ui";
import styles from "./Features.module.css";
import { cn } from "@/lib/utils";

export function Features() {
    return (
        <section className={styles.features} id="features">
            <Container>
                <h2 className={styles.headline}>Advanced Technology. Simple Relief.</h2>

                <div className={styles.grid}>
                    <div className={cn(styles.card, styles.largeCard)}>
                        <div>
                            <h3 className={styles.cardTitle}>Vibration-free Ultrasound.</h3>
                            <p className={styles.cardText}>
                                Silent therapeutic heat that penetrates deep into your muscles after only 1-2 minutes.
                            </p>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>3 Intensity Levels.</h3>
                        <p className={styles.cardText}>
                            Low (0.29W/cm²), Medium (0.44W/cm²), and High (0.53W/cm²) power settings for customized home therapy.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Smart Safety.</h3>
                        <p className={styles.cardText}>
                            Automatic switch-off every 10 minutes ensures safe usage for every session.
                        </p>
                    </div>

                    <div className={styles.card}>
                        <h3 className={styles.cardTitle}>Audio Relaxation.</h3>
                        <p className={styles.cardText}>
                            Includes 4 relaxation techniques via audio to support natural regeneration.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
