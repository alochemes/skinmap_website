'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Camera,
  Cpu,
  TrendingUp,
  LayoutDashboard,
  ShieldCheck,
  CheckCircle2,
  Quote,
  ArrowRight,
  Microscope,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import {
  Section,
  SectionEyebrow,
  SectionHeadline,
  SectionSubtext,
} from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ---------------------------------------------------------------------------
// Reusable scroll-triggered fade-up wrapper
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
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Static data
// ---------------------------------------------------------------------------
const steps = [
  {
    number: '01',
    Icon: Camera,
    title: 'Photograph',
    description: 'Capture a high-res lesion image with iPhone in under 10 seconds. No extra hardware.',
  },
  {
    number: '02',
    Icon: Cpu,
    title: 'Analyze',
    description: 'Instant AI risk classification. Validated on 50,000+ clinical images. Results in the room.',
  },
  {
    number: '03',
    Icon: TrendingUp,
    title: 'Track',
    description: 'Every scan builds a longitudinal record. Side-by-side comparison at every future visit.',
  },
] as const;

const features = [
  {
    Icon: TrendingUp,
    title: 'Longitudinal Skin Tracking',
    description:
      'Side-by-side comparison across every visit. Catch the subtle changes a single exam misses.',
  },
  {
    Icon: Cpu,
    title: 'AI-Powered Risk Stratification',
    description:
      '90% sensitivity. 90% specificity. Risk classification in under 3 seconds across diverse skin tones.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Patient Management Dashboard',
    description:
      'Search, filter, and review your full patient panel — by name, risk level, or scan history. One screen.',
  },
  {
    Icon: ShieldCheck,
    title: 'HIPAA-Compliant by Design',
    description:
      'AES-256 encryption. Full HIPAA compliance. Built for clinical environments where privacy is a requirement.',
  },
] as const;

const stats = [
  {
    label: 'Sensitivity',
    value: '90%',
    context: 'Validated in internal testing across 50,000+ annotated clinical images.',
  },
  {
    label: 'Specificity',
    value: '90%',
    context: 'Confirmed in IRB-approved studies across multiple clinical sites.',
  },
  {
    label: 'Clinical Images Validated',
    value: '50,000+',
    context: 'Diverse dataset spanning skin types, lesion morphologies, and clinical settings.',
  },
] as const;

const testimonials = [
  {
    quote:
      "skinmap has fundamentally changed how I follow suspicious lesions. I used to rely on hand-drawn maps and verbal notes. Now I have a side-by-side AI comparison at every visit — and I've caught two melanomas earlier than I would have under my previous workflow.",
    name: 'Dr. Sarah Chen, MD',
    role: 'Dermatologist',
    institution: 'University Medical Center',
    initial: 'S',
  },
  {
    quote:
      "As a primary care physician, I see dozens of patients daily with skin concerns I'm not fully equipped to evaluate with confidence. skinmap gives me clinical-grade AI at the point of care — so I can either reassure patients or refer them with objective data, not just a gut feeling.",
    name: 'Dr. Marcus Williams, MD',
    role: 'Family Medicine',
    institution: 'Community Health Network',
    initial: 'M',
  },
  {
    quote:
      'My doctor started using skinmap six months ago and it changed my peace of mind completely. She can show me exactly what changed on a mole since my last visit. That kind of tracking used to take three specialist referrals.',
    name: 'Jennifer M.',
    role: 'skinmap patient',
    institution: 'California',
    initial: 'J',
  },
] as const;

const partnerLogos = [
  'University Medical Center',
  'Regional Health System',
  'Academic Dermatology Group',
  'National Cancer Institute',
  'Primary Care Alliance',
] as const;

const physicianBullets = [
  'AI risk stratification in under 10 seconds',
  'Side-by-side lesion comparison at every visit — no extra hardware',
  'Full patient skin history in one dashboard',
] as const;

