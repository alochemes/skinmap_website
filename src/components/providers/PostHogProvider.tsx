'use client';

// ---------------------------------------------------------------------------
// PostHogProvider — skinmap Phase 4
// Initializes PostHog and tracks Next.js App Router page views on navigation.
// Wrap the root layout body with this component.
// ---------------------------------------------------------------------------

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, posthog } from '@/lib/analytics/posthog';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialized = useRef(false);

  // Initialize once on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    initPostHog();
  }, []);

  // Track pageviews on every route change (App Router doesn't fire native
  // pageview events the way Pages Router did)
  useEffect(() => {
    if (!posthog.__loaded) return;

    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');

    posthog.capture('$pageview', { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
