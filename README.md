# Kai Faust Portfolio

A modern portfolio website built with Next.js 15, TypeScript, and MDX for project content management.

## Features

- **MDX-based Projects**: Write project case studies in Markdown with React components
- **Featured Projects**: Highlight your best work on the homepage
- **Static Generation**: All pages are pre-rendered for optimal performance
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern, responsive styling

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
├── content/
│   └── projects/           # Project MDX files
├── src/
│   ├── app/
│   │   ├── page.tsx       # Homepage
│   │   ├── projects/      # Projects pages
│   │   └── layout.tsx     # Root layout
│   ├── components/
│   │   ├── Navigation.tsx
│   │   └── ProjectCard.tsx
│   └── lib/
│       └── projects.ts    # Project data utilities
└── public/                # Static assets
```

## Adding a New Project

Create a new `.mdx` file in `content/projects/`:

```mdx
---
title: "Project Name"
description: "Brief description"
date: "2024-01-15"
tags: ["React", "TypeScript"]
featured: true
url: "https://example.com"
github: "https://github.com/username/repo"
---

# Project Name

Your project content here in Markdown...
```

The project will automatically appear in:
- `/projects` - All projects listing
- `/` - Homepage (if `featured: true`)
- `/projects/[slug]` - Individual project page

## Metadata Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Project title |
| `description` | string | ✅ | Short description |
| `date` | string | ✅ | Publication date (YYYY-MM-DD) |
| `tags` | array | ✅ | Technology tags |
| `featured` | boolean | ❌ | Show on homepage |
| `url` | string | ❌ | Live site URL |
| `github` | string | ❌ | GitHub repository URL |

## Available Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: MDX with next-mdx-remote & gray-matter
- **Dev Server**: Turbopack

## Performance Features

- All pages statically generated at build time
- React cache for optimized data fetching
- Automatic code splitting
- Optimized fonts with next/font

## Deploy on Vercel

The easiest way to deploy is via [Vercel](https://vercel.com/new):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Deploy automatically

Alternatively, deploy manually:

```bash
npm run build
npm start
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [MDX Documentation](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
