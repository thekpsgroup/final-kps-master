"use client";
import { useEffect } from "react";

// Preload form animations to prevent jank
export function useFormPreload() {
  useEffect(() => {
    // Preload critical animation resources
    const preloadAnimations = () => {
      // Force browser to prepare for transforms
      const testElement = document.createElement('div');
      testElement.style.transform = 'translateY(12px) scale(0.98)';
      testElement.style.opacity = '0';
      document.body.appendChild(testElement);

      // Trigger a reflow to prepare GPU layers
      requestAnimationFrame(() => {
        testElement.style.transform = 'translateY(0px) scale(1)';
        testElement.style.opacity = '1';

        requestAnimationFrame(() => {
          document.body.removeChild(testElement);
        });
      });
    };

    // Preload on interaction or after 2 seconds
    const preloadTimer = setTimeout(preloadAnimations, 2000);

    const handleInteraction = () => {
      clearTimeout(preloadTimer);
      preloadAnimations();
      document.removeEventListener('mouseenter', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('mouseenter', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      clearTimeout(preloadTimer);
      document.removeEventListener('mouseenter', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);
}
