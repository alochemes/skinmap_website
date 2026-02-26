import type { Metadata } from 'next';
import { ForPatientsPageClient } from './ForPatientsPageClient';

export const metadata: Metadata = {
  title: 'Find a Provider | skinmap',
  description:
    'Find a physician near you who uses skinmap for AI-powered skin health tracking and skin cancer risk assessment. Search by city, specialty, or practice name.',
  openGraph: {
    title: 'Find a skinmap Physician Near You',
    description:
      'skinmap is available at dermatology practices and primary care offices across the U.S. Find a provider or request skinmap in your area.',
  },
};

export default function ForPatientsPage() {
  return <ForPatientsPageClient />;
}
