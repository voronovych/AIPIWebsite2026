"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ───────────────────── animation hook ───────────────────── */

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ───────────────────── data ───────────────────────── */

const constituencies = [
  {
    title: "Corporate Patent Holders",
    description:
      "Corporate patent holders who partner with us for creative financing that allows for pursuing their claims while sharing risk.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Law Firms",
    description:
      "Law firms seeking alternative financing arrangements for their clients pursuing patent enforcement actions.",
    icon: "SCALES",
  },
  {
    title: "Investors",
    description:
      "Investors looking to create high returns that are not correlated to broader capital markets.",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Cases We Select",
    description:
      "We focus exclusively on patent infringement matters, which are more predictable than other types of litigation in terms of cost, duration, and damages. We invest only in meritorious claims where patent owners face genuine business threats from infringing activities.",
  },
  {
    step: "02",
    title: "Due Diligence and Process",
    description:
      "We employ a rigorous due diligence process to evaluate each prospective case. Following investment, patent owners and their legal teams retain full control of strategy and settlement decisions.",
  },
  {
    step: "03",
    title: "Resolution",
    description:
      "Upon successful resolution, AiPi claims a minority portion of the settlement proceeds in return for financing up to 100% of legal fees and costs associated with the litigation.",
  },
];

/* ───────────────────── component ───────────────────── */

export default function LitigationFinanceContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0c1425] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background:
              "linear-gradient(135deg, #0c1425 0%, #1a2a47 20%, #0c1425 40%, #162036 60%, #1e3a5f 80%, #0c1425 100%)",
            backgroundSize: "400% 400%",
          }}
        />
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full bg-[#1d4ed8]/20 blur-[140px] animate-pulse-slow" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full bg-[#3b82f6]/15 blur-[120px] animate-pulse-slow-delayed" />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, #0c1425 0%, #0c1425 30%, transparent 70%)",
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#3b82f6]" />
              <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
                Litigation Finance
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              Enforce your patents{" "}
              <span className="text-white/40">without the financial risk</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
              AiPi understands that the costs of enforcing patents may be overly
              burdensome or fiscally difficult for both large and small technology
              companies. Our Litigation Finance unit provides non-recourse
              financing for patent infringement litigations in the US and
              overseas, covering all costs and services related to each financed
              litigation in return for a share of the settlement or award.
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              <Link
                href="/contact"
                className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Discuss Your Case
              </Link>
              <Link
                href="#how-it-works"
                className="text-base font-medium text-white/50 hover:text-white transition-colors"
              >
                How It Works &darr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KEY VALUE PROPS ─── */}
      <ValueProps />

      {/* ─── WHO WE SERVE ─── */}
      <WhoWeServe />

      {/* ─── HOW IT WORKS ─── */}
      <HowItWorks />

      {/* ─── DEAL ORIGINATION ─── */}
      <DealOrigination />

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/8 blur-[80px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Ready to explore litigation financing for your patent claims?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Our team will evaluate your case and discuss financing options
            tailored to your situation.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────── sub-components ──────────────────── */

function ValueProps() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
          {[
            {
              value: "100%",
              label: "Legal fees & costs covered",
            },
            {
              value: "Non-Recourse",
              label: "No repayment if the case is unsuccessful",
            },
            {
              value: "Full Control",
              label: "Patent owners retain strategy & settlement decisions",
            },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`text-center py-8 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#e5e7eb]" : ""} transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <p className="text-2xl font-bold tracking-tight text-[#0c1425]">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-[#6b7280]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhoWeServe() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-14">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Who We Serve
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            Solutions serving three important constituencies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {constituencies.map((item, i) => (
            <div
              key={item.title}
              className={`group flex flex-col items-center text-center p-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-20 h-20 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                {item.icon === "SCALES" ? (
                  <svg className="w-9 h-9 text-[#1d4ed8]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    {/* Vertical post */}
                    <line x1="32" y1="8" x2="32" y2="56" />
                    {/* Base */}
                    <line x1="22" y1="56" x2="42" y2="56" />
                    {/* Horizontal beam */}
                    <line x1="8" y1="16" x2="56" y2="16" />
                    {/* Top circle */}
                    <circle cx="32" cy="12" r="4" fill="currentColor" />
                    {/* Left chain */}
                    <line x1="14" y1="16" x2="10" y2="36" />
                    <line x1="14" y1="16" x2="18" y2="36" />
                    {/* Left pan */}
                    <path d="M6 36h16" />
                    <path d="M6 36 C6 44 22 44 22 36" fill="currentColor" opacity="0.15" />
                    {/* Right chain */}
                    <line x1="50" y1="16" x2="46" y2="36" />
                    <line x1="50" y1="16" x2="54" y2="36" />
                    {/* Right pan */}
                    <path d="M42 36h16" />
                    <path d="M42 36 C42 44 58 44 58 36" fill="currentColor" opacity="0.15" />
                  </svg>
                ) : (
                  <svg
                    className="w-9 h-9 text-[#1d4ed8]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={item.icon}
                    />
                  </svg>
                )}
              </div>
              <h3 className="text-lg font-bold text-[#0c1425] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { ref, visible } = useReveal();

  return (
    <section id="how-it-works" className="bg-[#0c1425] py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
            How It Works
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            From case selection to resolution
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {processSteps.map((item, i) => (
            <div
              key={item.step}
              className={`relative border border-white/10 bg-white/[0.03] p-8 hover:border-white/20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={visible ? undefined : { transition: `opacity 500ms ${200 + i * 100}ms, transform 500ms ${200 + i * 100}ms` }}
            >
              <span className="text-3xl font-bold text-[#3b82f6]">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/70 leading-relaxed">
                {item.description}
              </p>
              {i < processSteps.length - 1 && (
                <div className="hidden sm:block absolute top-1/2 -right-3 text-white/20">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DealOrigination() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
              Deal Origination
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
              We source opportunities through trusted networks
            </h2>
            <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
              Our deals originate through established networks of law firms,
              corporations, universities, and private equity firms. We focus
              exclusively on patent infringement matters — which are more
              predictable than other types of litigation in terms of cost,
              duration, and damages.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Law Firms", icon: "SCALES" },
              { label: "Corporations", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
              { label: "Universities", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
              { label: "Private Equity", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
            ].map((source, i) => (
              <div
                key={source.label}
                className={`border border-[#e5e7eb] p-6 flex flex-col items-center text-center hover:border-[#1d4ed8]/30 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transition: visible ? "border-color 0ms" : `opacity 500ms ${300 + i * 100}ms, transform 500ms ${300 + i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#f8fafc] flex items-center justify-center mb-3">
                  {source.icon === "SCALES" ? (
                    <svg className="w-6 h-6 text-[#1d4ed8]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="32" y1="8" x2="32" y2="56" />
                      <line x1="22" y1="56" x2="42" y2="56" />
                      <line x1="8" y1="16" x2="56" y2="16" />
                      <circle cx="32" cy="12" r="4" fill="currentColor" />
                      <line x1="14" y1="16" x2="10" y2="36" />
                      <line x1="14" y1="16" x2="18" y2="36" />
                      <path d="M6 36h16" />
                      <path d="M6 36 C6 44 22 44 22 36" fill="currentColor" opacity="0.15" />
                      <line x1="50" y1="16" x2="46" y2="36" />
                      <line x1="50" y1="16" x2="54" y2="36" />
                      <path d="M42 36h16" />
                      <path d="M42 36 C42 44 58 44 58 36" fill="currentColor" opacity="0.15" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 text-[#1d4ed8]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={source.icon}
                      />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-medium text-[#0c1425]">
                  {source.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
