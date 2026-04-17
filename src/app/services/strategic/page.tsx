import type { Metadata } from "next";
import StrategicServicesContent from "@/components/services/StrategicServicesContent";

export const metadata: Metadata = {
  title: "Strategic Patent Services | AiPi Solutions",
  description:
    "AiPi combines 100+ years of multidisciplinary expertise with proprietary tools to identify growth whitespace, defend differentiators, and turn IP into a measurable business advantage.",
};

export default function StrategicServicesPage() {
  return <StrategicServicesContent />;
}
