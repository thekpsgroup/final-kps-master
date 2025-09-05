import ClientShowcase from '@/components/sections/ClientShowcase';
import OfficeShowcase from '@/components/sections/OfficeShowcase';
import TeamShowcase from '@/components/sections/TeamShowcase';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About The KPS Group | Our Story, Team & Mission',
  description:
    'Learn about The KPS Group - our mission to simplify business operations through innovative technology and expert guidance. Meet our leadership team.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kpsNavy/10 via-transparent to-kpsGold/10" />

        <div className="container max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-6">
                <span>About The KPS Group</span>
              </div>

              <h1 className="h1 text-gray-900 mb-6">
                Building the Future of
                <span className="block text-kpsNavy">Business Operations</span>
              </h1>

              <p className="body-large text-gray-600 leading-relaxed mb-8">
                We provide premium business solutions through our selective, boutique approach.
                Founded by operators, for operators — we partner with exceptional businesses that
                deserve world-class systems and personalized service.
              </p>

              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-kpsNavy rounded-full"></span>
                  <span className="text-gray-600">Founded 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-kpsGold rounded-full"></span>
                  <span className="text-gray-600">5 Modern Brands</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-kpsNavy rounded-full"></span>
                  <span className="text-gray-600">20+ Companies Helped</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
                <div className="text-center mb-6">
                  <Image
                    src="/kps-group/kps-square-256.png"
                    alt="The KPS Group"
                    width={80}
                    height={80}
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl"
                  />
                  <h3 className="text-2xl font-bold text-gray-900">The KPS Group</h3>
                  <p className="text-kpsNavy font-medium">Modern Business Solutions</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Mission</span>
                    <span className="font-medium text-gray-900">Simplify Operations</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Vision</span>
                    <span className="font-medium text-gray-900">Accessible Excellence</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Values</span>
                    <span className="font-medium text-gray-900">People First</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Focus</span>
                    <span className="font-medium text-gray-900">Selective Excellence</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-kpsGold/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-kpsNavy/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-gray-50">
        <div className="container max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="h2 tracking-tight text-gray-900 mb-6">Our Story</h2>
            <p className="body-large text-gray-600 leading-relaxed">
              From identifying a problem to building the solution — here&apos;s how The KPS Group
              came to be.
            </p>
          </div>

          <div className="space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-kpsNavy rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Problem</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We saw too many small and medium businesses struggling with fragmented tools,
                    manual processes, and expensive consultants. Enterprise solutions were too
                    complex and costly, while basic tools lacked the sophistication needed to scale.
                    We decided to focus on a select group of exceptional businesses that deserve
                    premium service.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-kpsGold rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Solution</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We built focused, integrated solutions that work together seamlessly. Each brand
                    in our Modern Suite addresses a specific business function while sharing data
                    and insights across the entire platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-200">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-kpsNavy rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">The Impact</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We work with a carefully selected group of exceptional businesses, providing
                    them with enterprise-grade tools and expert guidance. Our boutique approach
                    ensures each client receives personalized attention and customized solutions
                    that drive meaningful results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Showcase */}
      <OfficeShowcase />

      {/* Client Showcase */}
      <ClientShowcase />

      {/* Team Showcase */}
      <TeamShowcase />

      {/* Mission Statement */}
      <section className="py-24 bg-gradient-to-r from-kpsNavy to-kpsGold">
        <div className="container max-w-4xl text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              To provide exceptional businesses with the sophisticated tools, systems, and expertise
              needed to compete with enterprise-level operations — through our selective, boutique
              approach to client partnerships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/modern-suite" className="btn-cta btn-cta-secondary">
                Explore Our Solutions
              </a>
              <a href="/consultation" className="btn-cta btn-cta-outline">
                Start Your Journey
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
