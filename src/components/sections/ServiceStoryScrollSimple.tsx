'use client';

import { motion } from 'framer-motion';

interface ServiceStoryScrollProps {
  service: {
    brandName: string;
    accentHex: string;
    summary: string;
  };
  chapters?: unknown[];
  className?: string;
}

export default function ServiceStoryScroll({ service, className = '' }: ServiceStoryScrollProps) {
  return (
    <section className={`relative py-24 ${className}`}>
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-4">
            <span>Process</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How We Transform Your Business
          </h2>

          <p className="text-xl text-gray-600 leading-relaxed">
            Our proven process delivers consistent results across all our service lines.
          </p>
        </div>

        {/* Simple process steps */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto"
              style={{ backgroundColor: service.accentHex + '20' }}
            >
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Discovery</h3>
            <p className="text-gray-600">We understand your challenges and opportunities</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto"
              style={{ backgroundColor: service.accentHex + '20' }}
            >
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Strategy</h3>
            <p className="text-gray-600">We create a customized roadmap for success</p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 mx-auto"
              style={{ backgroundColor: service.accentHex + '20' }}
            >
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Implementation</h3>
            <p className="text-gray-600">We execute and provide ongoing support</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
