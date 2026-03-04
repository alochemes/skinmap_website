'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import {
  Camera,
  TrendingUp,
  LayoutDashboard,
  CheckCircle2,
  Quote,
  ArrowRight,
  Clock,
  FileText,
  AlertCircle,
  Users,
  Smartphone,
  BadgeCheck,
  DollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Section,
  SectionEyebrow,
  SectionHeadline,
  SectionSubtext,
} from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ---------------------------------------------------------------------------
// Scroll-triggered fade-up wrapper
// ---------------------------------------------------------------------------
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Animated counter for stats
// ---------------------------------------------------------------------------
function AnimatedStat({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString());
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      motionVal.set(value);
      return;
    }
    const ctrl = animate(motionVal, value, { duration: 1.8, ease: 'easeOut' });
    return ctrl.stop;
  }, [inView, value, motionVal, reduced]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Phone mockup
// ---------------------------------------------------------------------------
function PhoneMockup({ screen }: { screen: 'scan' | 'compare' | 'dashboard' | 'report' }) {
  return (
    <div className="relative flex justify-center" aria-hidden="true">
      <div className="absolute inset-0 scale-105 rounded-[3rem] bg-coral/20 blur-2xl" />
      <div className="relative w-56 sm:w-64 aspect-[9/19] rounded-[2.2rem] bg-navy-800 border-4 border-white/20 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-navy-900/80 flex items-center justify-center">
          <div className="w-16 h-3 rounded-full bg-navy-900/60" />
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 pt-9 px-3 pb-3 flex flex-col gap-2">
          {screen === 'scan' && (
            <>
              <div className="flex items-center gap-2 bg-white/5 rounded-xl p-2.5">
                <div className="w-7 h-7 rounded-full bg-coral/30 shrink-0 flex items-center justify-center">
                  <Camera size={12} className="text-coral" />
                </div>
                <div>
                  <div className="h-2 w-16 rounded-full bg-white/40 mb-1" />
                  <div className="h-1.5 w-10 rounded-full bg-white/20" />
                </div>
                <Badge variant="new" size="sm" className="ml-auto text-2xs">Full Body</Badge>
              </div>
              <div className="bg-gradient-to-br from-navy-700/60 to-navy-800/80 rounded-xl flex-1 flex items-center justify-center border border-white/10">
                <div className="text-center space-y-2">
                  <div className="w-12 h-16 mx-auto rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                    <Camera size={18} className="text-coral" />
                  </div>
                  <div className="text-2xs text-white/60">Full-body scan</div>
                  <div className="text-2xs text-coral font-semibold">~60 seconds</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 flex items-center gap-2">
                <CheckCircle2 size={12} className="text-coral shrink-0" />
                <div className="text-2xs text-white/60">Capture complete · 47 photos</div>
              </div>
            </>
          )}

          {screen === 'compare' && (
            <>
              <div className="h-2 w-24 rounded-full bg-white/20 mb-1" />
              <div className="grid grid-cols-2 gap-2 flex-1">
                {[{ label: 'Mar 2024', dim: true }, { label: 'Jan 2025', dim: false }].map(({ label, dim }) => (
                  <div
                    key={label}
                    className={`rounded-xl flex flex-col items-center justify-center gap-1.5 ${
                      dim
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-gradient-to-br from-coral/25 to-blue/25 border border-coral/30'
                    }`}
                  >
                    <div className="w-8 h-10 rounded-md bg-white/10 border border-white/20" />
                    <span className="text-2xs text-white/50">{label}</span>
                    {!dim && (
                      <Badge variant="new" size="sm" className="text-2xs">Changed</Badge>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-xl p-2 flex items-center gap-2">
                <TrendingUp size={10} className="text-coral shrink-0" />
                <div className="text-2xs text-white/60">New lesion detected — flag for review</div>
              </div>
            </>
          )}

          {screen === 'dashboard' && (
            <>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-2 w-20 rounded-full bg-white/20" />
                <div className="h-2 w-8 rounded-full bg-coral/40 ml-auto" />
              </div>
              {[
                { name: 'Johnson, K.', risk: 'Review', color: 'bg-coral/70' },
                { name: 'Patel, S.', risk: 'Clear', color: 'bg-teal/70' },
                { name: 'Garcia, M.', risk: 'Clear', color: 'bg-teal/70' },
              ].map(({ name, risk, color }) => (
                <div key={name} className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                  <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                  <div className="h-1.5 rounded-full bg-white/20 flex-1" />
                  <span className="text-2xs text-white/40">{risk}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-1.5 mt-1">
                {[{ l: 'Patients', v: '84' }, { l: 'Due Soon', v: '12' }, { l: 'Flagged', v: '3' }].map(({ l, v }) => (
                  <div key={l} className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-sm font-bold text-white">{v}</div>
                    <div className="text-2xs text-white/40">{l}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {screen === 'report' && (
            <>
              <div className="bg-coral/10 rounded-xl p-2.5 border border-coral/20">
                <div className="text-2xs text-coral font-semibold mb-1">CPT 96904 — TBP</div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-coral/60 w-4/5" />
                </div>
                <div className="text-2xs text-white/50 mt-1">Medicare eligible · Claim ready</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 flex items-center gap-2 flex-1">
                <FileText size={14} className="text-coral shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-1.5 w-full rounded-full bg-white/20" />
                  <div className="h-1.5 w-3/4 rounded-full bg-white/15" />
                  <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="bg-coral/20 rounded-xl p-2.5 flex items-center justify-center gap-1.5 border border-coral/30">
                <ArrowRight size={12} className="text-coral" />
                <span className="text-2xs text-coral font-semibold">Submit Claim</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const problemStats = [
  {
    Icon: AlertCircle,
    stat: '5M+',
    label: 'New skin cancer diagnoses every year in the U.S.',
    sub: 'More than all other cancers combined.',
  },
  {
    Icon: TrendingUp,
    stat: '98% → <30%',
    label: "Melanoma survival drops from Stage I to Stage IV.",
    sub: 'The difference is time — and early detection.',
  },
  {
    Icon: Users,
    stat: '3,600',
    label: 'Board-certified dermatologists for 330 million Americans.',
    sub: 'Primary care must fill the gap.',
  },
] as const;

const howItWorksSteps = [
  {
    number: '01',
    Icon: Camera,
    title: 'Capture',
    description:
      'A quick, full-body scan in about 60 seconds. Your MA or nurse uses a specifically configured iPhone to create high-resolution photo records of the entire skin surface. No specialist training required.',
  },
  {
    number: '02',
    Icon: TrendingUp,
    title: 'Compare',
    description:
      "Images are encrypted and securely stored. At every future visit, skinmap automatically surfaces the previous scan side-by-side — turning lesion monitoring into a visual, objective, and documentable process.",
  },
  {
    number: '03',
    Icon: CheckCircle2,
    title: 'Act Early',
    description:
      'New or evolving spots are detected and flagged for physician review. Acting at Stage I rather than Stage IV is the difference between a 98% and a less-than-30% survival rate.',
  },
] as const;

const appFeatures = [
  {
    screen: 'scan' as const,
    eyebrow: 'Full-Body Capture',
    title: 'A complete skin map in about 60 seconds.',
    description:
      'Your medical assistant or nurse captures a full-body skinmap using an iPhone. No expensive equipment, no special room, no specialist — just a smartphone and about one minute of time. Over 90% of patients opt in when offered skinmap.',
    callout: 'Unlike conventional Total Body Photography systems that cost tens of thousands of dollars, skinmap gets your practice started for approximately $1,400.',
    icon: Camera,
  },
  {
    screen: 'compare' as const,
    eyebrow: 'Visit-Over-Visit Comparison',
    title: 'See exactly what changed since the last visit.',
    description:
      'Every skinmap is stored with date, session data, and patient identity — encrypted and HIPAA-compliant. At each follow-up, skinmap automatically surfaces the prior scan for direct visual comparison, so you can see what evolved and document it objectively.',
    callout: "Catch the slow, subtle progressions that are impossible to track from written notes or a physician's recall alone.",
    icon: TrendingUp,
  },
  {
    screen: 'dashboard' as const,
    eyebrow: 'Patient Management',
    title: 'Your entire panel. One screen.',
    description:
      'Every patient has a dedicated skinmap profile with their full scan history, body map, and flagged areas — all searchable and filterable. See every patient who is due for follow-up, or every flagged lesion across your entire practice in a single view.',
    callout: 'Any dermatology or primary care practice can now offer the longitudinal skin tracking that previously required specialty-level infrastructure.',
    icon: LayoutDashboard,
  },
  {
    screen: 'report' as const,
    eyebrow: 'Medicare Reimbursed',
    title: 'Covered by Medicare and major carriers.',
    description:
      "CPT 96904 (Total Body Photography) is covered by Medicare and major insurers for patients with dysplastic nevi and those with a personal or family history of melanoma. skinmap simplifies TBP billing — your claim documentation is generated automatically.",
    callout: 'Add a reimbursed clinical service to your practice while delivering the most comprehensive cancer care available.',
    icon: DollarSign,
  },
] as const;

const practiceStats = [
  {
    label: 'Full-body scan time',
    value: 60,
    suffix: 's',
    context: 'Complete from start to finish — any MA or nurse can do it.',
  },
  {
    label: 'Patient opt-in rate',
    value: 90,
    suffix: '%+',
    context: 'Over 90% of patients say yes when offered skinmap.',
  },
  {
    label: 'Startup equipment cost',
    prefix: '~$',
    value: 1400,
    suffix: '',
    context: 'iPhone + lighting — versus tens of thousands for conventional TBP systems.',
  },
] as const;

const testimonials = [
  {
    quote:
      "Knowing my dermatologist is using skinmap makes me feel like nothing will slip through the cracks.",
    name: 'skinmap Patient',
    role: 'Dermatology Practice',
    institution: 'United States',
    initial: 'P',
  },
  {
    quote:
      "The process was fast and easy — and it's kind of amazing to see your skin this way.",
    name: 'skinmap Patient',
    role: 'Dermatology Practice',
    institution: 'United States',
    initial: 'P',
  },
  {
    quote:
      "skinmap has fundamentally changed how I follow suspicious lesions. I used to rely on hand-drawn maps and verbal notes. Now I have a side-by-side visual comparison at every visit.",
    name: 'Dermatologist',
    role: 'Dermatology Practice',
    institution: 'United States',
    initial: 'D',
  },
] as const;

const partnerLogos = [
  'Medicare Covered',
  'HIPAA Compliant',
  'Patented Technology',
  'IRB Research Partner',
  'Major Insurers',
] as const;

const physicianBullets = [
  'Full-body TBP in ~60 seconds — no specialist training or expensive hardware required',
  'Visit-over-visit comparison catches the changes that written notes miss',
  'Medicare reimbursed (CPT 96904) — a new billable service for your practice',
] as const;

const patientBullets = [
  'Your doctor uses skinmap to track every lesion over time — not just during one visit',
  "Subtle changes that can't be seen with the naked eye are captured and flagged automatically",
  'Ask your doctor about skinmap — it takes about 60 seconds and could change everything',
] as const;

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  return (
    <>
      {/* ================================================================== */}
      {/* HERO                                                                */}
      {/* ================================================================== */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-hero"
        aria-label="Hero"
      >
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-coral/15 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-blue/15 blur-3xl" />
          <div className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-navy-500/30 blur-3xl" />
        </div>

        <Container className="relative z-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              <FadeUp>
                <Badge variant="new" className="mb-6">
                  Total Body Photography · Medicare Covered · HIPAA Compliant
                </Badge>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                  Total Body
                  <br />
                  Photography,
                  <br />
                  <span className="text-coral">Without the Hardware.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-4 max-w-xl">
                  skinmap delivers full-body skin scans in about 60 seconds — using nothing but an iPhone.
                  No expensive equipment. No extra room. Any member of your team can do it.
                </p>
              </FadeUp>

              <FadeUp delay={0.25}>
                <p className="text-base text-coral/80 font-semibold italic mb-8 max-w-xl">
                  Together, we can conquer skin cancer.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact?type=demo">
                    <Button variant="primary" size="lg">Request Information</Button>
                  </Link>
                  <Link href="/for-patients">
                    <Button variant="outline" size="lg">For Patients</Button>
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { Icon: BadgeCheck, text: 'Medicare Reimbursed (CPT 96904)' },
                    { Icon: Smartphone, text: 'iPhone App — No Hardware' },
                    { Icon: Clock, text: '~60 Second Full-Body Scan' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-gray-400">
                      <Icon size={15} className="text-coral shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* Right: phone mockup */}
            <FadeUp delay={0.2} className="lg:flex lg:justify-center">
              <PhoneMockup screen="scan" />
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* SOCIAL PROOF BAR                                                   */}
      {/* ================================================================== */}
      <div className="bg-navy-900 border-y border-white/10 py-5" aria-label="Trust signals">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {partnerLogos.map((name) => (
              <div key={name} className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <CheckCircle2 size={14} className="text-coral shrink-0" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ================================================================== */}
      {/* THE PROBLEM                                                         */}
      {/* ================================================================== */}
      <Section className="relative bg-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-navy-500/20 blur-3xl" />
        </div>
        <Container className="relative z-10">
          <FadeUp className="text-center mb-16">
            <SectionEyebrow className="text-coral">The Stakes</SectionEyebrow>
            <SectionHeadline className="text-white mt-2 max-w-3xl mx-auto">
              Skin cancer is the most common cancer in America. And it&apos;s still being caught too late.
            </SectionHeadline>
            <SectionSubtext className="text-gray-400 mt-4 max-w-2xl mx-auto">
              We believe precisely tracking subtle changes over time is the difference between early detection
              and late diagnosis. skinmap makes that level of care possible for every practice.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {problemStats.map(({ Icon, stat, label, sub }, i) => (
              <FadeUp key={stat} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center hover:border-coral/30 transition-colors">
                  <Icon size={28} className="text-coral mx-auto mb-4" />
                  <div className="text-4xl sm:text-5xl font-extrabold text-white mb-2">{stat}</div>
                  <p className="text-gray-300 text-sm font-medium mb-1">{label}</p>
                  <p className="text-gray-500 text-xs">{sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="max-w-2xl mx-auto text-center border border-coral/20 rounded-2xl p-8 bg-coral/5">
              <Quote size={24} className="text-coral mx-auto mb-4" />
              <p className="text-white/90 text-lg italic leading-relaxed">
                &ldquo;Precisely tracking subtle changes over time is the difference between early detection
                and late diagnosis — and we&apos;re dedicated to making this level of care possible for
                dermatology practices everywhere.&rdquo;
              </p>
              <p className="text-coral text-sm font-semibold mt-4">skinmap mission</p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* HOW IT WORKS                                                        */}
      {/* ================================================================== */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>3 Easy Steps</SectionEyebrow>
            <SectionHeadline className="mt-2">How skinmap works</SectionHeadline>
            <SectionSubtext className="mt-4 max-w-2xl mx-auto">
              Any practice. Any patient. Any member of your care team. It takes about one minute.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksSteps.map(({ number, Icon, title, description }, i) => (
              <FadeUp key={number} delay={i * 0.1}>
                <div className="relative group">
                  {/* Connector line (desktop) */}
                  {i < howItWorksSteps.length - 1 && (
                    <div
                      className="hidden md:block absolute top-10 left-[calc(50%+3rem)] right-[calc(-50%+3rem)] h-px bg-gradient-to-r from-coral/40 to-transparent"
                      aria-hidden="true"
                    />
                  )}
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-coral/10 border-2 border-coral/30 mb-6 group-hover:bg-coral/20 transition-colors">
                      <Icon size={28} className="text-coral" />
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center">
                        {number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{description}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* DUAL AUDIENCE VALUE PROPS                                           */}
      {/* ================================================================== */}
      <Section className="bg-cream">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>For Every Side of the Exam Room</SectionEyebrow>
            <SectionHeadline className="mt-2">Built for physicians. Loved by patients.</SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Physician card */}
            <FadeUp>
              <div className="bg-navy rounded-3xl p-8 sm:p-10 h-full">
                <Badge variant="clinical" size="sm" className="mb-6">For Clinicians</Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  The most comprehensive skin cancer care — without the specialist overhead.
                </h3>
                <ul className="space-y-4 mb-8">
                  {physicianBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-gray-300">
                      <CheckCircle2 size={18} className="text-coral shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="md">
                    Request Information <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeUp>

            {/* Patient card */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 h-full shadow-card">
                <Badge variant="new" size="sm" className="mb-6">For Patients</Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-navy mb-4">
                  You deserve to know what&apos;s on your skin — and whether it changed.
                </h3>
                <ul className="space-y-4 mb-8">
                  {patientBullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle2 size={18} className="text-coral shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base">{b}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/for-patients">
                  <Button variant="outline" size="md">
                    Find a Provider <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* APP FEATURE SHOWCASE (alternating rows)                             */}
      {/* ================================================================== */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>skinmap is More Than Smart Technology</SectionEyebrow>
            <SectionHeadline className="mt-2 max-w-2xl mx-auto">
              A transformational tool for total body skin care.
            </SectionHeadline>
          </FadeUp>

          <div className="space-y-24">
            {appFeatures.map(({ screen, eyebrow, title, description, callout }, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeUp key={eyebrow}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    {/* Phone mockup */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="bg-gradient-hero rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
                        <PhoneMockup screen={screen} />
                      </div>
                    </div>

                    {/* Copy */}
                    <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <SectionEyebrow className="mb-3">{eyebrow}</SectionEyebrow>
                      <h3 className="text-3xl sm:text-4xl font-bold text-navy mb-4 leading-tight">
                        {title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                        {description}
                      </p>
                      <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-4 sm:p-5">
                        <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
                          {callout}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* PRACTICE STATS                                                      */}
      {/* ================================================================== */}
      <Section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue/10 blur-3xl" />
        </div>
        <Container className="relative z-10">
          <FadeUp className="text-center mb-14">
            <SectionEyebrow className="text-coral">By the Numbers</SectionEyebrow>
            <SectionHeadline className="text-white mt-2">
              skinmap in your practice
            </SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {practiceStats.map(({ label, value, suffix, context, ...rest }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-extrabold text-coral mb-2">
                    {'prefix' in rest && rest.prefix && <span>{rest.prefix}</span>}
                    <AnimatedStat value={value} suffix={suffix} />
                  </div>
                  <div className="text-white font-semibold mb-2">{label}</div>
                  <p className="text-gray-400 text-sm">{context}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Medicare callout */}
          <FadeUp>
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <BadgeCheck size={32} className="text-coral mx-auto mb-4" />
              <h3 className="text-white font-bold text-xl mb-3">
                Reimbursed by Medicare &amp; Major Carriers
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                CPT 96904 (Total Body Photography) is covered by Medicare and major insurers for patients
                with dysplastic nevi and those with a personal or family history of melanoma. skinmap
                generates compliant documentation automatically. Patented technology. HIPAA compliant.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="md">Request Information</Button>
                </Link>
                <Link href="/product">
                  <Button variant="ghost" size="md" className="text-white border-white/20 hover:bg-white/10">Learn How It Works</Button>
                </Link>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* TESTIMONIALS                                                        */}
      {/* ================================================================== */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>What People Say</SectionEyebrow>
            <SectionHeadline className="mt-2">From clinicians and patients alike.</SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, institution, initial }, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="bg-cream rounded-2xl p-6 sm:p-8 h-full flex flex-col border border-gray-100">
                  <Quote size={24} className="text-coral mb-4 shrink-0" />
                  <p className="text-gray-700 leading-relaxed flex-1 mb-6 text-sm sm:text-base">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {initial}
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">{name}</div>
                      <div className="text-gray-500 text-xs">{role} · {institution}</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* PATIENT EMPOWERMENT BANNER                                          */}
      {/* ================================================================== */}
      <Section className="bg-gradient-teal">
        <Container>
          <FadeUp className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ask your doctor about skinmap.
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              If you have a personal or family history of melanoma, dysplastic nevi, or any skin concerns —
              you may be a candidate for Total Body Photography covered by your insurance. It takes about
              60 seconds and could make all the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/for-patients">
                <Button variant="primary" size="lg">Find a Provider Near You</Button>
              </Link>
              <Link href="/for-patients#ask">
                <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/30 border">How to Ask Your Doctor</Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                           */}
      {/* ================================================================== */}
      <Section className="bg-cream">
        <Container>
          <FadeUp className="text-center max-w-3xl mx-auto">
            <SectionEyebrow className="mb-4">Get Started</SectionEyebrow>
            <SectionHeadline className="mb-4">
              Bring More Comprehensive Skin Health to Your Practice.
            </SectionHeadline>
            <SectionSubtext className="mb-8">
              skinmap is available to dermatologists and primary care physicians across the U.S.
              A simple way to provide the most comprehensive cancer care — reimbursed by Medicare.
            </SectionSubtext>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=demo">
                <Button variant="primary" size="lg">Request Information</Button>
              </Link>
              <Link href="/product">
                <Button variant="outline" size="lg">See How It Works</Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
