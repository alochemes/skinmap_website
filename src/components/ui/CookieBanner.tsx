'use client';

// ---------------------------------------------------------------------------
// CookieBanner — Skinmap Phase 3
// Shown once to new visitors until they accept or decline.
// On accept:  analytics enabled (GA4 + PostHog)
// On decline: analytics remain disabled
// Disappears on either choice; preference persisted in localStorage.
// ---------------------------------------------------------------------------

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useConsent } from '@/hooks/useConsent';

export function CookieBanner() {
  const { consent, grant, deny } = useConsent();

  // Only show when consent is still pending
  const visible = consent === 'pending';

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="mx-auto max-w-4xl bg-navy rounded-2xl shadow-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            {/* Text */}
            <p className="text-sm text-gray-300 leading-relaxed flex-1">
              We use analytics cookies to understand how visitors use Skinmap.com so we can
              improve the experience.{' '}
              <Link
                href="/legal/cookies"
                className="text-blue underline underline-offset-2 hover:text-white transition-colors"
              >
                Cookie policy
              </Link>
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={deny}
                className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
              >
                Decline
              </button>
              <button
                onClick={grant}
                className="text-sm font-semibold bg-coral text-navy px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
