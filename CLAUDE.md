# skinmap — Project Context for AI Agents

> **Brand name**: always written lowercase — **skinmap** (never "SkinMap" or "SKINMAP")

## Company Overview
**skinmap** is an AI-powered dermatology diagnostics company building an iPhone app that enables
physicians to track their patients' skin health over time and identify potential skin cancer using
AI diagnostics. skinmap puts clinical-grade AI directly in the physician's pocket.

## Product
- **Platform**: iPhone app (iOS-first)
- **Primary users**: Dermatologists, primary care physicians, family medicine doctors
- **Core capabilities**:
  1. Longitudinal patient skin health tracking (comparing lesions visit-over-visit)
  2. AI-powered skin cancer identification and risk stratification
  3. Physician-facing patient management dashboard
  4. Clinical-grade image capture, annotation, and analysis
  5. Secure, HIPAA-compliant patient records

## Target Audience
| Audience | Role | Website Goal |
|---|---|---|
| **Primary — Physicians** | Dermatologists, PCPs, family medicine, oncologists | Convert to demo requests; drive clinical adoption |
| **Primary — Patients** | Health-conscious adults, cancer-concerned individuals | Empower them to ask their doctor about skinmap; drive bottom-up demand |
| **Secondary** | Hospital systems, investors, clinical partners | Build institutional credibility |
| **Tertiary** | Press, medical associations, FDA/regulatory bodies | Establish authority and media presence |

### Dual Audience Strategy
The website must speak to **both physicians and patients simultaneously**. Patients are a
key growth driver — by empowering them to ask their doctors about skinmap, we create
bottom-up adoption pressure. Every page should offer a path for both groups:

- **Physician path**: "Request a Demo" → demo form
- **Patient path**: "Ask Your Doctor About skinmap" → patient inquiry / find-a-physician

Key patient messaging:
- "You deserve to know what's on your skin."
- "Ask your doctor about skinmap at your next appointment."
- "Don't wait for symptoms. Track your skin health over time."
- "skinmap gives your doctor the AI tools to catch skin cancer earlier."

## Brand Values
- **Precision** — Clinical-grade AI with measurable accuracy metrics
- **Trust** — Evidence-based, on the FDA pathway, peer-reviewed
- **Simplicity** — Fits into existing physician workflows; takes seconds per patient
- **Impact** — Earlier detection = lives saved

---

## Design Direction

### Aesthetic
Clean, light-dominant design with a professional medical authority feel. Warm skin-tone accent
color makes skinmap visually distinctive in the medical AI space. Think: the credibility of
a medical journal combined with the elegance of a consumer health app.

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `navy` | `#0F1B35` | Primary brand, nav background, headings |
| `coral` | `#E87B5A` | Primary CTA buttons, accent highlights, key callouts |
| `blue` | `#4A89E8` | Secondary accent, links, badges |
| `cream` | `#F8F6F3` | Section backgrounds (alternating) |
| `white` | `#FFFFFF` | Primary backgrounds |
| `gray-900` | `#1A1A2E` | Primary body text |
| `gray-500` | `#6B7280` | Secondary/supporting text |
| `gray-100` | `#F3F4F6` | Dividers, subtle backgrounds |

### Typography
- **Font**: Inter (Google Fonts) — clean, legible, medical authority
- **Headline**: 700–800 weight, tight tracking, large scale
- **Body**: 400–500 weight, 1.6 line-height, comfortable reading
- **Accent labels**: 600 weight, uppercase tracking for badges/eyebrows

### Imagery Direction
- iPhone app mockups (floating, angled, with real UI screens)
- Clinical skin scan visualizations with AI overlay annotations
- Physician-patient scenarios (authentic, not stock-photo generic)
- Abstract gradient backgrounds for feature sections
- Partner/institution logos (hospitals, med schools, investors)

### Tone & Voice
- **Authoritative but approachable** — a brilliant physician colleague, not a corporate brochure
- **Evidence-first** — back every claim with data: "90% sensitivity and 90% specificity in internal testing", "validated on          50k images"
- **Human impact** — center the story on patients and doctors, not just technology

---

## Reference Websites (Design Inspiration)

Analyze these sites for design patterns when building skinmap:

