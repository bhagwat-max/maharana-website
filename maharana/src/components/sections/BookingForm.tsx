"use client";

import { useState, FormEvent } from "react";
import { rooms } from "@/data/rooms";

interface SearchParams {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
}

const initialParams: SearchParams = {
  checkIn: "",
  checkOut: "",
  guests: 2,
  roomType: "any",
};

/**
 * UI-only booking search. Structured so a real availability API
 * (e.g. POST /api/availability) can replace `runSearch` without touching
 * the form markup. Deliberately does not fabricate real availability —
 * results are clearly labelled as illustrative until a booking engine
 * is connected.
 */
export default function BookingForm() {
  const [params, setParams] = useState<SearchParams>(initialParams);
  const [searched, setSearched] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  const matchingRooms =
    params.roomType === "any" ? rooms : rooms.filter((r) => r.category === params.roomType);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 border border-parchment/10 p-8 sm:grid-cols-2 md:grid-cols-4 md:items-end md:p-10"
      >
        <div>
          <label htmlFor="checkIn" className="label mb-2 block text-muted-ink">
            Check-in
          </label>
          <input
            id="checkIn"
            type="date"
            required
            value={params.checkIn}
            onChange={(e) => setParams((p) => ({ ...p, checkIn: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="checkOut" className="label mb-2 block text-muted-ink">
            Check-out
          </label>
          <input
            id="checkOut"
            type="date"
            required
            value={params.checkOut}
            onChange={(e) => setParams((p) => ({ ...p, checkOut: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass [color-scheme:dark]"
          />
        </div>

        <div>
          <label htmlFor="guests" className="label mb-2 block text-muted-ink">
            Guests
          </label>
          <select
            id="guests"
            value={params.guests}
            onChange={(e) => setParams((p) => ({ ...p, guests: Number(e.target.value) }))}
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
            value={params.roomType}
            onChange={(e) => setParams((p) => ({ ...p, roomType: e.target.value }))}
            className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          >
            <option value="any" className="bg-ink">Any</option>
            <option value="suite" className="bg-ink">Suites</option>
            <option value="room" className="bg-ink">Rooms</option>
          </select>
        </div>

        <button
          type="submit"
          className="label border border-parchment px-7 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink sm:col-span-2 md:col-span-4"
        >
          Search Available Rooms
        </button>
      </form>

      {searched && (
        <div className="mt-12">
          <p className="label mb-8 text-muted-ink">
            Showing {matchingRooms.length} room{matchingRooms.length === 1 ? "" : "s"} matching your
            search
          </p>
          <div className="mb-8 border border-brass/30 bg-brass/5 px-6 py-4 text-sm text-parchment/70">
            Live availability is not yet connected — this is a preview of matching rooms and rates.
            To confirm a real reservation, please contact our reservations team.
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {matchingRooms.map((room) => (
              <div key={room.id} className="border border-parchment/10 p-6">
                <p className="font-display text-xl text-parchment">{room.name}</p>
                <p className="mt-2 text-sm text-parchment/60">
                  {room.size} · {room.guests} Guests · {room.bed}
                </p>
                <p className="mt-4 font-display text-2xl text-parchment">
                  ₹{room.price.toLocaleString("en-IN")}
                  <span className="ml-1 text-xs text-muted">/ night</span>
                </p>
                <a
                  href="/contact"
                  className="label mt-5 inline-block border border-parchment/40 px-5 py-3 text-parchment transition-colors duration-500 hover:border-parchment"
                >
                  Enquire to Book
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
