import { timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { bookingRequestSchema } from "@/lib/booking-schema";
import { getDatabase } from "@/lib/db";

export const runtime = "nodejs";

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const updateBookingSchema = z
  .object({
    originalId: z.coerce.number().int().positive(),
    id: z.coerce.number().int().positive(),
    fullName: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).optional().default(""),
    checkIn: z.string().regex(datePattern),
    checkOut: z.string().regex(datePattern),
    guests: z.coerce.number().int().min(1).max(4),
    roomType: z.enum(["any", "suite", "room"]),
    status: z.enum([
      "new",
      "contacted",
      "confirmed",
      "cancelled",
      "archived",
    ]),
    createdAt: z.string().refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Invalid created date.",
    ),
  })
  .superRefine((booking, context) => {
    if (booking.checkOut <= booking.checkIn) {
      context.addIssue({
        code: "custom",
        message: "Check-out must be after check-in.",
        path: ["checkOut"],
      });
    }
  });

const deleteBookingSchema = z.object({
  id: z.coerce.number().int().positive(),
});

function keysMatch(provided: string, expected: string) {
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);

  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

function checkAdminAccess(request: Request) {
  const expectedKey = process.env.ADMIN_BOOKINGS_KEY;
  const authorization = request.headers.get("authorization") || "";
  const providedKey = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!expectedKey) {
    return Response.json(
      { message: "The booking dashboard is not configured." },
      { status: 503 },
    );
  }

  if (!providedKey || !keysMatch(providedKey, expectedKey)) {
    return Response.json(
      { message: "Incorrect admin access key." },
      { status: 401 },
    );
  }

  return null;
}

function formatBooking(booking: Record<string, unknown>) {
  return {
    id: booking.id,
    fullName: booking.full_name,
    email: booking.email,
    phone: booking.phone,
    checkIn: booking.check_in,
    checkOut: booking.check_out,
    guests: booking.guests,
    roomType: booking.room_type,
    status: booking.status,
    createdAt: booking.created_at,
  };
}

function getPostgresErrorCode(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error
  ) {
    return String(error.code);
  }

  return "";
}

export async function GET(request: Request) {
  const accessError = checkAdminAccess(request);

  if (accessError) {
    return accessError;
  }

  try {
    const result = await getDatabase().query(`
      SELECT
        id::text,
        full_name,
        email,
        phone,
        check_in::text,
        check_out::text,
        guests,
        room_type,
        status,
        created_at
      FROM booking_requests
      ORDER BY created_at DESC
      LIMIT 500
    `);

    return Response.json(
      {
        bookings: result.rows.map(formatBooking),
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch (error) {
    console.error("Unable to load bookings", error);

    return Response.json(
      { message: "Booking requests are temporarily unavailable." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = bookingRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { message: "Please check the booking details." },
        { status: 400 },
      );
    }

    const {
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      roomType,
    } = parsed.data;

    const result = await getDatabase().query(
      `
        INSERT INTO booking_requests
          (
            full_name,
            email,
            phone,
            check_in,
            check_out,
            guests,
            room_type
          )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
      `,
      [
        name,
        email,
        phone || null,
        checkIn,
        checkOut,
        guests,
        roomType,
      ],
    );

    return Response.json(
      {
        message: "Booking request received.",
        bookingId: result.rows[0].id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Unable to save booking", error);

    return Response.json(
      { message: "Unable to save your booking request." },
      { status: 503 },
    );
  }
}

export async function PATCH(request: Request) {
  const accessError = checkAdminAccess(request);

  if (accessError) {
    return accessError;
  }

  try {
    const body: unknown = await request.json();
    const parsed = updateBookingSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          message: parsed.error.issues[0]?.message ||
            "Please check the booking details.",
        },
        { status: 400 },
      );
    }

    const booking = parsed.data;
    const database = getDatabase();
    const client = await database.connect();

    try {
      await client.query("BEGIN");

      const result = await client.query(
        `
          UPDATE booking_requests
          SET
            id = $1,
            full_name = $2,
            email = $3,
            phone = $4,
            check_in = $5,
            check_out = $6,
            guests = $7,
            room_type = $8,
            status = $9,
            created_at = $10
          WHERE id = $11
          RETURNING
            id::text,
            full_name,
            email,
            phone,
            check_in::text,
            check_out::text,
            guests,
            room_type,
            status,
            created_at
        `,
        [
          booking.id,
          booking.fullName,
          booking.email,
          booking.phone || null,
          booking.checkIn,
          booking.checkOut,
          booking.guests,
          booking.roomType,
          booking.status,
          booking.createdAt,
          booking.originalId,
        ],
      );

      if (result.rowCount === 0) {
        await client.query("ROLLBACK");

        return Response.json(
          { message: "Booking was not found." },
          { status: 404 },
        );
      }

      await client.query(`
        SELECT setval(
          pg_get_serial_sequence('booking_requests', 'id'),
          COALESCE((SELECT MAX(id) FROM booking_requests), 1),
          (SELECT COUNT(*) > 0 FROM booking_requests)
        )
      `);

      await client.query("COMMIT");

      return Response.json({
        message: "Booking updated.",
        booking: formatBooking(result.rows[0]),
      });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Unable to update booking", error);

    if (getPostgresErrorCode(error) === "23505") {
      return Response.json(
        { message: "That booking ID already exists." },
        { status: 409 },
      );
    }

    return Response.json(
      { message: "Unable to update the booking." },
      { status: 503 },
    );
  }
}

export async function DELETE(request: Request) {
  const accessError = checkAdminAccess(request);

  if (accessError) {
    return accessError;
  }

  try {
    const body: unknown = await request.json();
    const parsed = deleteBookingSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { message: "Invalid booking ID." },
        { status: 400 },
      );
    }

    const result = await getDatabase().query(
      `
        DELETE FROM booking_requests
        WHERE id = $1
        RETURNING id
      `,
      [parsed.data.id],
    );

    if (result.rowCount === 0) {
      return Response.json(
        { message: "Booking was not found." },
        { status: 404 },
      );
    }

    return Response.json({
      message: "Booking permanently deleted.",
    });
  } catch (error) {
    console.error("Unable to delete booking", error);

    return Response.json(
      { message: "Unable to delete the booking." },
      { status: 503 },
    );
  }
}