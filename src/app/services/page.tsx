import type { Metadata } from "next";
import Link from "next/link";
import StrategicServicesGraphic from "@/components/StrategicServicesGraphic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AiPi provides Technology, Strategic Finance, and Business Development services to help companies develop, protect, and monetize innovation.",
};

const services = [
  {
    title: "Technology",
    tagline: "Develop, scale, and monetize your patents",
    description:
      "Develop, scale, and monetize your products, services, and patents with our world-first Growth Landscaping and AI-driven analyses.",
    bullets: [
      {
        label: "Differentiate",
        detail:
          "Identify what makes your technology unique and position it in the market.",
      },
      {
        label: "Defend",
        detail:
          "Build strategic patent portfolios that prevent competitors from designing around your innovations.",
      },
      {
        label: "Develop",
        detail:
          "Use patent intelligence to inform R&D strategy and accelerate product development.",
      },
    ],
  },
  {
    title: "Strategic Finance",
    tagline: "Enhance investor confidence and guide exit",
    description:
      "We deliver grounded financial models and white glove support to enhance investor confidence and guide our clients to successful exit.",
    bullets: [
      {
        label: "Litigation Finance",
        detail:
          "Strategic financing solutions for patent enforcement and defense.",
      },
      {
        label: "Business & Patent Valuation",
        detail:
          "Rigorous valuation frameworks that quantify your patent portfolio's worth.",
      },
      {
        label: "Fundraising Strategy & Execution",
        detail:
          "End-to-end fundraising support from pitch preparation to investor introductions.",
      },
    ],
  },
  {
    title: "Business Development",
    tagline: "Accelerate revenue and growth",
    description:
      "We deliver grounded financial models and white glove support to enhance investor confidence and guide our clients to successful exit.",
    bullets: [
      {
        label: "Litigation Finance",
        detail:
          "Strategic financing solutions for patent enforcement and defense.",
      },
      {
        label: "Business & Patent Valuation",
        detail:
          "Rigorous valuation frameworks that communicate real value to stakeholders.",
      },
      {
        label: "Fundraising Strategy & Execution",
        detail:
          "Full-cycle fundraising from strategy through execution and close.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
            Strategic services that drive real growth
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            AiPi provides the services most important to growing
            business, including services often ignored by other consultancies.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="border-t border-[#e5e7eb] pt-12"
            >
              <div className="flex items-center gap-4 mb-2">
                <span className="text-sm font-light text-[#9ca3af]">
                  0{i + 1}
                </span>
                <div className="h-px flex-1 bg-transparent" />
              </div>
              <h2 className="text-xl font-bold text-[#0c1425] sm:text-2xl">
                {service.title}
              </h2>
              <p className="mt-1 text-sm font-medium text-[#1d4ed8]">
                {service.tagline}
              </p>
              <p className="mt-4 text-base text-[#4b5563] leading-relaxed max-w-2xl">
                {service.description}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {service.bullets.map((bullet) => (
                  <div
                    key={bullet.label}
                    className="border-l-2 border-[#1d4ed8] pl-5"
                  >
                    <h3 className="text-sm font-bold text-[#0c1425]">
                      {bullet.label}
                    </h3>
                    <p className="mt-2 text-sm text-[#6b7280] leading-relaxed">
                      {bullet.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive overview graphic */}
      <section className="bg-[#0c1425] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-center mb-12 tracking-widest">
            <span className="text-transparent [-webkit-text-stroke:2px_white]">Built on Patents</span>
            <br />
            <span className="text-white">Not Defined by Them</span>
          </h2>
          <div className="mx-auto mb-16 w-200 h-px bg-white/30" />
          <StrategicServicesGraphic />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c1425] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to turn your patents into a growth engine?
          </h2>
          <div className="mt-10">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-8 py-3 text-base font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Speak with an Advisor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
