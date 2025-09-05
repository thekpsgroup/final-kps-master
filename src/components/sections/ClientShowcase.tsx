import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  {
    name: 'ABC Emergency Services',
    logo: '/client/abcems.png',
    industry: 'Emergency Services',
  },
  {
    name: 'Ironclad Construction',
    logo: '/client/ironclad.png',
    industry: 'Construction',
  },
  {
    name: 'LC Container Services',
    logo: '/client/lccontainer.png',
    industry: 'Logistics',
  },
  {
    name: 'Ogawa Enterprises',
    logo: '/client/ogawa.png',
    industry: 'Manufacturing',
  },
  {
    name: 'Peak Global Solutions',
    logo: '/client/peakglobal.png',
    industry: 'Consulting',
  },
  {
    name: 'TND Technologies',
    logo: '/client/TND.png',
    industry: 'Technology',
  },
  {
    name: 'Urban Designs',
    logo: '/client/UrbanDesigns.png',
    industry: 'Design & Architecture',
  },
];

// Additional client logos collage
const clientLogos = '/client/client logos.png';

export default function ClientShowcase() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="container max-w-7xl relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-4">
            Trusted Partners
          </div>

          <h2 className="h2 text-gray-900 mb-6">Companies We&apos;ve Helped Scale</h2>

          <p className="p-large max-w-3xl mx-auto leading-relaxed">
            From emergency services to manufacturing, we&apos;ve partnered with businesses across
            industries to streamline operations, reduce costs, and accelerate growth.
          </p>
        </div>

        {/* Featured Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="group will-change-transform"
            >
              <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-200 hover:shadow-glass card-hover hover:-translate-y-1 h-full will-change-transform">
                <div className="flex flex-col items-center text-center h-full">
                  {/* Logo Container */}
                  <div className="relative w-full h-16 mb-4 flex items-center justify-center bg-gray-50 rounded-xl p-4 group">
                    <Image
                      src={client.logo}
                      alt={`${client.name} logo`}
                      width={120}
                      height={60}
                      className="object-contain max-w-full max-h-full filter group-hover:scale-105 transition-transform duration-400 ease-out will-change-transform"
                      sizes="120px"
                    />
                  </div>

                  {/* Client Info */}
                  <div className="flex-grow flex flex-col justify-end">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{client.name}</h3>
                    <p className="text-xs text-gray-600">{client.industry}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Collage */}
        <div className="bg-white rounded-3xl p-8 shadow-glass border border-gray-200 mb-12">
          <div className="text-center mb-8">
            <h3 className="h3 text-gray-900 mb-2">More Success Stories</h3>
            <p className="text-gray-600">
              Additional clients we&apos;ve helped transform their operations
            </p>
          </div>

          <div className="relative flex justify-center">
            <Image
              src={clientLogos}
              alt="Additional client logos"
              width={800}
              height={400}
              className="max-w-full h-auto rounded-2xl shadow-soft object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-2xl" />
          </div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-kpsNavy to-kpsGold rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Real Results Across Industries</h3>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Our solutions have helped businesses save time, reduce costs, and scale operations
              across diverse industries and company sizes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={20} suffix="+" />
              </div>
              <div className="text-white/80">Companies Helped</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <div className="text-white/80">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedCounter end={85} suffix="%" />
              </div>
              <div className="text-white/80">Average Efficiency Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-soft border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-gray-600 mb-6">
              See how we can help your business achieve similar results with our modern suite of
              solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/consultation" className="btn-cta btn-cta-primary">
                Get Free Consultation
              </a>
              <a href="/modern-suite" className="btn-cta btn-cta-secondary">
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 -left-20 w-40 h-40 bg-kpsGold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-32 h-32 bg-kpsNavy/10 rounded-full blur-3xl" />
    </section>
  );
}
