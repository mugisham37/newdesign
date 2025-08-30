/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Next.js default colors
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Custom portfolio colors
        primary: "#e5e5e0",
        DarkLava: "#393632",
        SageGray: "#8b8b73",
        gold: "#cfa355",
      },
      fontFamily: {
        amiamie: ["var(--font-amiamie)", "sans-serif"],
        "amiamie-round": ["var(--font-amiamie-round)", "sans-serif"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".5" },
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".clip-path": {
          "clip-path": "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        },
        ".banner-text-responsive": {
          "@apply text-[68px] sm:text-[118px] md:text-[126px] lg:text-[152px] leading-9 sm:leading-16 lg:leading-20":
            {},
        },
        ".value-text-responsive": {
          "@apply text-2xl md:text-[26px] lg:text-[32px]": {},
        },
        ".marquee-text-responsive": {
          "@apply text-[28px] sm:text-[36px] lg:text-[42px]": {},
        },
        ".contact-text-responsive": {
          "@apply text-[42px] sm:text-[52px] md:text-[62px] lg:text-[100px]":
            {},
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
