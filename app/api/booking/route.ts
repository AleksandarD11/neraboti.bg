import { BOOKING_TIMEZONE } from "@/lib/booking-config";
import { checkSlotAvailability, saveBookingRequest } from "@/lib/booking-storage";
import {
  bookingValidationMessages,
  hasBookingErrors,
  sanitizeBookingPayload,
  validateBookingPayload,
  type BookingRequestPayload,
} from "@/lib/booking-validation";
import { NextResponse, type NextRequest } from "next/server";

const rateLimitWindowMs = 60_000;
const rateLimitMaxRequests = 5;
// In-memory fallback for development/small preview deployments.
// TODO: Replace with production-grade rate limiting backed by durable storage
// such as Vercel KV/Upstash/Redis, Cloudflare, or an equivalent edge service.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getRateLimitKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "local"
  );
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitMap.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitMap.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return false;
  }

  current.count += 1;
  return current.count > rateLimitMaxRequests;
}

export async function POST(request: NextRequest) {
  try {
    const payload = sanitizeBookingPayload((await request.json()) as BookingRequestPayload);

    if (payload.honeypot?.trim()) {
      return NextResponse.json({
        success: true,
        requestId: null,
        message: "Заявката е изпратена успешно.",
      });
    }

    if (isRateLimited(getRateLimitKey(request))) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "RATE_LIMITED",
          message: bookingValidationMessages.rateLimited,
        },
        { status: 429 },
      );
    }

    const errors = validateBookingPayload(payload);
    if (hasBookingErrors(errors)) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "VALIDATION_ERROR",
          message: bookingValidationMessages.errorSummary,
          fieldErrors: errors,
          errors,
        },
        { status: 400 },
      );
    }

    const slotAvailable = await checkSlotAvailability(payload.selectedDate, payload.selectedTime);
    if (!slotAvailable) {
      return NextResponse.json(
        {
          success: false,
          errorCode: "SLOT_UNAVAILABLE",
          message: bookingValidationMessages.slotTaken,
          fieldErrors: { selectedTime: bookingValidationMessages.slotTaken },
          errors: { selectedTime: bookingValidationMessages.slotTaken },
        },
        { status: 409 },
      );
    }

    const booking = await saveBookingRequest(payload, {
      userAgent: request.headers.get("user-agent"),
    });

    return NextResponse.json({
      success: true,
      requestId: booking.requestId,
      timezone: BOOKING_TIMEZONE,
      message: "Заявката е изпратена успешно.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        errorCode: "SERVER_ERROR",
        message: "Не успяхме да изпратим заявката.",
      },
      { status: 500 },
    );
  }
}
