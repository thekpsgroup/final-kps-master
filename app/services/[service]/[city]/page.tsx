import RoyseCityContent from '@/components/sections/RoyseCityContent';
import { LOCATION_DATA } from '@/lib/locationData';
import { seoOptimizer } from '@/lib/seo-optimizer';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

// Service type mappings
const serviceMappings: Record<string, { title: string; description: string; page: string }> = {
  'payroll-services': {
    title: 'Payroll Services',
    description: 'Professional payroll processing and compliance services',
    page: '/modern-pay',
  },
  'bookkeeping-services': {
    title: 'Bookkeeping Services',
    description: 'Expert bookkeeping and financial management services',
    page: '/modern-ledger',
  },
  'business-consulting': {
    title: 'Business Consulting',
    description: 'Strategic business consulting and operations optimization',
    page: '/modern-consulting',
  },
  'hr-services': {
    title: 'HR Services',
    description: 'Human resources and compliance services',
    page: '/modern-pay',
  },
  'it-services': {
    title: 'IT Services',
    description: 'Managed IT services and technology solutions',
    page: '/modern-stack',
  },
};

// Generate static params for service-city combinations
export async function generateStaticParams() {
  const cities = seoOptimizer.getUniqueCities();
  const services = Object.keys(serviceMappings);

  const params: { service: string; city: string }[] = [];

  services.forEach((service) => {
    cities.slice(0, 100).forEach((city) => {
      // Increased limit for Dallas Metro coverage
      params.push({
        service,
        city: city.toLowerCase().replace(/\s+/g, '-'),
      });
    });
  });

  return params;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const serviceSlug = resolvedParams.service;
  const cityName = resolvedParams.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const serviceInfo = serviceMappings[serviceSlug];
  if (!serviceInfo) {
    return {
      title: `The KPS Group - ${cityName}`,
      description: `Professional business services in ${cityName}`,
    };
  }

  return {
    title: `${serviceInfo.title} in ${cityName} | KPS Group`,
    description: `${serviceInfo.description} in ${cityName}. Professional solutions tailored for local businesses.`,
    keywords: [
      `${serviceInfo.title.toLowerCase()} ${cityName}`,
      `${serviceSlug} ${cityName}`,
      `professional services ${cityName}`,
    ],
    openGraph: {
      title: `${serviceInfo.title} in ${cityName} | KPS Group`,
      description: `${serviceInfo.description} in ${cityName}. Professional solutions tailored for local businesses.`,
      url: `https://thekpsgroup.com/services/${serviceSlug}/${resolvedParams.city}`,
      siteName: 'The KPS Group',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${serviceInfo.title} in ${cityName} | KPS Group`,
      description: `${serviceInfo.description} in ${cityName}. Professional solutions tailored for local businesses.`,
    },
    alternates: {
      canonical: `https://thekpsgroup.com/services/${serviceSlug}/${resolvedParams.city}`,
    },
  };
}

interface PageProps {
  params: Promise<{
    service: string;
    city: string;
  }>;
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const resolvedParams = await params;
  const serviceSlug = resolvedParams.service;
  const cityName = resolvedParams.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const serviceInfo = serviceMappings[serviceSlug];
  if (!serviceInfo) {
    notFound();
  }

  // Get location data
  const location = LOCATION_DATA[resolvedParams.city];
  if (!location) {
    notFound();
  }

  // Check if city exists in our keywords
  const locationKeywords = seoOptimizer.getLocationKeywords(cityName);
  if (locationKeywords.length === 0) {
    notFound();
  }

  const seoData = seoOptimizer.generateLocationSEOData(cityName);

  return (
    <>
      <Script
        id="service-location-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(seoData.structuredData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              {serviceInfo.title} in {cityName}
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {serviceInfo.description} in {cityName}. Professional solutions tailored for local
              businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Get Free Consultation
              </a>
              <a
                href={serviceInfo.page}
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
                <div className="whitespace-pre-line text-slate-700 leading-relaxed mb-8">
                  Looking for reliable {serviceInfo.title.toLowerCase()} in {cityName}? KPS Group
                  offers comprehensive {serviceInfo.description.toLowerCase()} tailored for
                  businesses in {cityName}. Our expert team provides professional solutions that
                  understand the unique business environment and local requirements in {cityName}.
                </div>

                {/* Service-specific content based on service type */}
                {serviceSlug === 'payroll-services' && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Payroll Services in {cityName}
                    </h2>
                    <ul className="space-y-3 text-slate-700">
                      <li>• Complete payroll processing and tax filing</li>
                      <li>• Multi-state payroll compliance</li>
                      <li>• Direct deposit and pay stub generation</li>
                      <li>• Year-end tax forms (W-2, 1099)</li>
                      <li>• HR support and employee onboarding</li>
                      <li>• 24/7 customer support</li>
                    </ul>
                  </div>
                )}

                {serviceSlug === 'bookkeeping-services' && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Bookkeeping Services in {cityName}
                    </h2>
                    <ul className="space-y-3 text-slate-700">
                      <li>• Monthly bookkeeping and reconciliation</li>
                      <li>• Financial statement preparation</li>
                      <li>• Accounts payable and receivable management</li>
                      <li>• Bank and credit card reconciliation</li>
                      <li>• Audit-ready documentation</li>
                      <li>• Financial reporting and analysis</li>
                    </ul>
                  </div>
                )}

                {serviceSlug === 'business-consulting' && (
                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Business Consulting in {cityName}
                    </h2>
                    <ul className="space-y-3 text-slate-700">
                      <li>• Strategic business planning</li>
                      <li>• Operations optimization</li>
                      <li>• Sales process improvement</li>
                      <li>• Leadership coaching</li>
                      <li>• Market analysis and growth strategies</li>
                      <li>• Performance management systems</li>
                    </ul>
                  </div>
                )}

                {/* Benefits Section */}
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Local Expertise</h3>
                    <p className="text-slate-600">
                      Our team understands the unique business environment in {cityName} and
                      provides tailored solutions for local compliance requirements.
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">Dedicated Support</h3>
                    <p className="text-slate-600">
                      Get personalized support from dedicated account managers who understand{' '}
                      {cityName} business needs.
                    </p>
                  </div>
                </div>

                {/* CTA Section */}
                <div className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                  <h2 className="text-3xl font-bold mb-4">Ready to Get Started in {cityName}?</h2>
                  <p className="text-xl mb-6 opacity-90">
                    Join businesses in {cityName} who trust KPS Group for their professional service
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

        {/* Related Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">More Services in {cityName}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(serviceMappings)
                .filter(([key]) => key !== serviceSlug)
                .slice(0, 3)
                .map(([key, info]) => (
                  <a
                    key={key}
                    href={`/services/${key}/${resolvedParams.city}`}
                    className="bg-slate-800 hover:bg-slate-700 p-6 rounded-xl transition-colors"
                  >
                    <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
                    <p className="text-slate-300">{info.description}</p>
                  </a>
                ))}
            </div>
          </div>
        </section>

        {/* Local Community Content */}
        <RoyseCityContent service={serviceSlug} location={location} />
      </div>
    </>
  );
}
