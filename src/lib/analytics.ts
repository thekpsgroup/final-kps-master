"use client";

// Import Google Analytics utilities
import { analytics } from '@/components/GoogleAnalytics';

// gtag is declared in ab-testing.ts
import type { GtagFunction } from '@/types/gtag';

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

interface FormAnalyticsEvent {
  eventType: 'form_start' | 'field_focus' | 'field_blur' | 'field_error' | 'form_submit' | 'form_success' | 'form_abandon';
  formId: string;
  fieldName?: string;
  value?: string;
  error?: string;
  timestamp: number;
  sessionId: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

class FormAnalytics {
  private events: FormAnalyticsEvent[] = [];
  private sessionId: string;
  private startTime: number = Date.now();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent({
          eventType: 'form_abandon',
          formId: 'current_form',
          timestamp: Date.now(),
          metadata: { reason: 'page_hidden', duration: Date.now() - this.startTime }
        });
      }
    });

    // Track before unload
    window.addEventListener('beforeunload', () => {
      if (this.events.length > 0) {
        // Send remaining events before page unloads
        navigator.sendBeacon('/api/analytics/form-events/batch',
          JSON.stringify({
            sessionId: this.sessionId,
            events: this.events
          })
        );
      }
    });
  }

  trackEvent(event: Omit<FormAnalyticsEvent, 'sessionId'>) {
    const fullEvent: FormAnalyticsEvent = {
      ...event,
      sessionId: this.sessionId,
      timestamp: event.timestamp || Date.now()
    };

    this.events.push(fullEvent);

    // Send to analytics service
    this.sendToAnalytics(fullEvent);

    // Auto-flush every 10 events
    if (this.events.length >= 10) {
      // Send batch to analytics
      fetch('/api/analytics/form-events/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: this.sessionId,
          events: this.events
        })
      }).catch(console.warn);
      this.events = [];
    }
  }

  private async sendToAnalytics(event: FormAnalyticsEvent) {
    try {
      // Send to Google Analytics
      analytics.trackEvent(`form_${event.eventType}`, {
          custom_parameter_form_id: event.formId,
          custom_parameter_field_name: event.fieldName,
          custom_parameter_session_id: event.sessionId
        });

      // Send to custom analytics endpoint
      await fetch('/api/analytics/form-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(error => console.warn('Custom analytics failed:', error));
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }


  // Public methods for form tracking
  trackFormStart(formId: string, metadata?: Record<string, unknown>) {
    this.trackEvent({
      eventType: 'form_start',
      formId,
      timestamp: Date.now(),
      metadata,
    });
  }

  trackFieldFocus(formId: string, fieldName: string) {
    this.trackEvent({
      eventType: 'field_focus',
      formId,
      fieldName,
      timestamp: Date.now()
    });
  }

  trackFieldError(formId: string, fieldName: string, error: string) {
    this.trackEvent({
      eventType: 'field_error',
      formId,
      fieldName,
      error,
      timestamp: Date.now()
    });
  }

  trackFormSubmit(formId: string, formData: Record<string, unknown>) {
    this.trackEvent({
      eventType: 'form_submit',
      formId,
      timestamp: Date.now(),
      metadata: { fieldCount: Object.keys(formData).length },
    });
  }

  trackFormSuccess(formId: string, conversionValue?: number) {
    this.trackEvent({
      eventType: 'form_success',
      formId,
      timestamp: Date.now(),
      metadata: { conversionValue, duration: Date.now() - this.startTime }
    });
  }
}

export const formAnalytics = new FormAnalytics();

// React hook for form analytics
export function useFormAnalytics(formId: string) {
  const trackStart = (metadata?: Record<string, unknown>) => {
    formAnalytics.trackFormStart(formId, metadata);
  };

  const trackFieldFocus = (fieldName: string) => {
    formAnalytics.trackFieldFocus(formId, fieldName);
  };

  const trackFieldError = (fieldName: string, error: string) => {
    formAnalytics.trackFieldError(formId, fieldName, error);
  };

  const trackSubmit = (formData: Record<string, unknown>) => {
    formAnalytics.trackFormSubmit(formId, formData);
  };

  const trackSuccess = (conversionValue?: number) => {
    formAnalytics.trackFormSuccess(formId, conversionValue);
  };

  return {
    trackStart,
    trackFieldFocus,
    trackFieldError,
    trackSubmit,
    trackSuccess
  };
}
