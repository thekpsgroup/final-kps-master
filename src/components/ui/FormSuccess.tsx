"use client";
import { motion } from "framer-motion";
import { formAnimations } from "@/lib/animations";
import GlassCard from "./GlassCard";
import FormButton from "./FormButton";

interface FormSuccessProps {
  title?: string;
  message?: string;
  onReset?: () => void;
  showConfetti?: boolean;
}

export default function FormSuccess({
  title = "Thank you!",
  message = "We'll be in touch within 2-4 hours.",
  onReset,
  showConfetti = true
}: FormSuccessProps) {
  return (
    <motion.div
      variants={formAnimations.success}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      {/* Confetti Background Animation */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-kpsGold rounded-full"
              initial={{ x: "50%", y: "50%", scale: 0, opacity: 0 }}
              animate={{
                x: `${20 + (i * 60) % 400}%`,
                y: `${10 + (i * 30) % 200}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.5 + (i * 0.1),
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}

      <GlassCard className="p-8 border border-black/5 shadow-glass relative z-10">
        <motion.div
          className="text-center"
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Success Icon with Celebration */}
          <motion.div
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 15
            }}
          >
            {/* Pulsing Ring */}
            <motion.div
              className="absolute inset-0 bg-green-200 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Checkmark with Path Animation */}
            <motion.svg
              className="w-10 h-10 text-green-600 relative z-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.8,
                  ease: "easeInOut"
                }}
              />
            </motion.svg>

            {/* Floating Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-kpsGold rounded-full"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: [0, (i % 2 ? 20 : -20)],
                  y: [0, (i % 3 ? -15 : 15)]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.7 + (i * 0.1),
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>

          {/* Success Title */}
          <motion.h3
            className="text-2xl font-semibold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {title}
          </motion.h3>

          {/* Success Message */}
          <motion.p
            className="text-gray-600 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            {message}
          </motion.p>

          {/* Next Steps */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            {/* Floating CTA */}
            <motion.div
              variants={formAnimations.float}
              animate="animate"
            >
              <FormButton
                variant="secondary"
                onClick={() => window.open('/modern-suite', '_blank')}
              >
                Explore Our Modern Suite
              </FormButton>
            </motion.div>

            {onReset && (
              <motion.button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-kpsNavy transition-colors underline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Another Form
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </GlassCard>
    </motion.div>
  );
}
