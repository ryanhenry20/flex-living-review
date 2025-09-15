export interface Review {
  id: number;
  type: 'host-to-guest' | 'guest-to-host';
  status: 'published' | 'pending' | 'hidden';
  rating: number | null;
  publicReview: string;
  reviewCategory: Array<{
    category: string;
    rating: number;
  }>;
  submittedAt: string;
  guestName: string;
  listingName: string;
  listingId?: number;
  channel?: 'airbnb' | 'booking' | 'vrbo' | 'direct';
  isApprovedForDisplay?: boolean;
  overallRating?: number;
}

export interface PropertyMetric {
  listingId: number;
  listingName: string;
  averageRating: number;
  totalReviews: number;
  trend: 'up' | 'down' | 'stable';
}