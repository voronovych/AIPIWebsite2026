import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for aipisolutions.com, operated by Actionable Intellectual Property Intelligence LLC (AiPi Solutions).",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-[#0c1425] pt-28 pb-16 sm:pt-36 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {"Privacy Policy"}
          </h1>
          <p className="mt-6 text-base leading-7 text-white/60">
            {"Effective date: November 17, 2026"}
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
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"This Privacy Policy explains how Actionable Intellectual Property Intelligence LLC, a [STATE OF FORMATION] entity doing business as AiPi Solutions (\"AiPi,\" \"we,\" \"us,\" or \"our\"), collects, uses, shares, and protects personal information when you visit aipisolutions.com (the \"Site\"), contact us, apply for a position, or order an automated patent analysis report (a \"Report\")."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"This Privacy Policy covers the Site. Information we handle while providing advisory or other services to a client under a separate written agreement is governed by that agreement."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"1. Information We Collect"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.1. "}<strong className="font-semibold text-[#0c1425]">{"Information you give us."}</strong>{" We collect the information you choose to submit through the Site:"}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-7 text-[#4b5563]">
            <li>{"Contact form: your name, email address, phone number (optional), and the content of your message."}</li>
            <li>{"Careers form: your first and last name, email address, phone number (optional), the position you are interested in, your cover letter or message, and your resume if you attach one, including whatever information the resume contains."}</li>
            <li>{"Report orders: your email address, your name and company (optional), the report type you select, and the subject of the Report, which may be a patent number, a title, or a description of an invention, product, or process."}</li>
            <li>{"Correspondence: the content of emails and other communications you send us."}</li>
          </ul>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.2. "}<strong className="font-semibold text-[#0c1425]">{"Payment information."}</strong>{" Report payments are processed by Stripe through a checkout embedded in the Site. Your card details are submitted directly to Stripe. AiPi does not receive or store your full card number or security code. We receive limited information about the transaction from Stripe, such as the payment status, the amount, your email address, and an order reference."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.3. "}<strong className="font-semibold text-[#0c1425]">{"Information collected automatically."}</strong>{" When you visit the Site, our hosting provider records standard technical information in server logs, such as your IP address, browser and device type, the pages requested, and the date and time of each request. Our forms use Cloudflare Turnstile to tell human visitors from automated traffic. Turnstile collects your IP address and technical signals about your browser and device for that purpose."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"1.4. "}<strong className="font-semibold text-[#0c1425]">{"Cookies and similar technologies."}</strong>{" AiPi does not use advertising cookies or third-party analytics cookies on the Site. [OWNER TO CONFIRM: no analytics or tracking tools are in use or planned.] Stripe and Cloudflare may set cookies or use similar technologies that are necessary for security and fraud prevention when a form or the checkout loads. You can block cookies in your browser settings, but the forms and the checkout may not work if you do."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"2. How We Use Information"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"We use personal information to:"}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-7 text-[#4b5563]">
            <li>{"respond to enquiries and communicate with you;"}</li>
            <li>{"review and respond to job applications;"}</li>
            <li>{"take and fulfil Report orders, including generating the Report, processing payment, sending confirmation and delivery emails, and handling support, refund, and dispute requests;"}</li>
            <li>{"operate, secure, and troubleshoot the Site, including preventing spam, fraud, and abuse;"}</li>
            <li>{"keep business, accounting, and tax records; and"}</li>
            <li>{"comply with law and enforce our agreements."}</li>
          </ul>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"[OWNER TO CONFIRM: whether AiPi sends marketing emails to people who contact us or order Reports. If so, state that here and describe how to unsubscribe.]"}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"3. How We Share Information"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.1. "}<strong className="font-semibold text-[#0c1425]">{"We do not sell personal information,"}</strong>{" and we do not share it with third parties for their own advertising."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.2. "}<strong className="font-semibold text-[#0c1425]">{"Service providers."}</strong>{" We share personal information with companies that process it on our behalf to run the Site and deliver our services:"}</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-base leading-7 text-[#4b5563]">
            <li>{"Amazon Web Services, for website hosting and email delivery;"}</li>
            <li>{"Stripe, for payment processing;"}</li>
            <li>{"Cloudflare, for protecting our forms from automated abuse; and"}</li>
            <li>{"providers of AI models and patent data used by LeifAI, AiPi's patent analysis software, to generate Reports. [OWNER / ATTORNEY TO CONFIRM: name or describe these providers, and whether they retain submitted content or use it to train models.]"}</li>
          </ul>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.3. "}<strong className="font-semibold text-[#0c1425]">{"Legal and safety."}</strong>{" We may disclose information when we believe in good faith that disclosure is required by law or legal process, or is needed to protect the rights, property, or safety of AiPi, our clients, or others."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.4. "}<strong className="font-semibold text-[#0c1425]">{"Business transfers."}</strong>{" If AiPi is involved in a merger, acquisition, financing, or sale of assets, personal information may be transferred as part of that transaction, subject to this Privacy Policy."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"3.5. "}<strong className="font-semibold text-[#0c1425]">{"With your direction."}</strong>{" We share information with others when you ask us to."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"4. Report Orders"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.1. The information you submit when you order a Report is sent to LeifAI and to the providers described in Section 3.2 so that the Report can be generated. That information may include unpublished or confidential details about an invention, product, or process."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.2. "}<strong className="font-semibold text-[#0c1425]">{"Your Report is delivered as a web page at a unique link, and anyone who has the link can view it."}</strong>{" The Report is not protected by a password or login. Treat the link as confidential."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"4.3. Our Terms of Service, available at aipisolutions.com/terms, say more about how submitted information and Reports are handled."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"5. Retention"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"We keep personal information for as long as we need it for the purposes described in this Privacy Policy, and for as long as required to meet legal, accounting, and dispute-resolution obligations. [OWNER TO CONFIRM: specific retention periods for enquiries, job applications and resumes, Report orders, and Reports.]"}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"6. Security"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"We use reasonable technical and organizational measures to protect personal information, including encryption of data in transit to and from the Site. No method of transmission or storage is completely secure, and we cannot guarantee absolute security."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"7. Your Choices and Rights"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.1. You may ask us for a copy of the personal information we hold about you, ask us to correct it, or ask us to delete it, by emailing tech-admin@aipisolutions.com. We may need to verify your identity before acting on a request, and we may keep information that we are required or permitted by law to keep."}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.2. Depending on where you live, you may have additional rights under local privacy law, such as the right to appeal a decision we make about your request. We will honor the rights that apply to you. [ATTORNEY TO REVIEW: which U.S. state privacy laws, if any, apply to AiPi, and any state-specific disclosures required.]"}</p>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"7.3. The Site does not respond to browser \"Do Not Track\" signals. As described in Section 1.4, AiPi does not track visitors across third-party websites."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"8. Children"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"The Site is intended for business users and is not directed to children. We do not knowingly collect personal information from children under 13. If you believe a child has given us personal information, contact us and we will delete it."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"9. Visitors From Outside the United States"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"AiPi is based in the United States, and the Site is hosted there. If you use the Site from another country, your information will be transferred to and processed in the United States, where privacy laws may differ from those in your country. [ATTORNEY TO REVIEW: whether AiPi targets customers in the EU, UK, or other jurisdictions that require additional disclosures or transfer mechanisms.]"}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"10. Links to Other Websites"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"The Site may link to websites that AiPi does not operate. This Privacy Policy does not apply to those websites, and we are not responsible for their privacy practices."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"11. Changes to This Privacy Policy"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"We may update this Privacy Policy from time to time. The updated version will be posted on the Site with a new effective date."}</p>

          <h2 className="mt-10 text-xl font-semibold text-[#0c1425]">{"12. Contact"}</h2>
          <p className="mt-4 text-base leading-7 text-[#4b5563]">{"Actionable Intellectual Property Intelligence LLC (AiPi Solutions)"}<br />{"8230 Leesburg Pike, Suite 660, Vienna, VA 22182"}<br />{"Email: tech-admin@aipisolutions.com"}<br />{"Website: aipisolutions.com"}</p>
        </div>
      </section>
    </>
  );
}
