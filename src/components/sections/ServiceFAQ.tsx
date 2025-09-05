import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocationData } from '@/lib/locationData';

interface ServiceFAQProps {
  service: string;
  location?: LocationData;
  className?: string;
}

const SERVICE_FAQS = {
  payroll: [
    {
      q: 'What payroll services do you offer?',
      a: 'We provide comprehensive payroll processing including weekly/bi-weekly/monthly payroll runs, tax calculations and filings, direct deposit, pay stubs, multi-state tax compliance, new hire onboarding, employee handbook creation, and 24/7 support for urgent payroll needs.',
    },
    {
      q: 'How much does payroll processing cost?',
      a: 'Our pricing is competitive and scales with your business size. We offer transparent pricing with no hidden fees. Contact us for a customized quote based on your employee count and payroll frequency.',
    },
    {
      q: 'Are you compliant with federal and state regulations?',
      a: 'Yes, we guarantee 100% compliance with all federal, state, and local payroll regulations. We stay current with changing tax laws and handle all filings, deductions, and reporting requirements.',
    },
    {
      q: 'How long does it take to switch to your payroll service?',
      a: 'Most businesses can switch within 1-2 weeks. We handle the entire migration process, including data transfer from your current provider, employee setup, and testing to ensure everything works correctly.',
    },
    {
      q: 'Do you offer payroll services for remote employees?',
      a: 'Absolutely! We specialize in multi-state payroll compliance and can handle employees working remotely across different states and countries. We manage all necessary tax filings and withholdings.',
    },
    {
      q: 'What happens if I make a payroll error?',
      a: 'We have comprehensive error prevention measures and insurance coverage. If an error occurs, we work quickly to correct it and handle all communications with employees and regulatory agencies at no additional cost.',
    },
    {
      q: 'Can you handle complex payroll scenarios?',
      a: 'Yes, we handle complex payroll situations including bonuses, commissions, stock options, multiple pay rates, overtime calculations, PTO accruals, and custom deductions. We also support union payroll requirements.',
    },
    {
      q: 'What kind of support do you provide?',
      a: "We offer 24/7 phone and email support, dedicated account managers, online payroll portal access, and comprehensive training for your HR team. We're always available when you need us.",
    },
  ],
  bookkeeping: [
    {
      q: 'What bookkeeping services do you provide?',
      a: 'We offer full-cycle bookkeeping including transaction recording, bank reconciliation, accounts payable/receivable management, financial statement preparation, inventory tracking, and monthly/quarterly reporting.',
    },
    {
      q: 'How often will I receive financial reports?',
      a: "We provide monthly financial statements, quarterly reviews, and annual reports. You'll also have real-time access to your financial data through our secure online portal.",
    },
    {
      q: 'Do you work with my existing accounting software?',
      a: "Yes, we integrate with QuickBooks, Xero, FreshBooks, and most other accounting software. If you don't have accounting software, we can recommend and set up the best solution for your business.",
    },
    {
      q: 'How do you ensure accuracy in bookkeeping?',
      a: 'We use double-entry accounting methods, automated reconciliation processes, and regular quality checks. All work is reviewed by certified bookkeepers and accountants.',
    },
    {
      q: 'Can you help with tax preparation?',
      a: 'While we focus on bookkeeping, we can prepare your books for tax time and work closely with your tax professional. We also provide year-end financial statements optimized for tax planning.',
    },
    {
      q: 'What if I need bookkeeping services urgently?',
      a: "We offer rush bookkeeping services for businesses that need catch-up work or have urgent deadlines. Contact us to discuss your timeline and we'll accommodate your needs.",
    },
    {
      q: 'Do you provide training for my staff?',
      a: 'Yes, we offer training sessions for your internal staff on bookkeeping processes, software usage, and financial management best practices to help you become more self-sufficient.',
    },
    {
      q: 'How secure is my financial data?',
      a: 'We use bank-level encryption, secure cloud storage, and follow strict data protection protocols. Your financial data is completely confidential and secure.',
    },
  ],
  branding: [
    {
      q: 'What does your branding process involve?',
      a: 'Our branding process includes brand discovery, competitor analysis, brand strategy development, visual identity creation (logo, colors, typography), brand guidelines, and implementation support.',
    },
    {
      q: 'How long does a branding project take?',
      a: 'Most branding projects take 4-8 weeks depending on complexity. We work efficiently while ensuring we create a brand that truly represents your business and resonates with your target audience.',
    },
    {
      q: 'Do you provide logo design services?',
      a: 'Yes, logo design is a core part of our branding services. We create custom logos that are unique, scalable, and work across all mediums including digital and print.',
    },
    {
      q: 'Can you help with rebranding an existing business?',
      a: 'Absolutely! We specialize in rebranding projects and understand the challenges involved. We help maintain brand equity while modernizing your visual identity and messaging.',
    },
    {
      q: 'What deliverables will I receive?',
      a: "You'll receive a complete brand package including logo files, brand guidelines, color palettes, typography specifications, brand voice guidelines, and all necessary digital assets.",
    },
    {
      q: 'Do you offer website design as part of branding?',
      a: 'While we focus on brand strategy and identity, we can collaborate with web designers or provide recommendations. We ensure your brand works seamlessly across all digital and physical touchpoints.',
    },
    {
      q: 'How do you measure branding success?',
      a: 'We track brand awareness, customer perception, and business growth metrics. We also provide ongoing brand monitoring and recommendations for brand evolution as your business grows.',
    },
    {
      q: "What's your design philosophy?",
      a: 'We believe great design solves problems and creates connections. Our approach is strategic, research-driven, and focused on creating brands that drive business results.',
    },
  ],
  consulting: [
    {
      q: 'What types of businesses do you consult for?',
      a: 'We work with businesses of all sizes, from startups to established companies across all industries. Our expertise spans operations, strategy, finance, HR, and technology implementation.',
    },
    {
      q: 'How do you approach business consulting?',
      a: 'We start with a comprehensive assessment of your current state, identify opportunities for improvement, develop customized strategies, and provide implementation support with measurable outcomes.',
    },
    {
      q: 'What are your consulting rates?',
      a: 'Our rates vary based on project scope and complexity. We offer both hourly consulting and fixed-price projects. Contact us for a customized proposal based on your specific needs.',
    },
    {
      q: 'Do you provide ongoing consulting support?',
      a: 'Yes, we offer retainer-based consulting for businesses that need ongoing strategic support. This includes regular check-ins, strategy refinement, and continuous improvement initiatives.',
    },
    {
      q: 'Can you help with digital transformation?',
      a: 'Absolutely! We specialize in helping businesses leverage technology for growth. This includes software implementation, process automation, data analytics, and digital strategy development.',
    },
    {
      q: 'What industries do you have experience in?',
      a: 'Our consultants have experience across healthcare, manufacturing, retail, professional services, technology, construction, and many other industries. We bring both general business expertise and industry-specific insights.',
    },
    {
      q: 'How do you measure consulting success?',
      a: 'We establish clear KPIs and success metrics at the beginning of each engagement. We track progress against these metrics and provide regular reports on implementation and results.',
    },
    {
      q: 'Do you offer training as part of consulting?',
      a: 'Yes, we include training and knowledge transfer as part of our consulting engagements. We ensure your team has the skills and knowledge to sustain improvements after our engagement ends.',
    },
  ],
  software: [
    {
      q: 'What types of software solutions do you offer?',
      a: 'We provide custom software development, CRM systems, field service management, business automation, mobile apps, web applications, and system integrations tailored to your business needs.',
    },
    {
      q: 'How do you determine the right software solution?',
      a: 'We start with a thorough analysis of your business processes, pain points, and goals. We then recommend solutions that best fit your needs, budget, and long-term objectives.',
    },
    {
      q: 'Do you build custom software or use off-the-shelf solutions?',
      a: 'We do both! We recommend off-the-shelf solutions when they meet your needs, and build custom software when you need something unique. Our goal is always the best solution for your business.',
    },
    {
      q: 'How long does software development take?',
      a: 'Timeline depends on complexity, but most projects range from 2-6 months. We use agile development methods to deliver working software quickly and iterate based on your feedback.',
    },
    {
      q: "What's your development process?",
      a: "We use agile methodology with regular check-ins, transparent communication, and iterative development. You'll see progress regularly and have input at every stage of the process.",
    },
    {
      q: 'Do you provide ongoing support after launch?',
      a: 'Yes, we offer comprehensive post-launch support including bug fixes, feature updates, performance monitoring, and user training. We ensure your software continues to meet your evolving needs.',
    },
    {
      q: 'How do you handle data migration?',
      a: 'We have extensive experience with data migration projects. We assess your current data, plan the migration process, perform thorough testing, and ensure data integrity throughout the transition.',
    },
    {
      q: 'What technologies do you work with?',
      a: 'We work with modern technologies including React, Node.js, Python, .NET, cloud platforms (AWS, Azure, GCP), databases (SQL, NoSQL), and mobile development frameworks.',
    },
  ],
};

export default function ServiceFAQ({ service, location, className = '' }: ServiceFAQProps) {
  const faqs = SERVICE_FAQS[service as keyof typeof SERVICE_FAQS] || [];
  const cityName = location ? location.city : '';

  return (
    <section className={`py-16 bg-white dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {service.charAt(0).toUpperCase() + service.slice(1)} Questions & Answers
              {cityName && ` in ${cityName}`}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get answers to common questions about our {service} services
              {cityName && ` in ${cityName}`}. Can&apos;t find what you&apos;re looking for?
              <a href="/contact" className="text-blue-600 hover:underline ml-1">
                Contact us directly
              </a>
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {service.charAt(0).toUpperCase() + service.slice(1)} FAQ
                {cityName && ` - ${cityName}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {location && (
            <div className="mt-12 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Need {service.charAt(0).toUpperCase() + service.slice(1)} Services in {cityName}?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get a free consultation and discover how we can help your {cityName} business
                  thrive.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/consultation"
                    className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Free Consultation
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
