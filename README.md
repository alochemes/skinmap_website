# skinmap — Marketing Website

Public-facing website for **skinmap**, an AI-powered dermatology diagnostics company. Built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter via `next/font/google` |
| Map | react-map-gl + maplibre-gl (CartoDB free tiles) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Analytics | GA4 via `@next/third-parties/google` |
| Product Analytics | PostHog |
| Error Monitoring | Sentry |
| Deployment | Vercel |

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home — physician conversion, dual physician/patient CTAs |
| `/product` | Product / Technology — AI engine, clinical workflow |
| `/about` | About / Team — mission, founders, advisors |
| `/for-patients` | Patient-facing — doctor finder map, FAQ, request coverage |
| `/investors` | Investors / Partners — market opportunity, thesis |
| `/news` | News / Press — press releases, media coverage |
| `/contact` | Contact — segmented forms (Demo, Partnership, Investor, Patient, Press) |
| `/legal/privacy` | Privacy Policy |
| `/legal/terms` | Terms of Service |
| `/legal/cookies` | Cookie Policy |
| `/legal/hipaa` | HIPAA Notice |

---

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in your keys
npm run dev                  # http://localhost:3000
```

---

## Environment Variables

See [.env.example](.env.example) for the full list. Key variables:

```bash
# Email delivery (Resend)
RESEND_API_KEY=re_XXXXXXXXXX
EMAIL_DEMO_INBOX=demo@skinmap.com
EMAIL_PARTNERSHIPS_INBOX=partnerships@skinmap.com
EMAIL_INVESTORS_INBOX=investors@skinmap.com
EMAIL_GENERAL_INBOX=hello@skinmap.com
EMAIL_PRESS_INBOX=press@skinmap.com

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_KEY=phc_XXXXXXXXXX
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Error monitoring
NEXT_PUBLIC_SENTRY_DSN=https://...@....ingest.sentry.io/...
SENTRY_ORG=skinmap
SENTRY_PROJECT=skinmap-web

# Environment + canonical URL
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_SITE_URL=https://skinmap.com
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout (Navbar, Footer, PostHogProvider, CookieBanner, GA4)
│   ├── page.tsx                   # Home page
│   ├── sitemap.ts                 # Auto-generated sitemap.xml
│   ├── robots.ts                  # Auto-generated robots.txt
│   ├── for-patients/              # Patient-facing page + doctor finder map
│   ├── product/                   # Product / Technology
│   ├── about/                     # About / Team
│   ├── investors/                 # Investors / Partners
│   ├── news/                      # News / Press
│   ├── contact/                   # Contact (segmented forms)
│   ├── legal/                     # Privacy, Terms, Cookies, HIPAA
│   └── api/
│       └── contact/route.ts       # POST handler — routes form to Resend by type
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── CookieBanner.tsx       # Phase 3 consent banner
│   │   └── ProviderMap.tsx        # Doctor finder map (maplibre-gl)
│   ├── sections/
│   ├── providers/
│   │   └── PostHogProvider.tsx    # PostHog init + App Router pageview tracking
│   └── layout/
│       ├── Navbar.tsx
│       └── Footer.tsx
├── data/
│   └── providers.ts               # Mock provider data (23 doctors — replace with DB)
├── hooks/
│   ├── useConsent.ts              # Cookie consent state (localStorage)
│   └── useFeatureFlag.ts          # PostHog feature flag hook (SSR-safe)
└── lib/
    ├── analytics/
    │   ├── events.ts              # Full typed event taxonomy (13 events)
    │   ├── index.ts               # track() wrapper — GA4 + PostHog + consent gate
    │   └── posthog.ts             # PostHog client init
    ├── flags/
    │   └── index.ts               # Feature flag keys + variant maps
    └── utils.ts
```

---

## Analytics Architecture

All analytics flow through a single `track()` function — never call `gtag()` or `posthog.capture()` directly.

```ts
import { analytics } from '@/lib/analytics';

