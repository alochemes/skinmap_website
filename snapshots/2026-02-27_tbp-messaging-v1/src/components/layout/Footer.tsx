import Link from 'next/link';
import Image from 'next/image';
import { X as TwitterX, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const footerLinks = {
  Product: [
    { label: 'How It Works',   href: '/product#how-it-works' },
    { label: 'AI Technology',  href: '/product#ai-engine' },
    { label: 'Clinical Data',  href: '/product#accuracy' },
    { label: 'Privacy & HIPAA', href: '/product#privacy' },
  ],
  Company: [
    { label: 'About',      href: '/about' },
    { label: 'Team',       href: '/about#team' },
    { label: 'Investors',  href: '/investors' },
    { label: 'Careers',    href: '/about#careers' },
  ],
  Resources: [
    { label: 'For Patients',   href: '/for-patients' },
    { label: 'News & Press',   href: '/news' },
    { label: 'Press Kit',      href: '/news#press-kit' },
    { label: 'Contact',        href: '/contact' },
    { label: 'Request a Demo', href: '/contact?type=demo' },
  ],
  Legal: [
    { label: 'Privacy Policy',    href: '/legal/privacy' },
    { label: 'Terms of Service',  href: '/legal/terms' },
    { label: 'HIPAA Notice',      href: '/legal/hipaa' },
    { label: 'Cookie Policy',     href: '/legal/cookies' },
  ],
} as const;

const socialLinks = [
  { label: 'Twitter / X', href: 'https://twitter.com/skinmapai', Icon: TwitterX },
  { label: 'LinkedIn',    href: 'https://linkedin.com/company/skinmap', Icon: Linkedin },
  { label: 'Email',       href: 'mailto:hello@skinmap.com', Icon: Mail },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white" role="contentinfo">
      <Container className="py-16 lg:py-20">
        {/* Top row: brand + columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
              aria-label="skinmap home"
            >
              <Image
                src="/images/logo-icon.png"
                alt=""
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-2xl font-bold text-white tracking-tight">skin</span>
              <span className="text-2xl font-bold text-coral tracking-tight">map</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Clinical-grade AI for dermatology. Tracking patient skin health over time and
              flagging suspicious lesions — in the physician&apos;s pocket.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6" aria-label="Social links">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {(Object.entries(footerLinks) as [string, readonly { label: string; href: string }[]][]).map(
            ([group, links]) => (
              <div key={group}>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                  {group}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-sm text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            &copy; {currentYear} skinmap, Inc. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            skinmap is on the FDA De Novo pathway. Not yet cleared for clinical use in all markets.
            For investigational use only where applicable.
          </p>
        </div>
      </Container>
    </footer>
  );
}
