<!-- BEGIN:nextjs-agent-rules -->

# Next.js + TypeScript Agent Rules

This project uses **Next.js App Router** with **Server Components by default**. Read `node_modules/next/dist/docs/` for current APIs before writing code.

---

## Core Principles (Apply Everywhere)

1. **Follow existing patterns** — Find 2-3 similar implementations; mirror them. Consistency > innovation.
2. **No duplicate solutions** — One API client pattern, one state pattern, one validation strategy, one service pattern.
3. **Search before create** — Grep for existing components/hooks/utils/types before writing new ones.
4. **Server Components first** — Default to Server Components. Add `'use client'` only when interactivity (hooks, event handlers, browser APIs) is required.
5. **Colocate** — Types, styles, tests, sub-components live next to their parent.
6. **No hardcoded values** — Colors, spacing, durations, breakpoints → design tokens (`@/styles/tokens.css` or `tailwind.config.ts`).
7. **No secrets in code** — Ever. Use `.env`; client-exposed vars prefixed `NEXT_PUBLIC_`.

---

## Project Structure (Reference, Not Mandate)

```
app/                    # Routes, layouts, page.tsx (thin composition only)
├── (route-groups)/     # Layout separation without URL changes
├── api/                # Route Handlers (webhooks, non-UI endpoints)
├── globals.css
└── layout.tsx

components/
├── ui/                 # Reusable primitives (Button, Container, SectionHeading)
├── sections/           # Page sections (hero/, projects/, services/, etc.)
│   └── [section]/      # Section components compose ui/ + animations/
├── animations/         # Animation wrappers (Reveal, Parallax, ImageReveal)
├── layout/             # Page chrome (Header, Footer, Navigation)

data/                   # Static content (projects.ts, services.ts, etc.)
hooks/                  # Custom hooks (useMediaQuery, useScrollProgress)
lib/                    # Utilities (utils.ts, constants.ts, metadata.ts)
public/                 # Static assets (images/, fonts/, videos/)
styles/                 # Global CSS (tokens.css, animations.css)
types/                  # Shared types (project.types.ts, common.types.ts)
```

**Page rule:** `page.tsx` composes sections — no business logic, no markup beyond section imports.

**Component granularity:** Extract when used ≥2 times OR has distinct behavior/animation/responsibility. Don't wrap every `<div>`.

---

## Server vs Client Component Decision

| If the component... | Then... |
|---------------------|---------|
| Fetches data, renders static markup, no browser APIs | **Server Component** (default, no directive) |
| Uses `useState`, `useEffect`, `useRouter`, `onClick`, `refs` | **Client Component** (`'use client'` at top) |
| Needs SEO metadata | Server Component with `generateMetadata` |
| Mutates data (form submit, button action) | Server Action (in same file or `actions.ts` colocated) |
| Wraps a slow data fetch | Server Component + `<Suspense>` boundary around it |

**Push `'use client'` down** — Keep parents as Server Components; extract interactive leaves.

---

## Data Fetching & Mutations

| Scenario | Pattern |
|----------|---------|
| Server Component reading data | `fetch(url, { next: { tags: ['tag'], revalidate: 60 } })` — no service layer needed |
| Client Component needs data | Call a **Server Action** or **Route Handler** — never `fetch` directly to external APIs |
| Form submissions, mutations | **Server Action** (`'use server'`) — receives `FormData`, validates with Zod, revalidates tags |
| Webhooks, streaming, non-UI endpoints | **Route Handler** (`route.ts`) |
| Client-side optimistic updates / background refetch | SWR or TanStack Query — opt-in only, not default |

**Cache strategy:** Tag fetches (`next: { tags }`); revalidate via `revalidateTag`/`revalidatePath` in Server Actions.

---

## State Management Hierarchy (Use First Match)

1. **URL state** (`searchParams`) — Shareable/bookmarkable: filters, pagination, tabs.
2. **Server state** — Remote data via Server Components/Server Actions; don't mirror in client global state.
3. **Local state** (`useState`/`useReducer`) — Ephemeral UI: modals, form inputs, toggles.
4. **Global client state** (Context/Zustand/Redux) — Only if existing architecture uses it OR complexity clearly requires cross-component shared state not covered by 1-3.

**Never duplicate** the same data across URL, props, server, and global state.

---

## Forms & Validation

- **Server-side mandatory** — Validate in Server Action/Route Handler with Zod (project standard).
- **Client-side for UX** — Mirror schema via `zod-to-react-hook-form` or similar.
- **Complex forms** — React Hook Form + Zod.
- **Simple forms** — Native `<form>` + `FormData` + Server Action.
- **Errors** — Inline per field; toast for non-field errors.
- **Never trust client validation alone.**

