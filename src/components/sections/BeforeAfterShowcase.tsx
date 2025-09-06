import Image from 'next/image';
import { motion } from 'framer-motion';

interface BeforeAfterItem {
  before: {
    image: string;
    title: string;
    description: string;
  };
  after: {
    image: string;
    title: string;
    description: string;
  };
  metric?: {
    value: string;
    label: string;
  };
  testimonial?: {
    quote: string;
    author: string;
    company: string;
  };
}

interface BeforeAfterShowcaseProps {
  items: BeforeAfterItem[];
  title?: string;
  subtitle?: string;
  brandColor?: string;
}

export default function BeforeAfterShowcase({
  items,
  title = "Real Results",
  subtitle = "See how we've transformed businesses just like yours",
  brandColor = "#cab068"
}: BeforeAfterShowcaseProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="space-y-12">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-8 p-8">
                {/* Before */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Before
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                      <Image
                        src={item.before.image}
                        alt={item.before.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-red-500/20" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.before.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.before.description}
                    </p>
                  </div>
                </div>

                {/* After */}
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-white px-3 py-1 rounded-full text-sm font-semibold z-10" style={{ backgroundColor: brandColor }}>
                      After
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden">
                      <Image
                        src={item.after.image}
                        alt={item.after.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 opacity-20" style={{ backgroundColor: brandColor }} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.after.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.after.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics and Testimonial */}
              {(item.metric || item.testimonial) && (
                <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    {item.metric && (
                      <div className="text-center">
                        <div className="text-3xl font-bold mb-2" style={{ color: brandColor }}>
                          {item.metric.value}
                        </div>
                        <div className="text-gray-600">
                          {item.metric.label}
                        </div>
                      </div>
                    )}

                    {item.testimonial && (
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <blockquote className="text-gray-700 mb-3">
                          &ldquo;{item.testimonial.quote}&rdquo;
                        </blockquote>
                        <cite className="text-sm text-gray-600">
                          — {item.testimonial.author}, {item.testimonial.company}
                        </cite>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
