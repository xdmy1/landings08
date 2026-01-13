"use client";
import React, { useEffect, useRef } from "react";

export const BackgroundRippleEffect = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        radius: 0,
        alpha: 1,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i];
        
        ctx.save();
        ctx.globalAlpha = ripple.alpha;
        
        const gradient = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          0,
          ripple.x,
          ripple.y,
          ripple.radius
        );
        gradient.addColorStop(0, "rgba(168, 85, 247, 0.1)");
        gradient.addColorStop(0.5, "rgba(236, 72, 153, 0.05)");
        gradient.addColorStop(1, "rgba(59, 130, 246, 0)");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ripple.radius += 2;
        ripple.alpha -= 0.005;

        if (ripple.alpha <= 0) {
          ripples.splice(i, 1);
        }
      }

      // Add random ripples
      if (Math.random() < 0.02) {
        addRipple(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        );
      }

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (Math.random() < 0.1) {
        addRipple(e.clientX, e.clientY);
      }
    };

    const handleClick = (e: MouseEvent) => {
      addRipple(e.clientX, e.clientY);
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "transparent",
      }}
    />
  );
});

BackgroundRippleEffect.displayName = "BackgroundRippleEffect";