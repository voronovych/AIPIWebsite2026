import type { Metadata } from "next";
import TeamMemberPage from "@/components/about/TeamMemberPage";
import ericHeadshot from "@/assets/headshots/Eric_Morehouse_Color.webp";

export const metadata: Metadata = {
  title: "Eric Morehouse",
  description:
    "Eric D. Morehouse — Founder & Managing Director at AiPi Solutions. Over 30 years of experience in IP strategy, litigation finance, and venture advisory.",
};

export default function EricMorehousePage() {
  return (
    <TeamMemberPage
      name="Eric Morehouse"
      title="Founder, Managing Director"
      image={ericHeadshot}
      bio={[
        "Eric D. Morehouse is a Managing Director at AiPi Solutions, responsible for overseeing the firm's overall operations, client relationships, and strategic growth initiatives. Bringing deep expertise in litigation finance, intellectual property monetization, and venture strategy, Eric plays a pivotal role in guiding clients through complex IP challenges and financing opportunities.",
        "With a career spanning high-stakes litigation support, fund management, and advisory services for technology companies, he has helped numerous organizations unlock substantial value from their patent assets. Eric's approach combines rigorous financial analysis with a keen understanding of legal and technical landscapes, enabling AiPi to deliver integrated solutions that mitigate risk while maximizing returns.",
        "He is committed to building long-term partnerships that drive sustainable innovation and business success.",
      ]}
      education={[
        { degree: "Doctor of Law (JD), Intellectual Property Law — Cum Laude", institution: "Widener University Schools of Law" },
        { degree: "B.S. in Mechanical Engineering", institution: "Virginia Military Institute" },
      ]}
    />
  );
}
