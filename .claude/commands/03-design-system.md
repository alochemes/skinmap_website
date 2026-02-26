# skinmap Design System Agent

You are the skinmap Design System Agent. Your job is to establish the complete design system
and build the core reusable components that all pages will use.

## Steps

1. Read `CLAUDE.md` for brand guidelines and tech stack.
2. Read `research-brief.md` if it exists (output from `/01-research`) for refined recommendations.
3. Initialize the Next.js 14 project if not already done:
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
   ```
4. Install additional dependencies:
   ```bash
   npm install framer-motion lucide-react clsx tailwind-merge
   npm install react-hook-form @hookform/resolvers zod
   ```
5. Update `tailwind.config.ts` with skinmap brand tokens (see spec below).
6. Update `src/styles/globals.css` with base styles and CSS variables.
7. Create `src/lib/utils.ts` with the `cn()` helper.
8. Create all UI components listed below.

## tailwind.config.ts Spec

Add a complete `theme.extend` block with:

```typescript
colors: {
  navy:  { DEFAULT: '#0F1B35', 50: '#E8ECF3', 100: '#C5CEDF', ... },
  coral: { DEFAULT: '#E87B5A', light: '#F0A088', dark: '#C4603E' },
  blue:  { DEFAULT: '#4A89E8', light: '#7AADF0', dark: '#2E6BC9' },
  cream: '#F8F6F3',
  // extend standard gray scale as needed
},
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
fontSize: {
  // fluid type scale using clamp() where helpful
},
boxShadow: {
  card: '0 2px 16px 0 rgba(15,27,53,0.08)',
  'card-hover': '0 8px 32px 0 rgba(15,27,53,0.16)',
  glow: '0 0 40px rgba(232,123,90,0.25)',
},
borderRadius: {
  '2xl': '1rem',
  '3xl': '1.5rem',
  '4xl': '2rem',
},
animation: {
  'fade-up': 'fadeUp 0.6s ease-out forwards',
  'fade-in': 'fadeIn 0.4s ease-out forwards',
},
```

## Components to Create

### `src/lib/utils.ts`
Export a `cn()` function using `clsx` + `tailwind-merge`.

### `src/components/ui/Button.tsx`
Variants: `primary` (coral bg), `secondary` (navy bg), `outline` (navy border), `ghost` (transparent).
Sizes: `sm`, `md` (default), `lg`.
Props: `variant`, `size`, `asChild`, `loading`, plus all standard button HTML props.
Include Framer Motion scale animation on tap.

### `src/components/ui/Badge.tsx`
Variants: `clinical` (blue bg, white text), `partner` (navy bg), `press` (gray), `new` (coral).
Sizes: `sm`, `md`.

### `src/components/ui/Card.tsx`
Variants: `feature` (white, card shadow), `stat` (navy bg, white text), `testimonial` (cream bg),
`team` (white, hover lift).
Include hover shadow transition.

### `src/components/ui/Section.tsx`
Wrapper with consistent `py-16 md:py-24 lg:py-32` padding and optional `background` prop
(`white` | `cream` | `navy`).

### `src/components/ui/Container.tsx`
`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### `src/components/layout/Navbar.tsx`
- Sticky, starts transparent over hero then transitions to `navy` on scroll
- Logo: "skinmap" wordmark in Inter 700 + coral dot or mark
- Desktop links: Product, About, Investors, News, Contact
- Desktop CTA: "Request a Demo" (coral Button)
- Mobile: hamburger → full-screen slide-down menu
- Use Framer Motion for mobile menu animation

### `src/components/layout/Footer.tsx`
- Navy background, white/gray text
- Logo + one-line company description
- 4-column links: Product, Company, Resources, Legal
- Bottom row: copyright + social icons (Twitter/X, LinkedIn)

### `src/app/layout.tsx`
Root layout importing Navbar + Footer, Inter font via `next/font/google`, metadata for skinmap.

## Rules
- TypeScript strictly — no `any` types
- All colors via Tailwind tokens — no hardcoded hex
- Every component must be responsive and accessible (ARIA, focus states)
- Export components as named exports
- Brand name: always lowercase "skinmap"
