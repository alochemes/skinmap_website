'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Search,
  Phone,
  ChevronDown,
  CheckCircle,
  ArrowRight,
  Stethoscope,
  Heart,
  Shield,
  Clock,
  X,
} from 'lucide-react';
import type { MapRef } from 'react-map-gl/maplibre';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Section, SectionEyebrow, SectionHeadline, SectionSubtext } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { providers, type Provider, type Specialty } from '@/data/providers';

// ─── Dynamic map import (no SSR) ─────────────────────────────────────────────

const ProviderMap = dynamic(() => import('@/components/ui/ProviderMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-navy-800 rounded-2xl">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-coral border-t-transparent rounded-full animate-spin" />
        <p className="text-navy-200 text-sm">Loading map…</p>
      </div>
    </div>
  ),
});

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

// ─── Specialty filter pill ────────────────────────────────────────────────────

const FILTERS: { label: string; value: Specialty | 'All' }[] = [
  { label: 'All',           value: 'All' },
  { label: 'Dermatology',   value: 'Dermatology' },
  { label: 'Primary Care',  value: 'Primary Care' },
  { label: 'Family Medicine', value: 'Family Medicine' },
];

const specialtyIcon: Record<Specialty, React.ReactNode> = {
  'Dermatology':   <Stethoscope size={13} aria-hidden="true" />,
  'Primary Care':  <Heart size={13} aria-hidden="true" />,
  'Family Medicine': <Heart size={13} aria-hidden="true" />,
};

const specialtyBadgeClass: Record<Specialty, string> = {
  'Dermatology':   'bg-coral/10 text-coral',
  'Primary Care':  'bg-blue/10 text-blue',
  'Family Medicine':'bg-blue/10 text-blue-light',
};

// ─── FAQ items ────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: 'What does a Skinmap appointment look like?',
    a: 'A medical assistant or nurse at your practice uses the Skinmap iPhone app to capture a full-body photo record — it takes about 60 seconds. Your images are securely stored, and at each follow-up visit your doctor can compare your skin side-by-side to see what changed. No extra equipment, no separate visit.',
  },
  {
    q: 'Is it covered by insurance?',
    a: 'Yes. CPT 96904 (Total Body Photography) is covered by Medicare and major insurers for patients with dysplastic nevi and those with a personal or family history of melanoma. Ask your doctor if you qualify.',
  },
  {
    q: 'How do I ask my doctor about Skinmap?',
    a: 'At your next appointment, simply say: "I read about Skinmap — an app-based Total Body Photography tool that tracks my skin over time. Would you consider adding it to my care?" That\'s all it takes. If they\'re not familiar, you can point them to Skinmap.com.',
  },
  {
    q: 'What happens if my doctor isn\'t on the map yet?',
    a: 'Use the "Request Skinmap in my area" form below. We\'ll note your location in our deployment planning and reach out to practices near you. You can also send your doctor directly to Skinmap.com/contact to get started.',
  },
];

// ─── Request form ────────────────────────────────────────────────────────────

