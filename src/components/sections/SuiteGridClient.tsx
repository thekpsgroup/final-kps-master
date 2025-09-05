'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

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

export default function SuiteGridClient({ brand, index }: { brand: Brand; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="will-change-transform"
    >
      <div className="group flex flex-col p-8 rounded-3xl border border-black/5 bg-white/80 backdrop-blur-md shadow-refined h-full card-hover hover:shadow-elegant hover:-translate-y-1 hover:bg-white/95 relative overflow-hidden will-change-transform">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-kpsGold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

        {/* Popular/Featured Badge */}
        {brand.popular && (
          <div className="absolute -top-3 -right-3 bg-kpsGold text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10">
            Most Popular
          </div>
        )}
        {brand.featured && (
          <div className="absolute -top-3 -right-3 bg-kpsNavy text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg z-10">
            Featured
          </div>
        )}

        {/* Logo Container */}
        <div className="aspect-[3/1] flex items-center justify-center bg-gray-50 rounded-2xl p-8 mb-6 border border-gray-200/50 relative z-10">
          <Image
            src={brand.logoSrc}
            alt={brand.name}
            width={300}
            height={100}
            className="object-contain w-full h-auto filter group-hover:scale-105 transition-transform duration-300 ease-out will-change-transform"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            priority={index === 0}
            loading={index === 0 ? 'eager' : 'lazy'}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative z-10">
          <span
            className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-semibold mb-4 ${brand.pill}`}
          >
            {brand.name}
          </span>
          <p className="text-gray-600 leading-relaxed mb-4 flex-1">{brand.tagline}</p>

          {/* Savings Badge */}
          {brand.savings && (
            <div className="inline-flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full font-semibold shadow-sm mb-6">
              <span>{brand.savings}</span>
            </div>
          )}

          {/* CTA */}
          <div className="mt-auto">
            <a
              className="inline-flex items-center gap-2 text-sm font-semibold text-kpsNavy hover:text-kpsGold transition-all duration-300 group-hover:gap-4 relative"
              href={brand.href}
            >
              <span>Learn More</span>
              <span className="text-lg transition-all duration-300 group-hover:translate-x-2 group-hover:text-kpsGold">
                →
              </span>
            </a>
            <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-kpsNavy group-hover:w-full transition-all duration-300" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
