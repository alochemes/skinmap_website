import type { Metadata } from 'next';
import { ForPatientsPageClient } from './ForPatientsPageClient';

export const metadata: Metadata = {
  title: 'Find a Provider | Skinmap',
  description:
    'Find a physician near you who uses Skinmap for AI-powered skin health tracking and skin cancer risk assessment. Search by city, specialty, or practice name.',
  openGraph: {
    title: 'Find a Skinmap Physician Near You',
    description:
      'Skinmap is available at dermatology practices and primary care offices across the U.S. Find a provider or request Skinmap in your area.',
  },
};

export default function ForPatientsPage() {
  return <ForPatientsPageClient />;
}
