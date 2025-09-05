import { Transition, Variants } from 'framer-motion';

// Advanced animation configuration system optimized for 60fps performance
export const animationConfig = {
  // Optimized springs for smooth 60fps animations
  spring: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 25,
    mass: 0.8,
  },

  smooth: {
    type: 'tween' as const,
    duration: 0.3,
    ease: 'easeOut' as const,
  },

  bounce: {
    type: 'spring' as const,
    stiffness: 350,
    damping: 20,
    mass: 0.6,
  },

  elastic: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 18,
    mass: 1,
  },

  // Stagger patterns for different layouts
  stagger: {
    grid: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
    list: {
      delayChildren: 0.05,
      staggerChildren: 0.02,
    },
    hero: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
    cards: {
      delayChildren: 0.08,
      staggerChildren: 0.03,
    },
  },

  // Performance-optimized transform presets
  transforms: {
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: 'easeOut' as const,
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: 'easeOut' as const,
      },
    },
    reveal: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
    slideUp: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut' as const,
      },
    },
    slideIn: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
    scaleIn: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut' as const,
      },
    },
  },

  // Viewport settings for performance
  viewport: {
    once: true,
    margin: '-10%',
    amount: 0.3,
  },

  // GPU-accelerated properties
  gpuProps: {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
  },
};

// Predefined animation variants for common use cases
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ...animationConfig.stagger.hero,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

export const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: animationConfig.stagger.grid,
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: animationConfig.spring,
  },
};

export const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: animationConfig.spring,
  },
  hover: {
    ...animationConfig.transforms.hover,
    transition: animationConfig.smooth,
  },
  tap: animationConfig.transforms.tap,
};

export const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.1,
    },
  },
};

// Specialized variants for different components
export const heroVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const buttonVariants: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
  glow: {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    transition: {
      duration: 0.3,
    },
  },
};

export const formVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  error: {
    x: [0, -10, 10, -10, 0],
    transition: {
      duration: 0.4,
    },
  },
  success: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

// Utility function to create staggered animations
export function createStaggeredVariants(delay: number = 0.1, stagger: number = 0.05) {
  return {
    container: {
      hidden: {},
      visible: {
        transition: {
          delayChildren: delay,
          staggerChildren: stagger,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: animationConfig.spring,
      },
    },
  };
}

// Utility function to check for reduced motion preference
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Performance monitoring for animations
export class AnimationPerformance {
  private static instance: AnimationPerformance;
  private frameCount = 0;
  private lastTime = 0;
  private fps = 0;

  static getInstance() {
    if (!AnimationPerformance.instance) {
      AnimationPerformance.instance = new AnimationPerformance();
    }
    return AnimationPerformance.instance;
  }

  monitorFPS(callback: (fps: number) => void) {
    const animate = () => {
      this.frameCount++;

      if (performance.now() - this.lastTime >= 1000) {
        this.fps = Math.round((this.frameCount * 1000) / (performance.now() - this.lastTime));
        callback(this.fps);
        this.frameCount = 0;
        this.lastTime = performance.now();
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }

  // Check if animations should be reduced for performance or accessibility
  shouldReduceMotion(): boolean {
    return this.fps < 50 || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}

// Hook for using animation performance monitoring
export function useAnimationPerformance() {
  const monitor = AnimationPerformance.getInstance();

  const checkPerformance = (callback: (shouldReduce: boolean) => void) => {
    monitor.monitorFPS((fps) => {
      const shouldReduce = fps < 50;
      callback(shouldReduce);
    });
  };

  return {
    checkPerformance,
    shouldReduceMotion: monitor.shouldReduceMotion.bind(monitor),
  };
}

// Optimized transition configurations for different use cases
export const transitions = {
  fast: { duration: 0.15, ease: 'easeOut' as const },
  normal: { duration: 0.3, ease: 'easeOut' as const },
  slow: { duration: 0.5, ease: 'easeOut' as const },
  bounce: { type: 'spring' as const, stiffness: 400, damping: 25 },
  elastic: { type: 'spring' as const, stiffness: 200, damping: 20 },
};

// Form-specific animations
export const formAnimations = {
  button: {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    disabled: { scale: 1, opacity: 0.6 },
  },
  input: {
    focus: {
      scale: 1.01,
      borderColor: '#3B82F6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    error: {
      scale: 1.01,
      borderColor: '#EF4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
      shake: {
        x: [-10, 10, -10, 10, 0],
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      },
    },
  },
  label: {
    focus: { color: '#3B82F6' },
  },
  success: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  },
  float: {
    initial: { y: 0 },
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  field: {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    blur: {
      scale: 1,
      transition: { duration: 0.2 },
    },
  },
};

// Page transition animations
export const pageTransitions = {
  page: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  slide: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -300, opacity: 0 },
    transition: { duration: 0.3 },
  },
};

// Helper function to get optimized transition based on performance
export function getOptimizedTransition(
  baseTransition: Transition,
  performanceMode: boolean = false,
): Transition {
  if (performanceMode) {
    const transition = { ...baseTransition };
    // Handle duration optimization for performance mode
    if ('duration' in transition && typeof transition.duration === 'number') {
      transition.duration = Math.min(transition.duration, 0.2);
    } else {
      (transition as Transition & { duration?: number }).duration = 0.2;
    }
    return transition;
  }
  return baseTransition;
}
