# Student Grade Tracker

A modern, responsive web application for tracking student grades built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Add courses with names and scores (0–100)
- Automatic grade calculation (A–F)
- Live dashboard with total courses, average score, and performance status
- Persistent storage via localStorage
- Delete courses
- Responsive design for desktop and mobile
- Form validation with success/error feedback
- Empty state when no courses exist

## Grade Scale

| Score  | Grade |
|--------|-------|
| 70–100 | A     |
| 60–69  | B     |
| 50–59  | C     |
| 45–49  | D     |
| 40–44  | E     |
| 0–39   | F     |

## Performance Status

| Average Score | Status            |
|---------------|-------------------|
| ≥ 70          | Excellent         |
| ≥ 60          | Very Good         |
| ≥ 50          | Good              |
| < 50          | Needs Improvement |

## Getting Started

### Prerequisites

- Node.js 18.17+
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd student-grade-tracker

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

### Option 1: Deploy with Git

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and sign in.
3. Click **Add New → Project**.
4. Import your repository.
5. Vercel will auto-detect Next.js — no configuration needed.
6. Click **Deploy**.

### Option 2: Deploy with Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. Your app will be live in seconds.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Project Structure

```
src/
├── app/
│   ├── globals.css       # Tailwind imports and global styles
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page — state management & layout
├── components/
│   ├── DashboardStats.tsx # Total courses, average, performance card
│   ├── EmptyState.tsx    # Shown when no courses exist
│   ├── GradeForm.tsx     # Add course form with validation
│   └── GradeTable.tsx    # Courses table with delete actions
└── types/
    └── index.ts          # TypeScript interfaces & types
```
