"use client";

import React, { useEffect, useRef } from "react";

export const InteractiveGridBackground = React.memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const gridSize = 60; // Bigger squares like notebook
    const hoverRadius = 180; // Area of effect around mouse

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate grid dimensions
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      // Get mouse position
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      // Draw grid lines
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          
          // Calculate distance from mouse to this grid intersection
          const distance = Math.sqrt(Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2));
          
          // Calculate opacity based on distance
          let opacity = 0.1; // Base slightly more visible
          if (distance < hoverRadius) {
            const factor = 1 - (distance / hoverRadius);
            opacity = 0.1 + (factor * 0.22); // Max ~0.32 opacity on hover
          }

          // Draw vertical line segment
          if (i <= cols && j < rows) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + gridSize);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Draw horizontal line segment
          if (j <= rows && i < cols) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + gridSize, y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      drawGrid();
      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }; // Move mouse off screen
    };

    resizeCanvas();
    animate();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
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

InteractiveGridBackground.displayName = "InteractiveGridBackground";