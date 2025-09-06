import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brandsConfig } from "@/config/brandsConfig";
import BrandPageClient from "./client";

export async function generateStaticParams() {
  return brandsConfig.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = brandsConfig.find((b) => b.slug === slug);
  if (!brand) return {};

  return {
    title: brand.seo.title,
    description: brand.seo.description,
    openGraph: {
      title: brand.seo.title,
      description: brand.seo.description,
      images: brand.seo.ogImage ? [brand.seo.ogImage] : undefined,
    },
  };
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = brandsConfig.find((b) => b.slug === slug);
  if (!brand) return notFound();

  return (
    <BrandPageClient brand={brand} />
  );
}