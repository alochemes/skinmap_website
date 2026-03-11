import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry org + project (set in env or hardcode here)
  org: process.env.SENTRY_ORG ?? 'skinmap',
  project: process.env.SENTRY_PROJECT ?? 'skinmap-web',

  // Only upload source maps on real CI builds, not local dev
  silent: !process.env.CI,

  // Tree-shake Sentry debug code from production bundles
  disableLogger: true,

  // Automatically instrument Next.js data fetching methods
  autoInstrumentServerFunctions: true,
});
