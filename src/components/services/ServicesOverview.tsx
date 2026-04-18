"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import aipiLogo from "@/assets/AiPilogo-white.png";

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

const services = [
  {
    number: "01",
    title: "Strategic Patent Services",
    tagline: "Supporting innovators from ideation to monetization",
    href: "/services/strategic",
    description:
      "Our strategic innovation services cover the entire lifecycle of R&D and product development. We transform raw IP into structured intelligence that drives investment, licensing, and growth decisions.",
    highlights: [
      "Patent Landscaping — map how your IP fits into the competitive landscape",
      "Commercialisation Landscaping — identify applications, competition, and value potential",
      "Full Patent Prosecution, Valuation, Licensing, and Enforcement",
    ],
    bg: "white" as const,
  },
  {
    number: "02",
    title: "Technology",
    tagline: "Proprietary AI platforms built for real decisions",
    href: "/services/technology",
    description:
      "We don't just advise — we build. AiPi develops proprietary software platforms powered by AI, knowledge graphs, and geospatial intelligence that transform raw data into competitive advantage.",
    highlights: [
      "Patent Landscape Intelligence — structured competitive reports with radar charts, analytics, and filterable reference libraries",
      "US Patent Knowledge Graph — every patent enriched with semantic embeddings via NVIDIA NeMo Retriever",
      "Agricultural Data Intelligence — interactive county-level crop acreage maps with multi-year rotation history",
    ],
    bg: "light" as const,
  },
  {
    number: "03",
    title: "Growth Facilitation",
    tagline: "From market entry to successful exit",
    href: "/services/growth-facilitation",
    description:
      "AiPi provides comprehensive support for technology companies — both overseas entities entering the US market and domestic firms scaling operations — acting as a single point of contact to overcome regulatory, logistical, fundraising, and strategic hurdles.",
    highlights: [
      "Fundraising Strategy — milestone-driven strategies with investor introductions",
      "Regulatory Support & Logistics — entity formation, banking, hiring, and compliance",
      "Operations Scaling & Business Owner Exit Planning",
    ],
    bg: "white" as const,
  },
  {
    number: "04",
    title: "Litigation Finance",
    tagline: "Enforce your patents without the financial risk",
    href: "/services/litigation-finance",
    description:
      "AiPi understands that the costs of enforcing patents may be overly burdensome. Our Litigation Finance unit provides non-recourse financing for patent infringement litigations in the US and overseas, covering all costs and services in return for a share of the settlement or award.",
    highlights: [
      "100% of legal fees and costs covered — non-recourse, no repayment if unsuccessful",
      "Patent owners retain full control of strategy and settlement decisions",
      "Serving corporate patent holders, law firms, and investors",
    ],
    bg: "light" as const,
  },
];

/* ───────────────────── component ───────────────────── */

