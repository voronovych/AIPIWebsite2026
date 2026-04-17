"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import aipiLogo from "@/assets/AiPilogo-white.png";

/* ───────────────────────── data ───────────────────────── */

const solutions = [
  {
    number: "01",
    label: "Solution One",
    title: "Patent Landscaping",
    tagline: "Map how your IP fits into the competitive landscape",
    description:
      "A structured map of how your granted or pending IP sits within the existing patent landscape — showing where it overlaps with competitor filings, where adjacent gaps exist, and what IP territory remains available.",
    outcomes: [
      "Clear view of IP defensibility",
      "Gap opportunities for portfolio expansion",
      "Evidence base for investment and licensing negotiations",
    ],
    capabilities: [
      {
        title: "Competitor Filing Analysis",
        detail:
          "Map every relevant patent filing in the target domain, showing exactly how your IP overlaps with or is differentiated from competitors.",
      },
      {
        title: "Adjacent Gap Identification",
        detail:
          "Identify white spaces where new filings could extend your portfolio, strengthening its defensive position or opening new licensing opportunities.",
      },
      {
        title: "Actionable Landscape Document",
        detail:
          "A structured report that IP owners, investors, and legal advisers can act on directly — not a data dump.",
      },
    ],
  },
  {
    number: "02",
    label: "Solution Two",
    title: "Commercialisation Landscaping",
    tagline: "Identify applications, competition, and value potential",
    description:
      "A commercial analysis that identifies potential applications of your IP, mapping these against existing competing solutions and estimating the value that could be created by exploiting each application.",
    outcomes: [
      "Prioritised list of commercial applications",
      "Comparative assessment against alternative solutions",
      "Quantified value potential for each route to market",
    ],
    capabilities: [
      {
        title: "Application Identification",
        detail:
          "Systematically identify the full range of potential applications across sectors and use cases — including applications not previously considered.",
      },
      {
        title: "Competitive Solution Mapping",
        detail:
          "For each application, map existing competing solutions and assess where your IP offers genuine advantage in performance, cost, or defensibility.",
      },
      {
        title: "Value Quantification",
        detail:
          "Estimate the commercial value each application could generate, enabling prioritised routes and defensible business cases.",
      },
    ],
  },
];

const process = [
  {
    step: "01",
    title: "IP Intake",
    description:
      "You share registered IP. We review patent filings, technical specifications, and any existing commercialisation context.",
  },
  {
    step: "02",
    title: "AI Platform Analysis",
    description:
      "Our proprietary platform ingests and analyses global patent databases and commercial market data, mapping your IP against the full competitive landscape.",
  },
  {
    step: "03",
    title: "Expert Synthesis",
    description:
      "Our technical and commercial team interpret platform outputs, validate findings, and frame conclusions in the context of your objectives.",
  },
  {
    step: "04",
    title: "Delivery & Briefing",
    description:
      "You receive a structured landscape document plus a briefing session to walk through findings and explore next steps together.",
  },
];

