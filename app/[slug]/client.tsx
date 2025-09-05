'use client';
import EnhancedLeadForm from '@/components/forms/EnhancedLeadForm';
import ServiceHero from '@/components/sections/ServiceHero';
import ServiceProcess from '@/components/sections/ServiceProcess';
import GlassCard from '@/components/ui/GlassCard';
import MetricsDashboard from '@/components/ui/MetricsDashboard';
import SocialProof from '@/components/ui/SocialProof';
import type { BrandConfig } from '@/config/brandsConfig';
import { gtmEvent, trackBrandPageView } from '@/lib/gtm';
import { useEffect } from 'react';

// Service-specific data
const getServiceData = (brandSlug: string) => {
  type ServiceKey =
    | 'modern-pay'
    | 'modern-ledger'
    | 'modern-brands'
    | 'modern-consulting'
    | 'modern-stack';
  const serviceData = {
    'modern-pay': {
      stats: [
        { value: '500+', label: 'Businesses Served', icon: '🏢' },
        { value: '99.5%', label: 'Payroll Accuracy', icon: '✅' },
        { value: '24/7', label: 'Support Available', icon: '🕒' },
      ],
      features: [
        'Multi-state payroll compliance',
        'Automated tax filings',
        'Time & attendance integration',
        'HR policy management',
      ],
      process: [
        {
          id: 'audit',
          title: 'Payroll Audit',
          description: 'Complete review of current payroll processes and compliance gaps.',
          duration: '1-2 weeks',
          icon: '🔍',
        },
        {
          id: 'setup',
          title: 'System Setup',
          description:
            'Configure payroll platform with tax rates, employee data, and compliance rules.',
          duration: '2-3 weeks',
          icon: '⚙️',
        },
        {
          id: 'training',
          title: 'Team Training',
          description: 'Comprehensive training on payroll procedures and compliance requirements.',
          duration: '1 week',
          icon: '👥',
        },
        {
          id: 'go-live',
          title: 'Go-Live Support',
          description:
            'Full support during transition with 24/7 assistance for first payroll cycle.',
          duration: 'Ongoing',
          icon: '🚀',
        },
      ],
    },
    'modern-ledger': {
      stats: [
        { value: '95%', label: 'Faster Close Cycle', icon: '⚡' },
        { value: '100%', label: 'Reconciliation Rate', icon: '✅' },
        { value: '$50K+', label: 'Avg Monthly Savings', icon: '💰' },
      ],
      features: [
        'Monthly bookkeeping & reconciliation',
        'Historical cleanup projects',
        'Cash flow dashboards',
        'Tax-ready financials',
      ],
      process: [
        {
          id: 'assessment',
          title: 'Financial Assessment',
          description: 'Deep dive into current books, processes, and pain points.',
          duration: '1 week',
          icon: '📊',
        },
        {
          id: 'cleanup',
          title: 'Historical Cleanup',
          description: 'Systematic cleanup of past transactions and reconciliations.',
          duration: '2-6 weeks',
          icon: '🧹',
        },
        {
          id: 'systems',
          title: 'System Implementation',
          description: 'Set up automated workflows and monthly reporting cadence.',
          duration: '3-4 weeks',
          icon: '🔧',
        },
        {
          id: 'monitoring',
          title: 'Ongoing Monitoring',
          description: 'Monthly bookkeeping with proactive financial guidance.',
          duration: 'Ongoing',
          icon: '👁️',
        },
      ],
    },
    'modern-brands': {
      stats: [
        { value: '3.2x', label: 'Lead Increase', icon: '📈' },
        { value: '85%', label: 'Faster Load Times', icon: '⚡' },
        { value: '150+', label: 'Sites Delivered', icon: '🎯' },
      ],
      features: [
        'SEO-optimized websites',
        'Conversion-focused design',
        'Mobile-first development',
        'Ongoing optimization',
      ],
      process: [
        {
          id: 'discovery',
          title: 'Brand Discovery',
          description: 'Deep dive into brand identity, goals, and target audience.',
          duration: '1 week',
          icon: '🎨',
        },
        {
          id: 'design',
          title: 'Design & Development',
          description: 'Create wireframes, mockups, and build high-performance website.',
          duration: '3-4 weeks',
          icon: '💻',
        },
        {
          id: 'content',
          title: 'Content Integration',
          description: 'Populate site with optimized content and conversion elements.',
          duration: '1-2 weeks',
          icon: '📝',
        },
        {
          id: 'launch',
          title: 'Launch & Optimization',
          description: 'Deploy site with analytics, A/B testing, and ongoing improvements.',
          duration: 'Ongoing',
          icon: '🚀',
        },
      ],
    },
    'modern-consulting': {
      stats: [
        { value: '40%', label: 'Efficiency Increase', icon: '📈' },
        { value: '60%', label: 'Cost Reduction', icon: '💰' },
        { value: '95%', label: 'Client Satisfaction', icon: '⭐' },
      ],
      features: [
        'Operations assessment',
        'Process optimization',
        'Team training & development',
        'KPI implementation',
      ],
      process: [
        {
          id: 'audit',
          title: 'Operations Audit',
          description: 'Comprehensive analysis of current processes and bottlenecks.',
          duration: '1-2 weeks',
          icon: '🔍',
        },
        {
          id: 'strategy',
          title: 'Strategy Development',
          description: 'Create detailed roadmap for operational improvements.',
          duration: '2 weeks',
          icon: '📋',
        },
        {
          id: 'implementation',
          title: 'Implementation',
          description: 'Execute changes with hands-on guidance and team training.',
          duration: '4-8 weeks',
          icon: '🔧',
        },
        {
          id: 'optimization',
          title: 'Ongoing Optimization',
          description: 'Monitor results and continuously improve processes.',
          duration: 'Ongoing',
          icon: '📈',
        },
      ],
    },
    'modern-stack': {
      stats: [
        { value: '99.9%', label: 'Uptime Guarantee', icon: '🛡️' },
        { value: '50%', label: 'Cost Reduction', icon: '💰' },
        { value: '24/7', label: 'Monitoring', icon: '👁️' },
      ],
      features: [
        'Secure network infrastructure',
        'Automated backups & monitoring',
        'Custom software solutions',
        '24/7 technical support',
      ],
      process: [
        {
          id: 'assessment',
          title: 'Tech Assessment',
          description: 'Evaluate current infrastructure and identify security gaps.',
          duration: '1 week',
          icon: '🔍',
        },
        {
          id: 'architecture',
          title: 'Solution Architecture',
          description: 'Design secure, scalable technology infrastructure.',
          duration: '2 weeks',
          icon: '🏗️',
        },
        {
          id: 'implementation',
          title: 'System Implementation',
          description: 'Deploy new systems with minimal business disruption.',
          duration: '3-6 weeks',
          icon: '⚙️',
        },
        {
          id: 'support',
          title: 'Ongoing Support',
          description: '24/7 monitoring and maintenance with proactive optimization.',
          duration: 'Ongoing',
          icon: '🛟',
        },
      ],
    },
  };

  return serviceData[brandSlug as ServiceKey] || serviceData['modern-pay'];
};

