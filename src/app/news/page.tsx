import type { Metadata } from 'next';
import { NewsPageClient } from './NewsPageClient';

export const metadata: Metadata = {
  title: 'News & Press | Skinmap',
  description:
    'Press coverage, company announcements, and clinical milestones as Skinmap builds the future of AI-powered dermatology diagnostics.',
  openGraph: {
    title: 'Skinmap in the News',
    description:
      'Skinmap has completed an IRB-approved clinical validation study demonstrating 90% sensitivity and specificity, raised seed funding, and launched an early access program for physicians. Read the latest announcements.',
  },
};

export default function NewsPage() {
  return <NewsPageClient />;
}
