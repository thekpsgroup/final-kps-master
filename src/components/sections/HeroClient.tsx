'use client';
import { trackConsultationClick } from '@/lib/gtm';
import { motion } from 'framer-motion';

export default function HeroClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="mt-6 flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto"
    >
      <motion.a
        href="/consultation"
        className="inline-flex items-center justify-center gap-3 rounded-full bg-kpsNavy px-6 py-4 text-white font-semibold shadow-xl hover:shadow-2xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-kpsGold/70 transition-all duration-300 text-center min-h-[56px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => trackConsultationClick('hero')}
      >
        <span>Get Free Back-Office Audit</span>
      </motion.a>

      <motion.a
        href="/modern-suite"
        className="inline-flex items-center justify-center gap-3 rounded-full border-2 border-kpsNavy bg-white px-6 py-4 text-kpsNavy font-semibold shadow-lg hover:bg-kpsNavy hover:text-white transition-all duration-300 text-center min-h-[56px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>See Your Back-Office Solution</span>
      </motion.a>
    </motion.div>
  );
}
