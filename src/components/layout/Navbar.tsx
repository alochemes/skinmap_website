'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Product',     href: '/product' },
  { label: 'About',       href: '/about' },
  { label: 'For Patients', href: '/for-patients' },
  { label: 'Investors',   href: '/investors' },
  { label: 'News',        href: '/news' },
  { label: 'Contact',     href: '/contact' },
] as const;

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Determine if we're on a page with a dark hero (home, investors)
  // so we can start with white text; otherwise start navy
  const darkHeroPages = ['/', '/investors', '/product', '/about', '/for-patients'];
  const hasDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navBg    = scrolled || !hasDarkHero ? 'bg-navy shadow-md' : 'bg-transparent';
  const linkColor = scrolled || !hasDarkHero ? 'text-gray-300 hover:text-white' : 'text-white/80 hover:text-white';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          navBg
        )}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
            aria-label="skinmap home"
          >
            <Image
              src="/images/logo-icon.png"
              alt=""
              width={32}
              height={32}
              className="rounded-full"
              priority
            />
            <span className="text-xl font-bold text-white tracking-tight">
              skin
            </span>
            <span className="text-xl font-bold text-coral tracking-tight">
              map
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral',
                    pathname === href
                      ? 'text-white bg-white/10'
                      : linkColor
                  )}
                  aria-current={pathname === href ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link href="/contact?type=demo">
              <Button variant="primary" size="sm">Request a Demo</Button>
            </Link>
          </div>

          {/* Mobile: Demo CTA + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <Link href="/contact?type=demo">
              <Button variant="primary" size="sm">Demo</Button>
            </Link>
            <button
              className={cn(
                'p-2 rounded-lg transition-colors',
                'text-white hover:bg-white/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral'
              )}
              onClick={() => setMobileOpen((o) => !o)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-navy flex flex-col pt-20 px-6 pb-8"
          >
            <ul className="flex flex-col gap-1" role="list">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-lg font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral',
                      pathname === href
                        ? 'text-white bg-white/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    )}
                    aria-current={pathname === href ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <Link href="/contact?type=demo" className="w-full">
                <Button variant="primary" size="lg" fullWidth>Request a Demo</Button>
              </Link>
              <Link href="/contact?type=patient" className="w-full">
                <Button variant="outline-white" size="lg" fullWidth>Ask Your Doctor About skinmap</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
