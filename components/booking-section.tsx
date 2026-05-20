"use client";

import type { SiteCopy } from "@/lib/site-copy";
import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Copy,
  Mail,
  MessageCircle,
  MonitorPlay,
  Phone,
  Send,
  Server,
  ShieldCheck,
  Truck,
  User,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "./motion";

const VIBER_NUMBER = "%2B359889057871";

const serviceIcons = [MonitorPlay, Truck, Server, ShieldCheck];

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

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.left = "0";
  textArea.style.opacity = "0";
  textArea.style.position = "fixed";
  textArea.style.top = "0";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textArea);
  }
}

function buildCalendarDays(month: Date) {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days: Date[] = [];

  for (let day = gridStart; !isBefore(gridEnd, day); day = addDays(day, 1)) {
    days.push(day);
  }

  return days;
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
  const today = useMemo(() => startOfDay(new Date()), []);
  const currentMonth = useMemo(() => startOfMonth(today), [today]);
  const calendarDays = useMemo(() => buildCalendarDays(currentMonth), [currentMonth]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!showModal) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeModal = () => setShowModal(false);
    window.addEventListener("popstate", closeModal);

    return () => {
      window.removeEventListener("popstate", closeModal);
      document.body.style.overflow = previousOverflow || "auto";
      setShowModal(false);
    };
  }, [showModal]);

  const selectedService =
    selectedServiceIndex === null ? "" : copy.serviceCards[selectedServiceIndex].title;
  const selectedDateLabel = selectedDate
    ? `${format(selectedDate, "d")} ${copy.months[selectedDate.getMonth()]} ${format(selectedDate, "yyyy")}`
    : "";
  const monthTitle = `${copy.months[currentMonth.getMonth()]} ${format(currentMonth, "yyyy")}`;

  const viberMessage = copy.viberMessage
    .replace("{name}", name.trim())
    .replace("{phone}", phone.trim())
    .replace("{email}", email.trim())
    .replace("{service}", selectedService)
    .replace("{date}", selectedDateLabel)
    .replace("{time}", selectedTime)
    .replace("{description}", message.trim());

  const viberUrl = `viber://chat?number=${VIBER_NUMBER}&text=${encodeURIComponent(viberMessage)}`;
  const canSubmit = Boolean(
    selectedService && selectedDate && selectedTime && name.trim() && email.trim() && phone.trim(),
  );

  function handleSubmit() {
    if (!canSubmit) {
      setShowHint(true);
      return;
    }

    setShowHint(false);

    if (isMobileDevice()) {
      window.location.href = viberUrl;
      return;
    }

    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
    setCopied(false);
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
              {copy.eyebrow}
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              <WordReveal text={copy.title} />
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">
              <WordReveal text={copy.subtitle} />
            </p>
          </motion.div>

          <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div variants={panelVariants} className="rounded-xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl">
              <motion.h3 variants={itemVariants} className="mb-5 text-xl font-semibold text-white">
                {copy.stepOne}
              </motion.h3>
              <div className="grid gap-4">
                {copy.serviceCards.map((service, index) => {
                  const Icon = serviceIcons[index];
                  const isActive = selectedServiceIndex === index;
                  if (!Icon || !service?.title || !service?.description) {
                    return null;
                  }

                  return (
                    <motion.button
                      key={service.title}
                      variants={itemVariants}
                      whileHover={{ y: -5, scale: 1.012 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedServiceIndex(index)}
                      className={`group relative overflow-hidden rounded-xl p-[1px] text-left transition ${
                        isActive ? "shadow-cyan-glow" : ""
                      }`}
                    >
                      {isActive ? (
                        <span className="absolute inset-0 animate-border-beam bg-[linear-gradient(90deg,#00f2ff,#34d399,#a855f7,#00f2ff)] bg-[length:200%_100%]" />
                      ) : null}
                      <span
                        className={`relative flex gap-4 rounded-[11px] border p-4 backdrop-blur-xl transition ${
                          isActive
                            ? "border-cyan-300/50 bg-cyan-300/10"
                            : "border-white/10 bg-slate-950/60 group-hover:border-cyan-300/35"
                        }`}
                      >
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-100">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-semibold text-white">{service.title}</span>
                          <span className="mt-2 block text-sm leading-6 text-slate-400">
                            {service.description}
                          </span>
                        </span>
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              key={selectedServiceIndex === null ? "locked" : `open-${selectedServiceIndex}`}
              variants={{
                hidden: { opacity: 0, x: 34, scale: 0.96, filter: "blur(10px)" },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  transition: {
                    staggerChildren: 0.1,
                    duration: 0.8,
                    ease: [0.19, 1, 0.22, 1],
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              className={`rounded-xl border border-white/10 bg-[#0b0f19]/72 p-5 backdrop-blur-xl transition ${
                selectedServiceIndex === null ? "pointer-events-none opacity-35 blur-[1px]" : "opacity-100"
              }`}
            >
              <motion.div variants={itemVariants} className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{copy.stepTwo}</h3>
                  <p className="mt-2 text-sm text-cyan-100">
                    {selectedService ? `${copy.selectedService}: ${selectedService}` : copy.stepOne}
                  </p>
                </div>
                <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  Viber
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="grid gap-4">
                <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  {copy.contactTitle}
                </h4>
                <div className="grid gap-4 sm:grid-cols-3">
                  <GhostInput icon={User} label={copy.form.name} value={name} onChange={setName} />
                  <GhostInput icon={Mail} label={copy.form.email} value={email} onChange={setEmail} type="email" />
                  <GhostInput icon={Phone} label={copy.form.phone} value={phone} onChange={setPhone} type="tel" />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    {copy.scheduleTitle}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-cyan-100">
                    <CalendarDays className="h-4 w-4" />
                    {monthTitle}
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {copy.weekdays.map((day) => (
                    <div key={day} className="pb-2 text-center text-[11px] font-black text-slate-500">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((date) => {
                    const isPast = isBefore(date, today);
                    const inMonth = isSameMonth(date, currentMonth);
                    const selected = selectedDate ? isSameDay(date, selectedDate) : false;
                    const current = isSameDay(date, today);

                    return (
                      <motion.button
                        key={date.toISOString()}
                        variants={itemVariants}
                        type="button"
                        disabled={isPast || !inMonth}
                        whileHover={!isPast && inMonth ? { y: -3, scale: 1.04 } : undefined}
                        whileTap={!isPast && inMonth ? { scale: 0.96 } : undefined}
                        onClick={() => setSelectedDate(date)}
                        className={`relative aspect-square rounded-full border text-sm font-semibold transition ${
                          selected
                            ? "border-[#00f2ff]/80 bg-cyan-300/14 text-white shadow-cyan-glow"
                            : current
                              ? "border-cyan-300/40 bg-cyan-300/6 text-cyan-100"
                              : inMonth && !isPast
                                ? "border-white/10 bg-slate-950/55 text-slate-300 hover:border-cyan-300/35"
                                : "border-white/5 bg-slate-950/20 text-slate-700"
                        }`}
                      >
                        {format(date, "d")}
                        {current ? (
                          <span className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#00f2ff]" />
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {selectedDate ? (
                <motion.div variants={panelVariants} initial="hidden" animate="visible" className="mt-7">
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <Clock className="h-4 w-4" />
                    {copy.timeLabel}
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {copy.times.map((time) => {
                      const selected = selectedTime === time;
                      return (
                        <motion.button
                          key={time}
                          variants={itemVariants}
                          type="button"
                          whileHover={{ y: -3, scale: 1.025 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedTime(time)}
                          className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                            selected
                              ? "border-[#00f2ff]/70 bg-cyan-300/12 text-cyan-50 shadow-cyan-glow"
                              : "border-white/10 bg-transparent text-slate-300 hover:border-cyan-300/40"
                          }`}
                        >
                          {time}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : null}

              <motion.div variants={itemVariants} className="mt-7">
                <GhostTextarea
                  label={copy.messageLabel}
                  placeholder={copy.messagePlaceholder}
                  value={message}
                  onChange={setMessage}
                />
              </motion.div>

              {showHint ? (
                <motion.p variants={itemVariants} className="mt-4 text-sm text-cyan-100">
                  {copy.incomplete}
                </motion.p>
              ) : null}

              <motion.button
                variants={itemVariants}
                type="button"
                whileHover={{ scale: 1.018, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="group relative mt-7 flex w-full overflow-hidden rounded-lg p-[1px] shadow-cyan-glow"
              >
                <span className="absolute inset-0 animate-border-beam bg-[linear-gradient(90deg,#00f2ff,#34d399,#a855f7,#00f2ff)] bg-[length:200%_100%]" />
                <span className="relative flex w-full items-center justify-center gap-2 rounded-[7px] bg-slate-950 px-5 py-4 font-semibold text-white transition group-hover:bg-slate-900">
                  <Send className="h-5 w-5" />
                  {copy.confirm}
                </span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {showModal ? (
        <ViberModal
          copy={copy}
          viberUrl={viberUrl}
          viberMessage={viberMessage}
          onClose={handleCloseModal}
        />
      ) : null}
    </section>
  );
}

function GhostInput({
  icon: Icon,
  label,
  value,
  onChange,
  type = "text",
}: {
  icon: typeof User;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="group relative flex items-center gap-3 border-b border-gray-600 py-3 transition focus-within:border-b-2 focus-within:border-cyan-400">
      <Icon className="h-4 w-4 text-slate-500 transition group-focus-within:text-cyan-300" />
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={label}
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
      />
    </label>
  );
}

function GhostTextarea({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-300">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-lg border border-white/10 bg-transparent p-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/60"
      />
    </label>
  );
}

function ViberModal({
  copy,
  viberUrl,
  viberMessage,
  onClose,
}: {
  copy: SiteCopy["booking"];
  viberUrl: string;
  viberMessage: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function copyDetails() {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(viberMessage);
    } else {
      fallbackCopyTextToClipboard(viberMessage);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2600);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] grid place-items-center p-5"
      role="presentation"
    >
      <div className="absolute inset-0 z-0 bg-black/78 backdrop-blur-xl" />
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950/92 p-6 shadow-cyan-glow"
        role="dialog"
        aria-modal="true"
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-30 rounded-full border border-white/10 bg-slate-950/90 p-2 text-slate-400 transition hover:border-cyan-300/40 hover:text-cyan-100"
        >
          <X className="pointer-events-none h-4 w-4" />
        </button>
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/14 blur-3xl" />
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold text-white">{copy.modalTitle}</h3>
          <p className="mt-3 leading-7 text-slate-400">{copy.modalText}</p>
          <div className="mx-auto my-7 grid aspect-square w-44 place-items-center rounded-2xl border border-cyan-300/30 bg-white p-4 shadow-cyan-glow">
            <QRCode
              value={viberUrl}
              size={144}
              bgColor="#ffffff"
              fgColor="#020617"
              level="M"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={viberUrl}
              className="rounded-lg border border-[#00f2ff]/60 bg-cyan-300/12 px-4 py-3 text-center text-sm font-semibold text-cyan-50 shadow-cyan-glow transition hover:bg-cyan-300/18"
            >
              {copy.sendViber}
            </a>
            <button
              type="button"
              onClick={copyDetails}
              className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/40 hover:text-cyan-100"
            >
              <Copy className="h-4 w-4" />
              {copied ? copy.copied : copy.copyData}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