| Site | What to borrow |
|---|---|
| [Sword Health](https://swordhealth.com/) | Evidence-based metrics, warm off-white backgrounds, trust signals |
| [Vista AI](https://vista.ai/) | Dark nav, bold metrics, professional medical AI credibility |
| [FluidAI](https://fluidai.md/) | Gradient accents on dark backgrounds, card designs |
| [Synchron](https://synchron.com/) | Deep-tech medical credibility, sophisticated layout |
| [Inspire MD](https://inspiremd.com/) | Medical device trust signals, investor sections |
| [Owlet Care](https://owletcare.com/) | Mobile app marketing, consumer health feel |
| [Neuro Delta Labs](https://www.neurodelabs.com/) | Clean neuroscience/medical AI aesthetic |
| [A2Z Radiology AI](https://a2zradiology.ai/) | AI diagnostics messaging patterns |

---

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, TypeScript) |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Fonts | Inter via `next/font/google` |
| Images | `next/image` with proper optimization |
| Forms | React Hook Form + Zod validation |
| Deployment | Vercel |

---

## Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout (Navbar + Footer)
│   ├── page.tsx                # Home page
│   ├── product/page.tsx        # Product / Technology page
│   ├── about/page.tsx          # About / Team page
│   ├── investors/page.tsx      # Investors / Partners page
│   ├── news/page.tsx           # News / Press page
│   └── contact/page.tsx        # Contact page
├── components/
│   ├── ui/                     # Reusable UI primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   └── Card.tsx
│   ├── sections/               # Page-level section components
│   └── layout/                 # Navbar, Footer
│       ├── Navbar.tsx
│       └── Footer.tsx
├── lib/
│   └── utils.ts                # Utility functions (cn, etc.)
└── styles/
    └── globals.css
```

---

## Pages to Build

### 1. Home (`/`)
**Goal**: Convert physician visitors to demo requests.
**Sections**:
- Hero — bold headline + app mockup + dual CTA
- Social proof — partner hospital / institutional logos
- How it works — 3-step visual flow
- Key features — 4-card grid (Track, Detect, Manage, Share)
- Clinical evidence — accuracy metrics, validation study callout
- Testimonials — 2–3 physician quotes
- Final CTA banner

### 2. Product / Technology (`/product`)
**Goal**: Give physicians and technical evaluators depth on the AI.
**Sections**:
- Hero — "The Science Behind skinmap"
- AI engine overview — how the model works, training data
- Feature deep-dive — app walkthrough with screenshots
- Clinical workflow — step-by-step integration into practice
- Accuracy & validation — stats, study results, comparisons
- Data privacy & compliance — HIPAA, data handling
- CTA — Request a demo / access clinical data

### 3. About / Team (`/about`)
**Goal**: Build founder credibility and mission connection.
**Sections**:
- Mission statement — "We believe no skin cancer should go undetected"
- Company story — founding moment, problem we saw
- Leadership team cards — photo, name, title, short bio
- Clinical & scientific advisors
- Company values
- CTA — Join us / Contact

### 4. Investors / Partners (`/investors`)
**Goal**: Attract institutional investors and clinical partners.
**Sections**:
- Hero — market opportunity framing
- Investment thesis — why skin cancer, why now, why AI
- Market size — $X billion TAM/SAM/SOM
- Current partners — clinical sites, hospitals, med schools
- Funding stage — (Series A / Seed — TBD based on actual stage)
- Investor inquiry CTA

### 5. News (`/news`)
**Goal**: Establish media presence and credibility.
**Sections**:
- Hero
- Press releases grid
- Media coverage / mentions
- Awards & recognition
- Press kit download

### 6. Contact (`/contact`)
**Goal**: Route inquiries appropriately.
**Sections**:
- Segmented contact form (Physician demo / Partnership / Press / General)
- Office/team location
- Social links

---

## Key Messaging

### Headlines (choose per page)
- "Every Mole. Every Patient. Every Visit."
- "The AI Co-Pilot for Dermatology"
- "Skin Cancer Caught Earlier. Lives Saved."
- "Clinical-Grade AI in Your Pocket"
- "See What the Eye Might Miss"

### Subheadline
> skinmap gives physicians an AI co-pilot for dermatology — tracking patient skin health over
> time and flagging suspicious lesions before they become dangerous.

### Primary CTA
- **"Request a Demo"** (physician-facing)
- **"Get Early Access"** (waitlist)
- **"Contact Our Team"** (general)

### Trust Signals to Include
- FDA De Novo pathway (if applicable — placeholder if TBD)
- HIPAA compliant
- Validated on X,000+ clinical images
- X% sensitivity / Y% specificity
- IRB-approved clinical studies
- Partner institution logos

---

## Agent Workflow

This project uses a 5-agent workflow (slash commands in `.claude/commands/`):

| Command | Agent | Purpose | Output |
|---|---|---|---|
| `/01-research` | Research Agent | Fetches & analyzes all reference sites for design patterns | `research-brief.md` |
| `/02-copy` | Copy Agent | Analyzes reference sites for copy patterns; writes all page copy | `copy-brief.md` |
| `/03-design-system` | Design System Agent | Builds Tailwind config + full UI component library | `src/components/` |
| `/04-build-page [page]` | Page Builder Agent | Builds a complete page using copy-brief + design system | `src/app/[page]/` |
| `/05-review [target]` | Review Agent | Reviews code for quality, brand, copy, and accessibility | review report |
| `/06-ui-design [page]` | UI Design Agent | Audits and improves visual design — hierarchy, spacing, color, typography, motion | in-place code edits + design report |
| `/07-ux-flow [page]` | UX Flow Agent | Audits user flows, scroll behavior, CTAs, dual physician/patient journey | in-place code edits + UX audit report |
| `/08-fda-compliance [target]` | FDA Compliance Agent | Reviews all copy for FDA SaMD language — flags prohibited claims, rewrites for compliance | compliance report (edits require user confirmation) |

**Recommended workflow order:**
1. Run `/01-research` → generates `research-brief.md` (design patterns)
2. Run `/02-copy` → generates `copy-brief.md` (all page copy, headlines, CTAs, stats)
3. Run `/03-design-system` → scaffolds all components and Tailwind config
4. Run `/04-build-page home` → then product → about → investors → news → contact
5. Run `/05-review` on each page after building
6. Run `/06-ui-design` to polish visual design
7. Run `/07-ux-flow` to audit conversion paths and fix UX friction
8. Run `/08-fda-compliance` before any public launch to review all medical claims

> **Note:** Steps 1 and 2 can be run in either order or in parallel — they are independent.
> The page builder (`/04-build-page`) depends on both `copy-brief.md` and the design system.
> Steps 6–8 can be run after any page build, in any order.

---

## Important Rules for All Agents

1. **No lorem ipsum** — all copy must be real skinmap messaging from this file
2. **No hardcoded hex values** — always use Tailwind tokens from `tailwind.config.ts`
3. **Mobile-first** — every component must work at 375px before scaling up
4. **TypeScript strictly** — no `any` types; define proper interfaces
5. **Accessible** — WCAG AA minimum; semantic HTML; ARIA labels where needed
6. **Performance** — use `next/image` for all images; lazy-load below the fold
7. **Framer Motion** — add scroll-triggered entrance animations to sections
8. **Trust signals** — include clinical validation data whenever possible
