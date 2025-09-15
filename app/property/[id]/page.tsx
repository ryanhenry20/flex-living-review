'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Home, BarChart3, Building2 } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', resolvedParams.id],
    queryFn: () => fetch('/api/reviews/hostaway').then(res => res.json())
  });

  // In production, check localStorage or API for approval status
  const approvedReviews = data?.reviews?.filter(
    (r: any) => r.listingId === parseInt(resolvedParams.id)
  ) || [];

  const propertyNames: { [key: string]: string } = {
    '101': 'Shoreditch Heights',
    '102': 'Canary Wharf Penthouse',
    '103': 'Kings Cross Studio'
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-gray-900 bg-white">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Flex Living</h1>
          <p className="text-sm text-gray-600">Reviews Dashboard</p>
        </div>

        <nav className="space-y-2">
          <Link href="/" className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>

          <Link href="/dashboard" className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reviews
          </Link>

          <div className="w-full flex items-center px-3 py-2 rounded-md bg-blue-600 text-white">
            <Building2 className="mr-2 h-4 w-4" />
            Properties
          </div>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Properties</p>
          <div className="space-y-1">
            <Link href="/property/101" className={`block text-sm hover:text-gray-900 ${resolvedParams.id === '101' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              Shoreditch Heights
            </Link>
            <Link href="/property/102" className={`block text-sm hover:text-gray-900 ${resolvedParams.id === '102' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              Canary Wharf
            </Link>
            <Link href="/property/103" className={`block text-sm hover:text-gray-900 ${resolvedParams.id === '103' ? 'text-blue-600 font-medium' : 'text-gray-600'}`}>
              Kings Cross
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Property Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {propertyNames[resolvedParams.id] || 'Property'}
            </h1>
            <p className="text-gray-600">Central London Location</p>
          </div>

          {/* Property Details Section */}
          <Card className="mb-8 bg-white border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-medium text-gray-900">2</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-medium text-gray-900">1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Max Guests</p>
                  <p className="font-medium text-gray-900">4</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Size</p>
                  <p className="font-medium text-gray-900">75 sqm</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Guest Reviews</h2>

            {approvedReviews.length === 0 ? (
              <Card className="bg-white border border-gray-200">
                <CardContent className="p-6 text-center text-gray-500">
                  No reviews available for this property yet.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {approvedReviews.map((review: any) => (
                  <Card key={review.id} className="bg-white border border-gray-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-semibold text-gray-900">{review.guestName}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(review.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-gray-900">
                            {review.overallRating || 'N/A'}/10
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{review.publicReview}</p>

                      {review.reviewCategory && (
                        <div className="flex gap-2 flex-wrap">
                          {review.reviewCategory.map((cat: any, idx: number) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-200 text-gray-800">
                              {cat.category}: {cat.rating}/10
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}