// Google Analytics Configuration
export const ANALYTICS_CONFIG = {
  // Google Analytics 4 Measurement ID
  GA_TRACKING_ID: 'G-SFELJ2R95K',

  // Google Tag Manager ID
  GTM_ID: 'GTM-KBN6BJSD',

  // Enable/disable analytics features
  ENABLED: true,

  // Debug mode (logs events to console)
  DEBUG: process.env.NODE_ENV === 'development',

  // Custom dimensions mapping
  CUSTOM_DIMENSIONS: {
    user_segment: 'dimension1',
    conversion_probability: 'dimension2',
    page_type: 'dimension3',
    location_city: 'dimension4',
  },

  // Event categories
  EVENT_CATEGORIES: {
    LEAD_GENERATION: 'lead_generation',
    USER_ENGAGEMENT: 'user_engagement',
    CONVERSION: 'conversion',
    A_B_TESTING: 'ab_testing',
    LOCATION_PAGES: 'location_pages',
  },

  // Conversion events
  CONVERSION_EVENTS: [
    'lead_form_submit',
    'contact_form_submit',
    'consultation_booked',
    'free_trial_signup',
    'newsletter_signup',
  ],
} as const;

// Environment variable fallbacks
export const getAnalyticsConfig = () => ({
  ...ANALYTICS_CONFIG,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID || ANALYTICS_CONFIG.GA_TRACKING_ID,
  GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || ANALYTICS_CONFIG.GTM_ID,
  ENABLED: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false',
  DEBUG: process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true' || ANALYTICS_CONFIG.DEBUG,
});
