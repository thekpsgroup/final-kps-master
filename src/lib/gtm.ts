declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export const GTM_ID = 'GTM-KBN6BJSD';

export const gtmEvent = (eventName: string, parameters: Record<string, unknown> = {}) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...parameters,
    });
  }
};

// Specific tracking functions
export const trackConsultationClick = (source: string) => {
  gtmEvent('consultation_click', {
    event_category: 'engagement',
    event_label: source,
    value: 1
  });
};

export const trackBrandPageView = (brandName: string) => {
  gtmEvent('brand_page_view', {
    event_category: 'page_view',
    brand_name: brandName,
    page_title: document.title
  });
};

export const trackFormSubmit = (formType: string) => {
  gtmEvent('form_submit', {
    event_category: 'conversion',
    form_type: formType,
    value: 10
  });
};

export const trackEmailClick = () => {
  gtmEvent('email_click', {
    event_category: 'engagement',
    event_label: 'sales@thekpsgroup.com'
  });
};

export const trackPhoneClick = () => {
  gtmEvent('phone_click', {
    event_category: 'engagement',
    event_label: '469-458-6966'
  });
};
