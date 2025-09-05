import { brandsConfig } from '@/config/brandsConfig';
import { MetadataRoute } from 'next';
import { extendedServiceAreaCities } from '@/lib/cityData';

// Top priority cities for local SEO (major metropolitan areas)
const TOP_CITIES = [
  'Dallas',
  'Fort Worth',
  'Plano',
  'Frisco',
  'Irving',
  'Garland',
  'McKinney',
  'Denton',
  'Grand Prairie',
  'Richardson',
  'Lewisville',
  'Tyler',
  'Waco',
  'Sherman',
];

// Secondary priority cities (closer to Royse City)
const SECONDARY_CITIES = [
  'Royse City',
  'Fate',
  'Greenville',
  'Rockwall',
  'Terrell',
  'Forney',
  'Sulphur Springs',
  'Kaufman',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' as const },
    {
      url: `${baseUrl}/modern-suite`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      url: `${baseUrl}/outcomes`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/founder`,
      lastModified: new Date(),
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/consultation`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      priority: 0.3,
      changeFrequency: 'yearly' as const,
    },
  ];

  // Brand pages with higher priority
  const brandPages = brandsConfig.map((brand) => ({
    url: `${baseUrl}/${brand.slug}`,
    lastModified: new Date(),
    priority: 0.8 as const,
    changeFrequency: 'weekly' as const,
  }));

  // Location-specific pages for all cities
  const locationPages: MetadataRoute.Sitemap = [];

  // Helper function to get city priority
  const getCityPriority = (cityName: string): number => {
    if (TOP_CITIES.includes(cityName)) return 0.8;
    if (SECONDARY_CITIES.includes(cityName)) return 0.7;
    return 0.6;
  };

  // Add all service area cities
  extendedServiceAreaCities.forEach((city) => {
    const citySlug = city.name.toLowerCase().replace(/\s+/g, '-');
    const cityPriority = getCityPriority(city.name);

    // Direct city route (e.g., /dallas, /fort-worth)
    const mainCityPriority = Math.min(0.9, cityPriority + 0.1);
    locationPages.push({
      url: `${baseUrl}/${citySlug}`,
      lastModified: new Date(),
      priority: mainCityPriority,
      changeFrequency: 'weekly' as const,
    });

    // Service-specific location pages
    const services = ['payroll', 'bookkeeping', 'branding', 'consulting', 'software'];

    services.forEach((service) => {
      locationPages.push({
        url: `${baseUrl}/${service}/${citySlug}`,
        lastModified: new Date(),
        priority: cityPriority,
        changeFrequency: 'monthly' as const,
      });
    });

    // ADP alternatives specific pages
    locationPages.push({
      url: `${baseUrl}/payroll/adp-alternatives/${citySlug}`,
      lastModified: new Date(),
      priority: Math.min(0.9, cityPriority + 0.05),
      changeFrequency: 'monthly' as const,
    });

    // Additional service-specific pages
    locationPages.push({
      url: `${baseUrl}/payroll-services/${citySlug}`,
      lastModified: new Date(),
      priority: Math.min(0.9, cityPriority + 0.05),
      changeFrequency: 'monthly' as const,
    });
  });

  return [...staticPages, ...brandPages, ...locationPages];
}
