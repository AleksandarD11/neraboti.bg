"use client";

import { AnyDeskSection } from "@/components/anydesk-section";
import { AboutSection } from "@/components/about-section";
import { BookingSection } from "@/components/booking-section";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { Language, siteCopy } from "@/lib/site-copy";
import { useState } from "react";

export default function Home() {
  const [language, setLanguage] = useState<Language>("BG");
  const copy = siteCopy[language];

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-slate-100">
      <div className="noise pointer-events-none fixed inset-0 z-0 opacity-[0.035]" />
      <HeroSection copy={copy} language={language} onLanguageChange={setLanguage} />
      <ServicesSection copy={copy.services} />
      <AnyDeskSection copy={copy.anydesk} />
      <BookingSection copy={copy.booking} />
      <AboutSection copy={copy.about} />
    </main>
  );
}
