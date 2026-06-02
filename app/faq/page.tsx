import { FaqSection } from "@/components/faq-section";
import { absoluteUrl, getLanguageAlternates } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Често задавани въпроси | neraboti.bg",
  description:
    "Отговори на често задавани въпроси за IT поддръжка, AnyDesk помощ, цени, плащане, фактури и посещения на място.",
  alternates: { canonical: absoluteUrl("/faq"), languages: getLanguageAlternates("/faq") },
  openGraph: {
    title: "Често задавани въпроси | neraboti.bg",
    description:
      "Отговори на често задавани въпроси за IT поддръжка, AnyDesk помощ, цени, плащане, фактури и посещения на място.",
    url: absoluteUrl("/faq"),
  },
};

export default function FaqPage() {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-ink text-slate-100">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <FaqSection showPageLink={false} titleAs="h1" />
    </main>
  );
}
