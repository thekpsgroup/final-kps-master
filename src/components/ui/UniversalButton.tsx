"use client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { designTokens, motionVariants } from "@/lib/design-system";

interface UniversalButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  disabled?: boolean;
  success?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  // Advanced features
  ripple?: boolean;
  glow?: boolean;
  gradient?: boolean;
  pulse?: boolean;
}

export default function UniversalButton({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  success = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  onClick,
  ripple = true,
  glow = false,
  gradient = false,
  pulse = false
}: UniversalButtonProps) {
  // Size variants
  const sizeClasses = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl"
  };

  // Variant styles
  const variantClasses = {
    primary: cn(
      "bg-primary-500 text-white shadow-lg",
      "hover:bg-primary-600 focus:ring-primary-500/30",
      gradient && "bg-gradient-to-r from-primary-500 to-primary-600"
    ),
    secondary: cn(
      "bg-gray-100 text-gray-900 shadow-md",
      "hover:bg-gray-200 focus:ring-gray-500/30"
    ),
    ghost: cn(
      "bg-transparent text-primary-600",
      "hover:bg-primary-50 focus:ring-primary-500/30"
    ),
    outline: cn(
      "border-2 border-primary-500 text-primary-600 bg-transparent",
      "hover:bg-primary-500 hover:text-white focus:ring-primary-500/30"
    ),
    danger: cn(
      "bg-red-500 text-white shadow-lg",
      "hover:bg-red-600 focus:ring-red-500/30"
    ),
    success: cn(
      "bg-green-500 text-white shadow-lg",
      "hover:bg-green-600 focus:ring-green-500/30"
    )
  };

  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2",
    "rounded-full font-medium transition-all duration-200",
    "focus:outline-none focus:ring-4 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "overflow-hidden",
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && "w-full",
    glow && "shadow-2xl",
    className
  );

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      variants={motionVariants.button}
      initial="idle"
      whileHover={!disabled && !loading ? "hover" : "idle"}
      whileTap={!disabled && !loading ? "tap" : "idle"}
      animate={
        success ? "success" :
        loading ? "loading" :
        pulse ? motionVariants.pulse.animate : "idle"
      }
    >
      {/* Ripple Effect */}
      {ripple && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-full"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1.5, opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.4 }}
        />
      )}

      {/* Gradient Sweep Animation */}
      {gradient && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={loading ? { x: "100%" } : { x: "-100%" }}
          transition={{
            duration: 1.5,
            repeat: loading ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Glow Effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              `0 0 20px ${designTokens.colors.primary[500]}40`,
              `0 0 40px ${designTokens.colors.primary[500]}60`,
              `0 0 20px ${designTokens.colors.primary[500]}40`
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

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
              <motion.div
                className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Loading...</span>
            </motion.div>
          ) : success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center gap-2"
            >
              <motion.svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </motion.svg>
              <span>Success!</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2"
            >
              {leftIcon && (
                <motion.span
                  animate={{ rotate: loading ? 360 : 0 }}
                  transition={{ duration: 2, repeat: loading ? Infinity : 0 }}
                >
                  {leftIcon}
                </motion.span>
              )}

              <span>{children}</span>

              {rightIcon && (
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {rightIcon}
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
}
