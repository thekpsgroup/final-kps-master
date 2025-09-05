'use client';

import GlassCard from '@/components/ui/GlassCard';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const points = [
  {
    h: 'Why KPS exists',
    p: 'Small businesses drown in tools and guesses. I built the Modern Suite to give owners an integrated backbone—finance, brand, ops, IT—that actually works together.',
  },
  {
    h: 'From big tech → hands-on',
    p: 'A decade across IBM, Microsoft, PwC, Informatica, etc. plus time in the trades. I translate enterprise discipline into practical systems for crews on real jobs.',
  },
  {
    h: 'Principles',
    p: 'Clarity over complexity. Boring over sexy. Ship value weekly. Measure what matters. No theater, no fluff.',
  },
];

const beliefs = [
  'Clean books beat clever opinions.',
  "If it's not in a system, it's a rumor.",
  'Training without enforcement is a wish.',
  'Websites are sales assets, not art projects.',
  'A simple process your team follows > a perfect one they ignore.',
];

const timeline = [
  {
    year: '2015–2021',
    title: 'Enterprise & Data',
    text: 'Led projects in cloud, data, and ops. Learned what scale looks like—and what not to copy into SMBs.',
  },
  {
    year: '2021–2023',
    title: 'QBO Cleanups & Ops',
    text: 'Started as a no-nonsense cleanup shop. Built repeatable playbooks around money, people, and process.',
  },
  {
    year: '2024–now',
    title: 'The Modern Suite',
    text: 'Unified brands for payroll, ledger, brand, consulting, and stack. One partner, shared context, compounding outcomes.',
  },
];

export default function FounderPage() {
  return (
    <>
      {/* hero */}
      <section className="py-24">
        <div className="container max-w-3xl">
          <div className="mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="h1 text-gray-900 mb-3 md:mb-4">Karson Lawrence — Founder &amp; CEO</h1>
            </motion.h1>
            <div className="mx-auto mt-4 h-px w-16 bg-kpsNavy/20" />
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              <div className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Visionary owner of The KPS Group. Pragmatic by default. Forward-leaning without the
                fluff.
              </div>
            </motion.p>
          </div>
        </div>
      </section>

      {/* headshot + intro */}
      <section className="py-24">
        <div className="container max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[320px,1fr] items-start">
            <GlassCard className="overflow-hidden rounded-2xl ring-1 ring-black/5 border border-black/5 shadow-glass">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/team/CEO-Karson.png"
                  alt="Karson Lawrence"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                  priority
                />
              </div>
            </GlassCard>

            <div className="grid gap-6">
              {points.map((pt) => (
                <GlassCard key={pt.h} className="p-6 border border-black/5 shadow-glass">
                  <div className="text-lg font-semibold">{pt.h}</div>
                  <p className="mt-2 text-gray-700 leading-relaxed">{pt.p}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* beliefs */}
      <section className="py-24">
        <div className="container max-w-6xl">
          <h2 className="h2 tracking-tight text-gray-900 mb-3 md:mb-4 text-center">
            What I believe
          </h2>
          <div className="mx-auto mt-6">
            <GlassCard className="p-6 border border-black/5 shadow-glass">
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                  {beliefs.slice(0, 3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="list-disc pl-5 text-gray-700 space-y-2 leading-relaxed">
                  {beliefs.slice(3).map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-24">
        <div className="container max-w-6xl">
          <h2 className="h2 tracking-tight text-gray-900 mb-3 md:mb-4 text-center">
            Path to the Modern Suite
          </h2>
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-px bg-black/5 mb-6 hidden md:block"></div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {timeline.map((t) => (
                <GlassCard
                  key={t.year}
                  className="p-6 flex flex-col border border-black/5 shadow-glass"
                >
                  <div className="text-sm text-gray-500 mb-1">{t.year}</div>
                  <div className="text-lg font-semibold">{t.title}</div>
                  <p className="mt-2 text-gray-700 leading-relaxed">{t.text}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/consultation" className="btn-cta btn-cta-primary">
              Work with Karson
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
