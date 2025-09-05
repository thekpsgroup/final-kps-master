'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// gtag is declared in ab-testing.ts

// Google Analytics Tracking ID
const GA_TRACKING_ID = 'G-SFELJ2R95K';

// Declare gtag function type
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

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
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    gtag('js', new Date());
    gtag('config', GA_TRACKING_ID, {
      page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
    });

    // Make gtag globally available
    window.gtag = gtag;
  }, []);

  // Track page views
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Enhanced analytics tracking functions
export const analytics = {
  trackEvent: (eventName: string, parameters: Record<string, unknown> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  },

  trackConversion: (conversionType: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        conversion_type: conversionType,
        value: value,
        currency: 'USD',
      });
    }
  },

  trackLeadForm: (formData: {
    formId: string;
    formType: string;
    fields: string[];
    completionRate?: number;
  }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'lead_form_interaction', {
        form_id: formData.formId,
        form_type: formData.formType,
        field_count: formData.fields.length,
        completion_rate: formData.completionRate || 0,
        timestamp: new Date().toISOString(),
      });
    }
  },

  trackLocationPage: (city: string, service: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'location_page_view', {
        location_city: city,
        service_type: service,
        page_type: 'location_landing',
      });
    }
  },

  trackUTMParameters: () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const utmData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
      };

      // Track UTM parameters if present
      if (Object.values(utmData).some((value) => value !== null)) {
        if (window.gtag) {
          window.gtag('event', 'utm_parameters_detected', utmData);
        }
      }

      return utmData;
    }
    return {};
  },

  setUserProperties: (properties: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        custom_map: {
          dimension1: 'user_segment',
          dimension2: 'conversion_probability',
          dimension3: 'page_type',
          dimension4: 'location_city',
        },
        ...properties,
      });
    }
  },
};
