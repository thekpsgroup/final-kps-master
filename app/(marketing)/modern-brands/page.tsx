import type { Metadata } from "next";
import { brandsConfig } from "@/config/brandsConfig";
import SqueezePageTemplate from "@/components/sections/SqueezePageTemplate";

const brand = brandsConfig.find(b => b.slug === 'modern-brands')!;

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    images: brand.seo.ogImage ? [brand.seo.ogImage] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: brand.seo.title,
    description: brand.seo.description,
    images: brand.seo.ogImage ? [brand.seo.ogImage] : undefined,
  },
};

export default function ModernBrandsPage() {
  return <SqueezePageTemplate brand={brand} />;
}
