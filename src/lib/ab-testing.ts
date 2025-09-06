"use client";

// Import Google Analytics utilities
import { analytics } from '@/components/GoogleAnalytics';

interface ABTestVariant {
  id: string;
  name: string;
  weight: number;
  config: Record<string, unknown>;
}

interface ABTest {
  id: string;
  name: string;
  variants: ABTestVariant[];
  active: boolean;
  startDate: Date;
  endDate?: Date;
}

class ABTestingManager {
  private tests: Map<string, ABTest> = new Map();
  private userVariants: Map<string, string> = new Map();

  constructor() {
    this.loadFromStorage();
    this.initializeTests();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem('ab_test_variants');
      if (stored) {
        const variants = JSON.parse(stored);
        this.userVariants = new Map(Object.entries(variants));
      }
    } catch {
      console.warn('Failed to load A/B test variants from storage');
    }
  }

  private saveToStorage() {
    try {
      const variants = Object.fromEntries(this.userVariants);
      localStorage.setItem('ab_test_variants', JSON.stringify(variants));
    } catch {
      console.warn('Failed to save A/B test variants to storage');
    }
  }

  private initializeTests() {
    // Define your A/B tests
    this.addTest({
      id: 'form_design_test',
      name: 'Form Design Variants',
      active: true,
      startDate: new Date('2024-01-01'),
      variants: [
        {
          id: 'control',
          name: 'Original Design',
          weight: 50,
          config: {
            variant: 'default',
            buttonText: 'Submit',
            showIcons: false,
            colorScheme: 'default'
          }
        },
        {
          id: 'modern',
          name: 'Modern Design',
          weight: 50,
          config: {
            variant: 'glass',
            buttonText: 'Get Started Today',
            showIcons: true,
            colorScheme: 'vibrant',
            animations: true
          }
        }
      ]
    });

    this.addTest({
      id: 'button_text_test',
      name: 'CTA Button Text',
      active: true,
      startDate: new Date('2024-01-01'),
      variants: [
        { id: 'submit', name: 'Submit', weight: 25, config: { buttonText: 'Submit' } },
        { id: 'get_started', name: 'Get Started', weight: 25, config: { buttonText: 'Get Started' } },
        { id: 'contact_us', name: 'Contact Us', weight: 25, config: { buttonText: 'Contact Us Today' } },
        { id: 'learn_more', name: 'Learn More', weight: 25, config: { buttonText: 'Learn More →' } }
      ]
    });
  }

  addTest(test: ABTest) {
    this.tests.set(test.id, test);
  }

  getVariant(testId: string): ABTestVariant | null {
    const test = this.tests.get(testId);
    if (!test || !test.active) return null;

    // Check if user already has a variant assigned
    if (this.userVariants.has(testId)) {
      const variantId = this.userVariants.get(testId)!;
      return test.variants.find(v => v.id === variantId) || null;
    }

    // Assign new variant based on weights
    const variant = this.selectVariantByWeight(test.variants);
    if (variant) {
      this.userVariants.set(testId, variant.id);
      this.saveToStorage();

      // Track variant assignment
      this.trackVariantAssignment(testId, variant.id);
    }

    return variant;
  }

  private selectVariantByWeight(variants: ABTestVariant[]): ABTestVariant | null {
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    for (const variant of variants) {
      currentWeight += variant.weight;
      if (random <= currentWeight) {
        return variant;
      }
    }

    return variants[0] || null;
  }

  private trackVariantAssignment(testId: string, variantId: string) {
    // Send to analytics
    analytics.trackEvent('ab_test_assignment', {
        test_id: testId,
        variant_id: variantId
      });

    // Send to custom analytics
    fetch('/api/analytics/ab-test-assignment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId,
        variantId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent
      })
    }).catch(error => console.warn('Failed to send A/B test data:', error));
  }

  trackConversion(testId: string, conversionType: string, value?: number) {
    const variantId = this.userVariants.get(testId);
    if (!variantId) return;

    // Track conversion
    analytics.trackEvent('ab_test_conversion', {
        test_id: testId,
        variant_id: variantId,
        conversion_type: conversionType,
        value: value
      });

    fetch('/api/analytics/ab-test-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        testId,
        variantId,
        conversionType,
        value,
        timestamp: Date.now()
      })
    }).catch(console.warn);
  }
}

export const abTesting = new ABTestingManager();

// Export getVariant function for backward compatibility
export function getVariant(testId: string): ABTestVariant | null {
  return abTesting.getVariant(testId);
}

// React hook for A/B testing
export function useABTest(testId: string) {
  const variant = abTesting.getVariant(testId);

  const trackConversion = (conversionType: string, value?: number) => {
    abTesting.trackConversion(testId, conversionType, value);
  };

  return {
    variant: variant?.config || {},
    variantId: variant?.id || 'control',
    trackConversion
  };
}