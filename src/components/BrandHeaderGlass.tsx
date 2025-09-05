import Image from 'next/image';

type BrandHeaderProps = {
  brand: {
    brandName: string;
    tagline: string;
    logoPath: string;
    isSquare: boolean;
    accentHex?: string;
    externalUrl?: string | null;
    seo?: { ogImage?: string };
  };
  ctaHref?: string; // e.g. "#lead"
};

export default function BrandHeaderGlass({ brand, ctaHref = "#lead" }: BrandHeaderProps) {
  const banner = brand.seo?.ogImage;
  return (
    <section className="relative isolate">
      {/* flat banner, fixed height */}
      <div className="relative h-[var(--brand-hero-h)] w-full overflow-hidden">
        {banner && (
          <Image
            src={banner}
            alt={`${brand.brandName} hero banner`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
          />
        )}
      </div>

      {/* solid accent stripe */}
      <span
        className="absolute left-0 top-0 h-[3px] w-full"
        style={{ background: brand.accentHex ?? "#cab068" }}
        aria-hidden
      />

      {/* glass card overlay */}
      <div className="container -mt-10 px-4">
        <div
          className="
            mx-auto max-w-5xl rounded-3xl border border-white/22
            bg-white/10 backdrop-blur-xl
            shadow-[0_20px_60px_rgba(0,0,0,0.18)]
          "
          style={{ WebkitBackdropFilter: "blur(16px)" }}
        >
          <div className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="flex items-center gap-4">
              {brand.isSquare ? (
                <Image
                  src={brand.logoPath}
                  alt={`${brand.brandName} logo`}
                  width={48}
                  height={48}
                  className="rounded-xl border border-white/30 bg-white/40 p-1 object-contain"
                  priority
                  sizes="48px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
              ) : (
                <Image
                  src={brand.logoPath}
                  alt={`${brand.brandName} logo`}
                  width={200}
                  height={50}
                  className="max-h-12 w-auto object-contain"
                  priority
                  sizes="200px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                />
              )}
              <div>
                <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {brand.brandName}
                </h1>
                <p className="mt-1 text-sm text-neutral-800 md:text-base">{brand.tagline}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {brand.externalUrl && (
                <a
                  href={brand.externalUrl}
                  target="_blank"
                  className="rounded-2xl border border-white/28 bg-white/28 px-4 py-2 text-sm font-medium text-neutral-900 shadow-sm transition hover:translate-y-[-1px]"
                >
                  Visit site
                </a>
              )}
              <a
                href={ctaHref}
                className="rounded-2xl bg-[#00438c] px-4 py-2 text-sm font-medium text-white shadow-md transition hover:opacity-90"
              >
                Talk to KPS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
