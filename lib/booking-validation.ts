import {
  BOOKING_TIME_SLOTS,
  bookingServices,
  contactMethods,
  isDateInPastSofia,
  isTimeSlotPastSofia,
  isValidIsoDate,
  type PreferredContactMethod,
} from "@/lib/booking-config";

export type BookingRequestPayload = {
  name: string;
  phone: string;
  email: string;
  preferredContactMethod: PreferredContactMethod | "";
  selectedService: string;
  selectedDate: string;
  selectedTime: string;
  problemDescription: string;
  consentAccepted: boolean;
  honeypot?: string;
};

export type BookingValidationErrors = Partial<Record<keyof BookingRequestPayload | "service", string>>;

export const MAX_PROBLEM_DESCRIPTION_LENGTH = 1000;

export const bookingValidationMessages = {
  name: "Моля, въведете име.",
  phone: "Моля, въведете телефон.",
  invalidPhone: "Моля, въведете валиден телефон.",
  viberPhone: "За връзка чрез Viber е необходим телефонен номер.",
  email: "Моля, въведете валиден имейл адрес.",
  preferredContactMethod: "Моля, изберете предпочитан канал за връзка.",
  selectedService: "Моля, изберете услуга.",
  selectedDate: "Моля, изберете дата.",
  pastDate: "Не можете да изберете минала дата.",
  selectedTime: "Моля, изберете час.",
  pastTime: "Моля, изберете бъдещ свободен час.",
  problemDescription: "Моля, опишете проблема.",
  problemDescriptionTooLong:
    "Описанието е твърде дълго. Моля, съкратете го до 1000 символа.",
  consentAccepted:
    "Моля, приемете Общите условия и Политиката за поверителност, за да изпратите заявката.",
  slotTaken: "Този час вече не е свободен. Моля, изберете друг час.",
  rateLimited:
    "Изпратихте твърде много заявки. Моля, опитайте отново по-късно или се свържете с нас по телефон.",
  errorSummary: "Моля, проверете полетата във формата.",
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bulgarianPhonePattern = /^(?:\+?359|0)\s*8(?:[\s-]*\d){8}$/;

export function normalizePhone(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function sanitizeBookingPayload(payload: BookingRequestPayload): BookingRequestPayload {
  return {
    ...payload,
    name: payload.name.trim(),
    phone: normalizePhone(payload.phone),
    email: payload.email.trim(),
    selectedService: payload.selectedService.trim(),
    selectedDate: payload.selectedDate.trim(),
    selectedTime: payload.selectedTime.trim(),
    problemDescription: payload.problemDescription.trim(),
    honeypot: payload.honeypot?.trim() || "",
  };
}

export function isValidPhone(value: string) {
  return bulgarianPhonePattern.test(value.replace(/[\s-]+/g, ""));
}

export function validateBookingPayload(payload: BookingRequestPayload, now = new Date()) {
  const errors: BookingValidationErrors = {};
  const sanitizedPayload = sanitizeBookingPayload(payload);
  const serviceExists = bookingServices.some(
    (service) => service.id === sanitizedPayload.selectedService,
  );
  const contactMethodExists = contactMethods.some(
    (method) => method.value === payload.preferredContactMethod,
  );

  if (!sanitizedPayload.name) {
    errors.name = bookingValidationMessages.name;
  }

  if (!sanitizedPayload.phone) {
    errors.phone = bookingValidationMessages.phone;
  } else if (!isValidPhone(sanitizedPayload.phone)) {
    errors.phone = bookingValidationMessages.invalidPhone;
  }

  if (payload.preferredContactMethod === "viber" && !sanitizedPayload.phone) {
    errors.phone = bookingValidationMessages.viberPhone;
  }

  if (!payload.preferredContactMethod || !contactMethodExists) {
    errors.preferredContactMethod = bookingValidationMessages.preferredContactMethod;
  }

  if (
    (sanitizedPayload.email || payload.preferredContactMethod === "email") &&
    !emailPattern.test(sanitizedPayload.email)
  ) {
    errors.email = bookingValidationMessages.email;
  }

  if (!sanitizedPayload.selectedService || !serviceExists) {
    errors.selectedService = bookingValidationMessages.selectedService;
  }

  if (!sanitizedPayload.selectedDate || !isValidIsoDate(sanitizedPayload.selectedDate)) {
    errors.selectedDate = bookingValidationMessages.selectedDate;
  } else if (isDateInPastSofia(sanitizedPayload.selectedDate, now)) {
    errors.selectedDate = bookingValidationMessages.pastDate;
  }

  if (
    !sanitizedPayload.selectedTime ||
    !BOOKING_TIME_SLOTS.includes(sanitizedPayload.selectedTime as (typeof BOOKING_TIME_SLOTS)[number])
  ) {
    errors.selectedTime = bookingValidationMessages.selectedTime;
  } else if (
    sanitizedPayload.selectedDate &&
    isTimeSlotPastSofia(sanitizedPayload.selectedDate, sanitizedPayload.selectedTime, now)
  ) {
    errors.selectedTime = bookingValidationMessages.pastTime;
  }

  if (!sanitizedPayload.problemDescription) {
    errors.problemDescription = bookingValidationMessages.problemDescription;
  } else if (sanitizedPayload.problemDescription.length > MAX_PROBLEM_DESCRIPTION_LENGTH) {
    errors.problemDescription = bookingValidationMessages.problemDescriptionTooLong;
  }

  if (!payload.consentAccepted) {
    errors.consentAccepted = bookingValidationMessages.consentAccepted;
  }

  return errors;
}

export function hasBookingErrors(errors: BookingValidationErrors) {
  return Object.keys(errors).length > 0;
}
