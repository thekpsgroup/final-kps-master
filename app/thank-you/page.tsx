'use client';
import GlassCard from '@/components/ui/GlassCard';
import { gtmEvent } from '@/lib/gtm';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

const NEXT_STEPS = [
  {
    icon: '📞',
    title: "We'll call within 4 hours",
    description: 'During business hours to schedule your consultation',
  },
  {
    icon: '📋',
    title: 'Quick assessment',
    description: "We'll review your current systems and identify quick wins",
  },
  {
    icon: '🎯',
    title: 'Custom proposal',
    description: 'Tailored implementation plan with clear phases and ROI',
  },
];

const LEAD_MAGNETS = [
  {
    title: 'SMB Operations Audit',
    description: '25-point checklist to identify operational gaps',
    downloadUrl: '/lead-magnets/smb-operations-audit.pdf',
    icon: '📊',
  },
  {
    title: 'Payroll Compliance Guide',
    description: 'Essential checklist for error-free payroll',
    downloadUrl: '/lead-magnets/payroll-compliance-checklist.pdf',
    icon: '💰',
  },
  {
    title: 'Website Conversion Audit',
    description: 'Optimize your site for lead generation',
    downloadUrl: '/lead-magnets/website-conversion-audit.pdf',
    icon: '🚀',
  },
];

export default function ThankYouPage() {
  useEffect(() => {
    gtmEvent('conversion_complete', {
      event_category: 'conversion',
      value: 50,
    });
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50">
                <div className="h-10 w-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4 text-gray-900">
              Thanks — we got it.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              We&apos;ll reach out the same business day. In the meantime, here&apos;s what happens
              next:
            </p>
          </motion.div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {NEXT_STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 text-center h-full">
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Magnets */}
      <section className="pb-16">
        <div className="container max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
              Free Resources While You Wait
            </h2>
            <p className="text-gray-600">
              Download these guides to start optimizing your business today
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {LEAD_MAGNETS.map((magnet, i) => (
              <motion.div
                key={magnet.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <GlassCard className="p-6 h-full">
                  <div className="text-2xl mb-3">{magnet.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2">{magnet.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{magnet.description}</p>
                  <a
                    href={magnet.downloadUrl}
                    download
                    onClick={() =>
                      gtmEvent('lead_magnet_download', {
                        magnet_type: magnet.title.toLowerCase().replace(/\s+/g, '_'),
                      })
                    }
                    className="inline-flex items-center gap-2 text-kpsNavy hover:text-kpsGold font-medium text-sm transition-colors"
                  >
                    Download PDF →
                  </a>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="pb-16">
        <div className="container max-w-3xl">
          <GlassCard className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Join 20+ companies who&apos;ve transformed their operations
            </h3>
            <div className="flex justify-center items-center gap-8 text-sm text-gray-600">
              <div>
                <div className="text-2xl font-bold text-kpsNavy">2.7×</div>
                <div>Avg. Website Conversion</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-kpsNavy">-40%</div>
                <div>Operational Errors</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-kpsNavy">15-30</div>
                <div>Days AR Reduced</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="container max-w-3xl text-center">
          <Link
            href="/modern-suite"
            className="inline-flex items-center gap-2 rounded-full bg-kpsNavy px-6 py-3 text-white font-medium shadow-md hover:opacity-95"
          >
            Explore the Modern Suite
          </Link>
        </div>
      </section>
    </>
  );
}
