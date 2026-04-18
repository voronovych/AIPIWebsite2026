import type { Metadata } from "next";
import GrowthFacilitationContent from "@/components/services/GrowthFacilitationContent";

export const metadata: Metadata = {
  title: "Growth Facilitation | AiPi Solutions",
  description:
    "AiPi provides comprehensive support for technology companies entering the US market and scaling operations — fundraising, innovation strategy, regulatory support, and exit planning.",
};

export default function GrowthFacilitationPage() {
  return <GrowthFacilitationContent />;
}
