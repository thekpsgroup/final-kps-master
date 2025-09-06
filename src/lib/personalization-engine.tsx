'use client';
import React from 'react';
import { behavioralAnalytics } from './behavioral-analytics';

interface UserProfile {
  id: string;
  segment: UserSegment;
  preferences: UserPreferences;
  behavior: BehaviorProfile;
  conversionFactors: ConversionFactors;
  personalizedContent: PersonalizedContent;
}

type UserSegment =
  | 'first_time_visitor'
  | 'returning_visitor'
  | 'high_intent'
  | 'price_sensitive'
  | 'feature_focused'
  | 'enterprise'
  | 'small_business'
  | 'technical'
  | 'non_technical';

interface UserPreferences {
  preferredContactMethod: 'email' | 'phone' | 'chat';
  communicationStyle: 'formal' | 'casual' | 'technical';
  urgencyLevel: 'low' | 'medium' | 'high';
}

interface BehaviorProfile {
  timeOnSite: number;
  pagesVisited: number;
  formStarted: boolean;
  conversionProbability: number;
  engagementScore: number;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

interface ConversionFactors {
  trafficSource: string;
  utmCampaign?: string;
  searchTerms?: string[];
  referrer: string;
}

interface PersonalizedContent {
  headline: string;
  subheadline: string;
  buttonText: string;
  formFields: FormFieldConfig[];
  trustSignals: TrustSignal[];
  socialProof: SocialProof[];
  urgencyMessage?: string;
  incentive?: Incentive;
}

interface FormFieldConfig {
  name: string;
  label: string;
  placeholder: string;
  helpText: string;
  priority: number;
  required: boolean;
  conditional?: {
    showIf: string;
    value: unknown;
  };
}

interface TrustSignal {
  type: 'badge' | 'testimonial' | 'statistic' | 'guarantee';
  content: string;
  icon?: string;
}

interface SocialProof {
  type: 'testimonial' | 'stat' | 'logo' | 'roi' | 'cost_saving';
  content: string;
  author?: string;
  metric?: string;
  icon?: string;
  logos?: string[];
}

interface Incentive {
  type:
    | 'discount'
    | 'free_trial'
    | 'consultation'
    | 'bonus'
    | 'value_add'
    | 'guarantee'
    | 'exclusive';
  message: string;
  urgency: string;
  icon?: string;
}

class PersonalizationEngine {
  private userProfile: UserProfile;
  private contentVariants: Map<string, ContentVariant[]> = new Map();
  private segmentRules: SegmentRule[] = [];

  constructor() {
    this.initializeContentVariants();
    this.initializeSegmentRules();
    this.userProfile = this.createUserProfile();
  }

  private initializeContentVariants() {
    // Headlines by segment
    this.contentVariants.set('headlines', [
      {
        segment: 'first_time_visitor',
        content: 'Transform Your Business Operations',
        conversionLift: 1.0,
      },
      {
        segment: 'returning_visitor',
        content: 'Welcome Back! Ready to Get Started?',
        conversionLift: 1.15,
      },
      {
        segment: 'high_intent',
        content: 'Get Your Custom Solution Today',
        conversionLift: 1.25,
      },
      {
        segment: 'price_sensitive',
        content: 'Affordable Business Solutions That Actually Work',
        conversionLift: 1.18,
      },
      {
        segment: 'enterprise',
        content: 'Enterprise-Grade Business Transformation',
        conversionLift: 1.12,
      },
      {
        segment: 'small_business',
        content: 'Small Business Solutions That Scale',
        conversionLift: 1.22,
      },
    ]);

    // Button text by segment
    this.contentVariants.set('buttons', [
      {
        segment: 'first_time_visitor',
        content: 'Learn More About Our Services',
        conversionLift: 1.0,
      },
      {
        segment: 'high_intent',
        content: 'Start My Transformation Now',
        conversionLift: 1.35,
      },
      {
        segment: 'price_sensitive',
        content: 'Get Free Consultation',
        conversionLift: 1.28,
      },
      {
        segment: 'technical',
        content: 'See Technical Specifications',
        conversionLift: 1.15,
      },
      {
        segment: 'enterprise',
        content: 'Schedule Enterprise Demo',
        conversionLift: 1.2,
      },
    ]);

    // Form configurations by segment
    this.contentVariants.set('forms', [
      {
        segment: 'first_time_visitor',
        content: {
          fields: ['name', 'email', 'interest'],
          labels: {
            name: 'Your Name',
            email: 'Email Address',
            interest: 'What interests you most?',
          },
        },
        conversionLift: 1.0,
      },
      {
        segment: 'high_intent',
        content: {
          fields: ['name', 'email', 'phone', 'company', 'interest', 'timeline', 'budget'],
          labels: {
            timeline: 'When do you want to start?',
            budget: "What's your budget range?",
          },
        },
        conversionLift: 1.15,
      },
      {
        segment: 'small_business',
        content: {
          fields: ['name', 'email', 'business_size', 'biggest_challenge'],
          labels: {
            business_size: 'How many employees?',
            biggest_challenge: "What's your biggest business challenge?",
          },
        },
        conversionLift: 1.25,
      },
    ]);
  }

