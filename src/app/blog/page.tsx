import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on intellectual property strategy, innovation, and business growth from the AiPi Solutions team.",
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-36 pb-24 sm:pt-44 sm:pb-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Blog &amp; Insights
          </h1>
          <p className="mt-6 text-lg leading-8 text-white/60">
            Expert perspectives on patent strategy, innovation, and business growth.
          </p>
        </div>
      </section>

      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="border border-[#e5e7eb] p-12 text-center">
            <p className="text-[#6b7280]">
              Posts coming soon. Check back for insights from our team.
            </p>
          </div>
          {/* Blog posts will be fetched from Amplify data */}
        </div>
      </section>
    </>
  );
}
