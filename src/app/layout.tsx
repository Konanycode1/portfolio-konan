import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

import { JsonLd } from "@/components/json-ld";
import { profile, seo } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  applicationName: profile.shortName,
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: seo.shortTitle,
    description: seo.description,
    url: "/",
    siteName: profile.shortName,
    locale: "fr_CI",
    type: "profile",
    firstName: "Abraham",
    lastName: "Konan Kouamé",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.shortTitle,
    description: seo.description,
  },
  other: {
    "geo.region": "CI-AB",
    "geo.placename": "Abidjan",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0e12",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr-CI"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
