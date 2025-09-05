"use client";
import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { animationConfig } from '@/lib/animations';
import { cn } from '@/lib/utils';

interface BackToTopProps {
  threshold?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'glass' | 'minimal';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  showProgress?: boolean;
  className?: string;
}

export default function BackToTop({
  threshold = 400,
  size = 'md',
  variant = 'glass',
  position = 'bottom-right',
  showProgress = true,
  className
}: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();

  // Smooth scroll animation
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 300,
    damping: 30,
    mass: 0.5
  });

  // Calculate scroll progress
  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setScrollProgress(progress);
      setIsVisible(scrollTop > threshold);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });

    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
  };

  const variantClasses = {
    default: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg',
    glass: 'bg-white/90 backdrop-blur-md border border-white/20 text-gray-700 shadow-lg hover:bg-white/95',
    minimal: 'bg-gray-900/90 text-white shadow-lg hover:bg-gray-800/90'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.1
          }}
          onClick={scrollToTop}
          className={cn(
            "fixed z-40 rounded-full flex items-center justify-center transition-all duration-300",
            "hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            sizeClasses[size],
            positionClasses[position],
            variantClasses[variant],
            className
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          {/* Progress Ring */}
          {showProgress && (
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100, 100"
                strokeDashoffset="0"
                className="opacity-20"
              />
              <motion.path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="100, 100"
                initial={{ strokeDashoffset: 100 }}
                animate={{ strokeDashoffset: 100 - scrollProgress }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="opacity-60"
              />
            </svg>
          )}

          {/* Icon */}
          <motion.svg
            className={cn("relative z-10", iconSizeClasses[size])}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ y: 0 }}
            animate={{ y: [0, -2, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Enhanced version with tooltip and keyboard navigation
export function EnhancedBackToTop(props: BackToTopProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Home' || (event.ctrlKey && event.key === 'ArrowUp')) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="relative">
      <BackToTop {...props} />

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap"
          >
            Back to top
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Scroll progress bar component
export function ScrollProgressBar({
  height = 3,
  color = '#3b82f6',
  className,
  ...props
}: {
  height?: number;
  color?: string;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-50 origin-left",
        className
      )}
      style={{
        scaleX,
        height: `${height}px`,
        backgroundColor: color
      }}
    />
  );
}

// Reading progress indicator
export function ReadingProgress({
  contentRef,
  className,
  ...props
}: {
  contentRef: React.RefObject<HTMLElement>;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      const windowScrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (totalHeight) {
        const progress = (windowScrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', updateReadingProgress, { passive: true });
    updateReadingProgress();

    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, [contentRef]);

  return (
    <motion.div
      className={cn(
        "fixed top-0 left-0 right-0 z-40 origin-left bg-blue-600",
        className
      )}
      style={{
        scaleX: readingProgress / 100,
        height: '2px'
      }}
      transition={{ duration: 0.1 }}
    />
  );
}

// Floating action menu with multiple actions
export function FloatingActionMenu({
  actions,
  position = 'bottom-right',
  size = 'md',
  className
}: {
  actions: Array<{
    id: string;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    color?: string;
  }>;
  position?: 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6'
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className={cn("fixed z-40", positionClasses[position], className)}>
          {/* Action buttons */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mb-3 space-y-3"
              >
                {actions.map((action, index) => (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: {
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 300,
                        damping: 25
                      }
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.5,
                      y: 20,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      "block w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white",
                      "hover:scale-110 active:scale-95 transition-transform"
                    )}
                    style={{ backgroundColor: action.color || '#3b82f6' }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={action.label}
                  >
                    {action.icon}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main toggle button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg",
              "flex items-center justify-center transition-colors",
              sizeClasses[size]
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.svg
              className={iconSizeClasses[size]}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"}
              />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
