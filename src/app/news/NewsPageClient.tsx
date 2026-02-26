'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Trophy, Download, Mail, ArrowRight, ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Section,
  SectionEyebrow,
  SectionHeadline,
  SectionSubtext,
} from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PressRelease {
  date: string;
  headline: string;
  excerpt: string;
}

interface Publication {
  name: string;
}

interface Award {
  title: string;
  issuer: string;
  year: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const pressReleases: PressRelease[] = [
  {
    date: 'January 14, 2026',
    headline:
      'skinmap Completes IRB-Approved Clinical Validation Study Demonstrating 90% Sensitivity and Specificity',
    excerpt:
      '90% sensitivity and 90% specificity across a diverse patient population. IRB-approved, conducted with leading academic dermatology programs, and submitted for peer review.',
  },
  {
    date: 'October 3, 2025',
    headline:
      'skinmap Raises Seed Funding to Expand Physician Access to AI-Powered Dermatology Diagnostics',
    excerpt:
      'Seed round closed to accelerate product development and clinical deployment, led by investors specializing in clinical AI and digital health.',
  },
  {
    date: 'July 22, 2025',
    headline:
      'skinmap Launches Early Access Program for Dermatologists and Primary Care Physicians',
    excerpt:
      'A select cohort of dermatologists and primary care physicians now integrating skinmap into clinical practice, with direct access to the skinmap team.',
  },
];

const publications: Publication[] = [
  { name: 'STAT News' },
  { name: 'MedCity News' },
  { name: 'Healthcare IT News' },
  { name: 'TechCrunch Health' },
  { name: 'Modern Healthcare' },
  { name: 'Fierce Healthcare' },
];

const awards: Award[] = [
  {
    title: 'Digital Health Innovation Award 2025',
    issuer: 'Digital Health Summit',
    year: '2025',
  },
  {
    title: 'Top AI Startup in Dermatology',
    issuer: 'Medical AI Review',
    year: '2025',
  },
  {
    title: 'Clinical AI Breakthrough',
    issuer: 'Health Innovation Awards',
    year: '2025',
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

export function NewsPageClient() {
  return (
    <>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Section
        background="navy"
        className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28"
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />

        {/* Green glow — top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(0 202 90), transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Brand-blue glow — bottom right */}
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-25 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgb(39 24 129), transparent 70%)' }}
          aria-hidden="true"
        />

        <Container>
          <div className="max-w-3xl relative z-10 text-center mx-auto">
            <FadeUp>
              <SectionEyebrow className="text-coral">
                PRESS &amp; NEWS
              </SectionEyebrow>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mt-4 mb-6">
                skinmap in the News
              </h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-lg text-navy-200 leading-relaxed max-w-2xl mx-auto mb-10">
                Press coverage, company announcements, and clinical milestones
                as we build the future of dermatology diagnostics.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact?type=demo">
                  <Button variant="primary" size="md">
                    Request a Demo
                    <ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </Link>
                <Link href="/contact?type=press">
                  <Button variant="outline-white" size="md">
                    Press Inquiry
                    <ExternalLink size={16} aria-hidden="true" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── PRESS RELEASES ────────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="mb-12">
            <SectionEyebrow>PRESS RELEASES</SectionEyebrow>
            <SectionHeadline className="mt-4">
              Latest Announcements
            </SectionHeadline>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6">
            {pressReleases.map((release, i) => (
              <FadeUp key={release.headline} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col h-full">
                  <div className="mb-4">
                    <Badge variant="new">{release.date}</Badge>
                  </div>
                  <h3 className="text-navy font-bold text-lg leading-snug mb-3 flex-1">
                    {release.headline}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {release.excerpt}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-coral font-semibold text-sm hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
                    aria-label={`Read more about: ${release.headline}`}
                  >
                    Read More
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── MEDIA COVERAGE ────────────────────────────────────────────────── */}
      <Section background="cream">
        <Container>
          <FadeUp className="text-center mb-12">
            <SectionEyebrow>MEDIA COVERAGE</SectionEyebrow>
            <SectionHeadline className="mt-4 mb-4">
              In the Media
            </SectionHeadline>
            <SectionSubtext className="mx-auto">
              skinmap has been featured in leading medical, technology, and
              health innovation publications.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {publications.map((pub, i) => (
              <FadeUp key={pub.name} delay={i * 0.07}>
                <div className="bg-white rounded-2xl p-6 shadow-card flex flex-col items-center justify-center gap-3 text-center min-h-[100px] hover:shadow-card-hover transition-all duration-300">
                  <p className="font-bold text-navy text-sm leading-snug">
                    {pub.name}
                  </p>
                  <Badge variant="press">Feature</Badge>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── AWARDS & RECOGNITION ──────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="mb-12">
            <SectionEyebrow>AWARDS & RECOGNITION</SectionEyebrow>
            <SectionHeadline className="mt-4">Industry Recognition</SectionHeadline>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-6">
            {awards.map((award, i) => (
              <FadeUp key={award.title} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-gray-100 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center shrink-0">
                    <Trophy
                      size={22}
                      className="text-coral"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy text-base leading-snug mb-1">
                      {award.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">{award.issuer}</p>
                    <Badge variant="outline">{award.year}</Badge>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── PRESS KIT ─────────────────────────────────────────────────────── */}
      <Section background="navy" tight id="press-kit">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <FadeUp>
              <SectionEyebrow className="text-coral">
                MEDIA RESOURCES
              </SectionEyebrow>
              <SectionHeadline className="text-white mt-4 mb-4">
                Press Kit &amp; Media Resources
              </SectionHeadline>
              <p className="text-navy-200 text-lg leading-relaxed mb-8">
                Download our press kit for logos, executive headshots, product
                screenshots, company boilerplate, and clinical data fact sheet.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/skinmap-press-kit.zip" download>
                  <Button variant="primary" size="lg">
                    <Download size={18} aria-hidden="true" />
                    Download Press Kit
                  </Button>
                </a>
                <Link href="/contact?type=press">
                  <Button variant="outline-white" size="lg">
                    Request Interview
                  </Button>
                </Link>
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── PRESS CONTACT CTA ─────────────────────────────────────────────── */}
      <Section background="cream" tight>
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <FadeUp>
              <SectionEyebrow>CONTACT</SectionEyebrow>
              <SectionHeadline className="mt-4 mb-4">
                Press Inquiries
              </SectionHeadline>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                For media inquiries, interview requests, and press kit access,
                contact our communications team.
              </p>
              <a
                href="mailto:press@skinmap.com"
                className="inline-flex items-center gap-2 text-coral font-semibold text-lg hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
              >
                <Mail size={20} aria-hidden="true" />
                press@skinmap.com
              </a>
            </FadeUp>
          </div>
        </Container>
      </Section>

    </>
  );
}
