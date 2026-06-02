"use client";

import type { SiteCopy } from "@/lib/site-copy";
import { BriefcaseBusiness, CheckCircle2, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "./magnetic-button";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

const audienceServiceGroups = [
  {
    title: "За частни клиенти",
    subtitle:
      "Помощ за домашни компютри, лаптопи, принтери, имейл и ежедневни технически проблеми.",
    items: [
      "Компютърът е бавен",
      "Вируси или съмнителни прозорци",
      "Проблем с Windows или macOS",
      "Принтер или скенер не работи",
      "Имейл, Viber, Zoom или други приложения",
      "Прехвърляне на файлове",
      "Настройка на нов лаптоп или компютър",
    ],
    cta: "Заявете помощ за домашен компютър",
    target: "#booking",
    detailLinks: [
      { href: "/uslugi/otdalechena-it-poddrazhka", label: "Отдалечена IT поддръжка" },
      { href: "/uslugi/it-poddrazhka-na-myasto", label: "IT поддръжка на място" },
    ],
    icon: Home,
    accent: "cyan",
  },
  {
    title: "За бизнес клиенти",
    subtitle:
      "IT поддръжка за малки офиси, екипи, работни станции, мрежи и бизнес услуги.",
    items: [
      "Офис мрежа и Wi-Fi",
      "Работни станции и потребителски достъпи",
      "Microsoft 365 или Google Workspace",
      "Архиви и възстановяване на данни",
      "Сървъри и инфраструктура",
      "VPN и отдалечен достъп",
      "NAS устройства",
      "Мониторинг и профилактика",
      "Абонаментна IT поддръжка",
    ],
    cta: "Заявете бизнес поддръжка",
    target: "#booking",
    detailLinks: [{ href: "/uslugi/sarvari-i-infrastruktura", label: "Сървъри и IT инфраструктура" }],
    icon: BriefcaseBusiness,
    accent: "emerald",
  },
  {
    title: "За сигурност",
    subtitle:
      "Проверка на рискове, конфигурации и публични активи с ясни препоръки за подобрение.",
    serviceTitle: "Киберсигурност одит и проверка за уязвимости",
    serviceDescription:
      "Проверяваме публични уеб приложения, сървъри и основни конфигурации за често срещани рискове. Получавате ясен доклад с приоритети, препоръки и конкретни стъпки за намаляване на риска.",
    items: [
      "Vulnerability scan",
      "Проверка на публични активи",
      "Сканиране за често срещани уязвимости",
      "Преглед на основни конфигурации",
      "Hardening препоръки",
      "Phishing awareness",
      "Backup review",
      "Доклад с приоритети и следващи стъпки",
    ],
    boundaryNotes: [
      "Работим само върху активи, за които имате право да възлагате проверка.",
      "Одитът не е заместител на пълен penetration test, освен ако не е договорен такъв обхват.",
      "Не извършваме тестове без писмено разрешение.",
    ],
    cta: "Заявете проверка на сигурността",
    target: "#booking",
    detailLinks: [{ href: "/uslugi/kibersigurnost-odit", label: "Киберсигурност одит" }],
    icon: ShieldCheck,
    accent: "violet",
  },
] as const;

const accentStyles = {
  cyan: {
    icon: "border-cyan-300/25 bg-cyan-300/10 text-cyan-100",
    hover: "hover:border-cyan-300/45 hover:shadow-cyan-glow",
    marker: "text-cyan-200",
  },
  emerald: {
    icon: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    hover: "hover:border-emerald-300/45 hover:shadow-emerald-glow",
    marker: "text-emerald-200",
  },
  violet: {
    icon: "border-violet-300/25 bg-violet-300/10 text-violet-100",
    hover: "hover:border-violet-300/45 hover:shadow-violet-glow",
    marker: "text-violet-200",
  },
} as const;

export function ServicesSection({ copy }: { copy: SiteCopy["services"] }) {
  void copy;

  return (
    <SectionShell
      id="services"
      eyebrow="Услуги"
      title="IT помощ според вашия проблем"
      subtitle="Независимо дали сте частен клиент, малък бизнес или имате нужда от проверка на сигурността, ще ви насочим към правилната услуга и следващи стъпки."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-5 lg:grid-cols-3"
      >
        {audienceServiceGroups.map((group) => {
          const Icon = group.icon;
          const styles = accentStyles[group.accent];

          return (
            <motion.article
              key={group.title}
              variants={revealUp}
              whileHover={{ y: -8, scale: 1.012 }}
              className={`group glass-panel flex h-full flex-col rounded-lg p-6 transition duration-300 ${styles.hover}`}
            >
              <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-lg border ${styles.icon}`}>
                <Icon aria-hidden="true" className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{group.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{group.subtitle}</p>

              {"serviceTitle" in group ? (
                <div className="mt-5 rounded-lg border border-violet-300/18 bg-violet-300/[0.045] p-4">
                  <h4 className="text-base font-semibold text-violet-50">{group.serviceTitle}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{group.serviceDescription}</p>
                </div>
              ) : null}

              <ul className="mt-6 flex-1 space-y-3 text-sm leading-6 text-slate-300">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 aria-hidden="true" className={`mt-0.5 h-4 w-4 shrink-0 ${styles.marker}`} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {"boundaryNotes" in group ? (
                <div className="mt-5 rounded-lg border border-amber-200/20 bg-amber-200/[0.055] p-4">
                  <p className="text-sm font-semibold text-amber-50">Важно</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-50/90">
                    {group.boundaryNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="mt-7">
                <div className="flex flex-col gap-3">
                  <MagneticButton href={group.target} variant="secondary" className="w-full sm:w-auto">
                    {group.cta}
                  </MagneticButton>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {group.detailLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </motion.div>

      <motion.div
        variants={revealUp}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-8 rounded-lg border border-cyan-300/15 bg-cyan-300/[0.045] p-5 text-center sm:p-6"
      >
        <p className="mx-auto max-w-3xl leading-7 text-slate-300">
          Не сте сигурни коя услуга ви трябва? Опишете проблема във формата и ще ви насочим към
          най-подходящото решение. Предлагаме отдалечена IT поддръжка, поддръжка на място, помощ за
          офис мрежа, сървъри, VPN, NAS и киберсигурност одит според конкретния случай.
        </p>
        <div className="mt-5 flex justify-center">
          <MagneticButton href="#booking">Опишете проблема</MagneticButton>
        </div>
      </motion.div>
    </SectionShell>
  );
}
