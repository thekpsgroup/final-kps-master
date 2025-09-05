import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DATA, generateLocationMetadata, generateLocalBusinessSchema } from "@/lib/locationData";
import LocationPageTemplate from "@/components/sections/LocationPageTemplate";
import InternalLinkSuggestions from "@/components/sections/InternalLinkSuggestions";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const metadata = generateLocationMetadata(resolvedParams.city, 'payroll');

  if (!metadata) {
    return {
      title: "Payroll Services | The KPS Group",
      description: "Professional payroll services for businesses across the United States."
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thekpsgroup.com";

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `${baseUrl}/payroll/${resolvedParams.city}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/payroll/${resolvedParams.city}`,
    },
  };
}

export default async function PayrollLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessSchema(resolvedParams.city, 'payroll');

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
      <LocationPageTemplate
        location={location}
        service="payroll"
        serviceTitle="Payroll Services"
        serviceDescription="Professional payroll processing and HR compliance for businesses in your area."
        keywords={["payroll services", "payroll processing", "ADP alternatives", "HR compliance", "payroll management"]}
      />
      <InternalLinkSuggestions
        currentPage={{
          type: 'location',
          service: 'payroll',
          city: resolvedParams.city
        }}
      />
    </>
  );
}

// Generate static params for top cities
export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}
