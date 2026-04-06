import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "AiPi LLC is comprised of professionals with diverse backgrounds spanning finance, business development, operations, communications, software development, and advanced AI systems.",
};

const specializations = [
  "Preventing developed technologies from being hijacked by competitors",
  "Proving our client's differentiators",
  "Improving R&D and product development strategies",
  "Enhancing business development and generating revenue",
  "Increasing company valuation",
  "Achieving fundraising",
  "Facilitating owner exit",
];

const portfolioGoals = [
  "Enable exit for the owners",
  "Raise funds",
  "Achieve revenue",
  "Scale revenue",
  "Enhance company valuation",
  "Facilitate other business goals",
  "Influence product development strategy",
  "Fully protect the developed technology",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#0c1425] pt-36 pb-24 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-tight">
            Unparalleled team
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            AiPi LLC is comprised of a group of professionals with diverse
            backgrounds that allow AiPi to provide a suite of strategic services
            that is beyond the capabilities of other business consultancies. We
            have experience in a wide range of industries and have developed
            skills in critical areas such as: finance, business development,
            operations, communications, software development, and advanced AI
            systems.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-7 py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Work With AiPi
            </Link>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#0c1425] sm:text-4xl">
              Services that drive real growth
            </h2>
            <p className="mt-6 text-base text-[#4b5563] leading-relaxed">
              AiPi provides the services most important to growing
              business, including services often ignored by other consultancies.
              We specialize in:
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {specializations.map((item) => (
              <div
                key={item}
                className="border-l-2 border-[#1d4ed8] pl-5 py-3"
              >
                <p className="text-sm text-[#374151] leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Traditional Patents Fall Short */}
      <section className="bg-[#111c32] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why traditional patents fall short
          </h2>
          <p className="mt-6 text-base text-white/50 leading-relaxed">
            The traditional technique of obtaining patents tailored solely to a
            company&apos;s developed technologies merely constitutes a &ldquo;check the
            box, cost of doing business,&rdquo; and will not provide the company
            with the insights needed to enhance product development efforts and
            will not prevent competitors from designing around and avoiding such
            insufficient protections.
          </p>
        </div>
      </section>

      {/* Building Strategic Patent Portfolios */}
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#0c1425] sm:text-4xl">
              Building strategic patent portfolios
            </h2>
            <p className="mt-6 text-base text-[#4b5563] leading-relaxed">
              Sufficient patent protection and value allowing monetization can
              only be achieved after gleaning a comprehensive understanding of
              the patent rights and technologies of competitors and potential
              partners, and then using that understanding to create and implement
              an intellectual property strategy and resultant patent portfolio
              that helps to:
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {portfolioGoals.map((goal) => (
              <div
                key={goal}
                className="border border-[#e5e7eb] px-5 py-4 text-center"
              >
                <p className="text-sm font-medium text-[#0c1425]">{goal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0c1425] py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Have a question or want to explore how AiPi can support your
            innovation strategy?
          </h2>
          <div className="mt-10">
            <Link
              href="/contact"
              className="bg-[#1d4ed8] text-white px-8 py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors inline-block"
            >
              Start the Conversation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
