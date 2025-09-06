"use client";
import { useState, useEffect, useCallback } from 'react';

interface BrandContext {
  currentBrand: BrandConfig | null;
  colorScheme: 'light' | 'dark' | 'auto';
  userPreferences: {
    reducedMotion: boolean;
    highContrast: boolean;
    colorBlindness?: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  };
  environmentalFactors: {
    networkType: 'slow' | 'fast' | 'unknown';
    deviceType: 'mobile' | 'tablet' | 'desktop';
    memoryPressure: boolean;
    batteryLevel?: number;
  };
}

interface BrandConfig {
  brandName: string;
  accentHex: string;
  secondaryColor?: string;
  darkModeColors?: {
    accentHex: string;
    secondaryColor?: string;
  };
}

interface AdaptiveColors {
  primary: string;
  secondary: string;
  light: string;
  border: string;
  background: string;
  text: string;
  muted: string;
}

/**
 * Intelligent brand context system that adapts to user preferences and environment
 */
export function useBrandContext() {
  const [brandContext, setBrandContext] = useState<BrandContext>({
    currentBrand: null,
    colorScheme: 'light',
    userPreferences: {
      reducedMotion: false,
      highContrast: false,
      colorBlindness: 'none'
    },
    environmentalFactors: {
      networkType: 'unknown',
      deviceType: 'desktop',
      memoryPressure: false
    }
  });

  // Detect user accessibility preferences
  useEffect(() => {
    const mediaQueries = {
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      prefersHighContrast: window.matchMedia('(prefers-contrast: high)'),
      prefersColorScheme: window.matchMedia('(prefers-color-scheme: dark)')
    };

    const updatePreferences = () => {
      setBrandContext(prev => ({
        ...prev,
        colorScheme: mediaQueries.prefersColorScheme.matches ? 'dark' : 'light',
        userPreferences: {
          ...prev.userPreferences,
          reducedMotion: mediaQueries.prefersReducedMotion.matches,
          highContrast: mediaQueries.prefersHighContrast.matches
        }
      }));
    };

    // Initial detection
    updatePreferences();

    // Listen for changes
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updatePreferences);
    });

    return () => {
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updatePreferences);
      });
    };
  }, []);

  // Detect environmental factors
  useEffect(() => {
    const detectEnvironment = () => {
      // Network detection
      let networkType: 'slow' | 'fast' | 'unknown' = 'unknown';
      if ('connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType: string; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void } }).connection;
        if (connection) {
          const slowConnections = ['slow-2g', '2g'];
          const fastConnections = ['4g', '5g'];
          if (slowConnections.includes(connection.effectiveType)) {
            networkType = 'slow';
          } else if (fastConnections.includes(connection.effectiveType)) {
            networkType = 'fast';
          }
        }
      }

      // Device type detection
      const userAgent = navigator.userAgent;
      let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        deviceType = /iPad|Android(?=.*\bMobile\b)/i.test(userAgent) ? 'tablet' : 'mobile';
      }

      // Memory pressure detection
      let memoryPressure = false;
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        memoryPressure = memory ? memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8 : false;
      }

      // Battery level detection
      let batteryLevel: number | undefined;
      if ('getBattery' in navigator) {
        (navigator as Navigator & { getBattery?: () => Promise<{ level: number }> }).getBattery?.()?.then((battery) => {
          batteryLevel = battery.level * 100;
          setBrandContext(prev => ({
            ...prev,
            environmentalFactors: {
              ...prev.environmentalFactors,
              batteryLevel
            }
          }));
        });
      }

      setBrandContext(prev => ({
        ...prev,
        environmentalFactors: {
          ...prev.environmentalFactors,
          networkType,
          deviceType,
          memoryPressure,
          batteryLevel
        }
      }));
    };

    detectEnvironment();

    // Re-detect on network changes
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType: string; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void } }).connection;
      if (connection) {
        const handleNetworkChange = () => detectEnvironment();
        connection.addEventListener('change', handleNetworkChange);
        return () => connection.removeEventListener('change', handleNetworkChange);
      }
    }
  }, []);

  /**
   * Adapt brand colors based on context and accessibility needs
   */
  const adaptBrandColors = useCallback((brand: BrandConfig): AdaptiveColors => {
    const { userPreferences, colorScheme, environmentalFactors } = brandContext;

    // Base colors
    let primary = brand.accentHex;
    let secondary = brand.secondaryColor || '#6b7280';

    // Dark mode adjustments
    if (colorScheme === 'dark') {
      primary = brand.darkModeColors?.accentHex || adjustColorForDarkMode(brand.accentHex);
      secondary = brand.darkModeColors?.secondaryColor || adjustColorForDarkMode(secondary);
    }

    // High contrast adjustments
    if (userPreferences.highContrast) {
      primary = colorScheme === 'dark' ? '#ffffff' : '#000000';
      secondary = colorScheme === 'dark' ? '#cccccc' : '#333333';
    }

    // Color blindness adaptations
    if (userPreferences.colorBlindness && userPreferences.colorBlindness !== 'none') {
      const adaptedColors = adaptForColorBlindness(primary, secondary, userPreferences.colorBlindness);
      primary = adaptedColors.primary;
      secondary = adaptedColors.secondary;
    }

    // Performance and battery optimizations
    if (environmentalFactors.memoryPressure || (environmentalFactors.batteryLevel && environmentalFactors.batteryLevel < 20)) {
      // Reduce color complexity for performance
      primary = simplifyColor(primary);
      secondary = simplifyColor(secondary);
    }

    // Network-aware adjustments (reduce quality on slow connections)
    if (environmentalFactors.networkType === 'slow') {
      // Use more saturated colors that compress better
      primary = increaseSaturation(primary);
      secondary = increaseSaturation(secondary);
    }

    const colors: AdaptiveColors = {
      primary,
      secondary,
      light: `${primary}20`,
      border: `${primary}30`,
      background: colorScheme === 'dark' ? '#1f2937' : '#ffffff',
      text: colorScheme === 'dark' ? '#f9fafb' : '#111827',
      muted: colorScheme === 'dark' ? '#6b7280' : '#9ca3af'
    };

    // Apply colors to CSS custom properties for global access
    applyCSSCustomProperties(colors);

    return colors;
  }, [brandContext]);

  /**
   * Set current brand and trigger color adaptation
   */
  const setCurrentBrand = useCallback((brand: BrandConfig | null) => {
    setBrandContext(prev => ({ ...prev, currentBrand: brand }));

    if (brand) {
      adaptBrandColors(brand);
    }
  }, [adaptBrandColors]);

  return {
    brandContext,
    adaptBrandColors,
    setCurrentBrand,
    // Computed values
    isHighContrast: brandContext.userPreferences.highContrast,
    prefersReducedMotion: brandContext.userPreferences.reducedMotion,
    isDarkMode: brandContext.colorScheme === 'dark',
    isSlowNetwork: brandContext.environmentalFactors.networkType === 'slow',
    isMobile: brandContext.environmentalFactors.deviceType === 'mobile'
  };
}

