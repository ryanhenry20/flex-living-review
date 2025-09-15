'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ReviewData {
  id: number;
  submittedAt: string;
  listingName: string;
  guestName: string;
  overallRating?: number;
  channel: string;
  publicReview: string;
  [key: string]: unknown;
}

export function ReviewsTable({ reviews }: { reviews: ReviewData[] }) {
  const [approvals, setApprovals] = useState<Record<number, boolean>>({});

  const handleApprovalToggle = (reviewId: number) => {
    setApprovals(prev => ({
      ...prev,
      [reviewId]: !prev[reviewId]
    }));
  };

  return (
    <Card className="bg-white border border-gray-200">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-900">Date</TableHead>
            <TableHead className="text-gray-900">Property</TableHead>
            <TableHead className="text-gray-900">Guest</TableHead>
            <TableHead className="text-gray-900">Rating</TableHead>
            <TableHead className="text-gray-900">Channel</TableHead>
            <TableHead className="text-gray-900">Review</TableHead>
            <TableHead className="text-gray-900">Display</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="hover:bg-gray-50">
              <TableCell className="text-gray-900">
                {new Date(review.submittedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="font-medium text-gray-900">
                {review.listingName}
              </TableCell>
              <TableCell className="text-gray-900">{review.guestName}</TableCell>
              <TableCell>
                <Badge
                  variant={(review.overallRating ?? 0) >= 8 ? "default" : "secondary"}
                  className={(review.overallRating ?? 0) >= 8 ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}
                >
                  {review.overallRating || 'N/A'}/10
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="text-gray-900 border-gray-300">{review.channel}</Badge>
              </TableCell>
              <TableCell className="max-w-xs truncate text-gray-900">
                {review.publicReview}
              </TableCell>
              <TableCell>
                <Switch
                  checked={approvals[review.id] || false}
                  onCheckedChange={() => handleApprovalToggle(review.id)}
                  className="data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-300"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}