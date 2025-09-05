'use client';
import { getRecentReviews } from '@/data/googleReviews';
import { gtmEvent } from '@/lib/gtm';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingReviews() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const reviews = getRecentReviews(3);

  useEffect(() => {
    // Show after 10 seconds of page load
    const timer = setTimeout(() => {
      setIsVisible(true);
      gtmEvent('floating_reviews_shown', {
        event_category: 'engagement',
      });
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isVisible, reviews.length]);

  const handleClose = () => {
    setIsVisible(false);
    gtmEvent('floating_reviews_closed', {
      event_category: 'engagement',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <div className="bg-white rounded-lg shadow-lg border p-4 relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              ×
            </button>

            <div className="mb-2">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">
                      •
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-600">Google Reviews</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentReview}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-[80px]"
              >
                <p className="text-sm text-gray-700 italic mb-2 line-clamp-3">
                  &ldquo;{reviews[currentReview].text}&rdquo;
                </p>
                <div className="text-xs">
                  <div className="font-semibold text-gray-900">{reviews[currentReview].author}</div>
                  <div className="text-gray-500">{reviews[currentReview].date}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-1">
                {reviews.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === currentReview ? 'bg-kpsNavy' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <a
                href="/consultation"
                onClick={() =>
                  gtmEvent('floating_reviews_cta_click', {
                    event_category: 'conversion',
                  })
                }
                className="text-xs bg-kpsNavy text-white px-3 py-1 rounded-full hover:opacity-90"
              >
                Get Started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
