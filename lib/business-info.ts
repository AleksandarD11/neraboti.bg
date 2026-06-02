export const businessInfo = {
  brand: "neraboti.bg",
  companyName: "",
  companyId: "",
  address: "",
  phone: "",
  email: "",
  workingHours: "По предварителна уговорка",
  serviceArea:
    "Дистанционно в цяла България. Посещения на място - по предварителна уговорка.",
  description:
    "Бърза IT поддръжка, отдалечена помощ чрез AnyDesk, поддръжка на място, сървъри, офис инфраструктура и киберсигурност одити.",
} as const;

export const hasConfiguredBusinessInfo = {
  companyName: Boolean(businessInfo.companyName),
  companyId: Boolean(businessInfo.companyId),
  address: Boolean(businessInfo.address),
  phone: Boolean(businessInfo.phone),
  email: Boolean(businessInfo.email),
  viber: Boolean(businessInfo.phone),
} as const;

export const contactConfig = {
  phoneDisplay: businessInfo.phone,
  phoneHref: hasConfiguredBusinessInfo.phone
    ? `tel:${businessInfo.phone.replace(/[^\d+]/g, "")}`
    : "",
  viberLabel: "Viber",
  viberHref: hasConfiguredBusinessInfo.viber
    ? `viber://chat?number=${businessInfo.phone.replace(/[^\d+]/g, "")}`
    : "",
  bookingHref: "/#booking",
} as const;

export const legalLinks = [
  { href: "/terms", label: "Общи условия" },
  { href: "/privacy", label: "Политика за поверителност" },
  { href: "/cookies", label: "Политика за бисквитки" },
  { href: "/kontakti", label: "Контакти" },
] as const;

export const footerMainLinks = [
  { href: "/uslugi", label: "Услуги" },
  { href: "/uslugi/otdalechena-it-poddrazhka", label: "Отдалечена IT поддръжка" },
  { href: "/uslugi/it-poddrazhka-na-myasto", label: "IT поддръжка на място" },
  { href: "/uslugi/sarvari-i-infrastruktura", label: "Сървъри и инфраструктура" },
  {
    href: "/uslugi/kibersigurnost-odit",
    label: "Киберсигурност одит и проверка за уязвимости",
  },
  { href: "/ceni", label: "Цени" },
  { href: "/anydesk-pomosht", label: "AnyDesk помощ" },
  { href: "/za-nas", label: "За нас" },
  { href: "/kontakti", label: "Контакти" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Блог" },
] as const;
