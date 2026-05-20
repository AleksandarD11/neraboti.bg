"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
}: MagneticButtonProps) {
  const base =
    "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-lg px-6 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950";

  if (variant === "secondary") {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.045, x: 2, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`${base} border border-white/12 bg-white/[0.04] text-slate-100 backdrop-blur-xl hover:border-cyan-300/50 hover:bg-cyan-300/[0.08] ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.055, x: 3, y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} p-[1px] shadow-cyan-glow ${className}`}
    >
      <span className="absolute inset-0 animate-border-beam bg-[linear-gradient(90deg,#22d3ee,#34d399,#a855f7,#22d3ee)] bg-[length:200%_100%]" />
      <span className="relative flex h-full w-full items-center justify-center rounded-[7px] bg-slate-950 px-6 text-white transition group-hover:bg-slate-900">
        {children}
      </span>
    </motion.a>
  );
}
