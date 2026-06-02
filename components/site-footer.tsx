import { businessInfo, footerMainLinks, hasConfiguredBusinessInfo, legalLinks } from "@/lib/business-info";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-cyan-300/10 bg-slate-950/84 px-5 py-12 text-slate-300 backdrop-blur-xl sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr_0.75fr_0.7fr]">
        <div>
          <Link
            href="/"
            className="inline-flex text-xl font-black tracking-tight text-white transition hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {businessInfo.brand}
          </Link>
          <p className="mt-4 max-w-xl leading-7 text-slate-400">{businessInfo.description}</p>
          {hasConfiguredBusinessInfo.companyName ||
          hasConfiguredBusinessInfo.companyId ||
          hasConfiguredBusinessInfo.address ? (
            <div className="mt-5 grid gap-2 text-sm">
              {hasConfiguredBusinessInfo.companyName ? (
                <p>
                  <span className="font-semibold text-slate-100">Фирма:</span>{" "}
                  {businessInfo.companyName}
                </p>
              ) : null}
              {hasConfiguredBusinessInfo.companyId ? (
                <p>
                  <span className="font-semibold text-slate-100">ЕИК:</span>{" "}
                  {businessInfo.companyId}
                </p>
              ) : null}
              {hasConfiguredBusinessInfo.address ? (
                <p>
                  <span className="font-semibold text-slate-100">Седалище:</span>{" "}
                  {businessInfo.address}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="grid gap-4 text-sm">
          {hasConfiguredBusinessInfo.phone ? (
            <FooterInfo icon={Phone} label="Телефон" value={businessInfo.phone} />
          ) : null}
          {hasConfiguredBusinessInfo.email ? (
            <FooterInfo icon={Mail} label="Имейл" value={businessInfo.email} />
          ) : null}
          <FooterInfo icon={Clock} label="Работно време" value={businessInfo.workingHours} />
          <FooterInfo icon={MapPin} label="Зона на обслужване" value={businessInfo.serviceArea} />
        </div>

        <nav aria-label="Основни страници" className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Услуги
          </h2>
          {footerMainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Правна информация" className="flex flex-col gap-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Информация
          </h2>
          {legalLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-300 transition hover:text-cyan-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-5 text-xs text-slate-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {businessInfo.brand}. Всички права запазени.</p>
        <p>Правните текстове са информационни и подлежат на юридически преглед.</p>
      </div>
    </footer>
  );
}

function FooterInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-200" />
      <p>
        <span className="block font-semibold text-slate-100">{label}</span>
        <span className="text-slate-400">{value}</span>
      </p>
    </div>
  );
}
