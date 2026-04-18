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

/* ───────────────────── component ───────────────────────── */

export default function TechnologyContent() {
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
                Technology
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              Proprietary AI platforms{" "}
              <span className="text-white/40">built for real decisions</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
              We don&apos;t just advise — we build. AiPi develops proprietary
              software platforms powered by AI, knowledge graphs, and
              geospatial intelligence that transform raw data into competitive
              advantage.
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              <Link
                href="/contact"
                className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors"
              >
                See a Demo
              </Link>
              <Link
                href="#platforms"
                className="text-base font-medium text-white/50 hover:text-white transition-colors"
              >
                Explore Platforms &darr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM 1: PATENT LANDSCAPE ─── */}
      <section id="platforms" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PatentLandscapeSection />
        </div>
      </section>

      {/* ─── KNOWLEDGE GRAPH VISUAL ─── */}
      <KnowledgeGraphSection />

      {/* ─── PLATFORM 2: AGRICULTURAL ANALYSIS ─── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AgAnalysisSection />
        </div>
      </section>

      {/* ─── CROP PREDICTION ─── */}
      <CropPredictionSection />

      {/* ─── CTA ─── */}
      <section className="bg-[#0c1425] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#1d4ed8]/8 blur-[80px]" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl tracking-tight">
            Interested in what our platforms can do for your business?
          </h2>
          <p className="mt-4 text-base text-white/50">
            We build custom intelligence platforms for organizations that need
            more than off-the-shelf tools.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-6 py-2.5 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ───────────────────── sub-components ──────────────────── */

