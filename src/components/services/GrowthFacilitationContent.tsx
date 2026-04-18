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

const lifecycleServices = [
  {
    title: "Fundraising Strategy",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    description:
      "Milestone-driven fundraising strategies incorporating IP development, product roadmaps, and realistic business plans. We introduce clients to investors providing funding plus strategic enhancements.",
  },
  {
    title: "Innovation Strategy",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    description:
      "Comprehensive landscapes mapping commercialisation and patent rights. Defensive freedom-to-operate analyses, offensive white-space identification, and strategic patent portfolio development.",
  },
  {
    title: "Regulatory Support & Logistics",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    description:
      "A dedicated concierge and single point of contact for entity formation, banking, office space, hiring, and liaising with specialised US law firms to navigate industry-specific regulations.",
  },
  {
    title: "Operations Scaling & Commercialisation",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    description:
      "Establishing US-based channel partners, optimising sales and distribution networks, managing vendor relationships, and deploying digital marketing resources for order fulfilment and manufacturing scale-up.",
  },
  {
    title: "Business Owner Exit Planning",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    description:
      "Holistic strategic analysis evaluating paths — maintaining operations, pursuing further funding for growth, or exiting via sale or liquidation — in the context of both company objectives and personal financial goals.",
  },
];

const investorServices = [
  {
    title: "Technical Due Diligence",
    detail:
      "Our proprietary AI platforms show competitors' commercialisation efforts and patent rights in an industry sector, then overlay a tech entity's planned product. The resulting analyses prove and create differentiators for enhanced investment decisions.",
  },
  {
    title: "Portfolio Optimisation",
    detail:
      "Improve minimum viable and next-gen product designs, create and monetise patent portfolios, enhance sales and new business unit creation, and facilitate owner/investor exit.",
  },
  {
    title: "Investability Assessment",
    detail:
      "Prove and expand tech differentiators, obtain meaningful patents to prevent developed tech from being hijacked, and improve and implement revenue models to make entities investable.",
  },
];

/* ───────────────────── component ───────────────────── */

export default function GrowthFacilitationContent() {
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#3b82f6]" />
              <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
                Growth Facilitation
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              From market entry to{" "}
              <span className="text-white/40">successful exit</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
              AiPi provides comprehensive support for technology companies —
              both overseas entities entering the US market and domestic firms
              scaling operations — acting as a single point of contact to
              overcome regulatory, logistical, fundraising, and strategic
              hurdles.
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              <Link
                href="/contact"
                className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors"
              >
                Get in Touch
              </Link>
              <Link
                href="#lifecycle"
                className="text-base font-medium text-white/50 hover:text-white transition-colors"
              >
                Our Services &darr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPS ─── */}
      <ValueProps />

      {/* ─── LIFECYCLE HEADLINE ─── */}
      <LifecycleHeadline />

      {/* ─── LIFECYCLE SERVICES ─── */}
      <LifecycleServices />

      {/* ─── FOR INVESTORS ─── */}
      <InvestorSection />

      {/* ─── APPROACH ─── */}
      <ApproachSection />

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/8 blur-[80px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Ready to accelerate your growth?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Whether you&apos;re entering the US market, scaling operations, or
            planning an exit — our team is ready to help.
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
    <section className="bg-white border-b border-[#e5e7eb]" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 gap-0 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {[
            { value: "US & International", label: "Supporting companies on both sides of the Atlantic" },
            { value: "Single Point of Contact", label: "One team for regulatory, logistical, and strategic needs" },
            { value: "End-to-End", label: "From market entry through successful exit" },
          ].map((item, i) => (
            <div
              key={item.label}
              className={`text-center py-8 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-[#e5e7eb]" : ""}`}
            >
              <p className="text-xl font-bold tracking-tight text-[#0c1425]">
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

function LifecycleHeadline() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#f8fafc] pt-16 sm:pt-24 pb-8" ref={ref}>
      <div
        className={`mx-auto max-w-4xl px-6 lg:px-8 text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
          Full Lifecycle Support
        </span>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
          Our strategic innovation services cover the entire lifecycle of
          business growth
        </h2>
      </div>
    </section>
  );
}

function LifecycleServices() {
  const { ref, visible } = useReveal();
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <section id="lifecycle" className="bg-[#f8fafc] pb-16 sm:pb-24 pt-8" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {lifecycleServices.map((service, i) => {
            const isExpanded = expandedService === service.title;
            return (
              <div
                key={service.title}
                className={`group flex flex-col items-center text-center p-6 bg-white border border-[#e5e7eb] hover:border-[#1d4ed8]/30 hover:shadow-sm cursor-pointer transition-all duration-200 ${
                  isExpanded ? "sm:col-span-3 lg:col-span-5 !text-left !items-start" : ""
                }`}
                style={visible ? undefined : { transitionDelay: `${200 + i * 80}ms` }}
                onClick={() =>
                  setExpandedService(isExpanded ? null : service.title)
                }
              >
                <div className="w-14 h-14 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-7 h-7 text-[#1d4ed8]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={service.icon}
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-[#0c1425] mb-2">
                  {service.title}
                </h3>
                {isExpanded ? (
                  <p className="text-sm text-[#4b5563] leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                ) : (
                  <span className="text-xs font-medium text-[#1d4ed8]">
                    Learn More
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InvestorSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#0c1425] py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="text-center mb-14">
            <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
              For Investors & Accelerators
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Making tech entities investable and facilitating growth
            </h2>
            <p className="mt-4 text-base text-white/50 max-w-2xl mx-auto">
              AiPi and its investor network invest in a wide range of early-stage
              tech entities, and are requested by our customers to communicate
              with high net-worth individuals, family offices, and institutional
              investors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {investorServices.map((item, i) => (
              <div
                key={item.title}
                className={`border border-white/10 bg-white/[0.03] p-8 hover:border-white/20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={visible ? undefined : { transition: `opacity 500ms ${200 + i * 100}ms, transform 500ms ${200 + i * 100}ms` }}
              >
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
              Our Unique Approach
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
              How we get to goal
            </h2>
            <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
              AiPi&apos;s ability to deliver results is built on two pillars:
              proprietary AI platforms that provide clear, reliable market
              intelligence, and a team with deep professional expertise across
              technology, business development, and US market operations.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border border-[#e5e7eb] p-6">
              <h3 className="text-base font-bold text-[#0c1425] mb-2">
                Our AI Platforms
              </h3>
              <ul className="space-y-2">
                {[
                  "Provide a clear and reliable sense of where customers' tech fits into the relevant industry landscape",
                  "Enhance business and revenue modelling",
                  "Created in-house based on our expertise in platform development",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4b5563]">
                    <svg className="w-4 h-4 text-[#1d4ed8] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-[#e5e7eb] p-6">
              <h3 className="text-base font-bold text-[#0c1425] mb-2">
                Our Professional Expertise
              </h3>
              <ul className="space-y-2">
                {[
                  "Tech/scientific expertise for identifying and creating differentiators",
                  "Business development skills for identifying customers and managing relationships",
                  "US market sophistication for initiating and expanding sales and revenue",
                  "Optimising minimum viable and next-gen products and services",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[#4b5563]">
                    <svg className="w-4 h-4 text-[#1d4ed8] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