  private initializeSegmentRules() {
    this.segmentRules = [
      {
        segment: 'first_time_visitor',
        conditions: [
          { type: 'session_count', operator: '==', value: 1 },
          { type: 'page_views', operator: '<', value: 3 },
        ],
      },
      {
        segment: 'returning_visitor',
        conditions: [
          { type: 'session_count', operator: '>', value: 1 },
          { type: 'days_since_last_visit', operator: '<', value: 7 },
        ],
      },
      {
        segment: 'high_intent',
        conditions: [
          { type: 'time_on_site', operator: '>', value: 300 },
          { type: 'pages_visited', operator: '>', value: 3 },
          { type: 'form_started', operator: '==', value: true },
        ],
      },
      {
        segment: 'price_sensitive',
        conditions: [
          { type: 'utm_source', operator: 'includes', value: 'price' },
          { type: 'page_path', operator: 'includes', value: 'pricing' },
          {
            type: 'search_terms',
            operator: 'includes',
            value: ['cheap', 'affordable', 'budget', 'cost'],
          },
        ],
      },
      {
        segment: 'enterprise',
        conditions: [
          { type: 'company_size', operator: '>', value: 100 },
          { type: 'email_domain', operator: 'not_includes', value: ['gmail', 'yahoo', 'hotmail'] },
          { type: 'utm_campaign', operator: 'includes', value: 'enterprise' },
        ],
      },
      {
        segment: 'small_business',
        conditions: [
          { type: 'company_size', operator: '<', value: 50 },
          { type: 'utm_campaign', operator: 'includes', value: 'small-business' },
        ],
      },
    ];
  }

  determineUserSegment(): UserSegment {
    const behaviorData = behavioralAnalytics.getBehaviorData();

    for (const rule of this.segmentRules) {
      if (this.evaluateSegmentRule(rule, behaviorData)) {
        return rule.segment;
      }
    }

    return 'first_time_visitor'; // Default
  }

  private evaluateSegmentRule(rule: SegmentRule, data: unknown): boolean {
    return rule.conditions.every((condition) => {
      const value = this.getDataValue(data as Record<string, unknown>, condition.type);
      return this.evaluateCondition(value, condition.operator, condition.value);
    });
  }

  private evaluateCondition(actual: unknown, operator: string, expected: unknown): boolean {
    switch (operator) {
      case '==':
        return actual === expected;
      case '!=':
        return actual !== expected;
      case '>':
        return Number(actual) > Number(expected);
      case '<':
        return Number(actual) < Number(expected);
      case '>=':
        return Number(actual) >= Number(expected);
      case '<=':
        return Number(actual) <= Number(expected);
      case 'includes':
        if (Array.isArray(expected)) {
          return expected.some((item) =>
            String(actual).toLowerCase().includes(String(item).toLowerCase()),
          );
        }
        return String(actual).toLowerCase().includes(String(expected).toLowerCase());
      case 'not_includes':
        if (Array.isArray(expected)) {
          return !expected.some((item) =>
            String(actual).toLowerCase().includes(String(item).toLowerCase()),
          );
        }
        return !String(actual).toLowerCase().includes(String(expected).toLowerCase());
      default:
        return false;
    }
  }

  private getDataValue(data: Record<string, unknown>, type: string): unknown {
    switch (type) {
      case 'session_count':
        return data.sessionCount || 1;
      case 'page_views':
        return Array.isArray(data.pageViews) ? data.pageViews.length : 1;
      case 'time_on_site':
        return data.timeOnSite || 0;
      case 'form_started':
        return data.formStarted || false;
      case 'company_size':
        return data.companySize || 0;
      case 'utm_source':
        return data.utmSource || '';
      case 'page_path':
        return window.location.pathname;
      case 'search_terms':
        return data.searchTerms || [];
      case 'email_domain':
        return data.emailDomain || '';
      case 'utm_campaign':
        return data.utmCampaign || '';
      case 'days_since_last_visit':
        return data.daysSinceLastVisit || 30;
      default:
        return undefined;
    }
  }

