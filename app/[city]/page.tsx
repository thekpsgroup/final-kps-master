import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceAreaCities, slugifyCity, type CityName } from '@/lib/cityData';
import CityPage from '@/components/CityPage';

// Define params type
type Params = { city: string };

interface PageProps {
  params: Promise<Params>;
}

// Force Next.js to treat this as a static page
export const dynamic = 'error';
export const dynamicParams = false;

// This generates static params for each city at build time
export function generateStaticParams(): Array<Params> {
  return serviceAreaCities.map((city) => ({
    city: slugifyCity(city),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = serviceAreaCities.find((city) => slugifyCity(city) === resolvedParams.city) as CityName;

  if (!cityName) {
    return {
      title: 'City Not Found',
      description: 'The requested city page could not be found.',
    };
  }

  return {
    title: `${cityName} Business Services | The KPS Group`,
    description: `Professional business services in ${cityName}. Expert payroll, bookkeeping, and back-office solutions for local businesses.`,
  };
}

// Define the page component according to Next.js conventions
export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;

  // Find the city name from the slug
  const cityName = serviceAreaCities.find((city) => slugifyCity(city) === resolvedParams.city) as CityName;

  if (!cityName) {
    notFound();
  }

  return <CityPage city={cityName} />;
}

