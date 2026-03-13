# skinmap FDA SaMD Compliance Report
**Date:** 2026-03-12
**Reviewer:** FDA Compliance Agent (`/08-fda-compliance`)
**Regulatory context:** skinmap is SaMD, likely Class II CADe/CADx, on FDA De Novo pathway. Product is **NOT yet cleared.**
**Reviewer Note:** This review is not legal advice. Confirm findings with regulatory counsel before public launch.

---

## Executive Summary

17 distinct compliance issues identified across five risk tiers. 6 items are HIGH priority and must be remediated before any public-facing launch. The core systemic problem: copy was drafted with strong commercial intent before regulatory clearance was obtained. Several claims imply cleared, validated, and diagnostically autonomous performance that cannot be substantiated at the pre-clearance stage.

---

## Compliance Score

| Category | Score (1–10) | Status |
|---|---|---|
| Efficacy Claims | 4 | FLAG |
| Accuracy Statistics | 5 | FLAG |
| FDA Pathway Language | 6 | Needs Work |
| Physician-Facing Copy | 6 | Needs Work |
| Patient-Facing Copy | 5 | FLAG |
| HIPAA / Data Claims | 8 | Pass |
| **Overall** | **5.7** | **Needs Remediation** |

---

## HIGH PRIORITY — Must Fix Before Any Public Launch

### Issue 1: "Catch It Early" / "Skin Cancer Caught Earlier. Lives Saved."
**Location:** `page.tsx` hero; `copy-brief.md` headline Option C
**Original:** "See What Changed. / Catch It Early." and "Skin Cancer Caught Earlier. Lives Saved."
**Risk:** Pre-clearance diagnostic outcome claim. "Lives Saved" is an unsubstantiated clinical outcome claim. "Catch It Early" implies the device catches cancer before clearance.
**Compliant rewrite:** "See What Changed. Act With Confidence." — Remove "Lives Saved" entirely until post-clearance outcomes data is published.

### Issue 2: Fabricated testimonial with specific clinical outcome
**Location:** `copy-brief.md`, Testimonials section, Quote 1
**Original:** "I've caught two melanomas earlier than I would have under my previous workflow." — Dr. Sarah Chen, MD
**Risk:** Fabricated testimonial (brief notes these are illustrative) containing a causal device performance claim. Under FTC Act Section 5, testimonials must be real, attributed, and represent typical user experience.
**Compliant rewrite:** "skinmap has fundamentally changed how I follow suspicious lesions. I used to rely on hand-drawn maps and verbal notes. Now I have an objective, documented comparison at every visit." — [Real physician name, credentials, institution]. Remove "caught two melanomas earlier" entirely pre-clearance.

### Issue 3: "Clinical-grade" applied to AI analysis component
**Location:** `copy-brief.md` Copy Principle 3; product page hero badge; throughout all pages
**Original:** "CLINICAL-GRADE DERMATOLOGY AI" / "clinical-grade AI co-pilot"
**Risk:** "Clinical-grade" implies FDA-recognized clinical performance. Applying it to the AI analysis (not just image capture) before De Novo clearance creates misbranding risk under 21 CFR 801.4.
**Compliant rewrite:** Apply "clinical-grade" to image capture only. Replace AI references with "AI-assisted" or "physician-facing AI." Restore after De Novo clearance is obtained.

### Issue 4: "detect subtle changes the naked eye can't" — superiority claim
**Location:** `ProductPageClient.tsx`, Technology section card
**Original:** "Our cutting-edge, AI-backed technology empowers users to detect subtle changes the naked eye can't."
**Risk:** Direct superiority claim over unaided physician examination without cleared head-to-head comparative study. Previously triggered FDA Warning Letters against SkinVision and MelApp for equivalent language.
**Compliant rewrite:** "AI-assisted comparison designed to surface subtle morphological changes that may be difficult to detect from written notes or visit recall alone."

### Issue 5: "performance equivalent to board-certified dermatologist"
**Location:** `copy-brief.md`, Accuracy & Validation section
**Original:** "skinmap demonstrated 90% sensitivity and 90% specificity — performance equivalent to board-certified dermatologist assessment under matched conditions."
**Risk:** Explicit parity claim requiring a cleared device and peer-reviewed head-to-head comparative study. Study is IRB-approved but submitted for peer review — not yet published.
**Compliant rewrite:** "In an IRB-approved internal validation study, skinmap's AI model demonstrated 90% sensitivity and 90% specificity for high-risk lesion classification across a dataset of 50,000+ annotated clinical images. Results have been submitted for peer review. Full methodology available upon request."

