import { ErrorBoundary } from '@/components/ErrorBoundary';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { LazyExitIntentPopup } from '@/components/LazyComponents';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import FloatingReviews from '@/components/ui/FloatingReviews';
import PerformanceMonitor from '@/components/ui/PerformanceMonitor';
import { ToastContainer } from '@/components/ui/toast';
import { generateOrganizationSchema } from '@/lib/locationData';
import { reportWebVitals } from '@/lib/performance';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'The KPS Group — Modern Suite',
  description: 'The parent hub for the Modern Suite by The KPS Group.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'The KPS Group',
    title: 'The KPS Group — Modern Suite',
    description: 'The parent hub for the Modern Suite by The KPS Group.',
    images: [
      {
        url: '/kps-group/kps-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'The KPS Group - Modern Suite',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@thekpsgroup',
    creator: '@thekpsgroup',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        {/* Font loading with performance optimizations */}
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="PLACEHOLDER_VERIFICATION_CODE" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Canonical URL */}
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com'}/`}
        />{' '}
        {/* Critical CSS inlining for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for above-the-fold content */
            body { font-family: Inter, system-ui, -apple-system, sans-serif; }
            .h1 { font-size: 2.25rem; line-height: 1.1; font-weight: 900; }
            @media (min-width: 768px) { .h1 { font-size: 3rem; } }
            @media (min-width: 1024px) { .h1 { font-size: 3.75rem; } }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .skip-link { position: absolute; top: -40px; left: 6px; background: #00438c; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; z-index: 1000; font-weight: 600; }
            .skip-link:focus { top: 6px; outline: 4px solid #cab068; outline-offset: 2px; }
          `,
          }}
        />
        {/* Resource hints for critical resources */}
        <link rel="preload" href="/kps-group/kps-square-128.png" as="image" fetchPriority="high" />
        <link rel="preload" href="/kps-group/kps-og-1200x630.png" as="image" />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBN6BJSD');
          `}
        </Script>
        {/* Organization Schema */}
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema())}
        </Script>
        {/* Service Schema for homepage */}
        <Script id="service-schema" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Modern Suite Business Operations',
            description:
              'Comprehensive business operations including bookkeeping, payroll, IT support, branding, consulting, and software solutions for businesses nationwide.',
            provider: {
              '@type': 'Organization',
              name: 'The KPS Group',
            },
            areaServed: [
              {
                '@type': 'Country',
                name: 'United States',
              },
              {
                '@type': 'State',
                name: 'Texas',
              }
            ],
            serviceType: 'Business Operations Management',
          })}
        </Script>
        {/* LocalBusiness Schema */}
        <Script id="localbusiness-schema" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'The KPS Group',
            description:
              'Leading provider of comprehensive business operations solutions including bookkeeping, payroll, IT support, branding, consulting, and software solutions. Serving businesses nationwide with strong local presence in Texas.',
            url: 'https://www.thekpsgroup.com',
            telephone: ['+1-469-458-6966', '+1-469-534-3392'],
            email: 'sales@thekpsgroup.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Dallas–Fort Worth Metroplex',
              addressRegion: 'TX',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '32.7767',
              longitude: '-96.7970',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Business Services',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Nationwide Business Operations',
                    description: 'Remote business operations services for companies across all 50 states.'
                  }
                }
              ]
            },
            areaServed: [
              // Core DFW Cities
              { '@type': 'City', name: 'Dallas' },
              { '@type': 'City', name: 'Fort Worth' },
              { '@type': 'City', name: 'Arlington' },
              { '@type': 'City', name: 'Plano' },
              { '@type': 'City', name: 'Frisco' },
              { '@type': 'City', name: 'Irving' },
              { '@type': 'City', name: 'Garland' },
              { '@type': 'City', name: 'McKinney' },
              { '@type': 'City', name: 'Denton' },
              { '@type': 'City', name: 'Grand Prairie' },
              { '@type': 'City', name: 'Richardson' },
              { '@type': 'City', name: 'Lewisville' },
              { '@type': 'City', name: 'Mesquite' },
              { '@type': 'City', name: 'Allen' },
              { '@type': 'City', name: 'Grapevine' },
              { '@type': 'City', name: 'Carrollton' },
              { '@type': 'City', name: 'Keller' },
              { '@type': 'City', name: 'Mansfield' },
              { '@type': 'City', name: 'Rockwall' },
              { '@type': 'City', name: 'Rowlett' },
              // Extended Service Area
              { '@type': 'City', name: 'Royse City' },
              { '@type': 'City', name: 'Fate' },
              { '@type': 'City', name: 'Greenville' },
              { '@type': 'City', name: 'Tyler' },
              { '@type': 'City', name: 'Waco' },
              { '@type': 'City', name: 'Sherman' },
              { '@type': 'City', name: 'Denison' },
              { '@type': 'City', name: 'Paris' },
              { '@type': 'City', name: 'Texarkana' },
              { '@type': 'City', name: 'Corsicana' },
              { '@type': 'City', name: 'Athens' },
              { '@type': 'City', name: 'Palestine' },
              { '@type': 'City', name: 'Terrell' },
              { '@type': 'City', name: 'Forney' },
              { '@type': 'City', name: 'Sulphur Springs' },
              { '@type': 'City', name: 'Mount Pleasant' },
              { '@type': 'City', name: 'Bonham' },
              { '@type': 'City', name: 'Canton' },
              { '@type': 'City', name: 'Kaufman' },
              { '@type': 'City', name: 'Mineola' },
              { '@type': 'City', name: 'Van' },
              { '@type': 'City', name: 'Quitman' },
              { '@type': 'City', name: 'Winnsboro' },
              { '@type': 'City', name: 'Emory' },
              { '@type': 'City', name: 'Gun Barrel City' },
            ],
            priceRange: '$$',
            paymentAccepted: 'Cash, Credit Card',
            currenciesAccepted: 'USD',
          })}
        </Script>
      </head>
      <body
        className={`${inter.variable} bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 font-sans`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBN6BJSD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Skip link for keyboard navigation */}
        <a href="#main-content" className="skip-link" aria-label="Skip to main content">
          Skip to main content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={null}>
            <GoogleAnalytics />
          </Suspense>
          <ErrorBoundary>
            <Header />
            <main id="main-content" className="pt-20" role="main">
              {children}
            </main>
            <Footer />
            <LazyExitIntentPopup />
            <FloatingReviews />
            <Analytics />
            <ToastContainer />
            <PerformanceMonitor />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

// Export performance monitoring
export { reportWebVitals };
