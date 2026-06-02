"use client";

import type { Language, SiteCopy } from "@/lib/site-copy";
import { trackEvent } from "@/lib/analytics";
import { ArrowRight, Menu, X } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import { MagneticButton } from "./magnetic-button";
import { motion, staggerContainer } from "./motion";

function InteractiveLogo() {
  const letters = ["n", "e", "r", "a", "b", "o", "t", "i"];

  return (
    <motion.a
      href="#"
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
        hover: { scale: 1.05, transition: { duration: 0.28, ease: [0.19, 1, 0.22, 1] } },
      }}
      className="group relative inline-flex items-center text-lg font-black tracking-tight sm:text-xl"
      aria-label="Начална страница на neraboti.bg"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={{
            hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.58, ease: [0.19, 1, 0.22, 1] },
            },
          }}
          className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]"
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        // The dot acts as a tiny energy core: the glyph rotates, blooms, and emits
        // a blurred cyan streak so the brand feels alive without becoming noisy.
        variants={{
          hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.58, ease: [0.19, 1, 0.22, 1] },
          },
          hover: {
            rotate: 360,
            scale: [1, 1.7, 1.16],
            color: "#00f2ff",
            textShadow: [
              "0 0 10px rgba(0,242,255,.65)",
              "0 0 34px rgba(0,242,255,1)",
              "0 0 18px rgba(0,242,255,.82)",
            ],
            transition: { duration: 0.82, ease: [0.19, 1, 0.22, 1] },
          },
        }}
        className="relative mx-[1px] inline-block text-cyan-200"
      >
        <motion.span
          aria-hidden
          variants={{
            hover: {
              opacity: [0, 0.9, 0],
              scale: [0.6, 2.8, 3.8],
              filter: ["blur(0px)", "blur(2px)", "blur(7px)"],
              transition: { duration: 0.9, ease: "easeOut" },
            },
          }}
          className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00f2ff]/60"
        />
        <motion.span
          aria-hidden
          variants={{
            hover: {
              opacity: [0, 0.55, 0],
              x: [0, 16, 26],
              scaleX: [0.2, 1.8, 0.4],
              filter: ["blur(2px)", "blur(6px)", "blur(10px)"],
              transition: { duration: 0.78, ease: "easeOut" },
            },
          }}
          className="absolute left-1/2 top-1/2 h-1 w-8 -translate-y-1/2 rounded-full bg-[#00f2ff]"
        />
        .
      </motion.span>
      <motion.span
        variants={{
          hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
          visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.58, ease: [0.19, 1, 0.22, 1] },
          },
        }}
        className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-violet-200 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(34,211,238,0.28)]"
      >
        bg
      </motion.span>
    </motion.a>
  );
}

function HeaderNav({ copy }: { copy: SiteCopy["nav"] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const links = [
    { href: "/uslugi", label: copy.services },
    { href: "/ceni", label: copy.pricing },
    { href: "/anydesk-pomosht", label: copy.remote },
    { href: "/za-nas", label: copy.about },
    { href: "/kontakti", label: copy.contacts },
    { href: "/faq", label: copy.faq },
  ];

  return (
    <nav
      aria-label="Основна навигация"
      onMouseLeave={() => setHovered(null)}
      className="hidden items-center gap-1 rounded-full border border-white/5 bg-white/[0.025] p-1 text-sm text-slate-400 md:flex"
    >
      {links.map((link) => {
        const isHovered = hovered === link.href;
        return (
          <motion.a
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.28, ease: [0.19, 1, 0.22, 1] }}
            className={`relative isolate rounded-full px-4 py-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
              isHovered ? "text-cyan-100" : "text-slate-400"
            }`}
          >
            {isHovered ? (
              <motion.span
                // Shared layoutId turns four separate links into one gliding hover
                // object. The viewer reads it as a deliberate, premium navigation trail.
                layoutId="activeNavIndicator"
                className="absolute inset-0 -z-10 rounded-full border border-cyan-300/25 bg-cyan-300/10 shadow-[0_0_24px_rgba(0,242,255,.24)]"
                transition={{ duration: 0.48, ease: [0.19, 1, 0.22, 1] }}
              />
            ) : null}
            {link.label}
          </motion.a>
        );
      })}
    </nav>
  );
}

