import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep dark navy — large backgrounds, navbar, dark UI surfaces
        // Using near-black so backgrounds read as premium, not "vivid purple".
        // The brand blue (#271881) is preserved at navy-500 for accent use.
        navy: {
          DEFAULT: "#0D0B28",  // near-black with brand-blue tint — primary dark bg
          50:  "#ECEAF9",
          100: "#C9C4EE",
          200: "#A099E2",
          300: "#7770D7",
          400: "#4E47CB",
          500: "#271881",      // pure brand blue — nav accents, borders, badges
          600: "#201567",
          700: "#18104D",
          800: "#110B34",
          900: "#0D0B28",      // = DEFAULT
        },
        // Primary green — CTA buttons, accent highlights, key callouts
        coral: {
          DEFAULT: "#00CA5A",
          light:   "#33D47B",
          dark:    "#009B44",
          50:  "#E5FFF0",
          100: "#B3FFD4",
          200: "#80FFB8",
          300: "#4DFF9C",
          400: "#26D96D",
          500: "#00CA5A",
          600: "#009B44",
          700: "#00752F",
          800: "#004E1F",
          900: "#00270F",
        },
        // Sky blue — secondary accent, links, badges
        blue: {
          DEFAULT: "#03C0DE",
          light:   "#33CCDF",
          dark:    "#0297B0",
          50:  "#E0F8FD",
          100: "#B3EEFA",
          200: "#80E3F6",
          300: "#4DD8F2",
          400: "#1ACDED",
          500: "#03C0DE",
          600: "#0299B2",
          700: "#027385",
          800: "#014C59",
          900: "#01262C",
        },
        // Teal — tertiary accent
        teal: {
          DEFAULT: "#0097A0",
          50:  "#E0F7FA",
          100: "#B2EBF2",
          200: "#80DEEA",
          300: "#4DD0E1",
          400: "#26C6DA",
          500: "#0097A0",
          600: "#007880",
          700: "#005A60",
          800: "#003C40",
          900: "#001E20",
        },
        // Light section backgrounds — clean barely-blue, not lavender
        cream:    "#F2F5FF",
        warning:  "#F59E0B",
        danger:   "#F87171",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      boxShadow: {
        card:         "0 2px 16px 0 rgba(13,11,40,0.08)",
        "card-hover": "0 8px 32px 0 rgba(13,11,40,0.18)",
        glow:         "0 0 40px rgba(0,202,90,0.30)",
        "glow-blue":  "0 0 40px rgba(3,192,222,0.30)",
        "glow-teal":  "0 0 40px rgba(0,151,160,0.30)",
        "glow-brand": "0 0 60px rgba(39,24,129,0.40)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "slide-down": "slideDown 0.3s ease-out forwards",
        shimmer:      "shimmer 2.5s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // Hero: near-black with the brand blue glowing in the center.
        // Looks like Vista AI / Synchron — premium, not vivid-purple.
        "gradient-hero":
          "linear-gradient(160deg, #0D0B28 0%, #271881 45%, #0D0B28 100%)",
        // CTA banner gradient using primary green
        "gradient-coral":
          "linear-gradient(135deg, #00CA5A 0%, #009B44 100%)",
        // Teal → sky accent gradient
        "gradient-teal":
          "linear-gradient(135deg, #0097A0 0%, #03C0DE 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
