import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact The KPS Group | Business Operations Experts',
  description:
    'Ready to transform your business operations? Contact The KPS Group for expert bookkeeping, payroll, IT support, and consulting services. We respond within 2-4 hours.',
  keywords:
    'contact KPS Group, business operations experts, bookkeeping services, payroll services, IT support, business consulting',
  openGraph: {
    title: 'Contact The KPS Group | Business Operations Experts',
    description:
      'Ready to transform your business operations? Contact The KPS Group for expert bookkeeping, payroll, IT support, and consulting services.',
    type: 'website',
    url: '/contact',
    siteName: 'The KPS Group',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact The KPS Group | Business Operations Experts',
    description:
      'Ready to transform your business operations? Contact The KPS Group for expert bookkeeping, payroll, IT support, and consulting services.',
  },
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* hero */}
      <section className="py-24">
        <div className="container max-w-3xl">
          <div className="mx-auto text-center">
            <h1 className="h1 text-gray-900 mb-3 md:mb-4">Let&apos;s talk about your business</h1>
            <p className="body text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ready to transform your operations? We&apos;re here to help you implement the Modern
              Suite and see real results on your P&L.
            </p>
          </div>
        </div>
      </section>

      {/* contact methods */}
      <section className="py-24">
        <div className="container max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <div className="p-8 border border-black/5 shadow-glass bg-white/70 backdrop-blur-md rounded-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4">
                  Get in touch
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <a
                      href="mailto:sales@thekpsgroup.com"
                      className="text-kpsNavy hover:text-kpsGold transition-colors focus:outline-none focus:ring-2 focus:ring-kpsNavy/60 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      sales@thekpsgroup.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <a
                      href="tel:14694586966"
                      className="text-kpsNavy hover:text-kpsGold transition-colors focus:outline-none focus:ring-2 focus:ring-kpsNavy/60 focus:ring-offset-2 rounded-md px-1 py-0.5"
                    >
                      469-458-6966
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Response time</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We typically respond within 2-4 hours during business hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="p-8 border border-black/5 shadow-glass bg-white/70 backdrop-blur-md rounded-2xl">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4">
                  What to expect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Initial consultation</h3>
                    <p className="text-gray-700 leading-relaxed">
                      30-minute call to understand your current challenges and goals.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Assessment</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We&apos;ll review your current systems and identify quick wins.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Proposal</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Custom implementation plan with clear phases and outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container max-w-3xl">
          <div className="text-center">
            <div>
              <div>
                <Link href="/consultation" className="btn-cta btn-cta-primary">
                  Book Your Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
