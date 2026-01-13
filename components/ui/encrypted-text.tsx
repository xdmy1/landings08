"use client";
import { useEffect, useState } from "react";

export const EncryptedText = ({
  text,
  className = "",
  interval = 50,
}: {
  text: string;
  className?: string;
  interval?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  const chars = "!@#$%^&*(){}[]|\\;:'\",.<>?/~`_+-=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  useEffect(() => {
    let animationFrameId: number;
    let iteration = 0;

    const animate = () => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        setIsAnimating(false);
        return;
      }

      iteration += 1 / 3;
      animationFrameId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      iteration = 0;
      setIsAnimating(true);
      animate();
    };

    startAnimation();
    const intervalId = setInterval(startAnimation, interval * text.length + 2000);

    return () => {
      clearInterval(intervalId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, interval, chars]);

  return (
    <span
      className={`font-mono ${className} ${
        isAnimating ? "text-neutral-400" : "text-neutral-300"
      }`}
    >
      {displayText}
    </span>
  );
};