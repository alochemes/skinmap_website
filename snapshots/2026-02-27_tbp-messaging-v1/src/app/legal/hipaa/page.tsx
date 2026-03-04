import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'HIPAA Notice of Privacy Practices | skinmap',
  description: 'How skinmap handles Protected Health Information in compliance with HIPAA.',
};

const sections = [
  {
    title: 'Our Commitment to HIPAA Compliance',
    body: `skinmap is designed for use in clinical environments where the privacy and security of Protected Health Information (PHI) is a legal and ethical requirement. We operate as a Business Associate under HIPAA and execute Business Associate Agreements (BAAs) with all covered entities prior to any PHI access.`,
  },
  {
    title: 'What is Protected Health Information?',
    body: `Protected Health Information (PHI) under HIPAA includes any individually identifiable health information — including patient names, medical record numbers, dates of service, geographic identifiers, and health images — that is created, received, maintained, or transmitted in connection with healthcare operations.`,
  },
  {
    title: 'How skinmap Handles PHI',
    body: `All patient images, scan records, AI assessments, and clinical notes stored in the skinmap platform are treated as PHI. This information is: (1) encrypted in transit using TLS 1.3; (2) encrypted at rest using AES-256; (3) stored in HIPAA-compliant cloud infrastructure; (4) access-controlled by role-based permissions; and (5) logged for audit purposes.`,
  },
  {
    title: 'Uses and Disclosures of PHI',
    body: `skinmap uses and discloses PHI only for purposes of treatment, healthcare operations, or as otherwise required by law. We do not sell PHI to third parties. We do not use PHI for marketing purposes. We do not share PHI with artificial intelligence model providers except as necessary to provide the skinmap diagnostic service, and only under appropriate contractual protections.`,
  },
  {
    title: 'Business Associate Agreements',
    body: `Healthcare organizations and physicians deploying skinmap for clinical use must execute a Business Associate Agreement (BAA) with skinmap prior to use. The BAA governs the permitted uses and disclosures of PHI and establishes data security requirements. To request a BAA, contact privacy@skinmap.com.`,
  },
  {
    title: 'Patient Rights Under HIPAA',
    body: `Patients have the right to: (1) request access to their health information; (2) request amendments to inaccurate or incomplete health information; (3) request an accounting of disclosures; (4) request restrictions on certain uses and disclosures; and (5) file a complaint if they believe their privacy rights have been violated. Patients should direct these requests to the covered entity (physician or healthcare organization) responsible for their care, not to skinmap directly.`,
  },
  {
    title: 'Data Breach Notification',
    body: `In the event of a breach of unsecured PHI, skinmap will notify affected covered entities in accordance with the HIPAA Breach Notification Rule (45 CFR Part 164, Subpart D) within the required timeframes. We maintain incident response procedures and conduct regular security assessments.`,
  },
  {
    title: 'Data Retention and Destruction',
    body: `PHI is retained for the period specified in applicable law and the relevant Business Associate Agreement. Upon termination of a BAA, PHI will be returned or destroyed in a HIPAA-compliant manner, as specified in the agreement.`,
  },
  {
    title: 'Contact for HIPAA Inquiries',
    body: `For HIPAA compliance questions, to request a Business Associate Agreement, or to report a potential privacy incident, contact our privacy officer at privacy@skinmap.com.`,
  },
];

export default function HipaaPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16" aria-label="HIPAA Notice">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            HIPAA Notice of Privacy Practices
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Last updated: February 26, 2026
          </p>
        </Container>
      </section>

      <div className="bg-white py-16 md:py-24">
        <Container narrow>
          <div className="bg-cream border border-gray-200 rounded-2xl p-6 mb-10">
            <p className="text-sm font-semibold text-navy mb-1">For Healthcare Organizations</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              skinmap executes Business Associate Agreements (BAAs) with all covered entities prior
              to PHI access. To request a BAA or discuss HIPAA compliance requirements,{' '}
              <Link href="/contact?type=partner" className="text-coral underline underline-offset-2">
                contact our team
              </Link>.
            </p>
          </div>

          <div className="space-y-10">
            {sections.map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-xl font-bold text-navy mb-3">{title}</h2>
                <p className="text-gray-600 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-10 border-t border-gray-100">
            <p className="text-sm text-gray-400 mb-4">Related legal documents:</p>
            <div className="flex flex-wrap gap-4">
              {[
                { href: '/legal/privacy', label: 'Privacy Policy' },
                { href: '/legal/terms', label: 'Terms of Service' },
                { href: '/legal/cookies', label: 'Cookie Policy' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-sm font-semibold text-coral hover:underline underline-offset-2">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