function MobileNav({ copy }: { copy: SiteCopy["nav"] }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/uslugi", label: copy.services },
    { href: "/ceni", label: copy.pricing },
    { href: "/anydesk-pomosht", label: copy.remote },
    { href: "/za-nas", label: copy.about },
    { href: "/kontakti", label: copy.contacts },
    { href: "/faq", label: copy.faq },
    { href: "#booking", label: copy.booking, emphasized: true },
  ];

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-main-nav"
        aria-label={open ? "Затвори меню" : "Отвори меню"}
        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-slate-950/72 text-cyan-100 transition hover:border-cyan-300/45 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
      </button>
      {open ? (
        <nav
          id="mobile-main-nav"
          aria-label="Основна навигация"
          className="absolute right-0 top-14 z-50 w-64 rounded-2xl border border-cyan-300/15 bg-slate-950/96 p-3 shadow-[0_24px_80px_rgba(0,0,0,.45)] backdrop-blur-xl"
        >
          <div className="grid gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (link.href === "#booking") {
                    trackEvent("cta_click_book", { source: "mobile_nav" });
                  }
                  setOpen(false);
                }}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                  link.emphasized
                    ? "border border-cyan-300/40 bg-cyan-300/12 text-cyan-50"
                    : "text-slate-200 hover:bg-white/[0.055] hover:text-cyan-100"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      ) : null}
    </div>
  );
}

function HeaderCta({ children }: { children: ReactNode }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.18, y: y * 0.28 });
  }

  return (
    <motion.a
      href="#booking"
      onClick={() => trackEvent("cta_click_book", { source: "header" })}
      onMouseMove={handleMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      whileHover={{
        scale: 1.05,
        filter: "drop-shadow(0 0 22px rgba(0,242,255,.72))",
      }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.45 }}
      className="group relative hidden h-10 items-center justify-center overflow-hidden rounded-full p-[1px] text-sm font-semibold shadow-[0_0_24px_rgba(0,242,255,.22)] focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:inline-flex"
    >
      <span className="absolute inset-0 animate-border-beam bg-[linear-gradient(90deg,#00f2ff,#34d399,#a855f7,#00f2ff)] bg-[length:200%_100%]" />
      <motion.span
        aria-hidden
        animate={{ opacity: [0.22, 0.55, 0.22], scale: [0.9, 1.08, 0.9] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-[-12px] rounded-full bg-cyan-300/18 blur-xl"
      />
      <span className="relative flex h-full items-center justify-center rounded-full bg-slate-950 px-5 text-white transition group-hover:bg-slate-900">
        {children}
      </span>
    </motion.a>
  );
}

export function HeroSection({
  copy,
  language,
}: {
  copy: SiteCopy;
  language: Language;
  onLanguageChange?: (language: Language) => void;
}) {
  const words = copy.hero.headline.split(" ");

  return (
    <section className="relative isolate min-h-screen overflow-hidden px-5 pb-16 pt-5 sm:px-8">
      <div className="cyber-grid pointer-events-none absolute inset-x-0 top-0 h-[78vh] opacity-70" />
      <motion.div
        aria-hidden
        className="absolute right-[4%] top-24 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl sm:h-[30rem] sm:w-[30rem]"
        animate={{ x: [0, -28, 22, 0], y: [0, 26, -18, 0], scale: [1, 1.1, 0.98, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[-8rem] top-1/3 h-96 w-96 rounded-full bg-violet-500/14 blur-3xl"
        animate={{ x: [0, 40, 8, 0], y: [0, -20, 30, 0], scale: [1, 0.94, 1.08, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-slate-950/56 px-4 py-3 shadow-[0_18px_80px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.08)] backdrop-blur-2xl">
        <InteractiveLogo />
        <div className="flex items-center gap-3 lg:gap-5">
          <HeaderNav copy={copy.nav} />
          <MobileNav copy={copy.nav} />
          <HeaderCta>{copy.nav.booking}</HeaderCta>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center">
        <div className="max-w-5xl pb-10 pt-20">
          <motion.h1
            key={language}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-5xl text-4xl font-semibold leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-8xl"
          >
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.95, filter: "blur(12px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    transition: { duration: 0.62, ease: [0.19, 1, 0.22, 1] },
                  },
                }}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            key={`${language}-hero-line`}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.34, duration: 0.68, ease: [0.19, 1, 0.22, 1] }}
            className="mt-5 max-w-4xl text-2xl font-semibold leading-tight text-cyan-100 sm:text-3xl lg:text-4xl"
          >
            {copy.hero.heroLine}
          </motion.p>

          <motion.p
            key={`${language}-subheadline`}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.52, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="mt-5 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl"
          >
            {copy.hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.72, duration: 0.65, ease: [0.19, 1, 0.22, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <MagneticButton
              href="#booking"
              onClick={() => trackEvent("cta_click_help_now", { source: "hero" })}
            >
              {copy.hero.primaryCta} <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              href="#booking"
              variant="secondary"
              onClick={() => trackEvent("cta_click_book", { source: "hero" })}
            >
              {copy.hero.secondaryCta}
            </MagneticButton>
            <MagneticButton href="#pricing" variant="secondary">
              {copy.hero.tertiaryCta}
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.58, ease: [0.19, 1, 0.22, 1] }}
            className="mt-5 max-w-3xl space-y-2 text-sm leading-6 text-slate-400 sm:text-base"
          >
            <p className="text-cyan-100">{copy.hero.urgentLine}</p>
            <p>{copy.hero.trustLine}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
