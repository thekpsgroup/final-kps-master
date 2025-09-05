import { serviceAreaCities, slugifyCity, type CityName } from '@/lib/cityData';
import CityPage from '@/components/CityPage';
import { notFound } from 'next/navigation';

// This generates static params for each city at build time
export function generateStaticParams() {
  return serviceAreaCities.map((city) => ({
    city: slugifyCity(city),
  }));
}

import { Metadata } from 'next';

type CityRouteProps = {
  params: { city: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: CityRouteProps): Promise<Metadata> {
  const cityName = serviceAreaCities.find(
    (city) => slugifyCity(city) === params.city
  ) as CityName;

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

export default async function CityRoute({ params }: CityRouteProps) {
  // Find the city name from the slug
  const cityName = serviceAreaCities.find(
    (city) => slugifyCity(city) === params.city
  ) as CityName;

  if (!cityName) {
    // Handle 404 - Next.js will show the not-found page
    notFound();
  }

  return <CityPage city={cityName} />;
}
