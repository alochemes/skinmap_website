'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';
import { FLAGS, HOMEPAGE_HERO_CTA_VARIANTS, type HomepageHeroCtaVariant } from '@/lib/flags';
import {
  Camera,
  TrendingUp,
  LayoutDashboard,
  CheckCircle2,
  Quote,
  ArrowRight,
  Clock,
  FileText,
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
function PhoneMockup({
  screen,
  imageSrc,
}: {
  screen: 'scan' | 'compare' | 'dashboard' | 'report';
  imageSrc?: string;
}) {
  return (
    <div className="relative flex justify-center" aria-hidden="true">
      <div className="absolute inset-0 scale-105 rounded-[3rem] bg-navy-500/10 blur-2xl" />
      <div className="relative w-56 sm:w-64 aspect-[9/19] rounded-[2.2rem] bg-navy-800 border-4 border-white/20 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-7 bg-navy-900/80 flex items-center justify-center">
          <div className="w-16 h-3 rounded-full bg-navy-900/60" />
        </div>

        {/* Real screenshot — drop a PNG in public/images/screens/ and pass imageSrc */}
        {imageSrc ? (
          <div className="absolute inset-0 pt-7">
            <Image
              src={imageSrc}
              alt={`skinmap app — ${screen} screen`}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 224px, 256px"
            />
          </div>
        ) : (
        /* Coded fallback UI */
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
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------

const howItWorksSteps = [
  {
    number: '01',
    Icon: Camera,
    title: 'Capture',
    description:
      'Your MA or nurse uses a standard iPhone. Full-body scan done in ~60 seconds. No specialist training. No special room.',
  },
  {
    number: '02',
    Icon: TrendingUp,
    title: 'Compare',
    description:
      'At every return visit, the prior scan surfaces automatically — side-by-side, dated, documentable. See exactly what changed.',
  },
  {
    number: '03',
    Icon: CheckCircle2,
    title: 'Act Early',
    description:
      'New or evolving spots are flagged for physician review. Stage I vs. Stage IV — the difference is acting early.',
  },
] as const;

const appFeatures = [
  {
    screen: 'scan' as const,
    eyebrow: 'Full-Body Capture',
    title: 'A complete skin map in ~60 seconds.',
    description:
      'Any MA or nurse. One iPhone. About one minute. Over 90% of patients opt in when offered.',
    callout: 'Conventional TBP systems cost tens of thousands. skinmap starts at ~$1,400.',
    icon: Camera,
  },
  {
    screen: 'compare' as const,
    eyebrow: 'Visit-Over-Visit Comparison',
    title: 'See exactly what changed.',
    description:
      'Every scan is stored, encrypted, HIPAA-compliant. At follow-up, the prior scan surfaces automatically — side-by-side, dated, documentable.',
    callout: 'Catch the slow progressions that written notes and memory miss.',
    icon: TrendingUp,
  },
  {
    screen: 'dashboard' as const,
    eyebrow: 'Patient Management',
    title: 'Your entire panel. One screen.',
    description:
      'Every patient. Full scan history. Flagged lesions. Due for follow-up. All searchable, all filterable, all in one view.',
    callout: 'Longitudinal skin tracking that used to require specialty infrastructure — now in any practice.',
    icon: LayoutDashboard,
  },
  {
    screen: 'report' as const,
    eyebrow: 'Medicare Reimbursed',
    title: 'Covered by Medicare. Claim ready.',
    description:
      'CPT 96904 covers eligible patients with dysplastic nevi or a melanoma history. skinmap generates claim documentation automatically.',
    callout: 'Add a reimbursed service and raise your standard of care — at the same time.',
    icon: DollarSign,
  },
] as const;

const practiceStats = [
  {
    label: 'Scan time',
    value: 90,
    suffix: 's',
    context: '',
  },
  {
    label: 'Patient opt-in',
    value: 80,
    suffix: '%',
    context: 'Patients opt-in when offered as part of routine care.',
  },
  {
    label: 'Starting cost',
    prefix: '~$',
    value: 1400,
    suffix: '',
    context: 'vs. $50K–$200K for conventional TBP systems.',
  },
] as const;

const testimonials = [
  {
    quote:
      "skinmap has fundamentally changed how I follow suspicious lesions. I used to rely on hand-drawn maps and verbal notes. Now I have a side-by-side visual comparison at every visit.",
    name: 'Board-Certified Dermatologist',
    role: 'Private Practice',
    institution: 'United States',
    initial: 'D',
  },
  {
    quote:
      "Knowing my dermatologist is using skinmap makes me feel like nothing will slip through the cracks.",
    name: 'Verified Patient',
    role: 'Dermatology Practice',
    institution: 'United States',
    initial: 'P',
  },
  {
    quote:
      "The process was fast and easy — and it's kind of amazing to see your skin this way.",
    name: 'Verified Patient',
    role: 'Dermatology Practice',
    institution: 'United States',
    initial: 'P',
  },
] as const;

const partnerLogos = [
  'Medicare Covered (CPT 96904)',
  'HIPAA Compliant',
  'Patented Technology',
  'IRB-Validated',
  'Major Insurers Accepted',
] as const;



// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HomePage() {
  const heroCtaVariant = useFeatureFlag(
    FLAGS.HOMEPAGE_HERO_CTA,
    'control',
  ) as HomepageHeroCtaVariant;
  const heroCta = HOMEPAGE_HERO_CTA_VARIANTS[heroCtaVariant] ?? HOMEPAGE_HERO_CTA_VARIANTS.control;

  return (
    <>
      {/* ================================================================== */}
      {/* HERO                                                                */}
      {/* ================================================================== */}
      <section
        className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-white"
        aria-label="Hero"
      >
        <Container className="relative z-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              <FadeUp>
                <Badge variant="new" className="mb-6">
                  Now available to dermatologists across the U.S.
                </Badge>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-navy-500 tracking-tight leading-[1.05] mb-6">
                  See What Changed.
                  <br />
                  <span className="text-coral">Catch It Early.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl">
                  Full-body skin scans in ~90 seconds. iPhone only. No extra room, no expensive hardware,
                  no specialist. Any member of your team can do it.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?type=demo">
                    <Button variant="primary" size="lg">{heroCta.physician}</Button>
                  </Link>
                  <Link href="/for-patients">
                    <Button variant="outline" size="lg">{heroCta.patient}</Button>
                  </Link>
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
                  {[
                    { Icon: BadgeCheck, text: 'Medicare Reimbursed (CPT 96904)' },
                    { Icon: Smartphone, text: 'iPhone App — No Hardware' },
                    { Icon: Clock, text: '~90 Second Full-Body Scan' },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
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
      <div className="bg-navy border-y border-white/10 py-5" aria-label="Trust signals">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {partnerLogos.map((name) => (
              <div key={name} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                <CheckCircle2 size={14} className="text-coral shrink-0" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* ================================================================== */}
      {/* WHY PHYSICIANS CHOOSE SKINMAP                                       */}
      {/* ================================================================== */}
      <Section className="bg-cream">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Why Physicians Choose skinmap</SectionEyebrow>
            <SectionHeadline className="text-navy-500 mt-2 max-w-2xl mx-auto">
              Built for the way practices actually work.
            </SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeUp delay={0}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-card-hover transition-shadow duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6">
                  <DollarSign size={24} className="text-coral" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">New Revenue Stream</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  CPT 96904. Medicare reimburses Total Body Photography. Add a billable
                  service to your existing patient flow — no new hardware, no new staff.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-card-hover transition-shadow duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6">
                  <Clock size={24} className="text-coral" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">~90 Seconds Per Patient</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Your MA captures the full-body scan. You review the AI-analyzed report.
                  No specialist training. No separate appointment. No disruption to your workflow.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-card-hover transition-shadow duration-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6">
                  <TrendingUp size={24} className="text-coral" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-3">Catch What Single Exams Miss</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  skinmap compares visit-over-visit, flagging lesions that have changed. The
                  ones that looked fine last year — but don&apos;t look the same today.
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* HOW IT WORKS                                                        */}
      {/* ================================================================== */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>Clinical Workflow</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">How skinmap works</SectionHeadline>
            <SectionSubtext className="mt-4 max-w-xl mx-auto">
              Any practice. Any patient. About one minute.
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
      {/* TBP COMPARISON                                                      */}
      {/* ================================================================== */}
      <Section className="bg-cream">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>The Difference</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2 max-w-2xl mx-auto">
              Total Body Photography — reimagined for every practice.
            </SectionHeadline>
            <SectionSubtext className="mt-4 max-w-xl mx-auto">
              Traditional TBP requires a six-figure system and a dedicated technician.
              skinmap runs on the iPhone already in your pocket.
            </SectionSubtext>
          </FadeUp>

          <FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">

              {/* Old way */}
              <div className="bg-white rounded-2xl p-8 border border-gray-100 opacity-60">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-7">Traditional TBP</p>
                <ul className="space-y-4">
                  {[
                    '$50,000–$200,000 equipment cost',
                    'Dedicated room and trained technician',
                    '20–40 minutes per patient',
                    'Manual visit-to-visit comparison',
                    'Manual billing documentation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-400 text-sm leading-snug">
                      <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center shrink-0 mt-0.5" aria-hidden="true">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* skinmap */}
              <div className="bg-navy rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-coral/10 blur-2xl pointer-events-none" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-7">skinmap</p>
                <ul className="space-y-4">
                  {[
                    'Starting at ~$1,400',
                    'Any exam room. Any MA or nurse.',
                    '~90 seconds per patient',
                    'AI-powered visit-over-visit comparison',
                    'Auto-generated Medicare claim documentation',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-200 text-sm leading-snug">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* APP FEATURE SHOWCASE (alternating rows)                             */}
      {/* ================================================================== */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>The Platform</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">Total body skin care. One iPhone.</SectionHeadline>
          </FadeUp>

          <div className="space-y-16">
            {appFeatures.map(({ screen, eyebrow, title, description, callout }, i) => {
              const isEven = i % 2 === 0;
              return (
                <FadeUp key={eyebrow}>
                  <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
                    {/* Phone mockup */}
                    <div className={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div className="bg-cream rounded-3xl p-12 flex items-center justify-center min-h-[400px]">
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
                    <>
                      {'prefix' in rest && rest.prefix && <span>{rest.prefix as string}</span>}
                      <AnimatedStat value={value as number} suffix={suffix as string} />
                    </>
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
                CPT 96904 covers eligible patients with dysplastic nevi or a melanoma history.
                skinmap generates compliant claim documentation automatically. HIPAA compliant. Patented.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="md">Request a Demo</Button>
                </Link>
                <Link href="/product">
                  <Button variant="outline-white" size="md">Learn How It Works</Button>
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
            <SectionEyebrow>What Physicians &amp; Patients Say</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">Real outcomes. Real practices.</SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ quote, name, role, institution, initial }, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-6 sm:p-8 h-full flex flex-col border ${
                  i === 0
                    ? 'bg-navy-500/5 border-navy-500/20'
                    : 'bg-cream border-gray-100'
                }`}>
                  <Quote size={24} className="text-coral mb-4 shrink-0" />
                  <p className={`leading-relaxed flex-1 mb-6 ${
                    i === 0
                      ? 'text-navy text-base sm:text-lg font-medium'
                      : 'text-gray-700 text-sm sm:text-base'
                  }`}>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 ${
                      i === 0 ? 'bg-navy-500' : 'bg-navy'
                    }`}>
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
      <Section className="bg-navy">
        <Container>
          <FadeUp className="text-center max-w-3xl mx-auto">
            <SectionEyebrow className="text-coral mb-4">For Patients</SectionEyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              You deserve to know what&apos;s on your skin.
            </h2>
            <p className="text-white/80 text-lg mb-8 leading-relaxed">
              History of melanoma or dysplastic nevi? You may be covered.
              Ask your doctor about skinmap at your next appointment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/for-patients">
                <Button variant="primary" size="lg">Find a Provider Near You</Button>
              </Link>
              <Link href="/for-patients#ask">
                <Button variant="outline-white" size="lg">How to Ask Your Doctor</Button>
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
            <SectionHeadline className="text-navy mb-4">
              Add skinmap to Your Practice
            </SectionHeadline>
            <SectionSubtext className="mb-8">
              Available to dermatologists and primary care physicians across the U.S. Medicare reimbursed.
            </SectionSubtext>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact?type=demo">
                <Button variant="primary" size="lg">Request a Demo</Button>
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