export default function ServicesOverview() {
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
                Our Services
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              Strategic services that{" "}
              <span className="text-white/40">drive real growth</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
              AiPi provides the services most important to growing businesses —
              from patent strategy and AI-powered intelligence platforms to
              market entry support and litigation financing. We cover what other
              consultancies cannot.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SERVICE SECTIONS ─── */}
      {services.map((service) => (
        <ServiceSection key={service.number} service={service} />
      ))}

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/8 blur-[80px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Ready to turn your patents into a growth engine?
          </h2>
          <p className="mt-4 text-base text-white/50">
            Our senior-level advisors are ready to assess your needs and identify
            the right combination of services for your business.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────── sub-components ──────────────────── */

function ServiceSection({
  service,
}: {
  service: (typeof services)[number];
}) {
  const { ref, visible } = useReveal(0.1);
  const isLight = service.bg === "light";

  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 ${isLight ? "bg-[#f8fafc]" : "bg-white"}`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Top: info + highlights */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm font-light text-[#9ca3af]">
                {service.number}
              </span>
              <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
                Service
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
              {service.title}
            </h2>
            <p className="mt-1 text-base font-medium text-[#1d4ed8]">
              {service.tagline}
            </p>
            <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
              {service.description}
            </p>
            <Link
              href={service.href}
              className="mt-6 inline-flex items-center text-base font-semibold text-[#1d4ed8] hover:text-[#1e40af] transition-colors"
            >
              Learn More &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {service.highlights.map((highlight, i) => {
              const [bold, ...rest] = highlight.split(" — ");
              const detail = rest.join(" — ");
              return (
                <div
                  key={highlight}
                  className={`border-l-2 border-[#1d4ed8] pl-5 py-2 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={
                    visible
                      ? undefined
                      : { transitionDelay: `${300 + i * 120}ms` }
                  }
                >
                  <h3 className="text-sm font-bold text-[#0c1425]">{bold}</h3>
                  {detail && (
                    <p className="mt-1 text-sm text-[#6b7280] leading-relaxed">
                      {detail}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual */}
        {service.number === "01" && <StrategicWheel visible={visible} />}
        {service.number === "02" && <LandscapeMini visible={visible} />}
        {service.number === "03" && <LifecycleMini visible={visible} />}
        {service.number === "04" && <WhoWeServeMini visible={visible} />}
      </div>
    </section>
  );
}

/* ─── Integrated visuals ─── */

const wheelSegments = [
  "Patent Landscaping", "Commercial Landscaping", "Whitespace Analysis",
  "Full Patent Prosecution", "Valuation", "Licensing", "Enforcement & Monetization",
];

function StrategicWheel({ visible }: { visible: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const colors = ["#0c1425","#0f1a2e","#121f37","#152440","#182949","#1b2e52","#1e335b"];

  return (
    <div className={`mt-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="flex items-stretch gap-3">
        {/* Service segments */}
        {wheelSegments.map((label, i) => {
          const isH = hovered === i;
          return (
            <div key={label} className="flex-1 flex items-stretch gap-3">
            <div
              className="flex-1 rounded-lg flex items-center justify-center py-5 px-2 cursor-pointer text-center shadow-sm"
              style={{
                backgroundColor: colors[i],
                filter: isH ? "brightness(1.8)" : "brightness(1)",
                transform: isH ? "scale(1.05)" : "scale(1)",
                transition: "all 0.2s",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <span
                className="text-white font-semibold leading-tight"
                style={{ fontSize: isH ? "13px" : "11px", transition: "font-size 0.2s" }}
              >
                {label}
              </span>
            </div>
            {i < wheelSegments.length - 1 && (
              <div className="flex items-center text-[#9ca3af] flex-shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LandscapeMini({ visible }: { visible: boolean }) {
  return (
    <div className={`mt-10 grid grid-cols-1 sm:grid-cols-[3fr_2fr] gap-6 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      {/* Left: Patent Landscape */}
      <div className="rounded-lg overflow-hidden border border-[#e5e7eb] shadow-sm">
        <div className="bg-[#111c32] px-4 py-2 flex items-center justify-between">
          <span className="text-[10px] font-bold text-white">AiPi Solutions</span>
          <div className="flex gap-3">
            {["Background","Analysis","Disclosures","Analytics","Library"].map((t, i) => (
              <span key={t} className={`text-[8px] ${i === 2 ? "text-white font-semibold border-b border-white pb-0.5" : "text-white/50"}`}>{t}</span>
            ))}
          </div>
        </div>
        <div className="bg-[#111c32] grid grid-cols-4 divide-x divide-white/10">
          {[{v:"110",l:"Patents"},{v:"15",l:"Disclosures"},{v:"50",l:"Competitors"},{v:"10",l:"Features"}].map((s) => (
            <div key={s.l} className="py-2.5 text-center">
              <p className="text-base font-bold text-white">{s.v}</p>
              <p className="text-[8px] text-white/70">{s.l}</p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 space-y-3">
          {/* Patent card with radar chart */}
          <div className="border border-[#e5e7eb] rounded p-3 flex gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-semibold text-[#1d4ed8]">US11954151</span>
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">ACTIVE</span>
              </div>
              <p className="text-[10px] font-semibold text-[#0c1425]">Natural language processing for searching security video data</p>
              <p className="text-[9px] text-[#9ca3af] mt-0.5">Coram AI Inc &middot; Filed: 2023-09-08</p>
            </div>
            <svg viewBox="0 0 200 200" className="w-24 h-24 flex-shrink-0">
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i * 45 - 90) * (Math.PI / 180);
                return (
                  <line key={`ax-${i}`} x1={100} y1={100} x2={100 + 75 * Math.cos(a)} y2={100 + 75 * Math.sin(a)} stroke="#e5e7eb" strokeWidth="0.5" />
                );
              })}
              {[0.33, 0.66, 1].map((s) => (
                <polygon key={s} points={Array.from({ length: 8 }, (_, i) => { const a = (i * 45 - 90) * (Math.PI / 180); return `${100 + 75 * s * Math.cos(a)},${100 + 75 * s * Math.sin(a)}`; }).join(" ")} fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              ))}
              <polygon points={[70, 35, 55, 72, 20, 60, 42, 15].map((r, i) => { const a = (i * 45 - 90) * (Math.PI / 180); return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`; }).join(" ")} fill="rgba(99,102,241,0.12)" stroke="#6366f1" strokeWidth="1.5" />
              {[70, 35, 55, 72, 20, 60, 42, 15].map((r, i) => { const a = (i * 45 - 90) * (Math.PI / 180); return <circle key={`pt-${i}`} cx={100 + r * Math.cos(a)} cy={100 + r * Math.sin(a)} r="2.5" fill="#6366f1" />; })}
            </svg>
          </div>
          {/* Reference Library mini table */}
          <div>
            <h3 className="text-[10px] font-bold text-[#0c1425] mb-1.5">Reference Library</h3>
            <div className="border border-[#e5e7eb] rounded overflow-hidden">
              <div className="grid grid-cols-4 text-[8px] font-semibold text-[#6b7280] uppercase tracking-wider bg-[#f8fafc] px-2.5 py-1.5 border-b border-[#e5e7eb]">
                <span>Publication</span><span>Assignee</span><span>Filed</span><span>Status</span>
              </div>
              {[
                { pub: "EP4621737", assignee: "Milestone Systems", date: "2025-03", status: "PENDING", color: "text-yellow-600 bg-yellow-50" },
                { pub: "US12131536", assignee: "Movidius Ltd", date: "2022-08", status: "ACTIVE", color: "text-green-600 bg-green-50" },
                { pub: "WO2020008025", assignee: "Movidius Ltd", date: "2019-07", status: "CEASED", color: "text-red-600 bg-red-50" },
              ].map((row) => (
                <div key={row.pub} className="grid grid-cols-4 text-[9px] px-2.5 py-1.5 border-b border-[#f1f5f9] last:border-0">
                  <span className="text-[#1d4ed8] font-medium">{row.pub}</span>
                  <span className="text-[#4b5563]">{row.assignee}</span>
                  <span className="text-[#9ca3af]">{row.date}</span>
                  <span className={`text-[8px] font-semibold px-1 py-0.5 rounded w-fit ${row.color}`}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Ag Platform */}
      <div className="rounded-lg overflow-hidden bg-[#0c1425] border border-[#1a2a47]">
        <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/5">
          <span className="text-[10px] text-white/60"><span className="font-bold text-white/80">AiPi</span> <span className="font-bold text-green-400">Ag</span> <span className="text-[9px]">Analysis Platform</span></span>
        </div>
        {/* Mini heatmap */}
        <div className="p-3">
          <div className="bg-white/5 rounded p-3 aspect-[16/9] relative overflow-hidden">
            <svg viewBox="0 0 320 180" className="w-full h-full">
              {Array.from({ length: 12 }, (_, row) =>
                Array.from({ length: 22 }, (_, col) => {
                  const inUS = col > 1 && col < 20 && row > 1 && row < 11 && !(col > 15 && row < 3) && !(col < 3 && row > 8);
                  if (!inUS) return null;
                  const intensity = Math.sin(col * 0.6) * Math.cos(row * 0.5) * 0.5 + 0.3;
                  const green = Math.round(100 + intensity * 155);
                  return (
                    <rect key={`${row}-${col}`} x={col * 14 + 4} y={row * 14 + 4} width="13" height="13" rx="1"
                      fill={`rgb(${Math.round(30 - intensity * 20)}, ${green}, ${Math.round(50 - intensity * 30)})`}
                      opacity={0.6 + intensity * 0.4} />
                  );
                })
              )}
            </svg>
            <div className="absolute bottom-1.5 left-2 text-[8px] text-white/50">Crop Acreage — CDL 2025</div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-white/5 rounded p-2.5">
              <p className="text-[8px] text-white/50">Selected County</p>
              <p className="text-xs font-semibold text-white mt-0.5">Fresno, CA</p>
            </div>
            <div className="bg-white/5 rounded p-2.5">
              <p className="text-[8px] text-white/50">Top Crop</p>
              <p className="text-xs font-semibold text-white mt-0.5">Almonds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LifecycleMini({ visible }: { visible: boolean }) {
  const items = [
    { label: "Fundraising Strategy", icon: "DOLLAR" },
    { label: "Innovation Strategy", icon: "M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" },
    { label: "Regulatory Support & Logistics", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { label: "Operations Scaling & Commercialisation", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
    { label: "Business Owner Exit Planning", icon: "COINS" },
  ];

  return (
    <div className={`mt-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="flex items-start justify-center max-w-4xl mx-auto">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-start">
            <div className="group flex flex-col items-center text-center w-32">
              <div className="w-16 h-16 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {item.icon === "DOLLAR" ? (
                  <span className="text-2xl font-normal text-[#1d4ed8]">$</span>
                ) : item.icon === "COINS" ? (
                  <svg className="w-7 h-7 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <ellipse cx="12" cy="17" rx="7" ry="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 17v-3c0 1.657 3.134 3 7 3s7-1.343 7-3v3" />
                    <ellipse cx="12" cy="11" rx="7" ry="3" strokeLinecap="round" strokeLinejoin="round" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11V8c0 1.657 3.134 3 7 3s7-1.343 7-3v3" />
                    <ellipse cx="12" cy="5" rx="7" ry="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg className="w-7 h-7 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                )}
              </div>
              <span className="mt-3 text-xs font-medium text-[#0c1425] leading-tight">{item.label}</span>
            </div>
            {i < items.length - 1 && (
              <div className="hidden sm:flex items-center h-16 px-3 text-[#9ca3af] text-sm">&rarr;</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function WhoWeServeMini({ visible }: { visible: boolean }) {
  const constituencies = [
    { title: "Corporate Patent Holders", desc: "Creative financing to pursue claims while sharing risk.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { title: "Law Firms", desc: "Alternative financing arrangements for clients pursuing enforcement.", icon: "SCALES" },
    { title: "Investors", desc: "High returns not correlated to broader capital markets.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  ];

  return (
    <div className={`mt-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
        {constituencies.map((item) => (
          <div key={item.title} className="group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              {item.icon === "SCALES" ? (
                <svg className="w-7 h-7 text-[#1d4ed8]" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="32" y1="8" x2="32" y2="56" />
                  <line x1="22" y1="56" x2="42" y2="56" />
                  <line x1="8" y1="16" x2="56" y2="16" />
                  <circle cx="32" cy="12" r="4" fill="currentColor" />
                  <line x1="14" y1="16" x2="10" y2="36" /><line x1="14" y1="16" x2="18" y2="36" />
                  <path d="M6 36h16" /><path d="M6 36 C6 44 22 44 22 36" fill="currentColor" opacity="0.15" />
                  <line x1="50" y1="16" x2="46" y2="36" /><line x1="50" y1="16" x2="54" y2="36" />
                  <path d="M42 36h16" /><path d="M42 36 C42 44 58 44 58 36" fill="currentColor" opacity="0.15" />
                </svg>
              ) : (
                <svg className="w-7 h-7 text-[#1d4ed8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              )}
            </div>
            <h3 className="text-sm font-bold text-[#0c1425] mb-1">{item.title}</h3>
            <p className="text-xs text-[#6b7280] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
