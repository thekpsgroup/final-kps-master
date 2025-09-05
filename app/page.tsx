import Hero from '@/components/sections/Hero';
import PhilosophySection from '@/components/sections/PhilosophySection';
import StructuredData, { COMMON_FAQS, generateBreadcrumbs } from '@/components/StructuredData';
import { LoadingSkeleton } from '@/components/ui/LoadingComponents';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const SuiteGrid = dynamic(() => import('@/components/sections/SuiteGrid'), {
  loading: () => <LoadingSkeleton className="h-96 w-full rounded-3xl" />,
});
const ClientShowcase = dynamic(() => import('@/components/sections/ClientShowcase'), {
  loading: () => <LoadingSkeleton className="h-64 w-full rounded-2xl" />,
});
const TeamShowcase = dynamic(() => import('@/components/sections/TeamShowcase'), {
  loading: () => <LoadingSkeleton className="h-64 w-full rounded-2xl" />,
});
const LocalDFWShowcase = dynamic(() => import('@/components/sections/LocalDFWShowcase'), {
  loading: () => <LoadingSkeleton className="h-64 w-full rounded-2xl" />,
});

export const metadata: Metadata = {
  title:
    'The KPS Group — Back-Office Solutions for Construction, Home Services & Contractors | Modern Suite',
  description:
    "Transform your business operations with The KPS Group's Modern Suite. Expert bookkeeping, payroll, IT support, and consulting for construction companies, home services, HVAC, plumbing, electrical, and general contractors. Save 40+ hours monthly.",
  keywords:
    'outsourced bookkeeping, business operations, payroll services, IT support, business consulting, back-office solutions, construction bookkeeping, home services payroll, HVAC consulting, plumbing software, electrical branding, general contractor operations',
  openGraph: {
    title: 'The KPS Group — Back-Office Solutions for Construction, Home Services & Contractors',
    description:
      "Transform your business operations with The KPS Group's Modern Suite. Expert bookkeeping, payroll, IT support, and consulting for construction companies, home services, HVAC, plumbing, electrical, and general contractors.",
    type: 'website',
    url: '/',
    siteName: 'The KPS Group',
    images: [
      {
        url: '/kps-group/kps-og-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'The KPS Group - Modern Business Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The KPS Group — Back-Office Solutions for Construction, Home Services & Contractors',
    description:
      "Transform your business operations with The KPS Group's Modern Suite. Expert bookkeeping, payroll, IT support, and consulting for construction companies, home services, HVAC, plumbing, electrical, and general contractors.",
    images: ['/kps-group/kps-og-1200x630.png'],
  },
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <StructuredData type="faq" faqs={COMMON_FAQS.homepage} />
      <StructuredData type="breadcrumb" breadcrumbs={generateBreadcrumbs('home')} />
      <Hero />
      <main>
        <SuiteGrid />

        {/* Back-Office Philosophy Section */}
        <PhilosophySection />

        {/* Client Showcase */}
        <ClientShowcase />

        {/* Team Showcase */}
        <TeamShowcase />
      </main>
    </>
  );
}
