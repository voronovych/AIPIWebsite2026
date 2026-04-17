"use client";

import { useState } from "react";

const pillars = [
  {
    id: "technology",
    label: "Technology",
    height: "h-48",
    description:
      "Develop, scale, and monetize your products, services, and patents with our world-first Growth Landscaping and AI-driven analyses.",
  },
  {
    id: "strategy",
    label: "Corporate Strategy",
    height: "h-64",
    description:
      "We craft tailored corporate strategies that align IP portfolios with business goals, ensuring every decision drives long-term value.",
  },
  {
    id: "bizdev",
    label: "Business Development",
    height: "h-72",
    description:
      "Accelerate revenue and growth through strategic partnerships, licensing programs, and market expansion powered by patent intelligence.",
  },
  {
    id: "ip-licensing",
    label: "IP Licensing",
    height: "h-44",
    description:
      "Unlock recurring revenue streams by identifying and executing high-value licensing opportunities across your patent portfolio.",
  },
  {
    id: "valuation",
    label: "Valuation",
    height: "h-52",
    description:
      "Rigorous valuation frameworks that quantify your patent portfolio's worth and communicate real value to stakeholders and investors.",
  },
  {
    id: "litigation",
    label: "Litigation Finance",
    height: "h-60",
    description:
      "Strategic financing solutions for patent enforcement and defense, minimizing risk while maximizing enforcement outcomes.",
  },
  {
    id: "fundraising",
    label: "Fundraising",
    height: "h-60",
    description:
      "End-to-end fundraising support from pitch preparation to investor introductions, backed by grounded financial models.",
  },
  {
    id: "patents",
    label: "Patents",
    height: "",
    description:
      "Patents form the foundation of everything we do — from protection and monetization to strategic positioning and market intelligence.",
  },
];

export default function StrategicServicesGraphic({
  onPillarClick,
}: {
  onPillarClick?: (id: string) => void;
}) {
  const [active, setActive] = useState<string | null>(null);

  const activePillar = pillars.find((p) => p.id === active);

  return (
    <div className="flex flex-col items-stretch w-full">
      {/* Vertical pillars */}
      <div className="flex items-end gap-3">
        {pillars.filter((p) => p.id !== "patents").map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setActive(active === p.id ? null : p.id);
              onPillarClick?.(p.id);
            }}
            className={`
              ${p.height} flex-1 min-w-0 rounded-lg border-2 border-white
              flex items-center justify-center cursor-pointer
              transition-colors duration-200 overflow-hidden
              ${active === p.id ? "bg-[#1d4ed8]" : "bg-transparent hover:bg-white/20"}
            `}
          >
            <span className="-rotate-90 whitespace-nowrap text-base font-semibold text-white tracking-wide select-none">
              {p.label}
            </span>
          </button>
        ))}
      </div>

      {/* Patents base bar */}
      <button
        onClick={() => {
          setActive(active === "patents" ? null : "patents");
          onPillarClick?.("patents");
        }}
        className={`
          mt-2 w-full h-16 rounded-lg border-2 border-white
          flex items-center justify-center cursor-pointer
          transition-colors duration-200
          ${active === "patents" ? "bg-[#1d4ed8]" : "bg-white hover:bg-white/80"}
        `}
      >
        <span className="text-lg font-semibold text-black tracking-wide select-none">
          Patents
        </span>
      </button>

      {/* Dropdown panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          activePillar ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {activePillar && (
          <div className="rounded-lg border border-white/20 bg-white/5 px-6 py-5">
            <h3 className="text-lg font-bold text-white">{activePillar.label}</h3>
            <p className="mt-2 text-base text-white/60 leading-relaxed">
              {activePillar.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
