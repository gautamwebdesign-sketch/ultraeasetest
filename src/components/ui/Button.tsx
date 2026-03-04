import { ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg" | "full";
    href?: string;
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", href, ...props }, ref) => {
        const variants = {
            primary: "btn-capsule-primary",
            secondary: "btn-capsule-secondary",
            outline: "border border-deep-teal/30 text-deep-teal hover:bg-deep-teal/5 rounded-full tracking-wide transition-all",
            ghost: "text-deep-charcoal/70 hover:text-deep-charcoal hover:bg-black/5 rounded-full tracking-wide transition-all",
        };

        const sizes = {
            sm: "py-[11px] px-[26px] text-[12px]",
            md: "py-[15px] px-[40px] text-[13px]",
            lg: "py-[19px] px-[56px] text-[16px]",
            full: "py-[15px] w-full text-[14px]",
        };

        const commonClasses = cn(
            "inline-flex items-center justify-center font-sans font-medium tracking-[0.04em] disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            sizes[size],
            className
        );

        if (href) {
            return (
                <Link
                    href={href}
                    className={commonClasses}
                    ref={ref as React.Ref<HTMLAnchorElement>}
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
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
