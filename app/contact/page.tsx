"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* hero */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-3xl">
          <div className="mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4"
            >
              Let&apos;s talk about your business
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to transform your operations? We&apos;re here to help you implement the Modern Suite
              and see real results on your P&L.
            </motion.p>
          </div>
        </div>
      </section>

      {/* contact methods */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <GlassCard className="p-8 border border-black/5 shadow-glass">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4">Get in touch</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <a 
                      href="mailto:sales@thekpsgroup.com" 
                      className="text-kpsNavy hover:text-kpsGold transition-colors"
                    >
                      sales@thekpsgroup.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Phone</h3>
                    <a 
                      href="tel:14694586966" 
                      className="text-kpsNavy hover:text-kpsGold transition-colors"
                    >
                      469-458-6966
                    </a>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Response time</h3>
                    <p className="text-gray-700 leading-relaxed">We typically respond within 2-4 hours during business hours.</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <GlassCard className="p-8 border border-black/5 shadow-glass">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4">What to expect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900">Initial consultation</h3>
                    <p className="text-gray-700 leading-relaxed">30-minute call to understand your current challenges and goals.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Assessment</h3>
                    <p className="text-gray-700 leading-relaxed">We&apos;ll review your current systems and identify quick wins.</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Proposal</h3>
                    <p className="text-gray-700 leading-relaxed">Custom implementation plan with clear phases and outcomes.</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-3xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-kpsNavy px-6 py-3 text-white font-medium shadow-md hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-kpsGold/70"
                >
                  Book Your Consultation
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