### Issue 6: "skinmap tracks it forever" — perpetuity warranty
**Location:** `ForPatientsPageClient.tsx`, "Why Tracking Matters" section
**Original:** "Your doctor sees your skin for 5 minutes. skinmap tracks it forever."
**Risk:** "Forever" implies perpetual, failure-free data retention — an unsupportable warranty. Creates product liability exposure and FTC consumer protection risk.
**Compliant rewrite:** "Your doctor sees your skin for 5 minutes. skinmap builds a lasting photo record over time."

---

## MEDIUM PRIORITY — Fix Before Beta/Soft Launch

### Issue 7: Sensitivity/specificity stats without sufficient peer-review qualifier
**All pages** — add consistent inline qualifier to every 90%/90% instance:
> "90% sensitivity and 90% specificity in internal validation testing on 50,000+ annotated clinical images. IRB-approved study submitted for peer review. Results have not yet been independently replicated."

### Issue 8: "The Data Behind Every Diagnosis" section headline
**Location:** `copy-brief.md`, Clinical Evidence section
**Fix:** → "The Clinical Evidence Behind skinmap"

### Issue 9: "diagnostic AI," "diagnostic accuracy," "clinical decision" language
**Location:** `copy-brief.md`; `ProductPageClient.tsx` FAQ
- "skinmap's diagnostic AI" → "skinmap's AI-assisted analysis software"
- "giving physicians both a clinical decision" → "providing physicians a structured risk score to inform their clinical judgment"
- "See skinmap's diagnostic accuracy in a live clinical demo" → "See skinmap's AI-assisted risk stratification in a live clinical demo"

### Issue 10: "detect skin cancer early" / "catch skin cancer earlier" — unqualified
**Location:** `copy-brief.md` About/Mission; `CLAUDE.md`
**Fix:** → "support earlier clinical evaluation of skin changes that might otherwise go untracked"

### Issue 11: "skinmap's diagnostic accuracy" in Product CTA
**Fix:** → "skinmap's AI-assisted risk stratification"

### Issue 12: CLAUDE.md source document product description
**Original:** "identify potential skin cancer using AI diagnostics"
**Fix (internal doc):** → "aid physicians in tracking patients' skin lesions over time and flagging changes that may warrant clinical evaluation, using AI-assisted analysis"

---

## LOW PRIORITY — Fix Before Full Launch

### Issue 13: "specialist-level risk stratification" without cleared parity study
**Fix:** → "structured AI-assisted risk stratification"

### Issue 14: "flagging suspicious changes before they become dangerous" — prognostic claim
**Fix:** → "flagging changes that may warrant closer clinical evaluation"

### Issue 15: "No Skin Cancer Should Go Undetected" — absolute outcome claim
**Status:** Acceptable as mission statement if contextually isolated. Add framing: "Our mission. Our north star. The commitment that shapes everything we build."

### Issue 16: "Validated to Specialist Standards" headline option
**Status:** Do not use pre-clearance. → "IRB-Validated. Peer-Review Submitted."

### Issue 17: Investor page meta — "IRB-validated AI diagnostics"
**Fix:** → "AI-assisted risk analysis — validated in an IRB-approved study"

---

## Required Additions Before Launch

1. **Intended use statement** on product page, home page footer, and for-patients page:
   > "skinmap is intended to aid physicians in tracking skin lesions over time. It is not intended to diagnose, treat, or replace clinical judgment."

2. **Pre-clearance disclaimer** in site footer:
   > "skinmap is on the FDA De Novo pathway. The AI-assisted analysis feature is not yet FDA cleared."

3. **Physician-only access language** on for-patients page:
   > "skinmap is only available through licensed physicians and healthcare providers."

4. **Testimonial disclaimer** on all testimonial sections:
   > "Results may vary. Not a substitute for professional medical advice."

---

## Recommended Next Steps for Regulatory Counsel

1. Confirm intended use statement language with FDA SaMD specialist
2. Review sensitivity/specificity disclosure language against De Novo submission indications
3. Confirm "clinical-grade" usage policy against De Novo special controls once clearance obtained
4. Review testimonial policy against FTC guidelines on device testimonials
5. Confirm IRB study disclosure language matches what was submitted to the IRB
