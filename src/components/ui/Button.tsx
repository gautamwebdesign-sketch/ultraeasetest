import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import styles from "./Button.module.css";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "full";
    href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
        const commonClasses = cn(
            styles.button,
            styles[variant],
            styles[size],
            className
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className={commonClasses}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    {...(props as any)}
                >
                    {props.children}
                </Link>
            );
        }

        return (
            <button
                ref={ref as React.Ref<HTMLButtonElement>}
                className={commonClasses}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export { Button };
