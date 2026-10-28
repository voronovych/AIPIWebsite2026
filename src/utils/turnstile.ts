import "server-only";

import { headers } from "next/headers";

import { requireEnv, requireOriginEnv } from "@/utils/serverEnv";
import type { TurnstileAction } from "@/utils/turnstileActions";

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const REQUEST_TIMEOUT_MS = 10000;
// Cloudflare tokens are at most 2048 characters.
const MAX_TOKEN_LENGTH = 2048;

/**
 * Verifies a Turnstile token with Cloudflare. Returns false for a missing,
 * invalid, reused or expired token, a token issued for another form, and on
 * any verification error, so the caller fails closed. Throws
 * MissingConfigError if the secret or SITE_URL is unset.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp: string | null,
  expectedAction: TurnstileAction,
): Promise<boolean> {
  const secret = requireEnv("TURNSTILE_SECRET_KEY");
  const expectedHost = new URL(requireOriginEnv("SITE_URL")).hostname;
  if (!token || token.length > MAX_TOKEN_LENGTH) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  try {
    const response = await fetch(SITEVERIFY_URL, {
      method: "POST",
      body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`[turnstile] Siteverify answered HTTP ${response.status}`);
      return false;
    }
    const result = (await response.json()) as {
      success?: unknown;
      action?: unknown;
      hostname?: unknown;
    };
    return (
      result.success === true &&
      result.action === expectedAction &&
      result.hostname === expectedHost
    );
  } catch (err) {
    console.error(
      `[turnstile] Siteverify failed (${err instanceof Error ? err.name : "unknown"})`,
    );
    return false;
  }
}

/**
 * Checks the Turnstile token a form submitted. "unavailable" means the
 * check could not run because configuration is missing (already logged).
 */
export async function checkFormTurnstile(
  formData: FormData,
  action: TurnstileAction,
): Promise<"ok" | "failed" | "unavailable"> {
  const value = formData.get("cf-turnstile-response");
  const token = typeof value === "string" ? value : "";
  try {
    const forwardedFor = (await headers()).get("x-forwarded-for");
    const remoteIp = forwardedFor?.split(",")[0]?.trim() || null;
    return (await verifyTurnstile(token, remoteIp, action)) ? "ok" : "failed";
  } catch {
    return "unavailable";
  }
}
