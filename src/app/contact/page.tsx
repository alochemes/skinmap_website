import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact | skinmap',
  description:
    'Get in touch with the skinmap team. Request a physician demo, explore clinical partnerships, connect with our investors team, or reach out for press inquiries.',
  openGraph: {
    title: 'Contact skinmap | Get in Touch',
    description:
      'Whether you are ready to book a demo or just have questions — we want to hear from you. Reach the right team at skinmap.',
  },
};

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-navy" />}>
      <ContactPageClient />
    </Suspense>
  );
}
