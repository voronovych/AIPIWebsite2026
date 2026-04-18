"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import ericHeadshot from "@/assets/headshots/Eric_Morehouse_Color.webp";
import joeHeadshot from "@/assets/headshots/Joe_Eaton_Color.jpg";
import meteHeadshot from "@/assets/headshots/MeteOzmen.png";
import drewHeadshot from "@/assets/headshots/DrewDavis.png";
import jennHeadshot from "@/assets/headshots/Jenn.jpeg";
import alexHeadshot from "@/assets/headshots/AlexanderGalambos.png";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

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

const offices = [
  { city: "Vienna, VA", country: "USA", type: "headquarters" as const },
  { city: "Cambridge", country: "UK", type: "office" as const },
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Ireland",
  "Germany",
  "Switzerland",
  "Austria",
  "Finland",
  "Bulgaria",
  "Turkey",
];

const executiveTeam = [
  {
    name: "Eric Morehouse",
    title: "Founder, Managing Director",
    bio: "Veteran IP attorney and entrepreneur with over 30 years' experience advising clients including the DoD on commercialising cutting-edge IP.",
    image: ericHeadshot,
  },
  {
    name: "Joe Eaton",
    title: "CTO, Managing Director",
    bio: "One of America's leading AI scientists and managers with 13 years' service at NVIDIA, culminating as Distinguished System Engineer for Data & Graph Analytics.",
    image: joeHeadshot,
    flip: true,
  },
  {
    name: "Mete Ozmen",
    title: "Chief Operating Officer",
    subtitle: "Head of Litigation Financing & Services",
    bio: "International business development and corporate finance executive with over 20 years' experience of innovative product go-to-market in EMEA and the USA.",
    image: meteHeadshot,
  },
];

const bizDevTeam = [
  {
    name: "Drew Davis",
    title: "Senior VP of Worldwide Business Development",
    bio: "Oxford-educated COO and Chief of Staff with multi-sector organisational experience building teams to solve complex operational challenges.",
    image: drewHeadshot,
  },
  {
    name: "Jennifer Hayes",
    title: "VP of North American Business Development",
    bio: "Experienced business development executive driving growth and strategic partnerships across North American markets.",
    image: jennHeadshot,
  },
  {
    name: "Alexander Galambos",
    title: "VP of European Business Development",
    bio: "Seasoned business development leader with deep expertise across European markets, connecting innovators with strategic opportunities.",
    image: alexHeadshot,
  },
];

/* ───────────────────── map markers ──────────────────── */
const markers: { name: string; coordinates: [number, number]; office?: boolean }[] = [
  { name: "United States", coordinates: [-77.26, 38.88], office: true },
  { name: "Canada", coordinates: [-75.69, 45.42] },
  { name: "United Kingdom", coordinates: [0.12, 52.2], office: true },
  { name: "Ireland", coordinates: [-6.26, 53.35] },
  { name: "Germany", coordinates: [10.45, 51.16] },
  { name: "Switzerland", coordinates: [8.23, 46.82] },
  { name: "Austria", coordinates: [14.55, 47.52] },
  { name: "Finland", coordinates: [25.75, 61.92] },
  { name: "Bulgaria", coordinates: [25.49, 42.7] },
  { name: "Turkey", coordinates: [32.86, 39.93] },
];

/* ───────────────────── component ───────────────────── */

