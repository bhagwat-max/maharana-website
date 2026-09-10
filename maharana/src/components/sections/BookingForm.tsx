"use client";

import { useState, FormEvent } from "react";

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
}

const initialDetails: BookingDetails = {
  name: "",
  email: "",
  phone: "",
  checkIn: "",
  checkOut: "",
  guests: 2,
  roomType: "any",
};

export default function BookingForm() {
  const [details, setDetails] = useState<BookingDetails>(initialDetails);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toISOString().slice(0, 10);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });

      const result = (await response.json()) as { message?: string; bookingId?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your booking request.");
      }

      setBookingId(result.bookingId || null);
      setStatus("success");
      setDetails(initialDetails);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to submit your booking request.",
      );
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-brass/30 bg-brass/5 p-8 text-center md:p-10" role="status">
        <p className="label text-brass-soft">Request received</p>
        <h2 className="mt-4 font-display text-3xl text-parchment">Thank you.</h2>
        <p className="mx-auto mt-4 max-w-xl text-parchment/70">
          Your stay request has been saved. Our reservations team will contact you to confirm room
          availability and complete the booking.
        </p>
        {bookingId && (
          <p className="mt-5 text-sm text-muted-ink">Booking reference: #{bookingId}</p>
        )}
        <button
          type="button"
          onClick={() => {
            setBookingId(null);
            setStatus("idle");
          }}
          className="label mt-8 border border-parchment px-7 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
        >
          Make another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 border border-parchment/10 p-8 sm:grid-cols-2 md:p-10"
      aria-busy={status === "submitting"}
    >
      <div>
        <label htmlFor="name" className="label mb-2 block text-muted-ink">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          minLength={2}
          maxLength={100}
          value={details.name}
          onChange={(e) => setDetails((value) => ({ ...value, name: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
        />
      </div>

      <div>
        <label htmlFor="email" className="label mb-2 block text-muted-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={details.email}
          onChange={(e) => setDetails((value) => ({ ...value, email: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="phone" className="label mb-2 block text-muted-ink">
          Phone (optional)
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={30}
          value={details.phone}
          onChange={(e) => setDetails((value) => ({ ...value, phone: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
        />
      </div>

        <div>
          <label htmlFor="checkIn" className="label mb-2 block text-muted-ink">
            Check-in
          </label>
          <input
            id="checkIn"
            name="checkIn"
            type="date"
            required
            min={today}
            value={details.checkIn}
            onChange={(e) => setDetails((value) => ({ ...value, checkIn: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="label mb-2 block text-muted-ink">
            Check-out
          </label>
          <input
            id="checkOut"
            name="checkOut"
            type="date"
            required
            min={details.checkIn || today}
            value={details.checkOut}
            onChange={(e) => setDetails((value) => ({ ...value, checkOut: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="guests" className="label mb-2 block text-muted-ink">
            Guests
          </label>
          <select
            id="guests"
            name="guests"
            value={details.guests}
            onChange={(e) =>
              setDetails((value) => ({ ...value, guests: Number(e.target.value) }))
            }
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n} className="bg-ink">
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="roomType" className="label mb-2 block text-muted-ink">
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            value={details.roomType}
            onChange={(e) => setDetails((value) => ({ ...value, roomType: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          >
            <option value="any" className="bg-ink">Any</option>
            <option value="suite" className="bg-ink">Suites</option>
            <option value="room" className="bg-ink">Rooms</option>
          </select>
        </div>

      {status === "error" && (
        <p className="sm:col-span-2 text-sm text-brass-soft" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="label border border-parchment px-7 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink disabled:cursor-wait disabled:opacity-60 sm:col-span-2"
      >
        {status === "submitting" ? "Sending Request…" : "Request to Book"}
      </button>
    </form>
  );
}
