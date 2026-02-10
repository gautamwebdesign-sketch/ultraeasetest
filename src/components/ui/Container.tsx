import { HTMLAttributes, forwardRef } from "react";
import styles from "./Container.module.css";
import { cn } from "@/lib/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> { }

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(styles.container, className)}
                {...props}
            />
        );
    }
);

Container.displayName = "Container";

export { Container };
