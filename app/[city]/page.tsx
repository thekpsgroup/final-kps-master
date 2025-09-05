import CityPage from '@/components/CityPage';
import { serviceAreaCities, slugifyCity, type CityName } from '@/lib/cityData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
// Removed incorrect Props import

// Define the page props according to Next.js App Router conventions
interface PageParams {
  city: string;
}

// This generates static params for each city at build time
export function generateStaticParams(): Array<PageParams> {
  return serviceAreaCities.map((city) => ({
    city: slugifyCity(city),
  }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const cityName = serviceAreaCities.find((city) => slugifyCity(city) === params.city) as CityName;

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

// Define the page component
export default async function CityRoute({ params }: { params: PageParams }) {
  // Find the city name from the slug
  const cityName = serviceAreaCities.find((city) => slugifyCity(city) === params.city) as CityName;

  if (!cityName) {
    // Handle 404 - Next.js will show the not-found page
    notFound();
  }

  return <CityPage city={cityName} />;
}
