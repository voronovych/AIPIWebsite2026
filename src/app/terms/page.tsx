import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for automated patent analysis reports from AiPi Solutions.",
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {"Terms of Service — AiPi Reports"}
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            {"Effective date: October 28, 2026"}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <p
            role="note"
            className="border border-[#d1d5db] bg-[#f9fafb] px-6 py-4 text-sm font-semibold text-[#b91c1c]"
          >
            Draft — pending review. This text is not final and has not yet been approved.
          </p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"These Terms of Service (\"Terms\") govern your purchase and use of automated patent analysis reports (\"Reports\") offered by Actionable Intellectual Property Intelligence LLC, a [STATE OF FORMATION] entity doing business as AiPi Solutions (\"AiPi,\" \"we,\" \"us,\" or \"our\"), through aipisolutions.com (the \"Site\"). By submitting a Report request or completing a payment, you agree to these Terms. If you are acting on behalf of a company or other organization, you confirm that you are authorized to accept these Terms on its behalf, and \"you\" includes that organization."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"If you do not agree to these Terms, do not submit a request or make a payment."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"1. About the Reports"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.1. AiPi is an intellectual property strategy and technology company. Reports are generated automatically by LeifAI, AiPi's proprietary automated patent analysis software, based on the information you provide in the intake form."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.2. Report types currently offered include Landscape, Infringer Finder, Freedom to Operate, Patentability, Invalidity, Commercialization, Portfolio, and similar analyses. The specific report types available may change from time to time."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.3. Reports are generated using LeifAI's default settings. Reports are not individually customized, and AiPi does not manually review or edit each Report before delivery unless separately agreed in writing."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.4. Reports are produced from automated searches of patent and related data sources and from AI-assisted analysis. Results depend on the information you submit and on the coverage, accuracy, and currency of the underlying data sources. Reports may be incomplete, may omit relevant documents, and may contain errors."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"2. Not Legal Advice"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"2.1. "}<strong className="font-semibold text-[#0c1425]">{"Reports are analytical and informational output produced by software. They are not legal advice and are not a legal opinion."}</strong>{" In particular, a Report is not a formal freedom-to-operate opinion, a validity or invalidity opinion, an infringement or non-infringement opinion, or a patentability opinion."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"2.2. Purchasing or receiving a Report does not create an attorney-client relationship between you and AiPi or any of its personnel, including any personnel who are licensed attorneys. Information you submit through the Site is not protected by attorney-client privilege."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"2.3. You should not rely on a Report as the sole basis for any legal, business, investment, licensing, litigation, or product decision. For decisions with legal consequences, consult a qualified patent attorney or patent agent."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"2.4. If you would like to engage AiPi for advisory or other services beyond an automated Report, that engagement will be governed by a separate written agreement."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"3. Ordering and Payment"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.1. "}<strong className="font-semibold text-[#0c1425]">{"Pricing."}</strong>{" Prices are stated in U.S. dollars and are charged once per Report:"}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-7 text-[#4b5563]">
            <li>{"Landscape Report: $3,000"}</li>
            <li>{"Infringer Finder Report: $2,000"}</li>
            <li>{"All other Report types (including Freedom to Operate, Patentability, Invalidity, Commercialization, and Portfolio): $1,500"}</li>
          </ul>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"Prices shown on the Site at the time of your order apply. AiPi may change prices for future orders at any time."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.2. "}<strong className="font-semibold text-[#0c1425]">{"Payment."}</strong>{" Payment is due in full at the time of ordering. Payments are processed by Stripe, our third-party payment processor, through an embedded checkout on the Site. Your card details are submitted directly to Stripe and are not stored by AiPi. Your use of Stripe's checkout is also subject to Stripe's own terms and privacy policy."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.3. "}<strong className="font-semibold text-[#0c1425]">{"Taxes."}</strong>{" Prices [do / do not — OWNER TO CONFIRM] include applicable sales or similar taxes. You are responsible for any taxes, duties, or bank or currency-conversion fees that apply to your purchase, other than taxes on AiPi's income."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.4. "}<strong className="font-semibold text-[#0c1425]">{"Order acceptance."}</strong>{" AiPi may decline or cancel any request (for example, if the request is incomplete, unlawful, or outside the scope of what LeifAI can analyze). If AiPi cancels a paid request before delivering a Report, AiPi will refund the amount paid for that request."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"4. Your Responsibilities"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.1. You agree to provide accurate and complete information in the intake form, including a valid email address that you control."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.2. You represent that you have the right to submit the information you provide, and that submitting it to AiPi for the purpose of generating a Report does not violate any law, confidentiality obligation, or third-party right."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.3. You will not use the Site or Reports for any unlawful purpose, attempt to interfere with the Site or LeifAI, attempt to reverse-engineer the software, or use automated means to submit requests or extract data from the Site except as AiPi permits."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"5. Delivery and Turnaround"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"5.1. After your request and payment are received, you will receive a confirmation email from noreply@aipisolutions.com. When your Report is complete, you will receive a second email containing a link to your Report."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"5.2. Reports are generated automatically, and "}<strong className="font-semibold text-[#0c1425]">{"turnaround time is not guaranteed."}</strong>{" Any timing estimate shown on the Site is a good-faith estimate only."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"5.3. Please check your spam or junk folder if you do not receive these emails. If you have not received your Report within a reasonable time, or if you believe generation failed, contact us at tech-admin@aipisolutions.com."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"6. How Your Report Is Delivered — Link Access"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"6.1. "}<strong className="font-semibold text-[#0c1425]">{"Your Report is delivered as a web page published at a unique link. Anyone who has the link can view the Report."}</strong>{" The Report is not protected by a password or login."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"6.2. You should treat the link as confidential. Share it only with people you intend to see the Report. AiPi is not responsible for access to your Report by anyone who obtains the link from you or from anyone you shared it with."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"6.3. If you believe your link has been shared without your authorization, contact us at tech-admin@aipisolutions.com. [OWNER TO CONFIRM: whether AiPi can disable or rotate a Report link on request, and how long Report links remain active.]"}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"7. Information You Submit"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.1. "}<strong className="font-semibold text-[#0c1425]">{"Use."}</strong>{" AiPi uses the information you submit in the intake form (which may include unpublished or confidential invention information) to generate and deliver your Report, to communicate with you about your order, and to handle support, refund, and dispute requests. [OWNER / ATTORNEY TO CONFIRM: whether submitted information or Reports are used for any other purpose, such as improving LeifAI. If not, state so expressly here.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.2. "}<strong className="font-semibold text-[#0c1425]">{"Third-party processors."}</strong>{" To provide the Reports, AiPi relies on third-party service providers, including a payment processor (Stripe), cloud hosting and email delivery providers, and AI model providers that process content to generate analysis. Your submitted information may be transmitted to and processed by these providers for that purpose. [ATTORNEY TO REVIEW: list or describe providers, and confirm their data-use and retention terms — e.g., whether AI providers retain or train on submitted content.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.3. "}<strong className="font-semibold text-[#0c1425]">{"Retention."}</strong>{" AiPi retains submitted information and Reports [for PERIOD / for as long as needed to provide the Report and meet legal, accounting, and dispute-resolution obligations — OWNER TO CONFIRM]. You may ask us to delete your submitted information by contacting tech-admin@aipisolutions.com; we will handle the request as described in our Privacy Policy and subject to legal retention requirements."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.4. "}<strong className="font-semibold text-[#0c1425]">{"Confidentiality and public disclosure."}</strong>{" AiPi will take reasonable measures to protect the information you submit. However, because the internet is not perfectly secure and Reports are delivered by link (see Section 6), AiPi cannot guarantee absolute security. "}<strong className="font-semibold text-[#0c1425]">{"Consider carefully before submitting unpublished invention details."}</strong>{" You are solely responsible for deciding whether submitting information could affect your patent rights (for example, questions about public disclosure or confidentiality under patent law), and you should consult a patent attorney if you are unsure. [ATTORNEY TO REVIEW.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.5. "}<strong className="font-semibold text-[#0c1425]">{"Privacy Policy."}</strong>{" Our Privacy Policy, available at aipisolutions.com/privacy-policy, also applies to personal information you provide. If there is a conflict between these Terms and the Privacy Policy regarding personal information, [ATTORNEY TO DETERMINE which controls]."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"8. Ownership and License"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"8.1. "}<strong className="font-semibold text-[#0c1425]">{"Your materials."}</strong>{" You keep all rights you have in the information you submit. You grant AiPi a limited, non-exclusive license to use that information as described in Section 7."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"8.2. "}<strong className="font-semibold text-[#0c1425]">{"Reports."}</strong>{" Upon full payment, AiPi grants you a non-exclusive, non-transferable, perpetual license to use your Report for your own internal business purposes, including sharing it with your advisors, investors, and prospective partners. [OWNER TO DECIDE: whether customers may republish or resell Reports, or whether AiPi should instead assign ownership of the Report to the customer.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"8.3. "}<strong className="font-semibold text-[#0c1425]">{"AiPi property."}</strong>{" AiPi retains all rights in LeifAI, the Site, and its software, methods, templates, and report formats. Public patent documents and data cited in a Report remain subject to their own rights, if any."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"9. Refunds"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"All sales are final, except as described in our Refund Policy, available at aipisolutions.com/refund-policy. The Refund Policy forms part of these Terms."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"10. Disclaimer of Warranties"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"TO THE FULLEST EXTENT PERMITTED BY LAW, REPORTS, THE SITE, AND LEIFAI ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE.\" AIPI DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. AIPI DOES NOT WARRANT THAT ANY REPORT IS ACCURATE, COMPLETE, OR CURRENT; THAT IT IDENTIFIES ALL RELEVANT PATENTS, PRIOR ART, OR PARTIES; OR THAT ANY OUTCOME (SUCH AS PATENT GRANT, ENFORCEABILITY, OR FREEDOM FROM INFRINGEMENT CLAIMS) WILL OCCUR."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"11. Limitation of Liability"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"11.1. TO THE FULLEST EXTENT PERMITTED BY LAW, AIPI WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, OR FOR ANY LOSS OF PROFITS, REVENUE, BUSINESS, DATA, OR GOODWILL, OR FOR COSTS OF LITIGATION OR LOSS OF PATENT OR OTHER IP RIGHTS, ARISING OUT OF OR RELATED TO THE REPORTS OR THESE TERMS, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"11.2. TO THE FULLEST EXTENT PERMITTED BY LAW, AIPI'S TOTAL LIABILITY ARISING OUT OF OR RELATED TO A REPORT OR THESE TERMS WILL NOT EXCEED THE AMOUNT YOU PAID FOR THE REPORT GIVING RISE TO THE CLAIM. [ATTORNEY TO REVIEW cap amount.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"11.3. Some jurisdictions do not allow certain disclaimers or limitations, so some of the above may not apply to you."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"12. Indemnification"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"You agree to indemnify and hold harmless AiPi and its officers, employees, and agents from claims, losses, and expenses (including reasonable attorneys' fees) arising from information you submit in violation of these Terms, your misuse of a Report, or your violation of law or third-party rights. [ATTORNEY TO REVIEW scope.]"}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"13. Governing Law and Disputes"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"These Terms are governed by the laws of [GOVERNING LAW / VENUE], without regard to conflict-of-law rules. Any dispute arising out of or relating to these Terms or a Report will be brought exclusively in the courts located in [GOVERNING LAW / VENUE], and you and AiPi consent to their jurisdiction. [ATTORNEY TO CONSIDER: informal dispute resolution step, arbitration, class-action waiver.]"}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"14. Changes to These Terms"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"AiPi may update these Terms from time to time. The version in effect when you place an order applies to that order. Updated Terms will be posted on the Site with a new effective date."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"15. General"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"15.1. These Terms, the Refund Policy, and the Privacy Policy are the entire agreement between you and AiPi regarding Reports, unless you and AiPi sign a separate written agreement that expressly overrides them."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"15.2. If any provision is found unenforceable, the remaining provisions remain in effect. AiPi's failure to enforce a provision is not a waiver. You may not assign these Terms without AiPi's written consent. AiPi is not liable for delays caused by events beyond its reasonable control."}</p>
          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"16. Contact"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"Actionable Intellectual Property Intelligence LLC (AiPi Solutions)"}<br />{"8230 Leesburg Pike, Suite 660, Vienna, VA 22182"}<br />{"Email: tech-admin@aipisolutions.com"}<br />{"Website: aipisolutions.com"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"Note: automated emails are sent from noreply@aipisolutions.com, which does not accept replies. Please use tech-admin@aipisolutions.com for all questions."}</p>
        </div>
      </section>
    </>
  );
}