export default function AboutContent() {
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
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-end">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-[#3b82f6]" />
                <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
                  About AiPi
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
                11 years accelerating the{" "}
                <span className="text-white/40">value of innovation</span>
              </h1>
              <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
                Founded in 2015, AiPi is a multidisciplinary team of IP attorneys,
                AI scientists, finance executives, and business development
                professionals. We provide a suite of strategic services beyond the
                capabilities of traditional consultancies.
              </p>
              <div className="mt-8">
                <Link
                  href="/contact"
                  className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
                >
                  Work With AiPi
                </Link>
              </div>
            </div>

            {/* Founded stat */}
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-8xl font-bold tracking-tight text-white/5">
                2015
              </span>
              <div className="mt-2 text-right">
                <p className="text-base font-semibold text-white">Est. 2015</p>
                <p className="text-sm text-white/40">
                  Vienna, VA &middot; Cambridge, UK
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="bg-white border-b border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#e5e7eb]">
            {[
              { value: "11+", label: "Years in business" },
              { value: "$250M+", label: "Value created" },
              { value: "10,000+", label: "Patents assessed" },
              { value: "2", label: "Permanent offices" },
            ].map((stat) => (
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

      {/* ─── GLOBAL PRESENCE MAP ─── */}
      <MapSection />

      {/* ─── EXECUTIVE TEAM ─── */}
      <TeamSection />

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Have a question or want to explore how AiPi can support your
            innovation strategy?
          </h2>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-8 py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
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

function MapSection() {
  const { ref, visible } = useReveal();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-12">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Global Presence
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            Offices in the US and UK, serving innovators across two continents
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-start">
          {/* Map */}
          <div className="relative bg-[#0c1425] rounded-lg overflow-hidden">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [-38, 48],
                scale: 270,
              }}
              width={800}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const geoName = geo.properties.name;
                    // Map geo names to our marker names
                    const nameMap: Record<string, string> = {
                      "United States of America": "United States",
                    };
                    const mappedName = nameMap[geoName] || geoName;
                    const marker = markers.find((m) => m.name === mappedName);
                    const isOfficeCountry = marker?.office;
                    const isActiveMarket = !!marker && !marker.office;
                    const isHovered = hoveredCountry === mappedName;

                    let fill = "#1a2a47";
                    if (isOfficeCountry) fill = isHovered ? "#2558b0" : "#1d4ed8";
                    else if (isActiveMarket) fill = isHovered ? "#3b6fa8" : "#2d5f94";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fill}
                        stroke="#0c1425"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (marker) setHoveredCountry(mappedName);
                        }}
                        onMouseLeave={() => setHoveredCountry(null)}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {markers.map((marker) => {
                const isOffice = marker.office;
                const isHovered = hoveredCountry === marker.name;

                return (
                  <Marker
                    key={marker.name}
                    coordinates={marker.coordinates}
                    onMouseEnter={() => setHoveredCountry(marker.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                  >
                    {/* Glow ring */}
                    <circle
                      r={isOffice ? 12 : 8}
                      fill={isHovered || isOffice ? "#1d4ed8" : "transparent"}
                      opacity={isHovered ? 0.25 : isOffice ? 0.15 : 0}
                      style={{ transition: "all 0.3s" }}
                    />
                    {/* Dot */}
                    <circle
                      r={isOffice ? 5 : 3}
                      fill={isOffice ? "#1d4ed8" : isHovered ? "#3b82f6" : "#6b7280"}
                      stroke="white"
                      strokeWidth={isOffice ? 2 : 1}
                      style={{ cursor: "pointer", transition: "all 0.3s" }}
                    />
                    {/* Label — always visible for offices, hover-only for active markets */}
                    <text
                      textAnchor="middle"
                      y={isOffice ? 22 : 18}
                      style={{
                        fill: "white",
                        fontSize: isOffice ? "10px" : "9px",
                        fontWeight: isOffice ? 600 : 400,
                        pointerEvents: "none",
                        opacity: isOffice || isHovered ? 1 : 0,
                        transition: "opacity 0.15s",
                      }}
                    >
                      {marker.name}
                    </text>
                    {isOffice && (
                      <text
                        textAnchor="middle"
                        y={33}
                        style={{
                          fill: "#3b82f6",
                          fontSize: "7px",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          pointerEvents: "none",
                        }}
                      >
                        OFFICE
                      </text>
                    )}
                  </Marker>
                );
              })}
            </ComposableMap>

            {/* Legend */}
            <div className="absolute bottom-4 left-6 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1d4ed8] border-2 border-white" />
                <span className="text-xs text-white/40">Permanent Office</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#6b7280] border border-white" />
                <span className="text-xs text-white/40">Active Market</span>
              </div>
            </div>
          </div>

          {/* Office details + country list */}
          <div>
            <h3 className="text-lg font-bold text-[#0c1425] mb-6">
              Permanent Offices
            </h3>
            <div className="space-y-4 mb-10">
              {offices.map((office) => (
                <div
                  key={office.city}
                  className="flex items-start gap-3 p-4 border border-[#e5e7eb] bg-white"
                >
                  <div className="mt-1 w-3 h-3 rounded-full bg-[#1d4ed8] flex-shrink-0" />
                  <div>
                    <p className="text-base font-semibold text-[#0c1425]">
                      {office.city}
                    </p>
                    <p className="text-sm text-[#6b7280]">{office.country}</p>
                    {office.type === "headquarters" && (
                      <span className="inline-block mt-1 text-xs font-medium text-[#1d4ed8] bg-[#1d4ed8]/10 px-2 py-0.5 rounded-full">
                        Headquarters
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-bold text-[#0c1425] mb-4">
              Countries We Serve
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {countries.map((country) => (
                <div
                  key={country}
                  className="flex items-center gap-2 py-1.5 text-sm text-[#4b5563] hover:text-[#0c1425] transition-colors cursor-default"
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors duration-300 ${
                      markers.find((m) => m.name === country)?.office
                        ? "bg-[#1d4ed8]"
                        : hoveredCountry === country
                          ? "bg-[#3b82f6]"
                          : "bg-[#9ca3af]"
                    }`}
                  />
                  {country}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamMemberCard({
  member,
  visible,
  delay,
}: {
  member: { name: string; title: string; subtitle?: string; bio: string; image: typeof ericHeadshot; flip?: boolean };
  visible: boolean;
  delay: number;
}) {
  return (
    <div
      className={`group transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative overflow-hidden bg-[#f8fafc] aspect-[4/5] mb-5">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={`object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 ${member.flip ? "-scale-x-100" : ""}`}
        />
      </div>
      <h3 className="text-lg font-bold text-[#0c1425]">{member.name}</h3>
      <p className="text-sm font-medium text-[#1d4ed8] mt-0.5">
        {member.title}
      </p>
      {member.subtitle && (
        <p className="text-sm text-[#6b7280] mt-0.5">{member.subtitle}</p>
      )}
      <p className="mt-3 text-sm text-[#6b7280] leading-relaxed">
        {member.bio}
      </p>
    </div>
  );
}

function TeamSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Executive Team */}
        <div className="text-center mb-14">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Leadership
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            Executive Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {executiveTeam.map((member, i) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              visible={visible}
              delay={200 + i * 150}
            />
          ))}
        </div>

        {/* Business Development Team */}
        <div className="text-center mt-20 mb-14">
          <h2 className="text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            Business Development
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {bizDevTeam.map((member, i) => (
            <TeamMemberCard
              key={member.name}
              member={member}
              visible={visible}
              delay={200 + i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
