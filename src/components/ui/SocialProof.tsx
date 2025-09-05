'use client';
import { GOOGLE_REVIEWS, getReviewsByCategory, type GoogleReview } from '@/data/googleReviews';
import { getVariant } from '@/lib/ab-testing';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const TRUST_SIGNALS = [
  { metric: '5.0', label: 'Google Rating' },
  { metric: '20+', label: 'Companies Helped' },
  { metric: '2.7x', label: 'Avg. Growth' },
  { metric: '100%', label: 'Client Retention' },
];

type SocialProofProps = {
  experimentId?: string;
  variant?: 'reviews' | 'metrics' | 'combined';
  category?: 'consulting' | 'bookkeeping' | 'modernization' | 'growth';
  className?: string;
  autoRotate?: boolean;
};

export default function SocialProof({
  experimentId = 'social_proof',
  variant,
  category,
  className = '',
  autoRotate = true,
}: SocialProofProps) {
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string;
    name: string;
    weight: number;
    config: Record<string, unknown>;
  } | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [reviews, setReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    if (!variant && experimentId) {
      const abVariant = getVariant(experimentId);
      setSelectedVariant(abVariant);
    }
  }, [experimentId, variant]);

  useEffect(() => {
    const filteredReviews = category ? getReviewsByCategory(category) : GOOGLE_REVIEWS;
    setReviews(filteredReviews);
  }, [category]);

  useEffect(() => {
    if (!autoRotate || reviews.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoRotate, reviews.length]);

  const showReviews =
    variant === 'reviews' ||
    variant === 'combined' ||
    selectedVariant?.config?.type === 'reviews' ||
    !variant;
  const showMetrics =
    variant === 'metrics' || variant === 'combined' || selectedVariant?.config?.type === 'metrics';

  if (reviews.length === 0) return null;

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-sm ${className}`}>
      {showReviews && (
        <div className="mb-6">
          {/* Google Reviews Header */}
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    •
                  </span>
                ))}
              </div>
              <span className="text-sm text-gray-600">5.0 • Google Reviews</span>
            </div>
          </div>

          {/* Review Carousel */}
          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <blockquote className="text-gray-700 italic mb-3 text-sm leading-relaxed">
                  &ldquo;{reviews[currentReview].text}&rdquo;
                </blockquote>

                <div className="space-y-1">
                  <div className="font-semibold text-gray-900 text-sm">
                    {reviews[currentReview].author}
                  </div>
                  <div className="text-xs text-gray-500">
                    {reviews[currentReview].authorDetails}
                  </div>
                  {reviews[currentReview].businessImpact && (
                    <div className="text-xs text-kpsNavy font-medium">
                      {reviews[currentReview].businessImpact}
                    </div>
                  )}
                  <div className="text-xs text-gray-600">{reviews[currentReview].date}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Review Dots */}
          {reviews.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentReview(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentReview ? 'bg-kpsNavy' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {showMetrics && (
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-center ${
            showReviews ? 'border-t border-gray-100 pt-4' : ''
          }`}
        >
          {TRUST_SIGNALS.map((signal, i) => (
            <motion.div
              key={signal.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-xl font-bold text-kpsNavy">{signal.metric}</div>
              <div className="text-xs text-gray-600">{signal.label}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
