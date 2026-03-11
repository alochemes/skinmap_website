// ---------------------------------------------------------------------------
// Sentry — Edge runtime config (middleware, edge API routes)
// ---------------------------------------------------------------------------
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_APP_ENV === 'production',
  tracesSampleRate: 0.1,
});
