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
            primary: "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5",
            secondary: "bg-secondary text-foreground hover:bg-secondary/80",
            outline: "border border-white/20 hover:border-white/40 hover:bg-white/5 text-foreground backdrop-blur-sm",
            ghost: "hover:bg-white/5 text-foreground/80 hover:text-foreground",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg font-medium",
            full: "h-12 w-full text-base",
        };

        const commonClasses = cn(
            "inline-flex items-center justify-center rounded-lg transition-all duration-300 font-medium active:scale-95 disabled:pointer-events-none disabled:opacity-50",
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