/**
 * Intelligent content adaptation based on viewport and performance
 */
export function useContentAdaptation() {
  const [adaptationSettings, setAdaptationSettings] = useState({
    imageQuality: 'high' as 'low' | 'medium' | 'high',
    animationComplexity: 'full' as 'minimal' | 'reduced' | 'full',
    contentDensity: 'normal' as 'compact' | 'normal' | 'expanded',
    fontSize: 'normal' as 'small' | 'normal' | 'large',
    imageLoading: 'eager' as 'lazy' | 'eager'
  });

  useEffect(() => {
    const adaptContent = () => {
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      const settings = { ...adaptationSettings };

      // Viewport-based adaptations
      if (viewport.width < 640) {
        // Mobile optimizations
        settings.contentDensity = 'compact';
        settings.fontSize = 'normal';
        settings.animationComplexity = 'reduced';
      } else if (viewport.width < 1024) {
        // Tablet optimizations
        settings.contentDensity = 'normal';
        settings.animationComplexity = 'full';
      }

      // Network-aware adaptations
      if ('connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType: string; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void } }).connection;
        if (connection) {
          if (['slow-2g', '2g'].includes(connection.effectiveType)) {
            settings.imageQuality = 'low';
            settings.animationComplexity = 'minimal';
            settings.imageLoading = 'lazy';
          } else if (connection.effectiveType === '3g') {
            settings.imageQuality = 'medium';
            settings.animationComplexity = 'reduced';
          }
        }
      }

      // Memory-aware adaptations
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        if (memory && memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
          settings.animationComplexity = 'minimal';
          settings.imageQuality = 'medium';
        }
      }

      // Battery-aware adaptations
      if ('getBattery' in navigator) {
        (navigator as Navigator & { getBattery?: () => Promise<{ level: number }> }).getBattery?.()?.then((battery) => {
          if (battery.level < 0.2) {
            settings.animationComplexity = 'minimal';
            settings.imageQuality = 'medium';
          }
        });
      }

      // User preference adaptations
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        settings.animationComplexity = 'minimal';
      }

      setAdaptationSettings(settings);
    };

    adaptContent();

    // Re-adapt on resize and network changes
    const handleResize = () => adaptContent();
    const handleNetworkChange = () => adaptContent();

    window.addEventListener('resize', handleResize);

    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection?: { effectiveType: string; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void } }).connection;
      if (connection) {
        connection.addEventListener('change', handleNetworkChange);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if ('connection' in navigator) {
        const connection = (navigator as Navigator & { connection?: { effectiveType: string; addEventListener: (type: string, listener: EventListener) => void; removeEventListener: (type: string, listener: EventListener) => void } }).connection;
        if (connection) {
          connection.removeEventListener('change', handleNetworkChange);
        }
      }
    };
  }, [adaptationSettings]);

  return adaptationSettings;
}