  getPersonalizedContent(contentType: string): string {
    const segment = this.userProfile.segment;
    const variants = this.contentVariants.get(contentType) || [];

    // Find best matching variant for user segment
    const variant = variants.find((v) => v.segment === segment) || variants[0];

    return (variant?.content as string) || (this.getDefaultContent(contentType) as string);
  }

  private getDefaultContent(contentType: string): string {
    switch (contentType) {
      case 'headlines':
        return 'Transform Your Business with Modern Solutions';
      case 'buttons':
        return 'Get Started Today';
      default:
        return 'Transform your business operations';
    }
  }

  getPersonalizedForm(): FormFieldConfig[] {
    const segment = this.userProfile.segment;
    const conversionProbability = behavioralAnalytics.getConversionProbability();

    // Base form fields
    let fields: FormFieldConfig[] = [
      {
        name: 'name',
        label: 'Full Name',
        placeholder: 'Enter your name',
        helpText: 'We use this to personalize our response',
        priority: 1,
        required: true,
      },
      {
        name: 'email',
        label: 'Email Address',
        placeholder: 'your@company.com',
        helpText: "We'll never share your email with anyone",
        priority: 2,
        required: true,
      },
    ];

    // Segment-specific field modifications
    switch (segment) {
      case 'high_intent':
        fields.push(
          {
            name: 'phone',
            label: 'Phone Number',
            placeholder: '(469) 458-6966',
            helpText: 'For faster response - we can call you today!',
            priority: 3,
            required: false,
          },
          {
            name: 'company',
            label: 'Company Name',
            placeholder: 'Your company',
            helpText: 'Helps us understand your business context',
            priority: 4,
            required: false,
          },
          {
            name: 'timeline',
            label: 'When do you want to start?',
            placeholder: 'Select timeline',
            helpText: 'This helps us prioritize your request',
            priority: 6,
            required: false,
          },
        );
        break;

      case 'small_business':
        fields.push(
          {
            name: 'business_size',
            label: 'Team Size',
            placeholder: 'Number of employees',
            helpText: 'Helps us recommend the right solutions',
            priority: 5,
            required: false,
          },
          {
            name: 'biggest_challenge',
            label: 'Biggest Business Challenge',
            placeholder: 'What keeps you up at night?',
            helpText: 'The more specific, the better we can help',
            priority: 7,
            required: false,
          },
        );
        break;

      case 'enterprise':
        fields.push(
          {
            name: 'title',
            label: 'Job Title',
            placeholder: 'Your role',
            helpText: 'Helps us connect you with the right specialist',
            priority: 4,
            required: false,
          },
          {
            name: 'department',
            label: 'Department',
            placeholder: 'Which department?',
            helpText: 'Operations, Finance, IT, etc.',
            priority: 5,
            required: false,
          },
        );
        break;

      case 'price_sensitive':
        // Shorter form to reduce friction
        fields = fields.slice(0, 2); // Only name and email
        fields[1].helpText = 'Get pricing info sent directly to your inbox';
        break;
    }

    // Dynamic field ordering based on conversion probability
    if (conversionProbability < 0.3) {
      // High-friction user - minimize fields
      fields = fields.filter((f) => f.required || f.priority <= 3);
    } else if (conversionProbability > 0.7) {
      // High-intent user - can handle more fields
      fields.push({
        name: 'notes',
        label: 'Additional Details',
        placeholder: 'Anything else we should know?',
        helpText: 'Optional - but helps us prepare for our conversation',
        priority: 10,
        required: false,
      });
    }

    return fields.sort((a, b) => a.priority - b.priority);
  }

  getPersonalizedIncentive(): Incentive | undefined {
    const segment = this.userProfile.segment;
    const conversionProbability = behavioralAnalytics.getConversionProbability();

    // Only show incentives for users who need extra motivation
    if (conversionProbability > 0.6) return undefined;

    const incentives: Record<UserSegment, Incentive> = {
      price_sensitive: {
        type: 'discount',
        message: 'Free initial consultation (normally $200)',
        urgency: 'Limited time offer',
      },
      first_time_visitor: {
        type: 'value_add',
        message: 'Get our Business Health Checklist (free)',
        urgency: 'Download instantly',
      },
      small_business: {
        type: 'guarantee',
        message: 'See results in 30 days or money back',
        urgency: 'Risk-free guarantee',
      },
      enterprise: {
        type: 'exclusive',
        message: 'Priority scheduling for enterprise clients',
        urgency: 'Next available slot',
      },
      returning_visitor: {
        type: 'bonus',
        message: 'Welcome back! Get 10% off your next service',
        urgency: 'Loyal customer discount',
      },
      high_intent: {
        type: 'consultation',
        message: 'Schedule a free strategy call',
        urgency: 'Book within 24 hours',
      },
      feature_focused: {
        type: 'free_trial',
        message: 'Try our premium features free for 14 days',
        urgency: 'No credit card required',
      },
      technical: {
        type: 'consultation',
        message: 'Technical consultation with our experts',
        urgency: 'Solve your technical challenges',
      },
      non_technical: {
        type: 'value_add',
        message: 'Business-focused consultation',
        urgency: 'Focus on growth strategies',
      },
    };

    return incentives[segment] || null;
  }

