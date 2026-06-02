import { HomePage } from "@/components/home-page";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT поддръжка чрез AnyDesk и на място | neraboti.bg",
  description:
    "Бърза IT поддръжка за компютри, офис мрежи, сървъри и киберсигурност. Отдалечена помощ чрез AnyDesk и посещения на място. Запазете час онлайн.",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: getLanguageAlternates("/"),
  },
  openGraph: {
    title: "IT поддръжка чрез AnyDesk и на място | neraboti.bg",
    description:
      "Бърза IT поддръжка за компютри, офис мрежи, сървъри и киберсигурност. Отдалечена помощ чрез AnyDesk и посещения на място. Запазете час онлайн.",
    url: absoluteUrl("/"),
  },
};

export default function Page() {
  return <HomePage />;
}
