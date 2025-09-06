"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import UniversalInput from "./UniversalInput";
import { useTouch } from "@/hooks/useTouch";

interface MobileOptimizedInputProps {
  label: string;
  name: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  onFocus?: () => void;
  onBlur?: () => void;
  [key: string]: unknown;
}

export default function MobileOptimizedInput({
  label,
  name,
  type = "text",
  onFocus,
  onBlur,
  ...props
}: MobileOptimizedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useTouch(inputRef);

  // Haptic feedback for mobile
  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    triggerHaptic();
    onFocus?.();

    // Scroll input into view on mobile
    setTimeout(() => {
      inputRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 300);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };


  return (
    <motion.div
      className="relative"
      animate={{
        scale: isFocused ? 1.02 : 1,
        zIndex: isFocused ? 10 : 1
      }}
      transition={{ duration: 0.2 }}
    >
      <UniversalInput
        ref={inputRef}
        label={label}
        name={name}
        type={type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          ${isFocused ? 'shadow-2xl shadow-primary-500/20' : ''}
          touch-manipulation
          ${type === 'email' ? 'inputmode-email' : ''}
          ${type === 'tel' ? 'inputmode-tel' : ''}
        `}
        {...props}
      />

      {/* Mobile-specific enhancements */}
      {isFocused && (
        <motion.div
          className="fixed inset-0 bg-black/20 z-0 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBlur}
        />
      )}
    </motion.div>
  );
}
