"use client";

import { trackEvent } from "@/lib/analytics";
import { businessInfo, contactConfig, hasConfiguredBusinessInfo } from "@/lib/business-info";
import {
  BOOKING_TIME_SLOTS,
  BOOKING_TIMEZONE,
  WEEKENDS_SELECTABLE,
  bookingServices,
  contactMethods,
  formatBulgarianDate,
  getSofiaDateTimeParts,
  isDateInPastSofia,
  isTimeSlotPastSofia,
} from "@/lib/booking-config";
import {
  hasBookingErrors,
  MAX_PROBLEM_DESCRIPTION_LENGTH,
  validateBookingPayload,
  type BookingRequestPayload,
  type BookingValidationErrors,
} from "@/lib/booking-validation";
import type { SiteCopy } from "@/lib/site-copy";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  Mail,
  MonitorPlay,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Truck,
  User,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import type { KeyboardEvent } from "react";
import { forwardRef, useMemo, useRef, useState } from "react";
import { motion } from "./motion";

const serviceIcons = [MonitorPlay, Truck, Server, ShieldCheck, Workflow];
const weekDays = ["ПОН", "ВТО", "СРЯ", "ЧЕТ", "ПЕТ", "СЪБ", "НЕД"];

const panelVariants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.62, ease: "easeInOut" },
  },
};

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      requestId: string | null;
      summary: {
        selectedService: string;
        selectedDate: string;
        selectedTime: string;
        name: string;
        preferredContactMethod: string;
      };
    }
  | { status: "error"; message: string };

function getMonthDays(monthIso: string) {
  const [year, month] = monthIso.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1));
  const start = new Date(first);
  start.setUTCDate(first.getUTCDate() - ((first.getUTCDay() + 6) % 7));

  const days: string[] = [];
  for (let index = 0; index < 42; index += 1) {
    const day = new Date(start);
    day.setUTCDate(start.getUTCDate() + index);
    days.push(day.toISOString().slice(0, 10));
  }

  return days;
}

function getMonthTitle(monthIso: string) {
  return new Intl.DateTimeFormat("bg-BG", {
    timeZone: "UTC",
    month: "long",
    year: "numeric",
  }).format(new Date(`${monthIso}-01T00:00:00.000Z`));
}

function getContactMethodLabel(value: string) {
  return contactMethods.find((method) => method.value === value)?.label || "";
}

function WordReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <motion.span
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.045, duration: 0.8, ease: "easeInOut" },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={className}
    >
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={itemVariants}
          className="mr-2 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function BookingSection({ copy }: { copy: SiteCopy["booking"] }) {
  void copy;
  const todayIso = getSofiaDateTimeParts().dateIso;
  const [selectedMonth] = useState(todayIso.slice(0, 7));
  const calendarDays = useMemo(() => getMonthDays(selectedMonth), [selectedMonth]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDate, setSelectedDate] = useState(todayIso);
  const [selectedTime, setSelectedTime] = useState("");
  const [preferredContactMethod, setPreferredContactMethod] =
    useState<BookingRequestPayload["preferredContactMethod"]>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const selectedService = bookingServices.find((service) => service.id === selectedServiceId);
  const selectedDateLabel = selectedDate ? formatBulgarianDate(selectedDate) : "";
  const monthTitle = getMonthTitle(selectedMonth);
  const isSubmitting = submitState.status === "loading";
  const hasAvailableSlots = BOOKING_TIME_SLOTS.some(
    (time) => selectedDate && !isTimeSlotPastSofia(selectedDate, time),
  );
  const fallbackSubmissionMessage =
    hasConfiguredBusinessInfo.phone || hasConfiguredBusinessInfo.email
      ? `Моля, опитайте отново. Ако проблемът продължава, свържете се с нас${hasConfiguredBusinessInfo.phone ? ` на ${businessInfo.phone}` : ""}${hasConfiguredBusinessInfo.email ? ` или ни пишете на ${businessInfo.email}` : ""}.`
      : "Моля, опитайте отново. Ако проблемът продължава, използвайте формата по-късно или отворете страницата „Контакти“ за актуални канали за връзка.";

  const payload: BookingRequestPayload = {
    name,
    phone,
    email,
    preferredContactMethod,
    selectedService: selectedServiceId,
    selectedDate,
    selectedTime,
    problemDescription,
    consentAccepted,
    honeypot,
  };

  function isCalendarDateDisabled(dateIso: string) {
    const inMonth = dateIso.startsWith(selectedMonth);
    const isPast = isDateInPastSofia(dateIso);
    const day = new Date(`${dateIso}T00:00:00.000Z`).getUTCDay();
    const isWeekend = day === 0 || day === 6;

    return isPast || !inMonth || (!WEEKENDS_SELECTABLE && isWeekend);
  }

  function selectDate(dateIso: string) {
    setSelectedDate(dateIso);
    if (isTimeSlotPastSofia(dateIso, selectedTime)) {
      setSelectedTime("");
    }
    setErrors((current) => ({ ...current, selectedDate: undefined }));
  }

  function focusCalendarDate(index: number) {
    const targetDate = calendarDays[index];
    const targetButton = document.querySelector<HTMLButtonElement>(
      `[data-calendar-date="${targetDate}"]`,
    );
    targetButton?.focus();
  }

  function findNextEnabledDateIndex(currentIndex: number, step: number) {
    let nextIndex = currentIndex + step;

    while (nextIndex >= 0 && nextIndex < calendarDays.length) {
      if (!isCalendarDateDisabled(calendarDays[nextIndex])) {
        return nextIndex;
      }
      nextIndex += step;
    }

    return currentIndex;
  }

  function handleDateKeyDown(event: KeyboardEvent<HTMLButtonElement>, dateIso: string) {
    const currentIndex = calendarDays.indexOf(dateIso);
    const keySteps: Record<string, number> = {
      ArrowRight: 1,
      ArrowLeft: -1,
      ArrowDown: 7,
      ArrowUp: -7,
    };

    if (event.key in keySteps) {
      event.preventDefault();
      focusCalendarDate(findNextEnabledDateIndex(currentIndex, keySteps[event.key]));
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      const firstEnabledIndex = calendarDays.findIndex((day) => !isCalendarDateDisabled(day));
      if (firstEnabledIndex >= 0) {
        focusCalendarDate(firstEnabledIndex);
      }
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      const lastEnabledIndex = calendarDays.findLastIndex((day) => !isCalendarDateDisabled(day));
      if (lastEnabledIndex >= 0) {
        focusCalendarDate(lastEnabledIndex);
      }
    }
  }

  function resetForm() {
    setSelectedServiceId("");
    setSelectedDate(todayIso);
    setSelectedTime("");
    setPreferredContactMethod("");
    setName("");
    setEmail("");
    setPhone("");
    setProblemDescription("");
    setConsentAccepted(false);
    setHoneypot("");
    setErrors({});
    setSubmitState({ status: "idle" });
  }

  async function handleSubmit() {
    if (isSubmitting) {
      return;
    }

    const nextErrors = validateBookingPayload(payload);
    setErrors(nextErrors);

    if (hasBookingErrors(nextErrors)) {
      setSubmitState({ status: "idle" });
      trackEvent("booking_submit_error", { errorCode: "CLIENT_VALIDATION_ERROR" });
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
      return;
    }

    setSubmitState({ status: "loading" });

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        success: boolean;
        errorCode?: string;
        requestId?: string | null;
        message?: string;
        fieldErrors?: BookingValidationErrors;
        errors?: BookingValidationErrors;
      };

      if (!response.ok || !result.success) {
        const serverErrors = result.fieldErrors || result.errors || {};
        setErrors(serverErrors);
        setSubmitState({
          status: "error",
          message:
            result.errorCode === "SERVER_ERROR"
              ? fallbackSubmissionMessage
              : result.message || fallbackSubmissionMessage,
        });
        trackEvent("booking_submit_error", {
          errorCode: result.errorCode || "UNKNOWN_ERROR",
        });
        window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
        return;
      }

      setErrors({});
      setSubmitState({
        status: "success",
        requestId: result.requestId || null,
        summary: {
          selectedService: selectedService?.title || "",
          selectedDate: selectedDateLabel,
          selectedTime,
          name: name.trim(),
          preferredContactMethod: getContactMethodLabel(preferredContactMethod),
        },
      });
      trackEvent("booking_submit_success", {
        service: selectedService?.title || selectedServiceId,
      });
    } catch {
      setSubmitState({
        status: "error",
        message: fallbackSubmissionMessage,
      });
      trackEvent("booking_submit_error", { errorCode: "NETWORK_OR_SERVER_ERROR" });
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  }

  return (
    <section id="booking" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative overflow-hidden rounded-2xl border border-cyan-500/10 bg-slate-950/68 p-[1px] shadow-glass backdrop-blur-xl"
      >
        <motion.div
          aria-hidden
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.62, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl"
        />
        <motion.div
          aria-hidden
          animate={{ scale: [1.1, 0.96, 1.1], opacity: [0.26, 0.5, 0.26] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-violet-500/16 blur-3xl"
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

        <div className="relative rounded-2xl bg-[#050914]/82 p-5 sm:p-8 lg:p-10">
          <motion.div variants={itemVariants} className="mx-auto mb-10 max-w-4xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              Заявка за поддръжка
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <WordReveal text="Запазете час за IT поддръжка" />
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
              <WordReveal text="Изберете услуга, дата и удобен час. След изпращане ще се свържем с вас по телефон или Viber, за да потвърдим заявката." />
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div variants={panelVariants} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <motion.h3 id="service-selection-title" variants={itemVariants} className="mb-5 text-xl font-semibold text-white">
                Изберете услуга
              </motion.h3>
              <div
                className="grid gap-4"
                role="group"
                aria-labelledby="service-selection-title"
                aria-describedby={errors.selectedService ? "service-error" : undefined}
              >
                {bookingServices.map((service, index) => {
                  const Icon = serviceIcons[index];
                  const isActive = selectedServiceId === service.id;

                  return (
                    <motion.button
                      key={service.id}
                      variants={itemVariants}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setSelectedServiceId(service.id);
                        setErrors((current) => ({ ...current, selectedService: undefined }));
                        trackEvent("service_selected", { service: service.title });
                      }}
                      whileHover={{ y: -5, scale: 1.012 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative overflow-hidden rounded-xl p-[1px] text-left transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                        isActive
                          ? "shadow-[0_0_15px_rgba(0,242,255,0.4),inset_0_0_15px_rgba(0,242,255,0.1)]"
                          : ""
                      }`}
                    >
                      <span
                        className={`relative flex gap-4 rounded-[11px] border p-4 backdrop-blur-xl transition ${
                          isActive
                            ? "border-cyan-400 bg-slate-900/60 shadow-[0_0_15px_rgba(0,242,255,0.4),inset_0_0_15px_rgba(0,242,255,0.1)]"
                            : "border-white/10 bg-slate-950/60 group-hover:border-cyan-300/35"
                        }`}
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className={`block font-semibold ${isActive ? "text-cyan-400" : "text-white"}`}>
                            {service.title}
                          </span>
                          <span className={`mt-2 block text-sm leading-6 ${isActive ? "text-gray-300" : "text-slate-400"}`}>
                            {service.description}
                          </span>
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              <FieldError id="service-error" message={errors.selectedService} />

              {selectedService ? (
                <motion.div variants={itemVariants} className="mt-5 rounded-xl border border-cyan-300/20 bg-cyan-300/[0.055] p-5">
                  <h4 className="text-lg font-semibold text-cyan-100">Избрана услуга</h4>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-slate-300">
                    <SummaryRow label="Очаквано времетраене" value={selectedService.duration} />
                    <SummaryRow label="Ориентировъчна цена" value={selectedService.price} />
                    <SummaryRow label="Какво включва" value={selectedService.includes} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-400">
                    Крайната цена зависи от конкретния проблем, сложността и времето за изпълнение. Ще получите потвърждение преди започване на работа.
                  </p>
                </motion.div>
              ) : null}
            </motion.div>

            <motion.div
              variants={panelVariants}
              className="rounded-xl border border-white/10 bg-[#0b0f19]/72 p-5 backdrop-blur-xl"
            >
              <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Данни и удобен час</h3>
                  <p className="mt-2 text-sm text-cyan-100">
                    Часова зона: {BOOKING_TIMEZONE}. Заявката се потвърждава допълнително.
                  </p>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Viber/телефон
                </span>
              </motion.div>

              <StatusPanel state={submitState} onNewRequest={resetForm} />

              {submitState.status !== "success" ? (
                <>
                  <ErrorSummary errors={errors} submitState={submitState} ref={errorSummaryRef} />

                  <motion.div variants={itemVariants} className="grid gap-4">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Контактни данни
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <GhostInput
                        icon={User}
                        id="booking-name"
                        label="Име"
                        value={name}
                        onChange={setName}
                        error={errors.name}
                        required
                        autoComplete="name"
                      />
                      <GhostInput
                        icon={Phone}
                        id="booking-phone"
                        label="Телефон"
                        value={phone}
                        onChange={setPhone}
                        error={errors.phone}
                        required
                        type="tel"
                        autoComplete="tel"
                      />
                      <GhostInput
                        icon={Mail}
                        id="booking-email"
                        label="Имейл"
                        value={email}
                        onChange={setEmail}
                        error={errors.email}
                        type="email"
                        autoComplete="email"
                      />
                    </div>
                    <p className="text-sm leading-6 text-slate-400">
                      Използваме тези данни само, за да се свържем с вас относно заявката.
                    </p>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-6">
                    <h4 id="contact-method-title" className="mb-3 text-sm font-semibold text-slate-300">
                      Предпочитан канал за връзка <span className="text-cyan-200">*</span>
                    </h4>
                    <div
                      className="grid gap-3 sm:grid-cols-3"
                      role="radiogroup"
                      aria-labelledby="contact-method-title"
                      aria-describedby={errors.preferredContactMethod ? "contact-method-error" : undefined}
                    >
                      {contactMethods.map((method) => {
                        const selected = preferredContactMethod === method.value;
                        return (
                          <button
                            key={method.value}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => {
                              setPreferredContactMethod(method.value);
                              setErrors((current) => ({ ...current, preferredContactMethod: undefined }));
                            }}
                            className={`rounded-lg border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                              selected
                                ? "border-[#00f2ff]/70 bg-cyan-300/12 text-cyan-50 shadow-cyan-glow"
                                : "border-white/10 bg-transparent text-slate-300 hover:border-cyan-300/40"
                            }`}
                          >
                            {method.label}
                          </button>
                        );
                      })}
                    </div>
                    <FieldError id="contact-method-error" message={errors.preferredContactMethod} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-7">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <h4 id="booking-date-title" className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                        Изберете дата
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-cyan-100">
                        <CalendarDays className="h-4 w-4" />
                        {monthTitle}
                      </div>
                    </div>
                    <div
                      className="grid grid-cols-7 gap-1.5 sm:gap-2"
                      role="group"
                      aria-labelledby="booking-date-title"
                      aria-describedby={errors.selectedDate ? "date-error" : undefined}
                    >
                      {weekDays.map((day) => (
                        <div key={day} className="pb-2 text-center text-[10px] font-black text-slate-400 sm:text-[11px]">
                          {day}
                        </div>
                      ))}
                      {calendarDays.map((dateIso) => {
                        const inMonth = dateIso.startsWith(selectedMonth);
                        const isPast = isDateInPastSofia(dateIso);
                        const day = new Date(`${dateIso}T00:00:00.000Z`).getUTCDay();
                        const isWeekend = day === 0 || day === 6;
                        const disabled = isCalendarDateDisabled(dateIso);
                        const selected = selectedDate === dateIso;
                        const dateLabel = formatBulgarianDate(dateIso);
                        const dateStateLabel = [
                          selected ? "Избрана дата" : "Избери дата",
                          dateIso === todayIso ? "днес" : "",
                        ]
                          .filter(Boolean)
                          .join(", ");
                        const disabledReason = !inMonth
                          ? "извън текущия месец"
                          : isPast
                            ? "минала дата"
                            : !WEEKENDS_SELECTABLE && isWeekend
                              ? "недостъпна дата"
                              : "";

                        return (
                          <motion.button
                            key={dateIso}
                            variants={itemVariants}
                            type="button"
                            aria-pressed={selected}
                            aria-current={dateIso === todayIso ? "date" : undefined}
                            aria-label={`${dateStateLabel}, ${dateLabel}${disabled ? `, ${disabledReason}` : ""}`}
                            disabled={disabled}
                            data-calendar-date={dateIso}
                            onKeyDown={(event) => handleDateKeyDown(event, dateIso)}
                            whileHover={!disabled ? { y: -3, scale: 1.04 } : undefined}
                            whileTap={!disabled ? { scale: 0.96 } : undefined}
                            onClick={() => selectDate(dateIso)}
                            className={`relative aspect-square rounded-full border text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:text-sm ${
                              selected
                                ? "border-[#00f2ff]/80 bg-cyan-300/14 text-white shadow-cyan-glow"
                                : disabled
                                  ? "cursor-not-allowed border-white/10 bg-slate-950/35 text-slate-400 line-through"
                                  : isWeekend
                                    ? "border-violet-300/20 bg-violet-300/[0.045] text-slate-300 hover:border-cyan-300/35"
                                    : "border-white/10 bg-slate-950/55 text-slate-300 hover:border-cyan-300/35"
                            }`}
                          >
                            {Number(dateIso.slice(8, 10))}
                            {dateIso === todayIso ? (
                              <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00f2ff]" />
                            ) : null}
                          </motion.button>
                        );
                      })}
                    </div>
                    <FieldError id="date-error" message={errors.selectedDate} />
                  </motion.div>

                  <motion.div variants={panelVariants} initial="hidden" animate="visible" className="mt-7">
                    <h4 id="booking-time-title" className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                      <Clock className="h-4 w-4" />
                      Свободни часове
                    </h4>
                    <div
                      className="grid grid-cols-2 gap-3 sm:grid-cols-3"
                      role="group"
                      aria-labelledby="booking-time-title"
                      aria-describedby={errors.selectedTime ? "time-error" : undefined}
                    >
                      {BOOKING_TIME_SLOTS.map((time) => {
                        const selected = selectedTime === time;
                        const disabled = !selectedDate || isTimeSlotPastSofia(selectedDate, time);
                        const timeLabel = disabled ? `${time}, недостъпен час` : `Избери час ${time}`;
                        return (
                          <motion.button
                            key={time}
                            variants={itemVariants}
                            type="button"
                            aria-pressed={selected}
                            aria-label={timeLabel}
                            disabled={disabled}
                            whileHover={!disabled ? { y: -3, scale: 1.025 } : undefined}
                            whileTap={!disabled ? { scale: 0.97 } : undefined}
                            onClick={() => {
                              setSelectedTime(time);
                              setErrors((current) => ({ ...current, selectedTime: undefined }));
                            }}
                            className={`rounded-lg border px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                              selected
                                ? "border-[#00f2ff]/70 bg-cyan-300/12 text-cyan-50 shadow-cyan-glow"
                                : disabled
                                  ? "cursor-not-allowed border-white/10 bg-slate-950/35 text-slate-400 line-through"
                                  : "border-white/10 bg-transparent text-slate-300 hover:border-cyan-300/40"
                            }`}
                          >
                            {time}
                          </motion.button>
                        );
                      })}
                    </div>
                    {!hasAvailableSlots ? (
                      <div className="mt-4 rounded-xl border border-amber-200/20 bg-amber-200/[0.055] p-4 text-sm leading-6 text-amber-50">
                        <p className="font-semibold">Няма свободни часове за този ден.</p>
                        <p className="mt-1">
                          Спешно? Използвайте наличните контактни канали или изпратете заявка за следващ удобен час.
                        </p>
                        {hasConfiguredBusinessInfo.phone || hasConfiguredBusinessInfo.viber ? (
                          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                            {hasConfiguredBusinessInfo.phone ? (
                              <a
                                href={contactConfig.phoneHref}
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-100/30 bg-amber-100/10 px-4 py-2 font-semibold text-amber-50 transition hover:bg-amber-100/15 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-slate-950"
                                onClick={() => trackEvent("phone_click", { source: "booking_no_slots" })}
                              >
                                Обади се
                              </a>
                            ) : null}
                            {hasConfiguredBusinessInfo.viber ? (
                              <a
                                href={contactConfig.viberHref}
                                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-amber-100/30 bg-amber-100/10 px-4 py-2 font-semibold text-amber-50 transition hover:bg-amber-100/15 focus:outline-none focus:ring-2 focus:ring-amber-100 focus:ring-offset-2 focus:ring-offset-slate-950"
                                onClick={() => trackEvent("viber_click", { source: "booking_no_slots" })}
                              >
                                Viber
                              </a>
                            ) : null}
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    <FieldError id="time-error" message={errors.selectedTime} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-7">
                    <GhostTextarea
                      id="booking-description"
                      label="Описание на проблема"
                      placeholder="Опишете какво се случва, кое устройство е засегнато и колко е спешно."
                      value={problemDescription}
                      onChange={setProblemDescription}
                      error={errors.problemDescription}
                      required
                      maxLength={MAX_PROBLEM_DESCRIPTION_LENGTH}
                    />
                  </motion.div>

                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="booking-company">Фирма</label>
                    <input
                      id="booking-company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(event) => setHoneypot(event.target.value)}
                    />
                  </div>

                  <motion.div variants={itemVariants} className="mt-6 rounded-xl border border-cyan-300/15 bg-cyan-300/[0.045] p-4">
                    <label className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg p-1 text-sm leading-6 text-slate-200">
                      <input
                        type="checkbox"
                        checked={consentAccepted}
                        onChange={(event) => {
                          setConsentAccepted(event.target.checked);
                          if (event.target.checked) {
                            setErrors((current) => ({ ...current, consentAccepted: undefined }));
                          }
                        }}
                        aria-invalid={Boolean(errors.consentAccepted)}
                        aria-describedby={errors.consentAccepted ? "consent-helper consent-error" : "consent-helper"}
                        className="mt-1 h-5 w-5 rounded border-slate-400 bg-slate-950 text-cyan-300 focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                      />
                      <span>
                        Съгласен/съгласна съм с{" "}
                        <Link
                          href="/terms"
                          className="font-semibold text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                          Общите условия
                        </Link>{" "}
                        и{" "}
                        <Link
                          href="/privacy"
                          className="font-semibold text-cyan-200 underline decoration-cyan-300/40 underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                        >
                          Политиката за поверителност
                        </Link>
                        .
                      </span>
                    </label>
                    <p id="consent-helper" className="mt-3 text-sm leading-6 text-slate-400">
                      Използваме данните ви единствено, за да се свържем с вас относно заявката и да организираме предоставянето на избраната IT услуга.
                    </p>
                    <FieldError id="consent-error" message={errors.consentAccepted} />
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-4 rounded-xl border border-emerald-300/15 bg-emerald-300/[0.045] p-4 text-sm leading-6 text-emerald-50">
                    <div className="flex gap-3">
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200" />
                      <p>
                        Вашите данни са защитени. Не споделяме контактната ви информация с трети страни за маркетингови цели. Ще се свържем с вас само във връзка със заявената услуга.
                      </p>
                    </div>
                  </motion.div>

                  <p className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4 text-sm leading-6 text-slate-300">
                    Изпращането на заявката не гарантира автоматично запазен час. Ще получите потвърждение по Viber/телефон до 15 минути.
                  </p>
                  {hasConfiguredBusinessInfo.phone ? (
                    <p className="mt-3 text-sm leading-6 text-cyan-100">
                      Спешен проблем? Обадете се директно на {businessInfo.phone}.
                    </p>
                  ) : null}

                  <motion.button
                    variants={itemVariants}
                    type="button"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.018, y: -2 } : undefined}
                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                    onClick={handleSubmit}
                    className="group relative mt-7 flex min-h-14 w-full overflow-hidden rounded-lg p-[1px] shadow-cyan-glow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-wait disabled:opacity-70"
                  >
                    <span className="absolute inset-0 animate-border-beam bg-[linear-gradient(90deg,#00f2ff,#34d399,#a855f7,#00f2ff)] bg-[length:200%_100%]" />
                    <span className="relative flex w-full items-center justify-center gap-2 rounded-[7px] bg-slate-950 px-5 py-4 font-semibold text-white transition group-hover:bg-slate-900">
                      <Send className="h-5 w-5" />
                      {isSubmitting ? "Изпращаме заявката..." : "Изпрати заявка"}
                    </span>
                  </motion.button>
                </>
              ) : null}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const ErrorSummary = forwardRef<
  HTMLDivElement,
  {
    errors: BookingValidationErrors;
    submitState: SubmitState;
  }
>(function ErrorSummary({ errors, submitState }, ref) {
  const messages = Object.values(errors).filter(Boolean);
  const show = messages.length > 0 || submitState.status === "error";

  if (!show) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      tabIndex={-1}
      role="alert"
      aria-live="assertive"
      className="mb-5 rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-sm leading-6 text-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
    >
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">
            {submitState.status === "error" ? "Не успяхме да изпратим заявката." : "Моля, проверете полетата във формата."}
          </p>
          {submitState.status === "error" ? (
            <p className="mt-1">{submitState.message}</p>
          ) : (
            <ul className="mt-2 list-inside list-disc">
              {messages.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
});

function StatusPanel({ state, onNewRequest }: { state: SubmitState; onNewRequest: () => void }) {
  if (state.status !== "success") {
    return null;
  }

  return (
    <motion.div
      variants={itemVariants}
      role="status"
      aria-live="polite"
      className="rounded-xl border border-emerald-300/25 bg-emerald-300/[0.06] p-5 text-emerald-50"
    >
      <div className="flex gap-3">
        <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-200" />
        <div>
          <h4 className="text-xl font-semibold">Заявката е изпратена успешно.</h4>
          <p className="mt-2 leading-7 text-emerald-50/90">
            Благодарим ви! Ще се свържем с вас по избрания канал за връзка, за да потвърдим часа. Обикновено отговаряме до 15 минути в работно време.
          </p>
          <p className="mt-2 font-semibold text-emerald-50">
            Часът е заявен, но се потвърждава от наш екип.
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 rounded-lg border border-white/10 bg-slate-950/35 p-4 text-sm sm:grid-cols-2">
        <SummaryRow label="Избрана услуга" value={state.summary.selectedService} />
        <SummaryRow label="Дата" value={state.summary.selectedDate} />
        <SummaryRow label="Час" value={state.summary.selectedTime} />
        <SummaryRow label="Име" value={state.summary.name} />
        <SummaryRow label="Предпочитан канал за връзка" value={state.summary.preferredContactMethod} />
      </div>
      <button
        type="button"
        onClick={onNewRequest}
        className="mt-5 rounded-lg border border-emerald-200/40 bg-emerald-300/10 px-5 py-3 text-sm font-semibold text-emerald-50 transition hover:bg-emerald-300/16 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 focus:ring-offset-slate-950"
      >
        Нова заявка
      </button>
    </motion.div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-slate-100">{value}</p>
    </div>
  );
}

function GhostInput({
  icon: Icon,
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  required = false,
  autoComplete,
}: {
  icon: typeof User;
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-300">
        {label} {required ? <span className="text-cyan-200">*</span> : null}
      </label>
      <div className="group relative flex items-center gap-3 rounded-lg border border-slate-600 bg-slate-800/40 p-3 transition focus-within:border-cyan-400 focus-within:ring-1 focus-within:ring-cyan-400">
        <Icon className="h-4 w-4 text-gray-400 transition group-focus-within:text-cyan-300" />
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none"
        />
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function GhostTextarea({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  maxLength,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-300">
        {label} {required ? <span className="text-cyan-200">*</span> : null}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full resize-none rounded-lg border border-slate-600 bg-slate-800/40 p-3 text-sm text-white transition placeholder:text-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 text-sm font-medium text-red-100" role="alert">
      {message}
    </p>
  );
}
