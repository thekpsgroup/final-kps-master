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
  const metadata = generateLocationMetadata(resolvedParams.city, 'software');

  if (!metadata) {
    return {
      title: "Business Software Solutions | The KPS Group",
      description: "Professional business software and automation solutions across the United States."
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
      url: `${baseUrl}/software/${resolvedParams.city}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/software/${resolvedParams.city}`,
    },
  };
}

export default async function SoftwareLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessSchema(resolvedParams.city, 'software');

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
        service="software"
        serviceTitle="Business Software Solutions"
        serviceDescription="Professional business software, automation, and custom development for businesses in your area."
        keywords={["business software", "CRM software", "field service software", "business automation", "custom software"]}
        benefits={[
          "CRM and customer relationship management",
          "Field service and dispatch software",
          "Business process automation",
          "Custom software development",
          "System integration and API development"
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
