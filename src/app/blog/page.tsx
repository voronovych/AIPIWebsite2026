import type { Metadata } from "next";
import BlogContent from "@/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Newsroom",
  description:
    "News, insights, and thought leadership on patent strategy, AI, and innovation from the AiPi Solutions team.",
};

export default function BlogPage() {
  return <BlogContent />;
}
