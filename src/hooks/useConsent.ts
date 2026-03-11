'use client';

// ---------------------------------------------------------------------------
// useConsent — skinmap Phase 3
// Reads and writes the user's analytics consent choice.
// Stored in localStorage so it persists across sessions.
// ---------------------------------------------------------------------------

import { useEffect, useState, useCallback } from 'react';
import { setAnalyticsConsent } from '@/lib/analytics';

type ConsentState = 'granted' | 'denied' | 'pending';

const STORAGE_KEY = 'skinmap_analytics_consent';

function readStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === 'granted' || val === 'denied') return val;
  return 'pending';
}

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');

  // Read stored choice on mount
  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    if (stored !== 'pending') {
      setAnalyticsConsent(stored === 'granted');
    }
  }, []);

  const grant = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'granted');
    setConsent('granted');
    setAnalyticsConsent(true);
  }, []);

  const deny = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'denied');
    setConsent('denied');
    setAnalyticsConsent(false);
  }, []);

  return { consent, grant, deny };
}
