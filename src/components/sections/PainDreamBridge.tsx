"use client";
import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import PainIcon from "@/components/icons/PainIcon";
import DreamIcon from "@/components/icons/DreamIcon";
import BridgeIcon from "@/components/icons/BridgeIcon";

type Block = { key: "pain" | "dream" | "bridge"; title: string; lead: string; body: string; icon: React.ReactNode; color: string; watermark: string; };

const blocks: Block[] = [
  { key: "pain", title: "Your pains", lead: "Hard work, soft results.", body: "Payroll errors chip at trust. AR drifts. Leads go quiet. Crews improvise. You're busy; nothing is predictable.", icon: <PainIcon className="h-12 w-12" />, color: "text-red-600", watermark: "text-red-600/5" },
  { key: "dream", title: "Your dream", lead: "Calm, compounding progress.", body: "Payroll runs itself. Books are clean, weekly. The brand earns trust; the site converts. Roles are clear; the playbook is followed.", icon: <DreamIcon className="h-12 w-12" />, color: "text-kpsGold", watermark: "text-kpsGold/10" },
  { key: "bridge", title: "Our bridge", lead: "Phase it. Prove it. Make it stick.", body: "Phase 1 finance/HR → Phase 2 brand/conversion → Phase 3 ops/IT. Quick wins first; durability by SOPs + training.", icon: <BridgeIcon className="h-12 w-12" />, color: "text-kpsNavy", watermark: "text-kpsNavy/10" },
];

export default function PainDreamBridge() {
  return (
    <section className="pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="container max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-center">From chaos to clarity</h2>
        </div>
        <div className="relative grid gap-6 md:grid-cols-3">
          <svg className="pointer-events-none absolute inset-0 hidden md:block" viewBox="0 0 1200 200" aria-hidden="true">
            <path d="M100 100 H1100" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="6 8" />
            <circle cx="100" cy="100" r="3" fill="#e5e7eb" />
            <circle cx="600" cy="100" r="3" fill="#e5e7eb" />
            <circle cx="1100" cy="100" r="3" fill="#e5e7eb" />
          </svg>
          {blocks.map((b, i) => (
            <motion.div key={b.key} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20% 0px -20% 0px" }} transition={{ duration: 0.3, delay: i * 0.06 }}>
              <GlassCard className="relative overflow-hidden p-6 h-full hover:-translate-y-1 hover:shadow-glassHover transition border border-black/5 shadow-glass">
                <div className={`pointer-events-none absolute -right-6 -top-6 ${b.watermark}`}>
                  <div className="h-28 w-28 opacity-60">{b.icon}</div>
                </div>
                <div className={`flex items-center gap-3 ${b.color}`}>
                  <div aria-hidden="true">{b.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900">{b.title}</h3>
                </div>
                <p className="mt-3 font-medium">{b.lead}</p>
                <p className="mt-2 text-base text-gray-700 leading-relaxed">{b.body}</p>
                {b.key === "bridge" && (
                  <ul className="list-disc pl-5 text-sm text-gray-600 mt-3 space-y-1">
                    <li><span className="font-medium">Phase 1:</span> Payroll/HR risk off the table. Books cleaned; dashboard live.</li>
                    <li><span className="font-medium">Phase 2:</span> Offers, site, and follow-up tuned for conversion.</li>
                    <li><span className="font-medium">Phase 3:</span> SOPs + training + enforcement; IT that quietly works.</li>
                  </ul>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
