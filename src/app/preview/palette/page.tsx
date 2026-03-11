'use client';

// ---------------------------------------------------------------------------
// Hero Background Variants — /preview/palette
// 4 full mini-sites: Current (dark) + 3 light hero treatments
// Nav stays dark navy throughout as the anchor.
// ---------------------------------------------------------------------------

const NAVY   = '#0D0B28';
const BRAND  = '#271881';
const WHITE  = '#FFFFFF';
const GREEN  = '#00CA5A';
const GREEN_DK = '#16A34A';
const BORDER = '#E4E4E7';
const G900   = '#111827';
const G600   = '#4B5563';
const G400   = '#9CA3AF';
const LGREY  = '#F5F5F5';

type Variant = {
  id: string;
  label: string;
  desc: string;
  // Hero area
  heroBg: string;
  heroGrad?: string;
  headingColor: string;
  headingGrad?: string;  // if set, renders headline as CSS gradient text
  subColor: string;
  accentWord: string;   // color of the accent word in h1
  ctaBg: string;
  ctaText: string;
  ctaHover: string;
  outlineBg: string;
  outlineBorder: string;
  outlineText: string;
  trustText: string;
  trustCheck: string;
  eyebrowBg: string;
  eyebrowText: string;
  eyebrowBorder: string;
  phoneBg: string;
  phoneBorder: string;
  phoneAccent: string;
  // Sections below hero
  sec1Bg: string;       // how it works bg
  sec2Bg: string;       // value props bg
  sec3Bg: string;       // stats bg
  sec3Num: string;      // stat number color
  sec3Label: string;
  cardBg: string;
  cardBorder: string;
  sectionHeading: string;
  sectionBody: string;
  sectionEyebrow: string;
  bannerBg: string;
  bannerText: string;
  bannerSub: string;
  bannerPrimBg: string;
  bannerPrimText: string;
  bannerSecBorder: string;
  bannerSecText: string;
};

