import { NextResponse } from 'next/server';
import { mockReviews } from '@/lib/mock-data';

export async function GET() {
  try {
    // Try Hostaway API
    const response = await fetch('https://api.hostaway.com/v1/reviews', {
      headers: {
        'Authorization': `Bearer ${process.env.HOSTAWAY_API_KEY}`,
        'Cache-control': 'no-cache'
      }
    });

    const data = await response.json();

    // Check if we got reviews
    if (data.result && data.result.length > 0) {
      return NextResponse.json({
        source: 'hostaway',
        reviews: normalizeReviews(data.result)
      });
    }

    // Fallback to mock data
    return NextResponse.json({
      source: 'mock',
      reviews: normalizeReviews(mockReviews)
    });

  } catch {
    // Use mock data on error
    return NextResponse.json({
      source: 'mock',
      reviews: normalizeReviews(mockReviews)
    });
  }
}

interface Review {
  id: string | number;
  channel?: string;
  rating?: number | null;
  reviewCategory?: Array<{ rating: number }>;
  isApprovedForDisplay?: boolean;
  [key: string]: unknown;
}

function normalizeReviews(reviews: Review[]) {
  return reviews.map(review => ({
    ...review,
    channel: review.channel || 'airbnb',
    overallRating: calculateOverallRating(review),
    isApprovedForDisplay: review.isApprovedForDisplay || false
  }));
}

function calculateOverallRating(review: Review) {
  if (review.rating) return review.rating;
  if (review.reviewCategory?.length) {
    const sum = review.reviewCategory.reduce((acc: number, cat: { rating: number }) =>
      acc + cat.rating, 0
    );
    return Math.round(sum / review.reviewCategory.length);
  }
  return null;
}