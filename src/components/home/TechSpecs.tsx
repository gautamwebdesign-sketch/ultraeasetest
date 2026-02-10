import { Container } from "@/components/ui";
import styles from "./TechSpecs.module.css";

export function TechSpecs() {
    return (
        <section className={styles.section} id="specs">
            <Container>
                <h2 className={styles.title}>Technical Specifications</h2>

                <div className={styles.specsContainer}>
                    <table className={styles.table}>
                        <tbody>
                            <tr className={styles.row}>
                                <td className={`${styles.cell} ${styles.label}`}>Low Intensity</td>
                                <td className={`${styles.cell} ${styles.value}`}>0.29 W/cm²</td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={`${styles.cell} ${styles.label}`}>Medium Intensity</td>
                                <td className={`${styles.cell} ${styles.value}`}>0.44 W/cm²</td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={`${styles.cell} ${styles.label}`}>High Intensity</td>
                                <td className={`${styles.cell} ${styles.value}`}>0.53 W/cm²</td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={`${styles.cell} ${styles.label}`}>Auto-Timer</td>
                                <td className={`${styles.cell} ${styles.value}`}>10 minutes (Safety Cut-off)</td>
                            </tr>
                            <tr className={styles.row}>
                                <td className={`${styles.cell} ${styles.label}`}>Kit Includes</td>
                                <td className={`${styles.cell} ${styles.value}`}>Ultrasound Device, Charging Dock, Adapter, User Manual</td>
                            </tr>
                        </tbody>
                    </table>

                    <div className={styles.safetyNote}>
                        <h3 className={styles.safetyTitle}>Important Safety Information</h3>
                        <p>
                            The device is designed for versatile home use. However, sales do not constitute physiotherapeutic advice.
                            For use on sensitive areas like knees, elbows, and other joints, please consult a doctor, therapist, or pharmacist.
                            We are not authorized to provide medical advice for individual applications.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    );
}
