import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { pricingPageData } from "@/lib/seo-pages";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: pricingPageData.metadataTitle,
  description: pricingPageData.description,
  alternates: { canonical: absoluteUrl("/ceni"), languages: getLanguageAlternates("/ceni") },
  openGraph: {
    title: pricingPageData.metadataTitle,
    description: pricingPageData.description,
    url: absoluteUrl("/ceni"),
  },
};

export default function PricingPage() {
  return (
    <SeoPageShell eyebrow="Прозрачност" title={pricingPageData.title} intro={pricingPageData.intro}>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {pricingPageData.items.map((item) => (
          <article key={item.id} className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
            <h2 className="text-lg font-semibold text-white">{item.service}</h2>
            <p className="mt-2 text-sm text-cyan-100">{item.note}</p>
            <p className="mt-4 text-2xl font-semibold text-cyan-200">{item.price}</p>
            <p className="mt-4 leading-7 text-slate-400">{item.description}</p>
          </article>
        ))}
      </div>
      <SeoSection title="Важно за цените">
        <p>
          Всички цени са ориентировъчни. Крайната цена зависи от конкретния проблем, сложността,
          необходимото време и дали услугата се извършва дистанционно или на място. Преди започване
          на работа ще потвърдим крайната цена с вас.
        </p>
        <p className="mt-3">{pricingPageData.vatNote}</p>
      </SeoSection>
      <SeoCta primaryLabel="Заявете IT помощ" />
    </SeoPageShell>
  );
}
