"use client";
import { motion } from "framer-motion";

interface MotionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
}

export default function MotionButton({ href, children, className = "", variant = "primary" }: MotionButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 rounded-full font-medium transition-colors";
  const variantClasses = variant === "primary" 
    ? "bg-kpsNavy px-6 py-3 text-white shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-kpsGold/70"
    : "border border-kpsNavy px-6 py-3 text-kpsNavy hover:bg-kpsNavy hover:text-white";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <motion.a 
        href={href} 
        className={`${baseClasses} ${variantClasses} ${className}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    </motion.div>
  );
}
