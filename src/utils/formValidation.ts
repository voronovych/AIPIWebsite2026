export type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const IDLE_FORM_STATE: FormState = { status: "idle", message: "" };

/** Reads a text field, trimming whitespace and capping length to bound abuse. */
export function getField(
  formData: FormData,
  name: string,
  maxLength: number,
): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Resume upload limits. Enforced on the client too, because a body larger than
 * the server action's bodySizeLimit is rejected by the runtime before the
 * action runs, which tears down the form and loses the applicant's input.
 */
export const MAX_RESUME_BYTES = 3 * 1024 * 1024;

export const RESUME_EXTENSIONS: readonly string[] = [".pdf", ".doc", ".docx"];

export const OVERSIZE_RESUME_MESSAGE =
  "Your resume is larger than 3MB. Please attach a smaller file, or email it to tech-admin@aipisolutions.com.";

export const INVALID_RESUME_TYPE_MESSAGE =
  "Please attach your resume as a PDF, DOC, or DOCX file.";

export function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex === -1 ? "" : filename.slice(dotIndex).toLowerCase();
}
