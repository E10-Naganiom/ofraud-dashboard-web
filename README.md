# oFraud Admin Dashboard

A Next.js 14+ admin dashboard for the oFraud platform, built with TypeScript, Tailwind CSS, and modern web development best practices.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and set the `NEXT_PUBLIC_API_BASE_URL` to your backend API URL.

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production-ready application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier

## Project Structure

```
ofraud-dashboard-web/
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Reusable React components
│   ├── lib/              # Utility functions, API client, types
│   ├── hooks/            # Custom React hooks
│   └── styles/           # Global styles and Tailwind utilities
├── public/               # Static assets
├── docs/                 # Project documentation
└── .bmad-core/           # Project management tools
```

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Code Quality:** ESLint + Prettier
- **Package Manager:** npm