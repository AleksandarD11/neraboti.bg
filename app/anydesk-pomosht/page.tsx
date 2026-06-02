import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { TrackedLink } from "@/components/tracked-link";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AnyDesk помощ и отдалечена поддръжка | neraboti.bg",
  description:
    "Научете как работи отдалечената IT помощ чрез AnyDesk, как да споделите ID безопасно и как контролирате сесията.",
  alternates: {
    canonical: absoluteUrl("/anydesk-pomosht"),
    languages: getLanguageAlternates("/anydesk-pomosht"),
  },
  openGraph: {
    title: "AnyDesk помощ и отдалечена поддръжка | neraboti.bg",
    description:
      "Научете как работи отдалечената IT помощ чрез AnyDesk, как да споделите ID безопасно и как контролирате сесията.",
    url: absoluteUrl("/anydesk-pomosht"),
  },
};

export default function AnyDeskHelpPage() {
  return (
    <SeoPageShell
      eyebrow="Отдалечена помощ"
      title="AnyDesk помощ"
      intro="AnyDesk ни позволява да помогнем дистанционно при софтуерни проблеми, настройки и базова диагностика, като вие запазвате контрол върху сесията."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <SeoSection title="Как да започнете">
          <ul className="space-y-2">
            <li>- Изтеглете AnyDesk от официалния сайт.</li>
            <li>- Отворете приложението на устройството, което има нужда от помощ.</li>
            <li>- Вашият реален AnyDesk ID ще се появи във вашето приложение.</li>
            <li>- Споделяйте ID само когато сте заявили помощ и говорите с наш техник.</li>
          </ul>
          <TrackedLink
            href="https://anydesk.com/downloads"
            eventName="anydesk_download_click"
            eventProperties={{ source: "anydesk_page" }}
            className="mt-5 inline-flex text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Изтеглете AnyDesk от официалния сайт
          </TrackedLink>
        </SeoSection>
        <SeoSection title="Какво се случва по време на сесия">
          <p>
            Техникът се идентифицира преди започване, уточнява целта на сесията и работи само по
            заявения проблем. Виждате действията на екрана и можете да прекъснете връзката по
            всяко време.
          </p>
        </SeoSection>
      </div>
      <SeoSection title="Правила за сигурност">
        <ul className="space-y-2">
          <li>- Никога не искаме вашите пароли.</li>
          <li>- Свързваме се само след ваше изрично потвърждение.</li>
          <li>- Можете да прекъснете връзката по всяко време.</li>
          <li>- Не копираме файлове без изрично съгласие.</li>
        </ul>
      </SeoSection>
      <SeoCta
        primaryLabel="Заявете отдалечена помощ"
        secondaryLinks={[{ href: "/uslugi/otdalechena-it-poddrazhka", label: "Вижте отдалечена IT поддръжка" }]}
      />
    </SeoPageShell>
  );
}
