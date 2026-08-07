"use server";

import {
  type FormState,
  getField,
  getFileExtension,
  INVALID_RESUME_TYPE_MESSAGE,
  isValidEmail,
  MAX_RESUME_BYTES,
  OVERSIZE_RESUME_MESSAGE,
} from "@/utils/formValidation";
import { type EmailAttachment, sendFormEmail } from "@/utils/sendFormEmail";

const RESUME_CONTENT_TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

export async function submitCareersForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const firstName = getField(formData, "firstName", 100);
  const lastName = getField(formData, "lastName", 100);
  const phone = getField(formData, "phone", 50);
  const email = getField(formData, "email", 254);
  const position = getField(formData, "position", 200);
  const coverLetter = getField(formData, "coverLetter", 10000);

  if (!firstName || !lastName || !email) {
    return {
      status: "error",
      message: "Please complete all required fields.",
    };
  }

  if (!isValidEmail(email)) {
    return {
      status: "error",
      message: "Please enter a valid email address.",
    };
  }

  let attachment: EmailAttachment | undefined;
  const resume = formData.get("resume");

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return { status: "error", message: OVERSIZE_RESUME_MESSAGE };
    }

    const extension = getFileExtension(resume.name);

    if (!(extension in RESUME_CONTENT_TYPES)) {
      return { status: "error", message: INVALID_RESUME_TYPE_MESSAGE };
    }

    attachment = {
      filename: resume.name,
      contentType: resume.type || RESUME_CONTENT_TYPES[extension],
      content: Buffer.from(await resume.arrayBuffer()),
    };
  }

  try {
    await sendFormEmail({
      subject: `Job application from ${firstName} ${lastName}`,
      replyTo: email,
      attachment,
      text: [
        "New careers form submission from aipisolutions.com",
        "",
        `Name:     ${firstName} ${lastName}`,
        `Email:    ${email}`,
        `Phone:    ${phone || "(not provided)"}`,
        `Position: ${position || "(not specified)"}`,
        `Resume:   ${attachment ? attachment.filename : "(not attached)"}`,
        "",
        "Cover letter / message:",
        coverLetter || "(none provided)",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Careers form submission failed to send:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your application. Please email us directly at tech-admin@aipisolutions.com.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you — your application has been sent. We'll be in touch if there's a fit.",
  };
}
