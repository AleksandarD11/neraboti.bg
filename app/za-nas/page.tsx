import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

const roles = [
  {
    title: "Системен администратор",
    text: "Поддръжка на работни станции, операционни системи, сървъри, архиви и потребителски достъпи.",
  },
  {
    title: "Мрежов специалист",
    text: "Настройка и диагностика на офис мрежи, рутери, Wi-Fi, VPN, принтери и свързани устройства.",
  },
  {
    title: "Киберсигурност специалист",
    text: "Проверка на рискове, базово hardening консултиране, преглед на конфигурации и препоръки за по-сигурна инфраструктура.",
  },
] as const;

const tools = [
  "Windows",
  "macOS",
  "Linux",
  "Microsoft 365",
  "Google Workspace",
  "NAS",
  "MikroTik",
  "UniFi",
  "VPN",
  "принтери и офис устройства",
  "архивиране и базова защита на данни",
] as const;

export const metadata: Metadata = {
  title: "За нас | neraboti.bg",
  description:
    "Научете повече за екипа зад neraboti.bg и IT услугите за частни клиенти и малки бизнеси.",
  alternates: { canonical: absoluteUrl("/za-nas"), languages: getLanguageAlternates("/za-nas") },
  openGraph: {
    title: "За нас | neraboti.bg",
    description:
      "Научете повече за екипа зад neraboti.bg и IT услугите за частни клиенти и малки бизнеси.",
    url: absoluteUrl("/za-nas"),
  },
};

export default function AboutPage() {
  return (
    <SeoPageShell
      eyebrow="Екип"
      title="За нас"
      intro="Ние сме малък екип от IT специалисти, който помага на частни клиенти и малки бизнеси, когато компютри, мрежи, сървъри или системи спрат да работят нормално."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((role) => (
          <SeoSection key={role.title} title={role.title}>
            <p>{role.text}</p>
          </SeoSection>
        ))}
      </div>
      <SeoSection title="Опит и обучения">
        <p>Практически опит в IT поддръжка, инфраструктура и сигурност. Конкретни години опит, сертификати и обучения ще бъдат публикувани само след потвърждение.</p>
      </SeoSection>
      <SeoSection title="Работим с">
        <ul className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <li key={tool} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm">
              {tool}
            </li>
          ))}
        </ul>
      </SeoSection>
      <SeoSection title="Къде работим">
        <p>
          Предлагаме дистанционна поддръжка в цяла България. Посещения на място — по предварителна уговорка според района.
        </p>
      </SeoSection>
      <SeoSection title="Прозрачен подход">
        <p>
          Работим прозрачно: преди да започнем, уточняваме проблема, възможните стъпки и
          ориентировъчната цена. При отдалечена помощ се свързваме само след ваше изрично
          потвърждение.
        </p>
      </SeoSection>
      <SeoCta primaryLabel="Свържете се с нас" primaryHref="/kontakti" />
    </SeoPageShell>
  );
}
