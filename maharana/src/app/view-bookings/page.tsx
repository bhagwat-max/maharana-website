"use client";

import { FormEvent, useMemo, useState } from "react";

type BookingStatus =
  | "new"
  | "contacted"
  | "confirmed"
  | "cancelled"
  | "archived";

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: "any" | "suite" | "room";
  status: BookingStatus;
  createdAt: string;
}

type LoadState = "locked" | "loading" | "ready" | "error";
type BookingFilter = "active" | "archived";

const inputClass =
  "min-w-[120px] border border-parchment/20 bg-ink px-3 py-2 text-sm text-parchment outline-none focus:border-brass";

const buttonClass =
  "border border-parchment/30 px-3 py-2 text-xs uppercase tracking-[0.15em] text-parchment transition-colors hover:border-brass hover:text-brass-soft disabled:cursor-not-allowed disabled:opacity-40";

function toDateTimeInput(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffset = date.getTimezoneOffset() * 60_000;

  return new Date(date.getTime() - timezoneOffset)
    .toISOString()
    .slice(0, 16);
}

function formatCreatedDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export default function ViewBookingsPage() {
  const [accessKey, setAccessKey] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadState, setLoadState] = useState<LoadState>("locked");
  const [filter, setFilter] = useState<BookingFilter>("active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Booking | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );

  const visibleBookings = useMemo(() => {
    if (filter === "archived") {
      return bookings.filter((booking) => booking.status === "archived");
    }

    return bookings.filter((booking) => booking.status !== "archived");
  }, [bookings, filter]);

  const activeCount = bookings.filter(
    (booking) => booking.status !== "archived",
  ).length;

  const archivedCount = bookings.filter(
    (booking) => booking.status === "archived",
  ).length;

  async function loadBookings(key: string) {
    setLoadState("loading");
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
        cache: "no-store",
      });

      const result = (await response.json()) as {
        bookings?: Booking[];
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Unable to load bookings.");
      }

      setBookings(result.bookings || []);
      setLoadState("ready");
    } catch (error) {
      setLoadState("error");
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to load bookings.",
      );
    }
  }

  function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void loadBookings(accessKey);
  }

  function startEditing(booking: Booking) {
    setEditingId(booking.id);
    setDraft({
      ...booking,
      phone: booking.phone || "",
      createdAt: toDateTimeInput(booking.createdAt),
    });
    setMessage("");
  }

  function cancelEditing() {
    setEditingId(null);
    setDraft(null);
    setMessage("");
  }

  async function saveBooking() {
    if (!editingId || !draft) {
      return;
    }

    const createdDate = new Date(draft.createdAt);

    if (Number.isNaN(createdDate.getTime())) {
      setMessageType("error");
      setMessage("Please enter a valid created date.");
      return;
    }

    setBusyId(editingId);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessKey}`,
        },
        body: JSON.stringify({
          originalId: editingId,
          ...draft,
          createdAt: createdDate.toISOString(),
        }),
      });

      const result = (await response.json()) as {
        booking?: Booking;
        message?: string;
      };

      if (!response.ok || !result.booking) {
        throw new Error(result.message || "Unable to save booking.");
      }

      setBookings((currentBookings) =>
        currentBookings.map((booking) =>
          booking.id === editingId ? result.booking! : booking,
        ),
      );

      setEditingId(null);
      setDraft(null);
      setMessageType("success");
      setMessage("Booking saved successfully.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to save booking.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function changeArchiveStatus(booking: Booking) {
    const newStatus: BookingStatus =
      booking.status === "archived" ? "new" : "archived";

    setBusyId(booking.id);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessKey}`,
        },
        body: JSON.stringify({
          originalId: booking.id,
          ...booking,
          status: newStatus,
        }),
      });

      const result = (await response.json()) as {
        booking?: Booking;
        message?: string;
      };

      if (!response.ok || !result.booking) {
        throw new Error(
          result.message || "Unable to change archive status.",
        );
      }

      setBookings((currentBookings) =>
        currentBookings.map((currentBooking) =>
          currentBooking.id === booking.id
            ? result.booking!
            : currentBooking,
        ),
      );

      setMessageType("success");
      setMessage(
        newStatus === "archived"
          ? "Booking moved to Archived."
          : "Booking restored to Active.",
      );
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to change archive status.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function deleteBooking(booking: Booking) {
    const confirmed = window.confirm(
      `Permanently delete booking #${booking.id} for ${booking.fullName}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    setBusyId(booking.id);
    setMessage("");

    try {
      const response = await fetch("/api/bookings", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessKey}`,
        },
        body: JSON.stringify({
          id: booking.id,
        }),
      });

      const result = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete booking.");
      }

      setBookings((currentBookings) =>
        currentBookings.filter(
          (currentBooking) => currentBooking.id !== booking.id,
        ),
      );

      if (editingId === booking.id) {
        cancelEditing();
      }

      setMessageType("success");
      setMessage("Booking permanently deleted.");
    } catch (error) {
      setMessageType("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to delete booking.",
      );
    } finally {
      setBusyId(null);
    }
  }

  if (loadState === "locked" || loadState === "error") {
    return (
      <main className="px-6 pb-24 pt-36 md:px-10 md:pt-44">
        <div className="mx-auto max-w-lg">
          <p className="label mb-5 text-brass-soft">
            Private dashboard
          </p>

          <h1 className="mb-10 font-display text-4xl text-parchment sm:text-5xl">
            View Bookings
          </h1>

          <form
            onSubmit={handleUnlock}
            className="border border-parchment/10 p-8"
          >
            <label
              htmlFor="admin-key"
              className="label mb-3 block text-muted-ink"
            >
              Admin access key
            </label>

            <input
              id="admin-key"
              type="password"
              required
              value={accessKey}
              onChange={(event) => setAccessKey(event.target.value)}
              className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none focus:border-brass"
            />

            {message && (
              <p className="mt-4 text-sm text-red-300" role="alert">
                {message}
              </p>
            )}

            <button
              type="submit"
              className="label mt-8 w-full border border-parchment px-6 py-4 text-parchment hover:bg-parchment hover:text-ink"
            >
              View bookings
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (loadState === "loading") {
    return (
      <main className="px-6 pb-24 pt-44 text-center">
        <p className="label animate-pulse text-brass-soft">
          Loading bookings...
        </p>
      </main>
    );
  }

  return (
    <main className="px-4 pb-24 pt-36 md:px-8 md:pt-44">
      <div className="mx-auto max-w-[1700px]">
        <div className="mb-10 flex flex-col gap-6 border-b border-parchment/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-4 text-brass-soft">
              Private dashboard
            </p>

            <h1 className="font-display text-4xl text-parchment sm:text-5xl">
              View Bookings
            </h1>
          </div>

          <button
            type="button"
            onClick={() => void loadBookings(accessKey)}
            className={buttonClass}
          >
            Refresh
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setFilter("active");
              cancelEditing();
            }}
            className={`${buttonClass} ${
              filter === "active"
                ? "border-brass bg-brass/10 text-brass-soft"
                : ""
            }`}
          >
            Active ({activeCount})
          </button>

          <button
            type="button"
            onClick={() => {
              setFilter("archived");
              cancelEditing();
            }}
            className={`${buttonClass} ${
              filter === "archived"
                ? "border-brass bg-brass/10 text-brass-soft"
                : ""
            }`}
          >
            Archived ({archivedCount})
          </button>
        </div>

        {message && (
          <div
            className={`mb-6 border px-5 py-4 text-sm ${
              messageType === "error"
                ? "border-red-400/30 text-red-300"
                : "border-emerald-400/30 text-emerald-300"
            }`}
            role="status"
          >
            {message}
          </div>
        )}

        {visibleBookings.length === 0 ? (
          <div className="border border-parchment/10 px-8 py-16 text-center">
            <p className="font-display text-2xl text-parchment">
              No {filter} bookings.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-parchment/10">
            <table className="w-full min-w-[1750px] border-collapse text-left text-sm">
              <thead className="border-b border-parchment/10 bg-parchment/[0.03]">
                <tr className="label text-muted-ink">
                  <th className="px-4 py-5 font-normal">ID</th>
                  <th className="px-4 py-5 font-normal">Full name</th>
                  <th className="px-4 py-5 font-normal">Email</th>
                  <th className="px-4 py-5 font-normal">Phone</th>
                  <th className="px-4 py-5 font-normal">Check-in</th>
                  <th className="px-4 py-5 font-normal">Check-out</th>
                  <th className="px-4 py-5 font-normal">Guests</th>
                  <th className="px-4 py-5 font-normal">Room type</th>
                  <th className="px-4 py-5 font-normal">Status</th>
                  <th className="px-4 py-5 font-normal">Created</th>
                  <th className="px-4 py-5 font-normal">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-parchment/10">
                {visibleBookings.map((booking) => {
                  const isEditing =
                    editingId === booking.id && draft !== null;
                  const isBusy = busyId === booking.id;

                  return (
                    <tr
                      key={booking.id}
                      className="align-middle hover:bg-parchment/[0.02]"
                    >
                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            value={draft.id}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                id: event.target.value,
                              })
                            }
                            className={`${inputClass} w-24`}
                          />
                        ) : (
                          `#${booking.id}`
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="text"
                            value={draft.fullName}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                fullName: event.target.value,
                              })
                            }
                            className={`${inputClass} w-40`}
                          />
                        ) : (
                          booking.fullName
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="email"
                            value={draft.email}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                email: event.target.value,
                              })
                            }
                            className={`${inputClass} w-56`}
                          />
                        ) : (
                          booking.email
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="tel"
                            value={draft.phone || ""}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                phone: event.target.value,
                              })
                            }
                            className={`${inputClass} w-40`}
                          />
                        ) : (
                          booking.phone || "—"
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="date"
                            value={draft.checkIn}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                checkIn: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        ) : (
                          booking.checkIn
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="date"
                            value={draft.checkOut}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                checkOut: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        ) : (
                          booking.checkOut
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="number"
                            min="1"
                            max="4"
                            value={draft.guests}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                guests: Number(event.target.value),
                              })
                            }
                            className={`${inputClass} w-24`}
                          />
                        ) : (
                          booking.guests
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <select
                            value={draft.roomType}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                roomType: event.target.value as Booking["roomType"],
                              })
                            }
                            className={inputClass}
                          >
                            <option value="any">Any</option>
                            <option value="suite">Suite</option>
                            <option value="room">Room</option>
                          </select>
                        ) : (
                          booking.roomType
                        )}
                      </td>

                      <td className="px-4 py-5 text-brass-soft">
                        {isEditing ? (
                          <select
                            value={draft.status}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                status: event.target.value as BookingStatus,
                              })
                            }
                            className={inputClass}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="archived">Archived</option>
                          </select>
                        ) : (
                          booking.status
                        )}
                      </td>

                      <td className="px-4 py-5 text-parchment">
                        {isEditing ? (
                          <input
                            type="datetime-local"
                            value={draft.createdAt}
                            onChange={(event) =>
                              setDraft({
                                ...draft,
                                createdAt: event.target.value,
                              })
                            }
                            className={`${inputClass} w-52`}
                          />
                        ) : (
                          formatCreatedDate(booking.createdAt)
                        )}
                      </td>

                      <td className="px-4 py-5">
                        <div className="flex min-w-[260px] flex-wrap gap-2">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => void saveBooking()}
                                disabled={isBusy}
                                className={`${buttonClass} border-emerald-400/50 text-emerald-300`}
                              >
                                {isBusy ? "Saving..." : "Save"}
                              </button>

                              <button
                                type="button"
                                onClick={cancelEditing}
                                disabled={isBusy}
                                className={buttonClass}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => startEditing(booking)}
                                disabled={busyId !== null}
                                className={buttonClass}
                              >
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  void changeArchiveStatus(booking)
                                }
                                disabled={busyId !== null}
                                className={buttonClass}
                              >
                                {isBusy
                                  ? "Working..."
                                  : booking.status === "archived"
                                    ? "Restore"
                                    : "Archive"}
                              </button>

                              <button
                                type="button"
                                onClick={() => void deleteBooking(booking)}
                                disabled={busyId !== null}
                                className={`${buttonClass} border-red-400/40 text-red-300`}
                              >
                                {isBusy ? "Deleting..." : "Delete"}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}