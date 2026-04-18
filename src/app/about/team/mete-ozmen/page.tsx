import type { Metadata } from "next";
import TeamMemberPage from "@/components/about/TeamMemberPage";
import meteHeadshot from "@/assets/headshots/MeteOzmen.png";

export const metadata: Metadata = {
  title: "Mete Ozmen",
  description:
    "Mete Ozmen — Chief Operating Officer & Head of Litigation Financing & Services at AiPi Solutions.",
};

export default function MeteOzmenPage() {
  return (
    <TeamMemberPage
      name="Mete Ozmen"
      title="Chief Operating Officer"
      subtitle="Head of Litigation Financing & Services"
      image={meteHeadshot}
      bio={[
        "Mete Ozmen leads operations and litigation financing at AiPi Solutions, helping seed-round technology startups monetize their inventions, scale their businesses, formulate their IP strategy, and connect them to AiPi's investor network.",
        "An international business development and corporate finance executive with over 20 years' experience of innovative product go-to-market in EMEA and the USA, Mete brings deep expertise in bridging technology ventures with strategic capital and operational support.",
      ]}
      education={[
        { degree: "Master of Business Administration (MBA), Business Analytics", institution: "The George Washington University" },
        { degree: "B.S. in Industrial Engineering", institution: "Sabanci University" },
      ]}
    />
  );
}
