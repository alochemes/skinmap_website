'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Target, Shield, Zap, Heart, Stethoscope } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Section, SectionEyebrow, SectionHeadline, SectionSubtext } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  title: string;
  bio: string;
  initials: string;
  bgClass: string;
}

interface Advisor {
  name: string;
  credentials: string;
  affiliation: string;
  focus: string;
}

interface Value {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface ProblemStat {
  value: string;
  label: string;
  emphasis: string;
}

interface TimelineItem {
  year: string;
  event: string;
  colorClass: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const problemStats: ProblemStat[] = [
  {
    value: '5M+',
    label: 'New skin cancer diagnoses in the U.S. annually',
    emphasis: 'More than all other cancers combined.',
  },
  {
    value: '98%',
    label: 'Five-year melanoma survival rate when caught at Stage I',
    emphasis: 'Drops below 30% at Stage IV.',
  },
  {
    value: '3,600',
    label: 'Board-certified dermatologists for 330 million Americans',
    emphasis: 'A structural access crisis.',
  },
];

const timeline: TimelineItem[] = [
  {
    year: '2023',
    event:
      'Clinical observation — patients arriving with advanced diagnoses after years of tracked, uncompared lesions at routine checkups.',
    colorClass: 'border-coral',
  },
  {
    year: '2024',
    event:
      'skinmap founded — first prototype built on clinical dermoscopy research and iPhone camera APIs.',
    colorClass: 'border-blue',
  },
  {
    year: '2025',
    event:
      'IRB-approved clinical validation study completed — 90% sensitivity and 90% specificity confirmed across 50,000+ annotated images.',
    colorClass: 'border-navy',
  },
  {
    year: '2026',
    event:
      'Early access physician program launched — clinical sites across primary care and dermatology practices.',
    colorClass: 'border-coral',
  },
];

const teamMembers: TeamMember[] = [
  {
    name: 'Dr. Alex Rivera',
    title: 'Co-Founder & CEO',
    bio: 'Physician-turned-founder. Saw the skin cancer detection gap firsthand and built skinmap to close it.',
    initials: 'AR',
    bgClass: 'bg-navy',
  },
  {
    name: 'Jordan Kim',
    title: 'Co-Founder & CTO',
    bio: 'Former ML engineer in medical imaging. Two peer-reviewed publications in AI-assisted dermatological classification.',
    initials: 'JK',
    bgClass: 'bg-blue',
  },
  {
    name: 'Dr. Maya Patel',
    title: 'Chief Medical Officer',
    bio: 'Board-certified dermatologist, 15 years of clinical practice. Principal investigator on skinmap\'s IRB validation study.',
    initials: 'MP',
    bgClass: 'bg-coral',
  },
  {
    name: 'Sam Chen',
    title: 'VP of Clinical Affairs',
    bio: 'Led clinical deployments at two FDA-cleared digital health companies. Manages partnerships and regulatory strategy.',
    initials: 'SC',
    bgClass: 'bg-navy-700',
  },
];

const advisors: Advisor[] = [
  {
    name: 'Dr. Patricia Nguyen, MD, PhD',
    credentials: 'Board-Certified Dermatologist & Clinical Researcher',
    affiliation: 'Academic Medical Center',
    focus: 'Clinical validation, dermoscopy standards, study design',
  },
  {
    name: 'Dr. Robert Okafor, MD',
    credentials: 'Dermatopathologist',
    affiliation: 'University Hospital System',
    focus: 'Pathological correlation, ground truth annotation methodology',
  },
  {
    name: 'Dr. Lisa Tanaka, PhD',
    credentials: 'Clinical AI Researcher',
    affiliation: 'Medical AI Research Institute',
    focus: 'Model architecture, bias mitigation, skin tone diversity in training data',
  },
  {
    name: 'James McCarthy, JD',
    credentials: 'FDA Regulatory Counsel',
    affiliation: 'Healthcare Regulatory Partners',
    focus: 'De Novo pathway strategy, 510(k) precedents, FDA software guidance',
  },
];

const values: Value[] = [
  {
    title: 'Precision',
    description: 'Clinical-grade AI with measurable, peer-reviewed accuracy. 90% sensitivity. 90% specificity. Published without qualification.',
    icon: Target,
  },
  {
    title: 'Trust',
    description: 'Evidence-first, IRB-validated, HIPAA-compliant. We share our limitations as openly as our strengths.',
    icon: Shield,
  },
  {
    title: 'Simplicity',
    description: 'No new hardware. No workflow overhaul. iPhone in your pocket. Under 10 seconds per patient.',
    icon: Zap,
  },
  {
    title: 'Impact',
    description: 'We measure success in lives saved — every melanoma caught at Stage I instead of Stage III.',
    icon: Heart,
  },
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

export function AboutPageClient() {
  return (
    <>

      {/* ── HERO / MISSION ─────────────────────────────────────────── */}
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

        {/* Green glow — bottom left */}
        <div
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(0 202 90), transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Brand-blue glow — top right */}
        <div
          className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(39 24 129), transparent 70%)' }}
          aria-hidden="true"
        />

        <Container>
          <div className="max-w-3xl relative z-10">
            <FadeUp>
              <SectionEyebrow className="text-coral-light">OUR MISSION</SectionEyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mt-4 mb-6">
                No Skin Cancer Should Go Undetected.
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-navy-100 leading-relaxed mb-10 max-w-2xl">
                The tools to detect skin cancer early exist — they just aren&apos;t in the hands of every physician.
                skinmap puts clinical-grade AI in every doctor&apos;s pocket, extending specialist-level dermatology
                to every exam room.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="lg">Request a Demo</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline-white" size="lg">Get in Touch</Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── THE PROBLEM ────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="max-w-3xl mb-14">
            <SectionEyebrow>THE PROBLEM WE&apos;RE SOLVING</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-6">
              Skin Cancer Is the Most Common Cancer in the U.S. — and One of the Most Preventable.
            </SectionHeadline>
            <p className="text-gray-500 leading-relaxed">
              5M+ cases annually — more than all other cancers combined. Stage I melanoma: 98% survival.
              Stage IV: below 30%. The difference is a physician with the right tools at the right moment.
            </p>
          </FadeUp>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {problemStats.map((stat, i) => (
              <FadeUp key={stat.value} delay={i * 0.1}>
                <div className="bg-cream rounded-2xl p-8">
                  <div className="text-4xl font-bold text-coral mb-2">{stat.value}</div>
                  <p className="text-navy text-sm font-medium mb-2 leading-snug">{stat.label}</p>
                  <p className="text-coral-dark text-sm font-semibold">{stat.emphasis}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Pull quote */}
          <FadeUp>
            <div className="max-w-3xl bg-navy rounded-2xl p-8 text-white relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle at bottom right, rgb(3 192 222), transparent 60%)' }}
                aria-hidden="true"
              />
              <p className="text-navy-100 leading-relaxed relative z-10">
                Most primary care physicians perform skin exams visually, without AI assistance,
                without longitudinal tracking, and without the comparative data needed to detect the
                slow, subtle morphological changes that precede the most dangerous lesions.{' '}
                <strong className="text-white">
                  It isn&apos;t a knowledge problem. It&apos;s a workflow and tooling problem.
                </strong>{' '}
                skinmap solves both.
              </p>
            </div>
          </FadeUp>
        </Container>
      </Section>

      {/* ── OUR STORY ──────────────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <FadeUp>
              <SectionEyebrow>OUR STORY</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-6">
                We&apos;ve Seen the Consequences of Catching It Too Late.
              </SectionHeadline>
              <p className="text-gray-500 leading-relaxed mb-5">
                skinmap was born out of a clinical observation that became impossible to ignore:
                patients were arriving at advanced-stage skin cancer diagnoses after years of
                routine checkups — checkups where their lesions had been noted, sometimes
                photographed, but never systematically tracked or compared. The data existed. The
                pattern was there. But no tool existed to connect it across visits.
              </p>
              <p className="text-gray-500 leading-relaxed">
                We built skinmap to solve exactly that problem: giving every physician the same
                longitudinal skin intelligence that a specialist with a dedicated dermoscopy
                practice delivers, in the form factor of an iPhone app that requires no additional
                training, no new hardware, and no disruption to existing workflows. We believe
                clinical-grade AI should be a standard part of every physician&apos;s toolkit —
                not a privilege of subspecialty practice. Because the technology to save lives
                should never require a fellowship to deploy.
              </p>
            </FadeUp>

            {/* Timeline */}
            <FadeUp delay={0.15}>
              <div className="space-y-4 pt-2">
                {timeline.map((item, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-xl p-5 border-l-4 ${item.colorClass} shadow-card`}
                  >
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                      {item.year}
                    </div>
                    <p className="text-navy text-sm font-medium leading-snug">{item.event}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── LEADERSHIP TEAM ────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>LEADERSHIP</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">The Team Behind the Technology</SectionHeadline>
            <SectionSubtext className="mx-auto">
              A team of physicians, engineers, and clinical AI researchers united by a single
              mission: making earlier skin cancer detection the standard of care, not the exception.
            </SectionSubtext>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 rounded-full ${member.bgClass} flex items-center justify-center mb-5 shrink-0`}
                    aria-hidden="true"
                  >
                    <span className="text-white font-bold text-lg select-none">
                      {member.initials}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-base mb-0.5">{member.name}</h3>
                    <p className="text-coral text-xs font-semibold uppercase tracking-wide mb-3">
                      {member.title}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── ADVISORS ───────────────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <FadeUp className="mb-12">
            <SectionEyebrow>CLINICAL & SCIENTIFIC ADVISORS</SectionEyebrow>
            <SectionHeadline className="mt-4 max-w-2xl">
              Guided by the Field&apos;s Leading Clinicians and Researchers
            </SectionHeadline>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {advisors.map((advisor, i) => (
              <FadeUp key={advisor.name} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-card flex gap-5 items-start h-full">
                  <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center shrink-0 mt-0.5">
                    <Stethoscope size={20} className="text-navy" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy mb-0.5">{advisor.name}</h3>
                    <p className="text-xs text-coral font-semibold uppercase tracking-wide mb-1">
                      {advisor.credentials}
                    </p>
                    <p className="text-xs text-gray-500 mb-3">{advisor.affiliation}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      <span className="font-medium text-navy">Focus: </span>
                      {advisor.focus}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── COMPANY VALUES ─────────────────────────────────────────── */}
      <Section background="navy">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow className="text-coral-light">COMPANY VALUES</SectionEyebrow>
            <SectionHeadline className="text-white mt-4 mb-4">What We Believe</SectionHeadline>
            <SectionSubtext className="text-navy-200 mx-auto">
              Four principles that guide every product decision, clinical partnership, and line of code.
            </SectionSubtext>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value, i) => {
              const ValueIcon = value.icon;
              return (
                <FadeUp key={value.title} delay={i * 0.1}>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-coral/20 flex items-center justify-center mb-6">
                      <ValueIcon size={22} className="text-coral" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                    <p className="text-navy-200 leading-relaxed text-sm">{value.description}</p>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ── PATIENT PATH + CTA ─────────────────────────────────────── */}
      <Section background="coral" tight>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FadeUp>
              <p className="eyebrow text-white/70 mb-3">FOR PATIENTS</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ask your doctor about skinmap at your next appointment.
              </h2>
              <p className="text-white/80 leading-relaxed mb-6">
                Don&apos;t wait for symptoms. Early detection starts with a single conversation.
                skinmap gives your physician the AI tools to catch skin cancer earlier.
              </p>
              <Link href="/contact?type=patient">
                <Button variant="outline-white" size="md">Ask Your Doctor About skinmap</Button>
              </Link>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── JOIN US CTA ────────────────────────────────────────────── */}
      <Section background="white" tight>
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FadeUp>
              <SectionEyebrow>JOIN US</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-4">
                Want to be part of what we&apos;re building?
              </SectionHeadline>
              <SectionSubtext className="mb-8 mx-auto">
                We&apos;re looking for clinicians, engineers, and operators who believe the
                technology to save lives should be in every physician&apos;s hands — not just in
                subspecialty clinics.
              </SectionSubtext>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact?type=careers">
                  <Button variant="primary" size="lg">View Open Roles</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">Get in Touch</Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

    </>
  );
}
