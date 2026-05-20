"use client";

import type { SiteCopy } from "@/lib/site-copy";
import { MapPin, MonitorPlay, Network, ShieldAlert } from "lucide-react";
import { motion, revealUp, staggerContainer } from "./motion";
import { SectionShell } from "./section-shell";

const services = [
  {
    icon: MonitorPlay,
    glow: "group-hover:shadow-cyan-glow",
  },
  {
    icon: MapPin,
    glow: "group-hover:shadow-emerald-glow",
  },
  {
    icon: Network,
    glow: "group-hover:shadow-violet-glow",
  },
  {
    icon: ShieldAlert,
    glow: "group-hover:shadow-cyan-glow",
  },
];

export function ServicesSection({ copy }: { copy: SiteCopy["services"] }) {
  return (
    <SectionShell
      id="services"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-5 md:grid-cols-2"
      >
        {copy.cards.map((serviceCopy, index) => {
          const service = services[index];
          if (!service || !serviceCopy?.title || !serviceCopy?.body) {
            return null;
          }

          return (
          <motion.article
            key={serviceCopy.title}
            variants={revealUp}
            whileHover={{ y: -8, scale: 1.015 }}
            className={`group glass-panel rounded-lg p-7 transition duration-300 hover:border-cyan-300/40 ${service.glow}`}
          >
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
              <service.icon className="h-6 w-6 text-cyan-200" />
            </div>
            <h3 className="text-xl font-semibold text-white">{serviceCopy.title}</h3>
            <p className="mt-3 leading-7 text-slate-400">{serviceCopy.body}</p>
          </motion.article>
          );
        })}
      </motion.div>
    </SectionShell>
  );
}
