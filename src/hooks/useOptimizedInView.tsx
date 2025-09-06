"use client";
import { useState, useEffect, useRef } from 'react';

interface UseOptimizedInViewOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
  fallbackInView?: boolean;
  performanceMode?: boolean;
}

interface UseOptimizedInViewReturn {
  ref: React.RefObject<HTMLElement | null>;
  isInView: boolean;
  hasBeenInView: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * High-performance intersection observer hook optimized for 60fps animations
 * Includes performance monitoring and automatic cleanup
 */
export function useOptimizedInView({
  threshold = 0.1,
  rootMargin = '-10% 0px -10% 0px',
  root = null,
  triggerOnce = true,
  fallbackInView = false,
  performanceMode = false
}: UseOptimizedInViewOptions = {}): UseOptimizedInViewReturn {
  const [isInView, setIsInView] = useState(fallbackInView);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const ref = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const performanceRef = useRef({
    lastCallbackTime: 0,
    callbackCount: 0,
    frameDrops: 0
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Performance-optimized observer configuration
    const observerOptions: IntersectionObserverInit = {
      threshold: Array.isArray(threshold) ? threshold : [threshold],
      rootMargin,
      root
    };

    // Create observer with performance monitoring
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const currentTime = performance.now();

        // Performance monitoring for 60fps (16.67ms frames)
        if (performanceRef.current.lastCallbackTime > 0) {
          const frameTime = currentTime - performanceRef.current.lastCallbackTime;
          if (frameTime > 16.67 * 1.5) { // Allow 50% tolerance
            performanceRef.current.frameDrops++;
          }
        }

        performanceRef.current.lastCallbackTime = currentTime;
        performanceRef.current.callbackCount++;

        const [entry] = entries;
        setEntry(entry);

        if (entry.isIntersecting) {
          setIsInView(true);
          if (!hasBeenInView) {
            setHasBeenInView(true);
          }

          // Disconnect observer if triggerOnce is enabled
          if (triggerOnce) {
            observerRef.current?.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      observerOptions
    );

    observerRef.current.observe(element);

    // Performance logging (development only)
    if (process.env.NODE_ENV === 'development' && performanceMode) {
      const performanceInterval = setInterval(() => {
        if (performanceRef.current.frameDrops > 0) {
          console.warn(`useOptimizedInView: ${performanceRef.current.frameDrops} frame drops detected. Consider reducing animation complexity.`);
        }
        performanceRef.current.callbackCount = 0;
        performanceRef.current.frameDrops = 0;
      }, 1000);

      return () => clearInterval(performanceInterval);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce, hasBeenInView, performanceMode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return { ref, isInView, hasBeenInView, entry };
}

/**
 * Optimized motion div component with automatic performance adjustments
 */
export function OptimizedMotionDiv({
  children,
  className,
  style,
  ...motionProps
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  const { ref, isInView } = useOptimizedInView({
    threshold: 0.1,
    triggerOnce: true,
    performanceMode: true
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      style={{
        willChange: isInView ? 'transform, opacity' : 'auto',
        transform: 'translateZ(0)', // Force GPU layer
        ...style
      }}
      {...motionProps}
    >
      {children}
    </div>
  );
}

/**
 * Batch intersection observer for multiple elements
 * Reduces the number of individual observers for better performance
 */
export function useBatchOptimizedInView(
  elements: React.RefObject<HTMLElement>[],
  options: UseOptimizedInViewOptions = {}
): boolean[] {
  const [inViewStates, setInViewStates] = useState<boolean[]>(
    new Array(elements.length).fill(options.fallbackInView || false)
  );

  useEffect(() => {
    const validElements = elements
      .map((ref, index) => ({ element: ref.current, index }))
      .filter(({ element }) => element !== null);

    if (validElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setInViewStates(prev => {
          const newStates = [...prev];
          entries.forEach(entry => {
            const elementIndex = validElements.find(
              ({ element }) => element === entry.target
            )?.index;

            if (elementIndex !== undefined) {
              newStates[elementIndex] = entry.isIntersecting;
            }
          });
          return newStates;
        });
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '-10% 0px -10% 0px',
        root: options.root || null
      }
    );

    validElements.forEach(({ element }) => {
      observer.observe(element!);
    });

    return () => observer.disconnect();
  }, [elements, options]);

  return inViewStates;
}

/**
 * Performance-aware animation hook that automatically reduces complexity
 */
export function usePerformanceAwareAnimation() {
  const [performanceMode, setPerformanceMode] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const checkPerformance = () => {
      const currentTime = performance.now();
      frameCountRef.current++;

      // Check performance every 60 frames (approximately 1 second at 60fps)
      if (frameCountRef.current >= 60) {
        const actualFPS = (frameCountRef.current / (currentTime - lastTimeRef.current)) * 1000;

        // Enable performance mode if FPS drops below 50
        if (actualFPS < 50 && !performanceMode) {
          setPerformanceMode(true);
          console.warn('Animation performance degraded. Enabling performance mode.');
        } else if (actualFPS >= 55 && performanceMode) {
          setPerformanceMode(false);
        }

        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      requestAnimationFrame(checkPerformance);
    };

    const animationId = requestAnimationFrame(checkPerformance);

    return () => cancelAnimationFrame(animationId);
  }, [performanceMode]);

  return {
    performanceMode,
    // Reduced animation variants for performance mode
    spring: performanceMode
      ? { type: "tween" as const, duration: 0.2 }
      : { type: "spring" as const, stiffness: 300, damping: 30 },
    duration: performanceMode ? 0.15 : 0.3,
    staggerDelay: performanceMode ? 0.02 : 0.05
  };
}

/**
 * Memory-efficient animation manager
 * Tracks active animations and prevents memory leaks
 */
export class AnimationPerformanceManager {
  private static instance: AnimationPerformanceManager;
  private activeAnimations = new Set<string>();
  private performanceThreshold = 16.67; // 60fps threshold
  private lastFrameTime = 0;
  private frameDrops = 0;
  private memoryPressure = false;

  static getInstance(): AnimationPerformanceManager {
    if (!AnimationPerformanceManager.instance) {
      AnimationPerformanceManager.instance = new AnimationPerformanceManager();
    }
    return AnimationPerformanceManager.instance;
  }

  startAnimation(id: string): void {
    this.activeAnimations.add(id);
    this.checkMemoryPressure();
  }

  endAnimation(id: string): void {
    this.activeAnimations.delete(id);
  }

  private checkMemoryPressure(): void {
    // Check memory usage if available
    if ('memory' in performance) {
      const memory = (performance as Performance & { memory?: { usedJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      if (memory) {
        const pressureThreshold = memory.jsHeapSizeLimit * 0.8;

        if (memory.usedJSHeapSize > pressureThreshold && !this.memoryPressure) {
          this.memoryPressure = true;
          this.enablePerformanceMode();
        } else if (memory.usedJSHeapSize < pressureThreshold * 0.6 && this.memoryPressure) {
          this.memoryPressure = false;
          this.disablePerformanceMode();
        }
      }
    }
  }

  private enablePerformanceMode(): void {
    document.documentElement.style.setProperty('--animation-duration', '0.15s');
    document.documentElement.style.setProperty('--animation-easing', 'ease-out');
    document.documentElement.style.setProperty('--animation-stagger', '0.02s');

    // Reduce animation complexity
    document.documentElement.classList.add('performance-mode');
    console.warn('Memory pressure detected. Enabling performance mode.');
  }

  private disablePerformanceMode(): void {
    document.documentElement.style.removeProperty('--animation-duration');
    document.documentElement.style.removeProperty('--animation-easing');
    document.documentElement.style.removeProperty('--animation-stagger');

    document.documentElement.classList.remove('performance-mode');
    console.info('Performance mode disabled.');
  }

  monitorFrameRate(): void {
    const currentTime = performance.now();

    if (this.lastFrameTime > 0) {
      const frameTime = currentTime - this.lastFrameTime;

      if (frameTime > this.performanceThreshold * 1.5) {
        this.frameDrops++;

        // Enable performance mode if too many frame drops
        if (this.frameDrops > 5 && !document.documentElement.classList.contains('performance-mode')) {
          this.enablePerformanceMode();
        }
      }
    }

    this.lastFrameTime = currentTime;
  }

  getStats(): {
    activeAnimations: number;
    memoryPressure: boolean;
    frameDrops: number;
  } {
    return {
      activeAnimations: this.activeAnimations.size,
      memoryPressure: this.memoryPressure,
      frameDrops: this.frameDrops
    };
  }
}

// Global animation manager instance
export const animationManager = AnimationPerformanceManager.getInstance();

// Enhanced performance-aware animation hook (duplicate removed)
// Duplicate function commented out to fix redeclaration error
/*
export function usePerformanceAwareAnimation() {
  const [performanceMode, setPerformanceMode] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    const checkPerformance = () => {
      const currentTime = performance.now();
      frameCountRef.current++;

      // Check performance every 60 frames (approximately 1 second at 60fps)
      if (frameCountRef.current >= 60) {
        const actualFPS = (frameCountRef.current / (currentTime - lastTimeRef.current)) * 1000;

        // Enable performance mode if FPS drops below 50
        if (actualFPS < 50 && !performanceMode) {
          setPerformanceMode(true);
          animationManager.enablePerformanceMode();
        } else if (actualFPS >= 55 && performanceMode) {
          setPerformanceMode(false);
          animationManager.disablePerformanceMode();
        }

        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }

      requestAnimationFrame(checkPerformance);
    };

    const animationId = requestAnimationFrame(checkPerformance);

    return () => cancelAnimationFrame(animationId);
  }, [performanceMode]);

  return {
    performanceMode,
    // Reduced animation variants for performance mode
    spring: performanceMode
      ? { type: "tween" as const, duration: 0.2 }
      : { type: "spring" as const, stiffness: 300, damping: 30 },
    duration: performanceMode ? 0.15 : 0.3,
    staggerDelay: performanceMode ? 0.02 : 0.05,
    // Performance metrics
    getMetrics: () => animationManager.getStats()
  };
}
*/
