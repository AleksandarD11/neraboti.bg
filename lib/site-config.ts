import { businessInfo } from "./business-info";
import { indicativePrices } from "./booking-config";
import { servicePages } from "./seo-pages";

const productionBaseUrl = "https://neraboti.bg";
const configuredBaseUrl = process.env.NEXT_PUBLIC_SITE_URL;
const safeBaseUrl =
  configuredBaseUrl && !configuredBaseUrl.includes("vercel.app")
    ? configuredBaseUrl
    : productionBaseUrl;

export const siteConfig = {
  siteName: "neraboti.bg",
  baseUrl: safeBaseUrl,
  configuredBaseUrl,
  productionBaseUrl,
  defaultLocale: "bg-BG",
  alternateLocale: "en",
  alternateLocaleEnabled: false,
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || undefined,
  },
  assets: {
    logoPath: "/icon.svg",
    imagePath: "/og-image.svg",
  },
  business: {
    name: businessInfo.brand,
    legalName: businessInfo.companyName,
    vatOrCompanyId: businessInfo.companyId,
    description: businessInfo.description,
    phone: businessInfo.phone,
    email: businessInfo.email,
    priceRange: indicativePrices.priceRange,
    address: {
      streetAddress: businessInfo.address,
      addressLocality: "",
      postalCode: "",
      addressCountry: "BG",
    },
    geo: {
      latitude: null as number | null,
      longitude: null as number | null,
    },
    openingHours: ["Mo-Fr 09:00-18:00"],
    areaServed: ["България"],
    sameAs: [] as string[],
    services: [
      "Отдалечена IT поддръжка",
      "IT поддръжка на място",
      "Сървъри и IT инфраструктура",
      "Киберсигурност одит и проверка за уязвимости",
      "Офис абонаментна поддръжка",
    ],
  },
} as const;

export const publicRoutes = [
  "/",
  "/uslugi",
  "/uslugi/otdalechena-it-poddrazhka",
  "/uslugi/it-poddrazhka-na-myasto",
  "/uslugi/sarvari-i-infrastruktura",
  "/uslugi/kibersigurnost-odit",
  "/ceni",
  "/anydesk-pomosht",
  "/za-nas",
  "/kontakti",
  "/faq",
  "/blog",
  "/terms",
  "/privacy",
  "/cookies",
] as const;

export const languageRoutes = {
  "bg-BG": "/",
  "x-default": "/",
  // English routes are intentionally disabled until real English copy exists.
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function isPlaceholder(value?: string | null) {
  return !value || value.includes("[") || value.includes("]");
}

export function shouldIndex() {
  if (siteConfig.configuredBaseUrl?.includes("vercel.app")) {
    return false;
  }

  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return false;
  }

  return true;
}

export function getLanguageAlternates(path: string) {
  return {
    "bg-BG": absoluteUrl(path),
    "x-default": absoluteUrl(path),
  };
}

export function getServicePageBySlug(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
