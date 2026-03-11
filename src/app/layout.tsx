import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { CookieBanner } from '@/components/ui/CookieBanner';
import '@/styles/globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'skinmap — Total Body Photography Without the Hardware',
    template: '%s | skinmap',
  },
  description:
    'skinmap delivers full-body skin scans in about 60 seconds — using nothing but an iPhone. Medicare covered (CPT 96904). HIPAA compliant. Patented technology.',
  keywords: [
    'total body photography',
    'skin cancer detection',
    'TBP iPhone app',
    'Medicare CPT 96904',
    'skin health tracking',
    'HIPAA compliant dermatology',
    'dermatology app',
  ],
  openGraph: {
    title: 'skinmap — Total Body Photography Without the Hardware',
    description:
      'Full-body skin scans in ~60 seconds. Medicare covered. No expensive equipment. Any iPhone.',
    type: 'website',
    siteName: 'skinmap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'skinmap — Total Body Photography Without the Hardware',
    description: 'Full-body skin scans in ~60 seconds. Medicare covered. No expensive equipment.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Google Consent Mode v2 — must run before GA4 loads */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                analytics_storage: 'denied',
                ad_storage: 'denied',
                wait_for_update: 500
              });
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-gray-900">
        <Suspense>
          <PostHogProvider>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </PostHogProvider>
        </Suspense>
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
