// import fs from 'fs';
// import path from 'path';
import { CSVParser, LocationKeyword } from './csv-parser';

export interface SEOKeyword {
  keyword: string;
  searchVolume: number;
  competition: number;
  priority: 'high' | 'medium' | 'low';
  category: string;
  targetPage: string;
  metaTitle: string;
  metaDescription: string;
  h1Heading: string;
  contentFocus: string;
}

export interface LocationSEOData {
  city: string;
  state?: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  h1Heading: string;
  content: string;
  structuredData: unknown;
}

export class SEOOptimizer {
  private keywords: SEOKeyword[] = [];
  private locationKeywords: LocationKeyword[] = [];
  private keywordMap: Map<string, SEOKeyword> = new Map();

  constructor() {
    this.loadKeywords();
    this.loadLocationKeywords();
  }

  private loadKeywords() {
    // Fallback to default keywords since the CSV is location-based
    this.keywords = this.getDefaultKeywords();
    this.keywords.forEach(keyword => {
      this.keywordMap.set(keyword.keyword.toLowerCase(), keyword);
    });
  }

  private loadLocationKeywords() {
    try {
      this.locationKeywords = CSVParser.parseLocationKeywords('seo-keywords.csv');
      console.log(`Loaded ${this.locationKeywords.length} location-based keywords`);
    } catch (error) {
      console.warn('Could not load location keywords:', error);
      this.locationKeywords = [];
    }
  }

  private getDefaultKeywords(): SEOKeyword[] {
    return [
      {
        keyword: "payroll services",
        searchVolume: 4800,
        competition: 0.65,
        priority: "high",
        category: "payroll",
        targetPage: "modern-pay",
        metaTitle: "Payroll Services for SMBs | KPS Group",
        metaDescription: "Professional payroll services for small and medium businesses. Multi-state compliance, automated tax filings, and HR support.",
        h1Heading: "Complete Payroll Solutions",
        contentFocus: "payroll compliance, multi-state payroll, automated tax filings"
      },
      {
        keyword: "bookkeeping services",
        searchVolume: 2900,
        competition: 0.58,
        priority: "high",
        category: "finance",
        targetPage: "modern-ledger",
        metaTitle: "Bookkeeping Services | Professional Financial Management",
        metaDescription: "Expert bookkeeping services for businesses. Clean books, financial clarity, and audit-ready documentation.",
        h1Heading: "Professional Bookkeeping Services",
        contentFocus: "bookkeeping, financial management, clean books"
      }
    ];
  }

  // Get keywords for a specific page
  getKeywordsForPage(pageSlug: string): SEOKeyword[] {
    return this.keywords.filter(keyword => keyword.targetPage === pageSlug);
  }

  // Get keywords by category
  getKeywordsByCategory(category: string): SEOKeyword[] {
    return this.keywords.filter(keyword => keyword.category === category);
  }

  // Get keywords by priority
  getKeywordsByPriority(priority: 'high' | 'medium' | 'low'): SEOKeyword[] {
    return this.keywords.filter(keyword => keyword.priority === priority);
  }

  // Get primary keyword for a page
  getPrimaryKeyword(pageSlug: string): SEOKeyword | null {
    const pageKeywords = this.getKeywordsForPage(pageSlug);
    return pageKeywords.find(k => k.priority === 'high') || pageKeywords[0] || null;
  }

  // Get location-based keywords for a specific city
  getLocationKeywords(city: string): LocationKeyword[] {
    const cityLower = city.toLowerCase();
    return this.locationKeywords.filter(keyword =>
      keyword.city.toLowerCase() === cityLower
    );
  }

  // Get location keywords by state
  getLocationKeywordsByState(state: string): LocationKeyword[] {
    return this.locationKeywords.filter(keyword =>
      keyword.state?.toLowerCase() === state.toLowerCase()
    );
  }

