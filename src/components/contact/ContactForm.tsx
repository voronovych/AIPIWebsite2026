"use client";

import { useActionState, useState } from "react";

import { submitContactForm } from "@/app/contact/actions";
import TurnstileWidget from "@/components/TurnstileWidget";
import { IDLE_FORM_STATE } from "@/utils/formValidation";
import { TURNSTILE_ACTIONS, TURNSTILE_SITE_KEY } from "@/utils/turnstileActions";

const fieldClassName =
  "w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors";
const labelClassName = "block text-sm font-medium text-[#374151] mb-2";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    IDLE_FORM_STATE,
  );
  const [hasToken, setHasToken] = useState(false);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  // Turnstile tokens are single-use: request a fresh one after each submit.
  function handleSubmit(formData: FormData) {
    formAction(formData);
    setTurnstileResetKey((key) => key + 1);
  }

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border border-[#d1d5db] bg-[#f9fafb] px-6 py-8 text-center"
      >
        <p className="text-base font-semibold text-[#0c1425]">
          Message sent
        </p>
        <p className="mt-2 text-sm text-[#4b5563]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={labelClassName}>
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={fieldClassName}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="phone" className={labelClassName}>
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className={fieldClassName}
          placeholder="Your phone number"
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClassName}>
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={fieldClassName}
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClassName}>
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className={`${fieldClassName} resize-none`}
          placeholder="How can we help?"
        />
      </div>

      {TURNSTILE_SITE_KEY ? (
        <TurnstileWidget
          siteKey={TURNSTILE_SITE_KEY}
          action={TURNSTILE_ACTIONS.contact}
          resetKey={turnstileResetKey}
          onToken={setHasToken}
        />
      ) : (
        <p role="alert" className="text-sm text-[#b91c1c]">
          This form is temporarily unavailable. Please email us directly at
          tech-admin@aipisolutions.com.
        </p>
      )}

      {state.status === "error" && (
        <p role="alert" className="text-sm text-[#b91c1c]">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !hasToken}
        className="w-full bg-[#1d4ed8] text-white py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
