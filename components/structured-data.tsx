import { isPlaceholder, absoluteUrl, siteConfig } from "@/lib/site-config";
import type { ServicePage } from "@/lib/seo-pages";

function cleanObject<T extends Record<string, unknown>>(value: T) {
  return Object.fromEntries(
    Object.entries(value).filter(([, item]) => {
      if (item === undefined || item === null) {
        return false;
      }

      if (Array.isArray(item)) {
        return item.length > 0;
      }

      return true;
    }),
  );
}

export function LocalBusinessJsonLd() {
  const business = siteConfig.business;
  const hasAddress =
    !isPlaceholder(business.address.streetAddress) &&
    !isPlaceholder(business.address.addressLocality) &&
    !isPlaceholder(business.address.postalCode);
  const hasGeo = business.geo.latitude !== null && business.geo.longitude !== null;

  const jsonLd = cleanObject({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#professional-service"),
    name: business.name,
    legalName: isPlaceholder(business.legalName) ? undefined : business.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl(siteConfig.assets.logoPath),
    image: absoluteUrl(siteConfig.assets.imagePath),
    description: business.description,
    telephone: isPlaceholder(business.phone) ? undefined : business.phone,
    email: isPlaceholder(business.email) ? undefined : business.email,
    priceRange: business.priceRange,
    address: hasAddress
      ? {
          "@type": "PostalAddress",
          streetAddress: business.address.streetAddress,
          addressLocality: business.address.addressLocality,
          postalCode: business.address.postalCode,
          addressCountry: business.address.addressCountry,
        }
      : undefined,
    geo: hasGeo
      ? {
          "@type": "GeoCoordinates",
          latitude: business.geo.latitude,
          longitude: business.geo.longitude,
        }
      : undefined,
    openingHours: business.openingHours,
    areaServed: business.areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
    sameAs: business.sameAs,
    contactPoint:
      !isPlaceholder(business.phone) || !isPlaceholder(business.email)
        ? cleanObject({
            "@type": "ContactPoint",
            telephone: isPlaceholder(business.phone) ? undefined : business.phone,
            email: isPlaceholder(business.email) ? undefined : business.email,
            contactType: "customer support",
            availableLanguage: ["bg"],
            areaServed: "BG",
          })
        : undefined,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT услуги",
      itemListElement: business.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service,
          provider: {
            "@id": absoluteUrl("/#professional-service"),
          },
        },
      })),
    },
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function ServiceJsonLd({ page }: { page: ServicePage }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.description,
    serviceType: page.title,
    provider: {
      "@id": absoluteUrl("/#professional-service"),
      "@type": "ProfessionalService",
      name: siteConfig.business.name,
      url: absoluteUrl("/"),
    },
    areaServed: siteConfig.business.areaServed.map((area) => ({
      "@type": "Country",
      name: area,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
