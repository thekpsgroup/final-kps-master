import Hero from '@/components/sections/Hero';
import PhilosophySection from '@/components/sections/PhilosophySection';
import { LoadingSkeleton } from '@/components/ui/LoadingComponents';
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

export default function HomePage() {
  return (
    <>
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
