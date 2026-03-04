import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

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
    'skinmap delivers full-body skin scans in about 60 seconds — using nothing but an iPhone. Medicare covered (CPT 96904). HIPAA compliant. Patented. Together, we can conquer skin cancer.',
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
      <body className="font-sans antialiased bg-white text-gray-900">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
