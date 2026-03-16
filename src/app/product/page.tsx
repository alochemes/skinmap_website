import type { Metadata } from 'next';
import ProductPageClient from './ProductPageClient';

export const metadata: Metadata = {
  title: 'How Skinmap Works | Total Body Photography',
  description:
    "Skinmap delivers full-body skin scans in about 60 seconds using just an iPhone. Capture, compare visit-over-visit, and act early. Medicare covered (CPT 96904). HIPAA compliant. Patented.",
  openGraph: {
    title: 'How Skinmap Works | Total Body Photography Without the Hardware',
    description:
      'Full-body skin scans in ~60 seconds. Capture → Compare → Act Early. Medicare reimbursed. No expensive equipment. Any iPhone.',
  },
};

export default function ProductPage() {
  return <ProductPageClient />;
}
