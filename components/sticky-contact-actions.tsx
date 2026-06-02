"use client";

import { trackEvent } from "@/lib/analytics";
import { contactConfig, hasConfiguredBusinessInfo } from "@/lib/business-info";
import { CalendarDays, MessageCircle, Phone } from "lucide-react";

const actions = [
  {
    label: "Обади се",
    mobileLabel: "📞 Обади се",
    href: contactConfig.phoneHref,
    ariaLabel: "Обади се за IT поддръжка",
    icon: Phone,
    emphasis: "primary",
  },
  {
    label: "Viber",
    mobileLabel: "💬 Viber",
    href: contactConfig.viberHref,
    ariaLabel: "Свържи се чрез Viber за IT поддръжка",
    icon: MessageCircle,
    emphasis: "secondary",
  },
  {
    label: "Запази час",
    mobileLabel: "🗓 Запази час",
    href: contactConfig.bookingHref,
    ariaLabel: "Запази час за IT поддръжка",
    icon: CalendarDays,
    emphasis: "secondary",
  },
] as const;

export function StickyContactActions() {
  const visibleActions = actions.filter((action) => {
    if (action.href.startsWith("tel:")) {
      return hasConfiguredBusinessInfo.phone;
    }

    if (action.label === "Viber") {
      return hasConfiguredBusinessInfo.viber;
    }

    return true;
  });
  const mobileGridClass =
    visibleActions.length === 1
      ? "grid-cols-1"
      : visibleActions.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <>
      <nav
        aria-label="Бързи контакти"
        className="fixed right-5 top-28 z-50 hidden flex-col gap-2 lg:flex"
      >
        {visibleActions.map((action) => {
          const Icon = action.icon;
          const isPrimary = action.emphasis === "primary";

          return (
            <a
              key={action.label}
              href={action.href}
              aria-label={action.ariaLabel}
              onClick={() =>
                trackEvent(
                  action.label === "Viber"
                    ? "viber_click"
                    : action.href.startsWith("tel:")
                      ? "phone_click"
                      : "cta_click_book",
                  { source: "sticky_desktop" },
                )
              }
              className={`group inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold shadow-[0_14px_45px_rgba(0,0,0,.28)] backdrop-blur-xl transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                isPrimary
                  ? "border-cyan-300/45 bg-cyan-300/14 text-cyan-50 hover:bg-cyan-300/20"
                  : "border-white/10 bg-slate-950/72 text-slate-200 hover:border-cyan-300/45 hover:text-cyan-100"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {action.label}
            </a>
          );
        })}
      </nav>

      <nav
        aria-label="Бързи контакти"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-cyan-300/15 bg-slate-950/94 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-18px_55px_rgba(0,0,0,.45)] backdrop-blur-xl lg:hidden"
      >
        <div className={`mx-auto grid max-w-lg gap-2 ${mobileGridClass}`}>
          {visibleActions.map((action) => {
            const Icon = action.icon;
            const isPrimary = action.emphasis === "primary";

            return (
              <a
                key={action.label}
                href={action.href}
                aria-label={action.ariaLabel}
                onClick={() =>
                  trackEvent(
                    action.label === "Viber"
                      ? "viber_click"
                      : action.href.startsWith("tel:")
                        ? "phone_click"
                        : "cta_click_book",
                    { source: "sticky_mobile" },
                  )
                }
                className={`flex min-h-12 items-center justify-center gap-1.5 rounded-lg border px-2 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:text-sm ${
                  isPrimary
                    ? "border-cyan-300/45 bg-cyan-300/14 text-cyan-50"
                    : "border-white/10 bg-white/[0.045] text-slate-100"
                }`}
              >
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
                <span className="truncate">{action.mobileLabel}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
