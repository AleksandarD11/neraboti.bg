import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { ServiceJsonLd } from "@/components/structured-data";
import { servicePages } from "@/lib/seo-pages";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "sarvari-infrastruktura") {
    return {
      title: "Пренасочване | neraboti.bg",
      robots: { index: false, follow: true },
    };
  }

  const page = servicePages.find((item) => item.slug === slug);

  if (!page) {
    return {};
  }

  const url = `/uslugi/${page.slug}`;

  return {
    title: page.metadataTitle,
    description: page.description,
    alternates: {
      canonical: absoluteUrl(url),
      languages: getLanguageAlternates(url),
    },
    openGraph: {
      title: page.metadataTitle,
      description: page.description,
      url: absoluteUrl(url),
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (slug === "sarvari-infrastruktura") {
    redirect("/uslugi/sarvari-i-infrastruktura");
  }

  const page = servicePages.find((item) => item.slug === slug);

  if (!page) {
    notFound();
  }

  return (
    <SeoPageShell eyebrow="Услуги" title={page.title} intro={page.intro}>
      <ServiceJsonLd page={page} />
      <div className="grid gap-5 lg:grid-cols-2">
        {page.sections.map((section) => (
          <SeoSection key={section.title} title={section.title}>
            {"items" in section ? (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.text}</p>
            )}
          </SeoSection>
        ))}
      </div>
      <SeoCta secondaryLinks={page.links} />
    </SeoPageShell>
  );
}
