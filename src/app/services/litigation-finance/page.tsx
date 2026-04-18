import type { Metadata } from "next";
import LitigationFinanceContent from "@/components/services/LitigationFinanceContent";

export const metadata: Metadata = {
  title: "Litigation Finance | AiPi Solutions",
  description:
    "AiPi provides non-recourse financing for patent infringement litigations in the US and overseas, covering all costs and services related to each financed litigation.",
};

export default function LitigationFinancePage() {
  return <LitigationFinanceContent />;
}
