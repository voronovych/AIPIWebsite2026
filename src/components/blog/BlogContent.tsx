"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────── data ───────────────────────── */

type Post = {
  title: string;
  date: string;
  category: string;
  excerpt: string;
  image: string;
  featured?: boolean;
};

const categories = [
  "All",
  "Company News",
  "Speaking Engagements",
  "Partnerships",
  "Patent Strategy",
];

const posts: Post[] = [
  {
    title: "Rice Hosts AiPi's MD/CTO Joe Eaton for Invited AI Talk",
    date: "2026",
    category: "Speaking Engagements",
    excerpt:
      "Dr. Eaton presented on AI applications using Graph Neural Networks (GNNs) to detect complex patterns that would be difficult to identify through traditional methods. The talk explored how modern AI techniques are transforming patent analysis and IP intelligence.",
    image:
      "https://static.wixstatic.com/media/ab6fb3_8076134e4863475494b959dc209049bc~mv2.jpg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/ab6fb3_8076134e4863475494b959dc209049bc~mv2.jpg",
    featured: true,
  },
  {
    title: "Eric Morehouse Speaks at University of Michigan's Ross School of Business",
    date: "November 16, 2022",
    category: "Speaking Engagements",
    featured: true,
    excerpt:
      "Morehouse addressed 450 participants at the V1 Startup Fair on fundraising, revenue strategies, scaling, and founder exits. The presentation covered how early-stage companies can leverage patent strategy to accelerate growth and attract investment.",
    image:
      "https://static.wixstatic.com/media/4142a5_e14cffafe09c4bfc984d1a519d6b40fb~mv2.jpg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_e14cffafe09c4bfc984d1a519d6b40fb~mv2.jpg",
  },
  {
    title: "Patent Strategy Interview with Eric Morehouse — BIG Language Solutions",
    date: "August 18, 2021",
    category: "Patent Strategy",
    excerpt:
      "Businesses seeking to build a future in North America should first consider their patent holdings. Morehouse discusses strategic patent positioning for international market entry and how IP can serve as a competitive differentiator.",
    image:
      "https://static.wixstatic.com/media/4142a5_3465f67b939246e99c6558e818bab27f~mv2.jpg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_3465f67b939246e99c6558e818bab27f~mv2.jpg",
  },
  {
    title: "AiPi Partners with Pungo LLC",
    date: "November 14, 2020",
    category: "Partnerships",
    excerpt:
      "Partnership announced to expedite prototyping and design services, enabling clients to move quickly and seamlessly from idea to prototype and production. The collaboration strengthens AiPi's ability to support innovators through the full product lifecycle.",
    image:
      "https://static.wixstatic.com/media/4142a5_226de52c81a04088a2dbb3fe901143ce~mv2.jpeg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_226de52c81a04088a2dbb3fe901143ce~mv2.jpeg",
  },
  {
    title: "AiPi–BIG Language Solutions Integration Partnership",
    date: "June 25, 2020",
    category: "Partnerships",
    excerpt:
      "Strategic integration providing translation services in 200+ languages and a cross-referral arrangement to serve international clients. This partnership enables AiPi to better serve innovators operating across borders and language barriers.",
    image:
      "https://static.wixstatic.com/media/4142a5_4ac0c7cdd4364081a8dd28adf8415cb7~mv2.png/v1/fill/w_600,h_600,fp_0.50_0.50,q_95/4142a5_4ac0c7cdd4364081a8dd28adf8415cb7~mv2.png",
  },
  {
    title: "Eric Morehouse — TexasBarCLE Advanced Patent Litigation Course",
    date: "July 18, 2019",
    category: "Speaking Engagements",
    excerpt:
      "Morehouse presented on advanced patent litigation topics at the 15th Annual Course of the Texas Bar Continuing Legal Education program, sharing insights on enforcement strategies and litigation best practices.",
    image:
      "https://static.wixstatic.com/media/4142a5_a0516edfc2d44904a38c050a3dd8e2a7~mv2.jpg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_a0516edfc2d44904a38c050a3dd8e2a7~mv2.jpg",
  },
  {
    title: "Eric Morehouse & Chris Thornham — CIPA Webinar, London",
    date: "December 4, 2018",
    category: "Speaking Engagements",
    excerpt:
      "Webinar on patent enforcement emphasizing that failure to defend a company's protected technology can lead to disastrous results for innovators. The session covered enforcement strategies across US and UK jurisdictions.",
    image:
      "https://static.wixstatic.com/media/4142a5_d30bcfc45b5a4b048d27a092682615e8~mv2.jpeg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_d30bcfc45b5a4b048d27a092682615e8~mv2.jpeg",
  },
  {
    title: "Eric Morehouse & Stoyan Radkov — University of Sofia & Startup Europe Summit",
    date: "November 14, 2018",
    category: "Speaking Engagements",
    excerpt:
      "Presentations on strategic patent portfolio creation and enforcement in the life sciences sector at the University of Sofia and Startup Europe Summit in Bulgaria.",
    image:
      "https://static.wixstatic.com/media/4142a5_8753a10d10474484b13fb7543e32f534~mv2.png/v1/fill/w_600,h_600,fp_0.50_0.50,q_95/4142a5_8753a10d10474484b13fb7543e32f534~mv2.png",
  },
  {
    title: "Biotech Atelier Conference — Sofia, Bulgaria",
    date: "September 25, 2018",
    category: "Speaking Engagements",
    excerpt:
      "Morehouse and Radkov discussed patent portfolios, enforcement strategies, and litigation financing at the Biotech Atelier Conference, focusing on opportunities in the life sciences sector.",
    image:
      "https://static.wixstatic.com/media/4142a5_472a0990190c43c091cfca11d3da3168~mv2.png/v1/fill/w_600,h_600,fp_0.50_0.50,q_95/4142a5_472a0990190c43c091cfca11d3da3168~mv2.png",
  },
  {
    title: "TechInSA Conference — Adelaide, Australia",
    date: "September 25, 2017",
    category: "Speaking Engagements",
    excerpt:
      "Morehouse presented on IP protection strategies for companies entering international markets at the TechInSA Conference in Adelaide, Australia.",
    image:
      "https://static.wixstatic.com/media/4142a5_86bf7e32ffca499bb5fa594ab5e7fb03~mv2.avif/v1/fill/w_600,h_600,al_c,q_90/4142a5_86bf7e32ffca499bb5fa594ab5e7fb03~mv2.avif",
  },
  {
    title: "INTA 2017 — Startups: How To Protect Your Innovations",
    date: "2017",
    category: "Patent Strategy",
    excerpt:
      "Article featured in World Intellectual Property Review on how startups can protect their innovations through strategic IP management. The piece covers cost-effective approaches to building defensible patent positions.",
    image:
      "https://static.wixstatic.com/media/4142a5_c8a964465ca7429cb94ffc5930961cb2~mv2.jpeg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_c8a964465ca7429cb94ffc5930961cb2~mv2.jpeg",
  },
  {
    title: "139th INTA Annual Meeting — Barcelona, Spain",
    date: "May 20, 2017",
    category: "Speaking Engagements",
    excerpt:
      "Morehouse presented on cost-effective patent protection for small businesses and startups at the 139th INTA Annual Meeting, addressing the challenge of limited IP protection budgets.",
    image:
      "https://static.wixstatic.com/media/4142a5_f3aadbed3f264712a7610579454f8f04~mv2.jpg/v1/fill/w_600,h_600,fp_0.50_0.50,q_90/4142a5_f3aadbed3f264712a7610579454f8f04~mv2.jpg",
  },
  {
    title: "Japan Patent Attorneys Association (JPAA) Kanto Seminar",
    date: "November 17, 2014",
    category: "Speaking Engagements",
    excerpt:
      "Morehouse addressed 300+ Japanese patent attorneys on claim drafting techniques and USPTO examination strategies at the JPAA Kanto Seminar in Tokyo.",
    image:
      "https://static.wixstatic.com/media/4142a5_16b8a38b343a4b8098119f496c293af6~mv2.webp/v1/fill/w_600,h_600,al_c,q_90/4142a5_16b8a38b343a4b8098119f496c293af6~mv2.webp",
  },
  {
    title: "USPTO Patentable Subject Matter Guidance",
    date: "March 4, 2014",
    category: "Patent Strategy",
    excerpt:
      "Documentation and analysis of new USPTO procedures for subject matter eligibility determinations and their impact on patent prosecution strategy.",
    image:
      "https://static.wixstatic.com/media/4142a5_aafbf8a87f2947d3ac28eab274ccf2b5~mv2.webp/v1/fill/w_600,h_600,al_c,q_90/4142a5_aafbf8a87f2947d3ac28eab274ccf2b5~mv2.webp",
  },
];

