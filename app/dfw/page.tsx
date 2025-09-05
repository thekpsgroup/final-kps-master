import DFWServicesGrid from '@/components/DFWServicesGrid';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Script from 'next/script';

const VideoTestimonial = dynamic(
  () => import('@/components/VideoTestimonial') as Promise<{
    default: React.ComponentType<{
      src?: string;
      poster?: string;
      width?: number;
      height?: number;
    }>;
  }>,
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'DFW Back-Office & Ops for Trades | The KPS Group',
  description:
    'Back-office, payroll, and operations support for trades and contractors in Dallas–Fort Worth. Book a consultation or call our DFW team today.',
  alternates: { canonical: '/dfw' },
};

const serviceAreaCities = [
  'Dallas',
  'Fort Worth',
  'Arlington',
  'Plano',
  'Frisco',
  'Irving',
  'Garland',
  'McKinney',
  'Denton',
  'Grand Prairie',
  'Richardson',
  'Lewisville',
  'Mesquite',
  'Allen',
  'Grapevine',
  'Carrollton',
  'Keller',
  'Mansfield',
  'Rockwall',
  'Rowlett',
];

export default function DfwPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thekpsgroup.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Locations',
        item: 'https://thekpsgroup.com/locations',
      },
      { '@type': 'ListItem', position: 3, name: 'DFW', item: 'https://thekpsgroup.com/dfw' },
    ],
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'The KPS Group',
    telephone: '+1-469-534-3392',
    email: 'sales@thekpsgroup.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dallas–Fort Worth Metroplex',
      addressRegion: 'TX',
      addressCountry: 'US',
    },
    serviceArea: { '@type': 'Place', name: 'Dallas–Fort Worth Metroplex' },
    url: 'https://thekpsgroup.com/dfw',
  };

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The KPS Group',
    url: 'https://thekpsgroup.com',
    email: 'sales@thekpsgroup.com',
    telephone: '+1-469-534-3392',
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How quickly can you onboard a new contractor in DFW?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We typically complete setup within days depending on complexity; we prioritize fast, accurate onboarding for trades.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you handle payroll and compliance for multiple states?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — we handle payroll, taxes, and state compliance across supported jurisdictions.',
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Script id="breadcrumb-ld" type="application/ld+json">
        {JSON.stringify(breadcrumbLd)}
      </Script>
      <Script id="localbusiness-ld" type="application/ld+json">
        {JSON.stringify(localBusinessLd)}
      </Script>
      <Script id="organization-ld" type="application/ld+json">
        {JSON.stringify(orgLd)}
      </Script>
      <Script id="faq-ld" type="application/ld+json">
        {JSON.stringify(faqLd)}
      </Script>

      {/* Hero */}
      <section aria-label="DFW hero" className="pt-6 pb-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            DFW Trades & Contractors: Back-Office, Payroll, Ops—Handled.
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Back-office and operations that keep your crews working. Fast setup, accurate payroll,
            and ongoing support.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-blue-600 text-white px-6 py-3 font-medium shadow hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Book Consultation
            </Link>
            <a
              href="tel:4695343392"
              className="inline-flex items-center justify-center rounded-2xl border border-gray-200 px-6 py-3 font-medium hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Call Now
            </a>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <span className="inline-block mr-2">⭐️ 5.0 Google</span>
            <span className="text-gray-400">· Trusted by DFW contractors</span>
          </div>
        </div>
      </section>

      {/* Services Grid + Lead Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
          <DFWServicesGrid />

          <section className="mt-8">
            <h2 className="text-xl font-semibold">Proudly serving Dallas–Fort Worth</h2>
            <p className="mt-3 text-gray-600">
              We cover the metro — here are some of the top areas we serve.
            </p>

            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {serviceAreaCities.map((c) => (
                <button
                  key={c}
                  role="listitem"
                  className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  {c}
                </button>
              ))}
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold">Customer Testimonial</h3>
            <p className="mt-2 text-gray-600">
              “They transformed our back-office and payroll — true pros.”
            </p>
            <div className="mt-4">
              <VideoTestimonial src="/videos/dfw-testimonial.mp4" poster="/videos/dfw-poster.svg" />
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold">Why DFW Contractors Choose Us</h3>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                Accuracy
                <br />
                <span className="text-2xl font-bold">99.9%</span>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                Avg payroll time
                <br />
                <span className="text-2xl font-bold">48 hrs</span>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                Cleanup timeline
                <br />
                <span className="text-2xl font-bold">2–3 weeks</span>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold">How It Works (DFW)</h3>
            <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 list-decimal list-inside">
              <li className="rounded-xl bg-white p-4 shadow-sm">Consult</li>
              <li className="rounded-xl bg-white p-4 shadow-sm">Setup</li>
              <li className="rounded-xl bg-white p-4 shadow-sm">Run</li>
            </ol>
          </section>

          <section className="mt-8">
            <h3 className="text-lg font-semibold">FAQ</h3>
            <div className="mt-4 space-y-3">
              <details className="rounded-xl bg-white p-4 border">
                <summary className="font-medium">
                  What services do you offer for contractors?
                </summary>
                <p className="mt-2 text-gray-600">
                  Back-office, payroll, bookkeeping, compliance, and operations consulting.
                </p>
              </details>
              <details className="rounded-xl bg-white p-4 border">
                <summary className="font-medium">How do you charge?</summary>
                <p className="mt-2 text-gray-600">
                  Pricing varies by service; book a consultation for a tailored quote.
                </p>
              </details>
            </div>
          </section>
        </div>

        {/* Lead form column */}
        <aside className="w-full">
          <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Get a DFW Quote</h3>
            <p className="mt-2 text-sm text-gray-600">
              No obligation — accurate quotes for contractors.
            </p>

            <form
              action="https://formsubmit.co/sales@thekpsgroup.com"
              method="POST"
              className="mt-4 space-y-4"
            >
              <input type="hidden" name="_subject" value="DFW Lead – The KPS Group" />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="text"
                name="_honeypot"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <input type="hidden" name="_next" value="/thank-you" />

              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                name="Name"
                type="text"
                required
                className="w-full rounded-xl border p-3"
              />

              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="Email"
                type="email"
                required
                className="w-full rounded-xl border p-3"
              />

              <label htmlFor="phone" className="block text-sm font-medium">
                Phone
              </label>
              <input
                id="phone"
                name="Phone Number"
                type="tel"
                className="w-full rounded-xl border p-3"
                placeholder="(469) 534-3392"
              />

              <label htmlFor="company" className="block text-sm font-medium">
                Company
              </label>
              <input
                id="company"
                name="Company"
                type="text"
                className="w-full rounded-xl border p-3"
              />

              <label htmlFor="service" className="block text-sm font-medium">
                Service Needed
              </label>
              <select id="service" name="Service" className="w-full rounded-xl border p-3">
                <option>Home Services</option>
                <option>HVAC</option>
                <option>Electrical Contractors</option>
                <option>General Contractors</option>
                <option>Operational Consulting</option>
              </select>

              <label htmlFor="message" className="block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="Message"
                rows={4}
                className="w-full rounded-xl border p-3"
              ></textarea>

              <button
                type="submit"
                className="w-full rounded-2xl bg-blue-600 text-white py-3 font-semibold"
              >
                Get My Quote
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
