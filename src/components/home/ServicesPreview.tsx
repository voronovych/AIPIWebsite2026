import Link from "next/link";

const services = [
  {
    title: "Strategic Patent Services",
    href: "/services/strategic",
    description:
      "Full-lifecycle <em>patent landscaping</em>, <em>commercialisation analysis</em>, and <em>portfolio creation</em> powered by proprietary AI.",
  },
  {
    title: "Technology",
    href: "/services/technology",
    description:
      "Proprietary platforms for <em>patent intelligence</em>, <em>knowledge graphs</em>, and <em>agricultural data analysis</em>.",
  },
  {
    title: "Growth Facilitation",
    href: "/services/growth-facilitation",
    description:
      "End-to-end support for <em>US market entry</em>, <em>operations scaling</em>, <em>fundraising</em>, and exit planning.",
  },
  {
    title: "Litigation Finance",
    href: "/services/litigation-finance",
    description:
      "Non-recourse <em>financing</em> for patent enforcement, covering <em>100% of legal fees</em> while you retain full control.",
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
        <div className="mt-10 grid gap-px overflow-visible border border-[#e5e7eb] bg-[#e5e7eb] sm:grid-cols-2 lg:grid-cols-4 group/grid">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group bg-white p-8 sm:p-10 transition-all duration-300 hover:bg-[#f1f5f9] cursor-pointer scale-100 hover:scale-[1.03] hover:z-10 group-hover/grid:scale-[0.98] group-hover/grid:hover:scale-[1.03]"
            >
              <h3 className="text-lg font-bold text-[#0c1425] sm:text-xl">
                {service.title}
              </h3>
              <p
                className="mt-4 text-sm leading-7 text-[#4b5563] [&>em]:not-italic [&>em]:text-[#4b5563] [&>em]:transition-all [&>em]:duration-300 group-hover:[&>em]:font-semibold group-hover:[&>em]:text-[#0c1425]"
                dangerouslySetInnerHTML={{ __html: service.description }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
