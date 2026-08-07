"use server";

import { type FormState, getField, isValidEmail } from "@/utils/formValidation";
import { sendFormEmail } from "@/utils/sendFormEmail";

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = getField(formData, "name", 200);
  const phone = getField(formData, "phone", 50);
  const email = getField(formData, "email", 254);
  const message = getField(formData, "message", 5000);

  if (!name || !email || !message) {
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

  try {
    await sendFormEmail({
      subject: `Website enquiry from ${name}`,
      replyTo: email,
      text: [
        "New contact form submission from aipisolutions.com",
        "",
        `Name:  ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "(not provided)"}`,
        "",
        "Message:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form submission failed to send:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please email us directly at tech-admin@aipisolutions.com.",
    };
  }

  return {
    status: "success",
    message: "Thank you — your message has been sent. We'll be in touch shortly.",
  };
}
