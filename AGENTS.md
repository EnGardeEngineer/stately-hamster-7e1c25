# Atlas Lions Fencing Project Guide

## Project Overview

Atlas Lions Fencing is a premium single-page marketing site for a distributed New York City fencing academy. It serves two primary audiences: families seeking high-performance athlete development and school administrators evaluating a scholastic program partner.

The experience is intentionally editorial and athletic rather than app-like. The visual system uses near-black, warm white, and metallic gold with condensed display typography, large photography, asymmetric layouts, and restrained motion.

## Technology

- TanStack Start and TanStack Router
- React 19 and TypeScript
- Vite 7
- Tailwind CSS 4 plus custom CSS
- Lucide React icons
- Netlify Forms

## Key Directories

```text
public/
  __forms.html       Static form definitions required by Netlify Forms
  images/            Locally hosted editorial fencing photography
src/
  routes/
    __root.tsx       Document shell and SEO metadata
    index.tsx        Complete single-page site and interactive behavior
  router.tsx         TanStack Router setup
  styles.css         Design system, responsive layouts, and motion
```

## Architecture

The public experience intentionally has one route. Navigation uses section anchors for `#locations`, `#programs`, `#coaches`, and `#corporate`.

Interactive state stays local to `src/routes/index.tsx`:

- Academy map category selection
- Mobile navigation
- School partnership modal
- Form loading, success, and error states

Both forms post URL-encoded data to `public/__forms.html`. Do not change the endpoint to `/`; TanStack Start intercepts root requests before Netlify Forms can process them.

## Coding Conventions

- Use PascalCase for React components and camelCase for functions and state.
- Keep route-level content in `src/routes/index.tsx` unless a section becomes large enough to justify a focused component.
- Keep color, type, spacing, and motion tokens in `src/styles.css`.
- Preserve semantic headings, labels, focus states, keyboard dismissal, and reduced-motion support.
- Prefer transform and opacity for animation.
- Avoid inventing names, credentials, addresses, phone numbers, or compliance documents. Use confirmed source material only.
- Preserve the premium sports-broadcast direction; avoid generic rounded cards, gradient-heavy SaaS styling, and decorative fencing clipart.

## Content Decisions

The original brief did not provide founder names, staff names, a phone number, compliance document URLs, or final venue addresses. The site therefore uses role-based leadership labels and routes unavailable document requests through the partnership inquiry modal rather than publishing fabricated details.

Before launch, confirm every staff credential, compliance claim, official club status, contact detail, and venue location with Atlas Lions leadership.

## Local Development

```bash
npm install
npm run dev
```

Netlify deployment settings are defined in `netlify.toml`. Forms become active on a deployed Netlify URL, not through a plain Vite server.
