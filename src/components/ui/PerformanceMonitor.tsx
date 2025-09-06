'use client';
import { useEffect, useState } from 'react';

interface CoreWebVitals {
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<CoreWebVitals>({
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
  });

  useEffect(() => {
    // Web Vitals tracking
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      import('web-vitals').then((webVitals: any) => {
        // Cumulative Layout Shift
        webVitals.getCLS((metric: { value: number }) => {
          console.log('CLS:', metric.value);
          setMetrics((prev) => ({ ...prev, cls: metric.value }));

          if (metric.value > 0.25) {
            console.warn('Poor CLS detected:', metric.value);
          }
        });

        // First Input Delay
        webVitals.getFID((metric: { value: number }) => {
          console.log('FID:', metric.value);
          setMetrics((prev) => ({ ...prev, fid: metric.value }));

          if (metric.value > 100) {
            console.warn('Poor FID detected:', metric.value);
          }
        });

        // First Contentful Paint
        webVitals.getFCP((metric: { value: number }) => {
          console.log('FCP:', metric.value);
          setMetrics((prev) => ({ ...prev, fcp: metric.value }));
        });

        // Largest Contentful Paint
        webVitals.getLCP((metric: { value: number }) => {
          console.log('LCP:', metric.value);
          setMetrics((prev) => ({ ...prev, lcp: metric.value }));

          if (metric.value > 2500) {
            console.warn('Poor LCP detected:', metric.value);
          }
        });

        // Time to First Byte
        webVitals.getTTFB((metric: { value: number }) => {
          console.log('TTFB:', metric.value);
          setMetrics((prev) => ({ ...prev, ttfb: metric.value }));
        });
      });
    }

    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered:', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  // Development-only metrics display
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-xs">
        <div className="font-bold mb-2">Core Web Vitals</div>
        <div>CLS: {metrics.cls ? `${(metrics.cls * 100).toFixed(2)}%` : '...'}</div>
        <div>FID: {metrics.fid ? `${Math.round(metrics.fid)}ms` : '...'}</div>
        <div>FCP: {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '...'}</div>
        <div>LCP: {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '...'}</div>
        <div>TTFB: {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '...'}</div>
      </div>
    );
  }

  return null;
}