  getSocialProof(): SocialProof[] {
    const segment = this.userProfile.segment;

    const socialProofBySegment: Record<UserSegment, SocialProof[]> = {
      small_business: [
        {
          type: 'testimonial',
          content: '"KPS helped us reduce payroll time from 8 hours to 30 minutes per week"',
          author: 'Sarah M., Local Contractor',
          metric: '8hrs → 30min',
        },
        {
          type: 'stat',
          content: '127 small businesses transformed',
        },
      ],
      enterprise: [
        {
          type: 'testimonial',
          content: '"Enterprise-grade solutions with the agility of a startup"',
          author: 'CTO, 500+ employee company',
          metric: '$2M+ saved annually',
        },
        {
          type: 'logo',
          content: 'Trusted by Fortune 1000 companies',
          logos: ['company1', 'company2', 'company3'],
        },
      ],
      price_sensitive: [
        {
          type: 'roi',
          content: 'Average ROI: 340% in first year',
          metric: '340% ROI',
        },
        {
          type: 'cost_saving',
          content: 'Clients save average $47k annually',
          metric: '$47k saved',
        },
      ],
      first_time_visitor: [
        {
          type: 'testimonial',
          content: '"Easy to get started and the results were immediate"',
          author: 'Mike R., New Client',
          metric: 'Setup in 15 minutes',
        },
        {
          type: 'stat',
          content: '97% of first-time visitors complete setup',
        },
      ],
      returning_visitor: [
        {
          type: 'testimonial',
          content: '"Even better service on our second project"',
          author: 'Lisa K., Repeat Client',
          metric: '25% faster delivery',
        },
        {
          type: 'cost_saving',
          content: 'Returning clients save 15% on average',
          metric: '15% savings',
        },
      ],
      high_intent: [
        {
          type: 'testimonial',
          content: '"They delivered exactly what they promised, on time"',
          author: 'David P., Project Manager',
          metric: '100% on-time delivery',
        },
        {
          type: 'roi',
          content: 'Average ROI: 340% in first year',
          metric: '340% ROI',
        },
      ],
      feature_focused: [
        {
          type: 'testimonial',
          content: '"The automation features saved us countless hours"',
          author: 'Anna S., Operations Manager',
          metric: '40 hours saved/week',
        },
        {
          type: 'stat',
          content: 'Advanced features adopted by 85% of users',
        },
      ],
      technical: [
        {
          type: 'testimonial',
          content: '"Their technical expertise is outstanding"',
          author: 'John T., IT Director',
          metric: 'Zero downtime incidents',
        },
        {
          type: 'stat',
          content: '99.9% system uptime guaranteed',
        },
      ],
      non_technical: [
        {
          type: 'testimonial',
          content: '"Finally, business solutions that just work"',
          author: 'Sarah L., Business Owner',
          metric: 'No technical knowledge required',
        },
        {
          type: 'stat',
          content: 'Designed for non-technical users',
        },
      ],
    };

    return socialProofBySegment[segment] || socialProofBySegment['small_business'];
  }

  // Real-time personalization updates
  updatePersonalization() {
    const newSegment = this.determineUserSegment();

    if (newSegment !== this.userProfile.segment) {
      this.userProfile.segment = newSegment;
      this.userProfile.personalizedContent = this.generatePersonalizedContent();

      // Trigger UI updates
      this.notifyPersonalizationChange();
    }
  }

  private generatePersonalizedContent(): PersonalizedContent {
    return {
      headline: this.getPersonalizedContent('headlines'),
      subheadline: this.getPersonalizedSubheadline(),
      buttonText: this.getPersonalizedContent('buttons'),
      formFields: this.getPersonalizedForm(),
      trustSignals: this.getTrustSignals(),
      socialProof: this.getSocialProof(),
      urgencyMessage: this.getUrgencyMessage(),
      incentive: this.getPersonalizedIncentive(),
    };
  }

