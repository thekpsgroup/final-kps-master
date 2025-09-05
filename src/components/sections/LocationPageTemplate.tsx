import { LocationData } from "@/lib/locationData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface LocationPageTemplateProps {
  location: LocationData;
  service: string;
  serviceTitle: string;
  serviceDescription: string;
  keywords: string[];
}

export default function LocationPageTemplate({
  location,
  serviceTitle,
  serviceDescription,
  keywords
}: LocationPageTemplateProps) {
  const cityState = `${location.city}, ${location.state}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Serving {cityState}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {serviceTitle} in {location.city}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              {serviceDescription} Trusted by businesses across {location.city} for reliable, compliant, and professional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/consultation">
                  Get Free Consultation
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Services in {location.city}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Payroll Processing</CardTitle>
                  <CardDescription>
                    Accurate payroll processing with multi-state compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Weekly, bi-weekly, and monthly payroll</li>
                    <li>• Tax calculations and filings</li>
                    <li>• Direct deposit and pay stubs</li>
                    <li>• Multi-state tax compliance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>HR Compliance</CardTitle>
                  <CardDescription>
                    Complete HR compliance and documentation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• New hire onboarding</li>
                    <li>• Employee handbook</li>
                    <li>• Policy management</li>
                    <li>• Compliance monitoring</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Time & Attendance</CardTitle>
                  <CardDescription>
                    Automated time tracking and PTO management
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Time clock integration</li>
                    <li>• PTO accrual tracking</li>
                    <li>• Overtime calculations</li>
                    <li>• Mobile time tracking</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local Keywords Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Popular Searches in {location.city}
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {keywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {keyword} {location.city.toLowerCase()}
                </Badge>
              ))}
              <Badge variant="outline" className="text-sm">
                ADP payroll alternatives {location.city.toLowerCase()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                payroll service {location.city.toLowerCase()}
              </Badge>
              <Badge variant="outline" className="text-sm">
                small business payroll {location.city.toLowerCase()}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">
                  Why Choose Us in {location.city}?
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong>Local Expertise:</strong> Deep understanding of {location.city} business environment and local regulations
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong>Fast Implementation:</strong> Quick setup and migration from existing payroll systems
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong>24/7 Support:</strong> Round-the-clock support for urgent payroll needs
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <div>
                      <strong>Compliance Guarantee:</strong> 100% compliance with federal, state, and local regulations
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">
                  Service Areas Near {location.city}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>{location.city} Metro Area</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Greater {location.city} Region</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Surrounding Counties</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span>Remote Workforce Support</span>
                  </div>
                </div>

                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Serving businesses in {location.city} and throughout {location.state}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">
                    <Link href="/contact" className="text-blue-600 hover:underline">
                      Schedule your free consultation
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started in {location.city}?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of {location.city} businesses who trust us with their payroll needs.
            Get started with a free consultation today.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/consultation">
              Get Your Free Consultation
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
