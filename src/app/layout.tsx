import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
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
  metadataBase: new URL("https://abrahamkonany.dev"),
  title: "Abraham Konan — Développeur Backend",
  description:
    "Développeur backend Node.js / NestJS / TypeScript. APIs, paiements, infrastructure Kubernetes et CI/CD pour des plateformes en production.",
  openGraph: {
    title: "Abraham Konan — Développeur Backend",
    description:
      "APIs, paiements, infrastructure Kubernetes et CI/CD pour des plateformes en production.",
    url: "https://abrahamkonany.dev",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
