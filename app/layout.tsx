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
import Script from 'next/script';
import { Suspense } from 'react';
import './globals.css';

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="canonical"
          href={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.thekpsgroup.com'}/`}
        />
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBN6BJSD');
          `}
        </Script>
        <Script id="organization-schema" type="application/ld+json">
          {JSON.stringify(generateOrganizationSchema())}
        </Script>
      </head>
      <body className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
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
