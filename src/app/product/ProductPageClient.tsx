'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Brain,
  ScanLine,
  GitCompareArrows,
  Users,
  FileText,
  Shield,
  Lock,
  CheckCircle2,
  Microscope,
  Activity,
  BarChart3,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section, SectionEyebrow, SectionHeadline, SectionSubtext } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  callout: string;
}

interface WorkflowStep {
  num: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

interface Stat {
  label: string;
  value: string;
  context: string;
}

interface ComplianceBadge {
  label: string;
  icon: React.ElementType;
  description: string;
}

interface SurvivalRow {
  label: string;
  survival: string;
  widthClass: string;
  colorClass: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: Feature[] = [
  {
    id: 1,
    icon: ScanLine,
    title: 'Instant Lesion Analysis',
    description:
      "Risk assessment in under 3 seconds. AI classifies by symmetry, border, color, and diameter — outputting a risk tier from low to high suspicion with supporting indicators.",
    callout: 'AI-backed confidence at the point of care.',
  },
  {
    id: 2,
    icon: GitCompareArrows,
    title: 'Side-by-Side Longitudinal Comparison',
    description:
      "Every scan stored with date, location, and AI assessment. At any future visit, skinmap surfaces the last scan for direct side-by-side comparison. Change detection made objective and documentable.",
    callout: 'Catch the slow progressions that written notes can never track.',
  },
  {
    id: 3,
    icon: Users,
    title: 'Complete Patient Record Management',
    description:
      "Full scan history, annotated body map, and risk trends — all in one mobile interface. Search by name, filter by risk level, or surface every high-suspicion lesion across your panel in one tap.",
    callout: 'Specialist-level oversight without the specialist infrastructure.',
  },
  {
    id: 4,
    icon: FileText,
    title: 'One-Tap Clinical Reports',
    description:
      'Structured report with images, AI classification, and change-over-time analysis in one tap. Share with specialists, upload to EHR, or give directly to the patient.',
    callout: 'Referrals go out with everything a dermatologist needs to triage.',
  },
];

const workflowSteps: WorkflowStep[] = [
  {
    num: '01',
    title: 'Capture at the Point of Care',
    description: 'Photograph any lesion with iPhone. Under 10 seconds. No extra hardware, no workflow disruption.',
    icon: ScanLine,
  },
  {
    num: '02',
    title: 'Instant AI Assessment',
    description: 'Risk classification while the patient is still in the room. Data-backed decision, not intuition.',
    icon: Brain,
  },
  {
    num: '03',
    title: 'Automatic Longitudinal Record',
    description: 'Scan saved automatically. Next visit, previous scan surfaces for comparison. No extra admin work.',
    icon: Activity,
  },
];

const stats: Stat[] = [
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
];

const complianceBadges: ComplianceBadge[] = [
  {
    label: 'HIPAA Compliant',
    icon: Shield,
    description: 'Full HIPAA compliance with BAAs available for all institutional deployments.',
  },
  {
    label: 'AES-256 Encrypted',
    icon: Lock,
    description: 'End-to-end encryption for all image data, patient records, and AI outputs.',
  },
  {
    label: 'IRB-Validated',
    icon: CheckCircle2,
    description:
      'IRB-approved prospective clinical validation study completed and submitted for peer review.',
  },
  {
    label: 'FDA De Novo Pathway',
    icon: Microscope,
    description:
      'Regulatory strategy established with specialist counsel — on the pathway to FDA clearance.',
  },
];

const survivalRows: SurvivalRow[] = [
  { label: 'Stage I Melanoma', survival: '98%+ 5-yr survival', widthClass: 'w-full', colorClass: 'bg-coral' },
  { label: 'Stage II Melanoma', survival: '65% 5-yr survival', widthClass: 'w-2/3', colorClass: 'bg-blue' },
  { label: 'Stage III Melanoma', survival: '45% 5-yr survival', widthClass: 'w-5/12', colorClass: 'bg-warning' },
  { label: 'Stage IV Melanoma', survival: '<30% 5-yr survival', widthClass: 'w-1/4', colorClass: 'bg-danger' },
];

// ─── FadeUp helper ────────────────────────────────────────────────────────────

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
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─── Architecture layers ──────────────────────────────────────────────────────

const archLayers = [
  { layer: 'Input', label: 'Clinical dermoscopic image', colorClass: 'bg-blue' },
  { layer: 'CNN Backbone', label: 'Feature extraction across skin tones & morphologies', colorClass: 'bg-blue-600' },
  { layer: 'Classifier', label: 'Risk tier + morphological indicators', colorClass: 'bg-coral' },
  { layer: 'Output', label: 'Structured risk score + auditable rationale', colorClass: 'bg-coral-dark' },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ProductPageClient() {
  const [activeFeature, setActiveFeature] = useState(0);
  const ActiveIcon = features[activeFeature].icon;

  return (
    <>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <Section background="navy" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Sky-blue glow — right */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(3 192 222) 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Brand-blue glow — left */}
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(39 24 129) 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <Container>
          <div className="max-w-3xl relative z-10">
            <FadeUp>
              <SectionEyebrow className="text-blue-300">THE SCIENCE BEHIND skinmap</SectionEyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white mt-4 mb-6">
                Clinical-Grade AI, Built for the Real World of Dermatology
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <SectionSubtext className="text-navy-100 max-w-2xl mb-10">
                Trained on 50,000+ clinical images. IRB-validated. Specialist-level accuracy in under 3 seconds.
              </SectionSubtext>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="lg">Request a Clinical Demo</Button>
                </Link>
                <a href="#accuracy">
                  <Button variant="outline-white" size="lg">View Validation Data</Button>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Hero stat strip */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-12 border-t border-white/10 max-w-2xl">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-coral mb-1">{s.value}</div>
                  <div className="text-xs text-navy-200 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── AI ENGINE ─────────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Body text */}
            <FadeUp>
              <SectionEyebrow>THE AI ENGINE</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-6">
                A Model Trained on Clinical Reality, Not Curated Datasets
              </SectionHeadline>
              <p className="text-gray-500 leading-relaxed mb-5">
                Trained on 50,000+ clinical dermoscopic images annotated by board-certified dermatologists.
                Our dataset spans diverse skin tones, lesion morphologies, and real-world imaging conditions.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Every assessment outputs a structured risk score <em>and</em> an auditable rationale —
                the specific morphological features that drove the classification. Not a black box.
              </p>
            </FadeUp>

            {/* Architecture diagram */}
            <FadeUp delay={0.15}>
              <div className="rounded-2xl bg-navy p-8 text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgb(3 192 222 / 0.15), transparent 60%)' }}
                  aria-hidden="true"
                />
                <div className="relative z-10 space-y-5">
                  <p className="eyebrow text-blue-300">MODEL ARCHITECTURE</p>
                  {archLayers.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.colorClass}`} />
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-navy-200 mb-0.5">
                          {item.layer}
                        </div>
                        <div className="text-sm text-white/80">{item.label}</div>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-navy-200">Training dataset</span>
                    <span className="text-sm font-bold text-coral">50,000+ annotated images</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── APP FEATURE WALKTHROUGH ───────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-12">
            <SectionEyebrow>APP FEATURE WALKTHROUGH</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">Everything in Your Pocket</SectionHeadline>
            <SectionSubtext className="mx-auto">
              A clinical-grade tool designed to feel like a consumer product — fast, intuitive,
              and built for the pace of real medical practice.
            </SectionSubtext>
          </FadeUp>

          {/* Feature tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center" role="tablist" aria-label="App features">
            {features.map((f, i) => (
              <button
                key={f.id}
                id={`feature-tab-${f.id}`}
                role="tab"
                aria-selected={activeFeature === i}
                aria-controls={`feature-panel-${f.id}`}
                onClick={() => setActiveFeature(i)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral
                  ${
                    activeFeature === i
                      ? 'bg-navy text-white shadow-card'
                      : 'bg-white text-navy border border-gray-100 hover:border-navy-200 hover:shadow-sm'
                  }`}
              >
                {`0${f.id}. ${f.title.split(' ')[0]}`}
              </button>
            ))}
          </div>

          {/* Active feature panel */}
          <motion.div
            key={activeFeature}
            id={`feature-panel-${features[activeFeature].id}`}
            role="tabpanel"
            aria-labelledby={`feature-tab-${features[activeFeature].id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Content card */}
            <div className="bg-white rounded-2xl p-8 shadow-card order-2 lg:order-1">
              <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-6">
                <ActiveIcon className="text-coral" size={24} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">{features[activeFeature].title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{features[activeFeature].description}</p>
              <div className="bg-navy/5 rounded-xl p-4 border-l-4 border-coral">
                <p className="text-sm font-semibold text-navy leading-relaxed">
                  {features[activeFeature].callout}
                </p>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="flex justify-center order-1 lg:order-2">
              <div className="relative">
                <div
                  className="w-[240px] h-[500px] bg-navy rounded-5xl shadow-2xl relative overflow-hidden border-[6px] border-navy-800"
                >
                  {/* Status bar */}
                  <div className="h-10 bg-navy-900 flex items-center justify-between px-5 shrink-0">
                    <span className="text-white text-xs font-semibold">9:41</span>
                    <div className="w-4 h-2 border border-white/60 rounded-sm overflow-hidden">
                      <div className="w-3/4 h-full bg-white/60" />
                    </div>
                  </div>

                  {/* Screen */}
                  <div className="flex-1 bg-white h-full flex flex-col">
                    {/* App bar */}
                    <div className="bg-navy px-4 py-3 flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-coral flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-sm bg-white" />
                      </div>
                      <span className="text-white text-xs font-bold tracking-wide">skinmap</span>
                    </div>

                    {/* Mock content area */}
                    <div className="flex-1 p-3 flex flex-col gap-3">
                      <div className="h-28 rounded-xl bg-navy/5 flex items-center justify-center">
                        <ActiveIcon size={36} className="text-navy/20" aria-hidden="true" />
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 bg-navy/10 rounded w-3/4" />
                        <div className="h-2 bg-navy/10 rounded w-full" />
                        <div className="h-2 bg-navy/10 rounded w-2/3" />
                      </div>
                      <div className="h-2 bg-coral/30 rounded w-4/5" />
                      <div className="flex gap-2 mt-auto">
                        <div className="flex-1 h-8 bg-coral rounded-lg" />
                        <div className="flex-1 h-8 border border-navy/20 rounded-lg" />
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="h-8 bg-white flex items-center justify-center">
                      <div className="w-20 h-1 bg-navy/20 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Glow */}
                <div
                  className="absolute -inset-6 rounded-[50px] bg-coral/10 blur-2xl -z-10 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* ── CLINICAL WORKFLOW ─────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>CLINICAL WORKFLOW</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">
              Designed for the Way You Already Practice
            </SectionHeadline>
            <SectionSubtext className="mx-auto">
              skinmap integrates in minutes and adds no friction to your existing workflow.
            </SectionSubtext>
          </FadeUp>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {workflowSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <FadeUp key={step.num} delay={i * 0.1}>
                  <div className="text-center">
                    <div className="relative inline-flex mb-6">
                      <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center shadow-glow-blue">
                        <StepIcon size={32} className="text-white" aria-hidden="true" />
                      </div>
                      <span
                        className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-coral text-white text-xs font-bold flex items-center justify-center shadow-sm"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3">{step.title}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm">{step.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          {/* Time callout */}
          <FadeUp>
            <div className="rounded-2xl bg-cream p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 rounded-full bg-coral flex items-center justify-center shrink-0">
                <Activity size={28} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <div className="text-2xl font-bold text-navy mb-1">Under 10 seconds per patient.</div>
                <p className="text-gray-500">
                  The full skinmap workflow — capture, AI analysis, and record storage — takes less
                  time than documenting a note. No disruption. No learning curve. No additional hardware.
                </p>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── ACCURACY & VALIDATION ─────────────────────────────────────── */}
      <Section background="navy" id="accuracy">
        <Container>
          <FadeUp className="text-center mb-12">
            <SectionEyebrow className="text-blue-300">CLINICAL VALIDATION</SectionEyebrow>
            <SectionHeadline className="text-white mt-4 mb-4">
              The Numbers Behind the Clinical Confidence
            </SectionHeadline>
          </FadeUp>

          {/* Stat cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, i) => (
              <FadeUp key={stat.label} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors duration-300">
                  <div className="text-5xl font-bold text-coral mb-3">{stat.value}</div>
                  <div className="text-white font-semibold mb-3">{stat.label}</div>
                  <p className="text-navy-200 text-sm leading-relaxed">{stat.context}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Validation detail card */}
          <FadeUp>
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue flex items-center justify-center shrink-0 mt-1">
                  <BarChart3 size={20} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">IRB-Approved Clinical Validation</h3>
                  <Badge variant="clinical" size="sm">Peer Review Submitted</Badge>
                </div>
              </div>
              <p className="text-navy-200 leading-relaxed mb-6">
                skinmap&apos;s diagnostic AI was evaluated in an IRB-approved prospective study in
                collaboration with academic dermatology programs. Across a diverse patient population
                spanning multiple skin tones, lesion types, and clinical settings, skinmap demonstrated
                90% sensitivity and 90% specificity for high-risk lesion classification — performance
                equivalent to board-certified dermatologist assessment under matched conditions. The
                dataset included over 50,000 annotated clinical images covering the full range of
                dermoscopic and macroscopic presentations encountered in primary care and dermatology
                practice.
              </p>
              <div className="bg-white/5 rounded-xl p-4 border-l-4 border-coral">
                <p className="text-white/80 text-sm italic">
                  &quot;In matched testing, skinmap&apos;s risk stratification agreed with
                  board-certified dermatologist classification in 9 out of 10 cases across a diverse
                  lesion dataset representing the full spectrum of real-world clinical presentations.&quot;
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge variant="clinical">IRB Approved</Badge>
                <Badge variant="outline">50,000+ Images</Badge>
                <Badge variant="clinical">Multi-Site Study</Badge>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── PATIENT BENEFITS ──────────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionEyebrow>FOR YOUR PATIENTS</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-8">
                What This Means for Your Patients
              </SectionHeadline>

              <div className="space-y-6">
                {[
                  {
                    title: 'Peace of mind backed by data',
                    body: "When a lesion looks the same as last year's scan, you can reassure your patient with objective visual evidence — not just your assessment.",
                  },
                  {
                    title: 'Earlier detection when it matters',
                    body: 'The five-year survival rate for Stage I melanoma exceeds 98%. For Stage IV, it drops below 30%. skinmap helps catch lesions at the stage where outcomes are still excellent.',
                  },
                  {
                    title: 'Better referrals, faster triage',
                    body: "Every referral includes skinmap's AI classification, scan history, and morphological analysis. Your dermatology colleagues receive everything they need immediately.",
                  },
                  {
                    title: 'Longer-term patient relationships',
                    body: 'Longitudinal skin tracking gives patients a reason to return — and gives you a documented record that strengthens both the clinical relationship and care continuity.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-coral flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-white" aria-hidden="true" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Patient quote */}
              <div className="mt-8 p-5 bg-white rounded-2xl shadow-card border-l-4 border-coral">
                <p className="text-sm text-gray-500 italic mb-2">
                  &quot;My doctor started using skinmap six months ago and it changed my peace of
                  mind completely. She can show me exactly what changed on a mole since my last visit.
                  That kind of tracking used to take three specialist referrals.&quot;
                </p>
                <p className="text-xs font-semibold text-navy">— Jennifer M., skinmap patient, California</p>
              </div>

              <div className="mt-6">
                <Link href="/contact?type=patient">
                  <Button variant="outline" size="sm">Ask Your Doctor About skinmap</Button>
                </Link>
              </div>
            </FadeUp>

            {/* Survival rate visual */}
            <FadeUp delay={0.15}>
              <div className="space-y-4">
                <p className="text-sm font-semibold text-navy mb-6">
                  Melanoma 5-Year Survival Rate by Stage
                </p>
                {survivalRows.map((row, i) => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-card">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-semibold text-navy">{row.label}</span>
                      <span className="text-sm font-bold text-gray-500">{row.survival}</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${row.colorClass} ${row.widthClass} rounded-full`} />
                    </div>
                  </div>
                ))}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Source: American Cancer Society. Earlier detection directly correlates with survival outcomes.
                </p>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── DATA PRIVACY & COMPLIANCE ─────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-12">
            <SectionEyebrow>COMPLIANCE & SECURITY</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">
              Built for Clinical Environments. Compliant by Design.
            </SectionHeadline>
            <SectionSubtext className="mx-auto">
              skinmap handles protected health information with the rigor that clinical practice demands.
            </SectionSubtext>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {complianceBadges.map((badge, i) => {
              const BadgeIcon = badge.icon;
              return (
                <FadeUp key={badge.label} delay={i * 0.08}>
                  <div className="text-center p-6 rounded-2xl bg-cream hover:shadow-card transition-all duration-300 h-full">
                    <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                      <BadgeIcon size={24} className="text-white" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-navy mb-2">{badge.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{badge.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp>
            <div className="max-w-3xl mx-auto border border-gray-100 rounded-2xl p-8 bg-cream">
              <h3 className="font-bold text-navy text-lg mb-4">Our Data Commitment</h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                All image data, patient records, and AI outputs are encrypted in transit and at rest
                using AES-256 encryption. skinmap operates in full compliance with HIPAA regulations,
                with Business Associate Agreements (BAAs) available for all institutional and group
                practice deployments.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We do not sell, license, or monetize patient data in any form. Your patients&apos;
                information is used solely to support their clinical care — and never for anything else.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="clinical" size="sm">HIPAA</Badge>
                <Badge variant="partner" size="sm">AES-256</Badge>
                <Badge variant="outline" size="sm">BAAs Available</Badge>
                <Badge variant="clinical" size="sm">No Data Monetization</Badge>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <Section background="navy" tight>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FadeUp>
              <SectionHeadline className="text-white mb-4">
                See skinmap&apos;s diagnostic accuracy in a live clinical demo.
              </SectionHeadline>
              <SectionSubtext className="text-navy-200 mb-8 mx-auto">
                We&apos;ll walk you through the AI model, the clinical workflow, and the validation
                data — built around your specialty and patient population.
              </SectionSubtext>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="lg">Request a Clinical Demo</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline-white" size="lg">Ask a Question</Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

    </>
  );
}
