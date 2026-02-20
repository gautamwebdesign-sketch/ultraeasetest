"use client";

import { useEffect, useRef } from "react";

export function Waveform() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Wave parameters
        const baseAmplitude = 50;
        const frequency = 0.01;
        const speed = 0.02; // Controls the 4s cycle feel

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", resize);
        resize();

        const animate = () => {
            time += speed;

            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Calculate scroll dampening (amplitude decreases as user scrolls down)
            const scrollY = window.scrollY;
            const dampening = Math.max(0, 1 - scrollY / 500); // Fades out over 500px scroll
            const currentAmplitude = baseAmplitude * dampening;

            if (currentAmplitude <= 0.1) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }

            const centerY = canvas.height / 2;

            // Draw the wave
            ctx.beginPath();
            ctx.moveTo(0, centerY);

            for (let x = 0; x < canvas.width; x++) {
                // Simple sine wave + slight secondary wave for organic feel
                // y = A * sin(kx - wt)
                const y = centerY +
                    Math.sin(x * frequency + time) * currentAmplitude +
                    Math.sin(x * frequency * 2 + time * 1.5) * (currentAmplitude * 0.5);

                ctx.lineTo(x, y);
            }

            // Gradient Stroke: Primary Brand Color (#17bbb0)
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, "rgba(23, 187, 176, 0.1)"); // Primary low opacity
            gradient.addColorStop(0.5, "rgba(23, 187, 176, 0.8)"); // Primary at crest (center)
            gradient.addColorStop(1, "rgba(23, 187, 176, 0.1)"); // Primary low opacity

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.stroke();

            // Glow effect
            ctx.shadowBlur = 20;
            ctx.shadowColor = "rgba(23, 187, 176, 0.5)"; // Primary glow shadow

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-60"
            aria-hidden="true"
        />
    );
}
