import Link from "next/link";
import styles from "./Navbar.module.css";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Navbar() {
    return (
        <header className={styles.header}>
            <Container className={styles.navContent}>
                <Link href="/" className={styles.logo}>
                    Ultraease
                </Link>

                <nav>
                    <ul className={styles.navLinks}>
                        <li>
                            <Link href="#overview" className={styles.navLink}>
                                Overview
                            </Link>
                        </li>
                        <li>
                            <Link href="#features" className={styles.navLink}>
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="#specs" className={styles.navLink}>
                                Tech Specs
                            </Link>
                        </li>
                        <li>
                            <Link href="/about" className={styles.navLink}>
                                About
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className={styles.actions}>
                    {/* Small Buy button */}
                    <Button size="sm" variant="primary" href="/product">
                        Buy
                    </Button>
                </div>
            </Container>
        </header>
    );
}
