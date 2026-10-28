import "server-only";

/**
 * Thrown when a required environment variable is missing at request time.
 * Callers fail closed: a generic error for the visitor, a log line naming
 * the variable (never its value) for us.
 */
export class MissingConfigError extends Error {
  constructor(name: string) {
    super(`Missing required environment variable ${name}`);
    this.name = "MissingConfigError";
  }
}

/** Reads a server env var lazily, so `next build` works with none set. */
export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    console.error(`[config] Missing required environment variable ${name}`);
    throw new MissingConfigError(name);
  }
  return value;
}

/** https only; plain http is allowed for localhost outside production. */
export function isSecureServiceUrl(url: URL): boolean {
  if (url.protocol === "https:") return true;
  return (
    url.protocol === "http:" &&
    url.hostname === "localhost" &&
    process.env.NODE_ENV !== "production"
  );
}

/** Reads an absolute https URL env var and returns its origin. */
export function requireOriginEnv(name: string): string {
  const value = requireEnv(name);
  try {
    const url = new URL(value);
    if (isSecureServiceUrl(url)) {
      return url.origin;
    }
  } catch {
    // fall through
  }
  console.error(`[config] Environment variable ${name} is not a valid https URL`);
  throw new MissingConfigError(name);
}
