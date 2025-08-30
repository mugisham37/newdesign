/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        midnight: "var(--color-midnight)",
        navy: "var(--color-navy)",
        indigo: "var(--color-indigo)",
        storm: "var(--color-storm)",
        aqua: "var(--color-aqua)",
        mint: "var(--color-mint)",
        royal: "var(--color-royal)",
        lavender: "var(--color-lavender)",
        fuchsia: "var(--color-fuchsia)",
        orange: "var(--color-orange)",
        sand: "var(--color-sand)",
        coral: "var(--color-coral)",
      },
      animation: {
        orbit: "var(--animate-orbit)",
        marquee: "var(--animate-marquee)",
        "marquee-vertical": "var(--animate-marquee-vertical)",
      },
      fontFamily: {
        sans: ["Funnel Display", "sans-serif"],
      },
      spacing: {
        15: "3.75rem", // For lg:px-15 class
        25: "6.25rem", // For mt-25 class
        30: "7.5rem", // For md:mt-30 class
        35: "8.75rem", // For md:mt-35 class
      },
    },
  },
  plugins: [],
};
