# skinmap — Design & Product Brief
> Living document. Last updated: 2026-02-26. Use as the single source of truth for all future design, copy, and engineering decisions.

---

## 1. Company & Product

**skinmap** — always lowercase, never "SkinMap" or "SKINMAP"

An AI-powered dermatology diagnostics company building an iPhone app that lets physicians:
- Track patient skin health longitudinally (visit-over-visit lesion comparison)
- Identify potential skin cancer using clinical-grade AI
- Manage a full patient panel from a single dashboard
- Capture, annotate, and analyze clinical-grade images — HIPAA-compliant

**Platform**: iPhone (iOS-first). No extra hardware required.

---

## 2. Target Audiences (Dual Audience Strategy)

| Audience | Goal on Website |
|---|---|
| **Physicians** — Dermatologists, PCPs, Family Medicine, Oncologists | Convert to demo request |
| **Patients** — Health-conscious adults, cancer-concerned individuals | Empower them to ask their doctor about skinmap |
| Hospital systems / Investors | Institutional credibility |
| Press / FDA / Medical associations | Authority & media presence |

**Patient path CTA**: "Ask Your Doctor About skinmap" → `/contact?type=patient`
**Physician path CTA**: "Request a Demo" → `/contact?type=demo`

---

## 3. Brand Voice & Tone

- **Authoritative but approachable** — brilliant physician colleague, not a corporate brochure
- **Evidence-first** — every claim backed by data: "90% sensitivity and 90% specificity in internal testing", "validated on 50,000+ images"
- **Human impact** — center patients and doctors, not technology
- No lorem ipsum, ever — all copy is real skinmap messaging

### Key Headlines
- "Every Mole. Every Patient. Every Visit."
- "The AI Co-Pilot for Dermatology"
- "Skin Cancer Caught Earlier. Lives Saved."
- "Clinical-Grade AI in Your Pocket"
- "See What the Eye Might Miss"

### Key Patient Messaging
- "You deserve to know what's on your skin."
- "Ask your doctor about skinmap at your next appointment."
- "Don't wait for symptoms. Track your skin health over time."
- "skinmap gives your doctor the AI tools to catch skin cancer earlier."

### Trust Signals (always include where relevant)
- HIPAA Compliant
- FDA De Novo pathway
- IRB-Approved Validation Study
- Validated on 50,000+ clinical images
- 90% sensitivity / 90% specificity
- Peer-reviewed (pending)

---

## 4. Color Palette (Current — v2)

### User's 5 Brand Colors
| Color | Hex | RGB |
|---|---|---|
| Primary Blue | `#271881` | rgb(39, 24, 129) |
| Primary Green | `#00CA5A` | rgb(0, 202, 90) |
| Teal | `#0097A0` | rgb(0, 151, 160) |
| Sky Blue | `#03C0DE` | rgb(3, 192, 222) |
| Primary Grey | `#E0E0E0` | rgb(224, 224, 224) |

### How They're Applied (Tailwind token mapping)

| Token | Hex | Usage |
|---|---|---|
| `navy` DEFAULT | `#0D0B28` | **Large dark backgrounds, navbar, hero sections** — near-black with brand tint |
| `navy-500` | `#271881` | Pure brand blue — hero gradient midpoint, accent glows, ambient effects |
| `coral` DEFAULT | `#00CA5A` | Primary CTA buttons, accent highlights, eyebrows, key callouts |
| `blue` DEFAULT | `#03C0DE` | Secondary accent, links, badges |
| `teal` DEFAULT | `#0097A0` | Tertiary accent |
| `cream` | `#F2F5FF` | Light section backgrounds (alternating with white) |

### Critical Contrast Lesson (learned during v1 → v2)
`#271881` (brand blue) has lightness ~30% — at large background scale it reads as a jarring vivid purple, not premium dark. **Never use it as a full-section background.** Use `navy` DEFAULT (`#0D0B28`) for large dark areas; use `navy-500` (`#271881`) only as a glow accent or gradient midpoint.

`#00CA5A` (green) and `#03C0DE` (sky blue) both have luminance ~0.44. **White text on these is only 2.1:1 contrast** — fails WCAG AA. Use **dark text** (`text-navy-900`) on these backgrounds.

### Hero Gradient Technique
```
gradient-hero: linear-gradient(160deg, #0D0B28 0%, #271881 45%, #0D0B28 100%)
```
Creates: dark edges → brand blue glows in center → dark. Looks like Vista AI / Synchron. Add ambient blur circles (15–25% opacity) of coral/green and sky blue for depth.

---

## 5. Typography

| Role | Class | Weight |
|---|---|---|
| Font | Inter (Google Fonts via `next/font`) | — |
| Hero headline | `text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight` | 800 |
| Section headline | `text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight` | 700 |
| Body | `text-base md:text-lg leading-relaxed` | 400 |
| Eyebrow | `.eyebrow` = `text-xs font-semibold uppercase tracking-widest` | 600 |
| Metric callout | `text-4xl md:text-5xl font-extrabold` in `text-coral` | 800 |
| Badge | `text-xs font-semibold uppercase rounded-full` | 600 |

---

## 6. Design Principles

