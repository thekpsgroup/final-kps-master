import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LocationData } from '@/lib/locationData';
import { CheckCircle, Clock, TrendingUp, Users } from 'lucide-react';

interface ContentExpansionProps {
  service: string;
  location?: LocationData;
  className?: string;
}

const SERVICE_CONTENT = {
  payroll: {
    longTailKeywords: [
      'payroll processing for small businesses',
      'affordable payroll services near me',
      'outsourced payroll management solutions',
      'payroll tax compliance services',
      'multi state payroll processing',
      'payroll services for startups',
      'remote employee payroll solutions',
      'payroll services with direct deposit',
      'automated payroll processing system',
      'payroll services for contractors',
      'year end payroll processing',
      'payroll services for non profits',
      'international payroll services',
      'payroll services for healthcare',
      'construction payroll services',
    ],
    benefits: [
      {
        icon: CheckCircle,
        title: '100% Compliance Guarantee',
        description:
          'We ensure all federal, state, and local payroll regulations are met with zero penalties for compliance issues.',
      },
      {
        icon: TrendingUp,
        title: 'Cost Effective Solutions',
        description:
          'Reduce your payroll processing costs by up to 40% compared to in-house payroll management.',
      },
      {
        icon: Users,
        title: 'Expert HR Support',
        description:
          'Access to certified payroll professionals and HR experts for all your employment needs.',
      },
      {
        icon: Clock,
        title: '24/7 Processing',
        description:
          'Round-the-clock payroll processing and support to handle urgent payroll needs anytime.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Initial Consultation',
        description: 'We assess your current payroll needs and discuss your business goals.',
      },
      {
        step: '02',
        title: 'Data Migration',
        description: 'Secure transfer of your employee and payroll data to our systems.',
      },
      {
        step: '03',
        title: 'System Setup',
        description:
          'Configuration of payroll schedules, tax withholdings, and compliance settings.',
      },
      {
        step: '04',
        title: 'Testing & Training',
        description: 'Thorough testing of payroll runs and training for your team.',
      },
      {
        step: '05',
        title: 'Go-Live Support',
        description: 'Full support during your first payroll run and ongoing assistance.',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Johnson',
        company: 'Tech Startup Inc.',
        text: 'The KPS Group transformed our payroll process. We went from spending 20 hours per week on payroll to just 2 hours of oversight. Their compliance expertise gives us complete peace of mind.',
        rating: 5,
      },
      {
        name: 'Mike Chen',
        company: 'Manufacturing Co.',
        text: 'As we expanded to multiple states, managing payroll became overwhelming. The KPS Group handled our multi-state compliance seamlessly. Their service is worth every penny.',
        rating: 5,
      },
      {
        name: 'Jennifer Davis',
        company: 'Healthcare Practice',
        text: 'The accuracy and reliability of their payroll service is outstanding. No more worrying about tax filings or compliance issues. They handle everything professionally.',
        rating: 5,
      },
    ],
  },
  bookkeeping: {
    longTailKeywords: [
      'bookkeeping services for small businesses',
      'affordable bookkeeping near me',
      'outsourced bookkeeping solutions',
      'monthly bookkeeping services',
      'bookkeeping for startups',
      'quickbooks bookkeeping services',
      'bookkeeping for real estate',
      'bookkeeping for restaurants',
      'bookkeeping for e-commerce',
      'year end bookkeeping services',
      'bookkeeping for non profits',
      'bookkeeping for medical practices',
      'bookkeeping for law firms',
      'bookkeeping for retail stores',
      'bookkeeping cleanup services',
    ],
    benefits: [
      {
        icon: CheckCircle,
        title: 'Accurate Financial Records',
        description:
          'Precise bookkeeping with double-entry accounting methods and regular reconciliation.',
      },
      {
        icon: TrendingUp,
        title: 'Financial Insights',
        description:
          'Regular financial reports and analysis to help you make informed business decisions.',
      },
      {
        icon: Users,
        title: 'Certified Professionals',
        description: 'Work with certified bookkeepers and accountants with years of experience.',
      },
      {
        icon: Clock,
        title: 'Timely Reporting',
        description: 'Monthly financial statements and quarterly reviews delivered on schedule.',
      },
    ],
    process: [
      {
        step: '01',
        title: 'Account Setup',
        description: 'Initial setup of your chart of accounts and bookkeeping system.',
      },
      {
        step: '02',
        title: 'Data Organization',
        description: 'Organization and categorization of your financial documents.',
      },
      {
        step: '03',
        title: 'Transaction Recording',
        description: 'Accurate recording of all income, expenses, and financial transactions.',
      },
      {
        step: '04',
        title: 'Reconciliation',
        description: 'Monthly reconciliation of bank statements and accounts.',
      },
      {
        step: '05',
        title: 'Financial Reporting',
        description: 'Preparation of monthly financial statements and analysis.',
      },
    ],
    testimonials: [
      {
        name: 'David Wilson',
        company: 'E-commerce Store',
        text: 'Their bookkeeping service has been a game-changer for our online business. We now have clear visibility into our finances and can make data-driven decisions.',
        rating: 5,
      },
      {
        name: 'Lisa Rodriguez',
        company: 'Restaurant Owner',
        text: 'Managing restaurant finances was overwhelming until we found The KPS Group. Their expertise in hospitality bookkeeping is exactly what we needed.',
        rating: 5,
      },
      {
        name: 'Robert Kim',
        company: 'Real Estate Agency',
        text: 'The accuracy and timeliness of their bookkeeping service has helped us scale our real estate business. Highly recommend their services.',
        rating: 5,
      },
    ],
  },
};

export default function ContentExpansion({
  service,
  location,
  className = '',
}: ContentExpansionProps) {
  const content = SERVICE_CONTENT[service as keyof typeof SERVICE_CONTENT];
  if (!content) return null;

  const cityName = location ? location.city : '';

  return (
    <div className={`space-y-16 ${className}`}>
      {/* Long-tail Keywords Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Popular Search Terms
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {service.charAt(0).toUpperCase() + service.slice(1)} Services People Search For
                {cityName && ` in ${cityName}`}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover the most searched {service} terms and services in {cityName || 'your area'}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.longTailKeywords.map((keyword, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {keyword}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our {service.charAt(0).toUpperCase() + service.slice(1)} Services?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Experience the difference with our comprehensive {service} solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {content.benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{benefit.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our {service.charAt(0).toUpperCase() + service.slice(1)} Process
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                A streamlined approach to delivering exceptional {service} services
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
              {content.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Real feedback from businesses using our {service} services
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {content.testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">
                          ★
                        </span>
                      ))}
                    </div>
                    <blockquote className="text-gray-600 dark:text-gray-300 mb-4 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.company}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
