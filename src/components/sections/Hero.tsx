import Image from 'next/image';
import HeroClient from './HeroClient';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-kpsNavy/5 via-transparent to-kpsGold/5" />

      <div className="container max-w-4xl relative">
        <div className="mx-auto text-center">
          {/* Trust indicator */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-kpsNavy/10 text-kpsNavy rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              The Back-Office for 50+ Growing Businesses
            </div>
          </div>

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-kpsNavy/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <Image
                  src="/kps-group/kps-square-128.png"
                  alt="The KPS Group"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
            </div>
          </div>

          <h1 className="h1 text-gray-900 mb-6 md:mb-8">
            Your Outsourced
            <span className="block text-kpsNavy">Back-Office</span>
          </h1>

          <div className="mx-auto mt-6 h-px w-24 bg-kpsNavy" />

          <p className="body-large max-w-3xl mx-auto mb-8">
            We handle your bookkeeping, payroll, tech support, websites, software, and operations
            consulting—so you can focus on running your business with{' '}
            <span className="font-semibold text-kpsNavy bg-kpsGold/20 px-3 py-1 rounded-lg">
              better financial clarity.
            </span>
          </p>

          {/* Financial empowerment message */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="body-large text-gray-700 font-medium">
              We believe business owners should know more about their finances than their
              accountant.
            </p>
            <p className="body text-gray-600 mt-2">
              Through deep personal relationships, we help you understand where your money goes and
              how to increase profits.
            </p>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-4 md:gap-8 text-sm text-gray-500 mb-12">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full smooth-hover hover:bg-gray-100 hover:shadow-sm transition-all duration-300">
              <span className="font-medium text-gray-700">Setup in 24 hours</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full smooth-hover hover:bg-gray-100 hover:shadow-sm transition-all duration-300">
              <span className="font-medium text-gray-700">Bank-level security</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full smooth-hover hover:bg-gray-100 hover:shadow-sm transition-all duration-300">
              <span className="font-medium text-gray-700">24/7 support</span>
            </div>
          </div>

          <HeroClient />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-kpsGold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-kpsNavy/10 rounded-full blur-3xl animate-pulse delay-300" />
    </section>
  );
}
