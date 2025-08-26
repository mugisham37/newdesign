import { ThemeUtilsDemo } from '@/components/theme/ThemeUtilsDemo';
import { Navigation } from '@/components/sections/Navigation';

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="container mx-auto px-4 py-8 text-center">
            <h1
              className="text-6xl font-bold mb-8"
              style={{ color: 'var(--text-primary)' }}
            >
              BRUTALIST PORTFOLIO
            </h1>
            <p
              className="mb-8 text-xl max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Next.js 14 project with dual-theme brutalist architecture
              featuring complex animations and brutal design elements
            </p>

            <ThemeUtilsDemo />
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="container mx-auto px-4 py-16">
            <h2
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              FEATURED PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="p-8 border-4 border-current"
                  style={{
                    borderColor: 'var(--border-primary)',
                    backgroundColor: 'var(--bg-primary)',
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    PROJECT {i + 1}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Brutal design implementation with complex animations and
                    theme-aware styling.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="container mx-auto px-4 py-16">
            <h2
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              PROFESSIONAL EXPERIENCE
            </h2>
            <div className="space-y-8 max-w-4xl mx-auto">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="p-8 border-4 border-current"
                  style={{
                    borderColor: 'var(--border-accent)',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    SENIOR DEVELOPER ROLE {i + 1}
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--color-accent)' }}>
                    2020 - Present
                  </p>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    Led development of complex web applications with focus on
                    performance, accessibility, and brutal design aesthetics.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section
          id="results"
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="container mx-auto px-4 py-16">
            <h2
              className="text-4xl font-bold mb-12 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              CLIENT SUCCESS METRICS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { metric: '500%', label: 'Performance Increase' },
                { metric: '99.9%', label: 'Uptime Achieved' },
                { metric: '50+', label: 'Projects Delivered' },
                { metric: '100%', label: 'Client Satisfaction' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 border-4 border-current text-center"
                  style={{
                    borderColor: 'var(--color-accent)',
                    backgroundColor: 'var(--bg-primary)',
                  }}
                >
                  <div
                    className="text-4xl font-bold mb-4"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {item.metric}
                  </div>
                  <p style={{ color: 'var(--text-primary)' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: 'var(--bg-primary)' }}
        >
          <div className="container mx-auto px-4 py-16 text-center">
            <h2
              className="text-4xl font-bold mb-12"
              style={{ color: 'var(--text-primary)' }}
            >
              GET IN TOUCH
            </h2>
            <div className="max-w-2xl mx-auto">
              <p
                className="text-xl mb-8"
                style={{ color: 'var(--text-secondary)' }}
              >
                Ready to collaborate on your next brutal design project?
                Let&apos;s create something extraordinary together.
              </p>
              <div
                className="p-8 border-4 border-current"
                style={{
                  borderColor: 'var(--border-accent)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <p
                  className="text-lg font-bold mb-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  CONTACT INFORMATION
                </p>
                <div className="space-y-2">
                  <p style={{ color: 'var(--color-accent)' }}>
                    EMAIL: contact@brutalist.dev
                  </p>
                  <p style={{ color: 'var(--color-accent)' }}>
                    PHONE: +1 (555) 123-4567
                  </p>
                  <p style={{ color: 'var(--color-accent)' }}>
                    LOCATION: Remote / Global
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
