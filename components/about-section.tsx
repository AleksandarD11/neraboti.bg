"use client";

import type { SiteCopy } from "@/lib/site-copy";
import { motion, revealUp, staggerContainer } from "./motion";

export function AboutSection({ copy }: { copy: SiteCopy["about"] }) {
  return (
    <section id="about" className="relative z-0 px-5 pb-8 pt-10 sm:px-8">
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

        <div className="relative z-0 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
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
              {copy.title}
            </motion.h2>
            <motion.p
              variants={revealUp}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              {copy.body}
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid gap-4"
          >
            {copy.badges.filter(Boolean).map((badge) => (
              <motion.div
                key={badge}
                variants={revealUp}
                whileHover={{ x: 8, scale: 1.015 }}
                className="group relative z-0 rounded-lg border border-white/10 bg-slate-950/58 p-5 text-lg font-semibold text-white backdrop-blur-xl transition hover:border-cyan-300/45 hover:bg-cyan-300/[0.07] hover:shadow-cyan-glow"
              >
                <span className="drop-shadow-[0_0_16px_rgba(34,211,238,0.25)]">
                  {badge}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-2 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>{copy.footerLeft}</p>
        <p>{copy.footerRight}</p>
      </div>
    </section>
  );
}
