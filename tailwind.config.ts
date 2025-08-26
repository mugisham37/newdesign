import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-mono': ['Space Mono', 'monospace'],
        'jetbrains-mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Extreme Brutalist Theme
        'extreme-bg': '#000000',
        'extreme-text': '#ffffff',
        'extreme-accent': '#ffff00',
        'extreme-highlight': '#00ffff',
        'extreme-success': '#00ff00',

        // Refined Brutalist Theme
        'refined-bg': '#1a1a1a',
        'refined-text': '#f5f5f5',
        'refined-accent': '#8b5cf6',
        'refined-highlight': '#06b6d4',
        'refined-success': '#10b981',
      },
      boxShadow: {
        brutal: '8px 8px 0',
        'brutal-double': '8px 8px 0 #ffff00, 16px 16px 0 #ffffff',
        'brutal-triple':
          '8px 8px 0 #ffff00, 16px 16px 0 #ffffff, 24px 24px 0 #000000',
        'refined-subtle': '4px 4px 12px rgba(0, 0, 0, 0.3)',
        'refined-elevated': '0 10px 30px rgba(0, 0, 0, 0.2)',
        'refined-glow': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'brutal-glitch': 'brutalGlitch 0.3s ease-out',
        'brutal-pulse': 'brutalPulse 2s ease-in-out infinite',
        'smooth-transition': 'smoothTransition 0.4s ease',
        'gentle-float': 'gentleFloat 6s ease-in-out infinite',
      },
      keyframes: {
        brutalGlitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        brutalPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        smoothTransition: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
