import { ThemeDemo, ThemeVerification } from '@/components/theme';

export default function Home() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: 'var(--theme-bg, #ffffff)' }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-4xl font-bold mb-8"
          style={{ color: 'var(--theme-text, #000000)' }}
        >
          Brutalist Portfolio
        </h1>
        <p
          className="mb-8 text-lg"
          style={{ color: 'var(--theme-text, #666666)' }}
        >
          Next.js 14 project with dual-theme brutalist architecture
        </p>

        <ThemeDemo />
        <ThemeVerification />
      </div>
    </main>
  );
}
