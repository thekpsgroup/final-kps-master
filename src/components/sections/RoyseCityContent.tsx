import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Building, Home, GraduationCap, ShoppingBag } from 'lucide-react';
import { LocationData } from '@/lib/locationData';

interface RoyseCityContentProps {
  service: string;
  location?: LocationData;
  className?: string;
}

const DALLAS_METRO_DATA = {
  'royse-city': {
    demographics: {
      population: '13,000+',
      medianIncome: '$85,000+',
      medianHomeValue: '$350,000+',
      growth: '25% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '200+',
      majorEmployers: ['Royse City ISD', 'Rockwall County', 'Manufacturing Facilities', 'Retail Centers'],
      industries: ['Education', 'Manufacturing', 'Retail', 'Healthcare', 'Construction']
    },
    communities: [
      'Royse City Proper',
      'Fate',
      'Nevada',
      'Mobile City',
      'McLendon-Chisholm',
      'Rockwall County'
    ],
    zipCodes: ['75189', '75032', '75087', '75132'],
    landmarks: [
      'Royse City High School',
      'Lake Ray Hubbard',
      'Royse City Farmers Market',
      'Rockwall County Fairgrounds',
      'Interstate 30 Corridor'
    ]
  },
  'fate': {
    demographics: {
      population: '12,000+',
      medianIncome: '$90,000+',
      medianHomeValue: '$375,000+',
      growth: '30% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '150+',
      majorEmployers: ['Manufacturing', 'Distribution Centers', 'Retail', 'Healthcare'],
      industries: ['Manufacturing', 'Logistics', 'Retail', 'Healthcare', 'Technology']
    },
    communities: [
      'Fate',
      'Royse City',
      'Lavon',
      'Nevada',
      'Wylie'
    ],
    zipCodes: ['75032', '75189', '75048', '75173'],
    landmarks: [
      'Fate Community Center',
      'Interstate 30',
      'Lake Lavon',
      'Fate Marketplace',
      'Rockwall County Parks'
    ]
  },
  'frisco': {
    demographics: {
      population: '200,000+',
      medianIncome: '$130,000+',
      medianHomeValue: '$550,000+',
      growth: '300% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '3,000+',
      majorEmployers: ['Toyota Motor Manufacturing', 'Liberty Mutual', 'Dr Pepper', 'Tech Companies'],
      industries: ['Technology', 'Manufacturing', 'Healthcare', 'Finance', 'Education']
    },
    communities: [
      'Frisco Proper',
      'The Colony',
      'Little Elm',
      'Oak Point',
      'Denton County'
    ],
    zipCodes: ['75033', '75034', '75035', '75036'],
    landmarks: [
      'Toyota Stadium',
      'Dr Pepper Ballpark',
      'Stonebriar Centre',
      'Frisco Premium Outlets',
      'Lake Lewisville'
    ]
  },
  'mckinney': {
    demographics: {
      population: '200,000+',
      medianIncome: '$95,000+',
      medianHomeValue: '$400,000+',
      growth: '150% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '2,500+',
      majorEmployers: ['Raytheon Technologies', 'Medical City McKinney', 'Collin College', 'Retail Centers'],
      industries: ['Healthcare', 'Education', 'Manufacturing', 'Retail', 'Technology']
    },
    communities: [
      'McKinney Proper',
      'Fairview',
      'Allen',
      'Melissa',
      'Anna'
    ],
    zipCodes: ['75069', '75070', '75071', '75072'],
    landmarks: [
      'McKinney National Memorial',
      'Historic Downtown Square',
      'Medical City McKinney',
      'Stonebridge Ranch',
      'Lake Forest Park'
    ]
  },
  'plano': {
    demographics: {
      population: '290,000+',
      medianIncome: '$90,000+',
      medianHomeValue: '$420,000+',
      growth: '20% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '4,000+',
      majorEmployers: ['HP Enterprise', 'JCPenney', 'Pizza Hut', 'Siemens', 'Ericsson'],
      industries: ['Technology', 'Healthcare', 'Retail', 'Finance', 'Manufacturing']
    },
    communities: [
      'Plano Proper',
      'Murphy',
      'Richardson',
      'Sachse',
      'Wylie'
    ],
    zipCodes: ['75023', '75024', '75025', '75026', '75074'],
    landmarks: [
      'Plano Centre',
      'The Shops at Legacy',
      'Plano Balloon Festival',
      'Heritage Farmstead Museum',
      'Bob Woodruff Park'
    ]
  },
  'allen': {
    demographics: {
      population: '110,000+',
      medianIncome: '$110,000+',
      medianHomeValue: '$450,000+',
      growth: '80% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '1,200+',
      majorEmployers: ['Raytheon Technologies', 'Texas Instruments', 'Medical Facilities', 'Retail'],
      industries: ['Technology', 'Healthcare', 'Education', 'Manufacturing', 'Retail']
    },
    communities: [
      'Allen Proper',
      'Parker',
      'Lucas',
      'Fairview',
      'McKinney'
    ],
    zipCodes: ['75002', '75013'],
    landmarks: [
      'Allen Event Center',
      'Historic Downtown Allen',
      'Twin Creeks Sportsplex',
      'Allen Premium Outlets',
      'Watters Creek'
    ]
  },
  'garland': {
    demographics: {
      population: '242,000+',
      medianIncome: '$55,000+',
      medianHomeValue: '$180,000+',
      growth: '10% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '3,500+',
      majorEmployers: ['Baylor Scott & White', 'Methodist Hospitals', 'Retail Centers', 'Manufacturing'],
      industries: ['Healthcare', 'Retail', 'Manufacturing', 'Education', 'Logistics']
    },
    communities: [
      'Garland Proper',
      'Sachse',
      'Rowlett',
      'Sunnyvale',
      'Mesquite'
    ],
    zipCodes: ['75040', '75041', '75042', '75043', '75044'],
    landmarks: [
      'Garland Arts District',
      'Lake Ray Hubbard',
      'Spring Creek Forest Preserve',
      'Garland Farmers Market',
      'Frontier Park'
    ]
  },
  'rockwall': {
    demographics: {
      population: '47,000+',
      medianIncome: '$85,000+',
      medianHomeValue: '$350,000+',
      growth: '60% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '800+',
      majorEmployers: ['Rockwall ISD', 'Medical Facilities', 'Retail Centers', 'Manufacturing'],
      industries: ['Education', 'Healthcare', 'Retail', 'Manufacturing', 'Construction']
    },
    communities: [
      'Rockwall Proper',
      'Heath',
      'Fate',
      'Royse City',
      'McLendon-Chisholm'
    ],
    zipCodes: ['75032', '75087', '75132', '75189'],
    landmarks: [
      'Rockwall Harbor',
      'Lake Ray Hubbard',
      'Historic Downtown Rockwall',
      'Rockwall County Fairgrounds',
      'Great Wolf Lodge'
    ]
  },
  'wylie': {
    demographics: {
      population: '55,000+',
      medianIncome: '$80,000+',
      medianHomeValue: '$280,000+',
      growth: '70% population growth (2010-2020)'
    },
    businessStats: {
      smallBusinesses: '600+',
      majorEmployers: ['Wylie ISD', 'Medical Facilities', 'Retail Centers', 'Manufacturing'],
      industries: ['Education', 'Healthcare', 'Retail', 'Manufacturing', 'Construction']
    },
    communities: [
      'Wylie Proper',
      'Sachse',
      'Murphy',
      'St. Paul',
      'Lavon'
    ],
    zipCodes: ['75098'],
    landmarks: [
      'Wylie Sportsplex',
      'Historic Downtown Wylie',
      'Wylie Farmers Market',
      'Lake Lavon',
      'Cottonwood Creek Park'
    ]
  }
};

