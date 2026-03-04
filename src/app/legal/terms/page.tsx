import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Terms of Service | skinmap',
  description: 'Terms governing use of the skinmap website and clinical platform.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using skinmap.com or the skinmap clinical platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use our services. These terms apply to all visitors, users, and physicians accessing the platform.`,
  },
  {
    title: '2. Description of Services',
    body: `skinmap provides an AI-powered clinical tool for physicians to track patient skin health over time and receive AI-assisted risk stratification for skin lesions. The platform is intended for use by licensed healthcare professionals as a clinical decision support tool. skinmap does not provide medical diagnoses and is not a substitute for professional medical judgment.`,
  },
  {
    title: '3. Investigational Use',
    body: `skinmap is currently on the FDA De Novo pathway and has not yet received regulatory clearance for all markets. The platform is available for investigational use only where applicable under local and federal regulations. Physicians are responsible for complying with applicable laws governing the use of investigational medical software.`,
  },
  {
    title: '4. Not a Medical Device (Pending Clearance)',
    body: `Until FDA clearance is obtained, skinmap's AI outputs are intended to assist clinical decision-making and do not constitute a medical diagnosis. Physicians retain full clinical responsibility for all patient care decisions. skinmap's risk stratification is one input among many in clinical assessment.`,
  },
  {
    title: '5. User Accounts and Access',
    body: `Access to the skinmap clinical platform requires a physician account. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to notify skinmap immediately of any unauthorized use of your account.`,
  },
  {
    title: '6. Patient Data and HIPAA',
    body: `Physicians using skinmap to capture and store patient data must comply with HIPAA and all applicable privacy regulations. skinmap will execute a Business Associate Agreement (BAA) with covered entities prior to any PHI access. Physicians are responsible for obtaining appropriate patient consent for clinical imaging and AI analysis.`,
  },
  {
    title: '7. Intellectual Property',
    body: `All content, software, and technology on skinmap.com and the clinical platform are owned by or licensed to skinmap. You may not copy, reproduce, modify, or distribute any content without prior written consent. skinmap's name, logo, and brand marks are proprietary.`,
  },
  {
    title: '8. Disclaimer of Warranties',
    body: `skinmap is provided on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, reliability, or suitability of the platform for any specific clinical use case. Use of the platform is at your own professional discretion.`,
  },
  {
    title: '9. Limitation of Liability',
    body: `To the fullest extent permitted by law, skinmap shall not be liable for any indirect, incidental, or consequential damages arising from use of the platform. skinmap's total liability to any user shall not exceed the amounts paid for platform access in the twelve months preceding a claim.`,
  },
  {
    title: '10. Changes to Terms',
    body: `We may update these Terms of Service from time to time. We will notify registered users of material changes via email. Continued use of skinmap following notification of changes constitutes acceptance of the revised terms.`,
  },
  {
    title: '11. Contact',
    body: `For legal inquiries, contact legal@skinmap.com.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16" aria-label="Terms of Service">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Last updated: February 26, 2026
          </p>
        </Container>
      </section>

      <div className="bg-white py-16 md:py-24">
        <Container narrow>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            These Terms of Service govern your use of skinmap.com and the skinmap clinical platform.
            Please read them carefully before accessing or using our services.
          </p>

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
                { href: '/legal/hipaa', label: 'HIPAA Notice' },
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
