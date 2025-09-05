'use client';
import GlassCard from '@/components/ui/GlassCard';
import { gtmEvent } from '@/lib/gtm';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        gtmEvent('exit_intent_triggered', {
          event_category: 'engagement',
        });
      }
    };

    // Show after 30 seconds if not shown
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true);
        setHasShown(true);
        gtmEvent('time_based_popup_triggered', {
          event_category: 'engagement',
        });
      }
    }, 30000);

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasShown]);

  const handleDownload = (magnetType: string) => {
    gtmEvent('popup_lead_magnet_download', {
      event_category: 'conversion',
      magnet_type: magnetType,
    });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setIsVisible(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full"
          >
            <GlassCard className="p-6 relative">
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              >
                ×
              </button>

              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-kpsNavy rounded-full flex items-center justify-center mx-auto mb-3">
                  <div className="w-6 h-6 bg-white rounded flex-shrink-0" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Wait! Get Your Free Operations Audit
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  25-point checklist to identify gaps in your business operations
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="/lead-magnets/smb-operations-audit.pdf"
                  download
                  onClick={() => handleDownload('operations_audit')}
                  className="block w-full bg-kpsNavy text-white text-center py-3 rounded-full font-medium hover:opacity-95"
                >
                  Download Free Audit
                </a>
                <button
                  onClick={() => setIsVisible(false)}
                  className="block w-full text-gray-500 text-sm hover:text-gray-700"
                >
                  No thanks, I&apos;ll figure it out myself
                </button>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
