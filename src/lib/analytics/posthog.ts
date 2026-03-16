// ---------------------------------------------------------------------------
// PostHog client — Skinmap Phase 4
// Initialized once on the client side. Use posthog() anywhere after mount.
// ---------------------------------------------------------------------------

import posthog from 'posthog-js';

export function initPostHog() {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com';

  if (!key || typeof window === 'undefined') return;
  if (posthog.__loaded) return; // idempotent

  posthog.init(key, {
    api_host: host,
    // Capture pageviews manually via the provider so Next.js
    // client-side navigations are tracked correctly.
    capture_pageview: false,
    // Respect the analyticsConsented flag set by the consent layer.
    // Phase 3 will flip this based on the banner; for now it's always true.
    persistence: 'localStorage+cookie',
    // Autocapture is useful for funnels but noisy — enable deliberately.
    autocapture: false,
    // Session recordings off until explicitly enabled in PostHog project.
    disable_session_recording: true,
  });
}

export { posthog };