const industries = [
  { name: "Tech", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
  { name: "Cybersecurity", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { name: "Medical Tech", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { name: "Agricultural", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" },
  { name: "Pharmaceuticals", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { name: "Automotive", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { name: "Oil & Gas", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" },
  { name: "Renewables", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
  { name: "IoT", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
  { name: "Materials Science", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
];

const stats = [
  { value: "$250M+", label: "Value created via IP & strategy" },
  { value: "10,000+", label: "Patents strategically assessed" },
  { value: "100+", label: "Patent portfolios generated" },
  { value: "10+", label: "Years delivering results" },
];

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

/* ───────────────────── component ───────────────────────── */

export default function StrategicServicesContent() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0c1425] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        {/* Animated gradient background */}
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
                  Strategic Patent Services
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
                From unsorted IP to{" "}
                <span className="text-white/40">actionable intelligence</span>
              </h1>
              <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
                Our strategic innovation services cover the entire lifecycle of R&D
                and product development. We transform raw IP into structured
                intelligence that drives investment, licensing, and growth
                decisions.
              </p>
              <div className="mt-8 flex items-center gap-x-6">
                <Link
                  href="/contact"
                  className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors"
                >
                  Speak with an Advisor
                </Link>
                <Link
                  href="#solutions"
                  className="text-base font-medium text-white/50 hover:text-white transition-colors"
                >
                  Our Solutions &darr;
                </Link>
              </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-white border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e5e7eb]">
            {stats.map((stat) => (
              <div key={stat.label} className="py-8 px-6 text-center">
                <p className="text-2xl font-bold tracking-tight text-[#0c1425]">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-[#6b7280]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICE WHEEL ─── */}
      <ServiceWheelSection />

      {/* ─── PROBLEM ─── */}
      <ProblemSection />

      {/* ─── SOLUTIONS ─── */}
      <section id="solutions" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
              What We Deliver
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
              Two distinct solutions to the IP dilemma
            </h2>
          </div>

          <div className="space-y-20">
            {solutions.map((solution) => (
              <SolutionBlock key={solution.number} solution={solution} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <ProcessSection />

      {/* ─── INDUSTRIES ─── */}
      <IndustriesSection />

      {/* ─── WHY AIPI ─── */}
      <WhySection />

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/8 blur-[80px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Have a question or want to explore how AiPi can support your
            innovation strategy?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Our senior-level advisors are ready to assess your portfolio and
            identify immediate opportunities.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors"
            >
              Start the Conversation
            </Link>
            <Link
              href="/careers"
              className="text-base text-white/40 hover:text-white transition-colors"
            >
              View Open Positions &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────── sub-components ──────────────────── */

function ProblemSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            The IP Dilemma
          </h2>
          <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
            Owning a patent doesn&apos;t guarantee receiving value from it. Most
            IP owners face three critical gaps.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "No Landscape Visibility",
              detail:
                "Most owners don't know how their IP relates to other granted and pending patents. Investment decisions and licensing negotiations are made in the dark.",
            },
            {
              title: "No Commercialisation Map",
              detail:
                "Even where IP is strong, owners rarely have a systematic view of which applications it can enable, what competing solutions exist, or the value potential.",
            },
            {
              title: "No IP Strategy",
              detail:
                "Without landscape visibility and viable commercial routes, owners cannot make confident decisions about portfolio development or R&D priorities.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`border border-[#e5e7eb] bg-white p-8 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mb-4">
                <span className="text-sm font-bold text-[#1d4ed8]">
                  {i + 1}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0c1425] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolutionBlock({
  solution,
}: {
  solution: (typeof solutions)[number];
}) {
  const { ref, visible } = useReveal(0.1);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="border-t border-[#e5e7eb] pt-10">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-sm font-light text-[#9ca3af]">
            {solution.number}
          </span>
          <span className="text-sm font-medium text-[#1d4ed8] uppercase tracking-wider">
            {solution.label}
          </span>
        </div>
        <h3 className="text-xl font-bold text-[#0c1425] sm:text-2xl">
          {solution.title}
        </h3>
        <p className="mt-1 text-base text-[#1d4ed8]">{solution.tagline}</p>
        <p className="mt-4 text-base text-[#4b5563] leading-relaxed max-w-2xl">
          {solution.description}
        </p>

        {/* Outcomes */}
        <div className="mt-6 flex flex-wrap gap-3">
          {solution.outcomes.map((outcome) => (
            <span
              key={outcome}
              className="inline-flex items-center gap-1.5 text-sm text-[#0c1425] bg-[#f1f5f9] px-3 py-1.5 rounded-full"
            >
              <svg
                className="w-3.5 h-3.5 text-[#1d4ed8]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {outcome}
            </span>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {solution.capabilities.map((cap, i) => (
            <div
              key={cap.title}
              className={`border-l-2 border-[#1d4ed8] pl-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <h4 className="text-sm font-bold text-[#0c1425]">{cap.title}</h4>
              <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
                {cap.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProcessSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#0c1425] py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
            How It Works
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Four to six weeks from engagement to delivery
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {process.map((item, i) => (
            <div
              key={item.step}
              className={`relative border border-white/10 bg-white/[0.03] p-8 transition-all duration-500 hover:border-white/20 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 100}ms` }}
            >
              <span className="text-3xl font-bold text-white/10">
                {item.step}
              </span>
              <h3 className="mt-3 text-base font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-white/50 leading-relaxed">
                {item.description}
              </p>
              {i < process.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 text-white/20">
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

function IndustriesSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Industry Agnostic
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            We serve innovators across every sector
          </h2>
          <p className="mt-4 text-base text-[#4b5563] max-w-2xl mx-auto">
            AiPi supports organisations across a wide range of industries that
            rely on innovation and technology to drive growth — from early-stage
            ventures to global enterprises.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`flex flex-col items-center text-center p-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${100 + i * 60}ms` }}
            >
              <div className="w-24 h-24 rounded-full bg-[#e5e7eb]/60 flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-[#1d4ed8]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={industry.icon}
                  />
                </svg>
              </div>
              <span className="text-sm font-medium text-[#0c1425]">
                {industry.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-base text-[#6b7280] italic">
          &hellip; and many more.
        </p>
      </div>
    </section>
  );
}

function WhySection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Why AiPi
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            The capability that makes the difference
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              title: "Proprietary AI Platform",
              detail:
                "Built in-house by a team with deep expertise in AI, IP law, and innovation financing. The result is analysis that is faster, broader in scope, and more precise than anything achievable through manual research.",
            },
            {
              title: "Technical & Commercial Expertise",
              detail:
                "Most IP advisers are either patent attorneys — strong on the legal landscape but weak on commercial value — or business consultants who lack technical depth. AiPi integrates both in a single, coordinated engagement.",
            },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`border border-[#e5e7eb] p-8 sm:p-10 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <h3 className="text-lg font-bold text-[#0c1425] mb-3">
                {item.title}
              </h3>
              <p className="text-base text-[#4b5563] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const wheelSegments = [
  "Full Patent Prosecution",
  "Valuation",
  "Licensing",
  "Patent Landscaping",
  "Commercial Landscaping",
  "Enforcement & Monetization",
  "Whitespace Analysis",
];

function ServiceWheelSection() {
  const { ref, visible } = useReveal();

  const segmentCount = wheelSegments.length;
  const angleStep = 360 / segmentCount;
  const cx = 250;
  const cy = 250;
  const outerR = 240;
  const innerR = 115;

  function polarToCart(angleDeg: number, r: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
      y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
    };
  }

  const colors = [
    "#0c1425",
    "#162036",
    "#1a2a47",
    "#0f1a2e",
    "#0c1425",
    "#162036",
    "#1a2a47",
  ];

  const wheelFontSize = "14";

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
              Our Approach
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
              We provide value at every stage of the patent lifecycle — from
              ideation to monetization.
            </h2>
            <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
              AiPi delivers a full suite of strategic patent services, combining
              proprietary AI with deep technical and commercial expertise. Every
              engagement is structured around your specific objectives — from
              portfolio creation through monetization.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[500px] h-[500px]">
              <svg viewBox="0 0 500 500" className="w-full h-full">
                {wheelSegments.map((label, i) => {
                  const startAngle = i * angleStep;
                  const endAngle = (i + 1) * angleStep;
                  const gap = 1.5;

                  const outerStart = polarToCart(startAngle + gap, outerR);
                  const outerEnd = polarToCart(endAngle - gap, outerR);
                  const innerStart = polarToCart(endAngle - gap, innerR);
                  const innerEnd = polarToCart(startAngle + gap, innerR);

                  const largeArc =
                    endAngle - startAngle - 2 * gap > 180 ? 1 : 0;

                  const d = [
                    `M ${outerStart.x} ${outerStart.y}`,
                    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
                    `L ${innerStart.x} ${innerStart.y}`,
                    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
                    "Z",
                  ].join(" ");

                  const midAngle = startAngle + angleStep / 2;
                  const labelR = (outerR + innerR) / 2;
                  const labelPos = polarToCart(midAngle, labelR);

                  // Split label into lines
                  const words = label.split(" ");
                  const mid = Math.ceil(words.length / 2);
                  const line1 = words.slice(0, mid).join(" ");
                  const line2 = words.slice(mid).join(" ");
                  const multiline = words.length > 1 && label.length > 10;

                  return (
                    <g
                      key={label}
                      className="wheel-segment"
                    >
                      <path
                        d={d}
                        fill={colors[i % colors.length]}
                      />
                      <text
                        x={labelPos.x}
                        y={labelPos.y}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="white"
                        fontSize={wheelFontSize}
                        fontWeight="600"
                      >
                        {multiline ? (
                          <>
                            <tspan x={labelPos.x} dy="-0.5em">
                              {line1}
                            </tspan>
                            <tspan x={labelPos.x} dy="1.15em">
                              {line2}
                            </tspan>
                          </>
                        ) : (
                          label
                        )}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-[185px] h-[185px] rounded-full bg-white flex flex-col items-center justify-center shadow-md">
                  <Image
                    src={aipiLogo}
                    alt="AiPi"
                    className="h-20 w-auto brightness-0"
                  />
                  <span className="mt-2 text-2xl font-bold tracking-tight text-[#0c1425]">
                    AiPi
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroWheel() {
  const segmentCount = wheelSegments.length;
  const angleStep = 360 / segmentCount;
  const cx = 250;
  const cy = 250;
  const outerR = 240;
  const innerR = 130;

  function polarToCart(angleDeg: number, r: number) {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return {
      x: Math.round((cx + r * Math.cos(rad)) * 100) / 100,
      y: Math.round((cy + r * Math.sin(rad)) * 100) / 100,
    };
  }

  const heroColors = [
    "rgba(255,255,255,0.12)",
    "rgba(255,255,255,0.18)",
    "rgba(255,255,255,0.10)",
    "rgba(255,255,255,0.15)",
    "rgba(255,255,255,0.12)",
    "rgba(255,255,255,0.18)",
    "rgba(255,255,255,0.10)",
  ];

  return (
    <div className="relative w-[480px] h-[480px]">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {wheelSegments.map((label, i) => {
          const startAngle = i * angleStep;
          const endAngle = (i + 1) * angleStep;
          const gap = 1.5;

          const outerStart = polarToCart(startAngle + gap, outerR);
          const outerEnd = polarToCart(endAngle - gap, outerR);
          const innerStart = polarToCart(endAngle - gap, innerR);
          const innerEnd = polarToCart(startAngle + gap, innerR);

          const largeArc = endAngle - startAngle - 2 * gap > 180 ? 1 : 0;

          const d = [
            `M ${outerStart.x} ${outerStart.y}`,
            `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
            `L ${innerStart.x} ${innerStart.y}`,
            `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
            "Z",
          ].join(" ");

          const midAngle = startAngle + angleStep / 2;
          const labelR = (outerR + innerR) / 2;
          const labelPos = polarToCart(midAngle, labelR);

          const words = label.split(" ");
          const mid = Math.ceil(words.length / 2);
          const line1 = words.slice(0, mid).join(" ");
          const line2 = words.slice(mid).join(" ");
          const multiline = words.length > 1 && label.length > 10;

          return (
            <g key={label}>
              <path d={d} fill={heroColors[i % heroColors.length]} />
              <text
                x={labelPos.x}
                y={labelPos.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.9)"
                fontSize="13"
                fontWeight="600"
              >
                {multiline ? (
                  <>
                    <tspan x={labelPos.x} dy="-0.5em">
                      {line1}
                    </tspan>
                    <tspan x={labelPos.x} dy="1.15em">
                      {line2}
                    </tspan>
                  </>
                ) : (
                  label
                )}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[200px] h-[200px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center">
          <Image
            src={aipiLogo}
            alt="AiPi"
            className="h-16 w-auto"
          />
          <span className="mt-2 text-xl font-bold tracking-tight text-white">
            AiPi
          </span>
        </div>
      </div>
    </div>
  );
}
