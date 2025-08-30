import type { Metadata } from "next";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
