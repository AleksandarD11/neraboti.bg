"use client";

import { pricingItems, pricingVatNote } from "@/lib/booking-config";
import { ArrowRight, BadgeInfo, FileText, ShieldCheck } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

export function PricingSection() {
  return (
    <SectionShell
      id="pricing"
      eyebrow="Прозрачност"
      title="Цени и ориентири"
      subtitle="Знаем, че цената е важна. Затова показваме ориентировъчни начални цени, за да имате ясна представа преди да изпратите заявка."
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
      >
        {pricingItems.map((item) => (
          <motion.article
            key={item.id}
            variants={revealUp}
            className="glass-panel flex h-full flex-col rounded-lg p-5 transition duration-300 hover:border-cyan-300/45 hover:shadow-cyan-glow"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{item.service}</h3>
                <p className="mt-2 text-sm text-cyan-100">{item.note}</p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                <FileText aria-hidden="true" className="h-5 w-5" />
              </span>
            </div>
            <p className="text-2xl font-semibold tracking-tight text-cyan-200">{item.price}</p>
            <p className="mt-4 flex-1 leading-7 text-slate-400">{item.description}</p>
          </motion.article>
        ))}
      </motion.div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5"
        >
          <div className="flex gap-3">
            <BadgeInfo aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-cyan-200" />
            <div className="space-y-3 leading-7 text-slate-300">
              <p>
                Крайната цена зависи от конкретния проблем, сложността, необходимото време и дали
                услугата се извършва дистанционно или на място.
              </p>
              <p>
                Всички цени са ориентировъчни. Преди започване на работа ще потвърдим крайната цена
                и очакваното време за изпълнение.
              </p>
              <p className="text-slate-400">{pricingVatNote}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-xl border border-emerald-300/15 bg-emerald-300/[0.045] p-5"
        >
          <div className="flex gap-3">
            <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-emerald-200" />
            <p className="leading-7 text-emerald-50/90">
              За посещение на място цената може да зависи от района. За киберсигурност одит и офис
              абонамент цената се определя според обхвата, нуждите и изричното разрешение от
              клиента.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
      >
        <MagneticButton href="#booking">
          Заявете IT помощ <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </MagneticButton>
        <MagneticButton href="#anydesk-help" variant="secondary">
          Вижте как работи AnyDesk помощта
        </MagneticButton>
        <MagneticButton href="/ceni" variant="secondary">
          Подробни цени
        </MagneticButton>
      </motion.div>
    </SectionShell>
  );
}