---

## UI / Design System

- **Tokens only** — `color-primary`, `space-md`, `radius-lg` — never `blue-500`, `p-4`, `rounded-xl`.
- **Semantic naming** — Token names describe purpose, not value.
- **Dark mode** — CSS variables + `prefers-color-scheme` or `data-theme`; no inline style switching.
- **Responsive** — Mobile-first; container queries > fixed breakpoints in component logic.
- **Reuse first** — Check `components/ui/` before building new primitives.
- **States required** — Every list: empty; every action: loading; every mutation: success/error.
- **Icons** — Single library; import individual icons (`lucide-react/IconName`).
- **Images** — `next/image` with `width`/`height` or `fill` + parent `relative`; always `alt`.
- **Fonts** — `next/font` with `variable` for CSS var integration; subset + preload.

---

## Animation Rules

- **Respect `prefers-reduced-motion`** — Disable non-essential motion when set.
- **Transform/opacity only** — No animating `width`, `height`, `top`, `left`, `margin`, `padding` (layout thrashing).
- **Duration guidelines** — Micro: 150–200ms; Transitions: 200–300ms; Page: <300ms.
- **Easing** — Entrance: `ease-out`; Transition: `ease-in-out`; Exit: `ease-in`.
- **Stagger** — 20–50ms/item; max 300ms total.
- **Skeletons > spinners** — Match final layout; `pulse`/`shimmer` animation.
- **Library use** — CSS transitions/animations default; Framer Motion / motion-one only when orchestration (sequencing, layout animations) requires it.
- **No CLS/jank** — Verify on low-end devices.

**Architecture:** Section components wrap content in animation primitives from `components/animations/` — no GSAP/ScrollTrigger logic in section/UI components.

---

## Accessibility (Non-Negotiable)

- **Semantic HTML** — `<button>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`.
- **Headings** — One `<h1>`/page; logical hierarchy (h1→h2→h3); never skip levels.
- **Labels** — Every input: visible `<label>` or `aria-label`/`aria-labelledby`; never placeholder-only.
- **Focus** — Visible `focus-visible` rings; trap in modals/drawers; return focus on close.
- **Contrast** — WCAG AA (4.5:1 text, 3:1 large/UI) in both themes.
- **Keyboard** — All interactive elements reachable/operable; Tab order = visual order.
- **ARIA** — Native HTML > ARIA; `role="button"` on `<div>` = fix the element.
- **Images** — Meaningful `alt`; decorative = `alt=""`; SVG icons: `aria-hidden="true"` + labeled parent.
- **Forms** — `aria-describedby` for errors/hints; `aria-invalid` on error; `aria-required` when required.
- **Live regions** — `aria-live="polite"` (toasts/status); `aria-live="assertive"` (errors).
- **Test** — axe-core in CI; manual keyboard + screen reader for new features.

---

## SEO

- **Metadata API** — Every page/layout exports `generateMetadata` returning `Metadata` (title, description, openGraph, twitter, robots, alternates).
- **Dynamic pages** — Use `props.params` + `props.searchParams` in `generateMetadata`.
- **Sitemap** — `app/sitemap.ts` or `next-sitemap`; include `lastmod`, `changefreq`, `priority`.
- **Robots** — `app/robots.ts`; disallow private/admin routes.
- **Structured data** — JSON-LD in `generateMetadata` or component; validate via Rich Results Test.
- **Canonical** — `metadata.alternates.canonical` on every page; pagination with `rel="prev"/"next"`.
- **Social cards** — `openGraph.images` (1200×630); `twitter.card: summary_large_image`.
- **Core Web Vitals** — Optimize LCP (hero priority), CLS (reserve space), INP (reduce main-thread work).
- **i18n** — `generateStaticParams` for static; `alternates.languages` in metadata; `hreflang` in sitemap.
- **No client redirects** for SEO pages — Middleware or Server Component redirect.

---

## Security

- No hardcoded secrets/API keys/tokens.
- No `NEXT_PUBLIC_` unless intentionally public.
- Validate all input server-side (Server Actions, Route Handlers).
- Sanitize user-generated content (DOMPurify or project standard).
- Follow existing auth patterns — don't invent new ones.
- Server Actions = server-only (no secrets in client bundle).
- Middleware = auth checks only; fast, stateless.
- CSP headers via `next.config.js` or middleware.

---

## Database / Storage

