'use client';
import Image from 'next/image';

interface ServiceHeroProps {
  brand: {
    brandName: string;
    tagline: string;
    summary: string;
    logoPath: string;
    isSquare: boolean;
    accentHex: string;
    externalUrl?: string | null;
    seo: {
      ogImage?: string;
    };
  };
  heroImage?: string;
  stats?: Array<{
    value: string;
    label: string;
    icon?: string;
  }>;
  ctaButtons?: Array<{
    text: string;
    href: string;
    primary?: boolean;
    icon?: string;
  }>;
  features?: string[];
}

export default function ServiceHero({ brand, stats = [], features = [] }: ServiceHeroProps) {
  return (
    <section className="pt-32 pb-24 bg-white">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          {/* Logo */}
          <div className="mb-12">
            <Image
              src={brand.logoPath}
              alt={brand.brandName}
              width={300}
              height={100}
              className="mx-auto object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {brand.tagline}
          </h1>

          {/* Summary */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            {brand.summary}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <a
              href="/consultation"
              className="inline-flex items-center justify-center px-12 py-6 bg-gray-900 text-white text-lg font-semibold rounded hover:bg-gray-800 transition-colors"
            >
              Get Free Consultation
            </a>

            {brand.externalUrl && (
              <a
                href={brand.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-12 py-6 border-2 border-gray-900 text-gray-900 text-lg font-semibold rounded hover:bg-gray-900 hover:text-white transition-colors"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        {/* Features List */}
        {features.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 flex-shrink-0" />
                  <span className="text-lg text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
