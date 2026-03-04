import type { Metadata } from 'next';
import { InvestorsPageClient } from './InvestorsPageClient';

export const metadata: Metadata = {
  title: 'Investors & Partners | skinmap',
  description:
    'The $20 billion dermatology gap has a solution. skinmap closes the access gap between 3,600 dermatologists and 330 million Americans with clinical-grade AI at the point of care.',
  openGraph: {
    title: 'Investor Opportunity | skinmap',
    description:
      "skinmap is the only physician-facing longitudinal skin health tracking platform combining IRB-validated AI diagnostics with point-of-care iPhone capture. Request an investor briefing.",
  },
};

export default function InvestorsPage() {
  return <InvestorsPageClient />;
}
