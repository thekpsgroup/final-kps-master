// Comprehensive Design Tokens System
// Ensures consistency across all components and provides a single source of truth

export const designTokens = {
  // Color System
  colors: {
    // Brand Colors
    brand: {
      primary: '#3b82f6', // Blue-600
      secondary: '#6b7280', // Gray-500
      accent: '#10b981', // Emerald-500
      success: '#22c55e', // Green-500
      warning: '#f59e0b', // Amber-500
      error: '#ef4444', // Red-500
      info: '#06b6d4', // Cyan-500
    },

    // Semantic Colors
    semantic: {
      success: {
        50: '#f0fdf4',
        100: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
        900: '#14532d'
      },
      error: {
        50: '#fef2f2',
        100: '#fee2e2',
        500: '#ef4444',
        600: '#dc2626',
        900: '#7f1d1d'
      },
      warning: {
        50: '#fffbeb',
        100: '#fef3c7',
        500: '#f59e0b',
        600: '#d97706',
        900: '#78350f'
      },
      info: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#06b6d4',
        600: '#0891b2',
        900: '#164e63'
      }
    },

    // Neutral Colors
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
      950: '#030712'
    },

    // Background Colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      overlay: 'rgba(0, 0, 0, 0.5)',
      glass: 'rgba(255, 255, 255, 0.1)'
    },

    // Text Colors
    text: {
      primary: '#111827',
      secondary: '#6b7280',
      tertiary: '#9ca3af',
      inverse: '#ffffff',
      muted: '#d1d5db'
    }
  },

  // Typography System
  typography: {
    fontFamily: {
      primary: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      secondary: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace']
    },

    fontSize: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      '7xl': '4.5rem',  // 72px
      '8xl': '6rem',    // 96px
      '9xl': '8rem'     // 128px
    },

    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900
    },

    lineHeight: {
      none: 1,
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },

    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },

  // Spacing System
  spacing: {
    0: '0px',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
    40: '10rem',    // 160px
    48: '12rem',    // 192px
    56: '14rem',    // 224px
    64: '16rem'     // 256px
  },

  // Border Radius System
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px'
  },

  // Shadow System
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: (color: string) => `0 0 20px ${color}40, 0 0 40px ${color}20`
  },

  // Animation System
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
      slower: '700ms'
    },

    easing: {
      linear: 'linear',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    keyframes: {
      fadeIn: 'fadeIn 0.3s ease-out',
      slideUp: 'slideUp 0.3s ease-out',
      slideDown: 'slideDown 0.3s ease-out',
      slideLeft: 'slideLeft 0.3s ease-out',
      slideRight: 'slideRight 0.3s ease-out',
      scaleIn: 'scaleIn 0.3s ease-out',
      bounce: 'bounce 0.6s ease-out'
    }
  },

  // Breakpoint System
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Z-Index System
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070
  },

  // Component-specific tokens
  components: {
    button: {
      height: {
        sm: '2rem',   // 32px
        md: '2.5rem', // 40px
        lg: '3rem'    // 48px
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.625rem 1.25rem',
        lg: '0.75rem 1.5rem'
      },
      fontSize: {
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem'
      }
    },

    input: {
      height: '2.5rem', // 40px
      padding: '0.625rem 1rem',
      borderRadius: '0.5rem',
      fontSize: '1rem'
    },

    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },

    modal: {
      maxWidth: {
        sm: '20rem',  // 320px
        md: '28rem',  // 448px
        lg: '36rem',  // 576px
        xl: '48rem'   // 768px
      },
      padding: '1.5rem',
      borderRadius: '1rem'
    }
  },

  // Responsive utilities
  responsive: {
    container: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },

    grid: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
        12: 'grid-cols-12'
      },

      gaps: {
        1: 'gap-1',
        2: 'gap-2',
        3: 'gap-3',
        4: 'gap-4',
        6: 'gap-6',
        8: 'gap-8'
      }
    }
  }
} as const;

// Type definitions for better TypeScript support
export type DesignTokens = typeof designTokens;
export type ColorKeys = keyof typeof designTokens.colors;
export type SpacingKeys = keyof typeof designTokens.spacing;
export type FontSizeKeys = keyof typeof designTokens.typography.fontSize;
export type ShadowKeys = keyof typeof designTokens.shadows;

// Utility functions for accessing tokens
export const getColor = (path: string): string => {
  const keys = path.split('.');
  let value: Record<string, any> = designTokens.colors;

  for (const key of keys) {
    value = value[key];
    if (!value) return '#000000'; // fallback
  }

  return typeof value === 'string' ? value : '#000000';
};

export const getSpacing = (key: SpacingKeys): string => {
  return designTokens.spacing[key];
};

export const getFontSize = (key: FontSizeKeys): string => {
  return designTokens.typography.fontSize[key];
};

