'use client';

// ---------------------------------------------------------------------------
// useFeatureFlag — Skinmap Phase 5
// Thin wrapper over PostHog feature flags with SSR-safe defaults.
// PostHog flags are evaluated client-side after hydration.
// Always provide a `defaultValue` that matches the control variant so the
// page renders correctly before PostHog loads.
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react';
import { posthog } from '@/lib/analytics/posthog';
import type { FlagKey } from '@/lib/flags';

/**
 * Returns the current value of a PostHog feature flag.
 * Returns `defaultValue` on the server and before PostHog loads.
 */
export function useFeatureFlag(
  flag: FlagKey,
  defaultValue: string | boolean = false,
): string | boolean {
  const [value, setValue] = useState<string | boolean>(defaultValue);

  useEffect(() => {
    if (!posthog.__loaded) return;

    // Read the flag immediately if already loaded
    const current = posthog.getFeatureFlag(flag);
    if (current !== undefined) {
      setValue(current);
    }

    // Also subscribe to flag reloads (e.g. after identify())
    const unsubscribe = posthog.onFeatureFlags(() => {
      const updated = posthog.getFeatureFlag(flag);
      if (updated !== undefined) setValue(updated);
    });

    return unsubscribe;
  }, [flag]);

  return value;
}

/**
 * Returns true when a boolean rollout flag is enabled.
 * Convenience wrapper around useFeatureFlag for simple on/off flags.
 */
export function useFlag(flag: FlagKey, defaultValue = false): boolean {
  const value = useFeatureFlag(flag, defaultValue);
  return value === true || value === 'true';
}
