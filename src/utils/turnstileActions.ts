/**
 * Turnstile `action` names, one per form. The widget is rendered with the
 * form's action and the server rejects tokens issued for any other form.
 */
export const TURNSTILE_ACTIONS = {
  reportOrder: "report_order",
  contact: "contact",
  careers: "careers",
} as const;

export type TurnstileAction =
  (typeof TURNSTILE_ACTIONS)[keyof typeof TURNSTILE_ACTIONS];

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const TURNSTILE_FAILED_MESSAGE =
  "Please complete the verification check and try again.";
