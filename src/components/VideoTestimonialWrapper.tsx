'use client';

import dynamic from 'next/dynamic';

const VideoTestimonial = dynamic(
  () => import('@/components/VideoTestimonial') as Promise<{
    default: React.ComponentType<{
      src?: string;
      poster?: string;
      width?: number;
      height?: number;
    }>;
  }>,
  { ssr: false }
);

interface VideoTestimonialWrapperProps {
  src?: string;
  poster?: string;
  width?: number;
  height?: number;
}

export default function VideoTestimonialWrapper(props: VideoTestimonialWrapperProps) {
  return <VideoTestimonial {...props} />;
}
