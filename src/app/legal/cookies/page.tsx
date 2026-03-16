import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

export const metadata: Metadata = {
  title: 'Cookie Policy | Skinmap',
  description: 'How Skinmap uses cookies and similar tracking technologies.',
};

const cookieTypes = [
  {
    type: 'Strictly Necessary',
    purpose: 'Required for the website to function. Cannot be disabled.',
    examples: 'Session management, security tokens, form validation state.',
    optional: false,
  },
  {
    type: 'Analytics',
    purpose: 'Help us understand how visitors interact with the site so we can improve it.',
    examples: 'Page views, scroll depth, click patterns, referral sources.',
    optional: true,
  },
  {
    type: 'Functional',
    purpose: 'Remember your preferences to improve your experience.',
    examples: 'Contact form tab selection, filter preferences, language settings.',
    optional: true,
  },
];

const sections = [
  {
    title: 'What Are Cookies?',
    body: `Cookies are small text files placed on your device when you visit a website. They allow the website to remember information about your visit, such as your preferred settings, and help us understand how you interact with our content. We also use similar technologies like local storage and session storage.`,
  },
  {
    title: 'How We Use Cookies',
    body: `Skinmap.com uses cookies for three purposes: (1) to ensure the website functions correctly (strictly necessary); (2) to understand how visitors use the site so we can improve it (analytics); and (3) to remember your preferences (functional). We do not use cookies for advertising or behavioral tracking.`,
  },
  {
    title: 'Third-Party Cookies',
    body: `We may use third-party analytics services that set their own cookies. These providers are contractually prohibited from using cookie data for their own purposes. We do not use third-party advertising networks or social media tracking pixels.`,
  },
  {
    title: 'Managing Cookies',
    body: `You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. Blocking strictly necessary cookies may affect website functionality. Blocking analytics or functional cookies will not affect your access to any content.`,
  },
  {
    title: 'Do Not Track',
    body: `Some browsers include a "Do Not Track" feature that sends a signal to websites requesting that your browsing activity not be tracked. Skinmap.com respects Do Not Track signals and will not use analytics cookies when this signal is detected.`,
  },
  {
    title: 'Updates to This Policy',
    body: `We may update this Cookie Policy as we add or remove services. The date at the top of this page reflects the most recent update. Continued use of Skinmap.com following an update constitutes acceptance of the revised policy.`,
  },
];

export default function CookiesPage() {
  return (
    <>
      <section className="bg-gradient-hero pt-32 pb-16" aria-label="Cookie Policy">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-3">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cookie Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-xl">
            Last updated: February 26, 2026
          </p>
        </Container>
      </section>

      <div className="bg-white py-16 md:py-24">
        <Container narrow>
          {/* Cookie types table */}
          <div className="mb-12 overflow-hidden rounded-2xl border border-gray-200">
            <div className="bg-cream px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-navy">Cookies We Use</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {cookieTypes.map(({ type, purpose, examples, optional }) => (
                <div key={type} className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-navy text-sm">{type}</span>
                    <span className={`text-2xs font-semibold px-2 py-0.5 rounded-full ${optional ? 'bg-blue/10 text-blue' : 'bg-coral/10 text-coral'}`}>
                      {optional ? 'Optional' : 'Required'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{purpose}</p>
                  <p className="text-gray-400 text-xs">Examples: {examples}</p>
                </div>
              ))}
            </div>
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
                { href: '/legal/hipaa', label: 'HIPAA Notice' },
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
