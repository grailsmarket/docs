# Grails API Documentation

Documentation site for the Grails API, built with Nextra 4 + Next.js 16 + Tailwind CSS 4.

## Commands

```bash
bun dev      # Start dev server
bun build    # Production build (includes pagefind search indexing)
bun start    # Start production server
```

## Project Structure

```
app/                          # Next.js App Router
  layout.tsx                  # Root layout with Nextra theme config
  [[...mdxPath]]/page.tsx     # Catch-all route for MDX content
  global.css                  # Tailwind imports + custom styles
content/                      # MDX documentation content
  _meta.ts                    # Top-level navigation
  index.mdx                   # Home page
  docs/                       # Documentation section
    _meta.ts                  # Docs sidebar navigation
    api/                      # API reference (one dir or file per route)
      _meta.ts                # API sidebar with separators by domain
tracking.json                 # Master progress tracker for /loop iterations
```

## API Source Code

The Grails API source is at: `~/work/grails/backend/services/api/src/`

- Route registration: `routes/index.ts` (all prefixes)
- Individual routes: `routes/{name}.ts`
- Auth middleware: `middleware/auth.ts` (requireAuth, optionalAuth)
- Cache middleware: `middleware/cache.ts` (cacheHandler=15s, longCacheHandler=60s, veryLongCacheHandler=5m, leaderboardCacheHandler=12h)
- Error handler: `middleware/error-handler.ts`

## /loop Workflow — Iterative API Documentation

Use `/loop 10m` with the following prompt to document one route per iteration:

### Loop Prompt

```
Read /home/throw/work/grails/docs/tracking.json and find the first route with status "pending".
If no pending routes remain, say "All routes documented" and stop.

For the next pending route, execute these phases:

**Phase 1 — Research:** Read the route source file at ~/work/grails/backend/services/api/src/routes/{file}. For each endpoint extract: HTTP method, full path (prefix + endpoint path), query/body/path parameters (from Zod schemas), auth requirement, cache TTL, and response shape.

**Phase 2 — Document:** Create MDX documentation following the template below.
- Routes with 1-3 endpoints: single file at content/docs/api/{route-name}.mdx
- Routes with 4+ endpoints: directory at content/docs/api/{route-name}/ with _meta.ts, index.mdx (overview), and one .mdx per endpoint

**Phase 3 — Review:** Re-read the source route file. Compare every endpoint, parameter, and response against the docs. Fix any gaps. Verify _meta.ts entries are correct.

**Phase 4 — Update tracking:** In tracking.json, set the route's status to "completed", completedAt to current ISO timestamp, all endpoints documented to true, and increment metadata.completedRoutes. Update metadata.lastUpdated.

**Phase 5 — Commit:** Stage and commit with message: docs({route-name}): document {N} endpoints
```

### MDX Endpoint Template

```mdx
---
title: Endpoint Name
description: Grails API v1
---

### METHOD /full/api/path/:param

Brief description.

**Authentication:** Required / Optional / None

**Cache:** 15s / 60s / 5m / 12h / None

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param`   | string | Yes    | Description |

#### Query Parameters

| Parameter | Type   | Default | Description |
|-----------|--------|---------|-------------|
| `page`    | number | `1`     | Page number |

#### Request Body *(POST/PUT/PATCH only)*

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| `field` | string | Yes      | Description |

#### Sample Request

\```sh
curl https://api.grails.market/full/api/path
\```

#### Response

\```jsonc
// 200 OK
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "...", "version": "1.0.0" }
}
\```
```

### Route Overview Template (for directories with 4+ endpoints)

```mdx
---
title: Route Name
description: Grails API v1
---

# Route Name

Brief description of the route group.

**Base path:** `/api/v1/route`

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET    | `/`  | None | List items  |
| POST   | `/`  | Required | Create item |
```

### Special Cases

- **WebSocket** (`/ws`): Document connection URL, message protocol, event types — not REST
- **Subgraph** (`/api/v1/subgraph`): GraphQL proxy — show example queries
- **Image endpoints** (clubs avatar/header): Note binary image response, not JSON
- **user-insights**: Prefix is `/api/v1/user` (not `/api/v1/user-insights`)
- **ai-search**: Two separate registrations — semantic and related

### Tracking File Format

```json
{
  "metadata": { "totalRoutes": 35, "completedRoutes": N, "lastUpdated": "ISO" },
  "routes": [
    {
      "name": "route-name",
      "file": "route.ts",
      "prefix": "/api/v1/route",
      "status": "pending|completed",
      "endpointCount": N,
      "endpoints": [{ "method": "GET", "path": "/", "auth": "none", "cache": "none", "documented": false }],
      "completedAt": null
    }
  ]
}
```
