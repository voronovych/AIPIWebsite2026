"use client";

import { useActionState, useState } from "react";

import { submitCareersForm } from "@/app/careers/actions";
import {
  getFileExtension,
  IDLE_FORM_STATE,
  INVALID_RESUME_TYPE_MESSAGE,
  MAX_RESUME_BYTES,
  OVERSIZE_RESUME_MESSAGE,
  RESUME_EXTENSIONS,
} from "@/utils/formValidation";

const fieldClassName =
  "w-full border border-[#d1d5db] bg-white px-4 py-3 text-sm text-[#0c1425] placeholder-[#9ca3af] focus:border-[#1d4ed8] focus:ring-1 focus:ring-[#1d4ed8] focus:outline-none transition-colors";
const labelClassName = "block text-sm font-medium text-[#374151] mb-2";

export default function CareersForm() {
  const [state, formAction, pending] = useActionState(
    submitCareersForm,
    IDLE_FORM_STATE,
  );
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Screen the attachment before submitting: a body over the server action's
  // size limit is rejected by the runtime, which unmounts the form and
  // discards everything the applicant typed.
  function handleSubmit(formData: FormData) {
    const resume = formData.get("resume");

    if (resume instanceof File && resume.size > 0) {
      if (resume.size > MAX_RESUME_BYTES) {
        setResumeError(OVERSIZE_RESUME_MESSAGE);
        return;
      }
      if (!RESUME_EXTENSIONS.includes(getFileExtension(resume.name))) {
        setResumeError(INVALID_RESUME_TYPE_MESSAGE);
        return;
      }
    }

    setResumeError(null);
    formAction(formData);
  }

  const errorMessage =
    resumeError ?? (state.status === "error" ? state.message : null);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border border-[#d1d5db] bg-[#f9fafb] px-6 py-8 text-center"
      >
        <p className="text-base font-semibold text-[#0c1425]">
          Application received
        </p>
        <p className="mt-2 text-sm text-[#4b5563]">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className={labelClassName}>
            First name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className={fieldClassName}
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClassName}>
            Last name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className={fieldClassName}
            placeholder="Last name"
          />
        </div>
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
        <label htmlFor="position" className={labelClassName}>
          Position interested in
        </label>
        <input
          type="text"
          id="position"
          name="position"
          className={fieldClassName}
          placeholder="Position title or area of interest"
        />
      </div>

      <div>
        <label htmlFor="resume" className={labelClassName}>
          Resume / CV
        </label>
        <input
          type="file"
          id="resume"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="w-full text-sm text-[#6b7280] file:mr-4 file:py-2.5 file:px-4 file:border file:border-[#d1d5db] file:bg-white file:text-sm file:font-medium file:text-[#374151] hover:file:bg-[#f9fafb] file:transition-colors file:cursor-pointer"
        />
        <p className="mt-2 text-xs text-[#6b7280]">
          PDF, DOC, or DOCX up to 3MB.
        </p>
      </div>

      <div>
        <label htmlFor="coverLetter" className={labelClassName}>
          Cover letter / Message
        </label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          rows={5}
          className={`${fieldClassName} resize-none`}
          placeholder="Tell us about yourself..."
        />
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-[#b91c1c]">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-[#1d4ed8] text-white py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {pending ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
