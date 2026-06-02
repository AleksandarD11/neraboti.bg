# Production readiness checklist

Use this before publishing neraboti.bg on the production domain.

## Domain and SEO

- [ ] Real production domain is configured through `NEXT_PUBLIC_SITE_URL=https://neraboti.bg`.
- [ ] Canonical URLs, Open Graph URLs, JSON-LD and sitemap do not expose Vercel preview domains.
- [ ] `/sitemap.xml` opens and contains only real, public, indexable routes.
- [ ] `/robots.txt` opens and points to `https://neraboti.bg/sitemap.xml`.
- [ ] Blog article routes are added to the sitemap only after real article content is published.
- [ ] Local SEO pages are published only for real confirmed service areas.

## Business and legal data

- [ ] Real phone, email, company name, EIK and address are added where appropriate.
- [ ] No visible bracket placeholders remain in the public UI.
- [ ] Legal pages are reviewed by a qualified legal professional before production use.
- [ ] Privacy/cookie texts match the actual analytics, hosting, email and booking integrations.
- [ ] VAT/DDS and invoicing wording is confirmed.

## Booking and support flow

- [ ] Booking form has been tested for required fields, validation errors and success state.
- [ ] Booking backend persistence is connected before presenting slots as truly reserved.
- [ ] Rate limiting is production-grade and enabled.
- [ ] Honeypot spam protection is active.
- [ ] Timezone logic uses `Europe/Sofia`.
- [ ] All visible time slots use 24-hour format only.
- [ ] AnyDesk download link points to the official AnyDesk website.
- [ ] AnyDesk sample ID is clearly marked only as an example.

## Analytics and monitoring

- [ ] Vercel Analytics or another approved analytics provider is configured.
- [ ] Vercel Speed Insights is enabled if used in production.
- [ ] Google Search Console verification token is configured through environment variables only.
- [ ] Bing Webmaster verification token is configured through environment variables only.
- [ ] Analytics events do not send personal data.

## QA

- [ ] Accessibility has been checked with keyboard navigation and screen reader-friendly labels.
- [ ] Mobile layout has been checked on common viewport sizes.
- [ ] Sticky contact actions do not cover forms, footer links or cookie/legal UI.
- [ ] `npm run lint` passes or known tooling limitations are documented.
- [ ] `npm run build` passes.
