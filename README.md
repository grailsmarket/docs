# Grails API Documentation

Documentation site for the [Grails](https://grails.market) API — an ENS name manager and marketplace.

Built with [Nextra 4](https://nextra.site), [Next.js 16](https://nextjs.org), and [Tailwind CSS 4](https://tailwindcss.com). Search is powered by [Pagefind](https://pagefind.app).

## Setup

### Prerequisites

- [Bun](https://bun.sh) (v1.2+)

### Install & Run

```bash
bun install
bun dev       # http://localhost:3000
```

### Production Build

```bash
bun build     # Next.js build + Pagefind search indexing
bun start     # Start production server
```

### Deploy

The site is configured with `output: "standalone"` for container-based deployments (Railway, Docker, etc.). Railway auto-detects the Next.js project — just connect the repo and set `PORT=3000`.

## API Coverage

The Grails API exposes **134 endpoints** across **35 route groups**, organized into the following domains:

| Domain | Routes |
|--------|--------|
| **Core** | Health, Authentication (SIWE), Users, Profiles |
| **Names & Search** | Names, Search, AI Search (Semantic + Related) |
| **Marketplace** | Listings, Offers, Orders, Sales, Brokered Listings, Cart |
| **Social** | Watchlist, Clubs, Votes, Notifications, Activity |
| **Discovery** | Trending, Leaderboard, Awards Leaderboard, Recommendations, AI Recommendations |
| **Analytics** | Analytics, Charts, Google Metrics, User Insights |
| **System** | Verification, Legends, Personas, POAP, ENS Roles, Subgraph, WebSocket |

### Authentication

The API uses Sign-In with Ethereum (SIWE) for authentication. Most read endpoints are public; write operations require a JWT obtained through the SIWE flow. See the [Authentication](content/docs/authentication.mdx) page for details.

### Response Format

All endpoints return a standard JSON envelope with `success`, `data`, and `meta` fields. Error responses include a `code` and `message`. See [Response Format](content/docs/response-format.mdx).

## Project Structure

```
app/
  layout.tsx                    Root layout with Nextra theme config
  [[...mdxPath]]/page.tsx       Catch-all route for MDX content
  global.css                    Tailwind imports + custom styles
content/
  _meta.ts                      Top-level navigation
  index.mdx                     Home page
  docs/
    index.mdx                   API introduction
    authentication.mdx          SIWE auth flow
    response-format.mdx         Standard response envelope
    api/
      _meta.ts                  Sidebar nav with domain separators
      {route}.mdx               Single-file routes (1-3 endpoints)
      {route}/                  Multi-file routes (4+ endpoints)
        _meta.ts                Endpoint navigation
        index.mdx               Route overview
        {endpoint}.mdx          Individual endpoint docs
tracking.json                   Progress tracker for documentation builds
```

### Content Conventions

- Routes with **1-3 endpoints** are a single MDX file (e.g., `health.mdx`)
- Routes with **4+ endpoints** get their own directory with an overview and per-endpoint pages (e.g., `listings/`)
- Each endpoint page documents: method, path, auth requirements, cache TTL, parameters, sample request, and response shape
- The sidebar in `api/_meta.ts` groups routes by domain using separators

## How This Was Built

The documentation was scaffolded iteratively using an automated loop workflow. A `tracking.json` file tracks every route in the API with its endpoints, auth requirements, and documentation status. Each iteration reads the next pending route from the tracker, examines the source code in the API backend, generates the MDX documentation, cross-references against the source for accuracy, and commits the result. This approach ensures each documented endpoint is verified directly against the implementation rather than written from memory or specs alone.
