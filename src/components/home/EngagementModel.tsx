const engagement = [
  {
    step: "Discovery",
    description:
      "Assess the technology, competitive rights, whitespace, and business objective before recommending a path forward.",
  },
  {
    step: "Structuring",
    description:
      "Shape IP, valuation, finance, and commercialization strategy around measurable outcomes rather than isolated deliverables.",
  },
  {
    step: "Execution",
    description:
      "Carry the work into diligence, fundraising, portfolio action, and strategic business initiatives with senior-level support.",
  },
];

export default function EngagementModel() {
  return (
    <section className="bg-[#0c1425] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Senior-level work, structured for clarity
            </h2>
            <p className="mt-6 text-base leading-7 text-white/50">
              The process is designed to reduce ambiguity for management,
              investors, and operating stakeholders. We begin with strategic
              context, structure around the business objective, and support the
              work through execution.
            </p>
            <div className="mt-10 border-t border-white/10 pt-8">
              <p className="text-base font-medium text-white">
                Vienna, Virginia
              </p>
              <p className="mt-1 text-sm text-white/40">
                8230 Leesburg Pike, Suite 660, Vienna, VA 22182
              </p>
            </div>
          </div>

          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10">
            {engagement.map((item, index) => (
              <div
                key={item.step}
                className="bg-[#0c1425] p-8 sm:p-10"
              >
                <span className="text-sm font-light text-white/20">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold text-white">
                  {item.step}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/50">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
