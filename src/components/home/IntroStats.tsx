"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { end: 250, prefix: "$", suffix: "M+", label: "In value created via patents and strategy" },
  { end: 10000, prefix: "", suffix: "+", label: "Patents strategically assessed" },
  { end: 100, prefix: "", suffix: "+", label: "Patent portfolios generated" },
];

function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString("en-US");
  }
  return n.toString();
}

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);

  return <span ref={ref}>{formatNumber(value)}</span>;
}

export default function IntroStats() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border-b border-[#e5e7eb] pb-12 mb-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`text-center py-6 sm:py-0 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#e5e7eb]" : ""}`}
            >
              <p className="text-5xl font-bold tracking-tight text-[#0c1425]">
                {stat.prefix}<CountUp end={stat.end} />{stat.suffix}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
            Where technology, patents, finance, and commercialization intersect.
          </h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">
            Patent holders rarely lack valuable IP — they lack the landscape
            visibility to position it, the commercial analysis to monetize it,
            and the strategic capital to enforce it. AiPi closes all three gaps
            under one roof, combining patent law, AI-driven intelligence
            platforms, and investor networks that other consultancies simply
            cannot offer.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center text-base font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition-colors"
          >
            About the Firm &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
