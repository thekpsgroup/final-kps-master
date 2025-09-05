import { MetadataRoute } from 'next'
import { brandsConfig } from "@/config/brandsConfig";

// Top priority cities for local SEO (major metropolitan areas)
const TOP_CITIES = [
  'Atlanta', 'Austin', 'Boston', 'Chicago', 'Dallas', 'Denver', 'Houston', 'Los Angeles',
  'Miami', 'Nashville', 'New York', 'Phoenix', 'San Antonio', 'San Diego', 'San Francisco',
  'Seattle', 'Tampa', 'Washington'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thekpsgroup.com";

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/modern-suite`, lastModified: new Date(), priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/outcomes`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/founder`, lastModified: new Date(), priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/consultation`, lastModified: new Date(), priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.6, changeFrequency: 'weekly' as const },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${baseUrl}/terms`, lastModified: new Date(), priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  // Brand pages with higher priority
  const brandPages = brandsConfig.map((brand) => ({
    url: `${baseUrl}/${brand.slug}`,
    lastModified: new Date(),
    priority: 0.8 as const,
    changeFrequency: 'weekly' as const
  }));

  // Location-specific pages for top cities
  const locationPages: MetadataRoute.Sitemap = [];

  TOP_CITIES.forEach(city => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');

    // Service-specific location pages
    const services = ['payroll', 'bookkeeping', 'branding', 'consulting', 'software'];

    services.forEach(service => {
      locationPages.push({
        url: `${baseUrl}/${service}/${citySlug}`,
        lastModified: new Date(),
        priority: 0.7 as const,
        changeFrequency: 'monthly' as const
      });
    });

    // ADP alternatives specific pages
    locationPages.push({
      url: `${baseUrl}/payroll/adp-alternatives/${citySlug}`,
      lastModified: new Date(),
      priority: 0.75 as const,
      changeFrequency: 'monthly' as const
    });
  });

  return [...staticPages, ...brandPages, ...locationPages];
}
