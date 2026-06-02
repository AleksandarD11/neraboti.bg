"use client";

import { trackEvent } from "@/lib/analytics";
import {
  processPromise,
  serviceArea,
  solvedProblems,
  testimonials,
} from "@/lib/trust-content";
import {
  CheckCircle2,
  ClipboardCheck,
  MapPin,
  MessageSquareQuote,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

const promiseIcons = [ClipboardCheck, CheckCircle2, ShieldCheck, Wrench];

export function TrustConversionSections() {
  return (
    <>
      <SectionShell
        id="process-promise"
        eyebrow="Прозрачен процес"
        title="Какво обещаваме"
        subtitle="Не обещаваме невъзможното. Обещаваме ясен процес, прозрачна комуникация и потвърждение преди допълнителна работа."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {processPromise.map((item, index) => {
            const Icon = promiseIcons[index] || CheckCircle2;

            return (
              <motion.article
                key={item.title}
                variants={revealUp}
                className="glass-panel rounded-lg p-5 transition hover:border-cyan-300/40 hover:shadow-cyan-glow"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-400">{item.text}</p>
              </motion.article>
            );
          })}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <MagneticButton
            href="#booking"
            onClick={() => trackEvent("cta_click_book", { source: "process_promise" })}
          >
            Заявете IT помощ
          </MagneticButton>
        </div>
      </SectionShell>

      <SectionShell
        id="solved-problems"
        eyebrow="Примерни ситуации"
        title="Решени проблеми"
        subtitle="Ето примери за типични ситуации, при които можем да помогнем. Те са описани като ориентир, не като обещание за еднакъв резултат във всеки случай."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3"
        >
          {solvedProblems.map((problem) => (
            <motion.article
              key={problem.title}
              variants={revealUp}
              className="glass-panel rounded-lg p-5 transition hover:border-cyan-300/40"
            >
              <h3 className="text-xl font-semibold text-white">{problem.title}</h3>
              <dl className="mt-5 space-y-4 text-sm leading-6">
                <div>
                  <dt className="font-semibold text-cyan-100">Преди</dt>
                  <dd className="mt-1 text-slate-400">{problem.before}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-cyan-100">Как помагаме</dt>
                  <dd className="mt-1 text-slate-300">{problem.after}</dd>
                </div>
                <div className="rounded-lg border border-emerald-300/15 bg-emerald-300/[0.045] p-3">
                  <dt className="font-semibold text-emerald-100">Примерен резултат</dt>
                  <dd className="mt-1 text-emerald-50/90">{problem.result}</dd>
                </div>
              </dl>
            </motion.article>
          ))}
        </motion.div>

        <div className="mt-8 flex justify-center">
          <MagneticButton
            href="#booking"
            onClick={() => trackEvent("cta_click_help_now", { source: "solved_problems" })}
          >
            Опишете вашия проблем
          </MagneticButton>
        </div>
      </SectionShell>

      <SectionShell
        id="social-proof"
        eyebrow="Доверие"
        title="Доверие от клиенти"
        subtitle="IT проблемите често са спешни и изискват доверие. Затова работим прозрачно, обясняваме какво правим и потвърждаваме следващите стъпки преди допълнителна работа."
      >
        {testimonials.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-5 md:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.article
                key={`${testimonial.name}-${testimonial.type}`}
                variants={revealUp}
                className="glass-panel rounded-lg p-5"
              >
                <MessageSquareQuote aria-hidden="true" className="h-6 w-6 text-cyan-200" />
                <blockquote className="mt-4 leading-7 text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <p className="mt-5 font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.type}</p>
              </motion.article>
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={revealUp}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="mx-auto max-w-3xl rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] p-6 text-center"
          >
            <MessageSquareQuote aria-hidden="true" className="mx-auto h-8 w-8 text-cyan-200" />
            <p className="mt-4 leading-7 text-slate-300">
              Скоро тук ще добавим реални отзиви от клиенти. Дотогава можете да видите как
              работим, какви проблеми решаваме и как поддържаме прозрачност в процеса.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              Работим с частни клиенти, малки бизнеси и офиси. Лога и имена на клиенти
              публикуваме само с изрично разрешение.
            </p>
          </motion.div>
        )}
      </SectionShell>

      <SectionShell
        id="service-area"
        eyebrow="Обхват"
        title={serviceArea.title}
        subtitle="Помагаме както на частни клиенти, така и на малки бизнеси и офиси."
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <motion.article variants={revealUp} className="glass-panel rounded-lg p-6">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
              <MapPin aria-hidden="true" className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Обслужване</h3>
            <div className="mt-4 space-y-3 leading-7 text-slate-300">
              <p>{serviceArea.remote}</p>
              <p>{serviceArea.onsite}</p>
              <p>{serviceArea.otherLocations}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {serviceArea.customerTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-slate-200"
                >
                  {type}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article variants={revealUp} className="glass-panel rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-white">Начини на поддръжка</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {serviceArea.modes.map((mode) => (
                <li key={mode} className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-cyan-200" />
                  <span className="text-slate-300">{mode}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <MagneticButton
                href="#booking"
                onClick={() => trackEvent("cta_click_book", { source: "service_area" })}
              >
                Проверете възможностите за поддръжка
              </MagneticButton>
            </div>
          </motion.article>
        </motion.div>
      </SectionShell>
    </>
  );
}
