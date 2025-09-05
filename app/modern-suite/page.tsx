import { brandsConfig } from '@/config/brandsConfig';
// framer-motion is client-only; do not import it in a server component
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Modern Suite | Complete Business Operations Platform | The KPS Group',
  description:
    "Discover The KPS Group's Modern Suite: integrated bookkeeping, payroll, IT support, and consulting solutions. One platform for all your business operations needs.",
  keywords:
    'Modern Suite, business operations platform, integrated solutions, bookkeeping software, payroll system, IT support platform',
  openGraph: {
    title: 'Modern Suite | Complete Business Operations Platform | The KPS Group',
    description:
      "Discover The KPS Group's Modern Suite: integrated bookkeeping, payroll, IT support, and consulting solutions for growing businesses.",
    type: 'website',
    url: '/modern-suite',
    siteName: 'The KPS Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Suite | Complete Business Operations Platform | The KPS Group',
    description:
      "Discover The KPS Group's Modern Suite: integrated bookkeeping, payroll, IT support, and consulting solutions for growing businesses.",
  },
  alternates: {
    canonical: '/modern-suite',
  },
};

export default function ModernSuitePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kpsNavy/5 via-transparent to-kpsGold/5" />

        <div className="container max-w-6xl relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-8">
              <span>🏢</span>
              The Modern Suite
            </div>

            <h1 className="h1 text-gray-900 mb-8">
              Five Specialized Services,
              <span className="block text-kpsNavy">One Seamless Experience</span>
            </h1>

            <p className="body-large text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
              Each Modern Suite service is expertly crafted for growing businesses, but together
              they create something powerful: a complete operational ecosystem that eliminates the
              chaos of managing multiple vendors.
            </p>

            {/* Connection Diagram */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
              <h3 className="h3 text-gray-900 mb-6">How They Work Together</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Operations Foundation</h4>
                  <p className="text-sm text-gray-600">
                    Modern Pay + Modern Ledger handle your financial backbone
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Growth Engine</h4>
                  <p className="text-sm text-gray-600">
                    Modern Brands + Modern Consulting drive your expansion
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Tech Infrastructure</h4>
                  <p className="text-sm text-gray-600">
                    Modern Stack connects and automates everything
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individual Services */}
      <section className="py-24 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="h2 text-gray-900 mb-6">Explore Each Service</h2>
            <p className="body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Click any service below to learn more about how it can transform your business
              operations.
            </p>
          </div>

          <div className="grid gap-8">
            {brandsConfig.map((brand) => (
              <div
                key={brand.slug}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {/* Logo */}
                  <div className="text-center md:text-left">
                    <div className="bg-gray-50 rounded-2xl p-6 inline-block">
                      <Image
                        src={brand.logoPath}
                        alt={brand.brandName}
                        width={200}
                        height={60}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="h3 text-gray-900 mb-4">{brand.brandName}</h3>
                      <p className="body text-gray-600 mb-6 leading-relaxed">{brand.tagline}</p>
                      <p className="text-gray-700 leading-relaxed">{brand.summary}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href={`/${brand.slug}`} className="btn-cta btn-cta-primary">
                        Learn More
                        <span>→</span>
                      </Link>

                      {brand.externalUrl && (
                        <a
                          href={brand.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cta btn-cta-secondary"
                        >
                          Visit Website
                          <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="h2 text-gray-900 mb-6">Three Ways to Get Started</h2>
            <p className="body text-gray-600 leading-relaxed">
              Choose the package that fits your business size and growth stage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
              <h3 className="h4 text-gray-900 mb-6">Starter Package</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Perfect for businesses just getting organized
              </p>
              <div className="space-y-4 text-sm text-gray-700 mb-8">
                <div>✓ Modern Pay or Modern Ledger</div>
                <div>✓ Basic setup and training</div>
                <div>✓ Monthly support calls</div>
              </div>
              <Link href="/consultation" className="btn-cta btn-cta-secondary">
                Learn More
              </Link>
            </div>

            <div className="bg-kpsNavy text-white rounded-3xl p-8 shadow-lg text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-kpsGold text-kpsNavy px-4 py-1 rounded-full text-sm font-bold">
                Most Popular
              </div>
              <h3 className="h4 mb-6">Growth Package</h3>
              <p className="text-white/90 mb-8 leading-relaxed">
                For businesses ready to scale operations
              </p>
              <div className="space-y-4 text-sm text-white/90 mb-8">
                <div>✓ 3 Modern Suite services</div>
                <div>✓ Complete integration setup</div>
                <div>✓ Weekly optimization calls</div>
              </div>
              <Link href="/consultation" className="btn-cta btn-cta-primary">
                Get Started
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center">
              <h3 className="h4 text-gray-900 mb-6">Enterprise Package</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Complete transformation for established businesses
              </p>
              <div className="space-y-4 text-sm text-gray-700 mb-8">
                <div>✓ Full Modern Suite access</div>
                <div>✓ Custom integrations</div>
                <div>✓ Dedicated account manager</div>
              </div>
              <Link href="/consultation" className="btn-cta btn-cta-secondary">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-kpsNavy text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="h2 mb-6">Ready to Modernize Your Business?</h2>
          <p className="body-large text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss which Modern Suite services will have the biggest impact on your
            operations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="btn-cta btn-cta-outline">
              Book Free Consultation
              <span>→</span>
            </Link>

            <Link href="/about" className="btn-cta btn-cta-secondary">
              Learn About KPS Group
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
