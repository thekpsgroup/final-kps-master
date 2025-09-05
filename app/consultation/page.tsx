import MobileOptimizedForm from '@/components/forms/MobileOptimizedForm';

export default function ConsultationPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-kpsNavy/5 via-transparent to-kpsGold/5" />

        <div className="container max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Value Prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-6">
                <span>Free 30-Minute Business Audit</span>
              </div>

              <h1 className="h1 text-gray-900 mb-6">
                Discover Your
                <span className="block text-kpsNavy">Growth Potential</span>
              </h1>

              <p className="body-large text-gray-600 leading-relaxed mb-8">
                In just 30 minutes, we&apos;ll identify exactly where your business is losing time
                and money—and show you how to fix it.
              </p>

              {/* Benefits */}
              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-kpsGold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-kpsGold text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Identify 10-40 hours of savings per month
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-kpsGold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-kpsGold text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Learn where your money goes and how to save
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-kpsGold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-kpsGold text-lg">✓</span>
                  </div>
                  <span className="text-gray-700 leading-relaxed">
                    Get custom roadmap for your business
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-kpsGold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-kpsGold text-lg">✓</span>
                  </div>
                  <span className="text-gray-700">No obligation, no sales pressure</span>
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span>5.0 (50+ reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Usually responds in 2 hours</span>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Free Audit</h2>
                  <p className="text-gray-600">Takes 2 minutes, saves you 40+ hours monthly</p>
                </div>

                <MobileOptimizedForm />

                <div className="mt-6 text-center text-sm text-gray-500">
                  Your information is 100% secure and confidential
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-kpsGold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-kpsNavy/10 rounded-full blur-3xl" />
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-gray-50">
        <div className="container max-w-4xl">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Join our selective group of exceptional businesses
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-kpsGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-kpsGold text-2xl">$</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">$500K+</div>
              <div className="text-gray-600 leading-relaxed">
                In cost savings generated for our clients
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-kpsNavy text-2xl">•</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">40+</div>
              <div className="text-gray-600 leading-relaxed">Hours saved per month average</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsGold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-kpsGold text-2xl">↑</span>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">2.7x</div>
              <div className="text-gray-600 leading-relaxed">Average growth rate increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24">
        <div className="container max-w-4xl">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What to Expect in Your Audit
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-kpsNavy text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Business Assessment</h4>
              <p className="text-gray-600 leading-relaxed">
                We&apos;ll review your current operations, pain points, and growth goals to
                understand your unique situation.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-kpsNavy text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Opportunity Analysis</h4>
              <p className="text-gray-600 leading-relaxed">
                We&apos;ll identify specific areas where you can save time, reduce costs, and
                improve efficiency.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-kpsNavy text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">Custom Roadmap</h4>
              <p className="text-gray-600 leading-relaxed">
                You&apos;ll leave with a clear action plan and priority list—whether you work with
                us or not.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
