'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  GitCompareArrows,
  BadgeCheck,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  Clock,
  Shield,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section, SectionEyebrow, SectionHeadline, SectionSubtext } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ---------------------------------------------------------------------------
// FadeUp
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
// Animated stat counter
// ---------------------------------------------------------------------------
function AnimatedStat({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v).toLocaleString());
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { motionVal.set(value); return; }
    const ctrl = animate(motionVal, value, { duration: 1.8, ease: 'easeOut' });
    return ctrl.stop;
  }, [inView, value, motionVal, reduced]);

  return <span ref={ref}><motion.span>{rounded}</motion.span>{suffix}</span>;
}

// ---------------------------------------------------------------------------
// Sticky feature navigator (desktop only)
// ---------------------------------------------------------------------------
const featureSections = [
  { id: 'capture',    label: 'Capture' },
  { id: 'compare',   label: 'Compare' },
  { id: 'manage',    label: 'Manage' },
  { id: 'reimburse', label: 'Reimburse' },
];

function FeatureNav() {
  const [active, setActive] = useState(featureSections[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    featureSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-40"
      aria-label="Feature sections"
    >
      {featureSections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          className="group flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span
            className={`block h-2 w-2 rounded-full transition-all duration-300 ${
              active === id ? 'bg-coral scale-150' : 'bg-white/30 group-hover:bg-white/60'
            }`}
          />
          <span
            className={`text-xs font-medium transition-opacity duration-300 ${
              active === id ? 'text-coral opacity-100' : 'text-white/0 group-hover:text-white/60 group-hover:opacity-100'
            }`}
          >
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}

// ---------------------------------------------------------------------------
// Phone mockup
// ---------------------------------------------------------------------------
function PhoneMockup({ screen }: { screen: 'capture' | 'compare' | 'dashboard' | 'billing' }) {
  return (
    <div className="relative flex justify-center" aria-hidden="true">
      <div className="absolute inset-0 scale-105 rounded-[3rem] bg-coral/20 blur-2xl" />
      <div className="relative w-56 sm:w-64 aspect-[9/19] rounded-[2.2rem] bg-navy-800 border-4 border-white/20 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-7 bg-navy-900/80 flex items-center justify-center">
          <div className="w-16 h-3 rounded-full bg-navy-900/60" />
        </div>

        <div className="absolute inset-0 pt-9 px-3 pb-3 flex flex-col gap-2">
          {screen === 'capture' && (
            <>
              <div className="bg-white/5 rounded-xl p-2.5 flex items-center gap-2">
                <Camera size={14} className="text-coral shrink-0" />
                <div className="text-2xs text-white/70 font-medium">Full-Body Capture</div>
                <div className="ml-auto text-2xs text-coral">~60s</div>
              </div>
              <div className="bg-gradient-to-br from-navy-700/60 to-navy-800/80 rounded-xl flex-1 flex items-center justify-center border border-white/10">
                <div className="text-center space-y-2">
                  <div className="w-12 h-18 mx-auto rounded-xl bg-white/10 border-2 border-coral/40 flex items-center justify-center">
                    <Camera size={20} className="text-coral" />
                  </div>
                  <div className="text-2xs text-white/50">Capturing front...</div>
                  <div className="w-20 h-1.5 rounded-full bg-white/10 mx-auto overflow-hidden">
                    <div className="h-full rounded-full bg-coral/70 w-3/5" />
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-2 flex items-center gap-2">
                <CheckCircle2 size={11} className="text-coral shrink-0" />
                <div className="text-2xs text-white/60">47 high-res photos captured</div>
              </div>
            </>
          )}

          {screen === 'compare' && (
            <>
              <div className="text-2xs text-white/50 text-center mb-1">Side-by-Side Comparison</div>
              <div className="grid grid-cols-2 gap-2 flex-1">
                {[
                  { date: 'Mar 2024', changed: false },
                  { date: 'Jan 2025', changed: true },
                ].map(({ date, changed }) => (
                  <div
                    key={date}
                    className={`rounded-xl flex flex-col items-center justify-center gap-1.5 p-2 ${
                      changed
                        ? 'bg-coral/20 border border-coral/40'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="w-10 h-12 rounded-md bg-white/10 border border-white/20" />
                    <span className="text-2xs text-white/50">{date}</span>
                    {changed && (
                      <span className="text-2xs text-coral font-semibold">Changed</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-coral/10 border border-coral/30 rounded-xl p-2 text-center">
                <div className="text-2xs text-coral font-semibold">New lesion — flag for review</div>
              </div>
            </>
          )}

          {screen === 'dashboard' && (
            <>
              <div className="flex items-center gap-1.5 mb-1">
                <div className="h-2 w-20 rounded-full bg-white/20" />
                <div className="text-2xs text-coral ml-auto">84 patients</div>
              </div>
              {[
                { name: 'Johnson, K.', status: 'Review', color: 'bg-coral/70' },
                { name: 'Patel, S.',   status: 'Clear',  color: 'bg-teal/70' },
                { name: 'Garcia, M.', status: 'Due',    color: 'bg-blue/70' },
              ].map(({ name, status, color }) => (
                <div key={name} className="flex items-center gap-2 bg-white/5 rounded-lg p-1.5">
                  <div className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                  <div className="h-1.5 rounded-full bg-white/20 flex-1" />
                  <span className="text-2xs text-white/40">{status}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-1 mt-1">
                {[{ l: 'Total', v: '84' }, { l: 'Due', v: '12' }, { l: 'Flag', v: '3' }].map(({ l, v }) => (
                  <div key={l} className="bg-white/5 rounded-md p-1.5 text-center">
                    <div className="text-xs font-bold text-white">{v}</div>
                    <div className="text-2xs text-white/40">{l}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {screen === 'billing' && (
            <>
              <div className="bg-coral/10 border border-coral/25 rounded-xl p-2.5">
                <div className="text-2xs text-coral font-bold mb-1">CPT 96904 — TBP</div>
                <div className="text-2xs text-white/60">Total Body Photography</div>
                <div className="text-2xs text-white/50 mt-1">Medicare · Major Insurers</div>
              </div>
              <div className="bg-white/5 rounded-xl p-2.5 space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={11} className="text-coral" />
                  <div className="h-1.5 rounded-full bg-white/20 flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={11} className="text-coral" />
                  <div className="h-1.5 rounded-full bg-white/15 flex-1" />
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={11} className="text-coral" />
                  <div className="h-1.5 rounded-full bg-white/10 flex-1" />
                </div>
              </div>
              <div className="bg-coral/20 rounded-xl p-2.5 flex items-center justify-center gap-1.5 border border-coral/30">
                <ArrowRight size={11} className="text-coral" />
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
// Page component
// ---------------------------------------------------------------------------
export default function ProductPageClient() {
  return (
    <>
      <FeatureNav />

      {/* ================================================================ */}
      {/* HERO                                                              */}
      {/* ================================================================ */}
      <section
        className="relative pt-32 pb-20 overflow-hidden bg-white"
        aria-label="Product hero"
      >
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <FadeUp>
            <Badge variant="new" className="mb-6">Total Body Photography · Skinmap</Badge>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-500 tracking-tight leading-tight mb-6">
              Full-body skin scans.
              <br />
              <span className="text-coral">60 seconds. Any iPhone.</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
              Skinmap brings Total Body Photography to any practice — an iPhone, 60 seconds, and no
              additional hardware. No expensive equipment. No specialist training. Reimbursed by
              Medicare. HIPAA compliant. Patented technology.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=demo">
                <Button variant="primary" size="lg">Request a Demo</Button>
              </Link>
              <Link href="#capture">
                <Button variant="outline" size="lg">See How It Works <ArrowRight size={16} className="ml-2" /></Button>
              </Link>
            </div>
          </FadeUp>

          {/* Trust pills */}
          <FadeUp delay={0.4}>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              {[
                { Icon: BadgeCheck, text: 'Medicare Covered (CPT 96904)' },
                { Icon: Lock,       text: 'HIPAA Compliant · Patented' },
                { Icon: Smartphone, text: 'iPhone 12 Pro or Later' },
                { Icon: Clock,      text: '~60 Second Scan' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                  <Icon size={14} className="text-coral shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SECTION 1: CAPTURE                                               */}
      {/* ================================================================ */}
      <section id="capture" className="py-24 bg-white scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Phone */}
            <div className="bg-gradient-hero rounded-3xl p-12 flex items-center justify-center min-h-[440px]">
              <PhoneMockup screen="capture" />
            </div>
            {/* Copy */}
            <div>
              <FadeUp>
                <SectionEyebrow className="mb-3">Step 1 — Capture</SectionEyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-5 leading-tight">
                  A complete skin map in about 60 seconds.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                  Using a specifically configured iPhone 12 Pro or later, your medical assistant or nurse
                  captures high-resolution 3D photo records of the entire skin surface. No specialist
                  training required — any member of your practice can collect a Skinmap.
                </p>
                <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-5 mb-8">
                  <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
                    Unlike conventional TBP systems that require tens of thousands in upfront equipment,
                    Skinmap gets your practice started for approximately $1,400 — an iPhone and an
                    illuminating light.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Full body captured in approximately 60 seconds',
                    'High-resolution images with real-time feedback',
                    'No extra office space or specialty hardware needed',
                    'Medical assistants and nurses can perform Skinmaps',
                    'Over 90% of patients opted in during our clinical pilot program',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SECTION 2: COMPARE                                               */}
      {/* ================================================================ */}
      <section id="compare" className="py-24 bg-cream scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Copy */}
            <div>
              <FadeUp>
                <SectionEyebrow className="mb-3">Step 2 — Compare</SectionEyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-5 leading-tight">
                  See exactly what changed since the last visit.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                  Patient privacy is a priority — all images are encrypted, securely stored, and never
                  shared outside the care team. At each follow-up visit, Skinmap automatically surfaces
                  the previous scan for direct side-by-side comparison.
                </p>
                <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-5 mb-8">
                  <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
                    Surface the slow, subtle progressions that written notes and memory were never
                    designed to catch — and document them objectively.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Automatic side-by-side comparison at every follow-up',
                    'New or evolving spots flagged for physician review',
                    'Images stored with date, session, and patient identity',
                    'AES-256 encrypted · HIPAA-compliant storage',
                    'Change detection backed by AI technology',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            {/* Phone */}
            <div className="bg-gradient-hero rounded-3xl p-12 flex items-center justify-center min-h-[440px]">
              <PhoneMockup screen="compare" />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SECTION 3: MANAGE                                                */}
      {/* ================================================================ */}
      <section id="manage" className="py-24 bg-white scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Phone */}
            <div className="bg-gradient-hero rounded-3xl p-12 flex items-center justify-center min-h-[440px]">
              <PhoneMockup screen="dashboard" />
            </div>
            {/* Copy */}
            <div>
              <FadeUp>
                <SectionEyebrow className="mb-3">Step 3 — Act Early</SectionEyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-5 leading-tight">
                  Your entire panel. One screen.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                  Every patient has a dedicated Skinmap profile with their full scan history, body map,
                  and flagged areas — all searchable and filterable. Surface every patient due for
                  follow-up, or every flagged lesion across your entire practice in a single view.
                </p>
                <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-5 mb-8">
                  <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
                    Any dermatology or primary care practice can now offer the longitudinal skin
                    tracking that previously required specialty-level infrastructure.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'Full scan history per patient — searchable and filterable',
                    'Body map with annotated lesion locations',
                    'Automated follow-up reminders',
                    'Flag high-priority patients for immediate review',
                    'Suitable for PCPs, dermatologists, and oncologists',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* SECTION 4: REIMBURSEMENT                                         */}
      {/* ================================================================ */}
      <section id="reimburse" className="py-24 bg-cream scroll-mt-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Copy */}
            <div>
              <FadeUp>
                <SectionEyebrow className="mb-3">Insurance Reimbursement</SectionEyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-5 leading-tight">
                  Covered by Medicare and major carriers.
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base sm:text-lg">
                  CPT 96904 (Total Body Photography) is covered by Medicare and major insurers for
                  patients with dysplastic nevi and those with a personal or family history of
                  melanoma. Skinmap generates compliant claim documentation automatically — so billing
                  is as easy as the scan itself.
                </p>
                <div className="bg-coral/5 border-l-4 border-coral rounded-r-xl p-5 mb-8">
                  <p className="text-navy font-medium text-sm sm:text-base leading-relaxed">
                    Add a reimbursed clinical service to your practice while providing the most
                    comprehensive cancer care available.
                  </p>
                </div>
                <ul className="space-y-3">
                  {[
                    'CPT 96904 — Total Body Photography',
                    'Medicare covered for qualifying patients',
                    'Major commercial insurers accepted',
                    'Eligible: patients with dysplastic nevi',
                    'Eligible: personal or family history of melanoma',
                    'Automated claim documentation generated by Skinmap',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600 text-sm">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </FadeUp>
            </div>
            {/* Phone */}
            <div className="bg-gradient-hero rounded-3xl p-12 flex items-center justify-center min-h-[440px]">
              <PhoneMockup screen="billing" />
            </div>
          </div>
        </Container>
      </section>

      {/* ================================================================ */}
      {/* FAQ                                                               */}
      {/* ================================================================ */}
      <Section className="bg-white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Common Questions</SectionEyebrow>
            <SectionHeadline className="mt-2">Everything you need to know</SectionHeadline>
          </FadeUp>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                q: 'What equipment do I need?',
                a: 'An iPhone 12 Pro or later and an illuminating ring light for best results. Total startup cost is approximately $1,400 — significantly less than conventional TBP systems.',
              },
              {
                q: 'Who performs the scan?',
                a: 'Most practices rely on their medical assistants or nurses to perform Skinmaps. No specialist training is required.',
              },
              {
                q: 'How long does a Skinmap take?',
                a: 'About one minute for a full-body scan. Patients receive real-time feedback during capture.',
              },
              {
                q: 'Do patients like it?',
                a: 'Over 90% of patients opted in when offered Skinmap during our clinical pilot program. Patients consistently describe it as fast, easy, and reassuring.',
              },
              {
                q: 'Is it covered by insurance?',
                a: 'Yes. CPT 96904 (Total Body Photography) is covered by Medicare and major insurers for patients with dysplastic nevi and those with a personal or family history of melanoma.',
              },
              {
                q: 'Is it HIPAA compliant?',
                a: 'Yes. All images are AES-256 encrypted, securely stored, and never shared outside the care team. Skinmap uses patented, HIPAA-compliant technology.',
              },
              {
                q: 'What practices can use Skinmap?',
                a: 'Skinmap is available to dermatologists across the U.S., and is also well-suited for primary care physicians who see patients with skin concerns.',
              },
              {
                q: 'Is Skinmap being studied?',
                a: 'Yes. Skinmap has completed an IRB-approved clinical validation study conducted in collaboration with a leading academic dermatology program. Results have been submitted for peer review.',
              },
            ].map(({ q, a }) => (
              <FadeUp key={q}>
                <div className="bg-cream rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-navy mb-2 text-sm sm:text-base">{q}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* TECHNOLOGY NOTE                                                   */}
      {/* ================================================================ */}
      <Section className="bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-coral/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue/10 blur-3xl" />
        </div>
        <Container className="relative z-10">
          <FadeUp className="text-center mb-12">
            <SectionEyebrow className="text-coral">Technology</SectionEyebrow>
            <SectionHeadline className="text-white mt-2">Patented. HIPAA-Compliant. Medicare Reimbursed.</SectionHeadline>
            <SectionSubtext className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Skinmap is built for clinical environments — capturing the full skin surface in about
              60 seconds and enabling objective, visit-over-visit comparison on any iPhone.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              {
                Icon: Smartphone,
                title: 'iPhone-Native',
                desc: 'Built for iPhone 12 Pro and later. No separate hardware. No proprietary scanner. Runs in the palm of your hand.',
              },
              {
                Icon: GitCompareArrows,
                title: 'AI-Backed Detection',
                desc: "AI-assisted comparison designed to surface subtle morphological changes that may be difficult to detect from written notes or visit recall alone.",
              },
              {
                Icon: Shield,
                title: 'Patented & HIPAA Compliant',
                desc: 'Patented technology. AES-256 encrypted storage. Images are never shared outside the care team.',
              },
              {
                Icon: BadgeCheck,
                title: 'Medicare Reimbursed',
                desc: 'CPT 96904 covered by Medicare and major carriers for eligible patients — a new revenue stream for your practice.',
              },
            ].map(({ Icon, title, desc }, i) => (
              <FadeUp key={title} delay={i * 0.08}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-coral/30 transition-colors h-full">
                  <Icon size={28} className="text-coral mb-4" />
                  <h3 className="text-white font-bold mb-2">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-12">
            {[
              { label: 'Full-body scan time', value: 60, suffix: 's', sub: 'Any MA or nurse can do it' },
              { label: 'Patient opt-in rate', value: 90, suffix: '%+', sub: 'When offered Skinmap' },
              { label: 'Startup cost', prefix: '~$', value: 1400, suffix: '', sub: 'iPhone + lighting setup' },
            ].map(({ label, value, suffix, sub, ...rest }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl font-extrabold text-coral mb-2">
                    {'prefix' in rest && rest.prefix && <span>{rest.prefix}</span>}
                    <AnimatedStat value={value} suffix={suffix} />
                  </div>
                  <div className="text-white font-semibold mb-1">{label}</div>
                  <p className="text-gray-400 text-sm">{sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ================================================================ */}
      {/* CTA                                                               */}
      {/* ================================================================ */}
      <Section className="bg-gradient-coral">
        <Container>
          <FadeUp className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
              Bring More Comprehensive Skin Health to Your Practice.
            </h2>
            <p className="text-navy/80 text-lg mb-8 leading-relaxed">
              Skinmap is available to dermatologists and primary care physicians across the U.S.
              A simple way to provide the most comprehensive cancer care — reimbursed by Medicare,
              powered by your existing iPhone.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact?type=demo">
                <Button size="lg" className="bg-navy text-white hover:bg-navy-800">
                  Request a Demo <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/for-patients">
                <Button variant="outline" size="lg" className="border-navy text-navy hover:bg-navy/10">For Patients</Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </Section>
    </>
  );
}
