"use client";

import type { SiteCopy } from "@/lib/site-copy";
import {
  BadgeCheck,
  MapPin,
  Network,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { motion, revealUp, staggerContainer } from "./motion";

const teamRoles = [
  {
    title: "Системен администратор",
    description:
      "Поддръжка на работни станции, операционни системи, сървъри, архиви и потребителски достъпи.",
    icon: ServerCog,
  },
  {
    title: "Мрежов специалист",
    description:
      "Настройка и диагностика на офис мрежи, рутери, Wi-Fi, VPN, принтери и свързани устройства.",
    icon: Network,
  },
  {
    title: "Киберсигурност специалист",
    description:
      "Проверка на рискове, базово hardening консултиране, преглед на конфигурации и препоръки за по-сигурна инфраструктура.",
    icon: ShieldCheck,
  },
];

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
];

export function AboutSection({ copy }: { copy: SiteCopy["about"] }) {
  return (
    <section id="about" className="relative z-0 scroll-mt-28 px-5 pb-8 pt-10 sm:px-8">
      <motion.div
        variants={revealUp}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="glass-panel relative z-0 mx-auto max-w-7xl overflow-hidden rounded-lg px-6 py-14 sm:px-10 lg:px-12"
      >
        <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-cyan-300/12 blur-3xl" />
        <div className="absolute -bottom-24 right-10 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <div className="relative z-0">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="max-w-4xl"
          >
            <motion.p
              variants={revealUp}
              className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300"
            >
              {copy.eyebrow}
            </motion.p>
            <motion.h2
              variants={revealUp}
              className="text-3xl font-semibold tracking-tight text-white sm:text-5xl"
            >
              За нас
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              Ние сме малък екип от IT специалисти, който помага на частни клиенти и малки бизнеси,
              когато компютри, мрежи, сървъри или системи спрат да работят нормално.
            </motion.p>
          </motion.div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {teamRoles.map((role) => {
              const Icon = role.icon;

              return (
                <motion.article
                  key={role.title}
                  variants={revealUp}
                  initial="hidden"
                  animate="visible"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  className="rounded-lg border border-white/10 bg-slate-950/58 p-5 backdrop-blur-xl transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.06] hover:shadow-cyan-glow"
                >
                  <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{role.title}</h3>
                  <p className="mt-3 leading-7 text-slate-400">{role.description}</p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.article
              variants={revealUp}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-lg border border-emerald-300/18 bg-emerald-300/[0.05] p-5"
            >
              <div className="flex gap-3">
                <BadgeCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-emerald-200" />
                <div className="space-y-3 leading-7 text-emerald-50/88">
                  <p>
                    <span className="font-semibold text-emerald-50">Опит:</span>{" "}
                    Практически опит в IT поддръжка, инфраструктура и сигурност. Конкретни години и сертификати ще бъдат публикувани само след потвърждение.
                  </p>
                </div>
              </div>
            </motion.article>

            <motion.article
              variants={revealUp}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-lg border border-cyan-300/18 bg-cyan-300/[0.045] p-5"
            >
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
                <div>
                  <h3 className="text-lg font-semibold text-cyan-50">Къде работим</h3>
                  <p className="mt-2 leading-7 text-cyan-50/84">
                    Предлагаме дистанционна поддръжка в цяла България. Посещения на място — по предварителна уговорка според района.
                  </p>
                </div>
              </div>
            </motion.article>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.article
              variants={revealUp}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-lg border border-white/10 bg-slate-950/58 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <Wrench aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                <h3 className="text-lg font-semibold text-white">Работим с</h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label="Технологии и инструменти">
                {tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-slate-200"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.article>

            <motion.article
              variants={revealUp}
              initial="hidden"
              animate="visible"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="rounded-lg border border-cyan-300/20 bg-slate-950/64 p-5 backdrop-blur-xl"
            >
              <div className="mb-4 flex items-center gap-3">
                <Sparkles aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                <h3 className="text-lg font-semibold text-white">Прозрачен подход</h3>
              </div>
              <p className="leading-7 text-slate-300">
                Работим прозрачно: преди да започнем, уточняваме проблема, възможните стъпки и
                ориентировъчната цена. При отдалечена помощ се свързваме само след ваше изрично
                потвърждение.
              </p>
            </motion.article>
          </div>
        </div>
      </motion.div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-2 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footerLeft}</p>
        <Link
          href="/za-nas"
          className="font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Вижте повече за нас
        </Link>
      </div>
    </section>
  );
}
