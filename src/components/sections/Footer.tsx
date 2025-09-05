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
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-kpsNavy rounded-full blur-2xl animate-pulse delay-300" />
      </div>
      {/* Main Footer Content */}
      <div className="container py-8 relative z-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
            >
              <span className="inline-block h-3 w-3 rounded-full bg-kpsGold" aria-hidden="true" />
              <span className="font-semibold text-white text-lg">The KPS Group</span>
            </Link>
            <p className="text-white/80 mb-4 text-sm leading-relaxed">
              Complete business suite: payroll, finance, brand, ops, and IT solutions.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://linkedin.com/company/thekpsgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on LinkedIn"
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/thekpsgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Twitter"
                className="text-white/70 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Modern Suite Brands */}
          <div>
            <h3 className="text-base font-semibold mb-3">Modern Suite</h3>
            <div className="space-y-1">
              {brandsConfig.slice(0, 4).map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/${brand.slug}`}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  {brand.brandName}
                </Link>
              ))}
              <Link
                href="/modern-suite"
                className="block text-kpsGold hover:text-kpsGold/80 transition-colors text-sm font-medium mt-2"
              >
                View All →
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold mb-3">Quick Links</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/outcomes"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Results
                  </Link>
                </li>
                <li>
                  <Link
                    href="/consultation"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Free Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact</h3>
            <div className="space-y-2">
              <a
                href="mailto:sales@thekpsgroup.com"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
                onClick={trackEmailClick}
              >
                <Mail className="h-3 w-3" />
                sales@thekpsgroup.com
              </a>
              <a
                href="tel:14694586966"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm group"
                onClick={trackPhoneClick}
              >
                <Phone className="h-3 w-3" />
                469-458-6966
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/70">
            <span>© {currentYear} The KPS Group. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
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
