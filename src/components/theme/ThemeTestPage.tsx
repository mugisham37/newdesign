/**
 * ThemeTestPage - Test component to verify scroll-based theme detection
 * This component demonstrates the theme transition system in action
 */

'use client';

import React from 'react';
import { ScrollThemeProvider } from './ScrollThemeProvider';
import { NavigationLogo } from '@/components/sections/Navigation/NavigationLogo';
import { NavigationMenu } from '@/components/sections/Navigation/NavigationMenu';

export const ThemeTestPage: React.FC = () => {
  return (
    <ScrollThemeProvider
      onThemeChange={(theme) => console.log('Theme changed to:', theme)}
    >
      <div className="theme-test-page">
        {/* Navigation Section - Extreme Brutalist */}
        <section
          data-theme-section="navigation"
          className="min-h-screen bg-white transition-all duration-[600ms] ease-out flex items-center justify-center"
        >
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 transition-colors duration-[600ms] ease-out">
              EXTREME BRUTALIST
            </h1>
            <p className="text-xl transition-colors duration-[600ms] ease-out">
              Navigation section with harsh, aggressive styling
            </p>

            {/* NavigationLogo Test */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-bold mb-4">
                NavigationLogo Component:
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <NavigationLogo />
                <NavigationLogo text="CUSTOM.DEV" />
                <NavigationLogo showStatus={false} />
              </div>
            </div>

            {/* NavigationMenu Test */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-bold mb-4">
                NavigationMenu Component:
              </h3>
              <div className="flex justify-center">
                <NavigationMenu />
              </div>
            </div>

            <div className="mt-8 p-4 border-8 border-black transition-all duration-[600ms] ease-out">
              <p className="font-mono">Brutal borders and sharp edges</p>
            </div>
          </div>
        </section>

        {/* Hero Section - Extreme Brutalist */}
        <section
          data-theme-section="hero"
          className="min-h-screen bg-yellow-400 transition-all duration-[600ms] ease-out flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 transition-colors duration-[600ms] ease-out">
              HERO SECTION
            </h2>
            <p className="text-xl transition-colors duration-[600ms] ease-out">
              Still in extreme mode with bold colors
            </p>
            <button className="mt-8 px-8 py-4 bg-black text-white border-4 border-black transition-all duration-[600ms] ease-out hover:bg-white hover:text-black">
              BRUTAL BUTTON
            </button>
          </div>
        </section>

        {/* Social Proof Section - Refined Brutalist */}
        <section
          data-theme-section="social-proof"
          className="min-h-screen bg-gradient-to-br from-purple-100 to-cyan-100 transition-all duration-[600ms] ease-out flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4 transition-colors duration-[600ms] ease-out text-gray-800">
              Refined Brutalist
            </h2>
            <p className="text-lg transition-colors duration-[600ms] ease-out text-gray-600">
              Social proof section with softer, professional styling
            </p>

            {/* NavigationLogo Test in Refined Theme */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                NavigationLogo in Refined Theme:
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <NavigationLogo text="REFINED.DEV" statusText="LIVE" />
                <NavigationLogo text="PORTFOLIO" showStatus={false} />
              </div>
            </div>

            {/* NavigationMenu Test in Refined Theme */}
            <div className="mt-8 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                NavigationMenu in Refined Theme:
              </h3>
              <div className="flex justify-center">
                <NavigationMenu />
              </div>
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg transition-all duration-[600ms] ease-out">
              <p className="text-gray-700">
                Softer shadows and rounded corners
              </p>
            </div>
          </div>
        </section>

        {/* Results Section - Refined Brutalist */}
        <section
          data-theme-section="results"
          className="min-h-screen bg-gradient-to-br from-cyan-50 to-purple-50 transition-all duration-[600ms] ease-out flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4 transition-colors duration-[600ms] ease-out text-gray-800">
              Results Section
            </h2>
            <p className="text-lg transition-colors duration-[600ms] ease-out text-gray-600">
              Continuing with refined brutalist theme
            </p>
            <button className="mt-8 px-6 py-3 bg-purple-600 text-white rounded-lg transition-all duration-[600ms] ease-out hover:bg-purple-700 hover:shadow-lg">
              Refined Button
            </button>
          </div>
        </section>

        {/* Footer Section - Refined Brutalist */}
        <section
          data-theme-section="footer"
          className="min-h-screen bg-gray-900 transition-all duration-[600ms] ease-out flex items-center justify-center"
        >
          <div className="text-center">
            <h2 className="text-4xl font-semibold mb-4 transition-colors duration-[600ms] ease-out text-white">
              Footer Section
            </h2>
            <p className="text-lg transition-colors duration-[600ms] ease-out text-gray-300">
              Final section maintaining refined theme
            </p>
            <div className="mt-8 p-6 bg-gray-800 rounded-lg transition-all duration-[600ms] ease-out">
              <p className="text-gray-200">Professional footer styling</p>
            </div>
          </div>
        </section>
      </div>
    </ScrollThemeProvider>
  );
};
