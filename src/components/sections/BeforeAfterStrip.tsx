"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Sparkline({ points, className }: { points: number[]; className?: string }) {
  const max = Math.max(...points); const min = Math.min(...points);
  const norm = points.map((p, i) => { const x = (i / (points.length - 1)) * 100; const y = 100 - ((p - min) / (max - min || 1)) * 100; return `${x},${y}`; });
  return (<svg viewBox="0 0 100 100" className={cn("w-full h-8", className)}><polyline fill="none" stroke="currentColor" strokeWidth="2" points={norm.join(" ")} /></svg>);
}

type KPI = { label: string; unit?: string; before: number; after: number; inverse?: boolean; spark?: number[] };
const KPIS: KPI[] = [
  { label: "Close Rate", unit: "%", before: 21, after: 34, spark: [18,19,21,22,28,31,34] },
  { label: "AR Days", before: 63, after: 29, inverse: true, spark: [63,61,56,48,39,33,29] },
  { label: "Website Conversion", unit: "x", before: 1.0, after: 2.4, spark: [0.9,1.1,1.2,1.6,1.9,2.2,2.4] },
  { label: "Admin Hours/Wk", before: 18, after: 7, inverse: true, spark: [18,16,14,12,10,8,7] },
];

const screenshots = {
  before: [ { src: "/placeholders/before-books.png", caption: "Messy books / no owner dashboard" }, { src: "/placeholders/before-pipeline.png", caption: "Leads leaking / no follow-up" } ],
  after:  [ { src: "/placeholders/after-dashboard.png", caption: "Owner dashboard with weekly rhythm" }, { src: "/placeholders/after-site.png", caption: "Site wired to offers that convert" } ],
};

export default function BeforeAfterStrip() {
  const [mode, setMode] = useState<"before" | "after">("before");
  return (
    <section className="pt-16 pb-16 md:pt-20 md:pb-20">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-3 md:mb-4">Before / After</h2>
            <p className="text-gray-600 max-w-2xl leading-relaxed">Flip the switch to see the difference on the ground — from chaos to clarity.</p>
          </div>
          <div className="inline-flex self-start bg-gray-100 rounded-full p-1">
            <button 
              onClick={() => setMode("before")} 
              className={cn("rounded-full px-4 py-2 text-sm font-medium transition-all", mode === "before" ? "bg-kpsNavy text-white shadow-sm" : "text-gray-600 hover:text-gray-900")}
              aria-pressed={mode === "before"}
            >
              Before
            </button>
            <button 
              onClick={() => setMode("after")} 
              className={cn("rounded-full px-4 py-2 text-sm font-medium transition-all", mode === "after" ? "bg-kpsNavy text-white shadow-sm" : "text-gray-600 hover:text-gray-900")}
              aria-pressed={mode === "after"}
            >
              After
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {mode === "before" ? (
            <motion.div key="before-narrative" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <div className="grid gap-6 md:grid-cols-3">
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Operations</div><p className="mt-2 text-gray-700 leading-relaxed">Jobs scheduled in texts; no standard checklists; dispatch scrambling daily. Training is tribal knowledge.</p></GlassCard>
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Finance</div><p className="mt-2 text-gray-700 leading-relaxed">Inconsistent coding; AR creeping past 60 days; payroll exceptions every week; no weekly owner dashboard.</p></GlassCard>
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Growth</div><p className="mt-2 text-gray-700 leading-relaxed">Brand feels dated; site loads slow and leaks leads; no offers, no follow-up rhythm, no CRM enforcement.</p></GlassCard>
              </div>
            </motion.div>
          ) : (
            <motion.div key="after-narrative" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
              <div className="grid gap-6 md:grid-cols-3">
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Operations</div><p className="mt-2 text-gray-700 leading-relaxed">Dispatch runs on SOPs with role clarity; techs follow checklists; training is scheduled and enforced.</p></GlassCard>
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Finance</div><p className="mt-2 text-gray-700 leading-relaxed">Weekly close on a clean chart; AR tracked and collected; payroll on rails; owner dashboard every Monday.</p></GlassCard>
                <GlassCard className="p-6 border border-black/5 shadow-glass"><div className="text-lg font-semibold">Growth</div><p className="mt-2 text-gray-700 leading-relaxed">Modern brand and fast site; clear offers; CRM-backed follow-up; conversion measured and improved.</p></GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((k) => { 
            const val = mode === "before" ? k.before : k.after; 
            const delta = k.after - k.before; 
            const good = k.inverse ? delta < 0 : delta > 0; 
            const deltaText = k.inverse ? (delta < 0 ? `↓ ${Math.abs(delta)}` : `↑ ${delta}`) : (delta > 0 ? `↑ ${delta}` : `↓ ${Math.abs(delta)}`);
            const deltaIcon = good ? "↗" : "↘";
            
            return (
              <GlassCard key={k.label} className="p-5 md:p-6 border border-black/5 shadow-glass">
                <div className="uppercase text-xs tracking-wide text-gray-500">{k.label}</div>
                <div className="mt-1 flex items-baseline gap-1">
                  <div className="text-3xl md:text-4xl font-bold">{val}{k.unit ?? ""}</div>
                  {mode === "after" && (
                    <div className={cn("ml-2 text-sm font-medium flex items-center gap-1", good ? "text-green-600" : "text-red-600")}>
                      <span>{deltaIcon}</span>
                      <span>{deltaText}</span>
                    </div>
                  )}
                </div>
                {k.spark && (<div className="mt-2 text-kpsNavy"><Sparkline points={k.spark} /></div>)}
              </GlassCard>
            ); 
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={mode === "before" ? "before-shots" : "after-shots"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
            <div className="mt-8 rounded-2xl border border-black/5 p-3 md:p-4 bg-white/60 backdrop-blur">
              <div className="grid gap-6 md:grid-cols-2">
                {(mode === "before" ? screenshots.before : screenshots.after).map((shot) => (
                  <div key={shot.src}>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-2xl ring-1 ring-black/5">
                      <Image src={shot.src} alt={shot.caption} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    </div>
                    <div className="mt-3 text-sm text-gray-600 italic text-center">{shot.caption}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
