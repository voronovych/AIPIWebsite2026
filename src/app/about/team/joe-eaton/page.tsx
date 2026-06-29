import type { Metadata } from "next";
import TeamMemberPage from "@/components/about/TeamMemberPage";
import joeHeadshot from "@/assets/headshots/Joe_Eaton_Color.jpg";

export const metadata: Metadata = {
  title: "Joe Eaton",
  description:
    "Joe Eaton — CTO & Managing Director at AiPi Solutions. Ph.D. from UT Austin, 13 years at NVIDIA as Distinguished System Engineer for Data & Graph Analytics.",
};

export default function JoeEatonPage() {
  return (
    <TeamMemberPage
      name="Joe Eaton"
      title="CTO, Managing Director"
      image={joeHeadshot}
      flip
      bio={[
        "Joe Eaton is a co-Owner of Actionable Intellectual Property Intelligence LLC. He leads knowledge graph applications for AiPi, including Graph Neural Networks and analytics applied to patents, litigation, investment opportunities and new technologies.",
        "Previously he worked as a Distinguished System Engineer for Data and Graph Analytics at NVIDIA, and led the company strategy for Graph Neural Networks and Graph-RAG. Joe leads teams for operations research, graph analysis, framework development and optimization, as well as interacts with prospective partners and customers in industry.",
        "Key areas of interest are knowledge graphs and graph neural networks, operations research and decision science, financial services, cyber security, retail recommenders, and molecular generation for drug discovery.",
        "He spent 13 years at NVIDIA working on applications of sparse linear algebra, formerly leading CUDA Libraries such as cuSOLVER, cuSPARSE, nvGRAPH and an iterative linear solver package including Algebraic Multi-Grid called AmgX, now open-source. Joe was a founding member and architect of NVIDIA RAPIDS, developing Python APIs, cuDF, cuML and cuGRAPH — an end-to-end open source platform for data science.",
        "Previously he spent 18 years in Oil & Gas process and reservoir simulation, database development, and cloud services. He is a frequent speaker at SuperComputing, NVIDIA's GPU Technology Conference, SciPy, HPEC, and directly interfaces with engineers and mathematicians across many industries.",
      ]}
      education={[
        { degree: "Ph.D. in Computational and Applied Mathematics", institution: "The University of Texas at Austin" },
        { degree: "Master of Engineering (MEng), Mechanical Engineering", institution: "Stanford University" },
        { degree: "M.S.M.E., Mechanical Engineering", institution: "Stanford University" },
        { degree: "B.S.M.E., Mechanical Engineering", institution: "Rice University" },
      ]}
    />
  );
}
