'use client';
import { Button } from '@/components/ui/button';
import { showToast } from '@/components/ui/toast';
import type { BrandConfig } from '@/config/brandsConfig';
import { generateFAQSchema } from '@/lib/locationData';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface SqueezePageTemplateProps {
  brand: BrandConfig;
}

export default function SqueezePageTemplate({ brand }: SqueezePageTemplateProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    need: '',
    _honey: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Intersection Observer for lazy animations
  const { ref: benefitsRef, inView: benefitsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: faqRef, inView: faqInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      showToast.error('Please fill in all required fields.');
      return;
    }

    // Submit to FormSubmit
    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });
      submitData.append('_captcha', 'false');
      submitData.append('_next', 'https://www.thekpsgroup.com/thank-you');
      submitData.append('_subject', `Squeeze Page Lead - ${brand.brandName}`);
      submitData.append('_honeypot', '');

      const response = await fetch('https://formsubmit.co/sales@thekpsgroup.com', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        showToast.success("Thank you! We'll be in touch within 24 hours.");
        setIsSubmitted(true);
      } else {
        showToast.error('There was an error submitting your information. Please try again.');
      }
    } catch (error) {
      console.error('Lead submission error:', error);
      showToast.error('Network error. Please check your connection and try again.');
      // For now, don't set submitted to maintain form state
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h1>
          <p className="text-gray-600 mb-6">
            We&apos;ve received your information and will be in touch within 24 hours to discuss how{' '}
            {brand.brandName} can help your business.
          </p>
          <Link href="/" className="text-kpsGold hover:text-kpsGold/80 font-medium">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-kpsGold" />
            <span className="font-medium">The KPS Group</span>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-6">
                  <span className="text-sm font-medium text-gray-600">Introducing</span>
                  <span
                    className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: brand.accentHex }}
                  >
                    {brand.brandName}
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                  {brand.tagline}
                </h1>

                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {brand.summary}
                </p>

                {/* Social Proof Bar */}
                <div className="flex items-center justify-center gap-8 mb-8 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>20+ Happy Clients</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span>4.9/5 Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Average 40% Growth</span>
                  </div>
                </div>

                {/* Trust Logos */}
                <div className="flex items-center justify-center gap-8 mb-12 opacity-60">
                  <div className="text-gray-600 font-semibold">TRUSTED BY</div>
                  <div className="w-px h-6 bg-gray-300" />
                  <div className="flex items-center gap-6">
                    <div className="text-gray-600 font-medium">QuickBooks</div>
                    <div className="text-gray-600 font-medium">Gusto</div>
                    <div className="text-gray-600 font-medium">Xero</div>
                    <div className="text-gray-600 font-medium">Brex</div>
                  </div>
                </div>
              </motion.div>

              {/* Lead Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="max-w-md mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Started Today</h2>
                  <p className="text-gray-600 mb-6">
                    Tell us about your needs. No commitment required.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="John Smith"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Acme Inc."
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="need"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        What do you need help with?
                      </label>
                      <textarea
                        id="need"
                        name="need"
                        value={formData.need}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Briefly describe your biggest challenge..."
                      />
                    </div>

                    {/* Honeypot */}
                    <div className="hidden">
                      <input
                        type="text"
                        name="_honey"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData._honey || ''}
                        onChange={handleChange}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-kpsGold text-kpsNavy hover:bg-kpsGold/90 font-semibold py-3 text-lg"
                    >
                      Get My Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </form>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    We respect your privacy. No spam, ever.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section ref={benefitsRef} className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                Why Choose {brand.brandName}?
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">✗</span>
                    </div>
                    Before {brand.brandName}
                  </h3>
                  <ul className="space-y-4">
                    {brand.pains.slice(0, 4).map((pain, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <span className="text-red-500 mt-1">•</span>
                        <span>{pain}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: brand.accentHex }}
                    >
                      ✓
                    </div>
                    After {brand.brandName}
                  </h3>
                  <ul className="space-y-4">
                    {brand.outcomes.slice(0, 4).map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600">
                        <Check className="text-green-500 mt-1 flex-shrink-0" size={16} />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section ref={servicesRef} className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-gray-900 mb-8"
              >
                Everything You Get
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {brand.services.slice(0, 6).map((service, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mb-4 mx-auto"
                      style={{ backgroundColor: brand.accentHex }}
                    >
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{service}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location Services Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                {brand.brandName} in Major Cities
              </h2>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                We provide {brand.brandName.toLowerCase()} services across the United States. Find
                your city below to learn more about local service availability.
              </p>

              {/* Popular Cities Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                {[
                  { name: 'Atlanta', slug: 'atlanta' },
                  { name: 'Austin', slug: 'austin' },
                  { name: 'Boston', slug: 'boston' },
                  { name: 'Chicago', slug: 'chicago' },
                  { name: 'Dallas', slug: 'dallas' },
                  { name: 'Denver', slug: 'denver' },
                  { name: 'Houston', slug: 'houston' },
                  { name: 'Los Angeles', slug: 'los-angeles' },
                  { name: 'Miami', slug: 'miami' },
                  { name: 'Nashville', slug: 'nashville' },
                  { name: 'New York', slug: 'new-york' },
                  { name: 'Phoenix', slug: 'phoenix' },
                ].map((city) => {
                  const serviceSlug =
                    brand.slug === 'modern-pay'
                      ? 'payroll'
                      : brand.slug === 'modern-ledger'
                      ? 'bookkeeping'
                      : brand.slug === 'modern-brands'
                      ? 'branding'
                      : brand.slug === 'modern-consulting'
                      ? 'consulting'
                      : 'software';

                  return (
                    <Link
                      key={city.slug}
                      href={`/${serviceSlug}/${city.slug}`}
                      className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors text-center"
                    >
                      <div className="font-semibold text-gray-900 text-sm">{city.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Local Service</div>
                    </Link>
                  );
                })}
              </div>

              {/* ADP Alternatives Special Section for Payroll */}
              {brand.slug === 'modern-pay' && (
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    ADP Payroll Alternatives
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Frustrated with ADP? Discover why businesses across the US are switching to
                    Modern Pay for better service and lower costs.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {[
                      { name: 'Atlanta', slug: 'atlanta' },
                      { name: 'Chicago', slug: 'chicago' },
                      { name: 'Dallas', slug: 'dallas' },
                      { name: 'Houston', slug: 'houston' },
                      { name: 'Los Angeles', slug: 'los-angeles' },
                      { name: 'New York', slug: 'new-york' },
                    ].map((city) => (
                      <Link
                        key={city.slug}
                        href={`/payroll/adp-alternatives/${city.slug}`}
                        className="bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg border border-red-200 hover:border-red-300 transition-colors text-sm font-medium text-red-700"
                      >
                        ADP Alternatives {city.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section ref={faqRef} className="py-16 bg-white">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-bold text-center text-gray-900 mb-12"
              >
                Common Questions
              </motion.h2>
              <div className="space-y-4">
                {brand.faqs.slice(0, 3).map((faq, index) => (
                  <details key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <summary className="font-semibold text-gray-900 cursor-pointer hover:text-gray-700">
                      {faq.q}
                    </summary>
                    <p className="mt-3 text-gray-600 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sticky CTA */}
        <section className="py-16 bg-gradient-to-r from-kpsNavy to-kpsNavy/90 text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join hundreds of businesses that have already made the switch to {brand.brandName}.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-kpsGold text-kpsNavy hover:bg-kpsGold/90 font-semibold px-8 py-4 text-lg"
            >
              <Link href="#hero">Get Started Today</Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-kpsNavy text-white py-8">
        <div className="container text-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
          >
            <span className="inline-block h-3 w-3 rounded-full bg-kpsGold" />
            <span className="font-semibold text-lg">The KPS Group</span>
          </Link>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} The KPS Group. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: brand.brandName,
            description: brand.summary,
            provider: {
              '@type': 'Organization',
              name: 'The KPS Group',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thekpsgroup.com',
            },
            serviceType: brand.tagline,
            areaServed: {
              '@type': 'Country',
              name: 'United States',
            },
            offers: {
              '@type': 'Offer',
              description: `Professional ${brand.brandName.toLowerCase()} services`,
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500',
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      {brand.faqs && brand.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateFAQSchema(brand.faqs)),
          }}
        />
      )}
    </div>
  );
}
