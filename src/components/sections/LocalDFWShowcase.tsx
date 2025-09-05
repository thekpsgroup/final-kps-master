import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Building, MapPin, Star, TrendingUp, Users } from 'lucide-react';

const DFW_CITIES = [
  { name: 'Dallas', slug: 'dallas', population: '1.3M+', businesses: '50K+' },
  { name: 'Fort Worth', slug: 'fort-worth', population: '900K+', businesses: '35K+' },
  { name: 'Frisco', slug: 'frisco', population: '200K+', businesses: '3K+' },
  { name: 'McKinney', slug: 'mckinney', population: '200K+', businesses: '2.5K+' },
  { name: 'Plano', slug: 'plano', population: '290K+', businesses: '4K+' },
  { name: 'Allen', slug: 'allen', population: '110K+', businesses: '1.2K+' },
  { name: 'Garland', slug: 'garland', population: '242K+', businesses: '3.5K+' },
  { name: 'Rockwall', slug: 'rockwall', population: '47K+', businesses: '800+' },
  { name: 'Royse City', slug: 'royse-city', population: '13K+', businesses: '200+' },
  { name: 'Fate', slug: 'fate', population: '12K+', businesses: '150+' },
  { name: 'Wylie', slug: 'wylie', population: '55K+', businesses: '600+' },
  { name: 'Sachse', slug: 'sachse', population: '28K+', businesses: '300+' },
  { name: 'Rowlett', slug: 'rowlett', population: '63K+', businesses: '700+' },
  { name: 'Lavon', slug: 'lavon', population: '4K+', businesses: '50+' },
  { name: 'Nevada', slug: 'nevada', population: '1K+', businesses: '25+' },
  { name: 'Josephine', slug: 'josephine', population: '2K+', businesses: '30+' },
  { name: 'Farmersville', slug: 'farmersville', population: '4K+', businesses: '60+' },
  { name: 'Princeton', slug: 'princeton', population: '14K+', businesses: '180+' },
  { name: 'Lowry Crossing', slug: 'lowry-crossing', population: '2K+', businesses: '20+' },
  { name: 'Lucas', slug: 'lucas', population: '9K+', businesses: '120+' },
  { name: 'Murphy', slug: 'murphy', population: '22K+', businesses: '250+' },
  { name: 'Parker', slug: 'parker', population: '6K+', businesses: '80+' },
];

const DFW_SERVICES = [
  {
    name: 'Construction Bookkeeping',
    slug: 'bookkeeping',
    icon: '🏗️',
    target: 'construction companies',
  },
  { name: 'Home Services Payroll', slug: 'payroll', icon: '🏠', target: 'home service businesses' },
  { name: 'HVAC Operations', slug: 'consulting', icon: '❄️', target: 'HVAC companies' },
  { name: 'Plumbing Software', slug: 'software', icon: '🔧', target: 'plumbing companies' },
  { name: 'Electrical Branding', slug: 'branding', icon: '⚡', target: 'electrical companies' },
  {
    name: 'General Contractor Consulting',
    slug: 'consulting',
    icon: '�',
    target: 'general contractors',
  },
];

export default function LocalDFWShowcase() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-2">
              🏙️ Dallas-Fort Worth Metro Coverage
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Serving All of DFW
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From downtown Dallas to the suburbs of Fort Worth, we provide comprehensive business
              operations support across the entire Dallas-Fort Worth metroplex.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>22+ Cities Covered</span>
              </div>
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-green-600" />
                <span>100K+ Businesses Served</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-600" />
                <span>4.9/5 Local Rating</span>
              </div>
            </div>
          </div>

          {/* Cities Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Cities We Serve in DFW
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {DFW_CITIES.map((city) => (
                <Card
                  key={city.slug}
                  className="hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CardContent className="p-4 text-center">
                    <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">{city.name}</h4>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>{city.population} residents</div>
                      <div>{city.businesses} businesses</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Services in DFW */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Our Services Across DFW
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {DFW_SERVICES.map((service) => (
                <Card key={service.slug} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                    <p className="text-sm text-gray-600">
                      Specialized {service.name.toLowerCase()} for {service.target} in DFW
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Local Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">7M+</div>
                <div className="text-gray-600">DFW Population Served</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Building className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">150K+</div>
                <div className="text-gray-600">Businesses in Our Service Area</div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-8">
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
                <div className="text-gray-600">Growing Businesses Supported</div>
              </CardContent>
            </Card>
          </div>

          {/* Local SEO Keywords */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Local Search Terms We Rank For
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'Construction Bookkeeping Dallas',
                'Home Services Payroll Frisco',
                'HVAC Business Consulting Plano',
                'Plumbing Software McKinney',
                'Electrical Branding Allen',
                'General Contractor Operations Garland',
                'Construction Payroll Rockwall',
                'Home Service Bookkeeping Royse City',
                'HVAC Software Solutions DFW',
                'Plumbing Business Consulting Fort Worth',
                'Electrical Operations Management Dallas Metro',
                'General Contractor Bookkeeping DFW',
                'Construction Company Payroll Services',
                'Home Services Financial Management',
                'HVAC Company Bookkeeping',
                'Plumbing Business Operations',
                'Electrical Contractor Software',
                'General Contractor Consulting DFW',
              ].map((keyword, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Grow Your DFW Business?</h3>
              <p className="text-lg mb-6 opacity-90">
                Get your FREE back-office assessment and discover how we can save you thousands
                annually.
              </p>
              <a
                href="/consultation"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Your FREE DFW Assessment
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
