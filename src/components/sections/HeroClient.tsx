'use client';
import { trackConsultationClick } from '@/lib/gtm';
import { motion } from 'framer-motion';

export default function HeroClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      className="mt-6 flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
    >
      <motion.a
        href="/consultation"
        className="btn-cta btn-cta-primary"
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        onClick={() => trackConsultationClick('hero')}
      >
        <span>Get Free Back-Office Audit</span>
      </motion.a>

      <motion.a
        href="/modern-suite"
        className="btn-cta btn-cta-secondary"
        whileHover={{ scale: 1.01, y: -1 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <span>See Your Back-Office Solution</span>
      </motion.a>
    </motion.div>
  );
}
