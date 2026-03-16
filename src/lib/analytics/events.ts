// ---------------------------------------------------------------------------
// Analytics Event Taxonomy — Skinmap
// Define ALL trackable events here before wiring them anywhere.
// Follow this pattern: verb_noun (snake_case). Keep parameters typed.
// ---------------------------------------------------------------------------

// ── Public site events ──────────────────────────────────────────────────────

export type DemoRequestSubmittedEvent = {
  name: 'demo_request_submitted';
  params: {
    form_location: 'hero' | 'contact_page' | 'nav_cta' | 'footer';
    specialty?: string; // physician specialty if captured
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
};

export type PatientInquirySubmittedEvent = {
  name: 'patient_inquiry_submitted';
  params: {
    form_location: 'hero' | 'contact_page' | 'for_patients_page';
  };
};

export type ContactFormSubmittedEvent = {
  name: 'contact_form_submitted';
  params: {
    inquiry_type: 'physician_demo' | 'partnership' | 'press' | 'general';
    form_location: 'contact_page';
  };
};

export type NavCtaClickedEvent = {
  name: 'nav_cta_clicked';
  params: {
    cta_label: string;
    destination: string;
  };
};

export type HeroCtaClickedEvent = {
  name: 'hero_cta_clicked';
  params: {
    cta_label: string;
    page: string;
    audience: 'physician' | 'patient' | 'general';
  };
};

export type SectionCtaClickedEvent = {
  name: 'section_cta_clicked';
  params: {
    section_id: string;
    cta_label: string;
    page: string;
  };
};

// ── Doctor finder events (Phase 4 — wired up when doctor finder ships) ──────

export type DoctorSearchSubmittedEvent = {
  name: 'doctor_search_submitted';
  params: {
    query_type: 'zip' | 'city' | 'name' | 'specialty';
    has_location_autofill: boolean;
  };
};

export type DoctorSearchResultsViewedEvent = {
  name: 'doctor_search_results_viewed';
  params: {
    result_count: number;
    has_results: boolean;
    query_type: 'zip' | 'city' | 'name' | 'specialty';
    view_mode: 'list' | 'map';
  };
};

export type DoctorProfileOpenedEvent = {
  name: 'doctor_profile_opened';
  params: {
    doctor_id: string;
    source: 'list' | 'map_pin';
    result_position?: number; // 1-indexed rank in results
  };
};

export type MapPinClickedEvent = {
  name: 'map_pin_clicked';
  params: {
    doctor_id: string;
  };
};

export type ContactDoctorClickedEvent = {
  name: 'contact_doctor_clicked';
  params: {
    doctor_id: string;
    contact_method: 'phone' | 'website' | 'directions';
    source: 'profile' | 'list_card';
  };
};

// ── Portal events (Phase 4+) ─────────────────────────────────────────────────

export type PortalLoginEvent = {
  name: 'portal_login';
  params: {
    user_role: 'physician' | 'admin';
  };
};

export type PortalInvoiceViewedEvent = {
  name: 'portal_invoice_viewed';
  params: {
    invoice_id: string;
  };
};

// ── Union ────────────────────────────────────────────────────────────────────

export type AnalyticsEvent =
  | DemoRequestSubmittedEvent
  | PatientInquirySubmittedEvent
  | ContactFormSubmittedEvent
  | NavCtaClickedEvent
  | HeroCtaClickedEvent
  | SectionCtaClickedEvent
  | DoctorSearchSubmittedEvent
  | DoctorSearchResultsViewedEvent
  | DoctorProfileOpenedEvent
  | MapPinClickedEvent
  | ContactDoctorClickedEvent
  | PortalLoginEvent
  | PortalInvoiceViewedEvent;

export type EventName = AnalyticsEvent['name'];
export type EventParams<T extends EventName> = Extract<AnalyticsEvent, { name: T }>['params'];