  private getPersonalizedSubheadline(): string {
    const segment = this.userProfile.segment;
    const subheadlines: Record<UserSegment, string> = {
      first_time_visitor:
        'Modern solutions for payroll, books, brand, operations, and IT—designed to work together.',
      returning_visitor: 'Welcome back! Ready to transform your business operations?',
      high_intent: 'Get your custom solution designed and implemented in 30 days.',
      price_sensitive: 'Affordable business solutions with guaranteed ROI. See pricing instantly.',
      enterprise: 'Enterprise-grade business transformation with dedicated support.',
      small_business: 'Built specifically for growing businesses like yours.',
      technical: 'Modern tech stack with APIs, integrations, and custom development.',
      non_technical: 'Simple, user-friendly solutions that just work.',
      feature_focused: 'Comprehensive feature set designed for serious businesses.',
    };

    return subheadlines[segment] || subheadlines['first_time_visitor'];
  }

  private getTrustSignals(): TrustSignal[] {
    return [
      {
        type: 'badge',
        content: 'Secure & Private',
      },
      {
        type: 'guarantee',
        content: '2-4 Hour Response',
      },
      {
        type: 'statistic',
        content: '20+ Companies Helped',
      },
    ];
  }

  private getUrgencyMessage(): string | undefined {
    const segment = this.userProfile.segment;
    const conversionProbability = behavioralAnalytics.getConversionProbability();

    if (conversionProbability > 0.7) {
      return 'High-demand service - limited availability this month';
    }

    if (segment === 'enterprise') {
      return 'Priority scheduling available - book your demo today';
    }

    if (segment === 'price_sensitive') {
      return 'Limited-time pricing promotion ends soon';
    }

    return undefined;
  }

  private notifyPersonalizationChange() {
    // Dispatch custom event for UI updates
    const event = new CustomEvent('personalizationChange', {
      detail: {
        segment: this.userProfile.segment,
        content: this.userProfile.personalizedContent,
      },
    });
    window.dispatchEvent(event);
  }

  private createUserProfile(): UserProfile {
    return {
      id: this.generateUserId(),
      segment: 'first_time_visitor',
      preferences: {
        preferredContactMethod: 'email',
        communicationStyle: 'casual',
        urgencyLevel: 'medium',
      },
      behavior: {
        timeOnSite: 0,
        pagesVisited: 1,
        formStarted: false,
        conversionProbability: 0.5,
        engagementScore: 0,
        deviceType: 'desktop',
      },
      conversionFactors: {
        trafficSource: 'direct',
        referrer: document.referrer || '',
      },
      personalizedContent: this.generatePersonalizedContent(),
    };
  }

  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Public API
  getUserProfile(): UserProfile {
    return this.userProfile;
  }

  getPersonalizedExperience() {
    this.updatePersonalization();
    return this.userProfile.personalizedContent;
  }
}

interface ContentVariant {
  segment: UserSegment;
  content: unknown;
  conversionLift: number;
}

interface SegmentRule {
  segment: UserSegment;
  conditions: SegmentCondition[];
}

interface SegmentCondition {
  type: string;
  operator: string;
  value: unknown;
}

export const personalizationEngine = new PersonalizationEngine();

// React hook for personalized content
export function usePersonalization() {
  const [personalizedContent, setPersonalizedContent] = React.useState<PersonalizedContent | null>(
    null,
  );
  const [userSegment, setUserSegment] = React.useState<UserSegment>('first_time_visitor');
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    const updateContent = () => {
      const content = personalizationEngine.getPersonalizedExperience();
      const profile = personalizationEngine.getUserProfile();

      setPersonalizedContent(content);
      setUserSegment(profile.segment);
    };

    updateContent();

    // Listen for personalization changes
    const handlePersonalizationChange = (e: CustomEvent) => {
      setPersonalizedContent(e.detail.content);
      setUserSegment(e.detail.segment);
    };

    window.addEventListener('personalizationChange', handlePersonalizationChange as EventListener);

    // Update personalization every 10 seconds
    intervalRef.current = setInterval(updateContent, 10000);

    return () => {
      window.removeEventListener(
        'personalizationChange',
        handlePersonalizationChange as EventListener,
      );
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    personalizedContent,
    userSegment,
    refreshPersonalization: () => {
      const content = personalizationEngine.getPersonalizedExperience();
      setPersonalizedContent(content);
    },
  };
}
