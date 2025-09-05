'use client';

import { extendedServiceAreaCities } from '@/lib/cityData';
import { slugifyCity } from '@/lib/cityData';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';

interface CitySelectorProps {
  className?: string;
}

export default function CitySelector({ className = '' }: CitySelectorProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredCities = extendedServiceAreaCities
    .map(city => city.name)
    .filter(city => city.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      // First sort by whether the city starts with the search term
      const aStarts = a.toLowerCase().startsWith(search.toLowerCase());
      const bStarts = b.toLowerCase().startsWith(search.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      // Then sort alphabetically
      return a.localeCompare(b);
    });

  const handleSelect = useCallback((city: string) => {
    router.push(`/${slugifyCity(city)}`);
    setIsOpen(false);
    setSearch('');
  }, [router]);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left border rounded-lg shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-expanded={isOpen}
      >
        Find Your City
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border">
          <div className="p-2">
            <input
              type="search"
              placeholder="Search cities..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="max-h-64 overflow-y-auto p-2">
            {filteredCities.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No cities found</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {filteredCities.map(city => (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className="text-left px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:bg-gray-100 w-full"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
