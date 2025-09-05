export type BrandFAQ = { q: string; a: string };

export type BrandConfig = {
  slug: string; // URL route: /modern-pay, etc.  (KPS is not a route)
  brandName: string;
  tagline: string;
  summary: string;
  pains: string[];
  outcomes: string[];
  services: string[];
  faqs: BrandFAQ[];
  externalUrl?: string | null;
  logoPath: string; // For Modern brands -> rectangular wordmark
  isSquare: boolean; // true only for The KPS Group (square)
  accentHex?: string;
  seo: {
    title: string;
    description: string;
    ogImage?: string; // 1200x630
  };
};

// ───────────────────────────────────────────────────────────────────────────────
// Parent brand (square logo, not part of the routed pages)
export const KPS_PARENT = {
  brandName: 'The KPS Group',
  logoPath: '/kps-group/kps-square-512.png', // square only
  isSquare: true as const,
  accentHex: '#cab068',
  seo: {
    ogImage: '/kps-group/kps-og-1200x630.png',
  },
};

// ───────────────────────────────────────────────────────────────────────────────
// Five Modern brands (rectangular logos, routed pages)
export const brandsConfig: BrandConfig[] = [
  {
    slug: 'modern-pay',
    brandName: 'Modern Pay',
    tagline: 'Payroll & HR compliance without the chaos.',
    summary:
      'Stress-free, on-time payroll with bulletproof HR compliance for trades and SMBs. Multi-state, contractors, onboarding, and filings — handled right.',
    pains: [
      'Payroll errors and late filings that create penalties',
      'Manual timecards and messy PTO policies',
      'Misclassified contractors and multi-state complexity',
      "Onboarding/offboarding that's ad-hoc and risky",
      'No single source of truth for employee records',
    ],
    outcomes: [
      'Accurate, on-time payroll every cycle',
      'Automated tax filings and year-end (W-2/1099)',
      'Clean onboarding, e-docs, and policy acknowledgment',
      'Time & attendance dialed in with PTO rules',
      'Lower compliance risk with proactive alerts',
    ],
    services: [
      'Full-service payroll (multi-state, multi-schedule)',
      'Automated tax filings, W-2/1099 year-end',
      'Time & attendance + PTO policy setup',
      'New-hire onboarding & e-document workflows',
      'HR policy library + compliance notifications',
      'Benefits deduction coordination (as applicable)',
    ],
    faqs: [
      {
        q: 'How fast can we migrate payroll?',
        a: 'Typical migrations complete in 5–10 business days once we receive prior reports and employee data.',
      },
      {
        q: 'Do you support multi-state teams?',
        a: 'Yes. We handle registrations, tax rates, and filings for multi-state payrolls and remote workforces.',
      },
      {
        q: 'Can you pay contractors and employees?',
        a: 'Yes. We process W-2 and 1099, with separate reporting and year-end documents.',
      },
      {
        q: 'Do you integrate time & attendance?',
        a: 'Yes. We implement time tracking with PTO accruals and push approved hours into payroll.',
      },
      {
        q: 'Do you provide HR documents and policies?',
        a: 'We provide a core policy library and set up acknowledgement flows. Custom policies are available on request.',
      },
    ],
    externalUrl: 'https://modernpayroll.co',
    logoPath: '/modern-pay/logo-300x80.png',
    isSquare: false,
    accentHex: '#2BAA9C',
    seo: {
      title: 'Modern Pay — Payroll & HR Compliance',
      description:
        'Stress-free payroll for trades & SMBs. Multi-state, contractors, onboarding, automated filings, and HR compliance done right.',
      ogImage: '/modern-pay/og-image-1200x630.png',
    },
  },
  {
    slug: 'modern-ledger',
    brandName: 'Modern Ledger',
    tagline: 'Clean books. Clear decisions.',
    summary:
      'Elite bookkeeping, historical cleanups, and monthly close so your numbers are lender-ready, tax-ready, and decision-ready.',
    pains: [
      'Messy historicals and unreconciled accounts',
      'Late or inconsistent month-end close',
      'Poor visibility into AR/AP and cash flow',
      'No standardized chart of accounts',
      "Reports you can't actually trust",
    ],
    outcomes: [
      'Clean, reconciled books and timely closes',
      'Cash clarity with simple dashboards',
      'Tight AR/AP discipline and fewer surprises',
      'Audit-ready documentation trail',
      'Confidence with lenders, investors, and your CPA',
    ],
    services: [
      'Monthly bookkeeping & reconciliations',
      'Historical cleanups & catch-up projects',
      'AR/AP workflows and aging discipline',
      'Cash flow & KPI dashboards',
      '1099 vendor tracking & year-end support',
      'Controller-light guidance as needed',
    ],
    faqs: [
      {
        q: 'How long does a cleanup take?',
        a: 'Most cleanups complete in 2–6 weeks depending on volume, bank feeds, and data quality.',
      },
      {
        q: 'Which accounting platforms do you support?',
        a: 'Primarily QuickBooks Online. We can collaborate with your CPA for tax-side tooling.',
      },
      {
        q: 'Will you work with our existing CPA?',
        a: 'Absolutely. We prepare books so your CPA can file clean and fast.',
      },
      {
        q: 'Do you handle payroll mapping and reclassifications?',
        a: 'Yes. We correct mappings, build rules, and standardize your chart of accounts.',
      },
    ],
    externalUrl: null,
    logoPath: '/modern-ledger/logo-300x80.png',
    isSquare: false,
    accentHex: '#1E6B4E',
    seo: {
      title: 'Modern Ledger — Bookkeeping & Cleanups',
      description:
        'Elite bookkeeping and historical cleanups. Monthly close, AR/AP discipline, cash dashboards, and audit-ready books.',
      ogImage: '/modern-ledger/og-image-1200x630.png',
    },
  },
  {
    slug: 'modern-brands',
    brandName: 'Modern Brands',
    tagline: 'Branding and websites that actually convert.',
    summary:
      'Identity and web experiences that look elite, load fast, and turn visitors into qualified leads — not 2010 brochure-ware.',
    pains: [
      'Outdated brand and inconsistent visuals',
      "DIY website that's slow and doesn't convert",
      'Weak SEO foundation and poor structure',
      'No clear CTAs or credibility elements',
      'Fragmented content and landing pages',
    ],
    outcomes: [
      "A modern identity system you're proud of",
      'High-performance site with conversion UX',
      'Clean SEO architecture with schema & metas',
      'Stronger credibility, higher lead rates',
      'Scalable landing page system',
    ],
    services: [
      'Logo & identity system (color, type, usage)',
      'Next.js/Astro high-performance websites',
      'Conversion UX with forms & credibility blocks',
      'SEO setup (schema, metadata, sitemap, OG)',
      'Landing page & content templates',
      'Ongoing iteration packages',
    ],
    faqs: [
      {
        q: "What's a typical timeline?",
        a: 'A focused brand + website can ship in 3–6 weeks depending on scope and content readiness.',
      },
      {
        q: 'Can you migrate our current site?',
        a: 'Yes. We migrate content, preserve SEO, and redirect old URLs to protect rankings.',
      },
      {
        q: 'Do we own the design files and code?',
        a: 'Yes. You get production assets and repo access. No hostage situations.',
      },
      {
        q: "What's included in SEO setup?",
        a: 'Metadata, schema, sitemap/robots, OG tags, and a sane heading/URL structure.',
      },
    ],
    externalUrl: 'https://modernbrands.io',
    logoPath: '/modern-brands/logo-300x80.png',
    isSquare: false,
    accentHex: '#6A5ACD',
    seo: {
      title: 'Modern Brands — Logos & High-Conversion Websites',
      description:
        'Elite branding and blazing-fast websites built to convert. Next.js/Astro, conversion UX, and real SEO structure.',
      ogImage: '/modern-brands/og-image-1200x630.png',
    },
  },
  {
    slug: 'modern-consulting',
    brandName: 'Modern Consulting',
    tagline: 'Make operations boring — and profitable.',
    summary:
      'Hands-on leadership to stabilize ops, sharpen sales, and systematize delivery for trades and SMBs. Playbooks, KPIs, cadence.',
    pains: [
      'No process ownership or accountability',
      'Inconsistent sales process and weak follow-up',
      'Scheduling/dispatch chaos and rework',
      'Poor data hygiene and no single source of truth',
      'Leadership spread too thin to fix it',
    ],
    outcomes: [
      'Clear playbooks and role accountability',
      'Structured sales pipeline with training & scripts',
      'Predictable scheduling and on-time delivery',
      'Weekly KPI cadence and visibility',
      'Aligned tech stack (CRM/FSM) that people actually use',
    ],
    services: [
      'Ops audit and prioritized roadmap',
      'Sales process design + training (scripts, objections)',
      'Dispatch & scheduling optimization',
      'KPI design and weekly leadership cadence',
      'SOPs, roles, and accountability systems',
      'Tech stack alignment (CRM/FSM/Integrations)',
    ],
    faqs: [
      {
        q: 'How do engagements start?',
        a: 'We begin with a rapid audit and 30-day stabilization plan, then execute with your leaders.',
      },
      {
        q: 'Do you train the team?',
        a: 'Yes. Ride-alongs, call reviews, scripts, objection handling, and role-play are part of it.',
      },
      {
        q: 'Will you build our SOPs?',
        a: 'Yes. We draft, refine, and implement SOPs with owners, metrics, and review cadence.',
      },
      {
        q: 'Do you help with hiring?',
        a: "We assist with role definition, scorecards, and interview frameworks. We're not a staffing agency.",
      },
    ],
    externalUrl: 'https://modernconsulting.co',
    logoPath: '/modern-consulting/logo-300x80.png',
    isSquare: false,
    accentHex: '#C7A252',
    seo: {
      title: 'Modern Consulting — Operational Consulting for Trades & SMBs',
      description:
        'Stabilize operations, sharpen sales, and systematize delivery. Playbooks, KPIs, dispatch, and leadership cadence.',
      ogImage: '/modern-consulting/og-image-1200x630.png',
    },
  },
  {
    slug: 'modern-stack',
    brandName: 'Modern Stack',
    tagline: 'Lean IT. Smart automations. Custom software.',
    summary:
      'Secure, documented, and automated — from MSP fundamentals and Zapier/QBO/CRM integrations to custom apps and APIs.',
    pains: [
      'Overpriced MSP with poor documentation',
      'Duct-taped tools and double-entry everywhere',
      'Insecure networks and no SSO strategy',
      'Manual workflows that should be automated',
      'No one to design the glue or build it right',
    ],
    outcomes: [
      'Hardened, reliable networking and backups',
      'Documented stack and single sign-on',
      'Automations that remove clicks and errors',
      'Data flows between systems without drama',
      'Custom apps/dashboards that fit your processes',
    ],
    services: [
      'MSP basics (networking, device mgmt, backups)',
      'Security hardening and SSO where applicable',
      'QuickBooks + Zapier automations',
      'CRM/FSM integrations (SuiteDash/GHL/etc.)',
      'Custom software (apps, APIs, dashboards)',
      'Documentation & onboarding runbooks',
    ],
    faqs: [
      {
        q: 'Do you replace our MSP?',
        a: 'We can replace or augment. First step is an audit to score risk, cost, and uptime.',
      },
      {
        q: 'Which tools do you support?',
        a: 'QBO, Zapier, Microsoft 365, Google Workspace, SuiteDash/GHL, and common SMB stacks.',
      },
      {
        q: 'Can you build integrations for us?',
        a: 'Yes. From no-code automations to custom APIs and services, we design the right glue.',
      },
      {
        q: "What's your incident response?",
        a: 'We define severity levels, SLAs, and escalation runbooks as part of onboarding.',
      },
    ],
    externalUrl: 'https://moderntechstack.co',
    logoPath: '/modern-stack/logo-300x80.png',
    isSquare: false,
    accentHex: '#0881C2',
    seo: {
      title: 'Modern Stack — IT, Integrations & Custom Software',
      description:
        'Lean MSP, security, Zapier/QBO, CRM/FSM integrations, and custom apps/APIs. Secure, documented, and automated.',
      ogImage: '/modern-stack/og-image-1200x630.png',
    },
  },
];
