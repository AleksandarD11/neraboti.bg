import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { StickyContactActions } from "@/components/sticky-contact-actions";
import { LocalBusinessJsonLd } from "@/components/structured-data";
import { absoluteUrl, shouldIndex, siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: "IT поддръжка чрез AnyDesk и на място | neraboti.bg",
    template: "%s",
  },
  description:
    "Бърза IT поддръжка за компютри, офис мрежи, сървъри и киберсигурност. Отдалечена помощ чрез AnyDesk и посещения на място. Запазете час онлайн.",
  applicationName: siteConfig.siteName,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "bg-BG": absoluteUrl("/"),
      "x-default": absoluteUrl("/"),
    },
  },
  openGraph: {
    siteName: siteConfig.siteName,
    title: "IT поддръжка чрез AnyDesk и на място | neraboti.bg",
    description:
      "Бърза IT поддръжка за компютри, офис мрежи, сървъри и киберсигурност. Отдалечена помощ чрез AnyDesk и посещения на място. Запазете час онлайн.",
    url: absoluteUrl("/"),
    type: "website",
    locale: "bg_BG",
    images: [
      {
        url: absoluteUrl(siteConfig.assets.imagePath),
        width: 1200,
        height: 630,
        alt: "neraboti.bg IT поддръжка",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT поддръжка чрез AnyDesk и на място | neraboti.bg",
    description:
      "Бърза IT поддръжка за компютри, офис мрежи, сървъри и киберсигурност. Отдалечена помощ чрез AnyDesk и посещения на място. Запазете час онлайн.",
    images: [absoluteUrl(siteConfig.assets.imagePath)],
  },
  verification: {
    google: siteConfig.verification.google,
    other: siteConfig.verification.bing
      ? {
          "msvalidate.01": siteConfig.verification.bing,
        }
      : undefined,
  },
  robots: shouldIndex()
    ? {
        index: true,
        follow: true,
      }
    : {
        index: false,
        follow: false,
        nocache: true,
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-link">
          Към основното съдържание
        </a>
        <LocalBusinessJsonLd />
        {children}
        <SiteFooter />
        <StickyContactActions />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
