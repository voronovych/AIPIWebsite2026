const engagement = [
  {
    step: "Discovery",
    description:
      "Assess the technology, competitive rights, whitespace, and business objective before recommending a path forward.",
  },
  {
    step: "Structuring",
    description:
      "Shape patent, valuation, finance, and commercialization strategy around measurable outcomes rather than isolated deliverables.",
  },
  {
    step: "Execution",
    description:
      "Carry the work into diligence, fundraising, portfolio action, and strategic business initiatives with senior-level support.",
  },
];

export default function EngagementModel() {
  return (
    <section className="bg-[#060b14] py-32 sm:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Centered heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Senior-Level Work,{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1.5px white" }}
            >
              Structured for Clarity
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/50">
            We begin with strategic context, structure around the business
            objective, and support the work through execution.
          </p>
        </div>

        {/* Three-phase cards */}
        <div className="relative">
          <div className="grid gap-8 lg:grid-cols-3">
            {engagement.map((item, index) => (
              <div
                key={item.step}
                className="relative group border border-white/10 bg-[#111c32]/50 p-10 sm:p-12 transition-colors duration-300 hover:border-white/20"
              >
                {/* Step indicator */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full border border-[#1d4ed8]/50 text-sm font-bold text-[#3b82f6]">
                    {index + 1}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {item.step}
                </h3>
                <p className="mt-4 text-base leading-8 text-white/50">
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
