"use client";

import { CircleHelp } from "lucide-react";
import Link from "next/link";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

const faqItems = [
  {
    question: "Колко бързо можете да реагирате?",
    answer:
      "Обикновено се свързваме с вас до 15 минути в работно време след изпращане на заявка. При по-спешни случаи използвайте телефон или Viber, ако са налични.",
  },
  {
    question: "Работите ли вечер и през уикенда?",
    answer:
      "Работното време се уточнява при заявка. Възможна е поддръжка извън стандартно работно време по предварителна уговорка.",
  },
  {
    question: "Нужно ли е да инсталирам AnyDesk?",
    answer:
      "За отдалечена помощ обикновено използваме AnyDesk. Можете да го изтеглите от официалния сайт и да споделите своя AnyDesk ID само след като сте заявили помощ и говорите с наш техник.",
  },
  {
    question: "Безопасно ли е да дам отдалечен достъп?",
    answer:
      "Свързваме се само след ваше изрично потвърждение. Виждате всичко, което техникът прави, можете да прекъснете сесията по всяко време и никога не искаме вашите пароли.",
  },
  {
    question: "Можете ли да помогнете без посещение на място?",
    answer:
      "Да, много софтуерни проблеми, настройки, имейл, принтери, приложения и базова диагностика могат да се решат дистанционно. Ако проблемът изисква физическо присъствие, ще ви предложим следващи стъпки.",
  },
  {
    question: "Как се плаща?",
    answer:
      "Начинът на плащане се уточнява преди започване на работа според типа услуга. Ако има нужда от посещение на място или по-голям обхват, ще потвърдим цената предварително.",
  },
  {
    question: "Работите ли с фирми на абонамент?",
    answer:
      "Да. Предлагаме абонаментна IT поддръжка за малки бизнеси и офиси според броя устройства, нуждите, желаното време за реакция и обхвата на поддръжката.",
  },
  {
    question: "Давате ли фактура?",
    answer: "Фактурирането и необходимите данни се уточняват предварително според доставчика на услугата и вида на заявката.",
  },
  {
    question: "Какво става, ако проблемът не може да се реши дистанционно?",
    answer:
      "Първо правим диагностика и ви обясняваме какви са възможните следващи стъпки. Ако е нужно посещение на място, подмяна на хардуер или по-задълбочена работа, ще го уточним с вас предварително.",
  },
  {
    question: "В кои градове предлагате посещение на място?",
    answer:
      "Дистанционна поддръжка предлагаме в цяла България. Посещения на място — по предварителна уговорка според района.",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export function FaqSection({
  showPageLink = true,
  titleAs = "h2",
}: {
  showPageLink?: boolean;
  titleAs?: "h1" | "h2";
}) {
  return (
    <SectionShell
      id="faq"
      eyebrow="FAQ"
      titleAs={titleAs}
      title="Често задавани въпроси"
      subtitle="Събрахме най-честите въпроси, които клиентите задават преди да заявят IT поддръжка."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-4 md:grid-cols-2"
      >
        {faqItems.map((faq, index) => (
          <motion.article
            key={faq.question}
            variants={revealUp}
            className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition hover:border-cyan-300/35"
          >
            <div className="mb-3 flex items-start gap-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-cyan-300/20 bg-cyan-300/10 text-cyan-100">
                <CircleHelp aria-hidden="true" className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  Въпрос {index + 1}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{faq.question}</h3>
              </div>
            </div>
            <p className="leading-7 text-slate-400">{faq.answer}</p>
          </motion.article>
        ))}
      </motion.div>
      {showPageLink ? (
        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Вижте всички въпроси
          </Link>
        </div>
      ) : null}
    </SectionShell>
  );
}
