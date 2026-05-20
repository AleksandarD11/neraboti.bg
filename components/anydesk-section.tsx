"use client";

import type { SiteCopy } from "@/lib/site-copy";
import { CheckCircle2, Download, KeyRound, MousePointerClick, PlayCircle } from "lucide-react";
import { MagneticButton } from "./magnetic-button";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

const steps = [
  {
    icon: Download,
  },
  {
    icon: PlayCircle,
  },
  {
    icon: KeyRound,
  },
  {
    icon: MousePointerClick,
  },
];

export function AnyDeskSection({ copy }: { copy: SiteCopy["anydesk"] }) {
  return (
    <SectionShell
      id="remote-setup"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={revealUp}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="glass-panel relative overflow-hidden rounded-lg p-7"
        >
          <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-300/18 blur-3xl" />
          <div className="relative">
            <div className="mb-7 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/30 bg-cyan-300/10">
                <CheckCircle2 className="h-6 w-6 text-cyan-200" />
              </span>
              <div>
                <p className="text-sm font-medium text-cyan-200">{copy.secureTitle}</p>
                <p className="text-sm text-slate-400">{copy.secureSubtitle}</p>
              </div>
            </div>
            <div className="rounded-lg border border-white/10 bg-slate-950/70 p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-2/3 rounded bg-white/10" />
                <div className="rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-5 text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">{copy.addressLabel}</p>
                  <p className="mt-2 font-mono text-3xl font-semibold text-white">492 817 063</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-12 rounded-lg bg-white/[0.06]" />
                  <div className="h-12 rounded-lg bg-emerald-300/15" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          <div className="absolute bottom-8 left-6 top-8 hidden w-px bg-gradient-to-b from-cyan-300/0 via-cyan-300/40 to-emerald-300/0 sm:block" />
          <div className="space-y-4">
            {copy.steps.map((stepCopy, index) => {
              const step = steps[index];
              if (!step || !stepCopy?.title || !stepCopy?.body) {
                return null;
              }

              return (
              <motion.article
                key={stepCopy.title}
                variants={revealUp}
                whileHover={{ x: 8, scale: 1.012 }}
                className="group glass-panel relative rounded-lg p-5 transition duration-300 hover:border-cyan-300/50 hover:shadow-cyan-glow sm:pl-20"
              >
                <div className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-200">
                  {copy.stepLabel} {index + 1}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{stepCopy.title}</h3>
                <p className="mt-2 leading-7 text-slate-400">{stepCopy.body}</p>
                {index === 0 ? (
                  <div className="mt-5">
                    <MagneticButton href="https://anydesk.com/downloads" className="h-11">
                      {copy.downloadButton} <Download className="ml-2 h-4 w-4" />
                    </MagneticButton>
                  </div>
                ) : null}
              </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}
