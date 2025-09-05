'use client';
import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals tracking
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric: any) => {
          console.log('CLS:', metric.value);
        });
        getFID((metric: any) => {
          console.log('FID:', metric.value);
        });
        getFCP((metric: any) => {
          console.log('FCP:', metric.value);
        });
        getLCP((metric: any) => {
          console.log('LCP:', metric.value);
        });
        getTTFB((metric: any) => {
          console.log('TTFB:', metric.value);
        });
      });
    }
  }, []);

  return null;
}