- Reuse existing queries/patterns — no new query styles.
- No N+1 — batch, select only needed fields.
- Transactions for multi-step atomic updates.
- No prod schema/credential changes without approval.
- Use project ORM (Prisma/Drizzle) consistently.
- Migrations: version-controlled, reviewable, reversible; run in CI.
- Connection pooling via platform (PgBouncer, Supabase, Neon).
- Cache expensive reads: `unstable_cache`; revalidate tags after mutations.

---

## Performance

**Avoid:**
- Unmeasured memoization (`React.memo`, `useMemo`, `useCallback`).
- Duplicate fetches (dedupe via `fetch` cache / `unstable_cache`).
- Duplicate DB queries.
- Expensive loops in render (move to DB or background).
- Large Client Component bundles (lazy-load with `dynamic()`).
- Waterfall requests (`Promise.all` + `Suspense` boundaries).

**Prefer:**
- Static generation (default); `generateStaticParams` for dynamic routes.
- ISR: `next: { revalidate: 60 }` or `revalidateTag`.
- Streaming: `Suspense` around slow data; skeleton immediately.
- Font: `next/font` with `display: swap`, subset, preload.
- Images: `next/image` with `priority` for LCP; `sizes` for responsive.

---

## Error Handling

- **Never swallow** — No empty `catch`.
- **Log unexpected errors** — Project logger (not `console.log`); include operation, result, duration, context.
- **Centralized handling** — Use project's error boundary/handler.
- **Consistent API errors** — Server Actions/Route Handlers return `{ error: string }` or throw.
- **User-friendly UI messages** — No stack traces or opaque codes.
- **Preserve context** when rethrowing.

| Layer | Mechanism |
|-------|-----------|
| Server Component | `error.tsx` boundary; `not-found.tsx` for 404 |
| Server Action | Return `{ error }` or throw; handle via `useActionState` |
| Client Component | Error Boundary for render; try/catch in handlers |

---

## Logging

- Use project logger (`pino`, `nextjs-logger`, or structured JSON `console`).
- Levels: `debug`/`info`/`warn`/`error` — no `console.log` in prod.
- Context: operation, result, duration, userId, requestId.
- Never log secrets, tokens, PII.
- Server Actions: log sanitized input, outcome, duration.
- Route Handlers: method, path, status, duration.
- Middleware: auth decisions/redirects only; minimal.

---

## Debugging — Root Cause First

**Never workaround before root cause.**

1. Explain root cause.
2. Identify impacted modules.
3. Verify in code.
4. Then fix.

---

## Migration Safety

Schema changes require: backward compatibility + migration strategy + rollback strategy. No destructive changes without approval.

---

## Comments

**Write comments only when they explain:**
- Business rules / domain logic
- Non-obvious algorithms / implementation details
- Assumptions / constraints / edge cases
- Security / performance / reliability concerns
- Workarounds for external limitations

**Never comment:**
- Obvious code (`counter++`)
- Standard Next.js conventions (file structure, `'use client'`, `generateMetadata`)
- AI-generated code (refactor until self-explanatory)
- Section banners (`// ===== User Service =====`)

**Configuration files:** Every option gets a single-line comment above explaining purpose/impact (unless JSON).

**Validation:** Every comment must answer: Why necessary? What rule? What assumption? What edge case? What security/perf/reliability concern? What external limitation? For config: purpose/impact? If none → delete.

---

## Technical Debt

When touching code: identify nearby debt → mention it → don't fix unless requested. Separate feature work from refactoring.

---

## Commit Messages

Conventional Commits: `type(scope): description`

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`, `perf`.

Scope = module/area (encouraged).

---

## Quality Assurance

### Self Review (Pre-Commit)
- Correctness
- Architecture adherence
- Type safety
- Error handling
- Edge cases
- Testing impact

### Testing
| Type | Scope | Tool |
|------|-------|------|
| Unit | Pure functions, utils, hooks, validators | Vitest/Jest; colocate `*.test.ts(x)` |
| Component | Client Components — behavior, not implementation | React Testing Library |
| Integration | Server Actions, Route Handlers, DB | Test DB or mocks |
| E2E | Critical flows (auth, checkout, onboarding) | Playwright (CI) |
| Visual | Design system components | Chromatic |
| A11y | All new features | axe-core (CI) + manual keyboard/screen reader |

**Coverage:** Meaningful on business logic; 100% not a goal.
**Test data:** Factories/fixtures; no hardcoded IDs; cleanup in `afterAll`.

---

## Confidence Threshold

If confidence < 80%:
- State assumptions explicitly.
- Identify unknowns.
- Ask questions.
- **Do not invent** architecture details.

---

<!-- END:nextjs-agent-rules -->