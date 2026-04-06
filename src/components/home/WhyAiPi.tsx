import Link from "next/link";

const reasons = [
  {
    num: "01",
    title: "Strategic IP and AI Intelligence",
    description:
      "We combine 100+ years of multidisciplinary expertise with proprietary tools to identify growth whitespace, defend differentiators, and turn IP into measurable advantage.",
  },
  {
    num: "02",
    title: "Measurable Business Value",
    description:
      "Our work is structured around outcomes: valuation, fundraising strength, revenue, exit leverage. Not isolated deliverables.",
  },
  {
    num: "03",
    title: "Senior-Level Advisory",
    description:
      "The process is designed to reduce ambiguity for management, investors, and operating stakeholders, built for decision environments where the work needs to hold up under scrutiny.",
  },
];

export default function WhyAiPi() {
  return (
    <section className="bg-[#0c1425] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="max-w-2xl text-base leading-7 text-white/70">
          Three things separate AiPi from traditional consultancies.
        </p>
        <div className="mt-14 grid gap-12 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div key={reason.title}>
              <span className="text-5xl font-bold text-white/15">
                {reason.num}
              </span>
              <h3 className="mt-4 text-lg font-bold text-white">
                {reason.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-white/60">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-14">
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
