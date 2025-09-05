'use client';

import Image, { ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface OptimizedImageProps extends Omit<ImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
  showFallback?: boolean;
  blurDataURL?: string;
  priority?: boolean;
  aspectRatio?: string;
  lazy?: boolean;
}

// Default blur placeholder for logos
const LOGO_BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PC9zdmc+';

// Default blur placeholder for photos/banners
const PHOTO_BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z';

export default function OptimizedImage({
  src,
  alt,
  fallbackSrc,
  showFallback = true,
  blurDataURL,
  priority = false,
  aspectRatio,
  lazy = true,
  className = '',
  ...props
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  // Determine appropriate blur placeholder
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;

    // Use logo placeholder for small images (likely logos)
    if (typeof props.width === 'number' && props.width <= 100) {
      return LOGO_BLUR_DATA_URL;
    }

    // Use photo placeholder for larger images
    return PHOTO_BLUR_DATA_URL;
  };

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // If there's an error and we have a fallback, show it
  if (hasError && fallbackSrc && showFallback) {
    return (
      <div
        ref={imgRef}
        className={`relative overflow-hidden ${
          aspectRatio ? 'aspect-ratio-container' : ''
        } ${className}`}
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image
          {...props}
          src={fallbackSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          blurDataURL={getBlurDataURL()}
          placeholder="blur"
        />
      </div>
    );
  }

  // If there's an error and no fallback, show a placeholder
  if (hasError) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse flex items-center justify-center text-gray-600 ${className}`}
        style={{
          width: typeof props.width === 'number' ? `${props.width}px` : props.width,
          height: typeof props.height === 'number' ? `${props.height}px` : props.height,
          aspectRatio,
        }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${
        aspectRatio ? 'aspect-ratio-container' : ''
      } ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Loading skeleton */}
      {isLoading && !priority && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      {/* Optimized Image */}
      {isInView && (
        <Image
          {...props}
          src={src}
          alt={alt}
          className={`${isLoading ? 'animate-pulse' : ''} transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
          blurDataURL={getBlurDataURL()}
          placeholder="blur"
          priority={priority}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      )}

      {/* Preload hint for critical images */}
      {priority && typeof src === 'string' && (
        <link rel="preload" as="image" href={src} fetchPriority="high" />
      )}
    </div>
  );
}

// Utility function to generate responsive sizes
export function generateResponsiveSizes(
  baseSize: number,
  breakpoints: number[] = [640, 768, 1024, 1280],
) {
  return breakpoints
    .map((bp) => `(max-width: ${bp}px) ${Math.min(baseSize, bp * 0.8)}px`)
    .concat(`${baseSize}px`)
    .join(', ');
}

// Predefined size configurations for common use cases
export const IMAGE_SIZES = {
  logo: {
    small: '40px',
    medium: '64px',
    large: '96px',
    responsive: generateResponsiveSizes(64),
  },
  avatar: {
    small: '32px',
    medium: '48px',
    large: '64px',
    responsive: generateResponsiveSizes(48),
  },
  banner: {
    hero: '100vw',
    section: '90vw',
    card: '400px',
  },
  thumbnail: {
    small: '150px',
    medium: '250px',
    large: '350px',
    responsive: generateResponsiveSizes(250),
  },
} as const;

// Specialized components for common use cases
export function LogoImage({
  src,
  alt,
  size = 'medium',
  ...props
}: {
  src: string;
  alt: string;
  size?: keyof typeof IMAGE_SIZES.logo;
} & Omit<OptimizedImageProps, 'src' | 'alt'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      sizes={IMAGE_SIZES.logo[size]}
      blurDataURL={LOGO_BLUR_DATA_URL}
      {...props}
    />
  );
}

export function HeroImage({
  src,
  alt,
  ...props
}: {
  src: string;
  alt: string;
} & Omit<OptimizedImageProps, 'src' | 'alt'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      sizes={IMAGE_SIZES.banner.hero}
      priority
      blurDataURL={PHOTO_BLUR_DATA_URL}
      {...props}
    />
  );
}

export function AvatarImage({
  src,
  alt,
  size = 'medium',
  ...props
}: {
  src: string;
  alt: string;
  size?: keyof typeof IMAGE_SIZES.avatar;
} & Omit<OptimizedImageProps, 'src' | 'alt'>) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      sizes={IMAGE_SIZES.avatar[size]}
      blurDataURL={LOGO_BLUR_DATA_URL}
      className={`rounded-full ${props.className || ''}`}
      {...props}
    />
  );
}
