import Link from "next/link";
import type { ReactNode } from "react";

export function SeoPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" className="relative min-h-screen overflow-hidden bg-ink px-5 py-16 text-slate-100 sm:px-8 lg:py-24">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <div className="cyber-grid pointer-events-none absolute inset-0 z-0 opacity-45" />
      <section className="relative z-10 mx-auto max-w-6xl">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-semibold text-cyan-200 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          Към началната страница
        </Link>
        <div className="rounded-2xl border border-cyan-500/10 bg-slate-950/72 p-6 shadow-glass backdrop-blur-xl sm:p-8 lg:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl leading-7 text-slate-400">{intro}</p>
          <div className="mt-8 space-y-6">{children}</div>
        </div>
      </section>
    </main>
  );
}

export function SeoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 leading-7 text-slate-300">{children}</div>
    </section>
  );
}

export function SeoCta({
  primaryLabel = "Заявете IT помощ",
  primaryHref = "/#booking",
  secondaryLinks = [],
}: {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLinks?: ReadonlyArray<{ href: string; label: string }>;
}) {
  return (
    <section className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] p-5">
      <h2 className="text-xl font-semibold text-white">Готови ли сте да заявите помощ?</h2>
      <p className="mt-3 leading-7 text-slate-300">
        Изпратете заявка и ще се свържем с вас, за да уточним проблема, възможните стъпки и
        ориентировъчната цена.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href={primaryHref}
          className="inline-flex min-h-12 items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-300/12 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/18 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
        >
          {primaryLabel}
        </Link>
        {secondaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/50 hover:bg-cyan-300/[0.08] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
