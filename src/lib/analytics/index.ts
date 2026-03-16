// ---------------------------------------------------------------------------
// Analytics — Skinmap
// Thin wrapper over GA4 (gtag). PostHog added in Phase 4.
// Always call track() — never call gtag() directly — so swapping providers
// later only requires changing this file.
// ---------------------------------------------------------------------------

import type { EventName, EventParams } from './events';
import { posthog } from './posthog';

declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

// ── Consent state ────────────────────────────────────────────────────────────

let analyticsConsented = false; // default: off until user accepts via CookieBanner

/** Call this from the consent banner to enable/disable analytics. */
export function setAnalyticsConsent(granted: boolean) {
  analyticsConsented = granted;

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied', // Skinmap never uses ad storage
    });
  }

  if (posthog.__loaded) {
    if (granted) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }
}

// ── UTM capture ──────────────────────────────────────────────────────────────

export function captureUTM(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

// ── Core tracker ─────────────────────────────────────────────────────────────

export function track<T extends EventName>(
  name: T,
  params: EventParams<T>,
): void {
  if (typeof window === 'undefined') return;
  if (!analyticsConsented) return;

  const enriched = {
    ...params,
    ...captureUTM(),
  };

  // GA4
  if (window.gtag) {
    window.gtag('event', name, enriched);
  }

  // PostHog
  if (posthog.__loaded) {
    posthog.capture(name, enriched);
  }

  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[analytics]', name, enriched);
  }
}

// ── Typed event helpers (ergonomic shorthand) ─────────────────────────────────

export const analytics = {
  demoRequestSubmitted: (
    params: EventParams<'demo_request_submitted'>,
  ) => track('demo_request_submitted', params),

  patientInquirySubmitted: (
    params: EventParams<'patient_inquiry_submitted'>,
  ) => track('patient_inquiry_submitted', params),

  contactFormSubmitted: (
    params: EventParams<'contact_form_submitted'>,
  ) => track('contact_form_submitted', params),

  navCtaClicked: (
    params: EventParams<'nav_cta_clicked'>,
  ) => track('nav_cta_clicked', params),

  heroCtaClicked: (
    params: EventParams<'hero_cta_clicked'>,
  ) => track('hero_cta_clicked', params),

  sectionCtaClicked: (
    params: EventParams<'section_cta_clicked'>,
  ) => track('section_cta_clicked', params),

  // Doctor finder — wired up when that feature ships
  doctorSearchSubmitted: (
    params: EventParams<'doctor_search_submitted'>,
  ) => track('doctor_search_submitted', params),

  doctorSearchResultsViewed: (
    params: EventParams<'doctor_search_results_viewed'>,
  ) => track('doctor_search_results_viewed', params),

  doctorProfileOpened: (
    params: EventParams<'doctor_profile_opened'>,
  ) => track('doctor_profile_opened', params),

  mapPinClicked: (
    params: EventParams<'map_pin_clicked'>,
  ) => track('map_pin_clicked', params),

  contactDoctorClicked: (
    params: EventParams<'contact_doctor_clicked'>,
  ) => track('contact_doctor_clicked', params),
} satisfies Partial<Record<string, (...args: never[]) => void>>;
