"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Link from "next/link";

const kpis = [
  { label: "Close Rate Lift", value: "+18–35%" },
  { label: "Payroll/Admin Time Saved", value: "8–12 hrs / wk" },
  { label: "AR Days Reduced", value: "15–30 days" },
  { label: "Website Conversion", value: "2.1×–4.3×" },
  { label: "Ops Errors Down", value: "-40–65%" },
  { label: "Onboarding Time", value: "↓ 50–70%" },
];

const studies = [
  {
    title: "HVAC Contractor (12 techs)",
    result: "Booked revenue +28% in 90 days",
    bullets: [
      "Rebuilt lead flow + call scripts",
      "Modern Ledger monthly close + job costing",
      "Dispatcher SOPs, install day checklist",
    ],
  },
  {
    title: "Electrical + Solar (multi-crew)",
    result: "AR from 63→29 days in 7 weeks",
    bullets: [
      "Invoice policy + progress billing",
      "Collections cadence + templates",
      "Ledger cleanup; owner dashboard",
    ],
  },
  {
    title: "Remodeler (design-build)",
    result: "Website leads 2.7×; CAC ↓ 38%",
    bullets: [
      "Modern Brands site + tracking",
      "Offer architecture + service pages",
      "Form → CRM → pipeline automations",
    ],
  },
];

const steps = [
  { n: 1, h: "Clarify outcomes", p: "We define what \"good\" looks like in revenue, margin, and ops speed." },
  { n: 2, h: "Stabilize finance", p: "Payroll/HR risk off the table. Books cleaned. Owner dashboard live." },
  { n: 3, h: "Fix conversion", p: "Brand & site tuned for speed, proof, and offers that actually sell." },
  { n: 4, h: "Systemize ops", p: "SOPs + training + enforcement. Fewer fires, faster cycle times." },
];

export default function OutcomesPage() {
  return (
    <>
      {/* hero */}
      <section className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <div className="mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 mb-3 md:mb-4"
            >
              Outcomes you can feel on the P&amp;L
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              We don&apos;t sell shiny software. We implement the boring, proven stuff that moves
              cash flow, capacity, and confidence.
            </motion.p>
            <div className="mt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/consultation"
                  className="inline-flex items-center gap-2 rounded-full bg-kpsNavy px-6 py-3 text-white font-medium shadow-glass hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-kpsGold/70"
                >
                  Book Consultation
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI tiles */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {kpis.map((k, i) => (
              <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}>
                <GlassCard className="p-6 text-center border border-black/5 shadow-glass">
                  <div className="text-3xl font-semibold text-kpsNavy">{k.value}</div>
                  <div className="mt-2 text-sm text-gray-600">{k.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* case studies */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4 text-center">Selected wins</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-center">Every engagement is phased for quick wins first, durable gains next.</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {studies.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}>
                <GlassCard className="p-6 border border-black/5 shadow-glass">
                  <div className="text-lg font-semibold">{s.title}</div>
                  <div className="mt-1 text-kpsNavy font-medium">{s.result}</div>
                  <ul className="mt-3 divide-y divide-black/5">
                    {s.bullets.map((b, index) => (
                      <li key={b} className={`text-gray-600 ${index === 0 ? 'pt-0' : 'pt-3'}`}>
                        {b}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full border border-kpsNavy px-6 py-3 text-kpsNavy font-medium hover:bg-kpsNavy hover:text-white transition-colors">
              See what we&apos;d do for you
            </Link>
          </div>
        </div>
      </section>

      {/* how we work */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4 text-center">How we work</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: i * 0.05 }} viewport={{ once: true }}>
                <GlassCard className="p-6 flex flex-col border border-black/5 shadow-glass">
                  <div className="h-6 w-6 flex items-center justify-center rounded-full bg-kpsNavy text-white text-xs font-bold mb-1">{s.n}</div>
                  <div className="text-lg font-semibold">{s.h}</div>
                  <p className="mt-2 text-gray-600 leading-relaxed">{s.p}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-20">
        <div className="container max-w-3xl">
          <div className="text-center">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-kpsNavy px-6 py-3 text-white font-medium shadow-md hover:opacity-95">
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
