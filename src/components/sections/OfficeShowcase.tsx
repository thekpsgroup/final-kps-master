'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const officePhotos = [
  {
    src: '/office/Sleek Office with Gold Accents.png',
    alt: 'Modern office space with elegant gold accents',
    title: 'Premium Workspace',
    description:
      'Our thoughtfully designed office reflects the quality and attention to detail we bring to every client project.',
  },
  {
    src: '/office/kps-office.png',
    alt: 'Professional office environment',
    title: 'Collaborative Environment',
    description:
      'A space designed for focused work and creative collaboration, where innovative solutions are born.',
  },
  {
    src: '/office/kps-desk.png',
    alt: 'Modern office desk and workspace',
    title: 'Modern Workstations',
    description:
      "Equipped with the latest technology to support our team's productivity and client service excellence.",
  },
  {
    src: '/office/client.png',
    alt: 'Client meeting and collaboration',
    title: 'Client Partnerships',
    description:
      'Building lasting relationships through in-person collaboration and personalized service delivery.',
  },
];

export default function OfficeShowcase() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />

      <div className="container max-w-7xl relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-4">
            <span>Office</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Where Innovation Meets Excellence
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our modern office environment reflects our commitment to quality, innovation, and
            exceptional client service. Every detail is designed to support our team&apos;s mission
            of delivering world-class business solutions.
          </p>
        </div>

        {/* Office Photos Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {officePhotos.map((photo, index) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden hover:shadow-glass transition-all duration-300">
                {/* Photo Container */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Title overlay on hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-white font-semibold text-lg mb-2">{photo.title}</h3>
                    <p className="text-white/90 text-sm">{photo.description}</p>
                  </div>
                </div>

                {/* Content below photo */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{photo.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Office Values */}
        <div className="bg-white rounded-3xl shadow-glass border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Office Philosophy</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our workspace is more than just a place to work — it&apos;s a reflection of our values
              and commitment to excellence in everything we do.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation First</h4>
              <p className="text-gray-600 text-sm">
                Every corner of our office inspires creative thinking and breakthrough solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsGold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Collaboration</h4>
              <p className="text-gray-600 text-sm">
                Designed to foster teamwork and open communication across all departments.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
              <p className="text-gray-600 text-sm">
                From our furniture to our processes, every detail reflects our commitment to
                quality.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-kpsNavy to-kpsGold rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Experience Our Environment</h3>
            <p className="text-white/90 mb-6">
              Schedule a visit to see how our modern workspace enables us to deliver exceptional
              results for our clients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-kpsNavy rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Book Consultation
              </a>
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More About Us
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