const patientBullets = [
  'Every lesion tracked across every visit, not just today\'s',
  'AI catches subtle changes the eye misses',
  'Ask your doctor about skinmap at your next appointment',
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
                  Clinical-Grade Dermatology AI
                </Badge>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
                  Every Mole.
                  <br />
                  Every Patient.
                  <br />
                  <span className="text-coral">Every Visit.</span>
                </h1>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
                  Clinical-grade AI for skin health tracking. Catch what the eye misses.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact?type=demo">
                    <Button variant="primary" size="lg">
                      Request a Demo
                      <ArrowRight size={18} aria-hidden="true" />
                    </Button>
                  </Link>
                  <Link href="/contact?type=patient">
                    <Button variant="outline-white" size="lg">
                      Ask Your Doctor
                    </Button>
                  </Link>
                </div>
              </FadeUp>

              {/* Trust row */}
              <FadeUp delay={0.4}>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-10 pt-10 border-t border-white/10 text-xs text-gray-400 font-medium">
                  {['HIPAA', 'FDA De Novo', 'IRB-Validated'].map(
                    (t) => (
                      <span key={t} className="flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-coral" aria-hidden="true" />
                        {t}
                      </span>
                    )
                  )}
                </div>
              </FadeUp>
            </div>

            {/* Right: app image
                TODO: Replace this mockup with a real image.
                Generate with Gemini Imagen:
                "A dermatologist holding an iPhone showing a dark-themed medical app with a skin scan,
                 AI risk score overlay, and side-by-side lesion comparison. Clinical office, warm light."
                Save as public/images/hero-app.png and use:
                <Image src="/images/hero-app.png" alt="skinmap app showing AI skin scan analysis" width={320} height={680} className="rounded-[2.5rem] shadow-2xl" />
            */}
            <FadeUp delay={0.2} className="flex justify-center lg:justify-end">
              <div className="relative" aria-label="skinmap app preview" role="img">
                <div
                  className="absolute inset-0 scale-110 rounded-[3rem] bg-coral/20 blur-2xl"
                  aria-hidden="true"
                />
                <div className="relative w-64 sm:w-72 lg:w-80 aspect-[9/19] rounded-[2.5rem] bg-navy-800 border-4 border-white/20 shadow-2xl overflow-hidden">
                  {/* Status bar notch */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-navy-900/80 flex items-center justify-center">
                    <div className="w-20 h-4 rounded-full bg-navy-900/60" />
                  </div>
                  {/* App UI */}
                  <div className="absolute inset-0 pt-10 px-4 pb-4 flex flex-col gap-3">
                    {/* Patient header */}
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
                      <div className="w-8 h-8 rounded-full bg-coral/30 shrink-0" aria-hidden="true" />
                      <div>
                        <div className="h-2.5 w-20 rounded-full bg-white/40 mb-1.5" />
                        <div className="h-2 w-14 rounded-full bg-white/20" />
                      </div>
                      <div className="ml-auto">
                        <Badge variant="new" size="sm">High Risk</Badge>
                      </div>
                    </div>
                    {/* Scan comparison */}
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="h-2 w-24 rounded-full bg-white/20 mb-3" />
                      <div className="grid grid-cols-2 gap-2">
                        {['Mar 2024', 'Jan 2025'].map((label, i) => (
                          <div
                            key={label}
                            className={`aspect-square rounded-lg flex items-center justify-center ${
                              i === 1
                                ? 'bg-gradient-to-br from-coral/30 to-blue/30 border border-coral/40'
                                : 'bg-gradient-to-br from-coral/20 to-blue/20'
                            }`}
                          >
                            <span className="text-xs text-white/40">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Risk bars */}
                    <div className="bg-white/5 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-2 w-16 rounded-full bg-white/20" />
                        <Badge variant="new" size="sm">90% match</Badge>
                      </div>
                      <div className="space-y-1.5">
                        {[80, 55, 30].map((w, i) => (
                          <div key={i} className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full rounded-full bg-coral/60" style={{ width: `${w}%` }} />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Stats mini row */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Lesions', val: '12' },
                        { label: 'Tracked', val: '8' },
                        { label: 'Flagged', val: '2' },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-white/5 rounded-xl p-2 text-center">
                          <div className="text-lg font-bold text-white">{val}</div>
                          <div className="text-2xs text-white/40">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
        </motion.div>
      </section>

      {/* ================================================================== */}
      {/* SOCIAL PROOF BAR                                                    */}
      {/* ================================================================== */}
      <section className="bg-cream border-y border-gray-100 py-10" aria-label="Trusted by">
        <Container>
          <FadeUp>
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
              Trusted at leading institutions
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div
              className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
              role="list"
              aria-label="Partner institutions"
            >
              {partnerLogos.map((name) => (
                <div
                  key={name}
                  role="listitem"
                  className="h-10 px-5 rounded-lg bg-gray-200/60 flex items-center"
                >
                  <span className="text-xs font-medium text-gray-400 whitespace-nowrap">{name}</span>
                </div>
              ))}
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-center text-xs text-gray-400 mt-8">
              Validated across dermatology practices, primary care, and academic medical centers.
            </p>
          </FadeUp>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* DUAL AUDIENCE VALUE PROPS                                           */}
      {/* ================================================================== */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Built for Physicians. Requested by Patients.</SectionEyebrow>
            <SectionHeadline className="text-navy max-w-2xl mx-auto mt-2">
              Two audiences. One platform. One shared goal.
            </SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Physicians */}
            <FadeUp delay={0.1}>
              <div className="relative rounded-3xl bg-navy p-8 lg:p-10 overflow-hidden">
                <div
                  className="absolute top-0 right-0 w-48 h-48 rounded-full bg-coral/10 blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
                <Badge variant="new" className="mb-6">For Physicians</Badge>
                <h3 className="text-2xl font-bold text-white mb-6 leading-snug">
                  The AI co-pilot that works as hard as you do.
                </h3>
                <ul className="space-y-4" role="list">
                  {physicianBullets.map((text) => (
                    <li key={text} className="flex gap-3 items-start">
                      <CheckCircle2 size={18} className="text-coral mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-gray-300 text-sm leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact?type=demo">
                    <Button variant="primary" size="md">
                      Request a Demo
                      <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeUp>

            {/* Patients */}
            <FadeUp delay={0.2}>
              <div className="relative rounded-3xl bg-cream p-8 lg:p-10 border border-gray-200 overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue/10 blur-2xl pointer-events-none"
                  aria-hidden="true"
                />
                <Badge variant="clinical" className="mb-6">For Patients</Badge>
                <h3 className="text-2xl font-bold text-navy mb-6 leading-snug">
                  Know what&apos;s happening on your skin before it becomes a problem.
                </h3>
                <ul className="space-y-4" role="list">
                  {patientBullets.map((text) => (
                    <li key={text} className="flex gap-3 items-start">
                      <CheckCircle2 size={18} className="text-blue mt-0.5 shrink-0" aria-hidden="true" />
                      <span className="text-gray-600 text-sm leading-relaxed">{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/contact?type=patient">
                    <Button variant="outline" size="md">
                      Ask Your Doctor About skinmap
                      <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                  </Link>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* HOW IT WORKS                                                        */}
      {/* ================================================================== */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>How It Works</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">
              From Capture to Clinical Insight in Seconds
            </SectionHeadline>
          </FadeUp>

          {/*
            TODO: Replace the cards below with a Napkin AI diagram.
            Go to napkin.ai, paste this text, and choose "Flow" diagram:
            "3-step process. Step 1: Photograph — capture lesion with iPhone in 10 seconds.
             Step 2: Analyze — instant AI risk classification, validated on 50,000+ images.
             Step 3: Track — longitudinal record, side-by-side comparison at every visit."
            Export as PNG, save to public/images/how-it-works.png, then replace this section
            with: <Image src="/images/how-it-works.png" alt="How skinmap works" width={900} height={300} className="w-full" />
          */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 relative">
            {/* Connecting line (desktop only) */}
            <div
              className="hidden md:block absolute top-10 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-coral/20 via-coral/50 to-coral/20"
              aria-hidden="true"
            />
            {steps.map(({ number, Icon, title, description }, i) => (
              <FadeUp key={title} delay={i * 0.12}>
                <div className="relative text-center px-4">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-white shadow-card flex items-center justify-center">
                      <Icon size={28} className="text-coral" aria-hidden="true" />
                    </div>
                    <span
                      className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center"
                      aria-hidden="true"
                    >
                      {number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* KEY FEATURES                                                        */}
      {/* ================================================================== */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>Platform Features</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2 max-w-xl mx-auto">
              Everything a dermatology practice needs. In one iPhone app.
            </SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {features.map(({ Icon, title, description }) => (
              <Card key={title} variant="feature" animate>
                <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-coral" aria-hidden="true" />
                </div>
                <CardTitle className="text-navy text-xl mb-3">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </Card>
            ))}
          </div>

          <FadeUp className="text-center mt-12">
            <Link href="/product">
              <Button variant="outline" size="md">
                See the Full Technology
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </Link>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* CLINICAL EVIDENCE                                                   */}
      {/* ================================================================== */}
      <Section background="navy" aria-label="Clinical evidence">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow className="text-coral">Clinical Validation</SectionEyebrow>
            <SectionHeadline className="text-white mt-2">
              The Data Behind Every Diagnosis
            </SectionHeadline>
          </FadeUp>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {stats.map(({ label, value, context }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="text-center p-8 rounded-3xl bg-white/5 border border-white/10">
                  <div className="text-5xl lg:text-6xl font-extrabold text-coral mb-2 tracking-tight">
                    {value}
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">
                    {label}
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{context}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Study callout */}
          <FadeUp>
            <div className="rounded-3xl bg-white/5 border border-white/10 p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-coral/20 flex items-center justify-center">
                  <Microscope size={20} className="text-coral" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-sm font-semibold uppercase tracking-widest text-coral">
                      IRB-Approved Validation Study
                    </span>
                    <Badge variant="clinical" size="sm">Peer Review Pending</Badge>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    IRB-approved prospective study. skinmap matched board-certified dermatologist
                    accuracy — 90% sensitivity and 90% specificity — across a diverse patient population.
                    Full study data available on request.
                  </p>
                  <div className="mt-6">
                    <Link href="/contact?type=demo">
                      <Button variant="outline-white" size="sm">
                        Request Clinical Study Data
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* TESTIMONIALS                                                        */}
      {/* ================================================================== */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-16">
            <SectionEyebrow>Physician Testimonials</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">
              What Physicians Are Saying
            </SectionHeadline>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map(({ quote, name, role, institution, initial }, i) => (
              <FadeUp key={name} delay={i * 0.1}>
                <div className="h-full flex flex-col rounded-3xl bg-white p-7 shadow-card">
                  <Quote size={28} className="text-coral/30 mb-4 shrink-0" aria-hidden="true" />
                  <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div
                      className="w-10 h-10 rounded-full bg-navy/10 shrink-0 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <span className="text-sm font-bold text-navy">{initial}</span>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-navy">{name}</div>
                      <div className="text-xs text-gray-400">
                        {role} &middot; {institution}
                      </div>
                    </div>
                  </footer>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================== */}
      {/* PATIENT EMPOWERMENT BANNER                                          */}
      {/* ================================================================== */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-coral"
        aria-label="Patient empowerment"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy/20 blur-3xl" />
        </div>
        <Container className="relative z-10 text-center">
          <FadeUp>
            <p className="eyebrow text-white/70 mb-4">For Patients</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
              You deserve to know
              <br className="hidden sm:block" />
              {' '}what&apos;s on your skin.
            </h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
              Ask your doctor about skinmap at your next appointment.
            </p>
            <Link href="/contact?type=patient">
              <Button variant="secondary" size="lg">
                Ask Your Doctor
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
            </Link>
          </FadeUp>
        </Container>
      </section>

      {/* ================================================================== */}
      {/* FINAL PHYSICIAN CTA                                                 */}
      {/* ================================================================== */}
      <Section background="white" tight>
        <Container className="text-center">
          <FadeUp>
            <SectionEyebrow>Get Started</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2 max-w-2xl mx-auto">
              Ready to bring AI to your practice?
            </SectionHeadline>
            <SectionSubtext className="mx-auto mt-4 mb-10">
              Request a demo. See it in your workflow in minutes.
            </SectionSubtext>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?type=demo">
                <Button variant="primary" size="lg">
                  Request a Demo
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/product">
                <Button variant="outline" size="lg">
                  Explore the Technology
                </Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
