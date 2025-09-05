"use client";
import { motion, useSpring } from "framer-motion";
import { useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

// Magnetic Button Effect
export function MagneticButton({ children, ...props }: MagneticButtonProps) {
  const springConfig = { damping: 15, stiffness: 300 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    x.set(deltaX * 0.1);
    y.set(deltaY * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

// Parallax Card Effect
export function ParallaxCard({ children, ...props }: ParallaxCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface RippleEffectProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  [key: string]: unknown;
}

// Ripple Effect
export function RippleEffect({ children, ...props }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };

    setRipples(prev => [...prev, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="relative overflow-hidden" onClick={handleClick} {...props}>
      {children}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x - 25,
            top: ripple.y - 25,
            width: 50,
            height: 50
          }}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// Floating Label with Particles
export function FloatingLabel({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <motion.div
      className="relative"
      animate={{
        y: active ? -8 : 0,
        scale: active ? 0.85 : 1
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
      {active && (
        <div className="absolute -top-2 -right-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary-400 rounded-full"
              animate={{
                x: [0, 10, 0],
                y: [0, -10, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