1. **Light-dominant** — white and `cream` (`#F2F5FF`) as primary backgrounds; dark sections sparingly
2. **Alternating backgrounds** — never two adjacent sections with same color (white → cream → navy → white)
3. **Section padding** — `py-16 md:py-24 lg:py-32` standard; `py-12 md:py-16 lg:py-20` tight
4. **Card style** — `rounded-2xl` radius, `shadow-card` shadow, consistent padding
5. **Motion** — all sections use `whileInView` FadeUp with `once: true`; respects `useReducedMotion()`
6. **Mobile-first** — 375px minimum; form inputs `text-base` (≥16px) to prevent iOS Safari zoom
7. **No hardcoded hex** — always use Tailwind tokens

---

## 7. Component Architecture

```
src/components/
├── layout/
│   ├── Navbar.tsx        — Fixed, transparent→dark on scroll; skinmap logo icon + text
│   └── Footer.tsx        — Navy bg; 4-col links + legal + social
├── ui/
│   ├── Button.tsx        — variants: primary|secondary|outline|ghost|outline-white
│   ├── Badge.tsx         — variants: new(green)|clinical(blue glass)|partner|press|outline
│   ├── Card.tsx          — variants: default|feature|stat|testimonial
│   ├── Section.tsx       — backgrounds: white|cream|navy|coral; tight prop
│   ├── Container.tsx     — max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
│   └── ProviderMap.tsx   — MapLibre GL + react-map-gl; specialty dot markers
└── (no other shared components)
```

### Button Variants
| Variant | Style | Use |
|---|---|---|
| `primary` | `bg-coral text-white hover:bg-coral-dark` | Main CTAs everywhere |
| `secondary` | `bg-navy text-white` | On green gradient sections |
| `outline` | `border-navy text-navy hover:bg-navy hover:text-white` | Secondary actions on light bg |
| `outline-white` | `border-white text-white hover:bg-white hover:text-navy` | Secondary on dark bg |

### Badge Variants (contrast-safe)
| Variant | Style | Use |
|---|---|---|
| `new` | `bg-coral text-navy-900` | Eyebrow on dark hero, "For Physicians" labels |
| `clinical` | `bg-blue/15 text-blue-700 border border-blue/30` | "For Patients", clinical labels |
| `partner` | `bg-navy text-white` | Institution / partner labels |

---

## 8. Pages Built

| Page | Route | Primary Goal |
|---|---|---|
| Home | `/` | Convert physician visitors to demo requests |
| Product/Technology | `/product` | Depth on AI for technical evaluators |
| About/Team | `/about` | Founder credibility + mission |
| Investors/Partners | `/investors` | Attract institutional investors |
| News/Press | `/news` | Media presence + press kit |
| Contact | `/contact` | Route inquiries; segmented 5-tab form |
| For Patients | `/for-patients` | Provider map + patient FAQ + request form |
| 404 | `not-found.tsx` | Custom branded 404 |

### Contact Page URL Routing
`/contact?type=X` auto-selects the right form tab:
- `demo` → Physician Demo (tab 0)
- `partner` / `clinical` → Clinical Partnership (tab 1)
- `investor` → Investor Inquiry (tab 2)
- `patient` / `general` / `careers` → Patient/General (tab 3)
- `press` → Press (tab 4)

---

## 9. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js App Router, TypeScript | 15.x |
| Styling | Tailwind CSS | v3 |
| Animation | Framer Motion | latest |
| Icons | Lucide React | latest |
| Fonts | Inter via `next/font/google` | — |
| Map | MapLibre GL + react-map-gl | latest |
| Images | `next/image` (optimized) | — |
| Deployment | Vercel (auto-deploy on push) | — |
| Repo | https://github.com/alochemes/new_site | branch: master |

---

## 10. Key UX Rules

- Every above-fold hero has dual CTAs: "Request a Demo" (physician) + "Ask Your Doctor" (patient)
- Provider map: outer container `lg:h-[calc(100vh-64px)]`; list panel `flex-1 overflow-y-auto` for independent scroll
- Navbar: transparent on dark-hero pages, `bg-navy` once scrolled >80px
- Mobile menu: closes on route change; locks body scroll while open
- Scroll indicator (animated vertical line) in home hero

---

## 11. Known Remaining Work

| Item | Priority |
|---|---|
| Real iPhone app screenshots/mockups (Gemini Imagen) | High |
| Legal pages: `/legal/privacy`, `/legal/terms`, `/legal/hipaa`, `/legal/cookies` | High |
| Real provider data in `src/data/providers.ts` | High before launch |
| How-it-works diagram (Napkin AI export) | Medium |
| Press release "Read More" links (currently `href="#"`) | Medium |
| "View Open Roles" → dedicated Careers tab on Contact | Low |
| `/08-fda-compliance` review before any public launch | Critical pre-launch |

---

## 12. Reference Sites (Design Inspiration)

| Site | What to borrow |
|---|---|
| [Vista AI](https://vista.ai/) | Dark hero with ambient brand-color glows, bold metrics |
| [Synchron](https://synchron.com/) | Deep-tech medical credibility, dark near-black backgrounds |
| [Sword Health](https://swordhealth.com/) | Evidence-based metrics, trust signals |
| [FluidAI](https://fluidai.md/) | Gradient accents, card designs |
| [Owlet Care](https://owletcare.com/) | Mobile app marketing feel |
