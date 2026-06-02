export const BOOKING_TIMEZONE = "Europe/Sofia";

export const BOOKING_TIME_SLOTS = ["10:00", "11:30", "13:30", "15:00", "16:30", "18:00"] as const;

export const WEEKENDS_SELECTABLE = true;

export const contactMethods = [
  { value: "phone", label: "Телефон" },
  { value: "viber", label: "Viber" },
  { value: "email", label: "Имейл" },
] as const;

export type PreferredContactMethod = (typeof contactMethods)[number]["value"];

export const pricingVatNote =
  "Забележка: Информацията за ДДС ще бъде уточнена според данните на доставчика на услугата.";

export const pricingItems = [
  {
    id: "remote-diagnostics",
    service: "Отдалечена диагностика",
    price: "от 30-40 лв.",
    note: "до 30 мин.",
    description:
      "Бърза първоначална проверка на проблема чрез отдалечена връзка. Подходящо за установяване на причината и следващи стъпки.",
  },
  {
    id: "remote-support",
    service: "Отдалечена поддръжка",
    price: "от 50-70 лв./час",
    note: "чрез AnyDesk",
    description:
      "Помощ при софтуерни проблеми, настройки, имейл, принтери, базова поддръжка и други задачи, които могат да се решат дистанционно.",
  },
  {
    id: "onsite-support",
    service: "Посещение на място",
    price: "от 80-120 лв.",
    note: "според район",
    description:
      "Поддръжка на адрес за хардуерни проблеми, офис мрежи, принтери, работни станции и устройства, които изискват физическо присъствие.",
  },
  {
    id: "office-subscription",
    service: "Офис абонамент",
    price: "по оферта",
    note: "месечна поддръжка",
    description:
      "Планирана IT поддръжка за малки бизнеси, офиси и екипи. Включва регулярна помощ, профилактика, консултации и приоритетна реакция според договорените условия.",
  },
  {
    id: "security-audit",
    service: "Киберсигурност одит и проверка за уязвимости",
    price: "по оферта",
    note: "според обхват",
    description:
      "Проверка на публични уеб приложения, сървъри и основни конфигурации за често срещани рискове. Обхватът се уточнява предварително и се работи само с изрично разрешение от клиента.",
  },
] as const;

export const bookingServices = [
  {
    id: "remote-support",
    title: "Отдалечена IT поддръжка",
    description:
      "Бърза диагностика, настройка на софтуер, поправки на ОС и отдалечено съдействие.",
    duration: "30-60 мин.",
    price: "от 50-70 лв./час",
    includes:
      "Диагностика и помощ чрез AnyDesk за софтуерни проблеми, настройки, имейл, принтери и базова поддръжка.",
  },
  {
    id: "onsite-support",
    title: "Поддръжка на място",
    description:
      "Хардуерни ремонти, настройка на офис мрежи, проверки на устройства и диагностика.",
    duration: "60-120 мин.",
    price: "от 80-120 лв.",
    includes:
      "Посещение на адрес за хардуерни проблеми, мрежи, принтери, работни станции и офис устройства.",
  },
  {
    id: "infrastructure",
    title: "Сървъри и инфраструктура",
    description:
      "Поддръжка на сървъри, работни станции, cloud среди, архиви и администриране.",
    duration: "по предварителна оценка",
    price: "по оферта",
    includes:
      "Поддръжка на сървъри, архиви, мрежова инфраструктура, достъпи и бизнес системи.",
  },
  {
    id: "security-audit",
    title: "Киберсигурност одит и проверка за уязвимости",
    description:
      "Проверка на публични уеб приложения, сървъри и основни конфигурации за често срещани рискове.",
    duration: "по предварителна оценка",
    price: "по оферта",
    includes:
      "Ясен доклад с приоритети, препоръки и конкретни стъпки за намаляване на риска. Работим само върху активи, за които имате право да възлагате проверка, и не извършваме тестове без писмено разрешение.",
  },
  {
    id: "business-automations",
    title: "Одит и Бизнес Автоматизации",
    description:
      "Инженерен анализ на работни процеси, рутинни задачи, API интеграции и персонализирани автоматизации.",
    duration: "по предварителна оценка",
    price: "по оферта",
    includes:
      "Анализ на процеси, идентифициране на повтаряеми задачи и предложение за скриптове, интеграции и автоматизации.",
  },
] as const;

export type BookingServiceId = (typeof bookingServices)[number]["id"];

export function getSofiaDateTimeParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BOOKING_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    dateIso: `${byType.year}-${byType.month}-${byType.day}`,
    time: `${byType.hour}:${byType.minute}`,
  };
}

export function formatBulgarianDate(dateIso: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateIso}T00:00:00.000Z`));
}

export function isValidIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00.000Z`));
}

export function isDateInPastSofia(dateIso: string, now = new Date()) {
  return dateIso < getSofiaDateTimeParts(now).dateIso;
}

export function isTimeSlotPastSofia(dateIso: string, time: string, now = new Date()) {
  const current = getSofiaDateTimeParts(now);
  return dateIso === current.dateIso && time <= current.time;
}
