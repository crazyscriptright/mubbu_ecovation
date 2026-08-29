import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NEXORA — Interior Design & Architecture",
    template: "%s | NEXORA",
  },
  description: "Premium interior design and architecture studio. Thoughtful design. Timeless spaces. Inspired living.",
  keywords: ["interior design", "architecture", "luxury homes", "commercial spaces", "design studio"],
  authors: [{ name: "NEXORA" }],
  creator: "NEXORA",
  publisher: "NEXORA",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexora.design",
    siteName: "NEXORA",
    title: "NEXORA — Interior Design & Architecture",
    description: "Premium interior design and architecture studio. Thoughtful design. Timeless spaces. Inspired living.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "NEXORA Interior Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXORA — Interior Design & Architecture",
    description: "Premium interior design and architecture studio.",
    images: ["/images/og-default.jpg"],
  },
  alternates: {
    canonical: "https://nexora.design",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}