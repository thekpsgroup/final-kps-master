import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Briefcase, Building2, Code, MapPin } from 'lucide-react';
import Link from 'next/link';

interface InternalLinkSuggestionsProps {
  currentPage: {
    type: 'location' | 'service' | 'brand';
    service?: string;
    city?: string;
    brand?: string;
  };
  className?: string;
}

export default function InternalLinkSuggestions({
  currentPage,
  className = '',
}: InternalLinkSuggestionsProps) {
  const getSuggestions = () => {
    const suggestions = [];

    if (currentPage.type === 'location' && currentPage.service && currentPage.city) {
      // On a location-specific service page
      const service = currentPage.service;
      const city = currentPage.city;

      suggestions.push({
        title: `More Services in ${city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')}`,
        description: `Explore all our business services available in your area`,
        links: [
          {
            name: service === 'payroll' ? 'Bookkeeping Services' : 'Payroll Services',
            url: `/${service === 'payroll' ? 'bookkeeping' : 'payroll'}/${city}`,
            icon: service === 'payroll' ? Building2 : Briefcase,
          },
          {
            name: service === 'branding' ? 'Consulting Services' : 'Branding Services',
            url: `/${service === 'branding' ? 'consulting' : 'branding'}/${city}`,
            icon: service === 'branding' ? Briefcase : Code,
          },
          {
            name: 'All Services',
            url: '/modern-suite',
            icon: Building2,
          },
        ],
      });

      // ADP alternatives for payroll
      if (service === 'payroll') {
        suggestions.push({
          title: 'ADP Alternatives',
          description:
            'Considering switching from ADP? Learn more about our superior alternatives.',
          links: [
            {
              name: `ADP Alternatives in ${
                city.charAt(0).toUpperCase() + city.slice(1).replace('-', ' ')
              }`,
              url: `/payroll/adp-alternatives/${city}`,
              icon: MapPin,
            },
          ],
        });
      }
    } else if (currentPage.type === 'service' && currentPage.service) {
      // On a general service page
      const service = currentPage.service;

      suggestions.push({
        title: `${service.charAt(0).toUpperCase() + service.slice(1)} by Location`,
        description: `Find ${service} services in your city`,
        links: [
          { name: 'Atlanta', url: `/${service}/atlanta`, icon: MapPin },
          { name: 'Austin', url: `/${service}/austin`, icon: MapPin },
          { name: 'Boston', url: `/${service}/boston`, icon: MapPin },
          { name: 'Chicago', url: `/${service}/chicago`, icon: MapPin },
          { name: 'Dallas', url: `/${service}/dallas`, icon: MapPin },
          { name: 'Denver', url: `/${service}/denver`, icon: MapPin },
          { name: 'Houston', url: `/${service}/houston`, icon: MapPin },
          { name: 'Los Angeles', url: `/${service}/los-angeles`, icon: MapPin },
        ],
      });
    } else if (currentPage.type === 'brand' && currentPage.brand) {
      // On a brand page
      const brand = currentPage.brand;

      suggestions.push({
        title: 'Related Services',
        description: 'Explore our complete suite of business solutions',
        links: [
          {
            name: brand === 'modern-pay' ? 'Bookkeeping' : 'Payroll',
            url: brand === 'modern-pay' ? '/modern-ledger' : '/modern-pay',
            icon: brand === 'modern-pay' ? Building2 : Briefcase,
          },
          {
            name: brand === 'modern-brands' ? 'Consulting' : 'Branding',
            url: brand === 'modern-brands' ? '/modern-consulting' : '/modern-brands',
            icon: brand === 'modern-brands' ? Briefcase : Code,
          },
          {
            name: 'Complete Modern Suite',
            url: '/modern-suite',
            icon: Building2,
          },
        ],
      });
    }

    return suggestions;
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) return null;

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-800 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {suggestions.map((suggestion, index) => (
            <div key={index}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {suggestion.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  {suggestion.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestion.links.map((link, linkIndex) => {
                  const IconComponent = link.icon;
                  return (
                    <Card key={linkIndex} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <IconComponent className="w-8 h-8 text-blue-600" />
                          <ArrowRight className="w-5 h-5 text-gray-600" />
                        </div>
                        <CardTitle className="text-lg">{link.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Link
                          href={link.url}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer links component for consistent internal linking
export function FooterInternalLinks() {
  return (
    <div className="grid md:grid-cols-3 gap-8 mt-12">
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Cities</h4>
        <div className="space-y-2">
          {[
            { name: 'Atlanta', url: '/payroll/atlanta' },
            { name: 'Austin', url: '/payroll/austin' },
            { name: 'Boston', url: '/payroll/boston' },
            { name: 'Chicago', url: '/payroll/chicago' },
            { name: 'Dallas', url: '/payroll/dallas' },
            { name: 'Houston', url: '/payroll/houston' },
          ].map((city) => (
            <Link
              key={city.name}
              href={city.url}
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {city.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Our Services</h4>
        <div className="space-y-2">
          {[
            { name: 'Payroll Services', url: '/modern-pay' },
            { name: 'Bookkeeping', url: '/modern-ledger' },
            { name: 'Branding', url: '/modern-brands' },
            { name: 'Consulting', url: '/modern-consulting' },
            { name: 'Software Solutions', url: '/modern-stack' },
          ].map((service) => (
            <Link
              key={service.name}
              href={service.url}
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {service.name}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">ADP Alternatives</h4>
        <div className="space-y-2">
          {[
            { name: 'ADP Alternatives Atlanta', url: '/payroll/adp-alternatives/atlanta' },
            { name: 'ADP Alternatives Chicago', url: '/payroll/adp-alternatives/chicago' },
            { name: 'ADP Alternatives Dallas', url: '/payroll/adp-alternatives/dallas' },
            { name: 'ADP Alternatives Houston', url: '/payroll/adp-alternatives/houston' },
            { name: 'ADP Alternatives NYC', url: '/payroll/adp-alternatives/new-york' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.url}
              className="block text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