export default function RoyseCityContent({ service, location, className = '' }: RoyseCityContentProps) {
  const citySlug = location?.slug || '';
  const isDallasMetro = Object.keys(DALLAS_METRO_DATA).includes(citySlug);

  if (!isDallasMetro) return null;

  const localData = DALLAS_METRO_DATA[citySlug as keyof typeof DALLAS_METRO_DATA];
  const cityName = location?.city || 'Dallas Metro';

  return (
    <div className={`space-y-16 ${className}`}>
      {/* Local Demographics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Local Community Focus
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Serving {cityName}, Texas Businesses
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Deep local expertise in {cityName} and surrounding Rockwall County communities
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {localData.demographics.population}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Population
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Building className="w-8 h-8 text-green-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {localData.businessStats.smallBusinesses}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Small Businesses
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <Home className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {localData.demographics.medianHomeValue}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Median Home Value
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <GraduationCap className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {localData.demographics.medianIncome}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Median Income
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local Business Focus */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {cityName} Business Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Understanding the unique needs of {cityName} businesses and entrepreneurs
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="w-5 h-5 mr-2 text-blue-600" />
                    Major Employers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {localData.businessStats.majorEmployers.map((employer, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                        {employer}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2 text-green-600" />
                    Key Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {localData.businessStats.industries.map((industry, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3 flex-shrink-0"></div>
                        {industry}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas & ZIP Codes */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Service Areas in {cityName}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Comprehensive coverage across {cityName} and Rockwall County
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                    Communities Served
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {localData.communities.map((community, index) => (
                      <Badge key={index} variant="outline" className="justify-center">
                        {community}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-600" />
                    ZIP Codes Covered
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {localData.zipCodes.map((zip, index) => (
                      <Badge key={index} variant="outline" className="justify-center">
                        {zip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local Landmarks & Points of Interest */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {cityName} Landmarks & Community
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Familiar with the local landscape and community landmarks
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localData.landmarks.map((landmark, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {landmark}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Keywords */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                Local Search Optimization
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {service.charAt(0).toUpperCase() + service.slice(1)} in {cityName} - Specific Searches
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Targeting local searches for {cityName} businesses and residents
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{cityName} Specific</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline">{service} {cityName}</Badge>
                    <Badge variant="outline">{service} near {cityName}</Badge>
                    <Badge variant="outline">{cityName} {service} services</Badge>
                    <Badge variant="outline">best {service} in {cityName}</Badge>
                    <Badge variant="outline">{service} Rockwall County</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ZIP Code Targeting</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {localData.zipCodes.slice(0, 4).map((zip, index) => (
                      <Badge key={index} variant="outline">{service} {zip}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Community Focus</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {localData.communities.slice(0, 4).map((community, index) => (
                      <Badge key={index} variant="outline">{service} {community}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              🚨 Don&apos;t Lose Another Dollar to Inefficient Systems
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your <strong>FREE</strong> back office assessment today and discover how to save thousands annually
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-6">
              <p className="text-lg font-semibold mb-2">What You&apos;ll Get FREE:</p>
              <ul className="text-left max-w-md mx-auto space-y-1">
                <li>✅ Back Office Efficiency Analysis</li>
                <li>✅ Hidden Savings Report ($2K-$10K annually)</li>
                <li>✅ Custom Action Plan</li>
                <li>✅ No Obligation Consultation</li>
              </ul>
            </div>
            <a
              href={`/funnel/${location?.slug || citySlug}`}
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
            >
              🔥 CLAIM YOUR FREE ASSESSMENT NOW
            </a>
            <p className="text-sm mt-4 opacity-75">
              Limited time offer - Only 5 FREE assessments available this week
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
