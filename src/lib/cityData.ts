interface CityCoordinates {
  name: string;
  lat: number;
  lng: number;
}

// Comprehensive list of major cities in North and East Texas
export const extendedServiceAreaCities: CityCoordinates[] = [
  // Core DFW Cities
  { name: 'Royse City', lat: 32.9746, lng: -96.3319 },
  { name: 'Dallas', lat: 32.7767, lng: -96.7970 },
  { name: 'Fort Worth', lat: 32.7555, lng: -97.3308 },
  { name: 'Arlington', lat: 32.7357, lng: -97.1081 },
  { name: 'Plano', lat: 33.0198, lng: -96.6989 },
  { name: 'Frisco', lat: 33.1507, lng: -96.8236 },
  { name: 'Irving', lat: 32.8140, lng: -96.9489 },
  { name: 'Garland', lat: 32.9126, lng: -96.6389 },
  { name: 'McKinney', lat: 33.1972, lng: -96.6397 },
  { name: 'Denton', lat: 33.2148, lng: -97.1331 },
  { name: 'Grand Prairie', lat: 32.7459, lng: -97.0378 },
  { name: 'Richardson', lat: 32.9484, lng: -96.7299 },
  { name: 'Lewisville', lat: 33.0462, lng: -96.9941 },
  { name: 'Mesquite', lat: 32.7668, lng: -96.5992 },
  { name: 'Allen', lat: 33.1032, lng: -96.6705 },
  { name: 'Grapevine', lat: 32.9343, lng: -97.0781 },
  { name: 'Carrollton', lat: 32.9756, lng: -96.8897 },
  { name: 'Keller', lat: 32.9343, lng: -97.2289 },
  { name: 'Mansfield', lat: 32.5632, lng: -97.1417 },
  { name: 'Rockwall', lat: 32.9312, lng: -96.4597 },
  { name: 'Rowlett', lat: 32.9029, lng: -96.5666 },
  
  // Extended Service Area - Major Cities
  { name: 'Fate', lat: 32.9379, lng: -96.3844 },
  { name: 'Greenville', lat: 33.1384, lng: -96.1108 },
  { name: 'Tyler', lat: 32.3513, lng: -95.3011 },
  { name: 'Waco', lat: 31.5493, lng: -97.1467 },
  { name: 'Sherman', lat: 33.6357, lng: -96.6089 },
  { name: 'Denison', lat: 33.7556, lng: -96.5367 },
  { name: 'Paris', lat: 33.6609, lng: -95.5555 },
  { name: 'Texarkana', lat: 33.4418, lng: -94.0377 },
  { name: 'Corsicana', lat: 32.0954, lng: -96.4689 },
  { name: 'Athens', lat: 32.2049, lng: -95.8555 },
  { name: 'Palestine', lat: 31.7621, lng: -95.6308 },
  { name: 'Terrell', lat: 32.7368, lng: -96.2753 },
  { name: 'Forney', lat: 32.7482, lng: -96.4719 },
  { name: 'Sulphur Springs', lat: 33.1384, lng: -95.6011 },
  { name: 'Mount Pleasant', lat: 33.1568, lng: -94.9694 },
  { name: 'Bonham', lat: 33.5773, lng: -96.1783 },
  { name: 'Canton', lat: 32.5565, lng: -95.8677 },
  { name: 'Kaufman', lat: 32.5899, lng: -96.3089 },
  { name: 'Mineola', lat: 32.6632, lng: -95.4883 },
  { name: 'Van', lat: 32.5251, lng: -95.6355 },
  { name: 'Quitman', lat: 32.7957, lng: -95.4455 },
  { name: 'Winnsboro', lat: 32.9577, lng: -95.2905 },
  { name: 'Emory', lat: 32.8746, lng: -95.7658 },
  { name: 'Gun Barrel City', lat: 32.3343, lng: -96.1139 },
];

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

// Get all cities within specified radius of a center point
export function getCitiesWithinRadius(centerCity: string, radiusMiles: number): string[] {
  const center = extendedServiceAreaCities.find((city) => city.name === centerCity);
  if (!center) {
    throw new Error(`Center city "${centerCity}" not found`);
  }

  return extendedServiceAreaCities
    .filter((city) => {
      const distance = calculateDistance(center.lat, center.lng, city.lat, city.lng);
      return distance <= radiusMiles;
    })
    .map((city) => city.name)
    .sort();
}

// Get a simplified list of all service area cities
// Get all cities in our service area
const allCities = extendedServiceAreaCities.map((city) => city.name);
export const serviceAreaCities = [...allCities] as const;

export type CityName = (typeof serviceAreaCities)[number];

export function slugifyCity(city: string): string {
  return city.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function getCityUrlPath(city: CityName): string {
  return `/${slugifyCity(city)}`;
}

export function getCityData(city: CityName) {
  return {
    title: `${city} Back-Office & Ops for Trades | The KPS Group`,
    description: `Back-office, payroll, and operations support for trades and contractors in ${city}. Book a consultation or call our local team today.`,
    canonical: getCityUrlPath(city),
    breadcrumb: {
      name: city,
      item: `https://thekpsgroup.com${getCityUrlPath(city)}`,
    },
  };
}
