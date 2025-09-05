'use client';
import MotionButton from '@/components/ui/MotionButton';
import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section className="relative py-24 overflow-hidden" aria-labelledby="philosophy-heading">
      <div className="absolute inset-0 bg-gradient-to-r from-kpsNavy to-slate-800" />

      <div className="container max-w-4xl relative">
        <motion.div
          className="text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white rounded-full text-sm font-medium mb-6 border border-white/20 smooth-hover hover:bg-white/15 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
          >
            Our Philosophy
          </motion.div>

          <motion.h2
            id="philosophy-heading"
            className="h2 mb-6"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          >
            Your Business, Our Back-Office
          </motion.h2>

          <motion.p
            className="body-large max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
          >
            We partner with exceptional business owners who deserve premium back-office support. You
            shouldn&apos;t waste time on bookkeeping, payroll headaches, tech support calls, or
            website updates. You should be growing your business with clear, accurate information
            and strategic guidance.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          >
            <div className="text-left">
              <h3 className="h3 mb-6 text-kpsGold">What We Handle:</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Monthly bookkeeping & financial reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Payroll processing & tax compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Website development & maintenance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">IT support & software development</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Operations consulting & strategy</span>
                </li>
              </ul>
            </div>

            <div className="text-left">
              <h3 className="h3 mb-6 text-kpsGold">What You Get:</h3>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Clean, accurate financial information</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">More time to focus on your core business</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Professional systems that scale with you</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Deep personal relationships, not just transactions
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Financial literacy - know more than your accountant
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">
                    Clear insight into where money goes and how to save
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-kpsGold text-xl mt-0.5">•</span>
                  <span className="leading-relaxed">Peace of mind and better sleep</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          >
            <MotionButton href="/consultation" variant="secondary">
              See How We Can Help Your Business
            </MotionButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-kpsGold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-kpsNavy/10 rounded-full blur-3xl" />
    </section>
  );
}
