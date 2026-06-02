"use client";

import { track } from "@vercel/analytics";

type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(name: string, properties?: AnalyticsProperties) {
  try {
    track(name, properties);
  } catch {
    // Analytics must never block core support flows.
  }
}
