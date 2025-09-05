import Hero from '@/components/sections/Hero';
import { LoadingSkeleton } from '@/components/ui/LoadingComponents';
import MotionButton from '@/components/ui/MotionButton';
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
        <section className="relative py-24 overflow-hidden" aria-labelledby="philosophy-heading">
          <div className="absolute inset-0 bg-gradient-to-r from-kpsNavy to-slate-800" />

          <div className="container max-w-4xl relative">
            <div className="text-center text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium mb-6 border border-white/20">
                Our Philosophy
              </div>

              <h2 id="philosophy-heading" className="text-3xl md:text-5xl font-bold mb-6">
                Your Business, Our Back-Office
              </h2>

              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                Small business owners shouldn&apos;t waste time on bookkeeping, payroll headaches,
                tech support calls, or website updates. You should be growing your business with
                clear, accurate information.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-kpsGold">What We Handle:</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Monthly bookkeeping & financial reporting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Payroll processing & tax compliance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Website development & maintenance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>IT support & software development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Operations consulting & strategy</span>
                    </li>
                  </ul>
                </div>

                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4 text-kpsGold">What You Get:</h3>
                  <ul className="space-y-2 text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Clean, accurate financial information</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>More time to focus on your core business</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Professional systems that scale with you</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Deep personal relationships, not just transactions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Financial literacy - know more than your accountant</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Clear insight into where money goes and how to save</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-kpsGold">•</span>
                      <span>Peace of mind and better sleep</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <MotionButton
                  href="/consultation"
                  variant="secondary"
                  className="bg-kpsGold text-kpsNavy hover:bg-kpsGold/90"
                >
                  See How We Can Help Your Business
                </MotionButton>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 -left-20 w-40 h-40 bg-kpsGold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        </section>

        {/* Client Showcase */}
        <ClientShowcase />

        {/* Team Showcase */}
        <TeamShowcase />
      </main>
    </>
  );
}
