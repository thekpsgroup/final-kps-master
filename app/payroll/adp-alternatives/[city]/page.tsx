import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DATA, generateLocalBusinessSchema } from "@/lib/locationData";
import ADPAlternativesTemplate from "@/components/sections/ADPAlternativesTemplate";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    return {
      title: "ADP Payroll Alternatives | The KPS Group",
      description: "Professional ADP payroll alternatives for businesses across the United States."
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.thekpsgroup.com";
  const cityState = `${location.city}, ${location.stateAbbr}`;

  return {
    title: `ADP Payroll Alternatives in ${cityState} | Modern Pay`,
    description: `Looking for ADP payroll alternatives in ${location.city}? Discover Modern Pay - a superior payroll solution with better features, lower costs, and exceptional service.`,
    keywords: `ADP payroll alternatives ${location.city}, ADP alternatives ${cityState}, payroll software ${location.city}, ADP replacement ${location.city}, modern payroll ${location.city}`,
    openGraph: {
      title: `ADP Payroll Alternatives in ${cityState}`,
      description: `Discover better payroll solutions than ADP in ${location.city}. Modern features, competitive pricing, and superior customer service.`,
      url: `${baseUrl}/payroll/adp-alternatives/${resolvedParams.city}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `ADP Alternatives in ${cityState}`,
      description: `Better payroll solutions than ADP in ${location.city}`,
    },
    alternates: {
      canonical: `${baseUrl}/payroll/adp-alternatives/${resolvedParams.city}`,
    },
  };
}

export default async function ADPAlternativesLocationPage({ params }: PageProps) {
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
      <ADPAlternativesTemplate location={location} />
    </>
  );
}

// Generate static params for top cities
export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}
