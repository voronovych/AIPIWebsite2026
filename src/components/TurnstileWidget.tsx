"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile challenge. Renders a hidden `cf-turnstile-response`
 * input inside the surrounding form; `onToken` reports whether a usable
 * token is present. Changing `resetKey` asks for a fresh token, since each
 * token can be verified only once.
 */
export default function TurnstileWidget({
  siteKey,
  action,
  resetKey,
  onToken,
}: {
  siteKey: string;
  action: string;
  resetKey: number;
  onToken: (hasToken: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);

  useEffect(() => {
    onTokenRef.current = onToken;
  }, [onToken]);

  function renderWidget() {
    const container = containerRef.current;
    if (!container || !window.turnstile || widgetIdRef.current) return;
    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
      action,
      callback: () => onTokenRef.current(true),
      "expired-callback": () => onTokenRef.current(false),
      "error-callback": () => onTokenRef.current(false),
    });
  }

  // Covers the case where the script was already loaded by an earlier visit.
  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey, action]);

  useEffect(() => {
    if (resetKey > 0 && widgetIdRef.current && window.turnstile) {
      onTokenRef.current(false);
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetKey]);

  return (
    <>
      <Script src={SCRIPT_SRC} strategy="afterInteractive" onReady={renderWidget} />
      <div ref={containerRef} />
    </>
  );
}
