import { BOOKING_TIMEZONE } from "@/lib/booking-config";
import {
  sanitizeBookingPayload,
  type BookingRequestPayload,
} from "@/lib/booking-validation";

export type StoredBookingRequest = Omit<BookingRequestPayload, "honeypot"> & {
  requestId: string;
  timezone: typeof BOOKING_TIMEZONE;
  createdAt: string;
  userAgent: string | null;
};

const temporaryBookingRequests: StoredBookingRequest[] = [];

export async function checkSlotAvailability(date: string, time: string) {
  // Temporary in-memory safeguard for local/dev deployments.
  // TODO: Replace with a durable database uniqueness check or transaction before
  // presenting selected slots as truly reserved/confirmed in production.
  return !temporaryBookingRequests.some(
    (request) => request.selectedDate === date && request.selectedTime === time,
  );
}

export async function saveBookingRequest(
  payload: BookingRequestPayload,
  metadata: { userAgent: string | null },
) {
  const sanitizedPayload = sanitizeBookingPayload(payload);
  // TODO: Replace this temporary in-memory store with a durable database.
  // The abstraction is intentionally small so it can be swapped for Prisma,
  // Supabase, a CRM webhook, email queue, or another persistence layer.
  const request: StoredBookingRequest = {
    requestId: `REQ-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 7)
      .toUpperCase()}`,
    name: sanitizedPayload.name,
    phone: sanitizedPayload.phone,
    email: sanitizedPayload.email,
    preferredContactMethod: sanitizedPayload.preferredContactMethod,
    selectedService: sanitizedPayload.selectedService,
    selectedDate: sanitizedPayload.selectedDate,
    selectedTime: sanitizedPayload.selectedTime,
    problemDescription: sanitizedPayload.problemDescription,
    consentAccepted: sanitizedPayload.consentAccepted,
    timezone: BOOKING_TIMEZONE,
    createdAt: new Date().toISOString(),
    userAgent: metadata.userAgent,
  };

  temporaryBookingRequests.push(request);
  return request;
}
