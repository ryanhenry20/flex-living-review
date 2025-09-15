'use client';

import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { ReviewsTable } from '@/components/reviews-table';
import { PropertyMetrics } from '@/components/property-metrics';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Home, BarChart3, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const [filters, setFilters] = useState({
    property: 'all',
    rating: 'all',
    channel: 'all',
    dateRange: '30'
  });

  const { data, isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => fetch('/api/reviews/hostaway').then(res => res.json())
  });

  const filteredReviews = useMemo(() => {
    if (!data?.reviews) return [];

interface ReviewData {
      listingId: number;
      channel: string;
      [key: string]: unknown;
    }

    return data.reviews.filter((review: ReviewData) => {
      if (filters.property !== 'all' && review.listingId !== parseInt(filters.property)) {
        return false;
      }
      if (filters.channel !== 'all' && review.channel !== filters.channel) {
        return false;
      }
      return true;
    });
  }, [data?.reviews, filters]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-gray-900">Loading...</div>;
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
          <div className="w-full flex items-center px-3 py-2 rounded-md bg-blue-600 text-white">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </div>

          <Link href="/dashboard" className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
            <BarChart3 className="mr-2 h-4 w-4" />
            Reviews
          </Link>

          <Link href="/property/101" className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100">
            <Building2 className="mr-2 h-4 w-4" />
            Properties
          </Link>
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Quick Links</p>
          <div className="space-y-1">
            <Link href="/property/101" className="block text-sm text-gray-600 hover:text-gray-900">
              Shoreditch Heights
            </Link>
            <Link href="/property/102" className="block text-sm text-gray-600 hover:text-gray-900">
              Canary Wharf
            </Link>
            <Link href="/property/103" className="block text-sm text-gray-600 hover:text-gray-900">
              Kings Cross
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Reviews Dashboard</h2>
            <p className="text-gray-600">Monitor and approve guest reviews across all properties</p>
          </div>

          {/* Metrics Cards */}
          <PropertyMetrics reviews={data?.reviews || []} />

          {/* Filters */}
          <Card className="p-4 mb-6 bg-white border border-gray-200">
            <div className="flex gap-4 flex-wrap">
              <Select value={filters.property} onValueChange={(value) =>
                setFilters(prev => ({ ...prev, property: value }))
              }>
                <SelectTrigger className="w-[180px] text-gray-900 bg-white border-gray-300">
                  <SelectValue placeholder="All Properties" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all" className="text-gray-900">All Properties</SelectItem>
                  <SelectItem value="101" className="text-gray-900">Shoreditch Heights</SelectItem>
                  <SelectItem value="102" className="text-gray-900">Canary Wharf</SelectItem>
                  <SelectItem value="103" className="text-gray-900">Kings Cross</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filters.channel} onValueChange={(value) =>
                setFilters(prev => ({ ...prev, channel: value }))
              }>
                <SelectTrigger className="w-[180px] text-gray-900 bg-white border-gray-300">
                  <SelectValue placeholder="All Channels" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="all" className="text-gray-900">All Channels</SelectItem>
                  <SelectItem value="airbnb" className="text-gray-900">Airbnb</SelectItem>
                  <SelectItem value="booking" className="text-gray-900">Booking.com</SelectItem>
                  <SelectItem value="vrbo" className="text-gray-900">VRBO</SelectItem>
                  <SelectItem value="direct" className="text-gray-900">Direct</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Reviews Table */}
          <ReviewsTable reviews={filteredReviews} />
        </div>
      </div>
    </div>
  );
}
