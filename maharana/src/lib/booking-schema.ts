import { z } from "zod";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export const bookingRequestSchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).optional().default(""),
    checkIn: z.string().regex(datePattern),
    checkOut: z.string().regex(datePattern),
    guests: z.number().int().min(1).max(4),
    roomType: z.enum(["any", "suite", "room"]),
  })
  .superRefine((booking, context) => {
    const today = new Date().toISOString().slice(0, 10);

    if (booking.checkIn < today) {
      context.addIssue({
        code: "custom",
        message: "Check-in cannot be in the past.",
        path: ["checkIn"],
      });
    }

    if (booking.checkOut <= booking.checkIn) {
      context.addIssue({
        code: "custom",
        message: "Check-out must be after check-in.",
        path: ["checkOut"],
      });
    }
  });

export type BookingRequest = z.infer<typeof bookingRequestSchema>;