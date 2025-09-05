"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// gtag is declared in ab-testing.ts

// Google Analytics Tracking ID
const GA_TRACKING_ID = 'G-SFELJ2R95K';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    });

    // Make gtag globally available
    (window as any).gtag = gtag;
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_TRACKING_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Enhanced analytics tracking functions
export const analytics = {
  trackEvent: (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, parameters);
    }
  },

  trackConversion: (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        conversion_type: conversionType,
        value: value,
        currency: 'USD'
      });
    }
  },

  trackLeadForm: (formData: {
    formId: string;
    formType: string;
    fields: string[];
    completionRate?: number;
  }) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'lead_form_interaction', {
        form_id: formData.formId,
        form_type: formData.formType,
        field_count: formData.fields.length,
        completion_rate: formData.completionRate || 0,
        timestamp: new Date().toISOString()
      });
    }
  },

  trackLocationPage: (city: string, service: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'location_page_view', {
        location_city: city,
        service_type: service,
        page_type: 'location_landing'
      });
    }
  },

  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', GA_TRACKING_ID, {
        custom_map: {
          'dimension1': 'user_segment',
          'dimension2': 'conversion_probability',
          'dimension3': 'page_type',
          'dimension4': 'location_city'
        },
        ...properties
      });
    }
  }
};