const variants: Variant[] = [
  // ── 0. CURRENT (dark navy hero) — reference ─────────────────────────────
  {
    id: 'REF', label: 'Current — Dark Navy Hero', desc: 'The site as it exists today. Shown for comparison.',
    heroBg: NAVY, heroGrad: `linear-gradient(150deg, ${NAVY} 0%, ${BRAND} 52%, ${NAVY} 100%)`,
    headingColor: WHITE, subColor: 'rgba(255,255,255,0.78)', accentWord: GREEN,
    ctaBg: GREEN, ctaText: WHITE, ctaHover: GREEN_DK,
    outlineBg: 'transparent', outlineBorder: 'rgba(255,255,255,0.22)', outlineText: WHITE,
    trustText: 'rgba(255,255,255,0.55)', trustCheck: GREEN,
    eyebrowBg: 'rgba(0,202,90,0.12)', eyebrowText: GREEN, eyebrowBorder: 'rgba(0,202,90,0.28)',
    phoneBg: '#080620', phoneBorder: 'rgba(255,255,255,0.10)', phoneAccent: GREEN,
    sec1Bg: '#F2F5FF', sec2Bg: WHITE, sec3Bg: NAVY, sec3Num: GREEN, sec3Label: WHITE,
    cardBg: WHITE, cardBorder: BORDER, sectionHeading: G900, sectionBody: G600, sectionEyebrow: GREEN_DK,
    bannerBg: GREEN, bannerText: WHITE, bannerSub: 'rgba(255,255,255,0.80)',
    bannerPrimBg: WHITE, bannerPrimText: NAVY, bannerSecBorder: 'rgba(255,255,255,0.30)', bannerSecText: WHITE,
  },
  // ── 1. WHITE HERO ────────────────────────────────────────────────────────
  {
    id: 'A', label: 'White Hero', desc: 'Full white hero. Navy-500 gradient headings, green accent. Nav stays dark as the top anchor. shovels.ai / Linear pattern.',
    heroBg: WHITE,
    headingColor: BRAND,
    subColor: G600, accentWord: GREEN,
    ctaBg: GREEN, ctaText: WHITE, ctaHover: GREEN_DK,
    outlineBg: 'transparent', outlineBorder: BORDER, outlineText: BRAND,
    trustText: G400, trustCheck: GREEN,
    eyebrowBg: `rgba(39,24,129,0.08)`, eyebrowText: BRAND, eyebrowBorder: `rgba(39,24,129,0.18)`,
    phoneBg: NAVY, phoneBorder: 'rgba(255,255,255,0.10)', phoneAccent: GREEN,
    sec1Bg: LGREY, sec2Bg: WHITE, sec3Bg: NAVY, sec3Num: GREEN, sec3Label: WHITE,
    cardBg: WHITE, cardBorder: BORDER, sectionHeading: BRAND, sectionBody: G600, sectionEyebrow: BRAND,
    bannerBg: NAVY, bannerText: WHITE, bannerSub: 'rgba(255,255,255,0.72)',
    bannerPrimBg: GREEN, bannerPrimText: WHITE, bannerSecBorder: 'rgba(255,255,255,0.25)', bannerSecText: 'rgba(255,255,255,0.80)',
  },
  // ── 2. LIGHT GREY HERO ───────────────────────────────────────────────────
  {
    id: 'B', label: 'Light Grey Hero', desc: 'Subtle grey wash behind the hero. Navy-500 gradient headings. Sections alternate white / grey below.',
    heroBg: '#F4F4F5',
    headingColor: BRAND,
    subColor: G600, accentWord: GREEN,
    ctaBg: GREEN, ctaText: WHITE, ctaHover: GREEN_DK,
    outlineBg: 'transparent', outlineBorder: '#D4D4D8', outlineText: BRAND,
    trustText: '#71717A', trustCheck: GREEN,
    eyebrowBg: `rgba(39,24,129,0.08)`, eyebrowText: BRAND, eyebrowBorder: `rgba(39,24,129,0.18)`,
    phoneBg: NAVY, phoneBorder: 'rgba(255,255,255,0.10)', phoneAccent: GREEN,
    sec1Bg: WHITE, sec2Bg: '#F4F4F5', sec3Bg: NAVY, sec3Num: GREEN, sec3Label: WHITE,
    cardBg: WHITE, cardBorder: '#E4E4E7', sectionHeading: BRAND, sectionBody: G600, sectionEyebrow: BRAND,
    bannerBg: NAVY, bannerText: WHITE, bannerSub: 'rgba(255,255,255,0.72)',
    bannerPrimBg: GREEN, bannerPrimText: WHITE, bannerSecBorder: 'rgba(255,255,255,0.25)', bannerSecText: 'rgba(255,255,255,0.80)',
  },
  // ── 3. LIGHT GREEN TINT HERO ─────────────────────────────────────────────
  {
    id: 'C', label: 'Light Green Tint Hero', desc: 'Barely-there green wash (#ECFDF5). Navy-500 gradient headings on the tinted background. Green accent word stays.',
    heroBg: '#ECFDF5',
    headingColor: BRAND,
    subColor: G600, accentWord: GREEN,
    ctaBg: GREEN, ctaText: WHITE, ctaHover: GREEN_DK,
    outlineBg: 'transparent', outlineBorder: '#A7F3D0', outlineText: BRAND,
    trustText: '#6B7280', trustCheck: GREEN,
    eyebrowBg: `rgba(39,24,129,0.08)`, eyebrowText: BRAND, eyebrowBorder: `rgba(39,24,129,0.18)`,
    phoneBg: NAVY, phoneBorder: 'rgba(255,255,255,0.10)', phoneAccent: GREEN,
    sec1Bg: WHITE, sec2Bg: '#ECFDF5', sec3Bg: NAVY, sec3Num: GREEN, sec3Label: WHITE,
    cardBg: WHITE, cardBorder: '#D1FAE5', sectionHeading: BRAND, sectionBody: G600, sectionEyebrow: BRAND,
    bannerBg: '#059669', bannerText: WHITE, bannerSub: 'rgba(255,255,255,0.82)',
    bannerPrimBg: WHITE, bannerPrimText: '#064E3B', bannerSecBorder: 'rgba(255,255,255,0.28)', bannerSecText: 'rgba(255,255,255,0.85)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Section components
// ─────────────────────────────────────────────────────────────────────────────

function MiniNav({ v }: { v: Variant }) {
  // Nav is always dark navy — the stable anchor
  return (
    <div style={{ background: NAVY, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', flexShrink: 0 }}>
      <div>
        <span style={{ color: WHITE, fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em' }}>skin</span>
        <span style={{ color: v.ctaBg, fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em' }}>map</span>
      </div>
      <div style={{ display: 'flex', gap: 28 }}>
        {['Product', 'About', 'Investors', 'Contact'].map(l => (
          <span key={l} style={{ color: 'rgba(255,255,255,0.52)', fontSize: 12, fontWeight: 500 }}>{l}</span>
        ))}
      </div>
      <button style={{ background: v.ctaBg, color: v.ctaText, border: 'none', borderRadius: 6, padding: '7px 18px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
        Request a Demo
      </button>
    </div>
  );
}

function MiniHero({ v }: { v: Variant }) {
  return (
    <div style={{ background: v.heroGrad || v.heroBg, padding: '52px 32px 48px', display: 'grid', gridTemplateColumns: '1fr 120px', gap: 32, alignItems: 'center' }}>
      <div>
        {/* Eyebrow */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: v.eyebrowBg, color: v.eyebrowText, border: `1px solid ${v.eyebrowBorder}`, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '4px 12px', borderRadius: 4, marginBottom: 20 }}>
          <span style={{ opacity: 0.6 }}>●</span> For Physicians · iPhone Only
        </div>
        {/* Headline */}
        <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.12, color: v.headingColor, marginBottom: 16 }}>
          See What Changed.<br />
          <span style={{ color: v.accentWord }}>Catch It Early.</span>
        </div>
        {/* Sub */}
        <p style={{ color: v.subColor, fontSize: 13.5, lineHeight: 1.75, marginBottom: 26, maxWidth: 400 }}>
          Full-body skin scans in ~90 seconds. iPhone only.
          No extra room, no expensive hardware, no specialist.
          Any member of your team can do it.
        </p>
        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          <button style={{ background: v.ctaBg, color: v.ctaText, border: 'none', borderRadius: 6, padding: '11px 26px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Request a Demo →
          </button>
          <button style={{ background: v.outlineBg, color: v.outlineText, border: `1.5px solid ${v.outlineBorder}`, borderRadius: 6, padding: '11px 24px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            For Patients
          </button>
        </div>
        {/* Trust strip */}
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap' }}>
          {['Medicare (CPT 96904)', 'iPhone — No Hardware', '~90s Full-Body Scan'].map(t => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5, color: v.trustText, fontSize: 11.5, fontWeight: 500 }}>
              <span style={{ color: v.trustCheck, fontWeight: 900, fontSize: 13 }}>✓</span>{t}
            </span>
          ))}
        </div>
      </div>
      {/* Phone mockup */}
      <div>
        <div style={{ width: 92, height: 180, borderRadius: 20, background: v.phoneBg, border: `2px solid ${v.phoneBorder}`, margin: '0 auto', overflow: 'hidden', boxShadow: `0 20px 50px rgba(0,0,0,0.28), 0 0 40px ${v.phoneAccent}20`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 14, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 22, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.14)' }} />
          </div>
          <div style={{ flex: 1, padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ background: 'rgba(255,255,255,0.07)', borderRadius: 8, padding: '6px 7px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: v.phoneAccent + '28', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: v.phoneAccent }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.18)', marginBottom: 2.5 }} />
                <div style={{ height: 2.5, borderRadius: 3, background: 'rgba(255,255,255,0.08)', width: '65%' }} />
              </div>
            </div>
            <div style={{ flex: 1, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <div style={{ width: 26, height: 30, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 13, height: 10, borderRadius: 2, background: v.phoneAccent, opacity: 0.85 }} />
              </div>
              <div style={{ fontSize: 7, color: v.phoneAccent, fontWeight: 700 }}>~90 seconds</div>
            </div>
            <div style={{ background: v.phoneAccent + '18', borderRadius: 8, padding: '4px 7px', display: 'flex', alignItems: 'center', gap: 5, border: `1px solid ${v.phoneAccent}30` }}>
              <span style={{ color: v.phoneAccent, fontSize: 9, fontWeight: 900 }}>✓</span>
              <div style={{ height: 2.5, borderRadius: 3, background: 'rgba(255,255,255,0.13)', flex: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniHowItWorks({ v }: { v: Variant }) {
  return (
    <div style={{ background: v.sec1Bg, padding: '36px 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ color: v.sectionEyebrow, fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', marginBottom: 8 }}>Clinical Workflow</div>
        <div style={{ color: v.sectionHeading, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 6 }}>How skinmap works</div>
        <div style={{ color: v.sectionBody, fontSize: 13 }}>Any practice. Any patient. About one minute.</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
        {[
          { n: '01', title: 'Capture', body: 'Standard iPhone. Full-body scan in ~90 seconds. No specialist training needed.' },
          { n: '02', title: 'Compare', body: 'Prior scan surfaces automatically — side-by-side, dated, documentable.' },
          { n: '03', title: 'Act Early', body: 'Evolving spots flagged for physician review. Stage I vs. IV starts here.' },
        ].map(s => (
          <div key={s.n} style={{ background: v.cardBg, border: `1px solid ${v.cardBorder}`, borderRadius: 10, padding: '22px 18px', textAlign: 'center' }}>
            <div style={{ width: 46, height: 46, borderRadius: '50%', background: v.ctaBg + '14', border: `1.5px solid ${v.ctaBg}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', position: 'relative' }}>
              <span style={{ color: v.ctaBg, fontSize: 17, fontWeight: 700 }}>◎</span>
              <div style={{ position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: '50%', background: v.ctaBg, color: WHITE, fontSize: 7.5, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.n}</div>
            </div>
            <div style={{ color: v.sectionHeading, fontWeight: 700, fontSize: 13.5, marginBottom: 7 }}>{s.title}</div>
            <div style={{ color: v.sectionBody, fontSize: 11.5, lineHeight: 1.65 }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniValueProp({ v }: { v: Variant }) {
  return (
    <div style={{ background: v.sec2Bg, padding: '36px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start', borderTop: `1px solid ${v.cardBorder}` }}>
      <div>
        <div style={{ display: 'inline-block', background: v.ctaBg + '12', color: v.sectionEyebrow, border: `1px solid ${v.ctaBg}22`, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: 4, marginBottom: 14 }}>
          For Physicians
        </div>
        <div style={{ color: v.sectionHeading, fontSize: 18, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.28, marginBottom: 18 }}>
          Clinical-grade skin tracking.<br />No expensive hardware.
        </div>
        {['Standardized, datestamped full-body documentation', 'Longitudinal comparison at every return visit', 'CPT 96904 Medicare reimbursement — claim-ready', 'HIPAA-compliant. Patented. FDA De Novo pathway.'].map(b => (
          <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, marginBottom: 11 }}>
            <span style={{ color: v.ctaBg, fontWeight: 900, fontSize: 12, marginTop: 2, flexShrink: 0 }}>✓</span>
            <span style={{ color: v.sectionBody, fontSize: 12, lineHeight: 1.6 }}>{b}</span>
          </div>
        ))}
        <button style={{ background: v.ctaBg, color: v.ctaText, border: 'none', borderRadius: 6, padding: '10px 22px', fontSize: 12, fontWeight: 700, marginTop: 8, cursor: 'pointer' }}>Request a Demo →</button>
      </div>
      {/* Dashboard card */}
      <div style={{ background: v.cardBg, border: `1px solid ${v.cardBorder}`, borderRadius: 12, padding: '20px 18px', boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ color: v.sectionHeading, fontWeight: 700, fontSize: 12 }}>Patient Panel</span>
          <span style={{ background: v.ctaBg + '14', color: v.sectionEyebrow, fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 999 }}>Live</span>
        </div>
        {[{ name: 'Johnson, K.', status: 'Review', hi: true }, { name: 'Patel, S.', status: 'Clear', hi: false }, { name: 'Garcia, M.', status: 'Due', hi: true }, { name: 'Nguyen, T.', status: 'Clear', hi: false }].map(row => (
          <div key={row.name} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 0', borderBottom: `1px solid ${v.cardBorder}` }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: row.hi ? v.ctaBg : '#D1D5DB', flexShrink: 0 }} />
            <span style={{ color: v.sectionHeading, fontSize: 12, fontWeight: 500, flex: 1 }}>{row.name}</span>
            <span style={{ color: row.hi ? v.sectionEyebrow : v.sectionBody, fontSize: 11, fontWeight: row.hi ? 700 : 400 }}>{row.status}</span>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 14 }}>
          {[{ l: 'Patients', v: '84' }, { l: 'Due', v: '12' }, { l: 'Flagged', v: '3' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center', background: v.sec1Bg, border: `1px solid ${v.cardBorder}`, borderRadius: 8, padding: '8px 4px' }}>
              <div style={{ color: v.sectionHeading, fontWeight: 800, fontSize: 16 }}>{s.v}</div>
              <div style={{ color: v.sectionBody, fontSize: 10, marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStats({ v }: { v: Variant }) {
  return (
    <div style={{ background: v.sec3Bg, padding: '34px 32px', textAlign: 'center' }}>
      <div style={{ color: v.ctaBg, fontSize: 10, fontWeight: 700, letterSpacing: '0.11em', textTransform: 'uppercase', marginBottom: 24 }}>skinmap in your practice</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        {[{ val: '90s', label: 'Scan time', ctx: '' }, { val: '80%', label: 'Patient opt-in', ctx: 'When offered as part of routine care' }, { val: '[X]', label: 'To get started', ctx: 'vs. tens of thousands for TBP hardware' }].map(s => (
          <div key={s.label}>
            <div style={{ fontSize: 34, fontWeight: 900, color: v.sec3Num, letterSpacing: '-0.04em', marginBottom: 5 }}>{s.val}</div>
            <div style={{ color: v.sec3Label, fontWeight: 600, fontSize: 12, marginBottom: 5, opacity: 0.9 }}>{s.label}</div>
            {s.ctx && <div style={{ color: 'rgba(255,255,255,0.38)', fontSize: 10.5, lineHeight: 1.5 }}>{s.ctx}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniBanner({ v }: { v: Variant }) {
  return (
    <div style={{ background: v.bannerBg, padding: '40px 32px', textAlign: 'center' }}>
      <div style={{ color: v.bannerText, fontSize: 22, fontWeight: 900, letterSpacing: '-0.025em', marginBottom: 10 }}>Add Skinmap to Your Practice</div>
      <div style={{ color: v.bannerSub, fontSize: 13, marginBottom: 26, lineHeight: 1.65 }}>Available to dermatologists and PCPs across the U.S. Medicare reimbursed.</div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button style={{ background: v.bannerPrimBg, color: v.bannerPrimText, border: 'none', borderRadius: 6, padding: '12px 28px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Request a Demo</button>
        <button style={{ background: 'transparent', color: v.bannerSecText, border: `1.5px solid ${v.bannerSecBorder}`, borderRadius: 6, padding: '12px 26px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Ask Your Doctor About skinmap</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Full card per variant
// ─────────────────────────────────────────────────────────────────────────────
const BADGE_COLORS: Record<string, string> = {
  REF: '#6B7280', A: GREEN, B: '#71717A', C: '#059669',
};

function VariantCard({ v, isRef }: { v: Variant; isRef?: boolean }) {
  return (
    <div id={`v-${v.id}`} style={{ marginBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 8, background: BADGE_COLORS[v.id], color: WHITE, fontSize: 16, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
          {v.id}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 5 }}>
            <span style={{ fontSize: 21, fontWeight: 900, color: '#111827', letterSpacing: '-0.015em' }}>{v.label}</span>
            {isRef && <span style={{ background: '#F3F4F6', color: '#9CA3AF', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 999, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Current</span>}
          </div>
          <div style={{ color: '#6B7280', fontSize: 13.5, lineHeight: 1.6 }}>{v.desc}</div>
        </div>
      </div>

      {/* Mini site */}
      <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: isRef ? '0 2px 16px rgba(0,0,0,0.08)' : '0 4px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)', opacity: isRef ? 0.75 : 1 }}>
        <MiniNav v={v} />
        <MiniHero v={v} />
        <MiniHowItWorks v={v} />
        <MiniValueProp v={v} />
        <MiniStats v={v} />
        <MiniBanner v={v} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function PalettePage() {
  return (
    <div style={{ background: '#EFEFED', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 28px 100px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ display: 'inline-block', background: 'rgba(0,202,90,0.09)', color: GREEN_DK, fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '4px 14px', borderRadius: 4, border: `1px solid rgba(0,202,90,0.20)`, marginBottom: 18 }}>
            /09-color-palette — Hero Variants
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 900, color: '#111827', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 14 }}>
            Hero Background Variants
          </h1>
          <p style={{ color: '#6B7280', fontSize: 15, maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
            The current dark navy hero vs. three light treatments.
            Nav stays dark throughout as the stable anchor.
            Sections below the hero stay consistent across all variants.
          </p>
        </div>

        {/* Quick nav */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          {[
            { id: 'REF', label: 'Current (Dark)' },
            { id: 'A', label: 'A — White' },
            { id: 'B', label: 'B — Light Grey' },
            { id: 'C', label: 'C — Green Tint' },
          ].map(({ id, label }) => (
            <a key={id} href={`#v-${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: WHITE, border: `1.5px solid #E4E4E7`, borderRadius: 999, padding: '7px 20px', fontSize: 13, fontWeight: 600, color: '#111827', textDecoration: 'none', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
              <span style={{ color: BADGE_COLORS[id], fontWeight: 900 }}>●</span>{label}
            </a>
          ))}
        </div>

        {/* Current reference — dimmed */}
        <VariantCard v={variants[0]} isRef />

        {/* Three new variants */}
        {variants.slice(1).map(v => <VariantCard key={v.id} v={v} />)}

        {/* Footer */}
        <div style={{ background: WHITE, border: '1px solid #E4E4E7', borderRadius: 14, padding: '28px 36px', textAlign: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontWeight: 800, fontSize: 17, color: '#111827', marginBottom: 8 }}>Ready to implement?</div>
          <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.65, maxWidth: 520, margin: '0 auto' }}>
            Reply <strong style={{ color: '#111827' }}>approve A</strong> (White), <strong style={{ color: '#111827' }}>approve B</strong> (Light Grey), or <strong style={{ color: '#111827' }}>approve C</strong> (Green Tint) and I&apos;ll apply it to the real site at localhost:3001.
          </p>
        </div>

      </div>
    </div>
  );
}
