'use client';
import dynamic from 'next/dynamic';

// Lazy load heavy components
export const LazyBeforeAfterStrip = dynamic(() => import('./sections/BeforeAfterStrip'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-50 animate-pulse rounded-2xl flex items-center justify-center">
      <div className="text-gray-600">Loading charts...</div>
    </div>
  ),
});

export const LazyPainDreamBridge = dynamic(() => import('./sections/PainDreamBridge'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-2xl"></div>,
});

export const LazyExitIntentPopup = dynamic(() => import('./popups/ExitIntentPopup'), {
  ssr: false,
});
