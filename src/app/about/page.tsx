import type { Metadata } from 'next';
import { AboutPageClient } from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About | Skinmap',
  description:
    'Skinmap was founded on a simple premise: the tools to detect skin cancer early exist — they just aren\'t in the hands of the physicians who see patients every day. Meet the team.',
  openGraph: {
    title: 'About Skinmap | No Skin Cancer Should Go Undetected',
    description:
      'Meet the clinical AI team building the future of dermatology diagnostics — physicians, engineers, and researchers united by a single mission.',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
