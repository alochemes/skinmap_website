import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Privacy Policy | Skinmap',
  description: 'How Skinmap collects, uses, and protects your information.',
};

const sections = [
  {
    title: '1. Information We Collect',
    body: `Skinmap collects information you provide directly, such as name, email address, medical specialty, and practice information when you request a demo, contact our team, or register for early access. We also collect usage data and analytics to improve our platform. We do not collect or store patient health information through this website.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use information collected through this website to respond to your inquiries, schedule product demonstrations, send product updates and clinical information (with your consent), and improve our services. We do not sell or rent your personal information to third parties.`,
  },
  {
    title: '3. Protected Health Information (PHI)',
    body: `The Skinmap clinical platform handles Protected Health Information (PHI) in full compliance with HIPAA. PHI is encrypted using AES-256 encryption in transit and at rest. Business Associate Agreements (BAAs) are executed with all covered entities prior to PHI access. This website does not collect or transmit PHI.`,
  },
  {
    title: '4. Cookies and Tracking',
    body: `We use cookies and similar technologies to understand how visitors interact with our website, remember your preferences, and improve our services. You can control cookie settings through your browser. See our Cookie Policy for details.`,
  },
  {
    title: '5. Third-Party Services',
    body: `We may use third-party analytics and communication services to operate this website. These providers are contractually obligated to protect your information and may not use it for their own purposes. We do not share personally identifiable information with advertising networks.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain personal information collected through this website for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your information at any time by contacting privacy@Skinmap.com.`,
  },
  {
    title: '7. Your Rights',
    body: `You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at privacy@Skinmap.com. We will respond within 30 days. Residents of certain jurisdictions may have additional rights under applicable privacy law.`,
  },
  {
    title: '8. Contact',
    body: `For privacy-related questions or to exercise your data rights, contact us at privacy@Skinmap.com. For questions about our clinical platform's HIPAA compliance, see our HIPAA Notice.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-16" aria-label="Privacy Policy">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Last updated: February 26, 2026
          </p>
        </Container>
      </section>

      {/* Content */}
      <div className="bg-white py-16 md:py-24">
        <Container narrow>
          <p className="text-gray-600 leading-relaxed mb-10 text-lg">
            Skinmap is committed to protecting your privacy and the confidentiality of your information.
            This Privacy Policy explains how we collect, use, and safeguard information when you visit
            Skinmap.com or interact with our team.
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
                { href: '/legal/terms', label: 'Terms of Service' },
                { href: '/legal/hipaa', label: 'HIPAA Notice' },
                { href: '/legal/cookies', label: 'Cookie Policy' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-semibold text-coral hover:underline underline-offset-2"
                >
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
