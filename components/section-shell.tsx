"use client";

import type { ReactNode } from "react";
import { motion, revealUp } from "./motion";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  titleAs?: "h1" | "h2";
  subtitle?: string;
  children: ReactNode;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  titleAs = "h2",
  subtitle,
  children,
}: SectionShellProps) {
  const TitleTag = titleAs;

  return (
    <motion.section
      id={id}
      variants={revealUp}
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto mb-12 max-w-3xl text-center">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            {eyebrow}
          </p>
        ) : null}
        <TitleTag className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </TitleTag>
        {subtitle ? (
          <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </motion.section>
  );
}
