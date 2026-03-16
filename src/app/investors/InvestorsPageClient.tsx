'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  TrendingUp,
  Brain,
  Microscope,
  Users,
  CheckCircle2,
  ArrowRight,
  Building2,
  GraduationCap,
} from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section, SectionEyebrow, SectionHeadline, SectionSubtext } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ThesisCard {
  title: string;
  rationale: string;
  icon: React.ElementType;
}

interface MarketStat {
  tier: string;
  label: string;
  value: string;
  description: string;
  widthClass: string;
  colorClass: string;
}

interface Milestone {
  text: string;
  done: boolean;
}

interface Partner {
  name: string;
  type: string;
  icon: React.ElementType;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const heroStats = [
  { value: '$20B+', label: 'Global dermatology market' },
  { value: '8.4%', label: 'Annual market growth rate' },
  { value: '200K+', label: 'Target U.S. clinicians' },
];

const marketStats: MarketStat[] = [
  {
    tier: 'TAM',
    label: 'Total Addressable Market',
    value: '$20B+',
    description: 'Global dermatology diagnostics and AI-assisted clinical tools market, growing at 8.4% annually.',
    widthClass: 'w-full',
    colorClass: 'bg-navy',
  },
  {
    tier: 'SAM',
    label: 'Serviceable Addressable Market',
    value: '$4.2B',
    description: '200,000+ U.S. clinicians performing skin evaluations across dermatology, primary care, and family medicine.',
    widthClass: 'w-3/4',
    colorClass: 'bg-blue',
  },
  {
    tier: 'SOM',
    label: 'Serviceable Obtainable Market',
    value: '$420M',
    description: 'Early-stage capture: dermatology practices and primary care groups in initial deployment regions.',
    widthClass: 'w-2/5',
    colorClass: 'bg-coral',
  },
];

const thesisCards: ThesisCard[] = [
  {
    title: 'Why Skin Cancer?',
    rationale:
      'Skin cancer is the most common cancer in the U.S. — over 5 million new cases diagnosed annually — yet it remains one of the most detectable and treatable when caught early. The survival delta between Stage I and Stage IV melanoma exceeds 60 percentage points. That delta is a clinical tragedy and a commercial opportunity of enormous scale.',
    icon: Microscope,
  },
  {
    title: 'Why AI Now?',
    rationale:
      "Computer vision AI for dermatological image classification has reached clinical-grade performance benchmarks, validated in peer-reviewed literature and FDA-cleared applications. The convergence of smartphone camera resolution, on-device machine learning inference, and cloud-based longitudinal recordkeeping means the full diagnostic stack now fits in a physician's pocket — at a fraction of the cost of traditional diagnostic hardware.",
    icon: Brain,
  },
  {
    title: 'Why Skinmap?',
    rationale:
      "Skinmap is the only physician-facing, longitudinal skin health tracking platform combining AI diagnostics with point-of-care image capture in a native iPhone app. Unlike consumer scan apps, Skinmap is designed for clinical workflows — with IRB-validated accuracy, HIPAA compliance, and the integration architecture that hospital systems and group practices require.",
    icon: TrendingUp,
  },
  {
    title: 'Why This Team?',
    rationale:
      "Skinmap's founding team combines clinical medicine, computer vision research, and health technology commercialization. Our scientific advisors include board-certified dermatologists and pathologists with decades of combined clinical experience. We are building this company with the rigor of clinical researchers and the velocity of a technology team.",
    icon: Users,
  },
];

const milestones: Milestone[] = [
  { text: 'Physicians onboarded across multiple clinical sites in initial deployment phase', done: false },
  { text: 'Patient scans captured and longitudinally tracked across active clinical sites', done: false },
  { text: 'IRB-approved clinical validation study completed — submitted for peer review', done: true },
  { text: 'On the FDA De Novo pathway — regulatory strategy established with specialist counsel', done: true },
];

const partners: Partner[] = [
  { name: 'Academic Medical Center', type: 'Clinical Validation Site', icon: Building2 },
  { name: 'University Dermatology Program', type: 'Research Partner', icon: GraduationCap },
  { name: 'Community Health Network', type: 'Primary Care Deployment', icon: Building2 },
  { name: 'Regional Hospital System', type: 'Enterprise Partner', icon: Building2 },
  { name: 'Medical School Research Institute', type: 'AI Research Collaborator', icon: GraduationCap },
  { name: 'Dermatology Group Practice', type: 'Early Access Partner', icon: Building2 },
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function InvestorsPageClient() {
  return (
    <>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <Section background="white" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <Container>
          <div className="max-w-3xl relative z-10">
            <FadeUp>
              <div className="inline-flex items-center gap-3 bg-navy-500/5 border border-navy-500/15 rounded-2xl px-5 py-3 mb-8">
                <span className="text-3xl font-extrabold text-coral">65M</span>
                <span className="text-sm text-gray-600 leading-snug">
                  primary care visits per year include a skin concern.
                  <br />
                  <strong className="text-navy-500">Most go untracked.</strong>
                </span>
              </div>
            </FadeUp>
            <FadeUp>
              <SectionEyebrow>INVESTMENT OPPORTUNITY</SectionEyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-navy-500 mt-4 mb-6">
                The $20 Billion Dermatology Gap Has a Solution.
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-2xl">
                There are fewer than 3,600 board-certified dermatologists for 330 million Americans —
                and over 65 million primary care visits per year include a skin concern. Skinmap
                closes that access gap with app-based Total Body Photography — a 60-second full-body scan,
                reimbursed by Medicare, running on any iPhone in the practice.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=investor">
                  <Button variant="primary" size="lg">Request an Investor Briefing</Button>
                </Link>
                <Link href="#thesis">
                  <Button variant="outline" size="lg">View Investment Thesis</Button>
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Hero stat strip */}
          <FadeUp delay={0.4}>
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 pt-12 border-t border-gray-100 max-w-2xl">
              {heroStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-coral mb-1">{s.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── MARKET OPPORTUNITY ─────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="max-w-3xl mb-14">
            <SectionEyebrow>MARKET OPPORTUNITY</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-6">
              A Large, Underserved Market at an Inflection Point
            </SectionHeadline>
            <p className="text-gray-500 leading-relaxed">
              Skin cancer incidence in the United States has increased by over 300% in the past 30
              years. The dermatologist-to-patient ratio has barely moved. Primary care physicians
              are expected to fill this access gap — often without specialist-grade tools, dedicated
              tracking systems, or AI assistance of any kind. Computer vision AI has now reached
              clinical-grade performance for dermatological image classification, validated in
              peer-reviewed literature and regulatory-cleared applications. Skinmap is positioned
              at exactly this inflection point.
            </p>
          </FadeUp>

          {/* TAM / SAM / SOM visual */}
          <div className="space-y-4 max-w-3xl mb-14">
            {marketStats.map((stat, i) => (
              <FadeUp key={stat.tier} delay={i * 0.12}>
                <div className="bg-cream rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                        {stat.tier}
                      </span>
                      <span className="text-sm font-medium text-navy">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-bold text-navy">{stat.value}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div className={`h-full ${stat.colorClass} ${stat.widthClass} rounded-full`} />
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{stat.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Market body */}
          <FadeUp>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at top right, rgb(0 202 90), transparent 60%)' }}
                  aria-hidden="true"
                />
                <div className="relative z-10">
                  <div className="text-4xl font-bold text-coral mb-2">300%</div>
                  <p className="text-white font-semibold mb-2">
                    Increase in skin cancer incidence over the past 30 years
                  </p>
                  <p className="text-navy-200 text-sm leading-relaxed">
                    While incidence has tripled, the number of dermatologists has not kept pace —
                    creating a structural access gap that AI is uniquely positioned to close.
                  </p>
                </div>
              </div>
              <div className="bg-cream rounded-2xl p-8">
                <div className="text-4xl font-bold text-navy mb-2">65M+</div>
                <p className="text-navy font-semibold mb-2">
                  Primary care visits per year include a skin concern
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  The vast majority of these encounters occur without AI assistance, longitudinal
                  tracking, or clinical-grade risk stratification — the exact gap Skinmap closes.
                </p>
              </div>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── COMPETITIVE LANDSCAPE ─────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Competitive Landscape</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2">
              Skinmap vs. the status quo
            </SectionHeadline>
            <SectionSubtext className="mx-auto mt-4">
              The current standard of care is broken. Skinmap fixes the tooling problem.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Status quo */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl bg-white border border-gray-200 p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">Status Quo (Without Skinmap)</p>
                <div className="space-y-4">
                  {[
                    'Visual-only skin exam — no documentation',
                    'No visit-over-visit comparison possible',
                    'Relies on physician memory and hand-drawn maps',
                    'No AI risk stratification',
                    'No HIPAA-compliant image storage',
                    'No longitudinal skin health record',
                  ].map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <div className="w-4 h-4 rounded-full bg-gray-200 shrink-0 mt-0.5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                      </div>
                      <span className="text-gray-500 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Skinmap */}
            <FadeUp delay={0.2}>
              <div className="rounded-3xl bg-navy border border-white/10 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-coral/10 blur-2xl pointer-events-none" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-6">Skinmap</p>
                <div className="space-y-4">
                  {[
                    'Full-body TBP in ~60 seconds — no hardware, just an iPhone',
                    'Automatic side-by-side comparison at every visit',
                    'Full scan history per patient, searchable and filterable',
                    'Medicare reimbursed · CPT 96904 · Major insurers covered',
                    'HIPAA-compliant AES-256 encrypted storage · Patented',
                    'Over 90% patient opt-in rate when offered Skinmap',
                  ].map((item) => (
                    <div key={item} className="flex gap-3 items-start">
                      <CheckCircle2 size={16} className="text-coral shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-300 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── INVESTMENT THESIS ──────────────────────────────────────────── */}
      <Section background="navy" id="thesis">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow className="text-blue-300">INVESTMENT THESIS</SectionEyebrow>
            <SectionHeadline className="text-white mt-4 mb-4">
              Four Reasons the Timing Is Right
            </SectionHeadline>
            <SectionSubtext className="text-navy-200 mx-auto">
              The market, the technology, and the team have converged. Here is why Skinmap wins.
            </SectionSubtext>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-6">
            {thesisCards.map((card, i) => {
              const CardIcon = card.icon;
              return (
                <FadeUp key={card.title} delay={i * 0.1}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue/20 flex items-center justify-center shrink-0">
                        <CardIcon size={22} className="text-blue-300" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-white leading-snug pt-2">
                        {card.title}
                      </h3>
                    </div>
                    <p className="text-navy-200 leading-relaxed text-sm flex-1">
                      {card.rationale}
                    </p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── CLINICAL PARTNERS ──────────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-12">
            <SectionEyebrow>CLINICAL PARTNERS</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">
              Validated Across Clinical Settings
            </SectionHeadline>
            <SectionSubtext className="mx-auto">
              Skinmap is deployed and validated across academic medical centers, health systems,
              and private dermatology and primary care practices.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {partners.map((partner, i) => {
              const PartnerIcon = partner.icon;
              return (
                <FadeUp key={partner.name} delay={i * 0.07}>
                  <div className="bg-white rounded-2xl p-5 shadow-card flex flex-col items-center text-center gap-3 h-full">
                    <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center">
                      <PartnerIcon size={20} className="text-navy" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm leading-snug mb-1">
                        {partner.name}
                      </p>
                      <Badge variant="outline" size="sm">{partner.type}</Badge>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp>
            <p className="text-center text-sm text-gray-500">
              Partner institution names available under NDA. Full clinical site list provided in
              investor briefing.
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* ── TRACTION ───────────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionEyebrow>TRACTION</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-6">
                Early Traction Across Clinical Settings
              </SectionHeadline>
              <p className="text-gray-500 leading-relaxed mb-8">
                Skinmap is past the validation phase. We have clinical deployment data,
                IRB-approved study results, a regulatory pathway, and a growing cohort of
                physicians actively using the platform in practice.
              </p>

              <div className="space-y-4">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        milestone.done ? 'bg-coral' : 'bg-navy-50 border-2 border-navy-200'
                      }`}
                    >
                      {milestone.done ? (
                        <CheckCircle2 size={14} className="text-white" aria-hidden="true" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-navy-300" aria-hidden="true" />
                      )}
                    </div>
                    <p className="text-navy text-sm leading-relaxed font-medium">
                      {milestone.text}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mt-6">
                Bracketed values updated in investor briefing with current deployment figures.
              </p>
            </FadeUp>

            {/* Trust signal stack */}
            <FadeUp delay={0.15}>
              <div className="space-y-4">
                {[
                  {
                    label: 'Clinical Validation',
                    detail: 'Currently being tested in collaboration with a top medical research institution',
                    colorClass: 'border-coral bg-coral/5',
                    badgeVariant: 'clinical' as const,
                    badgeText: 'In Progress',
                  },
                  {
                    label: 'Regulatory',
                    detail: 'FDA De Novo pathway — regulatory strategy established with specialist counsel',
                    colorClass: 'border-blue bg-blue/5',
                    badgeVariant: 'clinical' as const,
                    badgeText: 'In Progress',
                  },
                  {
                    label: 'Data Security',
                    detail: 'HIPAA compliant · AES-256 encryption · BAAs available',
                    colorClass: 'border-navy bg-navy/5',
                    badgeVariant: 'partner' as const,
                    badgeText: 'Live',
                  },
                  {
                    label: 'Clinical Deployment',
                    detail: 'Active physician users across dermatology and primary care sites',
                    colorClass: 'border-coral bg-coral/5',
                    badgeVariant: 'clinical' as const,
                    badgeText: 'Active',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl p-5 border-l-4 ${item.colorClass}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-navy text-sm">{item.label}</span>
                      <Badge variant={item.badgeVariant} size="sm">{item.badgeText}</Badge>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── INVESTOR CTA ───────────────────────────────────────────────── */}
      <Section background="navy" tight>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FadeUp>
              <SectionEyebrow className="text-blue-300">GET IN TOUCH</SectionEyebrow>
              <SectionHeadline className="text-white mt-4 mb-4">
                We&apos;d Like to Tell You the Whole Story.
              </SectionHeadline>
              <SectionSubtext className="text-navy-200 mb-8 mx-auto">
                Request an investor briefing for full clinical data, deployment metrics, financial
                projections, and a live product demo with the founding team.
              </SectionSubtext>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact?type=investor">
                  <Button variant="primary" size="lg">
                    Request an Investor Briefing
                    <ArrowRight size={18} aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/product">
                  <Button variant="outline-white" size="lg">View Clinical Data</Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

    </>
  );
}