function PatentLandscapeSection() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div>
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Platform One
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
            Patent Landscape Intelligence
          </h2>
          <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
            Our proprietary landscape system generates structured competitive
            intelligence reports — mapping your IP position against the entire
            patent landscape in your domain. Each report includes patentability
            analysis, competitor mapping, disclosure depth scoring, and a
            filterable reference library.
          </p>

          <div className="mt-8 space-y-4">
            {[
              {
                title: "Competitive Analysis",
                detail:
                  "Direct competitor identification with feature-by-feature comparison across the patent landscape.",
              },
              {
                title: "Disclosure Depth Scoring",
                detail:
                  "Radar charts visualizing how deeply each patent discloses across your technology's key features.",
              },
              {
                title: "Filterable Reference Library",
                detail:
                  "Searchable database of relevant patents with assignee, filing date, status, and full-text access.",
              },
              {
                title: "Analytics Dashboard",
                detail:
                  "Quantitative insights on filing trends, geographic coverage, and competitive positioning.",
              },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`border-l-2 border-[#1d4ed8] pl-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={visible ? undefined : { transitionDelay: `${300 + i * 100}ms` }}
              >
                <h3 className="text-sm font-bold text-[#0c1425]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-[#6b7280] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Report preview mockup — matches real aipitools.com */}
        <div className="relative rounded-lg overflow-hidden border border-[#e5e7eb] shadow-lg">
          {/* Browser chrome */}
          <div className="bg-[#f1f5f9] px-4 py-2.5 flex items-center gap-2 border-b border-[#e5e7eb]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4 bg-white rounded px-3 py-1 text-[10px] text-[#9ca3af] text-center">
              aipitools.com/report
            </div>
          </div>

          {/* Dark header with nav */}
          <div className="bg-[#111c32] px-5 py-3 flex items-center justify-between">
            <span className="text-xs font-bold text-white tracking-wide">AiPi Solutions</span>
            <div className="flex gap-4">
              {["Background", "Competitive Analysis", "Disclosures", "Analytics", "Reference Library"].map(
                (tab, i) => (
                  <span
                    key={tab}
                    className={`text-[10px] ${i === 2 ? "text-white font-semibold border-b border-white pb-0.5" : "text-white/50"}`}
                  >
                    {tab}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Stats bar */}
          <div className="bg-[#111c32] grid grid-cols-4 divide-x divide-white/10">
            {[
              { val: "110", label: "Patents Analyzed" },
              { val: "15", label: "Deep-Dive Disclosures" },
              { val: "50", label: "Competitors with IP" },
              { val: "10", label: "Features Assessed" },
            ].map((s) => (
              <div key={s.label} className="py-3 text-center">
                <p className="text-lg font-bold text-white">{s.val}</p>
                <p className="text-[10px] text-white/80">{s.label}</p>
              </div>
            ))}
          </div>

          {/* White content area */}
          <div className="bg-white p-5 space-y-4">
            {/* Section header */}
            <div>
              <span className="text-[10px] text-[#9ca3af]">03</span>
              <h3 className="text-sm font-bold text-[#0c1425] mt-0.5">Most Relevant Disclosures</h3>
              <p className="text-[10px] text-[#6b7280] mt-1">
                Each patent includes a radar chart showing depth of disclosure across each feature.
              </p>
            </div>

            {/* Patent card with radar */}
            <div className="border border-[#e5e7eb] rounded-lg p-4 flex gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-[#1d4ed8]">US11954151</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-50 text-green-600 font-medium">ACTIVE</span>
                </div>
                <p className="text-xs font-semibold text-[#0c1425]">Natural language processing for searching security video data</p>
                <p className="text-[10px] text-[#9ca3af] mt-0.5">Coram AI Inc &middot; Filed: 2023-09-08</p>
              </div>
              <svg viewBox="0 0 200 200" className="w-36 h-36 flex-shrink-0">
                {/* Axis lines */}
                {Array.from({ length: 8 }, (_, i) => {
                  const a = (i * 45 - 90) * (Math.PI / 180);
                  return (
                    <line
                      key={`axis-${i}`}
                      x1={100}
                      y1={100}
                      x2={100 + 75 * Math.cos(a)}
                      y2={100 + 75 * Math.sin(a)}
                      stroke="#e5e7eb"
                      strokeWidth="0.5"
                    />
                  );
                })}
                {/* Grid rings */}
                {[0.33, 0.66, 1].map((s) => (
                  <polygon
                    key={s}
                    points={Array.from({ length: 8 }, (_, i) => {
                      const a = (i * 45 - 90) * (Math.PI / 180);
                      return `${100 + 75 * s * Math.cos(a)},${100 + 75 * s * Math.sin(a)}`;
                    }).join(" ")}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="0.5"
                  />
                ))}
                {/* Data polygon */}
                <polygon
                  points={[70, 35, 55, 72, 20, 60, 42, 15].map((r, i) => {
                    const a = (i * 45 - 90) * (Math.PI / 180);
                    return `${100 + r * Math.cos(a)},${100 + r * Math.sin(a)}`;
                  }).join(" ")}
                  fill="rgba(99,102,241,0.12)"
                  stroke="#6366f1"
                  strokeWidth="1.5"
                />
                {/* Data points */}
                {[70, 35, 55, 72, 20, 60, 42, 15].map((r, i) => {
                  const a = (i * 45 - 90) * (Math.PI / 180);
                  return (
                    <circle
                      key={`pt-${i}`}
                      cx={100 + r * Math.cos(a)}
                      cy={100 + r * Math.sin(a)}
                      r="2.5"
                      fill="#6366f1"
                    />
                  );
                })}
                {/* Axis labels */}
                {[
                  "Real-time video...",
                  "NL search over...",
                  "Privacy-preserving...",
                  "On-premises site...",
                  "Drone-mounted...",
                  "HW governance...",
                  "Retrofittable...",
                  "Cross-device...",
                ].map((label, i) => {
                  const a = (i * 45 - 90) * (Math.PI / 180);
                  const lx = 100 + 90 * Math.cos(a);
                  const ly = 100 + 90 * Math.sin(a);
                  return (
                    <text
                      key={`lbl-${i}`}
                      x={lx}
                      y={ly}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="#9ca3af"
                      fontSize="5"
                    >
                      {label}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Reference table preview */}
            <div>
              <h3 className="text-sm font-bold text-[#0c1425] mb-2">Reference Library</h3>
              <div className="border border-[#e5e7eb] rounded overflow-hidden">
                <div className="grid grid-cols-4 text-[9px] font-semibold text-[#6b7280] uppercase tracking-wider bg-[#f8fafc] px-3 py-2 border-b border-[#e5e7eb]">
                  <span>Publication</span><span>Assignee</span><span>Filed</span><span>Status</span>
                </div>
                {[
                  { pub: "EP4621737", assignee: "Milestone Systems", date: "2025-03", status: "PENDING", color: "text-yellow-600 bg-yellow-50" },
                  { pub: "US12131536", assignee: "Movidius Ltd", date: "2022-08", status: "ACTIVE", color: "text-green-600 bg-green-50" },
                  { pub: "WO2020008025", assignee: "Movidius Ltd", date: "2019-07", status: "CEASED", color: "text-red-600 bg-red-50" },
                ].map((row) => (
                  <div key={row.pub} className="grid grid-cols-4 text-[10px] px-3 py-2 border-b border-[#f1f5f9] last:border-0">
                    <span className="text-[#1d4ed8] font-medium">{row.pub}</span>
                    <span className="text-[#4b5563]">{row.assignee}</span>
                    <span className="text-[#9ca3af]">{row.date}</span>
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded w-fit ${row.color}`}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KnowledgeGraphSection() {
  const { ref, visible } = useReveal();
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Node types: patent (yellow), inventor (pink/red), assignee (blue), examiner (light blue)
  type GNode = { x: number; y: number; size: number; color: string; label?: string };

  // Hub nodes (central patents)
  const hubs: GNode[] = [
    { x: 250, y: 250, size: 10, color: "#eab308", label: "18077313" },
    { x: 140, y: 180, size: 10, color: "#eab308", label: "17767631" },
    { x: 370, y: 200, size: 8, color: "#eab308", label: "16234891" },
    { x: 200, y: 370, size: 8, color: "#eab308", label: "15998742" },
    { x: 340, y: 350, size: 7, color: "#eab308", label: "17112489" },
  ];

  // Inventor nodes (red/pink) — branch out from patents
  const inventors: GNode[] = [
    { x: 100, y: 130, size: 6, color: "#ef4444", label: "STEFFEN, S." },
    { x: 80, y: 190, size: 5, color: "#ef4444", label: "MICHAEL, P." },
    { x: 60, y: 160, size: 5, color: "#f87171" },
    { x: 120, y: 100, size: 4, color: "#f87171" },
    { x: 310, y: 140, size: 5, color: "#ef4444", label: "CHEN, W." },
    { x: 420, y: 160, size: 5, color: "#ef4444" },
    { x: 160, y: 420, size: 5, color: "#f87171" },
    { x: 250, y: 430, size: 4, color: "#ef4444" },
    { x: 400, y: 320, size: 5, color: "#f87171" },
    { x: 380, y: 400, size: 4, color: "#ef4444" },
  ];

  // Assignee nodes (blue) — fan out
  const assignees: GNode[] = [
    { x: 180, y: 60, size: 7, color: "#60a5fa", label: "CAPE GMBH" },
    { x: 320, y: 70, size: 6, color: "#60a5fa" },
    { x: 440, y: 260, size: 6, color: "#3b82f6" },
    { x: 450, y: 110, size: 5, color: "#60a5fa" },
    { x: 70, y: 290, size: 5, color: "#3b82f6" },
    { x: 100, y: 350, size: 5, color: "#60a5fa" },
  ];

  // Leaf nodes (light blue — examiners, art units)
  const leaves: GNode[] = Array.from({ length: 25 }, (_, i) => {
    // Distribute in fan patterns around hubs
    const hubIdx = i % 5;
    const hub = hubs[hubIdx];
    const angle = ((i * 137.5) % 360) * (Math.PI / 180); // golden angle
    const dist = 60 + (i * 7) % 40;
    return {
      x: Math.round(Math.min(490, Math.max(10, hub.x + dist * Math.cos(angle)))),
      y: Math.round(Math.min(490, Math.max(10, hub.y + dist * Math.sin(angle)))),
      size: 3,
      color: "#93c5fd",
    };
  });

  const allNodes = [...hubs, ...inventors, ...assignees, ...leaves];

  // Edges: connect hubs to their satellites
  const graphEdges: { from: number; to: number; color: string }[] = [];

  // Hub-to-inventor edges (red/purple)
  inventors.forEach((_, i) => {
    const hubIdx = i % hubs.length;
    graphEdges.push({ from: hubIdx, to: hubs.length + i, color: "#a78bfa" });
  });

  // Hub-to-assignee edges (blue)
  assignees.forEach((_, i) => {
    const hubIdx = i % hubs.length;
    graphEdges.push({ from: hubIdx, to: hubs.length + inventors.length + i, color: "#3b82f6" });
  });

  // Hub-to-leaf edges (light)
  leaves.forEach((_, i) => {
    const hubIdx = i % hubs.length;
    graphEdges.push({ from: hubIdx, to: hubs.length + inventors.length + assignees.length + i, color: "#60a5fa" });
  });

  // Hub-to-hub edges
  graphEdges.push({ from: 0, to: 1, color: "#6b7280" });
  graphEdges.push({ from: 0, to: 2, color: "#6b7280" });
  graphEdges.push({ from: 0, to: 3, color: "#6b7280" });
  graphEdges.push({ from: 1, to: 4, color: "#6b7280" });
  graphEdges.push({ from: 2, to: 4, color: "#6b7280" });
  graphEdges.push({ from: 3, to: 4, color: "#6b7280" });

  // Some cross-connections
  graphEdges.push({ from: hubs.length, to: hubs.length + 1, color: "#a78bfa" });
  graphEdges.push({ from: hubs.length + inventors.length, to: hubs.length + inventors.length + 1, color: "#3b82f6" });

  return (
    <section className="bg-[#0c1425] py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className={`grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {/* Graph visualization */}
          <div className="flex justify-center">
            <svg viewBox="0 0 500 500" className="w-full max-w-[600px] h-auto">
              {/* Edges */}
              {graphEdges.map((edge, i) => {
                const isConnected = hoveredNode !== null && (edge.from === hoveredNode || edge.to === hoveredNode);
                const isDimmed = hoveredNode !== null && !isConnected;
                return (
                  <line
                    key={`e-${i}`}
                    x1={allNodes[edge.from].x}
                    y1={allNodes[edge.from].y}
                    x2={allNodes[edge.to].x}
                    y2={allNodes[edge.to].y}
                    stroke={isConnected ? "white" : edge.color}
                    strokeWidth={isConnected ? 1.5 : 1}
                    opacity={isDimmed ? 0.08 : isConnected ? 0.7 : 0.4}
                    style={{ transition: "all 0.3s" }}
                  />
                );
              })}
              {/* Nodes */}
              {allNodes.map((node, i) => {
                const isHovered = hoveredNode === i;
                const isNeighbor = hoveredNode !== null && graphEdges.some(
                  (e) => (e.from === hoveredNode && e.to === i) || (e.to === hoveredNode && e.from === i),
                );
                const isDimmed = hoveredNode !== null && !isHovered && !isNeighbor;

                return (
                <g
                  key={`n-${i}`}
                  onMouseEnter={() => setHoveredNode(i)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ cursor: node.size >= 6 ? "pointer" : "default" }}
                >
                  {/* Glow */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? node.size + 14 : node.size + 6}
                    fill={node.color}
                    opacity={isHovered ? 0.35 : 0.15}
                    style={{ transition: "all 0.3s" }}
                  />
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? node.size + 3 : node.size}
                    fill={node.color}
                    opacity={isDimmed ? 0.3 : 1}
                    style={{ transition: "all 0.3s" }}
                  />
                  {node.label && (
                    <text
                      x={node.x}
                      y={node.y - (isHovered ? node.size + 8 : node.size + 5)}
                      textAnchor="middle"
                      fill={isHovered ? "white" : "rgba(255,255,255,0.8)"}
                      fontSize={isHovered ? "9" : "7"}
                      fontWeight={isHovered ? "700" : "500"}
                      style={{ pointerEvents: "none", transition: "all 0.3s" }}
                    >
                      {node.label}
                    </text>
                  )}
                </g>
                );
              })}

              {/* Legend */}
              <g>
                <circle cx={20} cy={470} r={6} fill="#eab308" />
                <text x={32} y={474} fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="500">Patents</text>
                <circle cx={105} cy={470} r={6} fill="#ef4444" />
                <text x={117} y={474} fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="500">Inventors</text>
                <circle cx={205} cy={470} r={6} fill="#60a5fa" />
                <text x={217} y={474} fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="500">Assignees</text>
                <circle cx={310} cy={470} r={5} fill="#93c5fd" />
                <text x={321} y={474} fill="rgba(255,255,255,0.85)" fontSize="10" fontWeight="500">Citations</text>
              </g>
            </svg>
          </div>

          {/* Text */}
          <div>
            <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
              Coming Soon
            </span>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl leading-tight">
              A knowledge graph of every US patent
            </h2>
            <p className="mt-4 text-base text-white/60 leading-relaxed">
              We&apos;re integrating a comprehensive knowledge graph of all US
              patent information. Each node contains complete bibliographic data
              — assignee history, prosecution history, examiner information,
              citation networks — enriched with semantic embeddings generated via
              NVIDIA NeMo Retriever for deep similarity search.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: "Bibliographic Data", detail: "Full assignee history, inventors, classifications" },
                { label: "Prosecution History", detail: "Office actions, amendments, continuations" },
                { label: "Examiner Intelligence", detail: "Examiner stats, allowance rates, art unit data" },
                { label: "Semantic Embeddings", detail: "NeMo Retriever vectors for deep similarity search" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-white/10 bg-white/[0.03] p-4"
                >
                  <h3 className="text-sm font-bold text-white">{item.label}</h3>
                  <p className="mt-1 text-xs text-white/70 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AgAnalysisSection() {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Map mockup */}
        <div className="relative bg-[#0c1425] rounded-lg p-6 overflow-hidden order-2 lg:order-1">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                <div className="w-3 h-3 rounded-full bg-green-400/60" />
              </div>
              <span className="text-white/60"><span className="text-sm font-bold text-white/80">AiPi</span> <span className="text-sm font-bold text-green-400">Ag</span> <span className="text-[10px]">Analysis Platform</span></span>
            </div>

            {/* US map heatmap mockup */}
            <div className="bg-white/5 rounded-lg p-4 aspect-[16/10] relative overflow-hidden">
              {/* Simplified US shape with colored counties */}
              <svg viewBox="0 0 400 250" className="w-full h-full">
                {/* Generate heatmap grid */}
                {Array.from({ length: 20 }, (_, row) =>
                  Array.from({ length: 30 }, (_, col) => {
                    const inUS =
                      col > 2 && col < 28 && row > 2 && row < 18 &&
                      !(col > 20 && row < 5) &&
                      !(col < 5 && row > 12);
                    if (!inUS) return null;
                    const intensity = Math.sin(col * 0.5) * Math.cos(row * 0.4) * 0.5 + 0.3;
                    const green = Math.round(100 + intensity * 155);
                    return (
                      <rect
                        key={`${row}-${col}`}
                        x={col * 13 + 5}
                        y={row * 13 + 5}
                        width="12"
                        height="12"
                        rx="1"
                        fill={`rgb(${Math.round(30 - intensity * 20)}, ${green}, ${Math.round(50 - intensity * 30)})`}
                        opacity={0.6 + intensity * 0.4}
                      />
                    );
                  }),
                )}
              </svg>
              <div className="absolute bottom-2 left-3 text-[10px] text-white/30">
                <span className="text-white/60">Crop Acreage by County — CDL 2025</span>
              </div>
            </div>

            {/* Sidebar mockup */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded p-3">
                <p className="text-[10px] text-white/60">Selected County</p>
                <p className="text-sm font-semibold text-white mt-1">Fresno, CA</p>
                <p className="text-xs text-white/70 mt-0.5">1,234,567 planted acres</p>
              </div>
              <div className="bg-white/5 rounded p-3">
                <p className="text-[10px] text-white/60">Top Specialty Crop</p>
                <p className="text-sm font-semibold text-white mt-1">Almonds</p>
                <p className="text-xs text-white/70 mt-0.5">342,100 acres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="order-1 lg:order-2">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            Platform Two
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl leading-tight">
            Agricultural Data Intelligence
            <span className="ml-2 align-middle inline-block text-xs font-semibold text-green-600 bg-green-100 px-2.5 py-0.5 rounded-full">Beta</span>
          </h2>
          <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
            Built for agricultural companies, our GroNatural Analysis Platform
            visualizes crop acreage distribution on an interactive map —
            replacing static tables with real-time, filterable geospatial
            intelligence. Users can sort by crop, state, and county, toggle
            layers, and identify land owners and farm data.
          </p>
          <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
            The platform scored 8.6/10 for UI satisfaction and 7.8/10 for data
            robustness in post-alpha client surveys. Data is sourced from the
            USDA Cropland Data Layer, Organic Integrity Database, and Web Soil
            Survey.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Interactive county-level crop acreage maps",
              "Organic vs. conventional acre breakdowns",
              "Multi-year crop rotation history (2022–2025)",
              "Retailer and distributor location overlays",
              "State-relative and national heat map modes",
              "Land owner and parcel-level drill-down",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-[#1d4ed8] mt-0.5 flex-shrink-0"
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
                <span className="text-sm text-[#4b5563]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CropPredictionSection() {
  const { ref, visible } = useReveal();

  return (
    <section className="bg-[#f8fafc] py-16 sm:py-24" ref={ref}>
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        <div className="text-center mb-14">
          <span className="text-sm tracking-widest text-[#1d4ed8] uppercase">
            In Development
          </span>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#0c1425] sm:text-3xl">
            Pixel-Level Crop Prediction
          </h2>
          <p className="mt-4 text-base text-[#4b5563] max-w-2xl mx-auto">
            We&apos;re building a machine learning pipeline to predict crop
            plantings at 30-meter resolution across the entire continental US —
            forecasting CDL 2026 and 2027 before satellite data is available.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              step: "01",
              title: "Data Fusion",
              detail:
                "Align 5 years of CDL history, gSSURGO soil data, and NED terrain data to a unified 30m grid.",
              icon: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
            },
            {
              step: "02",
              title: "Feature Engineering",
              detail:
                "25 features per pixel: crop history, soil properties (pH, clay, AWC), terrain, and spatial coordinates.",
              icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
            },
            {
              step: "03",
              title: "GNN Training",
              detail:
                "Graph Neural Network trained on 50–100M stratified samples with specialty crop oversampling for balanced class representation.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              step: "04",
              title: "National Inference",
              detail:
                "Tiled prediction across 9 billion pixels producing a predicted CDL raster that feeds directly into the existing platform.",
              icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064",
            },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`border border-[#e5e7eb] bg-white p-6 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              style={visible ? undefined : { transitionDelay: `${200 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-[#1d4ed8]/10 flex items-center justify-center mb-4">
                <svg
                  className="w-5 h-5 text-[#1d4ed8]"
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
              </div>
              <span className="text-xs font-bold text-[#1d4ed8]">
                {item.step}
              </span>
              <h3 className="mt-1 text-base font-bold text-[#0c1425]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Targets */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { metric: "> 85%", label: "Overall accuracy target" },
            { metric: "> 0.60", label: "Macro F1 score" },
            { metric: "9B", label: "Pixels predicted nationally" },
            { metric: "30m", label: "Resolution per pixel" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center py-6 border border-[#e5e7eb] bg-white"
            >
              <p className="text-xl font-bold tracking-tight text-[#0c1425]">
                {item.metric}
              </p>
              <p className="mt-1 text-xs text-[#6b7280]">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
