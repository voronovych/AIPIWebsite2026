import { randomUUID } from "node:crypto";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const FROM_ADDRESS = "noreply@aipisolutions.com";
const FROM_DISPLAY = "AiPi Solutions Website";
const TO_ADDRESS = "tech-admin@aipisolutions.com";

let cachedClient: SESv2Client | undefined;

function getClient(): SESv2Client {
  cachedClient ??= new SESv2Client({
    region: process.env.AWS_REGION ?? "us-east-1",
  });
  return cachedClient;
}

export type EmailAttachment = {
  filename: string;
  contentType: string;
  content: Buffer;
};

/** RFC 2047 encoded-word, so non-ASCII names/subjects survive as headers. */
function encodeHeader(value: string): string {
  return /^[\x20-\x7E]*$/.test(value)
    ? value
    : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function wrapBase64(value: string): string {
  return value.replace(/(.{76})/g, "$1\r\n");
}

function sanitizeFilename(filename: string): string {
  const cleaned = filename.replace(/[\\/\r\n"]/g, "_").trim().slice(0, 100);
  return cleaned || "attachment";
}

function buildRawMessage(
  subject: string,
  text: string,
  replyTo: string | undefined,
  attachment: EmailAttachment,
): Buffer {
  const boundary = `----aipi-${randomUUID()}`;
  const filename = sanitizeFilename(attachment.filename);

  const headers = [
    `From: ${encodeHeader(FROM_DISPLAY)} <${FROM_ADDRESS}>`,
    `To: ${TO_ADDRESS}`,
    ...(replyTo ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${encodeHeader(subject)}`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ];

  const body = [
    `--${boundary}`,
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(Buffer.from(text, "utf8").toString("base64")),
    `--${boundary}`,
    `Content-Type: ${attachment.contentType}; name="${filename}"`,
    `Content-Disposition: attachment; filename="${filename}"`,
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(attachment.content.toString("base64")),
    `--${boundary}--`,
    "",
  ];

  return Buffer.from([...headers, "", ...body].join("\r\n"), "utf8");
}

/**
 * Sends a form submission notification to the AiPi intake address.
 * Throws if SES rejects the message, so callers can surface a failure to the
 * visitor rather than silently dropping their enquiry.
 */
export async function sendFormEmail({
  subject,
  text,
  replyTo,
  attachment,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  attachment?: EmailAttachment;
}): Promise<void> {
  const command = attachment
    ? new SendEmailCommand({
        FromEmailAddress: FROM_ADDRESS,
        Destination: { ToAddresses: [TO_ADDRESS] },
        Content: { Raw: { Data: buildRawMessage(subject, text, replyTo, attachment) } },
      })
    : new SendEmailCommand({
        FromEmailAddress: `${encodeHeader(FROM_DISPLAY)} <${FROM_ADDRESS}>`,
        Destination: { ToAddresses: [TO_ADDRESS] },
        ...(replyTo ? { ReplyToAddresses: [replyTo] } : {}),
        Content: {
          Simple: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: { Text: { Data: text, Charset: "UTF-8" } },
          },
        },
      });

  await getClient().send(command);
}
