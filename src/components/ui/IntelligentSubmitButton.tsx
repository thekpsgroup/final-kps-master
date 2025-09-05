'use client';
import { animationConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface IntelligentSubmitButtonProps {
  isValid: boolean;
  isSubmitting: boolean;
  submitSuccess: boolean;
  brand: {
    accentHex: string;
    brandName?: string;
  };
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export default function IntelligentSubmitButton({
  isValid,
  isSubmitting,
  submitSuccess,
  brand,
  disabled = false,
  className,
  children,
  onClick,
}: IntelligentSubmitButtonProps) {
  const [buttonState, setButtonState] = useState<
    'idle' | 'validating' | 'submitting' | 'success' | 'error'
  >('idle');
  const [progress, setProgress] = useState(0);

  // Update button state based on props
  useEffect(() => {
    if (submitSuccess) {
      setButtonState('success');
      setProgress(100);
    } else if (isSubmitting) {
      setButtonState('submitting');
      // Simulate progress during submission
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
      return () => clearInterval(interval);
    } else if (isValid) {
      setButtonState('idle');
      setProgress(0);
    } else {
      setButtonState('idle');
      setProgress(0);
    }
  }, [isValid, isSubmitting, submitSuccess]);

  const handleClick = () => {
    if (disabled || isSubmitting || !isValid) return;
    setButtonState('validating');
    onClick?.();
  };

  const getButtonContent = () => {
    switch (buttonState) {
      case 'validating':
        return (
          <motion.div
            key="validating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            />
            Validating...
          </motion.div>
        );

      case 'submitting':
        return (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3"
          >
            <div className="relative">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              {/* Progress ring */}
              <svg className="absolute inset-0 w-5 h-5 -rotate-90" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <motion.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="62.8"
                  initial={{ strokeDashoffset: 62.8 }}
                  animate={{ strokeDashoffset: 62.8 - (progress / 100) * 62.8 }}
                  transition={{ duration: 0.3 }}
                />
              </svg>
            </div>
            <span>Sending...</span>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 0.6 }}
              className="text-2xl"
            >
              ✓
            </motion.div>
            <span>Message Sent!</span>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 0.6 }}
              className="text-xl"
            >
              !
            </motion.div>
            <span>Try Again</span>
          </motion.div>
        );

      default:
        return (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            {children || (
              <>
                <span>Send Message</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  →
                </motion.span>
              </>
            )}
          </motion.div>
        );
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={disabled || isSubmitting}
      className={cn(
        'relative w-full py-4 px-6 rounded-xl font-medium text-white',
        'transition-all duration-300 overflow-hidden',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:cursor-not-allowed',
        !isValid && !isSubmitting
          ? 'bg-gray-300 cursor-not-allowed'
          : `bg-current hover:opacity-90 active:scale-[0.98] focus:ring-current`,
        className,
      )}
      style={
        {
          backgroundColor: isValid && !isSubmitting ? brand.accentHex : '#d1d5db',
          '--brand-color': brand.accentHex,
        } as React.CSSProperties
      }
      whileHover={isValid && !isSubmitting ? animationConfig.transforms.hover : undefined}
      whileTap={isValid && !isSubmitting ? animationConfig.transforms.tap : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, ...animationConfig.spring }}
    >
      {/* Background animation gradient */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: '-100%' }}
        animate={{
          x: buttonState === 'submitting' ? '0%' : '-100%',
        }}
        style={{
          background: `linear-gradient(90deg, transparent, ${brand.accentHex}80, transparent)`,
        }}
        transition={{ duration: 1.5, repeat: buttonState === 'submitting' ? Infinity : 0 }}
      />

      {/* Pulse effect for success */}
      <AnimatePresence>
        {buttonState === 'success' && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              scale: [0, 2, 3],
              opacity: [1, 0.5, 0],
            }}
            transition={{ duration: 0.8 }}
            style={{
              background: `radial-gradient(circle, ${brand.accentHex}60, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Glow effect for valid state */}
      <AnimatePresence>
        {isValid && !isSubmitting && buttonState !== 'success' && (
          <motion.div
            className="absolute inset-0 rounded-xl opacity-0"
            whileHover={{ opacity: 0.2 }}
            style={{
              boxShadow: `0 0 20px ${brand.accentHex}40`,
              background: `linear-gradient(135deg, ${brand.accentHex}20, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2">
        <AnimatePresence mode="wait">{getButtonContent()}</AnimatePresence>
      </div>

      {/* Micro-interactions for disabled state */}
      {!isValid && !isSubmitting && (
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            opacity: [0, 0.1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: `linear-gradient(45deg, transparent, ${brand.accentHex}20, transparent)`,
          }}
        />
      )}

      {/* Accessibility improvements */}
      <span className="sr-only">
        {buttonState === 'submitting' && 'Sending your message'}
        {buttonState === 'success' && 'Message sent successfully'}
        {buttonState === 'error' && 'Error sending message'}
        {buttonState === 'idle' && isValid && 'Click to send your message'}
        {buttonState === 'idle' && !isValid && 'Please fill in all required fields'}
      </span>
    </motion.button>
  );
}

// Specialized button variants for different contexts
export function CompactSubmitButton({
  isValid,
  isSubmitting,
  submitSuccess,
  brand,
  ...props
}: IntelligentSubmitButtonProps) {
  return (
    <IntelligentSubmitButton
      isValid={isValid}
      isSubmitting={isSubmitting}
      submitSuccess={submitSuccess}
      brand={brand}
      className="py-3 px-6 text-sm rounded-lg"
      {...props}
    >
      {isSubmitting ? 'Sending...' : submitSuccess ? 'Sent!' : 'Send'}
    </IntelligentSubmitButton>
  );
}

export function LargeSubmitButton({
  isValid,
  isSubmitting,
  submitSuccess,
  brand,
  ...props
}: IntelligentSubmitButtonProps) {
  return (
    <IntelligentSubmitButton
      isValid={isValid}
      isSubmitting={isSubmitting}
      submitSuccess={submitSuccess}
      brand={brand}
      className="py-5 px-8 text-lg rounded-2xl shadow-lg"
      {...props}
    >
      <span className="flex items-center gap-3">
        {isSubmitting ? 'Processing...' : submitSuccess ? 'Success!' : 'Get Started Today'}
        {!isSubmitting && !submitSuccess && (
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            →
          </motion.span>
        )}
      </span>
    </IntelligentSubmitButton>
  );
}
