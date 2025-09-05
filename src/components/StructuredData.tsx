import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
} from '@/lib/locationData';

interface StructuredDataProps {
  type: 'organization' | 'localBusiness' | 'faq' | 'breadcrumb' | 'service';
  data?: Record<string, unknown>;
  faqs?: Array<{ q: string; a: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
  service?: string;
  citySlug?: string;
}

export default function StructuredData({
  type,
  data,
  faqs,
  breadcrumbs,
  service,
  citySlug,
}: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationSchema();

      case 'localBusiness':
        if (service && citySlug) {
          return generateLocalBusinessSchema(citySlug, service);
        }
        return null;

      case 'faq':
        if (faqs) {
          return generateFAQSchema(faqs);
        }
        return null;

      case 'breadcrumb':
        if (breadcrumbs) {
          return generateBreadcrumbSchema(breadcrumbs);
        }
        return null;

      case 'service':
        // Generate service-specific schema
        return {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: data?.name || 'Business Services',
          description: data?.description || 'Professional business services',
          provider: {
            '@type': 'Organization',
            name: 'The KPS Group',
          },
          areaServed: {
            '@type': 'Country',
            name: 'United States',
          },
          serviceType: data?.serviceType || 'Business Consulting',
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2),
      }}
    />
  );
}

// Predefined FAQ data for common pages
export const COMMON_FAQS = {
  homepage: [
    {
      q: 'What services does The KPS Group offer?',
      a: 'The KPS Group offers comprehensive business operations solutions including bookkeeping, payroll processing, IT support, branding, consulting, and software solutions through our Modern Suite.',
    },
    {
      q: 'How quickly can you start working with new clients?',
      a: 'We can typically start working with new clients within 24 hours of agreement, with full implementation completed within 1-2 weeks depending on the scope of services.',
    },
    {
      q: 'Do you work with businesses of all sizes?',
      a: 'Yes, we work with businesses ranging from startups to established companies with 50+ employees, focusing on those that value professional systems and personalized service.',
    },
  ],
  consulting: [
    {
      q: 'What industries do you specialize in?',
      a: 'We work with various industries including construction, professional services, retail, manufacturing, and technology companies.',
    },
    {
      q: 'How long does a typical consulting engagement last?',
      a: 'Engagements vary from 3-12 months depending on the scope, with most clients seeing significant improvements within the first 30-60 days.',
    },
  ],
  payroll: [
    {
      q: 'Which payroll systems do you support?',
      a: 'We support ADP, Gusto, Paychex, and other major payroll platforms, with expertise in transitioning between systems.',
    },
    {
      q: 'Do you handle payroll taxes and compliance?',
      a: 'Yes, we handle all payroll tax calculations, filings, and compliance requirements to ensure your business stays compliant with federal and state regulations.',
    },
  ],
};

// Breadcrumb generator for common page types
export function generateBreadcrumbs(pageType: string, slug?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';
  const breadcrumbs = [{ name: 'Home', url: baseUrl }];

  switch (pageType) {
    case 'service':
      breadcrumbs.push({
        name: 'Services',
        url: `${baseUrl}/services`,
      });
      if (slug) {
        breadcrumbs.push({
          name: slug.charAt(0).toUpperCase() + slug.slice(1),
          url: `${baseUrl}/services/${slug}`,
        });
      }
      break;

    case 'consultation':
      breadcrumbs.push({
        name: 'Consultation',
        url: `${baseUrl}/consultation`,
      });
      break;

    case 'about':
      breadcrumbs.push({
        name: 'About',
        url: `${baseUrl}/about`,
      });
      break;

    case 'contact':
      breadcrumbs.push({
        name: 'Contact',
        url: `${baseUrl}/contact`,
      });
      break;
  }

  return breadcrumbs;
}
