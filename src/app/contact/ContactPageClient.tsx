'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Shield, Clock, Users, Twitter, Linkedin, CheckCircle, Mail } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Section, SectionEyebrow } from '@/components/ui/Section';
import { Container } from '@/components/ui/Container';
import { analytics } from '@/lib/analytics';

// ── Shared API helper ─────────────────────────────────────────────────────────

async function postContact(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error((json as { error?: string }).error ?? 'Something went wrong. Please try again.');
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TabConfig {
  label: string;
  headline: string;
}

interface FormProps {
  onSuccess: () => void;
  onError: (msg: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Maps the ?type= URL param to the correct tab index
const TYPE_TO_TAB: Record<string, number> = {
  demo:     0,
  partner:  1,
  clinical: 1,
  investor: 2,
  patient:  3,
  general:  3,
  careers:  3,
  press:    4,
};

const TABS: TabConfig[] = [
  {
    label: 'Physician Demo',
    headline: 'See skinmap in a 30-minute live demo built around your patient workflow.',
  },
  {
    label: 'Clinical Partnership',
    headline:
      'Integrate skinmap into your health system, hospital, or clinical research program.',
  },
  {
    label: 'Investment Inquiry',
    headline: 'Connect with the skinmap founding team for a full investor briefing.',
  },
  {
    label: 'Patient / General',
    headline: 'Ask us anything — or ask us to help you bring skinmap to your doctor.',
  },
  {
    label: 'Press',
    headline: 'Media inquiries, interview requests, and press kit access.',
  },
];

const EMAIL_CONTACTS = [
  { label: 'Physician demos', email: 'demos@skinmap.com' },
  { label: 'Clinical partnerships', email: 'partners@skinmap.com' },
  { label: 'Press', email: 'press@skinmap.com' },
  { label: 'General', email: 'hello@skinmap.com' },
];

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: 'HIPAA Compliant',
    description: 'Your information is protected',
  },
  {
    icon: Clock,
    title: '1 Business Day',
    description: 'Response time guarantee',
  },
  {
    icon: Users,
    title: 'Personal Response',
    description: 'Every inquiry answered by the skinmap team',
  },
];

// ─── Shared styles ────────────────────────────────────────────────────────────

// text-base (16px) prevents iOS Safari from auto-zooming on input focus
const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 text-navy text-base focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent transition-colors';
const labelClass = 'block text-sm font-semibold text-navy mb-2';
const errorClass = 'text-xs text-red-500 mt-1';
const textareaClass = `${inputClass} resize-none h-28`;

// ─── Success State ─────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center text-center py-12 px-4"
    >
      <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mb-6">
        <CheckCircle className="text-coral" size={32} />
      </div>
      <h3 className="text-2xl font-bold text-navy mb-4">
        You&apos;re in. We&apos;ll be in touch shortly.
      </h3>
      <p className="text-gray-500 leading-relaxed max-w-md mb-8">
        We typically respond within one business day. In the meantime, you&apos;re welcome to
        explore the skinmap product page or review our clinical validation data — links below.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/product"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-navy text-navy font-semibold text-sm hover:bg-navy hover:text-white transition-colors"
        >
          Explore the Product
        </Link>
        <Link
          href="/product#accuracy"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border-2 border-coral text-coral font-semibold text-sm hover:bg-coral hover:text-white transition-colors"
        >
          Clinical Validation Data
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Form: Physician Demo ──────────────────────────────────────────────────────

const physicianDemoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  specialty: z.string().min(1, 'Medical specialty is required'),
  practice: z.string().min(1, 'Practice or hospital is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type PhysicianDemoData = z.infer<typeof physicianDemoSchema>;

function PhysicianDemoForm({ onSuccess, onError }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhysicianDemoData>({ resolver: zodResolver(physicianDemoSchema) });

  const onSubmit = async (data: PhysicianDemoData) => {
    try {
      await postContact({ type: 'physician_demo', ...data });
      analytics.demoRequestSubmitted({ form_location: 'contact_page', specialty: data.specialty });
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="pd-name" className={labelClass}>
          Full Name <span className="text-coral">*</span>
        </label>
        <input id="pd-name" type="text" className={inputClass} {...register('name')} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="pd-specialty" className={labelClass}>
          Medical Specialty <span className="text-coral">*</span>
        </label>
        <input
          id="pd-specialty"
          type="text"
          placeholder="e.g. Dermatology, Primary Care, Oncology"
          className={inputClass}
          {...register('specialty')}
        />
        {errors.specialty && <p className={errorClass}>{errors.specialty.message}</p>}
      </div>
      <div>
        <label htmlFor="pd-practice" className={labelClass}>
          Practice or Hospital <span className="text-coral">*</span>
        </label>
        <input id="pd-practice" type="text" className={inputClass} {...register('practice')} />
        {errors.practice && <p className={errorClass}>{errors.practice.message}</p>}
      </div>
      <div>
        <label htmlFor="pd-email" className={labelClass}>
          Work Email <span className="text-coral">*</span>
        </label>
        <input id="pd-email" type="email" className={inputClass} {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="pd-phone" className={labelClass}>
          Phone <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input id="pd-phone" type="tel" className={inputClass} {...register('phone')} />
      </div>
      <div>
        <label htmlFor="pd-message" className={labelClass}>
          Anything you&apos;d like us to know <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea id="pd-message" className={textareaClass} {...register('message')} />
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}

// ─── Form: Clinical Partnership ───────────────────────────────────────────────

const partnershipSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  organization: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role or title is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().optional(),
});

type PartnershipData = z.infer<typeof partnershipSchema>;

function PartnershipForm({ onSuccess, onError }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PartnershipData>({ resolver: zodResolver(partnershipSchema) });

  const onSubmit = async (data: PartnershipData) => {
    try {
      await postContact({ type: 'partnership', ...data });
      analytics.contactFormSubmitted({ inquiry_type: 'partnership', form_location: 'contact_page' });
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="cp-name" className={labelClass}>
          Full Name <span className="text-coral">*</span>
        </label>
        <input id="cp-name" type="text" className={inputClass} {...register('name')} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="cp-organization" className={labelClass}>
          Organization <span className="text-coral">*</span>
        </label>
        <input id="cp-organization" type="text" className={inputClass} {...register('organization')} />
        {errors.organization && <p className={errorClass}>{errors.organization.message}</p>}
      </div>
      <div>
        <label htmlFor="cp-role" className={labelClass}>
          Role / Title <span className="text-coral">*</span>
        </label>
        <input id="cp-role" type="text" className={inputClass} {...register('role')} />
        {errors.role && <p className={errorClass}>{errors.role.message}</p>}
      </div>
      <div>
        <label htmlFor="cp-email" className={labelClass}>
          Work Email <span className="text-coral">*</span>
        </label>
        <input id="cp-email" type="email" className={inputClass} {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="cp-message" className={labelClass}>
          Tell us about your program <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea id="cp-message" className={textareaClass} {...register('message')} />
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}

// ─── Form: Investment Inquiry ─────────────────────────────────────────────────

const investorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  firm: z.string().min(1, 'Firm or organization is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().optional(),
});

type InvestorData = z.infer<typeof investorSchema>;

function InvestorForm({ onSuccess, onError }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InvestorData>({ resolver: zodResolver(investorSchema) });

  const onSubmit = async (data: InvestorData) => {
    try {
      await postContact({ type: 'investor', ...data });
      analytics.contactFormSubmitted({ inquiry_type: 'general', form_location: 'contact_page' });
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="inv-name" className={labelClass}>
          Full Name <span className="text-coral">*</span>
        </label>
        <input id="inv-name" type="text" className={inputClass} {...register('name')} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="inv-firm" className={labelClass}>
          Firm / Organization <span className="text-coral">*</span>
        </label>
        <input id="inv-firm" type="text" className={inputClass} {...register('firm')} />
        {errors.firm && <p className={errorClass}>{errors.firm.message}</p>}
      </div>
      <div>
        <label htmlFor="inv-email" className={labelClass}>
          Email <span className="text-coral">*</span>
        </label>
        <input id="inv-email" type="email" className={inputClass} {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="inv-message" className={labelClass}>
          Message <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea id="inv-message" className={textareaClass} {...register('message')} />
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}

// ─── Form: Patient / General ──────────────────────────────────────────────────

const patientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

type PatientData = z.infer<typeof patientSchema>;

function PatientForm({ onSuccess, onError }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientData>({ resolver: zodResolver(patientSchema) });

  const onSubmit = async (data: PatientData) => {
    try {
      await postContact({ type: 'patient', ...data });
      analytics.patientInquirySubmitted({ form_location: 'contact_page' });
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="pt-name" className={labelClass}>
          Full Name <span className="text-coral">*</span>
        </label>
        <input id="pt-name" type="text" className={inputClass} {...register('name')} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="pt-email" className={labelClass}>
          Email <span className="text-coral">*</span>
        </label>
        <input id="pt-email" type="email" className={inputClass} {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="pt-subject" className={labelClass}>
          Subject <span className="text-coral">*</span>
        </label>
        <input id="pt-subject" type="text" className={inputClass} {...register('subject')} />
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="pt-message" className={labelClass}>
          Message <span className="text-coral">*</span>
        </label>
        <textarea id="pt-message" className={textareaClass} {...register('message')} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}

// ─── Form: Press ──────────────────────────────────────────────────────────────

const pressSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  publication: z.string().min(1, 'Publication is required'),
  email: z.string().email('Valid email is required'),
  message: z.string().min(1, 'Message is required'),
});

type PressData = z.infer<typeof pressSchema>;

function PressForm({ onSuccess, onError }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PressData>({ resolver: zodResolver(pressSchema) });

  const onSubmit = async (data: PressData) => {
    try {
      await postContact({ type: 'press', ...data });
      analytics.contactFormSubmitted({ inquiry_type: 'press', form_location: 'contact_page' });
      onSuccess();
    } catch (err) {
      onError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <label htmlFor="pr-name" className={labelClass}>
          Full Name <span className="text-coral">*</span>
        </label>
        <input id="pr-name" type="text" className={inputClass} {...register('name')} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="pr-publication" className={labelClass}>
          Publication <span className="text-coral">*</span>
        </label>
        <input id="pr-publication" type="text" className={inputClass} {...register('publication')} />
        {errors.publication && <p className={errorClass}>{errors.publication.message}</p>}
      </div>
      <div>
        <label htmlFor="pr-email" className={labelClass}>
          Email <span className="text-coral">*</span>
        </label>
        <input id="pr-email" type="email" className={inputClass} {...register('email')} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="pr-message" className={labelClass}>
          Message <span className="text-coral">*</span>
        </label>
        <textarea id="pr-message" className={textareaClass} {...register('message')} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="primary" fullWidth loading={isSubmitting}>
        Send Message
      </Button>
    </form>
  );
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Main Client Component ────────────────────────────────────────────────────

export function ContactPageClient() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type') ?? '';
  const initialTab = TYPE_TO_TAB[typeParam] ?? 0;

  const [activeTab, setActiveTab] = useState<number>(initialTab);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Reset state when tab changes
  useEffect(() => {
    setIsSubmitted(false);
    setApiError(null);
  }, [activeTab]);

  const handleSuccess = useCallback(() => {
    setApiError(null);
    setIsSubmitted(true);
  }, []);

  const handleError = useCallback((msg: string) => {
    setApiError(msg);
  }, []);

  const renderForm = () => {
    if (isSubmitted) {
      return <SuccessState />;
    }
    const props = { onSuccess: handleSuccess, onError: handleError };
    switch (activeTab) {
      case 0: return <PhysicianDemoForm {...props} />;
      case 1: return <PartnershipForm {...props} />;
      case 2: return <InvestorForm {...props} />;
      case 3: return <PatientForm {...props} />;
      case 4: return <PressForm {...props} />;
      default: return <PhysicianDemoForm {...props} />;
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-20 border-b border-gray-100">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.div variants={prefersReducedMotion ? {} : fadeUp}>
              <SectionEyebrow>GET IN TOUCH</SectionEyebrow>
            </motion.div>
            <motion.h1
              variants={prefersReducedMotion ? {} : fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-navy-500 mt-4 mb-6"
            >
              Let&apos;s Talk About What skinmap Can Do for Your Practice.
            </motion.h1>
            <motion.p
              variants={prefersReducedMotion ? {} : fadeUp}
              className="text-lg text-gray-600 leading-relaxed max-w-2xl"
            >
              Physician demo, investor inquiry, clinical partnership, or general question — we respond within one business day.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ── Segmented Contact Form ────────────────────────────────────────── */}
      <Section background="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14 items-start">

            {/* Left: Tab selector + form */}
            <div className="lg:col-span-2">
              {/* Tab bar — horizontal scrollable */}
              <div className="overflow-x-auto pb-2 -mx-1">
                <div className="flex gap-2 min-w-max px-1" role="tablist" aria-label="Contact form type">
                  {TABS.map((tab, index) => (
                    <button
                      key={tab.label}
                      id={`tab-${index}`}
                      role="tab"
                      aria-selected={activeTab === index}
                      aria-controls={`tabpanel-${index}`}
                      onClick={() => setActiveTab(index)}
                      className={`
                        px-4 py-2 rounded-full text-sm font-semibold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2
                        ${
                          activeTab === index
                            ? 'bg-navy text-white'
                            : 'bg-cream text-navy hover:bg-gray-100'
                        }
                      `}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form container */}
              <motion.div
                key={activeTab}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-card"
                role="tabpanel"
                id={`tabpanel-${activeTab}`}
                aria-labelledby={`tab-${activeTab}`}
              >
                {!isSubmitted && (
                  <h2 className="text-xl md:text-2xl font-bold text-navy mb-8 leading-snug">
                    {TABS[activeTab].headline}
                  </h2>
                )}
                {apiError && (
                  <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {apiError}
                  </div>
                )}
                {renderForm()}
              </motion.div>
            </div>

            {/* Right: Contact details sidebar */}
            <div className="lg:sticky lg:top-28">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-navy mb-5">Other ways to reach us</h3>
                  <ul className="space-y-4">
                    {EMAIL_CONTACTS.map((item) => (
                      <li key={item.label} className="flex items-start gap-3">
                        <div className="mt-0.5 w-8 h-8 rounded-lg bg-coral/10 flex items-center justify-center shrink-0">
                          <Mail size={15} className="text-coral" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                            {item.label}
                          </p>
                          <a
                            href={`mailto:${item.email}`}
                            className="text-sm font-medium text-navy hover:text-coral transition-colors"
                          >
                            {item.email}
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="h-px bg-gray-100" />

                <div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">
                    We respond to all inquiries within one business day.
                  </p>
                  <div className="flex gap-3">
                    <a
                      href="https://twitter.com/skinmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="skinmap on Twitter / X"
                      className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                    <a
                      href="https://linkedin.com/company/skinmap"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="skinmap on LinkedIn"
                      className="w-10 h-10 rounded-full bg-navy-50 flex items-center justify-center text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>

                <div className="h-px bg-gray-100" />

                <p className="text-xs text-gray-400 leading-relaxed">
                  skinmap is HIPAA compliant. Information you share with us is handled in
                  accordance with our privacy policy and never used for marketing purposes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── Trust Reassurance Strip ───────────────────────────────────────── */}
      <section className="bg-cream py-12 md:py-16">
        <Container>
          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8"
          >
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  variants={prefersReducedMotion ? {} : fadeUp}
                  className="flex flex-col items-center text-center sm:items-start sm:text-left gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-white shadow-card flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-coral" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy mb-1">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
