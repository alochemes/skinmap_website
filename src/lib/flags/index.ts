// ---------------------------------------------------------------------------
// Feature Flags — skinmap Phase 5
// All flags are defined here as typed constants.
// Create the matching flags in PostHog: app.posthog.com → Feature Flags
//
// Naming convention:  <area>_<description>
// Variants:           always use string values, never booleans for A/B tests
//                     (PostHog multivariate flags use string payloads)
// ---------------------------------------------------------------------------

// ── Flag keys ────────────────────────────────────────────────────────────────

export const FLAGS = {
  // A/B: Homepage hero CTA copy
  // Variants: 'control' | 'variant_get_access' | 'variant_see_it_work'
  HOMEPAGE_HERO_CTA: 'homepage_hero_cta',

  // A/B: Homepage hero CTA for patients
  // Variants: 'control' | 'variant_ask_doctor'
  HOMEPAGE_PATIENT_CTA: 'homepage_patient_cta',

  // Rollout: Doctor finder map feature (0% → 10% → 50% → 100%)
  // Boolean flag — off until doctor finder ships
  DOCTOR_MAP_ROLLOUT: 'doctor_map_rollout',

  // A/B: Doctor finder results layout
  // Variants: 'list_first' | 'map_first'
  DOCTOR_FINDER_LAYOUT: 'doctor_finder_layout',

  // A/B: Doctor search input — autofill vs manual ZIP
  // Variants: 'manual_zip' | 'location_autofill'
  DOCTOR_SEARCH_INPUT: 'doctor_search_input',
} as const;

export type FlagKey = (typeof FLAGS)[keyof typeof FLAGS];

// ── Variant maps ──────────────────────────────────────────────────────────────
// Define what each variant means in UI terms.

export const HOMEPAGE_HERO_CTA_VARIANTS = {
  control:              { physician: 'Request a Demo',    patient: 'Learn More' },
  variant_get_access:   { physician: 'Get Early Access',  patient: 'Find a Doctor' },
  variant_see_it_work:  { physician: 'See It in Action',  patient: 'Ask Your Doctor' },
} as const;

export type HomepageHeroCtaVariant = keyof typeof HOMEPAGE_HERO_CTA_VARIANTS;

export const HOMEPAGE_PATIENT_CTA_VARIANTS = {
  control:          'Learn More',
  variant_ask_doctor: 'Ask Your Doctor About skinmap',
} as const;

export type HomepagePatientCtaVariant = keyof typeof HOMEPAGE_PATIENT_CTA_VARIANTS;
