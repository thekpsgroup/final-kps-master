import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProcessStep {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface ProcessVisualizationProps {
  steps: ProcessStep[];
  title?: string;
  brandColor?: string;
}

export default function ProcessVisualization({
  steps,
  title = 'How It Works',
  brandColor = '#cab068',
}: ProcessVisualizationProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our proven process delivers results in weeks, not months
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                {/* Step Number */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mb-6 mx-auto md:mx-0 relative z-10"
                  style={{ backgroundColor: brandColor }}
                >
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center md:text-left">
                  {/* Icon */}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto md:mx-0"
                    style={{ backgroundColor: `${brandColor}15` }}
                  >
                    <span className="text-2xl">{step.icon}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Optional Image */}
                  {step.image && (
                    <div className="mt-4 rounded-xl overflow-hidden">
                      <Image
                        src={step.image}
                        alt={step.title}
                        width={300}
                        height={200}
                        className="w-full h-32 object-cover"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  )}
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-8">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index + 1) * 0.2 }}
                    >
                      <svg
                        className="w-6 h-6 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
