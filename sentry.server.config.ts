// ---------------------------------------------------------------------------
// Sentry — server-side config (Node.js / Edge runtime)
// Captures API route errors, server component errors, edge middleware.
// ---------------------------------------------------------------------------
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_APP_ENV === 'production',
  tracesSampleRate: 0.1,
});