export default function BrandPageClient({ brand }: { brand: BrandConfig }) {
  useEffect(() => {
    trackBrandPageView(brand.brandName);
  }, [brand.brandName]);

  const serviceData = getServiceData(brand.slug);

  // Ensure brand has required properties for ServiceHero
  const brandForHero = {
    ...brand,
    accentHex: brand.accentHex || '#00438c', // Default to KPS Navy
  };

  return (
    <article>
      {/* Enhanced Service Hero */}
      <ServiceHero
        brand={brandForHero}
        stats={serviceData.stats}
        features={serviceData.features}
        heroImage={brand.seo.ogImage}
      />

      {/* Service Process Section */}
      <ServiceProcess
        steps={serviceData.process}
        brandColor={brandForHero.accentHex}
        title="Our Proven Process"
        subtitle="From chaos to clarity in weeks, not months"
      />

      {/* Performance Metrics */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600">Real metrics from real businesses like yours</p>
          </div>

          <MetricsDashboard
            metrics={[
              { label: 'Client Satisfaction', value: 95, unit: '%', change: 12, progress: 95 },
              {
                label: 'Time to Implementation',
                value: 4.2,
                unit: 'weeks',
                change: -18,
                progress: 85,
              },
              { label: 'Cost Savings', value: 35, unit: '%', change: 35, progress: 88 },
              { label: 'Process Efficiency', value: 2.4, unit: 'x', change: 140, progress: 92 },
            ]}
            brandColor={brandForHero.accentHex}
            layout="grid"
          />
        </div>
      </section>

      {/* Service Details Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Service Overview</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{brand.summary}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pain Points */}
            <GlassCard className="p-8" glassLevel="branded" brandColor={brandForHero.accentHex}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚠️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Pain We Solve</h3>
              </div>
              <ul className="space-y-3">
                {brand.pains.slice(0, 4).map((pain, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: brandForHero.accentHex }}
                    />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Outcomes */}
            <GlassCard className="p-8" glassLevel="branded" brandColor={brandForHero.accentHex}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Outcomes You Get</h3>
              </div>
              <ul className="space-y-3">
                {brand.outcomes.slice(0, 4).map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: brandForHero.accentHex }}
                    />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>

            {/* Services */}
            <GlassCard className="p-8" glassLevel="branded" brandColor={brandForHero.accentHex}>
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">What We Do</h3>
              </div>
              <ul className="space-y-3">
                {brand.services.slice(0, 4).map((service, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: brandForHero.accentHex }}
                    />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">Everything you need to know about our services</p>
          </div>

          <GlassCard className="overflow-hidden">
            {brand.faqs.map((faq, i) => (
              <details key={i} className="group border-b border-gray-100 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 hover:bg-gray-50/50 transition-colors duration-200">
                  <span className="font-medium text-gray-900 pr-4 text-left">{faq.q}</span>
                  <span className="text-gray-400 transition-transform duration-300 group-open:rotate-90 text-lg flex-shrink-0">
                    ›
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </GlassCard>

          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: brand.faqs.map((faq) => ({
                  '@type': 'Question',
                  name: faq.q,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                  },
                })),
              }),
            }}
          />
        </div>
      </section>

      {/* Lead Generation Section */}
      <section id="lead" className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tell us about your needs and we&apos;ll respond same business day with a custom
            solution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/consultation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
              <span>→</span>
            </a>

            {brand.externalUrl && (
              <a
                href={brand.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
              >
                Visit {brand.brandName} Website
                <span>↗</span>
              </a>
            )}
          </div>

          <EnhancedLeadForm
            brand={brandForHero}
            onSubmit={async (data) => {
              // Handle form submission
              console.log('Form submitted:', data);
              // Here you would typically send to your API
              await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
            }}
          />
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">Real results from real businesses like yours</p>
          </div>

          <SocialProof
            variant="reviews"
            category={
              brand.slug === 'modern-pay'
                ? 'consulting'
                : brand.slug === 'modern-ledger'
                ? 'bookkeeping'
                : brand.slug === 'modern-brands'
                ? 'modernization'
                : brand.slug === 'modern-consulting'
                ? 'growth'
                : 'consulting'
            }
            className="max-w-2xl mx-auto"
          />
        </div>
      </section>

      {/* Lead Magnet CTA */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl text-center">
          <GlassCard className="p-8" glassLevel="branded" brandColor={brandForHero.accentHex}>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Free Resource: Operations Audit Checklist
            </h3>
            <p className="text-gray-600 mb-6">
              25-point audit to identify gaps in your business operations and unlock hidden
              potential
            </p>
            <a
              href="/lead-magnets/smb-operations-audit.pdf"
              download
              onClick={() =>
                gtmEvent('brand_page_lead_magnet', {
                  brand: brand.brandName,
                  magnet_type: 'operations_audit',
                })
              }
              className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: brandForHero.accentHex }}
            >
              Download Free Audit
              <span className="text-lg">📥</span>
            </a>
          </GlassCard>
        </div>
      </section>
    </article>
  );
}
