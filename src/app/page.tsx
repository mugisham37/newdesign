import { ThemeUtilsDemo } from '@/components/theme/ThemeUtilsDemo';
import { Navigation } from '@/components/sections/Navigation';

export default function Home() {
  return (
    <>
      <Navigation>
        <div className="flex items-center justify-between w-full">
          <div className="text-xl font-bold">PORTFOLIO</div>
          <div className="flex gap-4">
            <span>HOME</span>
            <span>PROJECTS</span>
            <span>CONTACT</span>
          </div>
        </div>
      </Navigation>

      <main
        className="min-h-screen pt-24"
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

          <ThemeUtilsDemo />

          {/* Add some content to test scroll behavior */}
          <div className="space-y-8 mt-16">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="p-8 border-2 border-current">
                <h2 className="text-2xl font-bold mb-4">Section {i + 1}</h2>
                <p>
                  This is test content to demonstrate scroll-based theme
                  transitions. The navigation should change its appearance as
                  you scroll down the page.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
