import ContentExpansion from '@/components/sections/ContentExpansion';
import RoyseCityContent from '@/components/sections/RoyseCityContent';
import ServiceFAQ from '@/components/sections/ServiceFAQ';
import { LOCATION_DATA } from '@/lib/locationData';
import { seoOptimizer } from '@/lib/seo-optimizer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

// Generate static params for all cities (for build time optimization)
export async function generateStaticParams() {
  const cities = seoOptimizer.getUniqueCities();

  return cities.slice(0, 100).map((city) => ({
    city: city.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const cityName = resolvedParams.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  const seoData = seoOptimizer.generateLocationSEOData(cityName);

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    keywords: [
      `payroll services ${cityName}`,
      `ADP alternatives ${cityName}`,
      `payroll processing ${cityName}`,
    ],
    openGraph: {
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      url: `https://thekpsgroup.com/payroll-services/${resolvedParams.city}`,
      siteName: 'The KPS Group',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.metaTitle,
      description: seoData.metaDescription,
    },
    alternates: {
      canonical: `https://thekpsgroup.com/payroll-services/${resolvedParams.city}`,
    },
  };
}

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export default async function LocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const cityName = resolvedParams.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  // Check if city exists in our keywords
  const locationKeywords = seoOptimizer.getLocationKeywords(cityName);
  if (locationKeywords.length === 0) {
    notFound();
  }

  const seoData = seoOptimizer.generateLocationSEOData(cityName);
  const structuredData = JSON.stringify(seoData.structuredData);

  // Get location data for components
  const locationSlug = resolvedParams.city;
  const location =
    LOCATION_DATA[locationSlug] || LOCATION_DATA[cityName.toLowerCase().replace(/\s+/g, '-')];

  return (
    <>
      <Script
        id="location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              {seoData.h1Heading}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {seoData.metaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Free Consultation
              </a>
              <a
                href="/modern-pay"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-slate-700 leading-relaxed">
                  {seoData.content}
                </div>

                {/* Location-specific benefits */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Expertise</h3>
                    <p className="text-slate-600">
                      Our team understands the unique business environment in {cityName} and
                      provides tailored solutions for local compliance requirements.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">24/7 Support</h3>
                    <p className="text-slate-600">
                      Get round-the-clock support for all your payroll and HR needs, with dedicated
                      account managers who know {cityName} businesses.
                    </p>
                  </div>
                </div>

                {/* Services List */}
                <div className="mt-12">
                  <h2 className="text-3xl font-bold text-slate-900 mb-6">
                    Our Services in {cityName}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      'Payroll Processing',
                      'Tax Compliance',
                      'HR Support',
                      'Multi-State Payroll',
                      'Benefits Administration',
                      'Time & Attendance',
                    ].map((service) => (
                      <div key={service} className="bg-slate-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-slate-900">{service}</h4>
                        <p className="text-slate-600 text-sm mt-1">
                          Professional {service.toLowerCase()} services for {cityName} businesses
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
                  <p className="text-xl mb-6 opacity-90">
                    Join thousands of {cityName} businesses who trust KPS Group for their payroll
                    needs.
                  </p>
                  <a
                    href="/consultation"
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
                  >
                    Schedule Free Consultation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Cities Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Payroll Services in Other Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {seoOptimizer
                .getUniqueCities()
                .filter((city) => city !== cityName)
                .slice(0, 12)
                .map((city) => (
                  <a
                    key={city}
                    href={`/payroll-services/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bg-slate-800 hover:bg-slate-700 p-3 rounded-lg text-center transition-colors"
                  >
                    {city}
                  </a>
                ))}
            </div>
          </div>
        </section>
      </div>

      {location && (
        <>
          <ContentExpansion service="payroll" location={location} />
          <ServiceFAQ service="payroll" location={location} />
          {(location.slug === 'royse-city' || location.slug === 'fate') && (
            <RoyseCityContent service="payroll" location={location} />
          )}
        </>
      )}
    </>
  );
}
