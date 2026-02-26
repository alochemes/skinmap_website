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
    default: 'skinmap — AI-Powered Dermatology Diagnostics',
    template: '%s | skinmap',
  },
  description:
    'skinmap gives physicians a clinical-grade AI co-pilot for dermatology — tracking patient skin health over time and flagging suspicious lesions before they become dangerous.',
  keywords: [
    'dermatology AI',
    'skin cancer detection',
    'physician app',
    'skin health tracking',
    'clinical AI diagnostics',
    'HIPAA compliant dermatology',
  ],
  openGraph: {
    title: 'skinmap — AI-Powered Dermatology Diagnostics',
    description:
      'Clinical-grade AI for skin cancer detection. Track patient skin health over time.',
    type: 'website',
    siteName: 'skinmap',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'skinmap — AI-Powered Dermatology Diagnostics',
    description: 'Clinical-grade AI for skin cancer detection.',
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
