import ContentExpansion from '@/components/sections/ContentExpansion';
import RoyseCityContent from '@/components/sections/RoyseCityContent';
import ServiceFAQ from '@/components/sections/ServiceFAQ';
import ServiceLocationPage from '@/components/sections/ServiceLocationPage';
import {
  LOCATION_DATA,
  generateLocalBusinessSchema,
  generateLocationMetadata,
} from '@/lib/locationData';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const metadata = generateLocationMetadata(resolvedParams.city, 'branding');

  if (!metadata) {
    return {
      title: 'Branding Services | The KPS Group',
      description: 'Professional branding services for businesses across the United States.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/branding/${resolvedParams.city}`,
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/branding/${resolvedParams.city}`,
    },
  };
}

export default async function BrandingLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessSchema(resolvedParams.city, 'branding');

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      )}
      <ServiceLocationPage
        location={location}
        service="branding"
        serviceTitle="Branding Services"
        serviceDescription="Professional branding and identity design for businesses in your area."
        keywords={[
          'branding services',
          'brand identity',
          'logo design',
          'brand strategy',
          'visual identity',
        ]}
        benefits={[
          'Custom logo design and brand identity',
          'Brand strategy and positioning development',
          'Website design and digital presence',
          'Marketing materials and collateral design',
          'Brand guidelines and usage standards',
        ]}
      />
      <ContentExpansion service="branding" location={location} />
      <ServiceFAQ service="branding" location={location} />
      {(location.slug === 'royse-city' || location.slug === 'fate') && (
        <RoyseCityContent service="branding" location={location} />
      )}
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}
