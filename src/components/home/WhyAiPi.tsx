import Link from "next/link";

const reasons = [
  {
    title: "Strategic Patent and AI Intelligence",
    description:
      "We combine 100+ years of multidisciplinary expertise with proprietary tools to identify growth whitespace, defend differentiators, and turn patents into measurable advantage.",
  },
  {
    title: "Measurable Business Value",
    description:
      "Our work is structured around outcomes: valuation, fundraising strength, revenue, exit leverage. Not isolated deliverables.",
  },
  {
    title: "Senior-Level Advisory",
    description:
      "The process is designed to reduce ambiguity for management, investors, and operating stakeholders, built for decision environments where the work needs to hold up under scrutiny.",
  },
];

export default function WhyAiPi() {
  return (
    <section className="bg-[#0c1425] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why AiPi
          </h2>
          <p className="mt-4 text-lg leading-8 text-white/60">
            Three things separate AiPi from traditional consultancies.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-[#0c1425] p-10">
              <h3 className="text-lg font-bold text-white">
                {reason.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-white/60">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="bg-[#1d4ed8] text-white px-7 py-3 text-sm font-semibold hover:bg-[#1e40af] transition-colors inline-block"
          >
            Explore Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