analytics.demoRequestSubmitted({ form_location: 'hero', specialty: 'Dermatology' });
analytics.heroCtaClicked({ cta_label: 'Request a Demo', page: '/', audience: 'physician' });
```

### Event taxonomy

Defined in `src/lib/analytics/events.ts`. Key events:

| Event | When |
|---|---|
| `demo_request_submitted` | Physician demo form submit |
| `contact_form_submitted` | Any contact form submit |
| `patient_inquiry_submitted` | Patient form submit |
| `hero_cta_clicked` | Hero CTA button click |
| `doctor_search_submitted` | Doctor finder search |
| `doctor_profile_opened` | Doctor card/pin click |
| `map_pin_clicked` | Map marker click |
| `contact_doctor_clicked` | Call/directions click on doctor profile |

### Providers

| Provider | Purpose | Config |
|---|---|---|
| GA4 | Page views, UTM attribution, conversions | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| PostHog | Funnel analysis, session insights, feature flags | `NEXT_PUBLIC_POSTHOG_KEY` |
| Sentry | Error monitoring, session replay (errors only) | `NEXT_PUBLIC_SENTRY_DSN` |

### Consent (Phase 3)

Google Consent Mode v2 defaults to `analytics_storage: 'denied'` before the GA4 script loads. PostHog starts opted out. The `CookieBanner` component (bottom of every page) calls `setAnalyticsConsent(true/false)` which updates both providers simultaneously. Preference persisted in `localStorage`.

---

## Feature Flags (Phase 5)

Feature flags are managed in PostHog. Flag keys are defined in `src/lib/flags/index.ts`.

| Flag key | Type | Description |
|---|---|---|
| `homepage_hero_cta` | Multivariate | A/B test hero CTA copy (3 variants) |
| `homepage_patient_cta` | Multivariate | A/B test patient CTA copy |
| `doctor_map_rollout` | Boolean | % rollout of doctor finder map |
| `doctor_finder_layout` | Multivariate | list-first vs map-first results |
| `doctor_search_input` | Multivariate | manual ZIP vs location autofill |

```ts
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FLAGS } from '@/lib/flags';

const variant = useFeatureFlag(FLAGS.HOMEPAGE_HERO_CTA, 'control');
```

Always provide a `defaultValue` matching the control variant — ensures correct render before PostHog loads.

---

## Contact Form API

`POST /api/contact` — accepts JSON with a `type` discriminator. Routes each type to the correct inbox via Resend.

| type | Destination |
|---|---|
| `physician_demo` | `EMAIL_DEMO_INBOX` |
| `partnership` | `EMAIL_PARTNERSHIPS_INBOX` |
| `investor` | `EMAIL_INVESTORS_INBOX` |
| `patient` | `EMAIL_GENERAL_INBOX` |
| `press` | `EMAIL_PRESS_INBOX` |

---

## Doctor Finder Map

The doctor finder lives at `/for-patients`. Current data is mocked in `src/data/providers.ts` (23 providers, 15 U.S. cities).

**To connect real data:**
1. Replace `src/data/providers.ts` with a fetch to `/api/providers`
2. Add a Postgres table with `id, name, specialty, practice, lat, lng, phone, accepting`
3. Add query params: `?search=&specialty=&lat=&lng=` for server-side filtering + distance sort
4. Use the `doctor_map_rollout` PostHog flag to gate the feature during rollout

**Map tiles:** Free CartoDB Dark Matter GL — no API key required.

---

## Deployment

Deployed on Vercel. Set environment variables in **Vercel → Project → Settings → Environment Variables**:

- `NEXT_PUBLIC_*` vars are baked into the client bundle at build time — must be set before building
- Server-only vars (`RESEND_API_KEY`, `SENTRY_*`) are read at request time
- Set `NEXT_PUBLIC_APP_ENV=production` for Production, `staging` for Preview branches

```bash
# Production build check
npm run build
```

---

## Roadmap Completed

| Phase | Description | Status |
|---|---|---|
| Phase 1 | Foundation — event taxonomy, analytics wrapper, env config | ✅ |
| Phase 2 | Marketing analytics — GA4, page views, UTM attribution, form tracking | ✅ |
| Phase 3 | Privacy / Consent — cookie banner, Google Consent Mode v2 | ✅ |
| Phase 4 | Product analytics — PostHog, pageview tracking, funnel events | ✅ |
| Phase 5 | Experimentation — feature flags, A/B tests via PostHog | ✅ |
| Phase 6 | Observability — Sentry error monitoring + session replay | ✅ |
| Prod #1 | Form delivery — Resend email routing for all 5 form types | ✅ |
| Prod #2 | SEO — sitemap.xml + robots.txt | ✅ |
