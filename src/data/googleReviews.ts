export type GoogleReview = {
  id: string;
  author: string;
  authorDetails?: string;
  rating: 5;
  text: string;
  date: string;
  weeksAgo: number;
  businessImpact?: string;
  category?: 'consulting' | 'bookkeeping' | 'modernization' | 'growth';
};

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'bailey_motes',
    author: 'Bailey Motes',
    authorDetails: '2 reviews • 0 photos',
    rating: 5,
    text: 'Absolutely love this company! Karson has been the biggest help getting me on track for a great future in business. Flexible hours and cost to accommodate all business types and sizes! So very thankful for them',
    date: '19 weeks ago',
    weeksAgo: 19,
    businessImpact: 'Future-focused business planning',
    category: 'consulting'
  },
  {
    id: 'amy_nguyen',
    author: 'Amy Nguyen',
    authorDetails: '8 reviews • 5 photos',
    rating: 5,
    text: 'The KPS Group was incredibly helpful! Karson took the time to understand our needs and helped modernize our tools...',
    date: '19 weeks ago',
    weeksAgo: 19,
    businessImpact: 'Tool modernization for Urban Designs',
    category: 'modernization'
  },
  {
    id: 'amber_smith',
    author: 'Amber Smith',
    authorDetails: '2 reviews • 0 photos',
    rating: 5,
    text: 'Karson is professional and committed to his business!',
    date: '27 weeks ago',
    weeksAgo: 27,
    businessImpact: 'Professional service delivery',
    category: 'consulting'
  },
  {
    id: 'adam_farmer',
    author: 'Adam Farmer',
    authorDetails: 'Local Guide • 61 reviews • 55 photos',
    rating: 5,
    text: 'Top notch consulting and bookkeeping services. Penny Joy consulting was a game changer for my small business. Highly recommend.',
    date: '27 weeks ago',
    weeksAgo: 27,
    businessImpact: 'Game-changing small business transformation',
    category: 'bookkeeping'
  },
  {
    id: 'gibsons',
    author: 'Brandon & Holly (Gibsons)',
    authorDetails: '1 review • 0 photos',
    rating: 5,
    text: 'An amazing consultant for our growing business!',
    date: '27 weeks ago',
    weeksAgo: 27,
    businessImpact: '10X growth trajectory',
    category: 'growth'
  }
];

// Get reviews by category for targeted social proof
export const getReviewsByCategory = (category?: string): GoogleReview[] => {
  if (!category) return GOOGLE_REVIEWS;
  return GOOGLE_REVIEWS.filter(review => review.category === category);
};

// Get most recent reviews
export const getRecentReviews = (limit: number = 3): GoogleReview[] => {
  return GOOGLE_REVIEWS
    .sort((a, b) => a.weeksAgo - b.weeksAgo)
    .slice(0, limit);
};