  // Generate SEO-optimized meta data
  generateMetaData(pageSlug: string) {
    const primaryKeyword = this.getPrimaryKeyword(pageSlug);

    if (!primaryKeyword) {
      return {
        title: `The KPS Group | ${pageSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
        description: `Professional ${pageSlug.replace('-', ' ')} services for businesses. Expert guidance and modern solutions.`,
      };
    }

    return {
      title: primaryKeyword.metaTitle,
      description: primaryKeyword.metaDescription,
    };
  }

  // Generate location-specific SEO data
  generateLocationSEOData(city: string, state?: string): LocationSEOData {
    const locationKeywords = this.getLocationKeywords(city);
    const primaryKeyword = locationKeywords[0];

    if (!primaryKeyword) {
      return {
        city,
        state,
        keyword: `payroll services ${city}`,
        metaTitle: `Payroll Services in ${city}${state ? `, ${state}` : ''} | KPS Group`,
        metaDescription: `Professional payroll services in ${city}. ADP alternatives, multi-state compliance, and expert HR support for businesses.`,
        h1Heading: `Payroll Services in ${city}`,
        content: `Looking for reliable payroll services in ${city}? KPS Group offers comprehensive payroll solutions including ADP alternatives, multi-state compliance, tax filings, and HR support.`,
        structuredData: this.generateLocationStructuredData(city, state)
      };
    }

    return {
      city: primaryKeyword.city,
      state: primaryKeyword.state,
      keyword: primaryKeyword.keyword,
      metaTitle: `${primaryKeyword.baseKeyword} in ${primaryKeyword.city}${primaryKeyword.state ? `, ${primaryKeyword.state}` : ''} | KPS Group`,
      metaDescription: `Professional ${primaryKeyword.baseKeyword} in ${primaryKeyword.city}. Expert payroll services, compliance solutions, and business support.`,
      h1Heading: `${primaryKeyword.baseKeyword} in ${primaryKeyword.city}`,
      content: this.generateLocationContent(primaryKeyword),
      structuredData: this.generateLocationStructuredData(primaryKeyword.city, primaryKeyword.state)
    };
  }

  private generateLocationContent(keyword: LocationKeyword): string {
    const { city, baseKeyword } = keyword;
    const services = baseKeyword.includes('payroll') ? 'payroll processing, tax compliance, and HR support' : 'business services and support';

    return `Looking for reliable ${baseKeyword} in ${city}? KPS Group offers comprehensive ${services} tailored for businesses in ${city}.

Our expert team provides:
• Professional ${baseKeyword}
• Multi-state compliance solutions
• Automated tax filings
• Dedicated account management
• 24/7 support for your business

Choose KPS Group for dependable ${baseKeyword} that keeps your business compliant and focused on growth.`;
  }

  // Generate structured data for SEO
  generateStructuredData(pageSlug: string, pageUrl: string) {
    const primaryKeyword = this.getPrimaryKeyword(pageSlug);

    if (!primaryKeyword) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": primaryKeyword.h1Heading,
      "description": primaryKeyword.metaDescription,
      "provider": {
        "@type": "Organization",
        "name": "The KPS Group",
        "url": "https://thekpsgroup.com",
        "logo": "https://thekpsgroup.com/kps-group/kps-square-512.png"
      },
      "serviceType": primaryKeyword.category,
      "areaServed": "United States",
      "url": pageUrl,
      "keywords": primaryKeyword.contentFocus.split(', ').join(', ')
    };
  }

  // Generate local SEO structured data
  generateLocationStructuredData(city: string, state?: string) {
    const locationName = state ? `${city}, ${state}` : city;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "The KPS Group",
      "description": `Professional business services in ${locationName}`,
      "url": "https://thekpsgroup.com",
      "telephone": "+1-555-123-4567",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": city,
        "addressRegion": state || "TX",
        "addressCountry": "US"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.2672", // Default to Austin, TX - you might want to use a geocoding service
        "longitude": "-97.7431"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "17:00"
      },
      "sameAs": [
        "https://www.linkedin.com/company/thekpsgroup",
        "https://www.facebook.com/thekpsgroup"
      ]
    };
  }

  // Generate keyword-rich content
  generateContent(pageSlug: string): {
    h1: string;
    intro: string;
    keywords: string[];
    cta: string;
  } {
    const primaryKeyword = this.getPrimaryKeyword(pageSlug);
    // const pageKeywords = this.getKeywordsForPage(pageSlug);

    if (!primaryKeyword) {
      return {
        h1: `${pageSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Services`,
        intro: `Professional ${pageSlug.replace('-', ' ')} services for businesses. Expert guidance and modern solutions.`,
        keywords: [`${pageSlug} services`],
        cta: `Get Started with ${pageSlug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}`
      };
    }

    return {
      h1: primaryKeyword.h1Heading,
      intro: primaryKeyword.metaDescription,
      keywords: primaryKeyword.contentFocus.split(', '),
      cta: `Start Your ${primaryKeyword.keyword.replace(/\b\w/g, l => l.toUpperCase())} Journey`
    };
  }

  // Get all keywords
  getAllKeywords(): SEOKeyword[] {
    return this.keywords;
  }

  // Get all location keywords
  getAllLocationKeywords(): LocationKeyword[] {
    return this.locationKeywords;
  }

  // Search keywords by term
  searchKeywords(term: string): SEOKeyword[] {
    const searchTerm = term.toLowerCase();
    return this.keywords.filter(keyword =>
      keyword.keyword.toLowerCase().includes(searchTerm) ||
      keyword.category.toLowerCase().includes(searchTerm) ||
      keyword.contentFocus.toLowerCase().includes(searchTerm)
    );
  }

  // Search location keywords
  searchLocationKeywords(term: string): LocationKeyword[] {
    const searchTerm = term.toLowerCase();
    return this.locationKeywords.filter(keyword =>
      keyword.keyword.toLowerCase().includes(searchTerm) ||
      keyword.city.toLowerCase().includes(searchTerm) ||
      keyword.state?.toLowerCase().includes(searchTerm)
    );
  }

  // Get unique cities from keywords
  getUniqueCities(): string[] {
    const cities = this.locationKeywords.map(k => k.city);
    return [...new Set(cities)].sort();
  }

  // Get unique states from keywords
  getUniqueStates(): string[] {
    const states = this.locationKeywords
      .map(k => k.state)
      .filter(state => state !== undefined) as string[];
    return [...new Set(states)].sort();
  }
}

// Export singleton instance
export const seoOptimizer = new SEOOptimizer();
