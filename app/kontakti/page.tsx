import { SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { TrackedLink } from "@/components/tracked-link";
import { businessInfo, contactConfig, hasConfiguredBusinessInfo } from "@/lib/business-info";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import { Mail, Phone, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти | neraboti.bg",
  description:
    "Свържете се с neraboti.bg за IT поддръжка, отдалечена помощ, посещение на място или бизнес поддръжка.",
  alternates: { canonical: absoluteUrl("/kontakti"), languages: getLanguageAlternates("/kontakti") },
  openGraph: {
    title: "Контакти | neraboti.bg",
    description:
      "Свържете се с neraboti.bg за IT поддръжка, отдалечена помощ, посещение на място или бизнес поддръжка.",
    url: absoluteUrl("/kontakti"),
  },
};

export default function ContactsBgPage() {
  return (
    <SeoPageShell
      eyebrow="Контакти"
      title="Контакти"
      intro="За спешни IT проблеми се свържете с нас по телефон или Viber. За планирана поддръжка използвайте формата за запазване на час."
    >
      <SeoSection title="Бизнес данни">
        {hasConfiguredBusinessInfo.companyName ? <p>Фирмено име: {businessInfo.companyName}</p> : null}
        {hasConfiguredBusinessInfo.companyId ? <p>ЕИК: {businessInfo.companyId}</p> : null}
        {hasConfiguredBusinessInfo.address ? <p>Адрес: {businessInfo.address}</p> : null}
        {hasConfiguredBusinessInfo.phone ? <p>Телефон: {businessInfo.phone}</p> : null}
        {hasConfiguredBusinessInfo.email ? <p>Имейл: {businessInfo.email}</p> : null}
        <p>Работно време: {businessInfo.workingHours}</p>
        <p>Зона на обслужване: {businessInfo.serviceArea}</p>
        {!hasConfiguredBusinessInfo.phone && !hasConfiguredBusinessInfo.email ? (
          <p className="mt-3 text-slate-300">
            За планирана поддръжка използвайте формата за заявка. Допълнителни контактни данни ще бъдат публикувани след потвърждение.
          </p>
        ) : null}
      </SeoSection>
      <div className="grid gap-3 sm:grid-cols-3">
        <TrackedLink
          href="/#booking"
          eventName="cta_click_book"
          eventProperties={{ source: "contacts_page" }}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-cyan-300/40 bg-cyan-300/12 px-4 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/18 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Заяви час
        </TrackedLink>
        {hasConfiguredBusinessInfo.phone ? (
          <TrackedLink
            href={contactConfig.phoneHref}
            eventName="phone_click"
            eventProperties={{ source: "contacts_page" }}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Обади се
          </TrackedLink>
        ) : null}
        {hasConfiguredBusinessInfo.email ? (
          <a
            href={`mailto:${businessInfo.email}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Изпрати имейл
          </a>
        ) : null}
      </div>
      {hasConfiguredBusinessInfo.viber ? (
        <SeoSection title="Viber">
          <TrackedLink
            href={contactConfig.viberHref}
            eventName="viber_click"
            eventProperties={{ source: "contacts_page" }}
            className="text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Свържете се чрез Viber
          </TrackedLink>
        </SeoSection>
      ) : null}
    </SeoPageShell>
  );
}
