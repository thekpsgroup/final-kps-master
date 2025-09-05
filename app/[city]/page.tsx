import { serviceAreaCities, slugifyCity, type CityName } from '@/lib/cityData';
import CityPage from '@/components/CityPage';
import { notFound } from 'next/navigation';

// This generates static params for each city at build time
export function generateStaticParams() {
  return serviceAreaCities.map((city) => ({
    city: slugifyCity(city),
  }));
}

interface CityRouteProps {
  params: { city: string };
}

export default function CityRoute({ params }: CityRouteProps) {
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
