'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function PropertyMetrics({ reviews }: { reviews: any[] }) {
  // Calculate metrics
  const properties = reviews.reduce((acc, review) => {
    if (!acc[review.listingId]) {
      acc[review.listingId] = {
        name: review.listingName,
        ratings: [],
        count: 0
      };
    }
    if (review.overallRating) {
      acc[review.listingId].ratings.push(review.overallRating);
    }
    acc[review.listingId].count++;
    return acc;
  }, {} as Record<string, any>);

  const metrics = Object.entries(properties).map(([id, data]: [string, any]) => ({
    id,
    name: data.name,
    averageRating: data.ratings.length
      ? (data.ratings.reduce((a: number, b: number) => a + b, 0) / data.ratings.length).toFixed(1)
      : 'N/A',
    totalReviews: data.count,
    trend: 'stable' // Would calculate based on time comparison
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {metrics.slice(0, 3).map((metric) => (
        <Card key={metric.id} className="bg-white border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-900">
              {metric.name}
            </CardTitle>
            {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
            {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
            {metric.trend === 'stable' && <Minus className="h-4 w-4 text-gray-600" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{metric.averageRating}/10</div>
            <p className="text-xs text-gray-600">
              {metric.totalReviews} reviews
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}