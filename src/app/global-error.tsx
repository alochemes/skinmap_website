'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          fontFamily: 'sans-serif',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#0D0B28',
          color: '#fff',
          gap: '16px',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Something went wrong</h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            background: '#00CA5A',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 24px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
