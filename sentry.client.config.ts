// ---------------------------------------------------------------------------
// Sentry — client-side config (browser)
// Runs in the user's browser. Keep bundle impact minimal.
// ---------------------------------------------------------------------------
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Only enable in production — avoids noise from local dev and staging
  enabled: process.env.NEXT_PUBLIC_APP_ENV === 'production',

  // 10% of sessions → performance traces (adjust once you have traffic data)
  tracesSampleRate: 0.1,

  // Replay: capture 0% of sessions, 100% of sessions with errors
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,   // HIPAA-safe: mask all text in replays
      blockAllMedia: true,
    }),
  ],
});
