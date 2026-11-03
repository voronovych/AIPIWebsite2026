import type { Metadata } from "next";
import { notFound } from "next/navigation";

import DataIntakeForm from "@/components/data-intake/DataIntakeForm";
import { isValidIntakeToken } from "@/utils/dataIntakeAccess";

// Private page reached only by a shared link: keep it out of search results,
// and keep the secret URL out of Referer headers sent to other sites.
export const metadata: Metadata = {
  title: "Data Intake",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
  referrer: "no-referrer",
};

export default async function DataIntakePage(
  props: PageProps<"/data-intake/[token]">,
) {
  const { token } = await props.params;

  if (!isValidIntakeToken(token)) {
    notFound();
  }

  return (
    <>
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tell us about your company’s data
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            Tell us what you have and our team will follow up with next steps.
          </p>
        </div>
      </section>

      <section className="bg-[#f9fafb] py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <DataIntakeForm token={token} />
        </div>
      </section>
    </>
  );
}
