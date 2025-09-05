import SuiteGridClient from './SuiteGridClient';

type Brand = {
  name: string;
  slug: string;
  logoSrc: string;
  pill: string;
  tagline: string;
  href: string;
  popular?: boolean;
  featured?: boolean;
  savings?: string;
};

const brands: Brand[] = [
  {
    name: 'Modern Pay',
    slug: 'pay',
    logoSrc: '/modern-pay/logo-300x80.png',
    pill: 'bg-modernPay text-white',
    tagline: 'Your payroll & HR department',
    href: '/modern-pay',
    popular: true,
    savings: 'Save 30 hrs/month',
  },
  {
    name: 'Modern Ledger',
    slug: 'ledger',
    logoSrc: '/modern-ledger/logo-300x80.png',
    pill: 'bg-modernLedger text-white',
    tagline: 'Your bookkeeping & finance department',
    href: '/modern-ledger',
    featured: true,
    savings: 'Save 20 hrs/month',
  },
  {
    name: 'Modern Brands',
    slug: 'brands',
    logoSrc: '/modern-brands/logo-300x80.png',
    pill: 'bg-modernBrands text-white',
    tagline: 'Your marketing & web development department',
    href: '/modern-brands',
    savings: 'Save 15 hrs/month',
  },
  {
    name: 'Modern Consulting',
    slug: 'consulting',
    logoSrc: '/modern-consulting/logo-300x80.png',
    pill: 'bg-modernConsulting text-white',
    tagline: 'Your operations & strategy department',
    href: '/modern-consulting',
    savings: 'Save 25 hrs/month',
  },
  {
    name: 'Modern Stack',
    slug: 'stack',
    logoSrc: '/modern-stack/logo-300x80.png',
    pill: 'bg-modernStack text-white',
    tagline: 'Your IT & software development department',
    href: '/modern-stack',
    savings: 'Save 10 hrs/month',
  },
];

export default function SuiteGrid() {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="container max-w-7xl relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsNavy/10 text-kpsNavy rounded-full text-sm font-medium mb-4">
            Your Complete Back-Office
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
            Five Departments, One Partner
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We handle your bookkeeping, payroll, tech support, websites, software development, and
            operations—so you can focus on what you do best with better information.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {brands.map((brand, i) => (
            <SuiteGridClient key={brand.slug} brand={brand} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="/modern-suite"
            className="inline-flex items-center gap-3 px-10 py-5 bg-kpsNavy text-white rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <span>Explore All Services</span>
          </a>

          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Free consultation</span> •{' '}
            <span className="font-medium">Setup in 24hrs</span> •{' '}
            <span className="font-medium">No long-term contracts</span>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-kpsGold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-kpsNavy/5 rounded-full blur-3xl" />
    </section>
  );
}