function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', city: '', message: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim())  e.name  = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (!form.city.trim())  e.city  = 'City or state is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  // text-base (16px) prevents iOS Safari from auto-zooming on input focus
  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-gray-200 text-navy text-base focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-colors bg-white';
  const labelClass = 'block text-sm font-semibold text-navy mb-2';
  const errorClass = 'text-xs text-red-500 mt-1';

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center py-10 px-4"
      >
        <div className="w-14 h-14 rounded-full bg-coral/10 flex items-center justify-center mb-4">
          <CheckCircle size={28} className="text-coral" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-navy mb-2">Request received.</h3>
        <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
          We&apos;ll note your area in our deployment planning. If you&apos;d like to bring Skinmap to your doctor directly, share{' '}
          <Link href="/contact" className="text-coral underline underline-offset-2">Skinmap.com/contact</Link> with them.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="req-name">Your name</label>
          <input
            id="req-name"
            type="text"
            className={inputClass}
            placeholder="Jane Smith"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            aria-describedby={errors.name ? 'req-name-error' : undefined}
          />
          {errors.name && <p id="req-name-error" className={errorClass}>{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="req-email">Email address</label>
          <input
            id="req-email"
            type="email"
            className={inputClass}
            placeholder="jane@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            aria-describedby={errors.email ? 'req-email-error' : undefined}
          />
          {errors.email && <p id="req-email-error" className={errorClass}>{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className={labelClass} htmlFor="req-city">Your city or state</label>
        <input
          id="req-city"
          type="text"
          className={inputClass}
          placeholder="Austin, TX"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          aria-describedby={errors.city ? 'req-city-error' : undefined}
        />
        {errors.city && <p id="req-city-error" className={errorClass}>{errors.city}</p>}
      </div>
      <div>
        <label className={labelClass} htmlFor="req-message">
          Anything else? <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <textarea
          id="req-message"
          className={`${inputClass} resize-none h-24`}
          placeholder="My dermatologist doesn't use it yet. I see Dr. …"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
      </div>
      <Button type="submit" variant="primary" size="md" loading={loading} fullWidth>
        Request Skinmap in My Area
        <ArrowRight size={16} aria-hidden="true" />
      </Button>
    </form>
  );
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="divide-y divide-gray-100" role="list">
      {faqs.map((faq, i) => (
        <div key={i} role="listitem">
          <button
            className="w-full flex items-center justify-between py-5 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            <span className="font-semibold text-navy text-sm sm:text-base">{faq.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 text-gray-400"
            >
              <ChevronDown size={18} aria-hidden="true" />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="overflow-hidden"
              >
                <p className="text-gray-500 text-sm leading-relaxed pb-5">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Provider card ────────────────────────────────────────────────────────────

function ProviderCard({
  provider,
  isSelected,
  onClick,
}: {
  provider: Provider;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`w-full text-left rounded-2xl p-4 border transition-all duration-200 ${
        isSelected
          ? 'border-coral bg-coral/5 shadow-glow'
          : 'border-gray-100 bg-white hover:border-coral/30 hover:shadow-card'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="shrink-0 w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
          <span className="text-sm font-bold text-navy">
            {provider.name.split(' ').filter(w => w.startsWith('Dr.') || /^[A-Z]/.test(w)).slice(-1)[0]?.[0] ?? 'M'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-semibold text-navy text-sm leading-snug">{provider.name}</span>
            {provider.accepting && (
              <span className="text-xs text-emerald-600 font-medium">● Accepting</span>
            )}
          </div>
          <p className="text-xs text-gray-500 mb-2 leading-snug truncate">{provider.practice}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${specialtyBadgeClass[provider.specialty]}`}>
              {specialtyIcon[provider.specialty]}
              {provider.specialty}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <MapPin size={10} aria-hidden="true" />
              {provider.city}, {provider.state}
            </span>
          </div>
        </div>
      </div>

      {isSelected && provider.phone && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-coral/20"
        >
          <a
            href={`tel:${provider.phone.replace(/\D/g, '')}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral hover:text-coral-dark transition-colors"
          >
            <Phone size={12} aria-hidden="true" />
            {provider.phone}
          </a>
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ForPatientsPageClient() {
  const [search,      setSearch]      = useState('');
  const [filter,      setFilter]      = useState<Specialty | 'All'>('All');
  const [selectedId,  setSelectedId]  = useState<string | null>(null);
  const mapRef = useRef<MapRef | null>(null);

  // Filter providers by search + specialty
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return providers.filter((p) => {
      const matchesFilter = filter === 'All' || p.specialty === filter;
      const matchesSearch = !q || `${p.name} ${p.city} ${p.state} ${p.practice}`.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [search, filter]);

  // Fly to provider on card click
  const handleProviderSelect = useCallback((provider: Provider) => {
    setSelectedId(provider.id);
    mapRef.current?.flyTo({
      center: [provider.lng, provider.lat],
      zoom:   10,
      duration: 1400,
      essential: true,
    });
  }, []);

  const clearSearch = () => { setSearch(''); setSelectedId(null); };

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[60vh] flex items-center pt-24 pb-16 overflow-hidden bg-white"
        aria-label="Find a Provider"
      >
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <FadeUp>
              <Badge variant="clinical" className="mb-5">For Patients</Badge>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-500 tracking-tight leading-[1.05] mb-5">
                Find a Skinmap
                <br />
                <span className="text-coral">Physician Near You.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                Skinmap is available at dermatology practices and primary care offices across the U.S.
                Search by city, name, or specialty to find a physician near you.
              </p>
            </FadeUp>

            {/* Search bar */}
            <FadeUp delay={0.3}>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 max-w-lg">
                <Search size={18} className="text-gray-400 shrink-0" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setSelectedId(null); }}
                  placeholder="Search by city, name, or practice…"
                  className="flex-1 bg-transparent text-navy placeholder:text-gray-400 text-sm focus:outline-none"
                  aria-label="Search providers"
                />
                {search && (
                  <button onClick={clearSearch} aria-label="Clear search" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X size={16} aria-hidden="true" />
                  </button>
                )}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <p className="text-sm text-gray-500 mt-4">
                Not seeing a provider near you?{' '}
                <a href="#request" className="text-coral font-semibold hover:underline underline-offset-2">
                  Request Skinmap in your area →
                </a>
              </p>
            </FadeUp>
          </div>
        </Container>
      </section>

      {/* ── WHY TRACKING MATTERS ─────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <FadeUp className="text-center mb-14">
            <SectionEyebrow>Why It Matters</SectionEyebrow>
            <SectionHeadline className="text-navy mt-2 max-w-2xl mx-auto">
              Your doctor sees your skin for 5 minutes.
              <br />
              <span className="text-coral">Skinmap builds the record between visits.</span>
            </SectionHeadline>
            <SectionSubtext className="mx-auto mt-4">
              Most skin exams are visual, single-visit, and undocumented. Skinmap changes that —
              giving your physician a secure photo record of your entire skin surface that builds
              with every appointment.
            </SectionSubtext>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: '5M+',
                label: 'new skin cancer cases per year in the U.S.',
                sub: 'More than all other cancers combined.',
                Icon: Heart,
              },
              {
                stat: '98%',
                label: 'five-year survival rate when melanoma is caught at Stage I.',
                sub: 'Drops below 30% at Stage IV. Early detection is everything.',
                Icon: CheckCircle,
              },
              {
                stat: '~60 sec',
                label: 'for a complete full-body skin scan at your appointment.',
                sub: 'No extra visit. No extra equipment. Just an iPhone.',
                Icon: Clock,
              },
            ].map(({ stat, label, sub, Icon }, i) => (
              <FadeUp key={stat} delay={i * 0.1}>
                <div className="rounded-3xl bg-cream border border-gray-200 p-8 text-center h-full flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-coral/10 flex items-center justify-center mb-5">
                    <Icon size={22} className="text-coral" aria-hidden="true" />
                  </div>
                  <div className="text-4xl font-extrabold text-navy mb-3 tracking-tight">{stat}</div>
                  <p className="text-navy text-sm font-medium leading-snug mb-2">{label}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{sub}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── MAP + PROVIDER LIST ────────────────────────────────────────────── */}
      {/*
        Layout strategy:
        - Desktop (lg+): flex-row, fixed to viewport height (100vh - 64px navbar).
          Both columns fill that height; only the cards list scrolls internally.
        - Mobile: flex-col, map gets 45vh, provider list gets 55vh, each scrolls
          independently so neither column ever bleeds past the other.
      */}
      <section aria-label="Provider map and list" className="bg-white">
        <div className="flex flex-col lg:flex-row lg:h-[calc(100vh-64px)]">

          {/* Map — left 60%; fixed height on mobile, stretches to full on desktop */}
          <div
            className="relative w-full lg:w-[60%] bg-navy-900 h-[45vh] lg:h-full"
            aria-label="Interactive provider map"
          >
            <ProviderMap
              providers={filtered}
              selectedId={selectedId}
              onSelect={handleProviderSelect}
              mapRef={mapRef}
            />

            {/* Provider count overlay */}
            <div className="absolute bottom-4 left-4 bg-navy-900/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs text-white font-medium pointer-events-none">
              {filtered.length} provider{filtered.length !== 1 ? 's' : ''} shown
            </div>
          </div>

          {/* Provider list — right 40%; height-constrained so cards scroll inside it */}
          <div className="w-full lg:w-[40%] flex flex-col bg-gray-50 border-l border-gray-100 h-[55vh] lg:h-full">

            {/* Filter bar — pinned at top, never scrolls */}
            <div className="shrink-0 bg-gray-50/95 backdrop-blur-sm border-b border-gray-100 px-5 py-4">
              <div
                className="flex items-center gap-2 flex-wrap"
                role="group"
                aria-label="Filter by specialty"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all duration-200 ${
                      filter === f.value
                        ? 'bg-navy text-white shadow-sm'
                        : 'bg-white text-gray-500 border border-gray-200 hover:border-navy/30 hover:text-navy'
                    }`}
                    aria-pressed={filter === f.value}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider cards — takes remaining height, scrolls independently */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2" role="list" aria-label="Provider list">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center text-center py-12 px-4">
                  <MapPin size={32} className="text-gray-300 mb-3" aria-hidden="true" />
                  <p className="text-navy font-semibold mb-1">No providers found</p>
                  <p className="text-gray-400 text-sm mb-4">Try a different search or filter.</p>
                  <a href="#request" className="text-sm font-semibold text-coral hover:underline underline-offset-2">
                    Request Skinmap in your area →
                  </a>
                </div>
              ) : (
                filtered.map((p) => (
                  <div key={p.id} role="listitem">
                    <ProviderCard
                      provider={p}
                      isSelected={p.id === selectedId}
                      onClick={() => handleProviderSelect(p)}
                    />
                  </div>
                ))
              )}
            </div>

            {/* Request footer — pinned at bottom, never scrolls */}
            <div className="shrink-0 p-4 border-t border-gray-100 bg-cream">
              <p className="text-xs text-gray-500 mb-2">Don&apos;t see a provider near you?</p>
              <a href="#request">
                <Button variant="outline" size="sm" fullWidth>
                  Request Skinmap in My Area
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────────── */}
      <section className="bg-navy py-10 border-y border-white/5" aria-label="Trust signals">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { Icon: Shield,      label: 'HIPAA Compliant',         sub: 'All images encrypted and protected' },
              { Icon: Stethoscope, label: 'Physician-Led',           sub: 'Used by licensed clinicians only' },
              { Icon: Clock,       label: '~60 Second Scan',         sub: 'Full-body capture at your appointment' },
              { Icon: CheckCircle, label: 'Medicare Covered',        sub: 'CPT 96904 for eligible patients' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Icon size={18} className="text-coral" aria-hidden="true" />
                </div>
                <p className="text-white text-sm font-semibold">{label}</p>
                <p className="text-navy-200 text-xs leading-snug">{sub}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── HOW TO ASK YOUR DOCTOR ────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeUp className="text-center mb-12">
              <SectionEyebrow>Start the Conversation</SectionEyebrow>
              <SectionHeadline className="text-navy mt-2">
                How to Ask Your Doctor About Skinmap
              </SectionHeadline>
              <SectionSubtext className="mx-auto mt-4">
                One sentence is all it takes. Here&apos;s exactly what to say.
              </SectionSubtext>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="rounded-3xl bg-navy p-8 lg:p-10 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-coral/10 blur-2xl pointer-events-none" aria-hidden="true" />
                <p className="text-xs font-semibold uppercase tracking-widest text-coral mb-4">Conversation starter</p>
                <blockquote className="text-xl sm:text-2xl text-white font-medium leading-relaxed mb-6">
                  &ldquo;I read about <span className="text-coral font-bold">Skinmap</span> — a Total Body Photography app that tracks my skin over time.
                  It&apos;s covered by Medicare for patients with a history of melanoma or dysplastic nevi.
                  Would you consider adding it to my care?&rdquo;
                </blockquote>
                <p className="text-white/50 text-sm leading-relaxed">
                  If your doctor isn&apos;t familiar with Skinmap yet, point them to{' '}
                  <Link href="/contact?type=demo" className="text-coral underline underline-offset-2 hover:text-coral-light">
                    Skinmap.com/contact
                  </Link>{' '}
                  to get started.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  {
                    step: '01',
                    title: 'Before your appointment',
                    body: 'Note any moles or spots you\'ve been watching. Mention your interest in Skinmap when you book your visit.',
                  },
                  {
                    step: '02',
                    title: 'At your appointment',
                    body: 'Ask your doctor the question above. One sentence is all it takes to start a conversation that could change your care.',
                  },
                  {
                    step: '03',
                    title: 'After your appointment',
                    body: 'If your doctor isn\'t using Skinmap yet, send them to Skinmap.com. Your question could bring Skinmap to your entire practice — and to patients after you.',
                  },
                ].map(({ step, title, body }) => (
                  <div key={step} className="rounded-2xl bg-cream border border-gray-200 p-6">
                    <span className="text-2xl font-extrabold text-coral/30 mb-3 block">{step}</span>
                    <h4 className="font-semibold text-navy text-sm mb-2">{title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{body}</p>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── REQUEST SECTION ──────────────────────────────────────────────────── */}
      <Section background="cream" id="request">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left — copy */}
            <FadeUp>
              <SectionEyebrow>Request Coverage</SectionEyebrow>
              <SectionHeadline className="text-navy mt-3 mb-4">
                Don&apos;t see a provider near you?
              </SectionHeadline>
              <SectionSubtext className="mb-8">
                Tell us where you are. We&apos;ll prioritize your area in our deployment planning and
                work to bring Skinmap to physicians near you.
              </SectionSubtext>

              <div className="space-y-4">
                {[
                  { Icon: MapPin,   text: 'We use your location to prioritize physician outreach' },
                  { Icon: Clock,    text: 'We typically follow up within one week' },
                  { Icon: Heart,    text: 'Your input directly shapes our deployment roadmap' },
                ].map(({ Icon, text }) => (
                  <div key={text} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon size={15} className="text-coral" aria-hidden="true" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Right — form */}
            <FadeUp delay={0.15}>
              <div className="bg-white rounded-3xl p-8 shadow-card">
                <RequestForm />
              </div>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── PATIENT FAQ ───────────────────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <FadeUp className="text-center mb-12">
              <SectionEyebrow>Patient Questions</SectionEyebrow>
              <SectionHeadline className="text-navy mt-3">
                What to know before your appointment
              </SectionHeadline>
            </FadeUp>
            <FadeUp delay={0.1}>
              <FaqAccordion />
            </FadeUp>

            <FadeUp delay={0.2} className="mt-10 text-center">
              <p className="text-sm text-gray-400">
                More questions?{' '}
                <Link href="/contact?type=patient" className="text-coral font-semibold hover:underline underline-offset-2">
                  Contact our team →
                </Link>
              </p>
            </FadeUp>
          </div>
        </Container>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 lg:py-28 overflow-hidden bg-gradient-coral"
        aria-label="Patient call to action"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-navy/20 blur-3xl" />
        </div>
        <Container className="relative z-10 text-center">
          <FadeUp>
            <p className="eyebrow text-white/70 mb-4">You deserve to know</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ask your doctor about Skinmap
              <br className="hidden sm:block" />
              at your next appointment.
            </h2>
            <p className="text-lg text-white/80 max-w-md mx-auto mb-10">
              One conversation could change your skin health story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?type=patient">
                <Button variant="secondary" size="lg">
                  Contact Our Patient Team
                  <ArrowRight size={18} aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/product">
                <Button variant="outline-white" size="lg">
                  Learn How Skinmap Works
                </Button>
              </Link>
            </div>
          </FadeUp>
        </Container>
      </section>
    </>
  );
}