/**
 * Smart loading strategies based on context
 */
export function useSmartLoading() {
  const adaptationSettings = useContentAdaptation();

  const getImageProps = useCallback((src: string, alt: string, priority = false) => {
    const baseProps = {
      src,
      alt,
      loading: adaptationSettings.imageLoading as 'lazy' | 'eager'
    };

    // Priority images are always loaded eagerly
    if (priority) {
      return { ...baseProps, priority: true, loading: 'eager' as const };
    }

    // Quality adjustments
    const quality = adaptationSettings.imageQuality === 'low' ? 75 :
                   adaptationSettings.imageQuality === 'medium' ? 85 : 95;

    return {
      ...baseProps,
      quality,
      placeholder: adaptationSettings.imageQuality === 'low' ? 'empty' : 'blur' as const
    };
  }, [adaptationSettings]);

  const getAnimationProps = useCallback(() => {
    const complexity = adaptationSettings.animationComplexity;

    const baseProps = {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    };

    if (complexity === 'minimal') {
      return {
        ...baseProps,
        transition: { duration: 0.2, ease: 'easeOut' }
      };
    } else if (complexity === 'reduced') {
      return {
        ...baseProps,
        transition: { duration: 0.3, ease: 'easeOut' }
      };
    }

    // Full complexity
    return {
      ...baseProps,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    };
  }, [adaptationSettings]);

  return {
    getImageProps,
    getAnimationProps,
    adaptationSettings
  };
}

// Utility functions for color adaptations

function adjustColorForDarkMode(color: string): string {
  // Simple dark mode color adjustment
  // In a real implementation, you'd use a proper color manipulation library
  return color; // Placeholder - would need proper color math
}

function adaptForColorBlindness(
  primary: string,
  secondary: string,
  type: 'protanopia' | 'deuteranopia' | 'tritanopia'
): { primary: string; secondary: string } {
  // Simplified color blindness adaptations
  // In a real implementation, you'd use proper color transformation matrices
  const adaptations = {
    protanopia: { primary: '#4a90e2', secondary: '#7ed321' },
    deuteranopia: { primary: '#d0021b', secondary: '#f5a623' },
    tritanopia: { primary: '#9013fe', secondary: '#50e3c2' }
  };

  return adaptations[type] || { primary, secondary };
}

function simplifyColor(color: string): string {
  // Simplify color for performance (reduce alpha, use solid colors)
  return color.replace(/[\d.]+\)$/, '1)');
}

function increaseSaturation(color: string): string {
  // Increase saturation for better compression
  // Placeholder - would need proper HSL manipulation
  return color;
}

function applyCSSCustomProperties(colors: AdaptiveColors): void {
  const root = document.documentElement;
  root.style.setProperty('--brand-primary', colors.primary);
  root.style.setProperty('--brand-secondary', colors.secondary);
  root.style.setProperty('--brand-light', colors.light);
  root.style.setProperty('--brand-border', colors.border);
  root.style.setProperty('--brand-background', colors.background);
  root.style.setProperty('--brand-text', colors.text);
  root.style.setProperty('--brand-muted', colors.muted);
}

/**
 * Performance monitoring hook for adaptive features
 */
export function usePerformanceMonitor() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    networkLatency: 0,
    batteryLevel: 100
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measurePerformance = () => {
      frameCount++;
      const currentTime = performance.now();

      // Calculate FPS every second
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setPerformanceMetrics(prev => ({ ...prev, fps }));

        frameCount = 0;
        lastTime = currentTime;
      }

      // Memory usage
      if ('memory' in performance) {
        const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
        const memoryUsage = memory ? Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100) : 0;
        setPerformanceMetrics(prev => ({ ...prev, memoryUsage }));
      }

      requestAnimationFrame(measurePerformance);
    };

    const animationId = requestAnimationFrame(measurePerformance);

    // Battery monitoring
    if ('getBattery' in navigator) {
      const getBattery = (navigator as Navigator & { getBattery?: () => Promise<{ level: number; addEventListener: (type: string, listener: EventListener) => void }> }).getBattery;
      if (getBattery) {
        getBattery().then((battery) => {
          const updateBattery = () => {
            setPerformanceMetrics(prev => ({
              ...prev,
              batteryLevel: Math.round(battery.level * 100)
            }));
          };

          updateBattery();
          battery.addEventListener('levelchange', updateBattery);
        });
      }
    }

    return () => cancelAnimationFrame(animationId);
  }, []);

  return performanceMetrics;
}
