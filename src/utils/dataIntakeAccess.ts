import { createHash, timingSafeEqual } from "node:crypto";

/**
 * SHA-256 of the secret path segment in the private data intake link
 * (/data-intake/<token>). Only the hash lives here because this repository is
 * public. To issue a new link, generate a random token, e.g.
 * `node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"`,
 * and replace this with its SHA-256 hex digest; the old link stops working.
 */
const INTAKE_TOKEN_SHA256 =
  "6c5d975627de05e25e75dba5744aebbe9c4c5250ba66679f35bb3d1750997cd1";

export function isValidIntakeToken(token: unknown): boolean {
  if (typeof token !== "string" || token.length === 0 || token.length > 200) {
    return false;
  }

  const actual = createHash("sha256").update(token, "utf8").digest();
  return timingSafeEqual(actual, Buffer.from(INTAKE_TOKEN_SHA256, "hex"));
}
