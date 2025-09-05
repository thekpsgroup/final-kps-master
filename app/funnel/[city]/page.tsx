import { LOCATION_DATA } from '@/lib/locationData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    city: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    return {
      title: 'Small Business Partner | The KPS Group',
      description: 'Your trusted small business partner for back office solutions.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com';

  return {
    title: `Your ${location.city} Small Business Partner | KPS Group`,
    description: `Your ${location.city} small business partner specializing in back office solutions. Expert bookkeeping, payroll, and consulting services.`,
    keywords: [
      `${location.city} small business partner`,
      'back office solutions',
      'bookkeeping services',
      'payroll services',
      `${location.city} business consulting`,
    ],
    openGraph: {
      title: `Your ${location.city} Small Business Partner | KPS Group`,
      description: `Your ${location.city} small business partner specializing in back office solutions.`,
      url: `${baseUrl}/funnel/${resolvedParams.city}`,
      siteName: 'The KPS Group',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Your ${location.city} Small Business Partner | KPS Group`,
      description: `Your ${location.city} small business partner specializing in back office solutions.`,
    },
    alternates: {
      canonical: `${baseUrl}/funnel/${resolvedParams.city}`,
    },
  };
}

export default async function CityFunnelPage({ params }: PageProps) {
  const resolvedParams = await params;
  const location = LOCATION_DATA[resolvedParams.city];

  if (!location) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'The KPS Group',
            description: `Professional bookkeeping firm and operational consulting services in ${location.city}`,
            url: `https://thekpsgroup.com/funnel/${resolvedParams.city}`,
            areaServed: {
              '@type': 'City',
              name: location.city,
              addressRegion: 'TX',
              addressCountry: 'US',
            },
            serviceType: [
              'Professional Bookkeeping',
              'Software Development',
              'Operational Consulting',
              'Financial Management',
              'Business Process Optimization',
            ],
            hasCredential: {
              '@type': 'EducationalOccupationalCredential',
              name: 'Certified Bookkeepers',
            },
            knowsAbout: [
              'Bookkeeping Services',
              'Software Development',
              'Operational Consulting',
              'Financial Management',
              'Business Process Automation',
            ],
          }),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
              Exclusive Small Business Partner
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">FREE</span> Back Office Assessment
              <br />
              <span className="text-2xl md:text-3xl font-normal text-gray-600">
                For {location.city} Businesses
              </span>
            </h1>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-yellow-600 mr-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-yellow-800 font-semibold">
                    Limited Time: FREE Professional Consultation
                  </p>
                  <p className="text-yellow-700 text-sm">Normally $497 - Today: $0</p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              <strong className="text-gray-900">Get Your Back Office Fixed FAST</strong> - Our
              expert bookkeepers will analyze your current systems and give you a custom action plan
              to eliminate inefficiencies and save you thousands. This FREE assessment normally
              costs $497, but we&apos;re offering it at NO CHARGE to {location.city} businesses
              right now.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <div className="flex items-center text-gray-600 bg-green-50 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-green-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                FREE 30-Minute Consultation
              </div>
              <div className="flex items-center text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom Action Plan Included
              </div>
              <div className="flex items-center text-gray-600 bg-purple-50 px-4 py-2 rounded-lg">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No Obligation - Just Results
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Value Proposition */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    What You&apos;ll Get in Your FREE Assessment
                  </h2>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      🎯 Back Office Efficiency Analysis
                    </h3>
                    <p className="text-green-700 mb-4">
                      We&apos;ll identify bottlenecks costing you time and money
                    </p>

                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      💰 Hidden Savings Report
                    </h3>
                    <p className="text-green-700 mb-4">
                      Discover thousands in potential annual savings
                    </p>

                    <h3 className="text-lg font-semibold text-green-800 mb-3">
                      📋 Custom Action Plan
                    </h3>
                    <p className="text-green-700">
                      Step-by-step implementation guide for immediate improvements
                    </p>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    <strong>Why wait?</strong> Most {location.city} businesses we assess save
                    $2,000-$10,000 annually just from our basic recommendations. This FREE
                    consultation could pay for itself immediately.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Expert Bookkeeping Services
                      </h3>
                      <p className="text-gray-600">
                        Professional financial management by certified bookkeepers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Custom Software Development
                      </h3>
                      <p className="text-gray-600">
                        Tailored solutions built by our in-house development team
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Operational Consulting
                      </h3>
                      <p className="text-gray-600">
                        Strategic guidance to optimize your business processes
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                  <p className="text-green-800 font-medium text-lg">
                    &ldquo;The FREE assessment was worth $5,000 in savings alone. They found
                    inefficiencies I never knew existed and gave me a clear roadmap to fix them.
                    Best investment we ever made.&rdquo;
                  </p>
                  <p className="text-green-600 text-sm mt-2 font-semibold">
                    - Sarah M., {location.city} Restaurant Owner
                  </p>
                </div>
              </div>

              {/* Right Column - Lead Form */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    🚀 Claim Your FREE Back Office Assessment Now
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Don&apos;t miss this opportunity to get expert insights that could save your
                    business thousands
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 font-semibold text-sm">
                      ⚡ LIMITED TIME: Only 5 FREE assessments available this week for{' '}
                      {location.city} businesses
                    </p>
                  </div>
                </div>

                <form
                  action="https://formsubmit.co/sales@thekpsgroup.com"
                  method="POST"
                  className="space-y-6"
                  id="funnel-form"
                >
                  {/* FormSubmit Configuration - Replace YOUR_EMAIL_HERE with your actual email */}
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input
                    type="hidden"
                    name="_subject"
                    value={`New Small Business Partner Lead - ${location.city}`}
                  />
                  <input type="hidden" name="_next" value="https://thekpsgroup.com/thank-you" />
                  <input
                    type="hidden"
                    name="_autoresponse"
                    value="Thank you for your interest! We'll be in touch soon with your free back office assessment."
                  />

                  <input type="hidden" name="city" value={location.city} />
                  <input type="hidden" name="citySlug" value={resolvedParams.city} />
                  <input type="hidden" name="source" value="funnel_page" />
                  <input type="hidden" name="timestamp" value={new Date().toISOString()} />

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="businessName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Smith & Associates"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="john@smithassociates.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="(469) 458-6966"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-green-700 hover:to-blue-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all transform hover:scale-105 shadow-lg"
                  >
                    🚀 GET MY FREE ASSESSMENT NOW
                  </button>

                  <div className="text-center mt-4">
                    <p className="text-sm text-gray-600 mb-2">Or call us directly:</p>
                    <a
                      href="tel:+14694586966"
                      className="inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      📞 Call (469) 458-6966
                    </a>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to receive communications from The KPS Group.
                    We respect your privacy and will never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Trusted by {location.city} Businesses
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
                <div className="text-gray-600">Years Professional Experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-gray-600">Local Businesses Served</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-3xl font-bold text-purple-600 mb-2">In-House</div>
                <div className="text-gray-600">Software Development Team</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return Object.keys(LOCATION_DATA).map((citySlug) => ({
    city: citySlug,
  }));
}