export const getShadow = (key: keyof typeof designTokens.shadows, color?: string): string => {
  const shadow = designTokens.shadows[key];
  if (typeof shadow === 'function' && color) {
    return shadow(color);
  }
  return typeof shadow === 'string' ? shadow : 'none';
};

// CSS custom properties for dynamic theming
export const cssCustomProperties = {
  colors: Object.entries(designTokens.colors).reduce((acc, [category, colors]) => {
    if (typeof colors === 'object') {
      Object.entries(colors as Record<string, any>).forEach(([key, value]) => {
        if (typeof value === 'string') {
          acc[`--color-${category}-${key}`] = value;
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            acc[`--color-${category}-${key}-${subKey}`] = String(subValue);
          });
        }
      });
    }
    return acc;
  }, {} as Record<string, string>),

  spacing: Object.entries(designTokens.spacing).reduce((acc, [key, value]) => {
    acc[`--spacing-${key}`] = value;
    return acc;
  }, {} as Record<string, string>),

  typography: {
    ...Object.entries(designTokens.typography.fontSize).reduce((acc, [key, value]) => {
      acc[`--font-size-${key}`] = value;
      return acc;
    }, {} as Record<string, string>),

    ...Object.entries(designTokens.typography.lineHeight).reduce((acc, [key, value]) => {
      acc[`--line-height-${key}`] = value.toString();
      return acc;
    }, {} as Record<string, string>)
  }
};

// Apply design tokens to CSS custom properties
export const applyDesignTokens = () => {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  // Apply color tokens
  Object.entries(cssCustomProperties.colors).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Apply spacing tokens
  Object.entries(cssCustomProperties.spacing).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });

  // Apply typography tokens
  Object.entries(cssCustomProperties.typography).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

// Component-specific style builders
export const buildComponentStyles = {
  button: (variant: 'primary' | 'secondary' | 'outline' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => ({
    height: designTokens.components.button.height[size],
    padding: designTokens.components.button.padding[size],
    fontSize: designTokens.components.button.fontSize[size],
    borderRadius: designTokens.borderRadius.md,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: `all ${designTokens.animations.duration.normal} ${designTokens.animations.easing.out}`,
    variants: {
      primary: {
        backgroundColor: designTokens.colors.brand.primary,
        color: designTokens.colors.text.inverse,
        border: `1px solid ${designTokens.colors.brand.primary}`,
        '&:hover': {
          backgroundColor: designTokens.colors.semantic.success[600],
          transform: 'translateY(-1px)',
          boxShadow: designTokens.shadows.lg
        }
      },
      secondary: {
        backgroundColor: designTokens.colors.background.secondary,
        color: designTokens.colors.text.primary,
        border: `1px solid ${designTokens.colors.neutral[300]}`,
        '&:hover': {
          backgroundColor: designTokens.colors.neutral[100],
          borderColor: designTokens.colors.neutral[400]
        }
      },
      outline: {
        backgroundColor: 'transparent',
        color: designTokens.colors.brand.primary,
        border: `1px solid ${designTokens.colors.brand.primary}`,
        '&:hover': {
          backgroundColor: designTokens.colors.brand.primary,
          color: designTokens.colors.text.inverse
        }
      }
    }
  }),

  card: (variant: 'default' | 'glass' | 'elevated' = 'default') => ({
    padding: designTokens.components.card.padding,
    borderRadius: designTokens.components.card.borderRadius,
    variants: {
      default: {
        backgroundColor: designTokens.colors.background.primary,
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        boxShadow: designTokens.shadows.sm
      },
      glass: {
        backgroundColor: designTokens.colors.background.glass,
        backdropFilter: 'blur(16px)',
        border: `1px solid ${designTokens.colors.background.glass}`,
        boxShadow: designTokens.shadows.glass
      },
      elevated: {
        backgroundColor: designTokens.colors.background.primary,
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        boxShadow: designTokens.shadows.xl
      }
    }
  })
};

// Theme variants for different contexts
export const themeVariants = {
  light: {
    background: designTokens.colors.background.primary,
    surface: designTokens.colors.background.secondary,
    text: designTokens.colors.text.primary,
    textSecondary: designTokens.colors.text.secondary,
    border: designTokens.colors.neutral[200]
  },

  dark: {
    background: designTokens.colors.neutral[900],
    surface: designTokens.colors.neutral[800],
    text: designTokens.colors.text.inverse,
    textSecondary: designTokens.colors.neutral[400],
    border: designTokens.colors.neutral[700]
  },

  glass: {
    background: designTokens.colors.background.glass,
    surface: 'rgba(255, 255, 255, 0.05)',
    text: designTokens.colors.text.primary,
    textSecondary: designTokens.colors.text.secondary,
    border: 'rgba(255, 255, 255, 0.1)'
  }
} as const;
