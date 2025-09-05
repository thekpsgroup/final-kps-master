"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { formAnimations } from "@/lib/animations";

interface FormButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function FormButton({
  children,
  type = "button",
  variant = "primary",
  loading,
  className,
  onClick,
  disabled
}: FormButtonProps) {
  const baseClasses = "w-full rounded-full font-medium transition-all duration-200 focus:ring-4 focus:ring-offset-2 px-6 py-4 relative overflow-hidden";

  const variantClasses = variant === "primary"
    ? "bg-kpsNavy text-white focus:ring-kpsGold/30 disabled:opacity-50"
    : "border-2 border-kpsNavy text-kpsNavy hover:bg-kpsNavy hover:text-white focus:ring-kpsNavy/30";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(baseClasses, variantClasses, className)}
      variants={formAnimations.button}
      initial="idle"
      whileHover={!disabled && !loading ? "hover" : "idle"}
      whileTap={!disabled && !loading ? "tap" : "idle"}
      animate={loading ? "loading" : "idle"}
    >
      {/* Background Gradient Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-kpsNavy to-kpsNavy/90"
        initial={{ x: "-100%" }}
        animate={loading ? { x: "100%" } : { x: "-100%" }}
        transition={{
          duration: 1.5,
          repeat: loading ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              {/* Spinning Loader */}
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Submitting...
              </motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2"
            >
              {children}

              {/* Arrow Animation */}
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Success Ripple Effect */}
      <motion.div
        className="absolute inset-0 bg-green-400/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.4 }}
      />
    </motion.button>
  );
}
