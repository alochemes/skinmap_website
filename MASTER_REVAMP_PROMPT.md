# skinmap — Master Website Revamp Prompt
_The single definitive prompt for rebuilding www.skinmap.com into skinmap v2._
_Synthesized from: CLAUDE.md · DESIGN_BRIEF.md · copy-brief.md · research-brief.md · all built source files._

---

## CONTEXT: WHAT YOU'RE DOING

You are rebuilding **www.skinmap.com** from scratch. The current site is an outdated, generic medical website featuring a slider hero ("Together, We Can Conquer Cancer"), basic green accent buttons (#42b653), a "Triangulate Labs" footer attribution, and messaging centered on "Total Body Photography (TBP)." It has a nav with: Home, For Clinicians, For Patients, Request Information, News. It looks like any other medical startup website from 2019.

The new version — **skinmap v2** — is a complete redesign built in Next.js 15 + TypeScript + Tailwind CSS + Framer Motion. It already exists in the `skinmap_v2` repo and is partially built. Your job is to understand it completely and finish it to production quality.

The new site positions skinmap as **the clinical-grade AI co-pilot for dermatology** — physician-first, evidence-based, with a dual physician+patient audience strategy. It is visually premium: dark navy gradient hero with brand blue ambient glows, green (#00CA5A) CTAs, sky blue secondary accents, Inter font, Framer Motion scroll animations. Think: Vista AI meets Sword Health meets a medical journal.

---

## BRAND IDENTITY

**Brand name**: `skinmap` — always lowercase. Never "SkinMap" or "SKINMAP."

**One-liner**: skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking patient skin health over time and flagging suspicious lesions before they become dangerous.

**Product**: iPhone app (iOS-first). No extra hardware required.

**Primary users**: Dermatologists, PCPs, family medicine physicians, oncologists.

**Core capabilities**:
1. Longitudinal patient skin health tracking (visit-over-visit lesion comparison)
2. AI-powered skin cancer risk stratification (90% sensitivity / 90% specificity)
3. Physician-facing patient management dashboard
4. Clinical-grade image capture, annotation, and analysis
5. HIPAA-compliant patient records (AES-256 encryption)

---

## DUAL AUDIENCE STRATEGY

The site must speak to **both physicians and patients simultaneously**.

| Audience | Goal | Primary CTA |
|---|---|---|
| Physicians (dermatologists, PCPs, family medicine) | Convert to demo request | "Request a Demo" → `/contact?type=demo` |
| Patients (health-conscious adults, cancer-concerned) | Empower to ask their doctor about skinmap | "Ask Your Doctor About skinmap" → `/contact?type=patient` |
| Hospital systems / Investors | Institutional credibility | "Request an Investor Briefing" → `/contact?type=investor` |
| Press / FDA / Medical associations | Authority + media presence | "Download Press Kit" |

**Patient messaging (always route action through the physician — never say "download the app"):**
- "You deserve to know what's on your skin."
- "Ask your doctor about skinmap at your next appointment."
- "Don't wait for symptoms. Track your skin health over time."
- "skinmap gives your doctor the AI tools to catch skin cancer earlier."

---

## COLOR PALETTE

These are the ONLY colors. Never hardcode hex values in components — always use Tailwind tokens.

| Token | Hex | Usage |
|---|---|---|
| `navy` DEFAULT | `#0D0B28` | Large dark backgrounds, navbar, hero sections, dark cards |
| `navy-500` | `#271881` | Pure brand blue — gradient midpoint, accent glows only |
| `coral` DEFAULT | `#00CA5A` | **Primary CTA buttons, accent highlights, eyebrows, stat numbers** |
| `coral-dark` | `#009B44` | Hover state for coral buttons |
| `blue` DEFAULT | `#03C0DE` | Secondary accent, links, "For Patients" badges |
| `teal` DEFAULT | `#0097A0` | Tertiary accent |
| `cream` | `#F2F5FF` | Light section backgrounds (alternating with white) |

**Hero gradient** (defined in `tailwind.config.ts` as `bg-gradient-hero`):
```
linear-gradient(160deg, #0D0B28 0%, #271881 45%, #0D0B28 100%)
```

**CTA banner gradient** (`bg-gradient-coral`):
```
linear-gradient(135deg, #00CA5A 0%, #009B44 100%)
```

**CRITICAL contrast rules:**
- `#271881` (navy-500) at large background scale reads as vivid purple — **NEVER use as a full-section background.** Only as glow/gradient midpoint.
- `#00CA5A` coral and `#03C0DE` blue have luminance ~0.44 — **white text fails WCAG AA.** Use `text-navy-900` on these backgrounds.
- Ambient glow circles: `bg-coral/15`, `bg-blue/15`, `bg-navy-500/30` at 72-96px `blur-3xl`

---

## TYPOGRAPHY

Font: **Inter** (Google Fonts via `next/font/google`)

| Role | Tailwind classes | Weight |
|---|---|---|
| Hero headline | `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]` | 800 |
| Section headline | `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` | 700 |
| Body | `text-base md:text-lg leading-relaxed` | 400 |
| Eyebrow/badge | `text-xs font-semibold uppercase tracking-widest` | 600 |
| Metric callout | `text-4xl md:text-5xl lg:text-6xl font-extrabold` in `text-coral` | 800 |

---

## DESIGN PRINCIPLES

1. **Light-dominant** — white and `cream` as primary backgrounds; dark sections (navy) used sparingly for emphasis moments
2. **Alternating backgrounds** — never two adjacent sections the same: `white → cream → navy → white → cream`
3. **Section padding** — `py-16 md:py-24 lg:py-32` standard; `py-12 md:py-16 lg:py-20` tight
4. **Card style** — `rounded-2xl` or `rounded-3xl`, `shadow-card`, consistent padding
5. **Motion** — all sections use Framer Motion `whileInView` FadeUp with `once: true`; always respect `useReducedMotion()`
6. **Mobile-first** — 375px minimum viewport; form inputs must be `text-base` (≥16px) to prevent iOS Safari zoom
7. **No lorem ipsum** — every string is real skinmap copy from the copy brief
8. **No hardcoded hex** — always use Tailwind tokens

---

## TECH STACK

| Layer | Technology |
|---|---|
| Framework | Next.js 15, App Router, TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter via `next/font/google` |
| Map | MapLibre GL + react-map-gl (For Patients page) |
| Images | `next/image` with optimization |
| Forms | React Hook Form + Zod validation |
| Deployment | Vercel (auto-deploy on push to master) |
| Repo | https://github.com/alochemes/new_site (branch: master) |

---

## PROJECT STRUCTURE

```
src/
├── app/
│   ├── layout.tsx              ← Root layout: Navbar + Footer + Inter font + metadata
│   ├── page.tsx                ← Home (BUILT)
│   ├── product/page.tsx        ← Product / Technology (BUILT)
│   ├── about/page.tsx          ← About / Team (BUILT)
│   ├── investors/page.tsx      ← Investors / Partners (BUILT)
│   ├── news/page.tsx           ← News / Press (BUILT)
│   ├── contact/page.tsx        ← Contact — 5-tab segmented form (BUILT)
│   ├── for-patients/page.tsx   ← For Patients — provider map + FAQ (BUILT)
│   └── not-found.tsx           ← Custom 404 (BUILT)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          ← Fixed, transparent→navy on scroll; hamburger mobile
│   │   └── Footer.tsx          ← Navy bg; 4-col links + legal + social
│   └── ui/
│       ├── Button.tsx          ← variants: primary|secondary|outline|ghost|outline-white
│       ├── Badge.tsx           ← variants: new(green)|clinical(blue glass)|partner|press|outline
│       ├── Card.tsx            ← variants: default|feature|stat|testimonial
│       ├── Section.tsx         ← bg: white|cream|navy|coral; tight prop
│       ├── Container.tsx       ← max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
│       └── ProviderMap.tsx     ← MapLibre GL + react-map-gl; specialty dot markers
├── lib/
│   └── utils.ts                ← cn() utility
└── styles/
    └── globals.css
```

---

## COMPONENT CONTRACTS

### Button variants
| Variant | Style | When to use |
|---|---|---|
| `primary` | `bg-coral text-navy-900 hover:bg-coral-dark` | Main physician CTAs everywhere |
| `secondary` | `bg-navy text-white hover:bg-navy-700` | On green gradient (coral bg) sections |
| `outline` | `border-navy text-navy hover:bg-navy hover:text-white` | Secondary actions on light bg |
| `outline-white` | `border-white text-white hover:bg-white hover:text-navy` | Secondary on dark/navy bg |
| `ghost` | `text-navy hover:bg-navy/5` | Tertiary actions |

### Badge variants
| Variant | Style | When to use |
|---|---|---|
| `new` | `bg-coral text-navy-900` | "For Physicians" labels, eyebrows on dark bg |
| `clinical` | `bg-blue/15 text-blue-700 border border-blue/30` | "For Patients", clinical labels |
| `partner` | `bg-navy text-white` | Institution / partner labels |

### Section backgrounds
`white` → `#FFFFFF` | `cream` → `#F2F5FF` | `navy` → `#0D0B28` | `coral` (uses `bg-gradient-coral`)

### FadeUp animation pattern (use on every section)
```tsx
function FadeUp({ children, delay = 0, className }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

---

## NAVBAR SPEC

- **Logo**: `skinmap` wordmark lowercase, links to `/`
- **Desktop nav links**: Product · About · Investors · News · Contact
- **Desktop CTA**: "Request a Demo" coral primary button → `/contact?type=demo`
- **Scroll behavior**: transparent + white logo over hero; transitions to full `bg-navy` at 80px scroll
- **Mobile**: hamburger → full-width slide-down navy panel; closes on route change; locks body scroll while open
- **A11y**: skip-to-main link, focus trap in mobile menu, ARIA labels

---

## FOOTER SPEC

- **Background**: `bg-navy`
- **4 columns**: Company (about, team, contact) | Product (features, technology, demo) | Resources (news, press kit, investors) | Legal (privacy, terms, HIPAA, cookies)
- **Bottom row**: skinmap logo + "Clinical-grade AI for dermatology" | HIPAA badge | © 2026 skinmap
- **Social**: Twitter/X, LinkedIn (NOT @Skinmap360 — that's the old account)
- **Legal pages**: `/legal/privacy` · `/legal/terms` · `/legal/hipaa` · `/legal/cookies` (HIGH priority — must exist before launch)

---

## PAGE 1: HOME (`/`)

**Goal**: Convert physician visitors to demo requests. Secondary: empower patients to ask their doctor.

### Section order:
1. **Hero** (navy gradient bg)
   - Eyebrow badge: `CLINICAL-GRADE DERMATOLOGY AI`
   - Headline: `Every Mole. / Every Patient. / Every Visit.` (third line in coral)
   - Subheadline: `skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking every lesion, comparing visit-over-visit, and flagging suspicious changes before they become dangerous.`
   - CTAs: "Request a Demo" (coral primary) + "Ask Your Doctor" (outline-white)
   - Trust row: ✓ HIPAA ✓ FDA De Novo ✓ IRB-Validated
   - Right: floating iPhone mockup with real app UI (or placeholder div with simulated UI)
   - Ambient glow circles: coral/15, blue/15, navy-500/30

2. **Social Proof Bar** (cream bg, border-y)
   - "Trusted at leading institutions"
   - Placeholder logo blocks: University Medical Center, Regional Health System, Academic Dermatology Group, National Cancer Institute, Primary Care Alliance

3. **Dual Audience Value Props** (white bg)
   - Eyebrow: `BUILT FOR PHYSICIANS. REQUESTED BY PATIENTS.`
   - Headline: `Two audiences. One platform. One shared goal.`
   - "For Physicians" card (navy bg): "The AI co-pilot that works as hard as you do." + 3 bullets + "Request a Demo" button
   - "For Patients" card (cream bg): "Know what's happening on your skin before it becomes a problem." + 3 bullets + "Ask Your Doctor About skinmap" button

4. **How It Works** (cream bg)
   - Eyebrow: `HOW IT WORKS`
   - Headline: `From Capture to Clinical Insight in Seconds`
   - 3 steps with coral step numbers + connecting line on desktop:
     - 01 Photograph: "Capture a high-res lesion image with iPhone in under 10 seconds. No extra hardware."
     - 02 Analyze: "Instant AI risk classification. Validated on 50,000+ clinical images. Results in the room."
     - 03 Track: "Every scan builds a longitudinal record. Side-by-side comparison at every future visit."

5. **Key Features** (white bg)
   - Eyebrow: `PLATFORM FEATURES`
   - Headline: `Everything a dermatology practice needs. In one iPhone app.`
   - 2×2 feature card grid:
     - Longitudinal Skin Tracking
     - AI-Powered Risk Stratification (90% sensitivity, 90% specificity, under 3 seconds)
     - Patient Management Dashboard
     - HIPAA-Compliant by Design (AES-256)
   - Secondary CTA: "See the Full Technology" → `/product`

6. **Clinical Evidence** (navy bg)
   - Eyebrow: `CLINICAL VALIDATION` (coral)
   - Headline: `The Data Behind Every Diagnosis` (white)
   - 3 stat cards: 90% Sensitivity · 90% Specificity · 50,000+ Clinical Images Validated
   - Study callout box: IRB-Approved Validation Study badge + "Peer Review Pending" badge + study description
   - CTA: "Request Clinical Study Data" → `/contact?type=demo`

7. **Testimonials** (cream bg)
   - Eyebrow: `PHYSICIAN TESTIMONIALS`
   - Headline: `What Physicians Are Saying`
   - 3 cards (Dr. Sarah Chen, MD — Dermatologist; Dr. Marcus Williams, MD — Family Medicine; Jennifer M. — patient)

8. **Patient Empowerment Banner** (bg-gradient-coral)
   - "You deserve to know what's on your skin."
   - "Ask your doctor about skinmap at your next appointment."
   - CTA: "Ask Your Doctor" (secondary/navy button)

9. **Final Physician CTA** (white bg)
   - Headline: `Ready to bring AI to your practice?`
   - "Request a Demo" (primary) + "Explore the Technology" (outline) → `/product`

---

## PAGE 2: PRODUCT / TECHNOLOGY (`/product`)

**Goal**: Give physicians and technical evaluators depth on the AI.

### Sections:
1. **Hero** (navy gradient) — "THE SCIENCE BEHIND skinmap" eyebrow; headline: "Clinical-Grade AI, Built for the Real World of Dermatology"; subheadline about 50,000 images, IRB-approved, 3 seconds
2. **AI Engine** (white) — Deep CNN architecture, 50k+ annotated clinical images, diverse skin tones, transparent risk scoring with morphological indicators
3. **App Feature Walkthrough** (alternating white/cream per feature, phone mockup left/right):
   - Instant Lesion Analysis (under 3 seconds, morphological features: symmetry/border/color/diameter)
   - Side-by-Side Longitudinal Comparison
   - Complete Patient Record Management
   - One-Tap Clinical Reports (shareable to specialists/EHR)
4. **Clinical Workflow** (cream) — 3-step: Capture at Point of Care → Instant AI Assessment → Automatic Longitudinal Record
5. **Accuracy & Validation** (navy) — stat cards + matched vs. board-certified dermatologist comparison
6. **Data Privacy & Compliance** (white) — HIPAA, AES-256, BAAs available, no PHI monetization; badge row: HIPAA · IRB · FDA Pathway
7. **CTA** — "See skinmap's diagnostic accuracy in a live clinical demo." → "Request a Clinical Demo"

---

## PAGE 3: ABOUT / TEAM (`/about`)

**Goal**: Build founder credibility and mission connection.

### Sections:
1. **Mission Hero** (navy) — "No Skin Cancer Should Go Undetected." + founding premise
2. **The Problem** (white) — "Skin Cancer Is the Most Common Cancer in the U.S." — 5M cases/yr, Stage I 98% survival vs Stage IV <30%
3. **Our Story** (cream) — "We've Seen the Consequences of Catching It Too Late." — founding observation, solution
4. **Leadership Team** (white) — photo placeholder cards, name, title, 2-line bio, LinkedIn
5. **Scientific Advisors** (cream) — compact 2-line card grid (name, credential, institution)
6. **Company Values** (white) — 4 cards with coral icons: Precision · Trust · Simplicity · Impact
7. **CTA** (navy) — "View Open Roles" + "Get in Touch"

---

## PAGE 4: INVESTORS / PARTNERS (`/investors`)

**Goal**: Attract institutional investors and clinical partners.

### Sections:
1. **Hero** (navy gradient) — "INVESTMENT OPPORTUNITY" eyebrow; "The $20 Billion Dermatology Gap Has a Solution."; market stats subheadline
2. **Market Opportunity** (white) — TAM $20B+ growing 8.4%/yr; 200,000+ addressable U.S. physicians; 300% skin cancer incidence increase in 30 years
3. **Investment Thesis** (cream) — 4 cards: Why Skin Cancer? / Why AI Now? / Why skinmap? / Why This Team?
4. **Clinical Partners** (white) — placeholder logo grid for hospital/university partners
5. **Traction / Milestones** (navy) — [X] physicians · [X,000]+ patient scans · IRB study completed · FDA De Novo pathway active
6. **Inquiry CTA** — "We'd Like to Tell You the Whole Story." → "Request an Investor Briefing" → `/contact?type=investor`

---

## PAGE 5: NEWS / PRESS (`/news`)

**Goal**: Establish media presence and credibility.

### Sections:
1. **Hero** (compact navy) — "skinmap in the News" + "Press coverage, company announcements, and clinical milestones."
2. **Press Releases** (white) — 3-column card grid:
   - Jan 14, 2026: "skinmap Completes IRB-Approved Clinical Validation Study Demonstrating 90% Sensitivity and Specificity"
   - Oct 3, 2025: "skinmap Raises Seed Funding to Expand Physician Access to AI-Powered Dermatology Diagnostics"
   - Jul 22, 2025: "skinmap Launches Early Access Program for Dermatologists and Primary Care Physicians"
3. **Media Coverage** (cream) — publication logo row + headline links (placeholder)
4. **Press Kit CTA** — "Download Press Kit" + press@skinmap.com

---

## PAGE 6: CONTACT (`/contact`)

**Goal**: Route inquiries to the right person in under 10 seconds.

### Sections:
1. **Hero** (compact navy) — "Let's Talk About What skinmap Can Do for Your Practice."
2. **Segmented Form** (white) — 5-tab selector:
   - Tab 0 `demo`: Physician Demo — "See skinmap in a 30-minute live demo built around your patient workflow." Fields: Name, Specialty, Practice/Hospital, Email, Phone, Patient Volume, Message
   - Tab 1 `partner`/`clinical`: Clinical Partnership — "Integrate skinmap into your health system." Fields: Organization, Role, Email, Partnership Type, Message
   - Tab 2 `investor`: Investment Inquiry — "Connect with the founding team for a full investor briefing." Fields: Name, Fund/Firm, Email, Investment Stage Interest, Message
   - Tab 3 `patient`/`general`: Patient / General — "Ask us anything — or help us bring skinmap to your doctor." Fields: Name, Email, Physician Name (optional), Message
   - Tab 4 `press`: Press — "Media inquiries, interview requests, and press kit access." Fields: Name, Publication, Email, Deadline, Message
   - URL param `?type=X` auto-selects the tab
   - Success state: "You're in. We'll be in touch shortly." + links to product + clinical data
3. Implementation: React Hook Form + Zod validation; `text-base` on all inputs

---

## PAGE 7: FOR PATIENTS (`/for-patients`)

**Goal**: Empower patients to find skinmap physicians and ask their doctor.

### Sections:
1. **Hero** (navy gradient) — patient-facing messaging; dual CTA: "Find a Physician" + "Ask Your Doctor"
2. **Provider Map** (full-height split layout) — left: filterable list panel (specialty filter, city search, scrollable list); right: MapLibre GL map with specialty dot markers; `lg:h-[calc(100vh-64px)]`; list panel `flex-1 overflow-y-auto`
3. **Patient FAQ** (cream) — accordion with common questions: "What is skinmap?", "Does my insurance cover it?", "How do I ask my doctor?", "What happens at my appointment?"
4. **Patient Empowerment CTA** (gradient-coral) — "Your skin health deserves more than a visual check." + "Ask Your Doctor"

---

## PAGE 8: 404 NOT FOUND (`/not-found.tsx`)

Custom branded 404 — navy gradient bg, skinmap logo, "Page Not Found", friendly copy, two CTAs: "Go Home" + "Contact Us".

---

## LEGAL PAGES (HIGH PRIORITY — must exist before launch)

Create skeleton pages at:
- `/legal/privacy` — Privacy Policy
- `/legal/terms` — Terms of Service
- `/legal/hipaa` — HIPAA Notice of Privacy Practices
- `/legal/cookies` — Cookie Policy

These can be placeholder content with the correct structure and links — but the routes must exist and the footer must link to them.

---

## KEY CLINICAL COPY (use verbatim throughout)

**Primary headline options:**
- `Every Mole. Every Patient. Every Visit.` ← PRIMARY
- `The AI Co-Pilot for Dermatology`
- `Skin Cancer Caught Earlier. Lives Saved.`
- `Clinical-Grade AI in Your Pocket`
- `See What the Eye Might Miss`

**Subheadline:**
> skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking every lesion, comparing visit-over-visit, and flagging suspicious changes before they become dangerous.

**Trust signals (include throughout):**
- HIPAA Compliant
- FDA De Novo Pathway
- IRB-Approved Validation Study
- Validated on 50,000+ clinical images
- 90% sensitivity / 90% specificity (internal testing)
- Peer-reviewed (pending)

**Clinical data (stat cards, always use these numbers):**
- Sensitivity: **90%** — "Validated in internal testing across 50,000+ annotated clinical images."
- Specificity: **90%** — "Confirmed in IRB-approved studies across multiple clinical sites."
- Dataset: **50,000+** — "Diverse dataset spanning skin types, lesion morphologies, and clinical settings."

**FDA language**: Say "On the FDA De Novo Pathway" (not "FDA cleared" or "FDA approved"). Update to "FDA De Novo Cleared" + clearance number once obtained.

---

## COMPETITIVE POSITIONING

skinmap is physician-first. The direct consumer competitor is SkinCheck.health (200k downloads, 5-star, patient self-scan). Differentiate sharply:

| Dimension | SkinCheck (them) | skinmap (us) |
|---|---|---|
| Audience | Consumer/patient | **Physician-first** |
| Distribution | App Store direct | **Physician-mediated, B2B** |
| Workflow | Patient self-scan | **Physician-captured, clinical** |
| Tracking | Spot check | **Longitudinal, visit-over-visit** |
| Compliance | Implied | **HIPAA explicit + FDA pathway** |
| Validation | Social proof (downloads) | **Clinical study data (IRB)** |

The phrase **"clinical-grade"** must appear on every page. skinmap is a clinical instrument, not a consumer app.

---

## DESIGN INSPIRATION (reference patterns)

| Site | What to borrow |
|---|---|
| **Vista AI** (vista.ai) | Dark hero with ambient brand-color glows; bold clinical metrics; physician partner logos |
| **Sword Health** (swordhealth.com) | Evidence-based metric stat cards; warm cream alternating backgrounds; HIPAA/FDA/SOC2 badge row |
| **Neurode Labs** (neurodelabs.com) | Transparent glass-morphism nav → solid on scroll; app feature carousel |
| **Synchron** (synchron.com) | Deep-tech medical credibility; trust-through-restraint aesthetic |
| **Mainstay Medical** (mainstaymedical.com) | "First & only" positioning; VAS clinical trial stat display |
| **Biobeat** (bio-beat.com) | FDA clearance numbers as hero trust signals; clinical workflow diagrams |
| **Owlet** (owletcare.com) | FDA clearance as #1 differentiator in headline |

**Patterns to AVOID:**
- Fullpage.js scroll-snap (hijacks UX, kills SEO)
- All-black/dark theme throughout (cold for dermatology/skin)
- Serif headings (signals consumer wellness, not clinical authority)

---

## REMAINING WORK (priority order)

| Item | Priority | Notes |
|---|---|---|
| Real iPhone app screenshots/mockups | HIGH | Current placeholders are CSS-drawn UI; replace with Gemini Imagen: "A dermatologist holding an iPhone showing a dark-themed medical app with a skin scan, AI risk score overlay, and side-by-side lesion comparison. Clinical office, warm light." Save to `public/images/` |
| Legal pages: `/legal/privacy`, `/legal/terms`, `/legal/hipaa`, `/legal/cookies` | HIGH | Required before launch; footer links to them |
| Real provider data in `src/data/providers.ts` | HIGH | For-patients map shows placeholder data |
| FDA compliance review (`/08-fda-compliance`) | CRITICAL PRE-LAUNCH | Run before any public launch to audit all medical claims |
| How-it-works diagram (Napkin AI export) | MEDIUM | Go to napkin.ai, paste 3-step flow, export PNG → `public/images/how-it-works.png` |
| Press release "Read More" links | MEDIUM | Currently `href="#"` |
| Real testimonial names | MEDIUM | Current quotes are illustrative — replace before launch |
| Investor traction `[X]` placeholders | MEDIUM | Replace with real numbers before investor page goes live |
| Careers tab on Contact | LOW | "View Open Roles" links currently go to tab 3; add dedicated careers tab |

---

## AGENT WORKFLOW (slash commands)

The project uses 8 slash commands in `.claude/commands/`:

| Command | Purpose |
|---|---|
| `/01-research` | Fetch & analyze reference sites → `research-brief.md` |
| `/02-copy` | Analyze reference sites for copy → `copy-brief.md` |
| `/03-design-system` | Build Tailwind config + UI component library |
| `/04-build-page [page]` | Build a complete page using copy-brief + design system |
| `/05-review [target]` | Review code for quality, brand, copy, accessibility |
| `/06-ui-design [page]` | Audit + improve visual design: hierarchy, spacing, color, motion |
| `/07-ux-flow [page]` | Audit user flows, CTAs, scroll behavior, dual physician/patient journey |
| `/08-fda-compliance [target]` | Review all copy for FDA SaMD language; flag prohibited claims |

---

## NON-NEGOTIABLE RULES FOR ALL AGENTS

1. `skinmap` is always lowercase. Always.
2. No lorem ipsum — all copy is real skinmap messaging from the copy brief
3. No hardcoded hex values — always use Tailwind tokens from `tailwind.config.ts`
4. Mobile-first — every component must work at 375px before scaling up
5. TypeScript strictly — no `any` types; define proper interfaces
6. WCAG AA minimum — semantic HTML, ARIA labels, focus states
7. `next/image` for all images — lazy-load below the fold
8. Framer Motion `whileInView` FadeUp on every section — with `useReducedMotion()` check
9. "Request a Demo" lives in the navbar CTA at all times — never remove it
10. "clinical-grade" appears on every page — it is skinmap's most important modifier

---

## METADATA (SEO)

```tsx
// Default (in layout.tsx):
title: 'skinmap — AI-Powered Dermatology Diagnostics'
description: 'skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking patient skin health over time and flagging suspicious lesions before they become dangerous.'
keywords: ['dermatology AI', 'skin cancer detection', 'physician app', 'skin health tracking', 'clinical AI diagnostics', 'HIPAA compliant dermatology']

// Per-page template: '%s | skinmap'
// Home: 'skinmap — Clinical-Grade AI for Dermatology'
// Product: 'Technology | skinmap'
// About: 'About | skinmap'
// Investors: 'Investors & Partners | skinmap'
// News: 'News & Press | skinmap'
// Contact: 'Contact | skinmap'
// For Patients: 'For Patients | skinmap'
```

---

_This prompt is self-contained. Any AI agent or developer reading it has everything they need to build the full skinmap v2 website to production quality._
