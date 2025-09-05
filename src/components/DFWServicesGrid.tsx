import Link from 'next/link';

const services = [
  {
    title: 'Home Services',
    href: '/services/home-services',
    bullets: ['Accurate payroll', 'Local compliance'],
  },
  {
    title: 'HVAC',
    href: '/services/hvac',
    bullets: ['Trade-friendly payroll', 'Job-cost tracking'],
  },
  {
    title: 'Electrical Contractors',
    href: '/services/electrical',
    bullets: ['Certified payroll', 'Workforce management'],
  },
  {
    title: 'General Contractors',
    href: '/services/general-contractors',
    bullets: ['Subcontractor payments', 'Streamlined invoicing'],
  },
  {
    title: 'Operational Consulting',
    href: '/services/ops-consulting',
    bullets: ['Process optimization', 'Staffing support'],
  },
];

export default function DFWServicesGrid() {
  return (
    <section aria-label="DFW services" className="mt-6">
      <h2 className="text-xl font-semibold">Services for DFW Contractors</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <article
            key={s.title}
            className="flex flex-col rounded-2xl p-6 bg-white shadow-sm h-full"
          >
            <div className="text-sm font-medium text-gray-700">{s.title}</div>
            <ul className="mt-3 space-y-2 text-gray-600 flex-1">
              {s.bullets.map((b) => (
                <li key={b} className="text-sm">
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href={s.href} className="text-sm font-medium text-blue-600 hover:underline">
                Explore
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
