import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

const Container = forwardRef<HTMLDivElement, ContainerProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
                {...props}
            />
        );
    }
);

Container.displayName = "Container";

export { Container };
