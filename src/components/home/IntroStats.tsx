"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const stats = [
  { end: 250, prefix: "$", suffix: "M+", label: "In value created via IP and strategy" },
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
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-[#0c1425] sm:text-4xl leading-tight">
              Where technology, IP, finance, and commercialization intersect.
            </h2>
            <p className="mt-6 text-xl leading-9 text-[#4b5563]">
              AiPi operates at the intersection of product direction, IP
              positioning, finance, and commercialization. That overlap is the
              point, because it is where material business value is often won
              or lost. We bring multidisciplinary expertise that other
              consultancies simply do not offer.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-sm font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition-colors"
            >
              About the Firm &rarr;
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden border border-[#e5e7eb] bg-[#e5e7eb]">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white px-8 py-8">
                <p className="text-4xl font-bold tracking-tight text-[#0c1425]">
                  {stat.prefix}<CountUp end={stat.end} />{stat.suffix}
                </p>
                <p className="mt-2 text-sm text-[#6b7280]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
