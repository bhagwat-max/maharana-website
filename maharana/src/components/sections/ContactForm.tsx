"use client";

import { useState, FormEvent } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialState: FormState = { name: "", email: "", phone: "", message: "" };

/**
 * Frontend-only validation for now. Structured so a real submit handler can
 * later POST to /api/enquiries (a Next.js Route Handler) without changing
 * the form markup — swap the body of handleSubmit for a fetch() call.
 */
export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const validate = (v: FormState): Partial<FormState> => {
    const next: Partial<FormState> = {};
    if (!v.name.trim()) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) next.email = "Please enter a valid email.";
    if (!v.message.trim()) next.message = "Please enter a message.";
    return next;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: connect to a real enquiries API/database. For now this is a
    // structured, validated, frontend-only submission.
    setStatus("submitted");
    setValues(initialState);
  };

  if (status === "submitted") {
    return (
      <div className="border border-parchment/10 p-10">
        <p className="font-display text-2xl text-parchment">Thank you.</p>
        <p className="mt-3 text-parchment/70">
          Your message has been validated and is ready to send. Our online enquiry system is not
          yet connected — for a guaranteed response, please email{" "}
          <a href="mailto:stay@themaharana.com" className="link-underline text-parchment">
            stay@themaharana.com
          </a>{" "}
          or call {" "}
          <a href="tel:+917940000000" className="link-underline text-parchment">
            +91 79 4000 0000
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="name" className="label mb-2 block text-muted-ink">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-xs text-brass-soft">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="label mb-2 block text-muted-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-xs text-brass-soft">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="label mb-2 block text-muted-ink">
          Phone (optional)
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
          className="w-full border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
        />
      </div>

      <div>
        <label htmlFor="message" className="label mb-2 block text-muted-ink">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          className="w-full resize-none border-b border-parchment/20 bg-transparent py-3 text-parchment outline-none transition-colors focus:border-brass"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-brass-soft">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="label mt-4 border border-parchment px-8 py-4 text-parchment transition-colors duration-500 hover:bg-parchment hover:text-ink"
      >
        Send Enquiry
      </button>
    </form>
  );
}
