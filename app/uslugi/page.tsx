import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { servicePages } from "@/lib/seo-pages";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "IT услуги | neraboti.bg",
  description:
    "Преглед на IT услугите: отдалечена IT поддръжка, поддръжка на място, сървъри и IT инфраструктура, киберсигурност одит и проверка за уязвимости.",
  alternates: { canonical: absoluteUrl("/uslugi"), languages: getLanguageAlternates("/uslugi") },
  openGraph: {
    title: "IT услуги | neraboti.bg",
    description:
      "Преглед на IT услугите: отдалечена IT поддръжка, поддръжка на място, сървъри и IT инфраструктура, киберсигурност одит и проверка за уязвимости.",
    url: absoluteUrl("/uslugi"),
  },
};

export default function ServicesOverviewPage() {
  return (
    <SeoPageShell
      eyebrow="Услуги"
      title="IT услуги"
      intro="Изберете подходящата услуга според проблема: дистанционна помощ, посещение на място, бизнес инфраструктура или проверка на сигурността."
    >
      <div className="grid gap-5 md:grid-cols-2">
        {servicePages.map((service) => (
          <SeoSection key={service.slug} title={service.title}>
            <p>{service.description}</p>
            <Link
              href={`/uslugi/${service.slug}`}
              className="mt-4 inline-flex text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Вижте услугата
            </Link>
          </SeoSection>
        ))}
      </div>
      <SeoCta primaryLabel="Заявете IT помощ" />
    </SeoPageShell>
  );
}
