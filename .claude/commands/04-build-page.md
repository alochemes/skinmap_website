# skinmap Page Builder Agent

You are the skinmap Page Builder Agent. Build a complete, production-ready Next.js page.

## Page to Build
$ARGUMENTS

## Before You Build

1. Read `CLAUDE.md` — brand guidelines, messaging, audience, design direction.
2. Read `copy-brief.md` — the PRIMARY source for all headlines, body copy, CTAs, and stats. Always use copy-brief.md text verbatim; do not invent copy.
3. Read `tailwind.config.ts` — available design tokens.
4. Read existing components in `src/components/` — use them; don't duplicate.
4. Read `research-brief.md` if it exists — apply refined design recommendations.

---

## Page Specifications

### `home` — Home Page (`src/app/page.tsx`)

**Goal**: Convert both physicians AND patients to action (demo request / "ask your doctor").

**Sections** (in order):

1. **Hero**
   - Full-viewport height
   - Left: Headline (e.g. "Every Mole. Every Patient. Every Visit.") + subheadline + 2 CTAs:
     - Primary: "Request a Demo" (coral button → /contact)
     - Secondary: "Ask Your Doctor About skinmap" (outline button → /contact?type=patient)
   - Right: Floating iPhone mockup with app UI (use a placeholder `<div>` styled as a phone frame if no image)
   - Subtle animated gradient background (navy → dark blue)

2. **Social proof bar**
   - "Trusted by leading institutions" + hospital/partner logo row (use placeholder logo boxes)

3. **Dual audience value props**
   - Two-column: "For Physicians" | "For Patients"
   - Each with 3 bullet benefits

4. **How it works** (3 steps)
   - Numbered step cards with icon, title, description
   - Steps: Capture → Analyze → Track

5. **Key features** (4-card grid)
   - Track over time | AI Detection | Physician Dashboard | Secure Records

6. **Clinical evidence**
   - Stat cards: sensitivity %, images validated, study citations
   - "Peer-reviewed and clinically validated" callout

7. **Testimonials**
   - 2–3 physician quotes (placeholder attribution: "Dr. [Name], Dermatologist, [Hospital]")

8. **Patient empowerment CTA**
   - Full-width coral/navy banner
   - "Don't wait for symptoms. Ask your doctor about skinmap today."
   - CTA: "Find a skinmap Physician" (or "Tell My Doctor")

9. **Final physician CTA**
   - "Ready to bring AI to your practice?" + "Request a Demo" button

---

### `product` — Product / Technology (`src/app/product/page.tsx`)

**Sections**:
1. Hero — "The Science Behind skinmap" + brief intro
2. The AI engine — how the CV model works, training dataset size, architecture overview
3. App feature walkthrough — numbered/tabbed with phone screenshots
4. Clinical workflow integration — 3-step physician flow
5. Accuracy & validation — stat cards + study callout
6. Patient-facing benefits sidebar — "What this means for your patients"
7. Data privacy & compliance — HIPAA, SOC 2 badges
8. CTA — "Request a Clinical Demo"

---

### `about` — About / Team (`src/app/about/page.tsx`)

**Sections**:
1. Mission — "We believe no skin cancer should go undetected."
2. The problem we're solving — skin cancer stats, late-detection consequences
3. Our story — founding moment paragraph
4. Leadership team — card grid (photo placeholder, name, title, 2-line bio)
5. Clinical & scientific advisors — simpler list/card layout
6. Company values — 4-value grid with icons
7. CTA — "Join Our Mission" (careers link) + "Contact Us"

---

### `investors` — Investors / Partners (`src/app/investors/page.tsx`)

**Sections**:
1. Hero — "Transforming Dermatology at Scale"
2. Market opportunity — TAM/SAM/SOM breakdown, skin cancer prevalence stats
3. Investment thesis — Why skin cancer? Why AI? Why now? Why skinmap?
4. Clinical partners — logo grid of hospital/university partners
5. Traction — key milestones (placeholder: "X physicians onboarded", "X clinical sites")
6. Investor inquiry form or CTA — "Contact Our Team"

---

### `news` — News (`src/app/news/page.tsx`)

**Sections**:
1. Hero — "skinmap in the News"
2. Press releases — card grid (date, headline, excerpt, "Read More" link)
3. Media coverage — logos of publications + link
4. Awards & recognition — badge/card grid
5. Press kit — download button (placeholder PDF link)
6. Press contact CTA

---

### `contact` — Contact (`src/app/contact/page.tsx`)

**Sections**:
1. Hero — "Get in Touch"
2. Segmented contact form:
   - Radio/tab selector: Physician Demo | Clinical Partnership | Investment Inquiry | Patient / General | Press
   - Fields adapt based on selection (use React Hook Form + Zod)
   - Physician form: Name, Specialty, Practice/Hospital, Email, Phone, Message
   - General form: Name, Email, Subject, Message
3. Contact details — email addresses, office location (placeholder)
4. Social links

---

## Build Quality Standards

- **TypeScript** — proper interfaces for all props and data
- **Responsive** — mobile-first; test mentally at 375px, 768px, 1280px
- **Accessible** — semantic HTML, ARIA labels, alt text, visible focus states
- **No lorem ipsum** — use real skinmap messaging from `CLAUDE.md`
- **No hardcoded hex** — Tailwind tokens only
- **Framer Motion** — `whileInView` entrance animations on sections (respect `prefers-reduced-motion`)
- **next/image** — all `<img>` tags must use Next.js Image component
- **No placeholder text** — use descriptive placeholder content consistent with skinmap brand
- **Brand name** — always lowercase "skinmap" in copy
