import Link from "next/link";

const services = [
  {
    title: "Technology",
    description:
      "Use <em>Growth Landscaping</em> and <em>AI-driven analysis</em> to identify whitespace, sharpen product direction, and build strategic patent portfolios.",
  },
  {
    title: "Strategic Finance",
    description:
      "Deliver grounded <em>valuation frameworks</em>, <em>diligence readiness</em>, and <em>fundraising execution</em> to enhance investor confidence.",
  },
  {
    title: "Business Development",
    description:
      "Translate differentiation into <em>partnerships</em>, <em>revenue strategy</em>, <em>market positioning</em>, and executive decision-making.",
  },
];

export default function ServicesPreview() {
  return (
    <section className="bg-[#f8fafc] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-[#0c1425] sm:text-4xl max-w-xl">
            Strategic Services
          </h2>
          <Link
            href="/services"
            className="text-base font-semibold text-[#6b7280] hover:text-[#0c1425] transition-colors"
          >
            Explore All Services &rarr;
          </Link>
        </div>
        <div className="mt-10 grid gap-px overflow-visible border border-[#e5e7eb] bg-[#e5e7eb] sm:grid-cols-3 group/grid">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white p-8 sm:p-10 transition-all duration-300 hover:bg-[#f1f5f9] cursor-pointer scale-100 hover:scale-[1.03] hover:z-10 group-hover/grid:scale-[0.98] group-hover/grid:hover:scale-[1.03]"
            >
              <h3 className="mt-5 text-xl font-bold text-[#0c1425] sm:text-2xl">
                {service.title}
              </h3>
              <p
                className="mt-5 text-base leading-8 text-[#4b5563] [&>em]:not-italic [&>em]:text-[#4b5563] [&>em]:transition-all [&>em]:duration-300 group-hover:[&>em]:font-semibold group-hover:[&>em]:text-[#0c1425]"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
