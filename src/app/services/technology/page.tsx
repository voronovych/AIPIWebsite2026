import type { Metadata } from "next";
import TechnologyContent from "@/components/services/TechnologyContent";

export const metadata: Metadata = {
  title: "Technology | AiPi Solutions",
  description:
    "AiPi builds proprietary AI-powered platforms for patent landscape intelligence and agricultural data analysis — transforming raw data into actionable business decisions.",
};

export default function TechnologyPage() {
  return <TechnologyContent />;
}
