import type { Metadata } from "next";
import ServicesOverview from "@/components/services/ServicesOverview";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AiPi provides strategic patent services, technology platforms, growth facilitation, and litigation finance to help companies develop, protect, and monetize innovation.",
};

export default function ServicesPage() {
  return <ServicesOverview />;
}
