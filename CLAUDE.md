# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application for Flex Living's review management system. The project allows property managers to monitor guest reviews from various channels and select which ones to display publicly on property pages.

## Tech Stack

-   **Next.js 16** with App Router and Turbopack
-   **TypeScript** with strict mode
-   **Tailwind CSS v4** for styling
-   **React 19** with React DOM
-   **ESLint** with Next.js configuration

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Project Structure

```
flex-living-reviews/
├── app/                    # Next.js App Router directory
│   ├── layout.tsx          # Root layout with fonts
│   ├── page.tsx            # Home page (default Next.js template)
│   └── globals.css         # Global styles
├── eslint.config.mjs       # ESLint configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration for Tailwind
├── tsconfig.json           # TypeScript configuration with @ path alias
└── flex-living-implementation.md  # Detailed implementation guide
```

## Key Configuration

-   **TypeScript**: Uses `@/*` path alias pointing to root directory
-   **ESLint**: Extends `next/core-web-vitals` and `next/typescript` configs
-   **Next.js**: Uses Turbopack for faster builds and development
-   **Fonts**: Uses Geist Sans and Geist Mono fonts from Google Fonts

## Implementation Status

This is a fresh Next.js project with the default template. The actual Flex Living review system implementation is documented in `flex-living-implementation.md` but hasn't been built yet. The implementation guide includes:

-   Complete file structure for review management system
-   API routes for Hostaway integration with mock data fallback
-   Dashboard components for review approval
-   Property pages for public review display
-   Required dependencies like React Query, shadcn/ui, Recharts

## Development Notes

-   Project uses Next.js 15 with App Router (not Pages Router)
-   Turbopack is enabled for faster builds
-   TypeScript is configured with strict mode
-   The `flex-living-implementation.md` file contains the complete implementation plan with code examples
-   Environment variables needed: `HOSTAWAY_API_KEY` and `HOSTAWAY_ACCOUNT_ID`

## Path Aliases

-   `@/*` maps to the root directory (configured in tsconfig.json)

## Build Process

The project uses Turbopack for both development and production builds, which provides faster compilation times compared to standard webpack.

# Completion Sound

When you finish responding to the user, play the completion sound:

```bash
afplay /System/Library/Sounds/Glass.aiff
```
