"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const directionVariants = {
    up: { y: 24, opacity: 0 },
    down: { y: -24, opacity: 0 },
    left: { x: 24, opacity: 0 },
    right: { x: -24, opacity: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
