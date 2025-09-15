# Flex Living Reviews Dashboard - Project Summary

## Overview
A review management system for Flex Living property managers to monitor guest reviews from multiple channels and control which reviews appear on public property pages.

## How to Run the Application

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Setup Instructions
```bash
# Clone and navigate to project
cd flex-living-reviews

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Add your Hostaway credentials:
# HOSTAWAY_API_KEY=f94377ebbbb479490bb3ec364649168dc443dda2e4830facaf5de2e74ccc9152
# HOSTAWAY_ACCOUNT_ID=61148

# Start development server
npm run dev
```

### Access Points
- Dashboard: http://localhost:3000/dashboard
- Property Page: http://localhost:3000/property/101
- API Endpoint: http://localhost:3000/api/reviews/hostaway

### Build for Production
```bash
npm run build
npm start
```

## Tech Stack

### Frontend
- Next.js 15 with App Router for React-based routing
- TypeScript for type safety
- Tailwind CSS v4 for styling
- shadcn/ui components built on Radix UI
- React Query for server state management
- Lucide React for icons

### Backend
- Next.js API Routes for serverless functions
- Hostaway REST API integration
- Environment-based configuration

### Development
- ESLint with Next.js and TypeScript rules
- Turbopack for fast builds

## Key Design Decisions

### API Integration Strategy
Implemented a hybrid approach that attempts real Hostaway API connection first, then falls back to mock data. This satisfies the assignment requirement for real API integration while ensuring the application remains functional despite the sandbox environment having no review data.

### Data Normalization
All review data processing occurs in the API layer. The system calculates overall ratings from category ratings when missing and ensures consistent data structure regardless of source. This approach provides clean, predictable data contracts for frontend components.

### State Management
Used React Query for server state management (reviews, property metrics) with local component state for UI interactions (filters, approvals). This avoids unnecessary complexity while providing proper caching and synchronization for server data.

### Component Architecture
Built modular, reusable components with clear separation between page-level components that handle data fetching, UI components that render content, and utility functions that process business logic.

### Review Approval System
Implemented client-side approval toggles with immediate UI feedback. The current system uses local state for demo purposes but is designed for straightforward backend integration in production.

## API Behavior

### Hostaway Integration
The main API endpoint `/api/reviews/hostaway` handles GET requests and uses Bearer token authentication through environment variables.

**Request Flow**:
1. Attempts connection to `https://api.hostaway.com/v1/reviews`
2. Validates response structure and checks for review data
3. Falls back to mock data if API returns empty results or fails
4. Normalizes all data to consistent format before returning

**Error Handling**:
The system gracefully handles network failures, empty responses, and invalid data by falling back to mock data. All responses include a source indicator (hostaway or mock) and always return success status.

**Data Processing**:
The API calculates overall ratings from category averages when missing, adds default channel assignments for incomplete data, and ensures all required fields are present while maintaining the original data structure.

### Mock Data
Includes comprehensive dataset with 20+ reviews across 3 properties, covering mixed ratings, multiple channels (Airbnb, Booking.com, VRBO), and edge cases like missing ratings and various review types.

## Google Reviews Integration Findings

### Feasibility Assessment
Google Reviews integration is technically feasible but has significant limitations for production use.

**Technical Constraints**:
- Google Places API requires billing-enabled Google Cloud project
- Rate limits of 1,000 requests per day on free tier
- Maximum 5 most recent reviews per location
- Read-only access with no ability to respond to reviews

**Implementation Details**:
Created proof of concept in `/lib/google-places.ts` with fetch wrapper for Places API, error handling for missing credentials, and response format matching existing review interface.

**Commercial Viability**:
API costs range from $2-7 per 1,000 requests after free tier. Rate limits become problematic for property portfolios. Limited to 5 reviews per property reduces analytical value. Requires Google Cloud setup and place ID management for each property.

**Recommendation**:
Consider as Phase 2 enhancement after core Hostaway functionality is established. Alternative approaches might include review management service partnerships or approved data collection methods.

## Project Status

**Core Requirements Complete**:
- Hostaway API integration with mock data fallback
- Manager dashboard with filtering and review approval
- Property pages displaying approved reviews only
- Responsive UI with modern design
- Google Reviews feasibility documented

**Production Considerations**:
Current implementation covers all assignment requirements. For production deployment, consider adding review approval persistence, user authentication, and advanced analytics.

**Deliverables**:
- Complete source code (frontend and backend)
- Setup and development instructions
- Technical documentation and architectural decisions