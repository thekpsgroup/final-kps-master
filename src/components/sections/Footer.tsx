'use client';
import { brandsConfig } from '@/config/brandsConfig';
import { trackEmailClick, trackPhoneClick } from '@/lib/gtm';
import { Linkedin, Mail, Phone, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-kpsNavy text-white border-t border-white/10 relative overflow-hidden"
      role="contentinfo"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-kpsGold rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-kpsNavy rounded-full blur-3xl animate-pulse delay-300" />
      </div>
      {/* Main Footer Content */}
      <div className="container py-16 relative z-10">
        <div className="grid gap-12 md:grid-cols-4 lg:gap-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
            >
              <span className="inline-block h-3 w-3 rounded-full bg-kpsGold" aria-hidden="true" />
              <span className="font-semibold text-white text-xl">The KPS Group</span>
            </Link>
            <p className="text-white/80 mb-6 text-base leading-relaxed">
              Complete business suite: payroll, finance, brand, ops, and IT solutions.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com/company/thekpsgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="text-white/70 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/thekpsgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-white/70 hover:text-white transition-all duration-300 p-2 rounded-lg hover:bg-white/10"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Modern Suite Brands */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Modern Suite</h3>
            <div className="space-y-3">
              {brandsConfig.slice(0, 4).map((brand) =>
                brand.externalUrl ? (
                  <a
                    key={brand.slug}
                    href={brand.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1"
                  >
                    {brand.brandName}
                  </a>
                ) : (
                  <Link
                    key={brand.slug}
                    href={`/${brand.slug}`}
                    className="block text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1"
                  >
                    {brand.brandName}
                  </Link>
                ),
              )}
              <Link
                href="/modern-suite"
                className="block text-kpsGold hover:text-kpsGold/80 transition-all duration-300 text-base font-medium mt-4 hover:translate-x-1"
              >
                View All →
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/outcomes"
                    className="text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1 block"
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consultation"
                    className="text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1 block"
                  >
                    Free Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1 block"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-all duration-300 text-base hover:translate-x-1 block"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <div className="space-y-4">
              <a
                href="mailto:sales@thekpsgroup.com"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 text-base group"
                onClick={trackEmailClick}
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  sales@thekpsgroup.com
                </span>
              </a>
              <a
                href="tel:14694586966"
                className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 text-base group"
                onClick={trackPhoneClick}
              >
                <Phone className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  (469) 458-6966
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
            <span>© {currentYear} The KPS Group. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-all duration-300 hover:translate-x-1"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'The KPS Group',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://thekpsgroup.com',
            logo: `${
              process.env.NEXT_PUBLIC_SITE_URL || 'https://thekpsgroup.com'
            }/kps-group/kps-square-512.png`,
            description:
              'Parent hub for the Modern Suite: comprehensive business solutions including payroll, finance, branding, operations, and IT/software for growing businesses.',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+1-469-458-6966',
              email: 'sales@thekpsgroup.com',
              contactType: 'sales',
            },
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'TX',
              addressCountry: 'US',
            },
            sameAs: ['https://linkedin.com/company/thekpsgroup', 'https://twitter.com/thekpsgroup'],
          }),
        }}
      />
    </footer>
  );
}
