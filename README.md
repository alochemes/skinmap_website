# skinmap — Marketing Website

> **"Every Mole. Every Patient. Every Visit."**

skinmap is an AI-powered dermatology diagnostics company building an iPhone app that gives physicians clinical-grade AI in their pocket — tracking patient skin health over time and flagging suspicious lesions before they become dangerous.

This repo is the **public marketing website** at [skinmap.com](https://skinmap.com).

---

## What We're Building

| Audience | Goal | Primary CTA |
|---|---|---|
| **Physicians** (dermatologists, PCPs, family medicine) | Convert to demo requests | "Request a Demo" |
| **Patients** | Empower them to ask their doctor about skinmap | "Ask Your Doctor About skinmap" |
| **Investors / Partners** | Build institutional credibility | "Contact Our Team" |
| **Press** | Establish media presence | Press kit / inquiry form |

The website runs a **dual audience strategy** — every page speaks to both physicians and patients simultaneously. Patients drive bottom-up adoption pressure by asking their doctors about skinmap.

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — bold headline, app mockup, clinical evidence, testimonials |
| `/product` | Product / Technology — AI engine, clinical workflow, accuracy metrics |
| `/about` | About / Team — mission, founders, clinical advisors |
| `/for-patients` | Patient-facing — **interactive doctor finder map**, FAQ, coverage request |
| `/investors` | Investors / Partners — market opportunity, investment thesis |
| `/news` | News / Press — press releases, media coverage, press kit |
| `/contact` | Contact — segmented forms (Demo · Partnership · Investor · Patient · Press) |
| `/legal/*` | Privacy Policy, Terms, Cookie Policy, HIPAA Notice |

---

## Doctor Finder Map

The `/for-patients` page includes a live interactive map powered by **maplibre-gl** (no API key required — free CartoDB tiles). Patients can:

- Search by doctor name, city, or practice
- Filter by specialty (Dermatology / Primary Care / Family Medicine)
- Click pins to see doctor profiles and call directly
- Request skinmap coverage in their area

> **Current state:** 23 mock providers across 15 U.S. cities. Wired to be replaced with a real database — see [Connecting Real Provider Data](#connecting-real-provider-data) below.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Map | react-map-gl + maplibre-gl |
| Forms | React Hook Form + Zod |
| Email delivery | Resend |
| Analytics | GA4 + PostHog |
| Error monitoring | Sentry |
| Feature flags / A/B | PostHog |
| Deployment | Vercel |

---

## Analytics Stack

We track everything through a single typed `analytics` wrapper — never raw `gtag()` or `posthog.capture()` calls.

```ts
// Example usage anywhere in the app
import { analytics } from '@/lib/analytics';

analytics.demoRequestSubmitted({ form_location: 'hero', specialty: 'Dermatology' });
analytics.heroCtaClicked({ cta_label: 'Request a Demo', page: '/', audience: 'physician' });
```

### Key events we track

| Event | When it fires |
|---|---|
| `demo_request_submitted` | Physician submits demo request form |
| `contact_form_submitted` | Any contact form submitted |
| `patient_inquiry_submitted` | Patient submits inquiry |
| `hero_cta_clicked` | Hero CTA button clicked |
| `doctor_search_submitted` | Patient searches for a doctor |
| `doctor_profile_opened` | Patient opens a doctor card or pin |
| `contact_doctor_clicked` | Patient clicks Call / Directions on a profile |

Full event taxonomy: [`src/lib/analytics/events.ts`](src/lib/analytics/events.ts)

### Providers

| Tool | Purpose | Env var |
|---|---|---|
| **GA4** | Page views, UTM attribution, conversions | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| **PostHog** | Funnel analysis, session insights, feature flags | `NEXT_PUBLIC_POSTHOG_KEY` |
| **Sentry** | Error monitoring, session replay on errors | `NEXT_PUBLIC_SENTRY_DSN` |

---

## Feature Flags & A/B Tests

Feature flags live in PostHog. Flag keys are defined in [`src/lib/flags/index.ts`](src/lib/flags/index.ts).

| Flag | Type | What it tests |
|---|---|---|
| `homepage_hero_cta` | A/B (3 variants) | Hero CTA copy — "Request a Demo" vs "Get Early Access" vs "See It in Action" |
| `homepage_patient_cta` | A/B | Patient CTA copy |
| `doctor_map_rollout` | Boolean rollout | Gates the doctor finder map (10% → 50% → 100%) |
| `doctor_finder_layout` | A/B | List-first vs map-first results layout |
| `doctor_search_input` | A/B | Manual ZIP entry vs browser location autofill |

---

## Cookie Consent

A GDPR-compatible cookie banner appears on first visit. Analytics are **off by default** until the user accepts. Uses Google Consent Mode v2 — the consent signal fires before GA4 loads.

---

## Contact Form → Email Routing

All five contact form types POST to `/api/contact` and are routed to the right inbox via Resend:

| Form | Goes to |
|---|---|
| Physician Demo | `demo@skinmap.com` |
| Partnership | `partnerships@skinmap.com` |
| Investor Inquiry | `investors@skinmap.com` |
| Patient | `hello@skinmap.com` |
| Press | `press@skinmap.com` |

---

## Local Development

```bash
git clone https://github.com/alochemes/skinmap_website.git
cd skinmap_website
npm install
cp .env.example .env.local   # add your keys
npm run dev                   # → http://localhost:3000
```

### Required env vars to develop locally

Most of the site works without any keys. To test specific features:

| Feature | Key needed |
|---|---|
| Contact form email delivery | `RESEND_API_KEY` |
| GA4 analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID` |
| PostHog analytics + flags | `NEXT_PUBLIC_POSTHOG_KEY` |
| Sentry error monitoring | `NEXT_PUBLIC_SENTRY_DSN` |

Full list: [`.env.example`](.env.example)

---

## Deployment

Hosted on **Vercel**. Every push to `main` auto-deploys to production. Pull requests get preview deployments automatically.

**Environment variable setup in Vercel:**
1. Go to Vercel → Project → Settings → Environment Variables
2. Add all keys from `.env.example`
3. Set `NEXT_PUBLIC_APP_ENV=production` for Production, `staging` for Preview
4. Set `NEXT_PUBLIC_SITE_URL=https://skinmap.com` for Production

> `NEXT_PUBLIC_*` variables are baked into the client bundle at build time — they must exist before the build runs.

---

## Connecting Real Provider Data

The doctor finder currently uses 23 hardcoded providers in [`src/data/providers.ts`](src/data/providers.ts).

To connect a real database:

1. Add a Postgres table:
   ```sql
   CREATE TABLE providers (
     id TEXT PRIMARY KEY,
     name TEXT, specialty TEXT, practice TEXT,
     city TEXT, state TEXT, lat FLOAT, lng FLOAT,
     phone TEXT, accepting BOOLEAN
   );
   ```
2. Create an API route at `/api/providers?search=&specialty=&lat=&lng=`
3. Replace the static import in `ForPatientsPageClient.tsx` with a `fetch()` call
4. Use the `doctor_map_rollout` PostHog flag to gate the live map during rollout

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages + API routes
│   ├── api/contact/        # POST handler → Resend email routing
│   ├── for-patients/       # Doctor finder map page
│   ├── sitemap.ts          # Auto-generated sitemap.xml
│   └── robots.ts           # Auto-generated robots.txt
├── components/
│   ├── ui/                 # Buttons, badges, cards, CookieBanner, ProviderMap
│   ├── providers/          # PostHogProvider (App Router pageview tracking)
│   └── layout/             # Navbar, Footer
├── data/
│   └── providers.ts        # Mock provider data (replace with DB)
├── hooks/
│   ├── useConsent.ts       # Cookie consent state
│   └── useFeatureFlag.ts   # PostHog feature flag hook (SSR-safe)
└── lib/
    ├── analytics/          # track() wrapper, event taxonomy, PostHog client
    └── flags/              # Feature flag keys + variant maps
```

---

## Brand

- **Name**: always lowercase — **skinmap**
- **Primary color**: Navy `#0D0B28`
- **Brand accent**: `#271881`
- **CTA green**: `#00CA5A` (token: `coral` — legacy name)
- **Font**: Inter

Full brand guide in [`CLAUDE.md`](CLAUDE.md).
