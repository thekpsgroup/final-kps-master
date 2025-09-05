import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCATION_DATA, generateLocationMetadata, generateLocalBusinessSchema } from "@/lib/locationData";
import ServiceLocationPage from "@/components/sections/ServiceLocationPage";

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const metadata = generateLocationMetadata(resolvedParams.city, 'consulting');

  if (!metadata) {
    return {
      title: "Business Consulting | The KPS Group",
      description: "Professional business consulting services across the United States."
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
      url: `${baseUrl}/consulting/${resolvedParams.city}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/consulting/${resolvedParams.city}`,
    },
  };
}

export default async function ConsultingLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessSchema(resolvedParams.city, 'consulting');

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
        service="consulting"
        serviceTitle="Business Consulting"
        serviceDescription="Professional business consulting and operational improvement for businesses in your area."
        keywords={["business consulting", "operations consulting", "management consulting", "business strategy", "operational efficiency"]}
        benefits={[
          "Business strategy and planning development",
          "Operational process optimization",
          "Management and leadership coaching",
          "Performance measurement and KPIs",
          "Change management and implementation"
        ]}
      />
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}
