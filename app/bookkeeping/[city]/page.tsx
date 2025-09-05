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
  const metadata = generateLocationMetadata(resolvedParams.city, 'bookkeeping');

  if (!metadata) {
    return {
      title: "Bookkeeping Services | The KPS Group",
      description: "Professional bookkeeping services for businesses across the United States."
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
      url: `${baseUrl}/bookkeeping/${resolvedParams.city}`,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
    },
    alternates: {
      canonical: `${baseUrl}/bookkeeping/${resolvedParams.city}`,
    },
  };
}

export default async function BookkeepingLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  const schema = generateLocalBusinessSchema(resolvedParams.city, 'bookkeeping');

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
        service="bookkeeping"
        serviceTitle="Bookkeeping Services"
        serviceDescription="Professional bookkeeping and financial management for businesses in your area."
        keywords={["bookkeeping services", "accounting services", "financial management", "business bookkeeping"]}
        benefits={[
          "Monthly financial statements and reports",
          "Bank and credit card reconciliation",
          "Accounts payable and receivable management",
          "Financial planning and budgeting assistance",
          "Tax preparation support and year-end planning"
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
