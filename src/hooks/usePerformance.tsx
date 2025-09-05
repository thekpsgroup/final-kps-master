"use client";
import { useEffect, useRef } from "react";

export function usePerformance() {
  const metricsRef = useRef<{
    renderCount: number;
    lastRenderTime: number;
    averageRenderTime: number;
  }>({
    renderCount: 0,
    lastRenderTime: 0,
    averageRenderTime: 0
  });

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      metricsRef.current.renderCount++;
      metricsRef.current.lastRenderTime = renderTime;
      metricsRef.current.averageRenderTime =
        (metricsRef.current.averageRenderTime * (metricsRef.current.renderCount - 1) + renderTime) /
        metricsRef.current.renderCount;
    };
  });

  const preloadAnimation = () => {
    const testElement = document.createElement('div');
    testElement.style.transform = 'translateY(12px) scale(0.98)';
    testElement.style.opacity = '0';
    testElement.style.position = 'absolute';
    testElement.style.visibility = 'hidden';
    document.body.appendChild(testElement);

    requestAnimationFrame(() => {
      testElement.style.transform = 'translateY(0px) scale(1)';
      testElement.style.opacity = '1';

      requestAnimationFrame(() => {
        document.body.removeChild(testElement);
      });
    });
  };

  const optimizeForTouch = () => {
    document.body.style.touchAction = 'manipulation';
    document.body.style.userSelect = 'none';
  };

  return {
    metrics: metricsRef.current,
    preloadAnimation,
    optimizeForTouch
  };
}
