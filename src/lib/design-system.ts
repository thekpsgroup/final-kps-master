// Complete design system tokens
export const designTokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#00438c', // kpsNavy
      600: '#003875',
      900: '#1e3a8a'
    },
    accent: {
      400: '#cab068', // kpsGold
      500: '#b8a05c'
    },
    semantic: {
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6'
    },
    glass: {
      light: 'rgba(255, 255, 255, 0.7)',
      dark: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(0, 0, 0, 0.05)'
    }
  },

  shadows: {
    glass: '0 8px 24px rgba(0, 0, 0, 0.12)',
    glassHover: '0 12px 32px rgba(0, 0, 0, 0.16)',
    soft: '0 10px 30px rgba(0, 0, 0, 0.08)',
    focus: '0 0 0 4px rgba(0, 67, 140, 0.1)'
  },

  animations: {
    durations: {
      fast: 150,
      normal: 300,
      slow: 500
    },
    easings: {
      smooth: [0.25, 0.46, 0.45, 0.94],
      bounce: [0.68, -0.55, 0.265, 1.55],
      sharp: [0.4, 0, 0.2, 1]
    }
  },

  spacing: {
    form: {
      fieldGap: '1.5rem',
      sectionGap: '2rem',
      containerPadding: '2rem'
    }
  }
} as const;

// Animation variants library
export const motionVariants = {
  // Page transitions
  page: {
    initial: { opacity: 0, y: 8 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: designTokens.animations.easings.smooth }
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.3 }
    }
  },

  // Staggered containers
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  },

  // Form fields
  formField: {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: designTokens.animations.easings.smooth
      }
    }
  },

  // Buttons with multiple states
  button: {
    idle: { scale: 1 },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 },
    loading: {
      scale: 1,
      transition: { duration: 0.3 }
    },
    success: {
      scale: [1, 1.05, 1],
      transition: { duration: 0.6, ease: designTokens.animations.easings.bounce }
    }
  },

  // Success celebrations
  celebration: {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: designTokens.animations.easings.bounce,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },

  // Micro-interactions
  float: {
    animate: {
      y: [0, -4, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  },

  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { duration: 2, repeat: Infinity }
    }
  },

  shake: {
    animate: {
      x: [0, -8, 8, -8, 8, 0],
      transition: { duration: 0.4 }
    }
  }
};
