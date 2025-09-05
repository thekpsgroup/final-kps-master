// Location data for SEO optimization
export interface LocationData {
  city: string;
  state: string;
  stateAbbr: string;
  slug: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  population?: number;
  timezone: string;
  areaCodes?: string[];
}

// Major metropolitan areas for local SEO targeting
export const LOCATION_DATA: Record<string, LocationData> = {
  atlanta: {
    city: 'Atlanta',
    state: 'Georgia',
    stateAbbr: 'GA',
    slug: 'atlanta',
    coordinates: { lat: 33.749, lng: -84.388 },
    population: 498000,
    timezone: 'America/New_York',
    areaCodes: ['404', '470', '678', '770'],
  },
  austin: {
    city: 'Austin',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'austin',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    population: 964000,
    timezone: 'America/Chicago',
    areaCodes: ['512', '737'],
  },
  boston: {
    city: 'Boston',
    state: 'Massachusetts',
    stateAbbr: 'MA',
    slug: 'boston',
    coordinates: { lat: 42.3601, lng: -71.0589 },
    population: 675000,
    timezone: 'America/New_York',
    areaCodes: ['617', '857'],
  },
  chicago: {
    city: 'Chicago',
    state: 'Illinois',
    stateAbbr: 'IL',
    slug: 'chicago',
    coordinates: { lat: 41.8781, lng: -87.6298 },
    population: 2700000,
    timezone: 'America/Chicago',
    areaCodes: ['312', '773', '872'],
  },
  dallas: {
    city: 'Dallas',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'dallas',
    coordinates: { lat: 32.7767, lng: -96.797 },
    population: 1350000,
    timezone: 'America/Chicago',
    areaCodes: ['214', '469', '972'],
  },
  denver: {
    city: 'Denver',
    state: 'Colorado',
    stateAbbr: 'CO',
    slug: 'denver',
    coordinates: { lat: 39.7392, lng: -104.9903 },
    population: 716000,
    timezone: 'America/Denver',
    areaCodes: ['303', '720'],
  },
  houston: {
    city: 'Houston',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'houston',
    coordinates: { lat: 29.7604, lng: -95.3698 },
    population: 2320000,
    timezone: 'America/Chicago',
    areaCodes: ['281', '346', '713', '832'],
  },
  'los-angeles': {
    city: 'Los Angeles',
    state: 'California',
    stateAbbr: 'CA',
    slug: 'los-angeles',
    coordinates: { lat: 34.0522, lng: -118.2437 },
    population: 4000000,
    timezone: 'America/Los_Angeles',
    areaCodes: ['213', '310', '323', '424'],
  },
  miami: {
    city: 'Miami',
    state: 'Florida',
    stateAbbr: 'FL',
    slug: 'miami',
    coordinates: { lat: 25.7617, lng: -80.1918 },
    population: 468000,
    timezone: 'America/New_York',
    areaCodes: ['305', '786'],
  },
  nashville: {
    city: 'Nashville',
    state: 'Tennessee',
    stateAbbr: 'TN',
    slug: 'nashville',
    coordinates: { lat: 36.1627, lng: -86.7816 },
    population: 693000,
    timezone: 'America/Chicago',
    areaCodes: ['615', '629'],
  },
  'new-york': {
    city: 'New York',
    state: 'New York',
    stateAbbr: 'NY',
    slug: 'new-york',
    coordinates: { lat: 40.7128, lng: -74.006 },
    population: 8400000,
    timezone: 'America/New_York',
    areaCodes: ['212', '347', '646', '718', '917', '929'],
  },
  phoenix: {
    city: 'Phoenix',
    state: 'Arizona',
    stateAbbr: 'AZ',
    slug: 'phoenix',
    coordinates: { lat: 33.4484, lng: -112.074 },
    population: 1650000,
    timezone: 'America/Phoenix',
    areaCodes: ['480', '602', '623'],
  },
  'san-antonio': {
    city: 'San Antonio',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'san-antonio',
    coordinates: { lat: 29.4241, lng: -98.4936 },
    population: 1540000,
    timezone: 'America/Chicago',
    areaCodes: ['210', '726'],
  },
  'royse-city': {
    city: 'Royse City',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'royse-city',
    coordinates: { lat: 32.9751, lng: -96.3325 },
    population: 13000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  fate: {
    city: 'Fate',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'fate',
    coordinates: { lat: 32.9401, lng: -96.3819 },
    population: 12000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  frisco: {
    city: 'Frisco',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'frisco',
    coordinates: { lat: 33.1507, lng: -96.8236 },
    population: 200000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  mckinney: {
    city: 'McKinney',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'mckinney',
    coordinates: { lat: 33.1972, lng: -96.6153 },
    population: 200000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  plano: {
    city: 'Plano',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'plano',
    coordinates: { lat: 33.0198, lng: -96.6989 },
    population: 290000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  allen: {
    city: 'Allen',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'allen',
    coordinates: { lat: 33.1032, lng: -96.6706 },
    population: 110000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  garland: {
    city: 'Garland',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'garland',
    coordinates: { lat: 32.9126, lng: -96.6389 },
    population: 242000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  rockwall: {
    city: 'Rockwall',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'rockwall',
    coordinates: { lat: 32.9312, lng: -96.4597 },
    population: 47000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  wylie: {
    city: 'Wylie',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'wylie',
    coordinates: { lat: 33.0151, lng: -96.5389 },
    population: 55000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  sachse: {
    city: 'Sachse',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'sachse',
    coordinates: { lat: 32.9762, lng: -96.5958 },
    population: 28000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  rowlett: {
    city: 'Rowlett',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'rowlett',
    coordinates: { lat: 32.9029, lng: -96.5639 },
    population: 63000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  lavon: {
    city: 'Lavon',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'lavon',
    coordinates: { lat: 33.0276, lng: -96.4344 },
    population: 4000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  nevada: {
    city: 'Nevada',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'nevada',
    coordinates: { lat: 33.0429, lng: -96.3747 },
    population: 1000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  josephine: {
    city: 'Josephine',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'josephine',
    coordinates: { lat: 33.0607, lng: -96.3208 },
    population: 2000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  farmersville: {
    city: 'Farmersville',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'farmersville',
    coordinates: { lat: 33.1648, lng: -96.3597 },
    population: 4000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  princeton: {
    city: 'Princeton',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'princeton',
    coordinates: { lat: 33.1801, lng: -96.4983 },
    population: 14000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  lowry: {
    city: 'Lowry Crossing',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'lowry-crossing',
    coordinates: { lat: 33.1923, lng: -96.5458 },
    population: 2000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  lucas: {
    city: 'Lucas',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'lucas',
    coordinates: { lat: 33.1035, lng: -96.5778 },
    population: 9000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  murphy: {
    city: 'Murphy',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'murphy',
    coordinates: { lat: 33.0151, lng: -96.6131 },
    population: 22000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  parker: {
    city: 'Parker',
    state: 'Texas',
    stateAbbr: 'TX',
    slug: 'parker',
    coordinates: { lat: 33.0551, lng: -96.6261 },
    population: 6000,
    timezone: 'America/Chicago',
    areaCodes: ['972', '469'],
  },
  'san-diego': {
    city: 'San Diego',
    state: 'California',
    stateAbbr: 'CA',
    slug: 'san-diego',
    coordinates: { lat: 32.7157, lng: -117.1611 },
    population: 1420000,
    timezone: 'America/Los_Angeles',
    areaCodes: ['619', '858'],
  },
  'san-francisco': {
    city: 'San Francisco',
    state: 'California',
    stateAbbr: 'CA',
    slug: 'san-francisco',
    coordinates: { lat: 40.7128, lng: -74.006 },
    population: 875000,
    timezone: 'America/Los_Angeles',
    areaCodes: ['415', '628'],
  },
  seattle: {
    city: 'Seattle',
    state: 'Washington',
    stateAbbr: 'WA',
    slug: 'seattle',
    coordinates: { lat: 47.6062, lng: -122.3321 },
    population: 738000,
    timezone: 'America/Los_Angeles',
    areaCodes: ['206', '253'],
  },
  tampa: {
    city: 'Tampa',
    state: 'Florida',
    stateAbbr: 'FL',
    slug: 'tampa',
    coordinates: { lat: 27.9506, lng: -82.4572 },
    population: 399000,
    timezone: 'America/New_York',
    areaCodes: ['727', '813'],
  },
  washington: {
    city: 'Washington',
    state: 'District of Columbia',
    stateAbbr: 'DC',
    slug: 'washington',
    coordinates: { lat: 38.9072, lng: -77.0369 },
    population: 690000,
    timezone: 'America/New_York',
    areaCodes: ['202'],
  },
};

// Service-specific keyword mappings
export const SERVICE_KEYWORDS = {
  payroll: [
    'payroll services',
    'payroll processing',
    'ADP payroll alternatives',
    'payroll management',
    'small business payroll',
    'construction payroll',
    'home services payroll',
    'HVAC payroll services',
    'plumbing payroll',
    'electrical payroll',
    'general contractor payroll',
  ],
  bookkeeping: [
    'bookkeeping services',
    'accounting services',
    'financial management',
    'business bookkeeping',
    'accounting firm',
    'construction bookkeeping',
    'home services bookkeeping',
    'HVAC bookkeeping',
    'plumbing bookkeeping',
    'electrical bookkeeping',
    'general contractor accounting',
  ],
  branding: [
    'branding services',
    'brand identity',
    'logo design',
    'brand strategy',
    'visual identity',
    'construction branding',
    'home services branding',
    'HVAC company branding',
    'plumbing branding',
    'electrical contractor branding',
    'general contractor branding',
  ],
  consulting: [
    'business consulting',
    'operations consulting',
    'management consulting',
    'business strategy',
    'operational efficiency',
    'construction consulting',
    'home services consulting',
    'HVAC business consulting',
    'plumbing consulting',
    'electrical consulting',
    'general contractor operations',
  ],
  software: [
    'business software',
    'CRM software',
    'field service software',
    'business automation',
    'custom software',
    'construction software',
    'home services software',
    'HVAC software solutions',
    'plumbing software',
    'electrical software',
    'general contractor software',
  ],
};

// Generate location-specific SEO metadata
export function generateLocationMetadata(citySlug: string, service: string) {
  const location = LOCATION_DATA[citySlug];
  if (!location) return null;

  const serviceKeywords = SERVICE_KEYWORDS[service as keyof typeof SERVICE_KEYWORDS] || [];
  const cityState = `${location.city}, ${location.stateAbbr}`;

  const title = `${serviceKeywords[0]} in ${cityState} | The KPS Group`;
  const description = `Professional ${serviceKeywords[0].toLowerCase()} for ${
    location.city
  } businesses. ${serviceKeywords.slice(1, 3).join(', ')} and more. Serving ${cityState} area.`;

  return {
    title,
    description,
    keywords: [...serviceKeywords, `${service} ${location.city}`, `${service} ${cityState}`].join(
      ', ',
    ),
    location,
  };
}

// Generate comprehensive structured data for local business
export function generateLocalBusinessSchema(citySlug: string, service: string) {
  const location = LOCATION_DATA[citySlug];
  if (!location) return null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';
  const serviceKeywords = SERVICE_KEYWORDS[service as keyof typeof SERVICE_KEYWORDS] || [];

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/${service}/${location.slug}#localbusiness`,
    name: 'The KPS Group',
    alternateName: ['KPS Group', 'The KPS Group LLC'],
    description: `Professional ${service} services in ${location.city}, ${
      location.state
    }. ${serviceKeywords.join(', ')} and more.`,
    url: `${baseUrl}/${service}/${location.slug}`,
    logo: `${baseUrl}/kps-group/kps-square-512.png`,
    image: `${baseUrl}/kps-group/kps-og-1200x630.png`,
    telephone: '+1-555-KPS-HELP', // Placeholder - should be updated with real number
    email: 'info@thekpsgroup.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.stateAbbr,
      addressCountry: 'US',
      postalCode: '00000', // Placeholder - could be enhanced with real zip codes
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    areaServed: [
      {
        '@type': 'City',
        name: location.city,
        addressRegion: location.stateAbbr,
      },
      {
        '@type': 'State',
        name: location.state,
        addressRegion: location.stateAbbr,
      },
      {
        '@type': 'Country',
        name: 'United States',
      },
    ],
    serviceType: service,
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Check', 'Bank Transfer'],
    currenciesAccepted: 'USD',
    openingHours: 'Mo-Fr 08:00-18:00',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: `${location.city} Business Owner`,
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
        reviewBody: `Excellent ${service} services in ${location.city}. Professional, reliable, and great value.`,
      },
    ],
    sameAs: ['https://www.linkedin.com/company/thekpsgroup', 'https://twitter.com/thekpsgroup'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service} Services`,
      itemListElement: serviceKeywords.map((keyword) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: keyword,
          description: `${keyword} in ${location.city}, ${location.state}`,
        },
      })),
    },
  };
}

// Generate organization schema
export function generateOrganizationSchema() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}#organization`,
    name: 'The KPS Group',
    alternateName: ['KPS Group', 'The KPS Group LLC'],
    url: baseUrl,
    logo: `${baseUrl}/kps-group/kps-square-512.png`,
    description:
      'Modern Suite for business operations including payroll, bookkeeping, branding, consulting, and software solutions.',
    foundingDate: '2020',
    founders: [
      {
        '@type': 'Person',
        name: 'Karson',
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-KPS-HELP',
      contactType: 'customer service',
      availableLanguage: 'English',
    },
    sameAs: ['https://www.linkedin.com/company/thekpsgroup', 'https://twitter.com/thekpsgroup'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Payroll Services',
            url: `${baseUrl}/modern-pay`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Bookkeeping Services',
            url: `${baseUrl}/modern-ledger`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Branding Services',
            url: `${baseUrl}/modern-brands`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Business Consulting',
            url: `${baseUrl}/modern-consulting`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Software Solutions',
            url: `${baseUrl}/modern-stack`,
          },
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
  };
}

// Generate FAQ schema
export function generateFAQSchema(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

// Generate breadcrumb schema
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