/* ───────────────────── component ───────────────────── */

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFeatured, setExpandedFeatured] = useState<string | null>(null);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  const featuredPosts = posts.filter((p) => p.featured);
  const showFeatured = activeCategory === "All";

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#0c1425] pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background:
              "linear-gradient(135deg, #0c1425 0%, #1a2a47 20%, #0c1425 40%, #162036 60%, #1e3a5f 80%, #0c1425 100%)",
            backgroundSize: "400% 400%",
          }}
        />
        <div className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full bg-[#1d4ed8]/20 blur-[140px] animate-pulse-slow" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-[#3b82f6]" />
              <span className="text-sm tracking-widest text-[#3b82f6] uppercase">
                Newsroom
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1]">
              News &{" "}
              <span className="text-white/40">Insights</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-white/60 max-w-2xl">
              Thought leadership on patent strategy, AI, and innovation from the
              AiPi team. Conference highlights, partnership announcements, and
              expert perspectives.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      {showFeatured && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-sm tracking-widest text-[#1d4ed8] uppercase mb-8">
              Featured
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {featuredPosts.map((post) => {
                const isExpanded = expandedFeatured === post.title;
                return (
                  <article
                    key={post.title}
                    className="group border border-[#e5e7eb] p-8 hover:border-[#1d4ed8]/30 hover:bg-[#f8fafc] transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setExpandedFeatured(isExpanded ? null : post.title)
                    }
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-medium text-[#1d4ed8] bg-[#1d4ed8]/10 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-sm text-[#9ca3af]">
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#0c1425] group-hover:text-[#1d4ed8] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p
                      className={`mt-3 text-sm text-[#6b7280] leading-relaxed ${
                        isExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                    {isExpanded && (
                      <div className="mt-6 relative aspect-video rounded-lg overflow-hidden bg-[#f1f5f9]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="inline-block mt-4 text-sm font-medium text-[#1d4ed8]">
                      {isExpanded ? "Show less" : "Read more"} &rarr;
                    </span>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── FILTER + ALL POSTS ─── */}
      <section className="bg-[#f8fafc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedPost(null);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#0c1425] text-white"
                    : "bg-white text-[#4b5563] border border-[#e5e7eb] hover:border-[#0c1425] hover:text-[#0c1425]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => {
              const isExpanded = expandedPost === post.title;
              return (
                <article
                  key={post.title}
                  className={`group bg-white border border-[#e5e7eb] p-6 hover:border-[#1d4ed8]/30 hover:shadow-sm transition-all duration-300 cursor-pointer ${
                    isExpanded ? "sm:col-span-2 lg:col-span-3" : ""
                  }`}
                  onClick={() =>
                    setExpandedPost(isExpanded ? null : post.title)
                  }
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-[#1d4ed8]">
                      {post.category}
                    </span>
                    <span className="text-xs text-[#9ca3af]">{post.date}</span>
                  </div>

                  {isExpanded ? (
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_300px] gap-8">
                      <div>
                        <h3 className="text-xl font-bold text-[#0c1425] leading-snug">
                          {post.title}
                        </h3>
                        <p className="mt-4 text-base text-[#4b5563] leading-relaxed">
                          {post.excerpt}
                        </p>
                        <span className="inline-block mt-4 text-sm font-medium text-[#1d4ed8]">
                          Show less &rarr;
                        </span>
                      </div>
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-[#f1f5f9]">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-base font-bold text-[#0c1425] group-hover:text-[#1d4ed8] transition-colors duration-300 leading-snug">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-[#6b7280] leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-block mt-3 text-sm font-medium text-[#1d4ed8]">
                        Read more &rarr;
                      </span>
                    </>
                  )}
                </article>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#6b7280]">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
