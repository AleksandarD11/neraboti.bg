import { SeoCta, SeoPageShell, SeoSection } from "@/components/seo-page-shell";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

const plannedPosts = [
  "Как да използвате AnyDesk безопасно",
  "Какво да направите, ако компютърът е бавен",
  "Как да защитите малък офис от основни IT рискове",
] as const;

export const metadata: Metadata = {
  title: "Блог за IT поддръжка и сигурност | neraboti.bg",
  description:
    "Практични съвети за IT поддръжка, киберсигурност, AnyDesk, архиви, офис мрежи и инфраструктура.",
  alternates: { canonical: absoluteUrl("/blog"), languages: getLanguageAlternates("/blog") },
  openGraph: {
    title: "Блог за IT поддръжка и сигурност | neraboti.bg",
    description:
      "Практични съвети за IT поддръжка, киберсигурност, AnyDesk, архиви, офис мрежи и инфраструктура.",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogPage() {
  return (
    <SeoPageShell
      eyebrow="Ресурси"
      title="Блог"
      intro="Скоро тук ще публикуваме практични статии за IT поддръжка, сигурност, AnyDesk помощ, архиви и офис инфраструктура."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {plannedPosts.map((post) => (
          <SeoSection key={post} title={post}>
            <p>Очаквайте скоро.</p>
          </SeoSection>
        ))}
      </div>
      <SeoCta primaryLabel="Заявете IT помощ" />
    </SeoPageShell>
  );
}
