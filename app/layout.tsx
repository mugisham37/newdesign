import type { Metadata } from "next";
import { ReactNode } from "react";
import { amiamie, amiamieRound } from "./fonts";
import "./globals.css";

// TypeScript interface for RootLayout props
interface RootLayoutProps {
  children: ReactNode;
}

// SEO optimized metadata configuration
export const metadata: Metadata = {
  title: {
    default: "Portfolio | Creative Developer & 3D Artist",
    template: "%s | Portfolio",
  },
  description:
    "A stunning portfolio showcasing creative development, 3D graphics, and interactive animations. Built with Next.js, Three.js, and GSAP.",
  keywords: [
    "portfolio",
    "creative developer",
    "3D graphics",
    "Three.js",
    "GSAP animations",
    "web development",
    "interactive design",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Creative Developer" }],
  creator: "Creative Developer",
  publisher: "Creative Developer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://portfolio.example.com"), // Update with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.example.com", // Update with actual domain
    title: "Portfolio | Creative Developer & 3D Artist",
    description:
      "A stunning portfolio showcasing creative development, 3D graphics, and interactive animations.",
    siteName: "Creative Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // Add OG image to public/images/
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Creative Developer & 3D Artist",
    description:
      "A stunning portfolio showcasing creative development, 3D graphics, and interactive animations.",
    images: ["/images/og-image.jpg"], // Add Twitter image to public/images/
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification IDs when available
    // google: "verification-code",
    // yandex: "verification-code",
    // yahoo: "verification-code",
  },
};

// Root layout component with font integration and proper HTML structure
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${amiamie.variable} ${amiamieRound.variable}`}>
      <head>
        {/* Preload critical fonts for better performance */}
        <link
          rel="preload"
          href="/fonts/amiamie/otf/Amiamie-Regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/amiamie/otf/Amiamie-Black.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#e5e5e0" />
        {/* Viewport configuration for responsive design */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className={`${amiamie.className} antialiased`}>
        {/* Main content wrapper */}
        <div id="__next" className="min-h-screen">
          {children}
        </div>
        {/* Prevent flash of unstyled content */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent FOUC (Flash of Unstyled Content)
              document.documentElement.style.visibility = 'visible';
            `,
          }}
        />
      </body>
    </html>
  );
}
