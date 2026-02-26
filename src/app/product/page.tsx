import type { Metadata } from 'next';
import { ProductPageClient } from './ProductPageClient';

export const metadata: Metadata = {
  title: 'Product & Technology | skinmap',
  description:
    "skinmap's clinical AI delivers 90% sensitivity and 90% specificity for dermatological risk stratification — validated in IRB-approved studies on 50,000+ annotated clinical images.",
  openGraph: {
    title: 'The Science Behind skinmap | Clinical-Grade Dermatology AI',
    description:
      'A deep convolutional neural network trained on 50,000+ clinical images, validated in IRB-approved studies. See how skinmap delivers specialist-level skin cancer risk stratification in under 3 seconds.',
  },
};

export default function ProductPage() {
  return <ProductPageClient />;
}
