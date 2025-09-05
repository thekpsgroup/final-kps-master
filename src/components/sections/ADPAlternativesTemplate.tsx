import { LocationData } from "@/lib/locationData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Star, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ADPAlternativesTemplateProps {
  location: LocationData;
}

export default function ADPAlternativesTemplate({ location }: ADPAlternativesTemplateProps) {
  const cityState = `${location.city}, ${location.state}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="destructive" className="mb-4">
              ADP Payroll Alternatives in {cityState}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Better Than ADP Payroll in {location.city}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Frustrated with ADP? Discover Modern Pay - the superior payroll alternative trusted by {location.city} businesses for better service, lower costs, and modern features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/consultation">
                  Get Free ADP Migration Quote
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/modern-pay">
                  Learn About Modern Pay
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ADP vs Modern Pay Comparison */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              ADP Payroll Alternatives: Why {location.city} Businesses Choose Modern Pay
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* ADP Problems */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center">
                    <XCircle className="w-6 h-6 mr-2" />
                    Common ADP Payroll Issues in {location.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>High Costs:</strong> Hidden fees and expensive add-ons
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Poor Support:</strong> Long wait times and unhelpful reps
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Outdated Interface:</strong> Clunky, hard-to-use software
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Limited Features:</strong> Missing modern payroll capabilities
                    </div>
                  </div>
                  <div className="flex items-start">
                    <XCircle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Compliance Issues:</strong> Frequent errors and penalties
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Modern Pay Benefits */}
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2" />
                    Modern Pay Solutions for {location.city} Businesses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Lower Costs:</strong> Transparent pricing, no hidden fees
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Premium Support:</strong> Dedicated account managers
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Modern Interface:</strong> Intuitive, mobile-friendly platform
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>Advanced Features:</strong> AI-powered insights and automation
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <strong>100% Compliance:</strong> Guaranteed accuracy and compliance
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-8">What {location.city} Businesses Say</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      &ldquo;Switched from ADP and saved 30% while getting better service. The modern interface is a game-changer.&rdquo;
                    </p>
                    <p className="text-sm font-semibold">- {location.city} Construction Company</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      &ldquo;ADP support was terrible. Modern Pay&apos;s team actually helps when we call. Worth every penny.&rdquo;
                    </p>
                    <p className="text-sm font-semibold">- {location.city} Tech Startup</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      &ldquo;Finally found a payroll solution that works for our growing {location.city} business.&rdquo;
                    </p>
                    <p className="text-sm font-semibold">- {location.city} Retail Chain</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular ADP Alternatives Searches */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              ADP Payroll Alternatives Searches in {location.city}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Badge variant="outline">ADP payroll alternatives {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP alternatives {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP replacement {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP competitor {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">payroll software vs ADP {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP too expensive {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP customer service {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">switch from ADP {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP alternatives cost {location.city.toLowerCase()}</Badge>
              <Badge variant="outline">ADP payroll problems {location.city.toLowerCase()}</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Easy ADP Migration for {location.city} Businesses
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Assessment</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We analyze your current ADP setup and identify savings opportunities
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Migration</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Seamless transfer of employee data and historical payroll records
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Testing & Training</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Comprehensive testing and staff training on the new platform
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Go-Live Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Full support during transition with dedicated migration specialist
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Leave ADP Behind in {location.city}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get a free, no-obligation quote for switching from ADP to Modern Pay.
            Most {location.city} businesses save money and get better service.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/consultation">
              Get Your Free ADP Migration Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
