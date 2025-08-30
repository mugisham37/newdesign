import type { Metadata } from "next";
import "./globals.css";
import PerformanceMonitor from "../components/PerformanceMonitor";

export const metadata: Metadata = {
  title: "Portfolio | Modern Developer Portfolio",
  description:
    "A modern portfolio showcasing projects, experiences, and skills with interactive 3D animations and responsive design",
  keywords: [
    "portfolio",
    "developer",
    "react",
    "nextjs",
    "typescript",
    "three.js",
  ],
  authors: [{ name: "Portfolio Developer" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Portfolio | Modern Developer Portfolio",
    description:
      "A modern portfolio showcasing projects, experiences, and skills with interactive 3D animations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://robohash.org" />

        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Preload critical resources */}
        <link
          rel="preload"
          href="/models/tenhun_falling_spaceman_fanart.glb"
          as="fetch"
          crossOrigin="anonymous"
        />

        {/* Resource hints for better performance */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        <PerformanceMonitor
          enableThreeJSMonitoring={true}
          enableMemoryMonitoring={true}
          enableBundleAnalysis={true}
          enablePreloading={true}
        />
        {children}
      </body>
    </html>
  );
}
