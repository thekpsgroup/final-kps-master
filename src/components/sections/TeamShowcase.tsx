'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Karson Lawrence',
    role: 'Founder & CEO',
    image: '/team/CEO-Karson.png',
    bio: 'Karson Lawrence is the Founder and CEO of The KPS Group, bringing over 15 years of experience in scaling operations and driving growth for small and medium-sized businesses. With a background in technology and operations, Karson has helped numerous companies streamline their processes, reduce costs, and achieve sustainable growth. His passion for building practical solutions stems from his own entrepreneurial journey and understanding of the challenges SMBs face daily. When not leading the team, Karson enjoys spending time with his wife and two young children, coaching youth sports, and staying active in his community.',
    linkedin: '#',
    email: 'karson@thekpsgroup.com',
  },
  {
    name: 'Allie Banks',
    role: 'Chief Administrative Officer',
    image: '/team/allie-cao.JPG',
    bio: "Allie Banks serves as the Chief Administrative Officer at The KPS Group, where she oversees operations and ensures seamless execution across all client projects. With extensive experience in administrative management and process optimization, Allie has developed systems that have improved efficiency by up to 40% for various organizations. Her attention to detail and commitment to excellence make her invaluable in maintaining the high standards that define The KPS Group's service delivery. Outside of work, Allie is a dedicated mother of two, enjoys outdoor activities, and volunteers with local community organizations.",
    linkedin: '#',
    email: 'allie@thekpsgroup.com',
  },
  {
    name: 'Brandon Gibson',
    role: 'Chief Revenue Officer',
    image: '/team/brandon-cro.jpg',
    bio: "Brandon Gibson is the Chief Revenue Officer at The KPS Group, responsible for driving business development and client acquisition strategies. With a proven track record in sales and revenue growth, Brandon has helped companies increase their market share and profitability through strategic partnerships and innovative sales approaches. His expertise in relationship building and market analysis has been instrumental in expanding The KPS Group's client base and service offerings. In his personal life, Brandon is an avid traveler, enjoys golf and fitness activities, and is actively involved in mentoring young professionals in his community.",
    linkedin: '#',
    email: 'brandon@thekpsgroup.com',
  },
];

export default function TeamShowcase() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-kpsNavy/5 to-white" />

      <div className="container max-w-7xl relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-kpsGold/10 text-kpsGold rounded-full text-sm font-medium mb-4">
            <span>Team</span>
          </div>

          <h2 className="h2 text-gray-900 mb-6">The People Behind The Modern Suite</h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re a team of experienced operators who&apos;ve been in your shoes. From scaling
            tech companies to optimizing SMB operations, we bring real-world expertise to every
            solution we build.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="group will-change-transform"
            >
              <div className="bg-white rounded-2xl shadow-soft border border-gray-200 overflow-hidden hover:shadow-glass card-hover hover:-translate-y-2 h-full will-change-transform">
                {/* Photo Container */}
                <div className="relative h-80 bg-gradient-to-br from-kpsNavy/10 to-kpsGold/10 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    fill
                    className="object-cover image-hover will-change-transform"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Contact buttons on hover */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 bg-white/90 text-kpsNavy px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors text-center"
                      >
                        Email
                      </a>
                      <a
                        href={member.linkedin}
                        className="flex-1 bg-kpsNavy text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-kpsNavy/90 transition-colors text-center"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-kpsNavy font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl shadow-glass border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to client
              relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customer First</h4>
              <p className="text-gray-600 text-sm">
                Every decision starts with understanding our customers&apos; challenges and goals.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsGold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation Driven</h4>
              <p className="text-gray-600 text-sm">
                We constantly evolve our platform based on emerging technologies and best practices.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-kpsNavy/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">•</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Transparency</h4>
              <p className="text-gray-600 text-sm">
                Open communication and honest feedback are at the heart of our relationships.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Touch */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-kpsNavy/5 to-kpsGold/5 rounded-2xl border border-gray-200">
            <div className="flex -space-x-2">
              <Image
                src="/team/karson-kids2.png"
                alt="Karson with his kids"
                width={60}
                height={60}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <Image
                src="/team/allie-family.jpg"
                alt="Allie's family"
                width={60}
                height={60}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <Image
                src="/team/brandon-spouse.jpg"
                alt="Brandon with his spouse"
                width={60}
                height={60}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900">Family First</p>
              <p className="text-sm text-gray-600">We build for the people we love</p>
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
