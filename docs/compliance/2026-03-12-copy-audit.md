# skinmap Copy Audit Report
**Date:** 2026-03-12
**Auditor:** Copy Review Agent (`/05-review`)
**Scope:** All pages vs `copy-brief.md` and `CLAUDE.md`

---

## Summary Score Table

| Category | Home | Product | About | Investors | News | Contact | For Patients | **Overall** |
|---|---|---|---|---|---|---|---|---|
| Copy Drift (vs CLAUDE.md) | 6 | 5 | 8 | 9 | 8 | 9 | 8 | **7.6** |
| Physician Voice | 7 | 7 | 8 | 8 | 7 | 8 | N/A | **7.5** |
| Patient Voice | 7 | 5 | 8 | 6 | 5 | 7 | 9 | **6.8** |
| Unsubstantiated Claims | 4 | 4 | 7 | 6 | 7 | 9 | 7 | **6.3** |
| Trust Signals Present | 6 | 7 | 7 | 8 | 8 | 8 | 7 | **7.3** |
| CTA Consistency | 7 | 5 | 8 | 9 | 7 | 9 | 8 | **7.6** |
| FDA Compliance | 4 | 3 | 7 | 6 | 6 | 9 | 5 | **5.7** |

---

## Critical Issues — Launch Blockers

### CRITICAL-01: "AI-Backed Detection" — prohibited superiority/diagnostic claim
**Location:** `ProductPageClient.tsx`, Technology section
**Original:** "Our cutting-edge, AI-backed technology empowers users to detect subtle changes the naked eye can't."
**Fix:** "skinmap's AI model compares visit-over-visit scans to flag lesions that have changed in size, color, or morphology — giving physicians an objective, documented basis for clinical decision-making."

### CRITICAL-02: Home hero headline off-brief — missing "clinical-grade"
**Location:** `page.tsx`, hero
**Original:** "See What Changed. / Catch It Early."
**Approved:** "Every Mole. Every Patient. Every Visit." (copy-brief.md PRIMARY)

### CRITICAL-03: Home hero subheadline replaces clinical positioning with logistics
**Location:** `page.tsx`, hero paragraph
**Original:** "Full-body skin scans in ~90 seconds. iPhone only. No extra room..."
**Approved (copy-brief.md):** "skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking every lesion, comparing visit-over-visit, and flagging suspicious changes before they become dangerous."

### CRITICAL-04: 80% vs 90% opt-in stat inconsistency on same page
**Location:** `page.tsx` — practiceStats array shows 80%, appFeatures prose says "Over 90%"
**Fix:** Reconcile to one sourced number and apply consistently across all pages.

### CRITICAL-05: Product page CTA reads "Request Information" not "Request a Demo"
**Location:** `ProductPageClient.tsx`, hero + final CTA
**Fix:** Replace all instances with "Request a Demo"

---

## High Priority Issues

### HIGH-01: Testimonials use "Verified Patient" label without verification mechanism
- "Verified" implies third-party validation — remove label or implement real verification
- Quote 1 is anonymized ("Board-Certified Dermatologist") instead of named as in brief (Dr. Sarah Chen, MD)

### HIGH-02: Product page missing entire clinical validation section
- No 90%/90% sensitivity/specificity anywhere on product page
- No 50,000+ image dataset mention
- No IRB study callout
- Product page hero uses "Full-body skin scans. 60 seconds." not "The Science Behind skinmap"

### HIGH-03: "skinmap tracks it forever" — liability language
**Location:** `ForPatientsPageClient.tsx`
**Fix:** "skinmap builds a complete photo record across every visit — so nothing is forgotten between them."

### HIGH-04: "AI analysis flags subtle changes the human eye can miss" — pre-clearance prohibited claim
**Location:** copy-brief.md patient column
**Status:** Not yet live but must be flagged before next page build

### HIGH-05: Investor milestone copy has unfilled number placeholders visible on live site
**Location:** `InvestorsPageClient.tsx`, milestones array
**Fix:** Fill with real numbers or remove milestone section until numbers are available

### HIGH-06: "clinical-grade" modifier absent from entire home hero section
**Location:** `page.tsx`, hero
copy-brief.md Copy Principle #3: "clinical-grade" must appear on every page

---

## Medium Priority Issues

### MED-01: How It Works — "Analyze" step (where AI story lives) is missing
- Live steps: Capture → Compare → Manage → Reimburse
- copy-brief.md steps: Photograph → **Analyze** (AI validation) → Track
- Removing Analyze removes the only place clinical AI credentials appear in the flow

### MED-02: About page values soften clinical validation framing
- "Precision" value removes "sensitivity and specificity" language from brief version

### MED-03: Contact page hero is physician-only — no patient path
- "Let's Talk About What skinmap Can Do for Your Practice" excludes patients

### MED-04: News page — "90% sensitivity" presented as fact not pre-publication
- "Submitted for peer review" means not yet peer-reviewed
- Should be qualified as "internal testing" or "pre-publication results"

### MED-05: Product page "cutting-edge" is prohibited superlative
- copy-brief.md: AI model should be described via architecture/validation, not marketing superlatives

### MED-06: For Patients final CTA uses "Contact Our Patient Team" not canonical phrase
- Canonical: "Ask Your Doctor About skinmap"

### MED-07: Investor competitive landscape makes blanket market claims
- "No HIPAA-compliant image storage" may not be true of all competitors

---

## Top 5 Weakest Copy Lines — Rewrites

| # | Page | Original | Improved |
|---|---|---|---|
| 1 | Home hero sub | "Full-body skin scans in ~90 seconds. iPhone only. No extra room, no expensive hardware, no specialist. Any member of your team can do it." | "skinmap gives physicians a clinical-grade AI co-pilot for dermatology — capturing a complete skin record in about 90 seconds, comparing visit-over-visit, and flagging suspicious changes before they become dangerous. iPhone only. Medicare reimbursed." |
| 2 | Product tech card | "Our cutting-edge, AI-backed technology empowers users to detect subtle changes the naked eye can't." | "skinmap's AI model compares visit-over-visit scans to flag lesions that have changed in size, color, or morphology — giving physicians an objective, documented basis for clinical decision-making." |
| 3 | For Patients | "Your doctor sees your skin for 5 minutes. skinmap tracks it forever." | "Your doctor sees your skin for 5 minutes at one visit. skinmap builds a complete photo record across every appointment — so nothing slips between them." |
| 4 | Home testimonial | "Knowing my dermatologist is using skinmap makes me feel like nothing will slip through the cracks." — Verified Patient | "Knowing my dermatologist has a complete photo record of my skin — year over year — gives me real peace of mind." — Patient, Dermatology Practice |
| 5 | Home patient banner | "History of melanoma or dysplastic nevi? You may be covered. Ask your doctor about skinmap at your next appointment." | "You deserve to know what's on your skin. Ask your doctor about skinmap at your next appointment — early detection starts with a single conversation. If you have a history of melanoma or dysplastic nevi, you may be covered by Medicare." |

---

## Recommended Fix Order

1. Fix 80%/90% opt-in stat inconsistency
2. Replace home hero headline with copy-brief primary
3. Replace home hero subheadline with copy-brief primary (includes "clinical-grade")
4. Change Product CTA: "Request Information" → "Request a Demo"
5. Add clinical validation section to Product page
6. Rewrite "detect subtle changes the naked eye can't"
7. Fix "skinmap tracks it forever"
8. Add IRB qualifier to all sensitivity/specificity stat mentions
9. Fill or suppress Investors milestone placeholders
10. Remove "Verified Patient" label from testimonials
